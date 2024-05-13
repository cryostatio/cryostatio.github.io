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

It's time for another Cryostat relase. This time, we are pleased to present Cryostat 3.0, a new major version with some significant under-the-hood changes. Here are the key highlights:

1. **Quarkus** re-implementation of the main container: the main Cryostat container was previously built directly using Eclipse Vert.x, but now in 3.0 it has been reimplemented using Quarkus. With this change come several other changes outlined in the next several points, to take advantage of the Quarkus framework's strengths and features so that Cryostat can provide higher performance access to your JDK Flight Recorder data, as well as better integrity and security of your data.
2. **More powerful configuration**: the main Cryostat container can be configured in the usual SmallRye Config style like any other Quarkus application, which means configuration properties can now be supplied by system property as well as by environment variable, and more configuration properties are available to help advanced users tailor Cryostat to their particular deployment requirements. If you are using the Cryostat Operator or Helm Chart for deployment and configuration then the configuration changes at those levels are relatively simple, but if you roll your own deployment then you will have to make more significant changes to your deployment configurations.
3. **Postgres database** by default: Cryostat has used a simple H2 file-based database for the past few releases for storing certain kinds of information, in particular the encrypted target JMX credentials keyring. Other kinds of information were stored directly as files on disk, such as Automated Rules definitions. Cryostat 3.0 now deploys with a Postgres database instead of H2 file-based database, and more information is kept in the database: the encrypted target credentials keyring, automated rules definitions, discovered targets, and discovery plugins are all persisted in this database.
4. **S3-compatible object storage**: previous versions of Cryostat used direct storage of files on disk for archived Flight Recordings and custom Event Templates. Cryostat 3.0 no longer uses direct filesystem accesses for these kinds of binary large objects, but instead integrates with an S3-compatible storage provider. If you use the Cryostat Operator or Cryostat Helm Chart for installation, your deployment will include a lightly customized SeaweedFS container for a "batteries included" storage solution. If you roll your own deployment then you can swap this out for any S3-compatible storage provider you prefer or may already use.
5. **Reverse proxy architecture**: Cryostat 3.0 deployed by the Cryostat Operator or Helm Chart includes a reverse proxy (`openshift-oauth-proxy` or `oauth2_proxy`) in the Pod. Only this proxy is exposed to cluster traffic via a Service. This means that all API requests to Cryostat, as well as all visitors to the Cryostat Web UI or Grafana dashboard, flow through this proxy. The proxy handles user sessions to control access to the application, providing unified access control and user sessions for both the Cryostat Web UI and Grafana dashboard.
