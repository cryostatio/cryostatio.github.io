---
layout: post
title: Cryostat 4.0.0 is Released!
date: 2025-03-01
synopsis: Cryostat 4.0.0 is here. Learn what's new in this release.
author: Andrew Azores
---

#### Table of Contents
* auto-gen TOC:
{:toc}
<hr>

Hello everyone,

It's time for another Cryostat release. This time, we are very proud to present Cryostat 4.0, a new major version with again some significant under-the-hood changes,
and some exciting new OpenShift-specific features.

### Feature Highlights
1. **Quarkus and Hibernate JFR integrations** for framework-specific *Flight Recorder* events. If your target application uses Quarkus and contains the `quarkus-jfr` extension (along with `quarkus-rest`), or has `hibernate-jfr` on its classpath, then you can take advantage of the new *Preset Event Templates* that ship with Cryostat. These are open to community contributions for any other popular frameworks and libraries that provide JFR events. Simply start a recording using the relevant preset template and begin capturing these framework-specific events.
2. **Automated Rules by JFR Event Type ID**: there is a new `jfrEventTypeIds(target): string[]` function available in the `matchExpression` Common Expression Language scope. Pass in the `target` object also in scope and this function returns a list of JFR event type IDs for that target JVM. This enables functionality such as that seen in the new `quarkus` and `hibernate` Automated Rules that ship with Cryostat 4.0, where the rules' expressions are satisfied by target JVMs that support the relevant JFR event types. This makes it even quicker and easier to get started capturing data from applications using these frameworks and libraries.
3. **Diagnostics Card**: the Cryostat dashboard has a new *Diagnostics* card, which currently exposes one new piece of functionality: you can fire a request for the remote target JVM to run a Garbage Collection cycle. This can be useful when troubleshooting a misbehaving application, or when attempting to optimize the resource allocation for a container.
4. **Events View** in the Cryostat Web UI is visible even when no target application is selected. Previously this view would lock out until a target JVM was selected. Now, the *Event Types* and *JMC Agent Live Configuration* tabs will be disabled, but the *Event Templates* and *JMC Agent Probe Templates* remain usable so that you can see which templates are available, or upload new ones, even when you have no target applications discoverable.

#### OpenShift-specific Feature Highlights
1. **Agent Autoconfiguration** by the Operator dramatically simplifies the setup and usage of the *Cryostat Agent* with your JVM target applications. Simply install the Operator, create a Cryostat CR, and ensure your target application is located in one of the Cryostat CR's *Target Namespaces*. Then, edit your application's Deployment `.spec.template.metadata.labels` and add `cryostat.io/namespace: ${cryostat-cr-ns}` and `cryostat.io/name: ${cryostat-cr-name}` labels (replacing the `${var}` expressions with corresponding values). This prompts the Cryostat Operator to patch your Deployment to include Volumes containing the Cryostat Agent JAR and required TLS certificates, to include a `JAVA_TOOL_OPTIONS` environment variable containing the `-javaagent` flag to statically attach the Agent to your application, and to include other environment variables to configure the Agent to communicate with the specified Cryostat instance.
2. **OpenShift Console Plugin** to allow your cluster administrators to access Cryostat features directly from the OpenShift Console, without needing to visit each Cryostat instance's Application (Route) URL and with no secondary authentication step.
3. **Agent Gateway** container is included in the main Cryostat Deployment for each Cryostat CR. This is a TLS authentication proxy that Agent instances can use with appropriate TLS client certificates to authenticate to their Cryostat instance, rather than needing to use serviceaccount Bearer tokens. This is also used by the *autoconfiguration* feature.

### Architectural Updates
1. **Split Deployments** when deployed via Operator or Helm Chart. The *database* and *storage* containers are now split out to their own separate Deployments so that their Pods have separate lifecycles from the main Cryostat Pod. Cryostat now also uses Flyway to handle database migrations between version upgrades. This lays out some groundwork that didn't get finished in time for 3.0, so that (hopefully) the next several Cryostat releases can be minor versions with seamless upgrade paths. The database and storage *PersistentVolumeClaims* are also separated so that storage can be allocated appropriately. Additionally, when using the Operator, communications between these split Pods will always use TLS by default, use generated credentials for authentication, and use *NetworkPolicies* to control ingress so that traffic is only accepted from expected origins. The storage container also enables at-rest data encryption by default.
2. **Removal of deprecated API** version prefixes. The old `/api/v1` through `/api/v3` path prefixes are no longer used, and all API endpoints are now prefixed with `/api/v4`. Many of these are fully backward compatible with how they behaved in 3.0.
3. **Long-running API operations** are now handled more asynchronously. These are operations such as archiving recordings, uploading recordings to `jfr-datasource` for analysis in Grafana, or performing automated analysis on recordings. When a client request for one of these operations comes in, Cryostat will immediately send back a response containing a Job ID. At some later point in time, a WebSocket notification will be sent containing the same Job ID and indicating the success/failure of that job and any particular details about it. For automated analysis report generation in particular, the first time a request is sent the response will contain a Job ID, but when the job completes then Cryostat will hold the result in a cache for some time. The client should send a follow-up request after the WebSocket notification is received, and this time Cryostat will respond with the actual report JSON document. This differs from 3.0 and prior Cryostat versions, where the client would send a request and Cryostat would send no response at all until the entire operation completed - which could result in the client timing out and abandoning the request.

### Helm Chart
1. **Reports Generator sidecars** are now also available in the Helm Chart using `reports.replicas`. Simply `--set reports.replicas=1` (or any positive integer you choose) when installing or upgrading the Helm Chart.
2. **User-provided Secrets** can be specified when installing or upgrading the Helm Chart using `storage.storageSecretName` and `authentication.cookieSecretName`. When these are specified the Helm Chart does not need to do a dynamic lookup of any self-generated Secrets already in the cluster, so the installation is more declarative and can be more easily managed with GitOps-style workflows. Be sure to create the Secrets first before referencing them in the Helm Chart installation.

### Agent
1. [**`cryostat-agent-init`** container image](https://quay.io/repository/cryostat/cryostat-agent-init) is now available. This is a small container image simply containing the Cryostat Agent `-shaded` JAR. This can be used in multistage OCI container image builds as a potentially simpler way to insert the JAR, rather than using a Maven dependency. This is also what the Operator uses for *autoconfiguration* to mount a Volume containing the JAR.
2. **Server version check** on startup. The Agent queries the Cryostat server it is connecting to and checks that its version falls within the expected range for compatibility. The Agent will log a warning if it is configured to talk to a Cryostat server outside of its compatible version range.
3. **Build info as system properties**: Agent build information such as the git commit hash, Agent version string, and compatible Cryostat server minimum/maximum versions are embedded as resources in the Agent JAR. The Agent sets JVM system properties with these values at startup. These can be viewed in the Cryostat Web Topology view for enhanced details about the particular Agent instances registered with your Cryostat server.

### General Maintenance
1. **Base Image** version updates to `ubi9` and `JDK 21`. Cryostat 3.0 containers used `ubi8` and `JDK 17`.
2. **Quarkus 3.15** update for Cryostat, Cryostat Reports, and JFR Datasource.
3. **Patternfly 5** update for Cryostat Web.
4. **Grafana Dashboard** no longer uses the deprecated `simple-json-datasource`.

### Bug Fixes
1. **HTTP Connection Flakiness** between components - in particular Cryostat to Cryostat Reports, or Cryostat to Cryostat Storage - has been resolved.
2. **Automated Rules** can sometimes fail to activate for various reasons. Cryostat will now attempt to re-test any failed rules with an exponential backoff strategy to ensure that rules are activated on targets as expected.
3. **WildFly / Agent**: when attaching the Agent to WildFly/JBoss EAP applications previously, the Agent's configuration defaults would not be loaded and all parameters would need to be set explicitly. Now, the default parameters are loaded as usual and only the typical parameters need to be specifically configured.
