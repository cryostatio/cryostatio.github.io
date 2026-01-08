---
layout: post
title: Deploying Cryostat with External Storage
date: 2026-01-08
synopsis: Use your own choice of commercial or self-hosted object storage with Cryostat
author: Andrew Azores
---

#### Table of Contents
* auto-gen TOC:
{:toc}
<hr>

## Intro

### History

Feel free to [skip](#current-state) this historical recap of how we arrived at where we are now and jump directly to
the current capabilities and features.

Originally, Cryostat stored all data as files written to its local filesystem, within directories like
`/opt/cryostat.d/recordings.d`. This was decided when the only data to be stored were Flight Recording Archives and
custom Event Templates. Over time Cryostat grew new features and new types of data to store: Stored Credentials and
Automated Rules, Discovery Plugins (Cryostat Agents) and persisting Targets and Discovery Nodes, and most recently
Thread Dumps and Heap Dumps.

In the Cryostat 2.x series a small `h2` database was added, which was simply backed by a file within the local
filesystem, which would house Stored Credentials, Targets, Discovery Nodes, and Discovery Plugins. This took care of
most of the "small" data, but the "large data" Flight Recording archives were still simply written to a local
filesystem path. All of these data types could survive Cryostat being temporarily scaled down or restarting due to a
crash, but the data being kept within a local filesystem (in Kubernetes, a `PersistentVolumeClaim`) meant that it
might not persist if Cryostat was uninstalled completely. This also made it more difficult or infeasible for users to
have Cryostat export captured data to object storage providers - users
[deploying Cryostat to Docker](/2025/12/10/docker-compose.html) might need to do something convoluted like mount an
S3-backed FUSE volume mount to their machine and then share that as a volume mount to the container. Kubernetes users
could do something similar to configure their object storage provider with a CSI driver to provide `PersistentVolumes`,
which could be selected for the `PersistentVolumeClaim` used by Cryostat. But, even after going through these extra
steps, that data in the `PersistentVolumeClaim` needs to be carefully handled so that it isn't tied to the Cryostat
deployment's lifecycle, and sharing the data between services is difficult when it's written "raw" into a `PVC`.

So, as part of the big rewrite and re-architecture of Cryostat 3.0, the database was moved from file-backed `h2` on
local filesystem to a Postgres container, and other object storage was moved from direct local filesystem to using the
AWS S3 SDK and a [`cryostat-storage`](https://github.com/cryostatio/cryostat-storage) container (a "fork" of
[SeaweedFS](https://github.com/seaweedfs/seaweedfs) which just layers on a custom entrypoint script and container
build). At this point, however, these containers and their Kubernetes Deployments are tightly integrated into the
Cryostat installation - the database and object storage had their own `PersistentVolumeClaim`s to back their own
data storage, and without resorting to FUSE mounts or CSI drivers and `PersistentVolume` storage class selectors it
still wouldn't be possible to have Cryostat export Flight Recordings to your own object storage provider of choice.
Still, this was an important step to get us where we are today, and also opened the door for easier sharing of data
between Cryostat's components.

Cryostat 4.0 did further work toward loosening the coupling of database and object storage containers to the Cryostat
installation by splitting them into their own Kubernetes Deployment objects tied to the same Custom Resource, but went
no further.

### Current State

Finally, in Cryostat 4.1 the Cryostat `Custom Resource` in Kubernetes/OpenShift and the Cryostat Helm Chart both allow
for "external" storage to be configured. If no such configuration is made then the Cryostat Operator or Helm Chart will
default to deploying the same `cryostat-storage` as usual, to act as a "batteries included" S3-compatible object
storage. However, if you would rather have Cryostat use some other object storage provider for Flight Recordings, you
can now do so easily. Cryostat 4.1 also adds two new types of data that can be captured - Thread Dumps and Heap Dumps.
Heap Dumps in particular tend to be rather large binary files, so users expecting to make heavy use of this feature
should appreciate this new External Storage feature, too. When the Operator or Helm Chart see these configurations they
will configure the Cryostat installation to connect to this external storage provider and skip the `cryostat-storage`
`Deployment` entirely.

## Example

### Preface

The new ["Docs"](/docs) section of this website [contains a setup guide](/docs/#connect-cryostat-to-external-storage)
with much of the same information as below. The goal of this blog post is to apply that same information to a concrete
scenario with an actual object storage provider selected, and to demonstrate different Cryostat installations with
equivalent configurations.

I'll illustrate this capability by giving example configurations to hook up [the Helm Chart](#helm-chart),
[Operator Custom Resource](#operator-custom-resource), and [Compose](#compose) installations to an external object
storage provider.

I will use a [Backblaze B2](https://www.backblaze.com/cloud-storage) account in these examples, but the general
structure will be the same for any provider. You should do your own analysis of the available commercial S3-compatible
object storage providers as well as the available open source self-hosted object storage providers to determine which
best suits your needs.

Go ahead and create an account with your chosen object storage service provider, or prepare an account in your
self-hosted storage solution. You will need to take note of the following pieces of information:

1. `AWS_ACCESS_KEY_ID` or similar - this is the equivalent of a username or serviceaccount name
2. `AWS_SECRET_ACCESS_KEY` or similar - this is the equivalent of a password or auth token
3. Provider or Endpoint URL - this is the root or base API endpoint for the object storage service, not including any
bucket name or other additional information
4. Region - this may be important for your storage provider for CDN, caching, or geolocation reasons
5. Path-style access vs Virtual Host access - small self-hosted object storage (like `cryostat-storage`) may not be set
up to support storage bucket resolution by virtual host/subdomain, but only by path. If your storage provider supports
virtual host access then you should generally choose to use it.
6. API support for Object Tagging or Object Metadata - not all S3-compatible providers implement the full AWS S3 API,
and one particular feature which Cryostat uses and not all providers (like Backblaze B2) implement is Object Tagging.
We have alternate strategies in Cryostat to use Object Metadata or separate sidecar metadata files instead for broad
compatibility, so you'll need to know which options are available for your selected provider.
7. A randomized string prefix or some other naming scheme, especially if you are using a commercial provider and not a
self-hosted private one. S3 bucket names are generally publicly resolvable and not unique to an account, but need to be
globally unique across the service. Check with your storage provider about allowable character classes and length
limitations. You might try including a randomized string, your application or organization name, the storage region, or
other information into the bucket names.

I will use the following parameters for this demo, based on my real Backblaze B2 account but modified/redacted to not
actually expose my account:

1. `AWS_ACCESS_KEY_ID` will be represented by `$AWS_ACCESS_KEY_ID`
2. `AWS_SECRET_ACCESS_KEY` will be represented by `$AWS_SECRET_ACCESS_KEY`
3. Provider URL will be `https://s3.us-east-005.backblazeb2.com`
4. Region will be `us-east-005`
5. Virtual Host access is enabled
6. Object Tagging API is not supported, so Object Metadata will be used
7. Storage bucket names will simply be prefixed with `abcd1234-`

### Configurations

#### Helm Chart

1. Create a YAML file like so:
```yaml
apiVersion: v1
stringData:
    STORAGE_ACCESS_KEY: $AWS_ACCESS_KEY_ID
    STORAGE_ACCESS_KEY_ID: $AWS_SECRET_ACCESS_KEY
kind: Secret
metadata:
    name: s3cred
type: Opaque
```
substituting the two values for your actual account values. Save this as `s3cred.yml`.
2. Create the `Secret` object in your Cryostat installation namespace: `kubectl create -f s3cred.yml`.
3. Install the Cryostat Helm Chart with the following configuration values:
```bash
$ helm install \
    --set storage.storageSecretName=s3cred \
    --set storage.provider.url=https://s3.us-east-005.backblazeb2.com \
    --set storage.provider.region=us-east-005 \
    --set storage.provider.usePathStyleAccess=false \
    --set storage.provider.metadata.storageMode=metadata \
    --set storage.buckets.names.archivedRecordings=abcd1234-archivedrecordings \
    --set storage.buckets.names.archivedReports=archivedreports \
    --set storage.buckets.names.eventTemplates=abcd1234-eventtemplates \
    --set storage.buckets.names.jmcAgentProbeTemplates=abcd1234-jmcagentprobetemplates \
    --set storage.buckets.names.threadDumps=abcd1234-threaddumps \
    --set storage.buckets.names.heapDumps=abcd1234-heapdumps \
    cryostat ./charts/cryostat
```
feel free to add other configuration values as desired, ex. `--set reports.replicas=1` or
`--set core.discovery.kubernetes.enabled=true --set core.discovery.kubernetes.namespaces='{mynamespace}'`.
The `storage.storageSecretName` setting tells the Helm Chart the name of the `s3cred` `Secret` which we created, where
it will expect to find the `STORAGE_ACCESS_KEY` and `STORAGE_ACCESS_KEY_ID` key-value pairs. These will be used to
configure Cryostat's S3 API client. The `storage.provider.url` is the S3 API endpoint. The `storage.provider.region`
should be self-explanatory. `storage.provider.usePathStyleAccess=false` configures Cryostat to use virtual host access
since Backblaze B2 supports it, and `storage.provider.metadata.storageMode=metadata` configures Cryostat to use the
Object Metadata API since Backblaze B2 does not support Object Tagging. The `storage.buckets.names.*` values set the
globally unique bucket names to use for various different types of data which Cryostat may store. Each of these are
placed into separate buckets so that you can choose to configure different bucket-level policies for different types of
data - storage quotas, object lifecycles, versioning, encryption, storage classes, etc.

#### Operator Custom Resource

This will look rather similar to the previous [Helm](#helm) example.

1. [Install the Cryostat Operator](/get-started/#installing-cryostat-operator).
2. Create a YAML file like so:
```yaml
apiVersion: v1
stringData:
    ACCESS_KEY: $AWS_ACCESS_KEY_ID
    SECRET_KEY: $AWS_SECRET_ACCESS_KEY
kind: Secret
metadata:
    name: s3cred
type: Opaque
```
substituting the two values for your actual account values. Save this as `s3cred.yml`.
2. Create the `Secret` object in your Cryostat installation namespace: `kubectl create -f s3cred.yml`.
3. Create a Cryostat Custom Resource:
```yaml
apiVersion: operator.cryostat.io/v1beta2
kind: Cryostat
metadata:
    name: cryostat-sample
spec:
    objectStorageOptions:
      secretName: s3cred
      provider:
        url: https://s3.us-east-005.backblazeb2.com
        region: us-east-005
        usePathStyleAccess: false
        metadataMode: metadata
      storageBucketNameOptions:
        archivedRecordings: abcd1234-archivedrecordings
        archivedReports: abcd1234-archivedreports
        eventTemplates: abcd1234-eventtemplates
        heapDumps: abcd1234-heapdumps
        jmcAgentProbeTemplates: abcd1234-jmcagentprobetemplates
        threadDumps: abcd1234-threaddumps
```
Refer back to the [Helm](#helm) example for a line-by-line explanation of what each of these configuration properties
means. Of course, you can also combine these properties with other Custom Resource properties.

#### Compose

Following my previous [Cryostat in Compose](/2025/12/10/docker-compose.html) post, let's simply build on that
foundation and use the Cryostat smoketest script's `-s ext` ("storage external") flag to generate a Compose YAML
manifest:

1. Export environment variables:
```bash
$ cd cryostat
$ export AWS_ACCESS_KEY_ID=replaceme
$ export AWS_SECRET_ACCESS_KEY=replaceme
$ export S3_ENDPOINT=https://s3.us-east-005.backblazeb2.com
$ export S3_REGION=us-east-005
$ export S3_PATH_STYLE_ACCESS=false
```
The `smoketest.bash` script generates default bucket names which include the bucket base name (ex. "archives"), the
first few characters of `AWS_ACCESS_KEY_ID` (this is not considered secret information), the `S3_REGION`, and a few
random characters as an instance ID. Don't worry about finding those generated bucket names and manually creating them
\- Cryostat will automatically check if the buckets already exist and try to create them if they don't when it starts.
2. Generate the manifest:
```bash
$ ./smoketest.bash -n -s ext > cryostat-compose.yml
```
3. Import volumes:
```bash
$ for i in *.tar.gz ; do \
  f=$(echo $i | cut -d. -f1); podman volume create $f; podman volume import $f $f.tar.gz; \
done
```
4. Start Cryostat:
```bash
$ podman compose -f cryostat-compose.yml up
```

### Additional Information

#### Integrations

Depending on the object storage provider you choose, you may gain additional integration points for the data Cryostat
exports to storage. In Backblaze B2 for example, you can set up Event Notifications as a webhook-like system to notify
another application when things change. You might choose to have B2 send a notification to another service of yours
whenever Cryostat uploads a new Flight Recorder or Heap Dump file to archives, in case you have some additional
analysis tooling that you want to build a pipeline to.

#### Recommendations

Various object storage providers also implement concepts like object lifecycles and bucket storage quotas. You should
consider how heavily you use Cryostat and how much data your usage generally produces and set quotas accordingly to
avoid accidentally using too much storage space and racking up a large bill. Using object lifecycles to manage old data,
especially large objects like Flight Recorder files and Heap Dumps, can also be very helpful. You might choose to move
files from standard storage into deep/cold storage after one week, and delete them entirely after one month, for
example. Think carefully about how these features might interact with Cryostat's
[Automated Rules](/guides/#create-an-automated-rule) and periodic archival if you choose to use them.

#### Side Effect

An interesting side-effect of using external storage in this way arises from the fact that Cryostat does not maintain
any separate metadata about what files it has uploaded to the storage buckets. Cryostat simply queries the storage
provider for the current bucket contents as needed. This ensures Cryostat is resilient to external modifications of the
bucket contents - which may be due to object lifecycle policies, or other applications, or users interacting directly
with the storage provider console or API - but also means that you can connect two or more Cryostat instances to the
same set of buckets using the same credentials. When Cryostat A pushes a Flight Recorder file to the shared archives,
that same file will become visible in Cryostat B's view of the archives, although Cryostat B will not produce any
notification for you that this has happened.

So one interesting use-case you might explore is to install a Cryostat A alongside your applications in Kubernetes and
have it export data to a shared storage, then run a Cryostat B in Compose on your local machine hooked up to the same
storage. These two Cryostat instances will not share a database so they will not see the same discovered targets, or
have the same Automated Rules, etc., but they will share
[Recording Archives](/guides/#all-archives-archived-recordings-view),
[Thread Dump Archives](/guides/#capture-a-thread-dump), and [Heap Dump Archives](/guides/#capture-a-heap-dump). Just
be sure to select the "All Archives" tab of each of these views.

You can then use features like [View in Grafana](/guides/#view-a-recording-in-grafana) or
[Automated Analysis](/guides/#view-automated-analysis-for-a-target) (see Step 6) and have the computation done on your
local machine instead of by the Cryostat instance installed in your cloud environment.
