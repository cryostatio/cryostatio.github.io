---
layout: post
title: Cryostat 3.0.1 is Released!
date: 2024-09-24
synopsis: Cryostat 3.0.1 is here. Learn what's new in this release.
author: Andrew Azores
---

#### Table of Contents
* auto-gen TOC:
{:toc}
<hr>

Hello everyone,

We are pleased to announce the release of Cryostat 3.0.1! This is a minor bugfix release addressing some issues
uncovered with the previous 3.0.0 feature release.

## [What’s Fixed in 3.0.1?](#whats-new-in-301)
1. routine maintenance: dependency version updates and container base image version updates
2. [Failure to create or update a Cryostat custom resource due to webhook TLS errors](https://github.com/cryostatio/cryostat-operator/pull/927)
3. [Inability to upload JMC ByteCode Agent instrumentation templates](https://github.com/cryostatio/cryostat-core/pull/454)
4. [Archived Recording uploads with Labels File fails to parse](https://github.com/cryostatio/cryostat-web/pull/1327)
5. [Topology View fails to filter JVM Targets by Label/Annotation](https://github.com/cryostatio/cryostat-web/pull/1314)
6. [MatchExpressions cannot use the target.agent property](https://github.com/cryostatio/cryostat/pull/599)


## Where can I get the latest version of Cryostat?
You can install Cryostat using our
[Kubernetes operator on OperatorHub.io](https://operatorhub.io/operator/cryostat-operator)
or via a
[Helm Chart](https://github.com/cryostatio/cryostat-helm/releases/tag/v1.0.1)
. As always, you can also run Cryostat in other environments with a little more manual setup.

If this is your first time installing Cryostat on Kubernetes, you can [Get Started](/get-started) right here on this
website.

If you had previously installed Cryostat Operator 3.0.0 with OLM, then you may have already been upgraded to 3.0.1, or
else you should be able to approve and install the upgrade.

## Feedback
Please reach out to the [Cryostat mailing list](mailto:cryostat-development@googlegroups.com) or
[GitHub Discussion](https://github.com/cryostatio/cryostat/discussions/1659) with any questions or comments.
