## [Configure the Agent Harvester](#configure-the-agent-harvester)

The **Cryostat Agent** contains a **Harvester** feature that allows you to start a new recording with a  given event template on agent initialization, and periodically push the collected **JFR** data to the associated **Cryostat** server. The **Agent** will also attempt to push the tail end of this recording on **JVM** shutdown so that the cause of an unexpected **JVM** shutdown can be captured for later analysis.

The **Harvester** supports a number of configuration options that can be used to determine how often it pushes the collected **JFR** data, the template to be used and limitations on how much data to collect, as well as how long the upload may take. The following configuration options are available:

- `cryostat.agent.harvester.period-ms` [`long`]: the length of time between JFR collections and pushes by the harvester. This also controls the maximum age of data stored in the buffer for the harvester's managed Flight Recording. Every `period-ms` the harvester will upload a JFR binary file to the `cryostat.agent.baseuri` archives. Default `-1`, which indicates no scheduled harvest uploading will be performed.
- `cryostat.agent.harvester.template` [`String`]: the name of the `.jfc` event template configuration to use for the harvester's managed Flight Recording. For example, if the application image contains `/usr/lib/jvm/java-17-openjdk/lib/jfr/default.jfc` then this value would be simply be `default`. This can also be the value of the `label` attribute of the root element within that file, for example `Continuous`. Defaults to the empty string, so that no recording is started.
- `cryostat.agent.harvester.max-files` [`String`]: the maximum number of pushed files that Cryostat will keep from the agent. This is included with the harvester's push requests and instructs Cryostat to prune, in a FIFO manner, the oldest JFR files within the attached JVM target's storage, while the number of stored recordings is greater than this configuration's maximum file limit. Default `2147483647` (`Integer.MAX_VALUE`).
- `cryostat.agent.harvester.upload.timeout-ms` [`long`]: the duration in milliseconds to wait for HTTP upload requests to the Cryostat server to complete and respond. Default `30000`.
- `cryostat.agent.harvester.exit.max-age-ms` [`long`]: the JFR `maxage` setting, specified in milliseconds, to apply to recording data uploaded to the Cryostat server when the JVM this Agent instance is attached to exits. This ensures that tail-end data is captured between the last periodic push and the application exit. Exit uploads only occur when the application receives `SIGINT`/`SIGTERM` from the operating system or container platform.
- `cryostat.agent.harvester.exit.max-size-b` [`long`]: the JFR `maxsize` setting, specified in bytes, to apply to exit uploads as described above.
- `cryostat.agent.harvester.max-age-ms` [`long`]: the JFR `maxage` setting, specified in milliseconds, to apply to periodic uploads during the application lifecycle. Defaults to `0`, which is interpreted as 1.5x the harvester period (`cryostat.agent.harvester.period-ms`).
- `cryostat.agent.harvester.max-size-b` [`long`]: the JFR `maxsize` setting, specified in bytes, to apply to periodic uploads during the application lifecycle. Defaults to `0`, which means `unlimited`.

Note that the **Harvester Period** and **Template** options must be set for the **Harvester** to regularly push **JFR** data. If only the **Template** is set the **Harvester** will only attempt to push on shutdown. If neither are set the **Harvester** will not do anything unless configured alongside **Smart Triggers** as described below.

These configuration options may be set either as **JVM** system properties, for example:

```
-Dcryostat.agent.harvester.period-ms=1000
-Dcryostat.agent.harvester.template=Profiling
```

or by setting them as environment variables, for example:

```
- name: CRYOSTAT_AGENT_HARVESTER_PERIOD_MS
  value: 1000
- name: CRYOSTAT_AGENT_HARVESTER_TEMPLATE  
  value: Profiling
```
#### [MBean Trigger Integration](#mbean-trigger-integration)

When the **Cryostat Agent** is configured to start dynamic recordings based on custom MBean triggers, you can also integrate them with the **Harvester** to automatically push the collected **JFR** data to the **Cryostat Server**.

By defining MBean custom triggers and an agent harvester period without a harvester template, you can achieve a setup where the agent does both of the following:

- Agent dynamically starts JFR recordings based on MBean custom triggers.
- Agent uses configured harvester periods to periodically capture snapshots of the recording data and upload this data to the Cryostat server. 

In this situation, the agent will continue to capture recording data until you manually stop the dynamic JFR recording or the host JVM shuts down. 

For instructions on how to install the **Cryostat Agent** into your applications, [check the Setup section in Getting Started](/get-started/#using-the-cryostat-agent).
