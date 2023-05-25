---
layout: post
title: Cryostat 2.3.0 is Released!
date: 2023-05-23
synopsis: Cryostat 2.3.0 is here. Learn what's new in this release.
author: Andrew Azores
toc: true
---

Hello everyone,

We are pleased to announce the release of Cryostat 2.3!

## What’s New in 2.3?
- **[Cryostat Agent](/guides#using-the-cryostat-agent)**: an agent can be included in your deployment, which
    facilitates application discovery and JFR operations over HTTP API
- **[Cross-namespace target discovery](/get-started/#using-clustercryostats)**: a `ClusterCryostat` custom resource can
    be configured to communicate with applications deployed across multiple namespaces
- **Web interface enhancements**:
  - **Quick starts and Guided Tour**: short tutorials on how to navigate and perform basic functions in Cryostat
  - **[Topology view with bulk actions](/guides#use-topology-view)**: view your deployed applications in a topology
  view and create JFR recordings in bulk
  - **[Customizable dashboards](/guides#navigate-the-dashboard)**: view and configure cards displaying your JVM metrics on a dashboard
- **Podman API**: Discover target applications using Podman HTTP API. This requires the Podman service to be running.
    You might try `systemctl --user enable --now podman.socket`. The next time you run Cryostat under your user it will
    be able to talk to Podman and query for running containers with the label `io.cryostat.connectUrl`. The value of
    this label is expected to be a JMX service URL for the JVM within the container.

## What’s Next?
- Additional types of analyses and visualizations
- Smart triggering of JFR start/stop based on JVM conditions

## Where can I get the latest version of Cryostat?
You can install Cryostat using our
[Kubernetes operator on OperatorHub.io](https://operatorhub.io/operator/cryostat-operator)
or via a
[Helm Chart](https://github.com/cryostatio/cryostat-helm/releases/tag/v0.3.0)
. As always, you can also run Cryostat in other environments with a little more manual setup.

If this is your first time installing Cryostat on Kubernetes, you can [Get Started](/get-started) right here on this
website.

If you had previously installed Cryostat Operator 2.2.0 with OLM then you may have already been upgraded to 2.3.0, or
else you should be able to approve and install the upgrade.

## Blogs
This is a really big release with many new features, including several that have been long requested by the community.
Watch this space for more posts about some of the "What's New" items above.

## Feedback
Our team is very excited to present this update to Cryostat and we look forward to your feedback. Please reach out to
the [Cryostat mailing list](mailto:cryostat-development@googlegroups.com) or
[GitHub Discussion](https://github.com/cryostatio/cryostat/discussions/1493) with any questions or comments.
