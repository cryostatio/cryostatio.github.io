---
layout: post
title: Cryostat 2.3.1 is Released!
date: 2023-09-18
synopsis: Cryostat 2.3.1 is here. Learn what's new in this release.
author: Andrew Azores
---

#### Table of Contents
* auto-gen TOC:
{:toc}
<hr>

Hello everyone,

We are pleased to announce the release of Cryostat 2.3.1! This is a minor bugfix release addressing some issues
uncovered with the previous 2.3.0 feature release.

## [What’s Fixed in 2.3.1?](#whats-new-in-231)
1. routine maintenance: dependency version updates and container base image version updates
2. "Log Out" from the Cryostat Web UI was previously broken on OCP 4.12+:
    - [cryostat#1489](https://github.com/cryostatio/cryostat/issues/1489)
    - [cryostat-web#1059](https://github.com/cryostatio/cryostat-web/pull/1059)
    - [cryostat-operator#599](https://github.com/cryostatio/cryostat-operator/pull/599)
3. Deleting an OpenShift Namespace containing a Cryostat installation could hang:
    - [cryostat-operator#584](https://github.com/cryostatio/cryostat-operator/issues/584)
    - [cryostat-operator#593](https://github.com/cryostatio/cryostat-operator/issues/593)
4. Cryostat Web dashboard configuration could become broken and fail to reload cards:
    - [cryostat-web#1024](https://github.com/cryostatio/cryostat-web/pull/1024)
5. Cryostat could fail to discover target applications if the application takes some time to become ready and JMX-connectable:
    - [cryostat#1577](https://github.com/cryostatio/cryostat/issues/1577)
    - [cryostat#1593](https://github.com/cryostatio/cryostat/pull/1593)
6. Cryostat could fail to start Flight Recordings on some target application JVMs:
    - [cryostat#1516](https://github.com/cryostatio/cryostat/issues/1516)
    - [cryostat-core#228](https://github.com/cryostatio/cryostat-core/pull/228)
    - [cryostat#1525](https://github.com/cryostatio/cryostat/pull/1525)
7. Cryostat would fail to connect to GraalVM native images:
    - [cryostat-core#217](https://github.com/cryostatio/cryostat-core/pull/217)
    - [cryostat-core#222](https://github.com/cryostatio/cryostat-core/pull/222)
    - [cryostat-core#228](https://github.com/cryostatio/cryostat-core/pull/228)
    - [cryostat#1525](https://github.com/cryostatio/cryostat/pull/1525)
8. Cryostat Agent would create Stored Credentials with a Match Expression that could result in the credentials being erroneously used for JMX connections to the attached host JVM:
    - [cryostat-agent#133](https://github.com/cryostatio/cryostat-agent/issues/133)
    - [cryostat-agent#134](https://github.com/cryostatio/cryostat-agent/issues/134)
    - [cryostat-agent#154](https://github.com/cryostatio/cryostat-agent/issues/154)
    - [cryostat-agent#156](https://github.com/cryostatio/cryostat-agent/issues/156)
9. Cryostat Agent would publish itself as a Discovery Node with the wrong JMX port number in its annotations:
    - [cryostat-agent#153](https://github.com/cryostatio/cryostat-agent/issues/153)
    - [cryostat-agent#157](https://github.com/cryostatio/cryostat-agent/issues/157)
10. Cryostat would incorrectly fail validation of certain JMC Agent probe templates, and after validation failures would reject further template creation requests:
    - [cryostat-core#238](https://github.com/cryostatio/cryostat-core/issues/238)
    - [cryostat-core#239](https://github.com/cryostatio/cryostat-core/issues/239)
    - [cryostat-core#241](https://github.com/cryostatio/cryostat-core/issues/241)
    - [cryostat-core#243](https://github.com/cryostatio/cryostat-core/issues/243)
11. Cryostat would refuse Automated Rules creation requests using `multipart/form-data`:
    - [cryostat#1490](https://github.com/cryostatio/cryostat/issues/1490)
    - [cryostat#1499](https://github.com/cryostatio/cryostat/issues/1499)
12. Cryostat Helm chart instances would use a hardcoded credentials secret name, which would conflict if multiple instances were installed to the same namespace:
    - [cryostat-helm#62](https://github.com/cryostatio/cryostat-helm/issues/62)
    - [cryostat-helm#65](https://github.com/cryostatio/cryostat-helm/issues/65)
13. Cryostat environment variable `CRYOSTAT_DISABLE_SSL` was handled inconsistently and would not always disable server SSL as expected:
    - [cryostat#1507](https://github.com/cryostatio/cryostat/issues/1507)
    - [cryostat#1570](https://github.com/cryostatio/cryostat/issues/1570)
14. Cryostat environment variable `CRYOSTAT_DISABLE_BUILTIN_DISCOVERY` would also disable Custom Targets, and could break server startup in some scenarios:
    - [cryostat#1505](https://github.com/cryostatio/cryostat/pull/1505)
    - [cryostat#1506](https://github.com/cryostatio/cryostat/pull/1506)
15. Cryostat built-in discovery mechanisms could block server startup if they failed to activate:
    - [cryostat#1546](https://github.com/cryostatio/cryostat/issues/1546)
    - [cryostat#1549](https://github.com/cryostatio/cryostat/issues/1549)
16. Some minor graphical fixups in Cryostat Web:
    - [cryostat-web#1019](https://github.com/cryostatio/cryostat-web/issues/1019)
    - [cryostat-web#1041](https://github.com/cryostatio/cryostat-web/issues/1041)
    - [cryostat-web#1049](https://github.com/cryostatio/cryostat-web/pull/1049)

## Where can I get the latest version of Cryostat?
You can install Cryostat using our
[Kubernetes operator on OperatorHub.io](https://operatorhub.io/operator/cryostat-operator)
or via a
[Helm Chart](https://github.com/cryostatio/cryostat-helm/releases/tag/v0.3.1)
. As always, you can also run Cryostat in other environments with a little more manual setup.

If this is your first time installing Cryostat on Kubernetes, you can [Get Started](/get-started) right here on this
website.

If you had previously installed Cryostat Operator 2.3.0 with OLM, then you may have already been upgraded to 2.3.1, or
else you should be able to approve and install the upgrade.

## Feedback
Please reach out to the [Cryostat mailing list](mailto:cryostat-development@googlegroups.com) or
[GitHub Discussion](https://github.com/cryostatio/cryostat/discussions/1659) with any questions or comments.
