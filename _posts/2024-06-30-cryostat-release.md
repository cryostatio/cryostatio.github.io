---
layout: post
title: Cryostat 3.0.0 is Released!
date: 2024-06-30
synopsis: Cryostat 3.0.0 is here. Learn what's new in this release.
author: Andrew Azores
---

#### Table of Contents
* auto-gen TOC:
{:toc}
<hr>

Hello everyone,

It's time for another Cryostat release. This time, we are pleased to present Cryostat 3.0, a new major version with some significant under-the-hood changes.

### Feature Highlights

1. **Quarkus** re-implementation of the main container: the main Cryostat container was previously built directly using [Eclipse Vert.x](https://github.com/vert-x3/vertx-web), but now in 3.0 it has been reimplemented using [Quarkus](https://quarkus.io). With this change comes several other changes outlined in the next several points, to take advantage of the Quarkus framework's strengths and features so that Cryostat can provide higher performance access to your JDK Flight Recorder data, as well as better integrity and security of your data.
2. **More powerful configuration**: the main Cryostat container can be configured in the usual SmallRye Config style like any other Quarkus application, which means configuration properties can now be supplied by system property as well as by environment variable, and more configuration properties are available to help advanced users tailor Cryostat to their particular deployment requirements. If you are using the [Cryostat Operator](https://github.com/cryostatio/cryostat-operator) or [Helm Chart](https://github.com/cryostatio/cryostat-helm) for deployment and configuration then the configuration changes at those levels are relatively simple, but if you roll your own deployment then you will have to make more significant changes to your deployment configurations.
3. **Postgres database** by default: Cryostat has used a simple [H2](https://github.com/h2database/h2database) file-based database for the past few releases for storing certain kinds of information, in particular the encrypted target JMX credentials keyring. Other kinds of information were stored directly as files on disk, such as Automated Rules definitions. Cryostat 3.0 now deploys with a [`cryostat-db`](https://github.com/cryostatio/cryostat-db) (lightly customized [Postgres](https://github.com/postgres/postgres)) database instead of H2 file-based database, and more information is kept in the database: the encrypted target credentials keyring, automated rules definitions, discovered targets, and discovery plugins are all persisted in this database. In this release the database schema is still in an early state and it is not yet recommended to attempt to run Cryostat with a separately managed database deployment.
4. **S3-compatible object storage**: previous versions of Cryostat used direct storage of files on disk for archived Flight Recordings and custom Event Templates. Cryostat 3.0 no longer uses direct filesystem accesses for these kinds of binary large objects, but instead integrates with an S3-compatible storage provider. If you use the Cryostat Operator or Cryostat Helm Chart for installation, your deployment will include a [`cryostat-storage`](https://github.com/cryostatio/cryostat-storage) container (a lightly customized [SeaweedFS](https://github.com/seaweedfs/seaweedfs)) for a "batteries included" storage solution. If you roll your own deployment then you can swap this out for any S3-compatible storage provider you prefer or may already use.
5. **Reverse proxy architecture**: Cryostat 3.0 deployed by the Cryostat Operator or Helm Chart includes a reverse proxy ([`openshift-oauth-proxy`](https://github.com/openshift/oauth-proxy/) or [`oauth2_proxy`](https://github.com/oauth2-proxy/oauth2-proxy)) in the Pod. Only this proxy is exposed to cluster traffic via a Service. This means that all API requests to Cryostat, as well as all visitors to the [Cryostat Web UI](https://github.com/cryostatio/cryostat-web) or [Grafana dashboard](https://github.com/cryostatio/cryostat-grafana-dashboard) flow through this proxy. The proxy handles user sessions to control access to the application, providing unified access control and user sessions for both the Cryostat Web UI and Grafana dashboard. Both of these UIs are accessible via the same Ingress or Route and present the same TLS certificate. When deployed on [OpenShift](https://developers.redhat.com/products/openshift/overview), the auth proxy will use its Namespace (the Cryostat installation Namespace) to perform Role-Based Access Control checks for user authentication and authorization by integrating with the OpenShift cluster SSO provider, very similar to what previous Cryostat releases directly implemented. Additionally, on OpenShift or any other Kubernetes, the auth proxy can be optionally configured with an `htpasswd` file to enable Basic authentication for defining additional user accounts that may access the Cryostat application.

#### Operator

Specifically for the Cryostat Operator there are a few items of note:
1. **Cluster-wide installation** only: the Cryostat Operator can now only be installed cluster-wide, rather than into a subset of cluster namespaces. Cluster-wide installation is the preferred mode for the Operator Lifecycle Manager and per-namespace installations are a deprecated feature, which our Operator has now dropped.
2. **ClusterCryostat removal**: the `v1beta1/Cryostat` and `v1beta1/ClusterCryostat` custom resources are now unified in the `v1beta2/Cryostat` CR. When creating this CR you specify an installation namespace and an optional list of target namespaces. The installation namespace is the location where the Operator will create the Cryostat Deployment, and on OpenShift this namespace will also be used by the auth proxy for RBAC to control which users have access to the Cryostat application. The list of target namespaces is used to control which namespaces the Cryostat instance should monitor for new target applications to appear within, the same as before. Taken together with point 1 above it is now simpler to install the Operator and configure your Cryostat instance(s): simply install the Operator cluster-wide, then create one or more Cryostat CRs to correspond to namespaces or groups of namespaces that contain your applications.

#### Helm Chart

For the Cryostat Helm Chart, there are new configuration values that can be set:
1. **authentication.openshift.enabled**: to enable deployment of `openshift-oauth-proxy`. If disabled (as default) then `oauth2_proxy` is deployed instead. Both proxies may be configured to enable Basic authentication (see next item), but for users deploying onto OpenShift, the `openshift-oauth-proxy` also implements integration with the OpenShift cluster SSO
2. **authentication.basicAuth**: to configure Basic authentication on the auth proxy. When deploying `openshift-oauth-proxy` this is in addition to the OpenShift SSO, whereas when deploying `oauth2_proxy` this is the only out-of-the-box supported user authentication mechanism
3. **openshiftOauthProxy.accessReview** (OpenShift only): to configure OpenShift SSO user authorization, the SubjectAccessReview/TokenAccessReview can be configured so that the proxy requires different roles from the user
4. Installation will now include the auth proxy, a `cryostat-db` instance, and a `cryostat-storage` instance as outlined at the top of this post. There will be only one Service, and one Ingress/Route, pointing to the auth proxy

This is not an exhaustive list of all the new configuration values, only a highlight of a few that control new visible features. Please check the chart's updated [`README`](https://github.com/cryostatio/cryostat-helm/blob/main/charts/cryostat/README.md) for a full listing.

#### Agent

In this release there is only one new feature implemented and one enhancement.

The minor enhancement first: when the [Cryostat Agent](https://github.com/cryostatio/cryostat-agent) starts up it also starts a tiny embedded webserver, which it uses to service requests made by the Cryostat server. This embedded webserver secures itself using Basic authentication. Previously, the Basic username was always `user` and the password was randomly generated and 24 ASCII characters in length. In this release both of these are configurable: the username can be overridden (but defaults to `user`), and the generated password length can be changed (but defaults to 24 characters). The generated password also draws from a larger character set.

The new feature is **Dynamic Attach**. In short, this means that the Cryostat Agent can be attached to an already-running application JVM, as opposed to requiring attachment at JVM startup time via the `-javaagent` flag. This requires that the Agent JAR is available on the same host or in the same container filesystem as the application JVM, and that the user has some way to `exec` the Agent JAR as a separate `java` process to bootstrap the attachment. For example, if the application is deployed in Kubernetes, then the user can set this up by downloading the Cryostat Agent JAR locally, copying it into the application container using `kubectl cp`, and then run the Agent JAR using `kubectl exec`.

```bash
$ kubectl cp \
    /path/to/cryostat-agent.jar \
    -n my-namespace \
    mypod:/tmp/cryostat/cryostat-agent.jar
$ kubectl exec \
    -n my-namespace \
    mypod -c mycontainer \
    -i -t -- \
      java -jar /tmp/cryostat/cryostat-agent.jar \
      -Dcryostat.agent.baseuri=http://cryostat:8181 \
      -Dcryostat.agent.authorization="Bearer ${MY_AUTH_TOKEN}" \
      -Dcryostat.agent.callback=http://${POD_IP}:9977 \
      -Dcryostat.agent.api.writes-enabled=true
```

### Non-Changes

What *hasn't* changed?

If you are a cluster administrator installing Cryostat you will notice some changes in the Cryostat Operator and Cryostat CR, or in the Cryostat Helm Chart configuration values. If you manually deploy Cryostat then there are a large number of setup and configuration changes required, with different and new environment variables and new additional containers to deploy (the auth proxy, database, and object storage mentioned above).

From an end user's perspective most things remain the exact same. Despite the major version number increment and breaking configuration changes, this release did not target adding any significant new user features or modifying existing ones. Only a few noteworthy items stand out:

1. **Target TLS certificate upload** has been removed: the `Security` navigation item in the Cryostat Web UI no longer offers a way to upload TLS certificates directly into the Cryostat server truststore. Instead, this view only provides a list of the certificates that have been loaded. Adding new certificates to the truststore must be done by adding them to the storage volume which Cryostat reads at startup. Using the Operator this can still be done with the existing `TrustedCertSecrets` CR property.
2. **JMX target credentials passthrough** has been removed: the old `X-JMX-Authorization` header is no longer supported. Previous versions of Cryostat accepted this header on API requests and would use the header value as basic auth credentials when opening a JMX connection to a target application. This was replaced by the encrypted database table backing the encrypted credentials keyring mechanism a few versions back, which was made the default. In 3.0 only this encrypted credentials keyring is supported, the `X-JMX-Authorization` header is no longer handled, and the Cryostat Web UI Settings view no longer offers an advanced configuration for selecting which mechanism to use.
Generally, the rest of the UI and features should look, feel, and behave the same way as they did in 2.4.
3. **Cryostat self-discovery**: when deployed by the Operator or Helm Chart, Cryostat will no longer discover itself as a target application by default. Previous versions would expose a JMX port on a Kubernetes Service. The Operator would generate credentials and assign a TLS certificate to help secure this port, but it was still a mandatory exposed JMX port that may not have been desirable. This port has been disabled and the corresponding Service port removed, so Cryostat will no longer discover itself as a connectable target - it won't appear in the target selection list or the Topology view in its own web UI. If you do want to connect Cryostat to itself to inspect its own performance, simply create a Custom Target with the URL value `localhost:0`. This special value asks the JVM to open a local JMX connection to itself, without exposing a port to the network, so additional authentication and TLS encryption is not necessary.
4. **API v1/v2 deprecation**: Cryostat 3.0 remains backward compatible with previous `/api/v1`, `/api/v2`, `/api/v2.1`, `/api/v2.2`, and `/api/v2.3` API endpoints - many of these will now return `HTTP 3xx` redirection responses to the new `/api/v3` equivalents, but some will continue to serve requests directly (where the response format differs). There were no new Cryostat 2.4 API additions and so there is no corresponding `/api/v2.4` prefix. `/api/beta` endpoints have seen some breaking changes. In all cases, `/api/beta` endpoints should be considered subject to change or removal in any future release, and all of the `v1|v2|v2.1|v2.2|v2.3` endpoints should now be considered deprecated. These will be removed in a future `3.x` release in favour of the `/api/v3` equivalents that already exist, or in favour of new endpoints with this prefix which will retain the same general semantics as the older versions they replace. If you have built any additional scripts or tooling around the Cryostat API, please consider upgrading these now to be compatible with the new `v3` API endpoints.
