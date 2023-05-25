---
layout: post
title: Cryostat 2.2.0 is Released!
date: 2022-11-15
synopsis: Cryostat 2.2.0 is here. Learn what's new in this release.
author: Andrew Azores
---

#### Table of Contents
* auto-gen TOC:
{:toc}
<hr>

Hello readers, and welcome back to the Cryostat blog. Today we have exciting news: Cryostat 2.2.0 is released!

Upstream container images and assets are available at the usual sources:
- [quay.io/repository/cryostat/cryostat](https://quay.io/repository/cryostat/cryostat?tab=tags)
- [quay.io/repository/cryostat/cryostat-operator](https://quay.io/repository/cryostat/cryostat-operator?tab=tags)
- [github.com/cryostatio/cryostat-helm](https://github.com/cryostatio/cryostat-helm/tree/cryostat-v2.2)
- etc.

If you're new to Cryostat or need a refresher, please feel free to peruse this website to get a sense of what Cryostat
is and does. The recommended way to install Cryostat on Kubernetes or OpenShift is via the `cryostat-helm` Helm Chart
or `cryostat-operator`, both listed above.

With that preamble out of the way, let's talk about what is new and different in Cryostat 2.2.0 compared to 2.1.1.

## Breaking Changes

- A new environment variable, `CRYOSTAT_JMX_CREDENTIALS_DB_PASSWORD`, must be defined with a non-empty value. If you
are using the Cryostat Operator to deploy Cryostat, then this value will be automatically generated and used if you
do not supply one. This is used by Cryostat's new backend JMX Credentials Keyring, which stores the JMX credentials
required by your target applications in an encrypted database managed by Cryostat. The password you supply is used to
encrypt those credentials within the database. Cryostat uses the password to decrypt the credentials as needed to
connect to your target applications, keeping the credentials in working memory only long enough to establish the JMX
connection.
- The `/api/v2.1` credentials endpoints have been deprecated. They are still present in this release but will be
removed in the future, likely for 2.3.0. These endpoints were used for stored target-specific JMX credentials. These
are superseded by [a new `matchExpression`-based JMX credentials implementation](/guides/#store-jmx-credentials).
    - `POST /api/v2.1/targets/:targetId/credentials`
    - `GET /api/v2.1/credentials`
    - `DELETE /api/v2.1/credentials/:id`
- Older endpoints for archived recordings have also been deprecated. Old versions of Cryostat stored archived
recordings in a flat directory and did not really preserve information about *where* the archived recording came from,
beyond including the target's *alias* in the filename. Work is still underway but Cryostat is getting smarter about
this and now divides the archives into subdirectories corresponding to target applications. Therefore, in the future,
API requests to ex. retrieve an *Automated Analysis Report* for an archived recording will need to use an API endpoint
that includes the source target in the request path.
    - `GET /api/v1/reports/:recordingName` and `GET /api/v2.1/recordings/:recordingName`
    - `POST /api/v1/recordings/:recordingName/upload`
    - `DELETE /api/v1/recordings/:recordingName`
These endpoints have `/api/beta` replacements that you can test out now if you are building your own automations around
the Cryostat API:
    - `GET /api/beta/recordings/:sourceTarget/:recordingName` and `GET /api/beta/recordings/:sourceTarget/:recordingName/jwt`
    - `POST /api/beta/recordings/:sourceTarget/:recordingName/upload`
    - `DELETE /api/beta/recordings/:sourceTarget/:recordingName`
- The Operator's *FlightRecorder* and *Recording* Custom Resources were previously deprecated and have now been
removed. Users should use the Cryostat API or Cryostat Web UI directly to create and manage their JDK Flight
Recordings.
- If migrating a Cryostat 2.1.x installation to Cryostat 2.2.0, your previously-archived recordings may be migrated and
moved within the archived storage directory. In the Cryostat Web UI you may find them moved to the
*Archives > All Archives > lost* view.

## New Features

Now for the fun stuff.

- [Automated Rules](/guides/#create-an-automated-rule) can be enabled and disabled. Previously, a Rule definition would
always be active and trigger new recordings to be started when new matching targets appeared, and the Rule would
immediately trigger on existing matching targets when the Rule was created. Now, there is a toggle switch available
when you create a Rule. It defaults to the *on* position, but you can turn it *off* so that you can create Rule
definitions that do not take immediate effect. From the *Automated Rules* table view you can toggle your Rule
definitions on and off at will.
    - Automated Rules also have a new *Initial Delay* property. The existing *Archival Period* would allow your Rule
    to copy JFR data to the Cryostat Archives at *n, 2n, 3n, ...* seconds after the rule triggered, where *n* is the
    *Archival Period* you configured. The *Initial Delay* lets you schedule archival to occur at *d+n, d+2n, 2+3n, ...*
    seconds after the rule triggers.
    - The Cryostat Web UI form for creating an Automated Rule now properly lists the Event Templates specific to the
    selected target application.
- JMX Credentials now use `matchExpression`s, just like Automated Rules. This means the credentials are no longer
specific to an individual target, distinguished by the `connectUrl` (JMX Service URL), but can be defined to match
on various properties of the target applications. This is especially useful in Kubernetes and OpenShift environments
where application deployments can scale up and down, or the URL for a target application instance can change if the
container crashes and restarts and is assigned a new IP address, for example. You will most likely want to copy-paste
your Automated Rule `matchExpression`s and create corresponding JMX Credentials with the same expression.
    - When you create an Automated Rule, it may match target applications that require JMX credentials. Previous
    versions of Cryostat would silently fail to connect to the target in this case and never trigger the Rule against
    those targets. You would need to either add credentials, then delete and re-add the rule, or add credentials and
    redeploy the target application. In Cryostat 2.2.0 there is an internal linked mechanism between Automated Rules
    and JMX Credentials, so if you define an Automated Rule that matches a target requiring credentials, you can
    subsequently add the credentials and Cryostat will automatically re-attempt to trigger the Rule against those
    matching targets.
- [JMC Bytecode Agent](https://github.com/openjdk/jmc/blob/master/agent/README.md) integration. Cryostat 2.1.0 had
a partial backend implementation for this, and this work is now completed in 2.2.0 including a new Cryostat Web UI
subview. The JMC Agent can be attached to your target applications, and with a bit of XML, can be used to inject
bytecode adding JFR events to your application at specific entrypoints. You can use this to inject events without
recompiling and rebuilding your application, and you can even use it to inject events into third-party code you don't
have sources for.
- Cryostat Web UI general polishing and improvements. There is a *lot* to list here so I just recommend you check it
out for yourself. There are new filters on views, new ways to interact with labels on your recordings, new confirmation
prompts when you try to do something potentially destructive, filesizes for archived recordings, and more.
- Performance improvements. The JMX connection caching system has been enhanced yet again and better supports cache size
limits as well as handles concurrent accesses to many targets better for most API requests, so throughput should be
increased.

There is one more big ticket item to talk about - the *Cryostat Discovery Plugin API*. This is a bigger topic which I
will write more about later, but if you're keen to learn more now you can check out these upstream development
documents:
- [Discovery Plugins](https://github.com/cryostatio/cryostat/blob/cryostat-v2.2/docs/DISCOVERY_PLUGINS.md)
- [HTTP API](https://github.com/cryostatio/cryostat/blob/cryostat-v2.2/docs/HTTP_API.md)
