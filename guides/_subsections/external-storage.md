## [Connect Cryostat to External Storage](#connect-cryostat-to-external-storage)
When deploying **Cryostat** in a **Kubernetes** environment, you may configure **Cryostat** through the **Cryostat Operator** or **Helm Chart** to use an external S3-compatible storage provider.

## [Configuring the Operator with External S3](#configuring-the-operator-with-external-s3)
The **Cryostat Operator** supports a number of configuration options for setting up **Cryostat** to use an External S3 storage provider. These may be configured through the console interface while creating a **Cryostat Custom Resource** or through a YAML file. The <code>objectStorageOptions</code> structure has the following properties:

```yaml
spec:
    objectStorageOptions:
        provider:
            region: # Object Storage Provider Region
            url: # Complete URL to the Storage Provider
            useVirtualHostAccess: # Whether virtual host subdomain access should be used, as opposed to path-style access.
            tlsTrustAll: # Whether Cryostat should trust all TLS certificates presented by the external object storage provider.
            metadataMode: # The strategy Cryostat will use for storing files' metadata. The default 'tagging' strategy stores all metadata as object Tags. The 'metadata' strategy stores metadata as object Metadata, which is immutable but allows for more entries than Tags. The 'bucket' strategy stores metadata as separate files (ex. JSON object maps) in a dedicated bucket, with prefixes to differentiate the kind of object the metadata belongs to.
            disablePresignedDownloads: # Whether file downloads from storage to the user's browser should be performed using presigned URLs, or by Cryostat acting as a "network pipe." Enabling this reduces network utilization and latency and removes some I/O from Cryostat, but requires that the object storage container URLs are accessible to the user's browser. Defaults to inheriting the .spec.objectStorageProviderOptions.disablePresignedFileTransfers value.
        secretName: # Name of the secret containing the object storage secret access key. This secret must contain a ACCESS_KEY secret which is the object storage access key ID, and a SECRET_KEY secret which is the object storage secret access key. If using an external S3 provider requiring authentication then this must be provided. It is recommended that the secret should be marked as immutable to avoid accidental changes to secret's data.
```

Following this, the <code>storageBucketNames</code> structure can be used to specify the names of storage buckets for **Cryostat** to use. If these buckets don't exist, **Cryostat** will attempt to create them upon starting. If relying on automatic bucket creation, be aware that for some S3 Storage Providers, bucket names must be unique across the entire system so care should be taken to avoid name collisions.

```yaml
spec:
    storageBucketNames:
        archivedRecordings: # The name of the bucket used to store Archived JFR files.
        archivedReports: # The name of the bucket used to store a cache of Automated Analysis reports attached to Archived JFR files.
        eventTemplates: # The name of the bucket used to store custom Event Templates.
        heapDumps: # The name of the bucket used to store JVM heap dumps.
        jmcAgentProbeTemplates: # The name of the bucket used to store JMC Agent Probe templates.
        metadata: # The name of the bucket used to storage metadata for other objects (ex. archived recordings). This is only used if the .spec.objectStorageOptions.provider.metadataMode is set to 'bucket'.
        threadDumps: # The name of the bucket used to storage JVM thread dumps.
```

In order for **Cryostat** to successfully connect to an external S3 storage provider, it needs a **Kubernetes Secret** containing an <code>ACCESS_KEY</code> and <code>SECRET_KEY</code>. The details are described above. This secret can be created through the **Openshift Console** interface, or through a yaml or the command line:

```bash
oc create secret generic s3cred \ 
--from-literal=ACCESS_KEY=cryostat \ 
--from-literal=STORAGE_KEY=123456789
```

With this **Secret** created, we can now create a sample configuration to connect **Cryostat** to an external storage provider hosted at <code>some-storage-provider</code>:

```yaml
spec:
    objectStorageOptions:
        provider: 
            region: us-east-1
            url: https://some-storage-provider.com
            useVirtualHostAccess: false
            disablePresignedDownloads: false
            tlsTrustAll: false
            metadataMode: tagging
        secretName: s3cred
    storageBucketNames:
        archivedRecordings: cryostat-archived-recordings
        archivedReports: cryostat-archived-reports
        eventTemplates: cryostat-event-templates
        heapDumps: cryostat-heap-dumps
        jmcAgentProbeTemplates: cryostat-probe-templates
        metadata: cryostat-metadata
        threadDumps: cryostat-thread-dumps
```

This can be added to the <code>spec</code> of a **Cryostat Custom Resource** or filled in as fields while creating one in the **Openshift Console**

## [Configuring the Helm Chart with External S3](#configuring-the-helm-chart-with-external-s3)

Similar to the **Cryostat Operator**, the helm chart supports a number of configuration options for configuring **Cryostat** for use with an external **S3 Storage Provider**.

The options present in the helm chart mirror those described for the **Cryostat Operator** above. Note that like the **Cryostat Operator**, the helm chart needs a **Kubernetes Secret** containing the storage access key and secret key:

```bash
oc create secret generic s3cred \
  --from-literal=STORAGE_ACCESS_KEY=abcd1234 \
  --from-literal=STORAGE_ACCESS_KEY_ID=cryostat
```

Following this, an invocation like the following will deploy **Cryostat** configured to use an external **S3 Storage Provider**:

```bash
helm install \
  --set storage.provider.url=https://path-to-storage-provider.com \
  --set storage.storageSecretName=s3cred \
  --set storage.provider.region=us-east-1 \
  --set storage.provider.usePathStyleAccess=false \
  --set storage.provider.metadata.storageMode=bucket \
  --set storage.buckets.names.archivedRecordings=cryostat-archivedrecordings \
  --set storage.buckets.names.archivedReports=cryostat-archivedreports \
  --set storage.buckets.names.eventTemplates=cryostat-eventtemplates \
  --set storage.buckets.names.jmcAgentProbeTemplates=cryostat-probes \
  --set storage.buckets.names.metadata=cryostat-metadata \
  cryostat ./charts/cryostat
```