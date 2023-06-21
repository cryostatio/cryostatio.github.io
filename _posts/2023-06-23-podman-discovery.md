---
layout: post
title: Discovering JVMs in Podman
date: 2023-06-23
synopsis: Explore Cryostat 2.3's new Podman discovery mechanism
author: Andrew Azores
---

#### Table of Contents
* auto-gen TOC:
{:toc}
<hr>

## Introduction

Last month, we [released Cryostat 2.3.0](/2023/05/26/cryostat-release) and called out `Podman API Discovery` as a notable new feature. Let's take a quick dive into that.

## Background

Older versions of Cryostat supported automatic startup detection of one deployment platform at a time (Kubernetes API or JDP), plus the Custom Targets system. In Cryostat 2.2, a new Discovery Plugin system was introduced, enabling additional mechanisms for target application detection alongside those mentioned above. In Cryostat 2.3, this is expanded once again with the Cryostat Agent - more details on that in another post to come - which implements a Discovery Plugin, with a reorganized implementation that allows multiple deployment platforms to be enabled at once, and with a brand new deployment platform implementation for the Podman REST API.

### Agent Side-note

As a quick summary, users can rebuild their applications to include the Cryostat Agent and use environment variables to enable the Agent to directly inform Cryostat about the application’s presence and location on the network. However, we recognize that not all users want to go through this process of adding a dependency and rebuilding their applications, especially not for simple proof-of-concept demonstrations involving Cryostat. Even simply updating an application image to add JVM flags (to enable JDP for example) to the startup script or launcher can be a challenge or may conflict with support contracts.

## Podman API Discovery

With these constraints in mind, the new Podman platform support in Cryostat can discover target applications running Podman containers without needing to enable JDP, bundle the Cryostat Agent, or configure any other technologies for service discovery. The Podman discovery mechanism only requires containers to be labeled with `io.cryostat.connectUrl`, for example:

```
podman run \
    --name myapp-1
    --pod mypod \
    --label io.cryostat.connectUrl="service:jmx:rmi:///jndi/rmi://localhost:9093/jmxrmi" \
    --rm -d quay.io/cryostat/cryostat:2.3.0
```

{% include tip.html 
text="The JMX Service URL provided by the io.cryostat.connectUrl label should reference the JMX port number exposed by your target application and use a hostname or domain name that resolves to your target application. Cryostat and the target application do not need to be colocated in the same Pod, and either or both may not be in Pods at all." %}

This feature requires the Podman API service to be running and accessible. Depending on your system you may need to configure this as a system service or may be able to configure it as a user service with e.g. `systemctl --user enable --now podman.socket`. For more information on how to deploy Cryostat with this functionality, see [the `podman-system-service` man page](https://docs.podman.io/en/latest/markdown/podman-system-service.1.html) and [how a Cryostat development script sets it up](https://github.com/cryostatio/cryostat/blob/bee2ffbc21c21fb231608e6c02e401fa0e951313/run.sh#L137).

Cryostat queries the Podman API for containers with this label, and uses the value as the URL for connecting to the application within the container. If the target application uses the Cryostat Agent then this may be an HTTP URL. Other kinds of JMX URL can also be used, such as `remote+http`, by adding the necessary library JAR files to the Cryostat `clientlib` configuration directory.

Containers discovered via the Podman API will also be grouped into their respective Pods, if any, in the new Cryostat 2.3 Topology view - watch this space for a feature highlight on that, too.
