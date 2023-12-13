---
layout: post
title: Cryostat 2.4.0 is Released!
date: 2023-12-14
synopsis: Cryostat 2.4.0 is here. Learn what's new in this release.
author: Andrew Azores
---

#### Table of Contents
* auto-gen TOC:
{:toc}
<hr>

Hello everyone,

We are pleased to announce the release of Cryostat 2.4.0! This is a feature release with the following key highlights compared to 2.3.1:

1. **ARM64 support**: support added for using Cryostat on ARM64 (aarch64) architecture
2. **Cryostat Agent** enhancements:
    - **HTTP API** support for JFR **write** operations: enables the Cryostat agent to accept on-demand requests to start, stop, and delete JFR recordings for any target JVMs that have an agent HTTP connection
    - **Smart triggers** :custom trigger conditions based on MBean counters (memory, thread, operating system metrics) can be configured to dynamically start JFR recordings

This was a relatively smaller feature release compared to some previous ones. That's because more of our development effort has already
shifted to the next major release: [Cryostat 3.0](https://github.com/cryostatio/cryostat3). Stay tuned for more in-depth details about
what 3.0 will entail. For now, here are two things you can expect from 3.0:

1. **Smart Trigger** enhancements: API and "ergonomics"
2. **S3 compatible** object storage for Cryostat archives

## Where can I get the latest version of Cryostat?
You can install Cryostat using our
[Kubernetes operator on OperatorHub.io](https://operatorhub.io/operator/cryostat-operator)
or via a
[Helm Chart](https://github.com/cryostatio/cryostat-helm/releases/tag/v0.4.0)
. As always, you can also run Cryostat in other environments with a little more manual setup.

If this is your first time installing Cryostat on Kubernetes, you can [Get Started](/get-started) right here on this
website.

If you had previously installed Cryostat Operator 2.3.1 with OLM, then you may have already been upgraded to 2.4.0, or
else you should be able to approve and install the upgrade.

## Feedback
Please reach out to the [Cryostat mailing list](mailto:cryostat-development@googlegroups.com) or
[GitHub Discussion](https://github.com/cryostatio/cryostat/discussions/1817) with any questions or comments.
