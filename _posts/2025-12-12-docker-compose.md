---
layout: post
title: Deploying Cryostat in Docker Compose
date: 2025-12-12
synopsis: Deploy Cryostat in Docker Compose to collect JFR analysis
author: Andrew Azores
---

#### Table of Contents
* auto-gen TOC:
{:toc}
<hr>

## Intro

Although most of this website and other external documentation about Cryostat focuses on how to install and use it in a
Kubernetes or OpenShift environment, none of that is actually required for Cryostat itself. Cryostat could be run as a
bare metal JVM process, and it can certainly be run as an OCI container in a Docker/Podman environment - in fact,
day-to-day Cryostat development testing mostly takes place in Podman containers and doesn't touch Kubernetes at all!

Since Cryostat 3.0 the development testing setup has relied on YAML `docker-compose` definition files to piece together
an installation. This is done by the [`smoketest.bash`](https://github.com/cryostatio/cryostat/blob/main/smoketest.bash)
script and [various YAML base files](https://github.com/cryostatio/cryostat/tree/main/compose). The smoketest script
supports a small suite of command line switches and environment variables to customize exactly what gets deployed,
which is obviously useful in development to test various scenarios (like different S3-like object storage providers).

It is also possible to run the script in a dry-run mode and have it print out the final Docker Compose YAML definition,
rather than continuing to actually deploy it. There are a few configuration volumes that are also created and mounted
by the script, such as the one that contains the proxy config and `htpasswd` file for the `oauth2-proxy` container.
There is a walkthrough of this process and some sample configuration files that can be downloaded
[on the project's GitHub Wiki page](https://github.com/cryostatio/cryostat/wiki/Deploying-Cryostat-in-Docker-or-Podman-Compose).
In particular, you might want to try customizing the Cryostat Compose YAML using the `-s ext` flag, which allows you
to hook up Cryostat to an external S3-like object storage provider. This could be another self-hosted Docker Compose
project you're running locally, or it could be a commercial service - it's up to you to decide what fits best.

## Objective

Java, containers, Docker/Podman, and observability are all common things nowadays. In the same way that there are many
people, teams, and businesses deploying Java in containers to Kubernetes clouds every day - or multiple times per day -
and needing a way to profile and observe *how* those Java VMs are performing, there are people, teams, and businesses
running their workloads *without* Kubernetes. So let's put together a scenario where someone might be deploying a Java-
based application in their home lab, or on their small office NAS, or in the corner of their startup's garage, running
Compose instead of Kubernetes.

## Setup

{% include tip.html 
text="This example will use Podman and <code>podman-compose</code>, but should also work with little to no modification with Docker and Docker Compose." %}

### Application

Let's put together a `compose.yml` for a sample application. In practice this might be a Compose file you download from
the project you're trying to deploy, or it could be a Compose file you've written yourself to deploy the thing you're
developing. I'll use [Cryostat's `quarkus-petclinic`](https://github.com/cryostatio/cryostat/blob/main/compose/sample_apps/quarkus-petclinic.yml)
testing sample, which is based on [this demo `quarkus-petclinic`](https://github.com/redhat-developer-demos/quarkus-petclinic).

```yaml
name: petclinic-cryostat
services:
  quarkus-petclinic:
    image: ${QUARKUS_PETCLINIC_IMAGE:-quay.io/redhat-java-monitoring/quarkus-petclinic:latest}
    hostname: quarkus-petclinic
    depends_on:
      quarkus-petclinic-db:
        condition: service_healthy
    ports:
      - "10011:10011"
    environment:
      QUARKUS_HTTP_HOST: 0.0.0.0
      QUARKUS_HTTP_PORT: 10011
      QUARKUS_DATASOURCE_JDBC_URL: jdbc:postgresql://quarkus-petclinic-db:5432/petclinic
    restart: always
    healthcheck:
      test: curl --fail http://localhost:10010 || exit 1
      interval: 10s
      retries: 3
      start_period: 30s
      timeout: 5s

  quarkus-petclinic-db:
    image: "quay.io/sclorg/postgresql-15-c9s"
    deploy:
      resources:
        limits:
          cpus: "1"
          memory: 128m
    environment:
      - POSTGRESQL_USER=developer
      - POSTGRESQL_PASSWORD=developer
      - POSTGRESQL_DATABASE=petclinic
    healthcheck:
      test: ["CMD-SHELL", "pg_isready --dbname $$POSTGRES_DB --username $$POSTGRES_USER"]
      interval: 5s
      timeout: 5s
      retries: 6
    ports:
      - "5432:5432"
```

This just describes a simple Quarkus-based webserver application in one container, and a Postgres database in a second
container, with a bit of configuration to tell the application how to hook up to that database.

Save this YAML as `petclinic.yml`, then run `podman compose up -f petclinic.yml` in a terminal to spin up the
application. Wait a few moments for the two containers to come up and become ready, then go to
[`http://localhost:10011`](http://localhost:10011) and ensure it is running. Then return to your terminal and press
`Ctrl-c` to shut it down for now.

### Cryostat

As I mentioned above, there is a more complete description of the Cryostat setup process 
[on the project's GitHub Wiki page](https://github.com/cryostatio/cryostat/wiki/Deploying-Cryostat-in-Docker-or-Podman-Compose)
with sample configuration volume files.

Download the `.tar.gz` configuration file volumes and import them as instructed. Copy the main `cryostat-compose.yml`
YAML file content and save it locally. Then, run `podman compose -f cryostat-compose.yml up -d`, wait for the containers
to pull, start, and become healthy, then go to [`https://localhost:8443`](https://localhost:8443) to ensure Cryostat is
up and running in the background.

### Linking Up

Now that we have Cryostat up and running, let's get our application running again and in a way that Cryostat is able
to see it and collect that precious performance data. Modify your `petclinic.yml` to add some container labels and
enable JMX:

```yaml
name: petclinic-cryostat # this must match the name: property of the petclinic.yml
services:
  quarkus-petclinic:
    labels:
      io.cryostat.discovery: "true"
      io.cryostat.jmxHost: "quarkus-petclinic" # this must match the service's name
      io.cryostat.jmxPort: "11223" # this must match the jmxremote.port and jmxremote.rmi.port number configured below
    environment:
      JAVA_OPTS_APPEND: >-
        -Dcom.sun.management.jmxremote
        -Dcom.sun.management.jmxremote.port=11223
        -Dcom.sun.management.jmxremote.rmi.port=11223
        -Djava.rmi.server.hostname=quarkus-petclinic # this must also match the service's name
        -Dcom.sun.management.jmxremote.authenticate=false
        -Dcom.sun.management.jmxremote.ssl=false
        -Dcom.sun.management.jmxremote.local.only=false
    ...
```

This is only a demo, so we're skipping JMX authentication and TLS setup. You should always configure this on your
production workloads, and check [the guides on this site](/guides/) for instructions on how to configure Cryostat to
work with [JMX+TLS](/guides/#add-a-trusted-certificate) and [JMX+auth](/guides/#store-credentials).
Depending on your Java application, framework, base image, entrypoint script, etc. you may need to change the
`JAVA_OPTS_APPEND` environment variable name or use a different configuration entirely.

Let's start up this application again and run it in the background: `podman compose -f petclinic.yml up -d`. Go back
to Cryostat at [`https://localhost:8443/topology`](https://localhost:8443/topology) and
[check out the Topology view](/guides/#use-topology-view). You should see a target JVM named
`compose-quarkus-petclinic-1`.

## Cleaning Up

`podman compose -f cryostat-compose.yml down` can be used to tear down the Cryostat installation. You can also pass
`--volumes` if you'd like to delete the persistent volumes that were attached to this installation, which contain
captured data such as archived Flight Recording files.

Likewise, `podman compose -f petclinic.yml down [--volumes]` can be used to tear down the `quarkus-petclinic`
application.

### Upgrading Cryostat

Let's say you have followed this guide and installed Cryostat 4.1.0, which is the current latest version. Later down
the line you notice that Cryostat 4.1.1 or Cryostat 4.2.0 has been released, and you want to upgrade your
Cryostat-in-Compose installation. How would you do that?

Using the same `cryostat-compose.yml` file from before, do `podman compose -f cryostat-compose.yml down`.
Then follow the [guide on getting a Cryostat Compose file](https://github.com/cryostatio/cryostat/wiki/Deploying-Cryostat-in-Docker-or-Podman-Compose)
again, and replace the `cryostat-compose.yml` to ensure that all of the appropriate updates have been made to container
version tags, environment variables, etc. Then, `podman compose -f cryostat-compose.yml up -d` will spin up the updated
deployment, apply any database migrations, and restore your Cryostat functionality.
