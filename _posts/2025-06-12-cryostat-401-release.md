---
layout: post
title: Cryostat 4.0.1 is Released!
date: 2025-06-12
synopsis: Cryostat 4.0.1 is here. Learn what's new in this release.
author: Andrew Azores
---

#### Table of Contents
* auto-gen TOC:
{:toc}
<hr>

Hello everyone,

We are pleased to announce the release of Cryostat 4.0.1! This is a minor bugfix release addressing some issues
uncovered with the previous 4.0.0 feature release.

## [What’s Fixed in 4.0.1?](#whats-new-in-401)
1. Routine maintenance: dependency version updates and container base image version updates
2. **Cryostat** `Automated Rules` error handling was improved
3. **Cryostat** `Discovery` only *Custom Targets* should be deletable
4. **Cryostat** `Discovery` handles *Kubernetes Services (Endpoints)* which have `nil` *targets*
5. **Cryostat Agent** `logging` goes to `stdout` by default, not `stderr`, can be configured using Agent properties overrides arguments, and passes down log level to the *Red Hat Insights client*
6. **Cryostat Agent** `shutdown` avoids a potential NPE
7. **Cryostat Agent** `recording queries` include recordings started by the Agent's own *Harvester* facility
8. **Cryostat Agent** `startup` performs callback DNS resolution within the discovery registration loop, not only once on startup
9. **Cryostat Operator** `autoconfig` allows control of the *Agent's* log level, and disables *Agent* logging by default
10. **Cryostat Operator** `secrets/configmaps` are hashed and appended to *Deployment pod templates* so that configuration updates like renewed certificates cause a rollout
11. **Cryostat Operator** `reports` sidecars are correctly configured so that they handle automated analysis report generations
12. **Cryostat OpenShift Console Plugin** `proxy` handles connection failures to upstream Cryostat instances gracefully, avoiding proxy restart
13. **Cryostat OpenShift Console Plugin** `dashboard` correctly updates *MBean Metrics* charts
14. **Cryostat Storage** `volumes` configuration by the entrypoint script respect the underlying implementation's enforced limits

For further details on these items, [check the GitHub Discussions release announcement](https://github.com/cryostatio/cryostat/discussions/938).

## Where can I get the latest version of Cryostat?
You can install Cryostat using our
[Kubernetes operator on OperatorHub.io](https://operatorhub.io/operator/cryostat-operator)
or via a
[Helm Chart](https://github.com/cryostatio/cryostat-helm/releases/tag/v2.0.1)
. As always, you can also run Cryostat in other environments with a little more manual setup.

If this is your first time installing Cryostat on Kubernetes, you can [Get Started](/get-started) right here on this
website.

If you had previously installed Cryostat Operator 4.0.0 with OLM, then you may have already been upgraded to 4.0.1, or
else you should be able to approve and install the upgrade.

## Feedback
Please reach out to the [Cryostat mailing list](mailto:cryostat-development@googlegroups.com) or
[GitHub Discussion](https://github.com/cryostatio/cryostat/discussions/938) with any questions or comments.
