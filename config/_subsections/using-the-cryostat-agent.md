## [Using the Cryostat Agent](#using-the-cryostat-agent)

The **Cryostat Agent** is an optional component of **Cryostat**, implemented as a **Java Instrumentation Agent**, which acts as a plugin for applications running on the **JVM**. Prior to the **Agent**, **Cryostat** always extracted data from the **JVM** by initiating a connection over **JMX**. It then fetched the **JFR** data from an **MBean** and pulled it over the network back toward the **Cryostat** server to make it accessible to end users.

The **Agent** works differently. It is responsible for fetching data from the **JVM** and sending it back to **Cryostat** over `HTTP`. The **Agent** works by looking for **MBean** and **JFR** data within itself and the application it is plugged into. It is also able to communicate back to **Cryostat** about the application instance the **Cryostat Agent** is attached to and how to reach it. The **Cryostat Agent** also pushes its own Java Flight Recorder **(JFR)** data back to **Cryostat** by initiating network connections with **Cryostat**, which may then analyze and save the data to make it accessible to end users.

The **Agent** may also be configured, using the property `cryostat.agent.api.writes-enabled` or the corresponding environment variable `CRYOSTAT_AGENT_API_WRITES_ENABLED`, to allow bi-directional read-write access over `HTTP`. This enables dynamic *Start/Stop/Delete* of `Flight Recordings` as well as on-demand **JFR** pulls much like what **Cryostat** does over **JMX**.

The programming interfaces for **Cryostat** and its **Agent** are designed to implement **Cryostat's** specific feature set, rather than being generalized and flexible like **JMX**. The benefit of this is that the security considerations are easier to understand and model, but choosing to use the **Cryostat Agent** over **JMX** may also forego the ability to interoperate with other **JMX** tooling such as `JDK Mission Control`, `visualvm`, `jconsole`, `hawtio`, etc.

<ol>
    <li>The <b>Cryostat Agent</b> retrieves a wide range of information from those <b>Cryostat</b> applications such as <code>memory usage</code>, <code>CPU utilization</code>, etc. </li>
    <li>The <b>Cryostat</b> analyzes these collected data to identify problems that might be affecting the application’s performance.</li>
    <li>The <b>Agent</b> is a third-party <b>Java Instrumentation Agent</b> for developers which can be installed on the target <b>JVM</b> program through the command-line arguments or directly attaching to the running <b>JVM</b> instance.</li>
    <li>The <b>Agent</b> is foreign code for developers to audit and inspect before including it in their application builds. It is a small amount of code to inspect and likely easier to trust than <b>JMX</b>.</li>
    <li>Unlike <b>JMX</b>, the <b>JVM</b> doesn’t come with the <b>Agent</b> included, so developers are required to add the <b>Cryostat Agent</b> to their application builds, then rebuild and deploy the application.</li>
    <li>Once the <b>Agent</b> has been installed or attached to the running <b>JVM</b> instance, it can begin collecting data and sending it to <b>Cryostat</b> for analysis. If enabled, the <b>Cryostat</b> server that the <b>Cryostat Agent</b> is registered with may also begin to send remote management requests to dynamically <i>Start</i>, <i>Stop</i>, or <i>Delete</i> <code>Flight Recordings</code> as well as to retrieve <b>JFR</b> and <b>MBean</b> data.</li>
</ol>

More details about the configuration options for the **Cryostat Agent** [are available here](https://github.com/cryostatio/cryostat-agent/blob/{{site.data.versions.cryostat.release-branch}}/README.md#configuration).

For instructions on how to install the **Cryostat Agent** into your applications, [check the Setup section in Getting Started](/get-started/#using-the-cryostat-agent).
