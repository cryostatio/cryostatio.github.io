## [Using the Cryostat Agent](#using-the-cryostat-agent)

The Cryostat Agent is an optional component of Cryostat, implemented as a Java Instrumentation Agent, which acts as a plugin for applications running on the JVM. Prior to the Agent, Cryostat always extracted data from the JVM by initiating a connection over JMX. It then fetched the JFR data from an MBean and pulled it over the network back toward the Cryostat server to make it accessible to end users.

The Agent works differently. It is responsible for fetching data from the JVM and sending it back to Cryostat over HTTP. The Agent works by looking for MBean and JFR data within itself and the application it is plugged into. It is also able to communicate back to Cryostat about the application instance the Cryostat Agent is attached to and how to reach it. The Cryostat Agent also pushes its own Java Flight Recorder (JFR) data back to Cryostat by initiating network connections with Cryostat, which may then analyze and save the data to makes it accessible to end users.

The Agent may also be configured, using the property `cryostat.agent.api.writes-enabled` or the corresponding environment variable `CRYOSTAT_AGENT_API_WRITES_ENABLED`, to allow bi-directional read-write access over HTTP. This enables dynamic start/stop/delete of Flight Recordings as well as on-demand JFR pulls much like what Cryostat does over JMX.

The programming interfaces for Cryostat and its Agent are designed to implement Cryostat's specific feature set, rather than being generalized and flexible like JMX. The benefit of this is that the security considerations are easier to understand and model, but choosing to use the Cryostat Agent over JMX may also forego the ability to interoperate with other JMX tooling such as JDK Mission Control, visualvm, jconsole, hawtio, etc.

<ol>
    <li>The Cryostat Agent retrieves a wide range of information from those Cryostat applications such as memory usage, CPU utilization, etc. </li>
    <li>The Cryostat analyzes these collected data to identify problems that might be affecting the application’s performance.</li>
    <li>The Agent is a third-party Java Instrumentation Agent for developers which can be installed on the target JVM program through the command-line arguments or directly attaching to the running JVM instance.</li>
    <li>The Agent is foreign code for developers to audit and inspect before including it in their application builds. It is a small amount of code to inspect and likely easier to trust than JMX.</li>
    <li>Unlike JMX, the JVM doesn’t come with the Agent included, so developers are required to add the Cryostat Agent to their application builds, then rebuild and deploy the application.</li>
    <li>Once the Agent has been installed or attached to the running JVM instance, it can begin collecting data and sending it to Cryostat for analysis. If enabled, the Cryostat server that the Cryostat Agent is registered with may also begin to send remote management requests to dynamically start, stop, or delete Flight Recordings as well as to retrieve JFR and MBean data.</li>
</ol>

For instructions on how to install the Cryostat Agent into your applications, [check the Setup section in Getting Started](/get-started/#using-the-cryostat-agent).
