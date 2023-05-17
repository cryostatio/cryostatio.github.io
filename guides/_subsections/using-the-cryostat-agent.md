## [Using the Cryostat Agent](#using-the-cryostat-agent)

The Cryostat Agent is a new component of Cryostat, implemented as a Java Instrumentation Agent, which acts as a plugin for applications running on the JVM. Prior to the Agent, Cryostat extracted data from the JVM by initiating a connection over JMX. It then fetches the data from JFR and pulls it over the network back toward the Cryostat to be accessible to end users.

The Agent works differently. It is responsible for fetching data from the JVM and sending it back to Cryostat over HTTP. The Agent works by looking for data within itself and the application it is plugged into. The Cryostat Agent locates Cryostat applications running on the network and it is able to initiate a connection with those applications. It is also able to communicate back to Cryostat about the Cryostat Agent and how to reach it. The Cryostat Agent also pushes its own Java Flight Recorder (JFR) data back to Cryostat by first initiating a network connection with Cryostat, which then analyzes and saves the data to makes it accessible to end users.

The programming interfaces for Cryostat and its Agent are designed to implement Cryostat's specific feature set, rather than being generalized and flexible like JMX. The benefit of this is that the security considerations are easier to understand and model, but choosing to use the Cryostat Agent over JMX may also forego the ability to interoperate with other JMX tooling such as JDK Mission Control, visualvm, jconsole, hawtio, etc.

<ol>
    <li>The Cryostat Agent retrieves a wide range of information from those Cryostat applications such as memory usage, CPU utilization, etc. </li>
    <li>The Cryostat analyzes these collected data to identify problems that might be affecting the application’s performance.</li>
    <li>The Agent is a third-party Java Instrumentation Agent for developers which can be installed on the target JVM program through the command-line arguments or directly attaching to the running JVM instance.</li>
    <li>The Agent is foreign code for developers to audit and inspect before including it in their application builds. It is a small amount of code to inspect and likely easier to trust than JMX.</li>
    <li>Unlike JMX, JVM doesn’t come with the Agent, so developers are required to add the Cryostat Agent to their application builds, then rebuild and deploy the application.</li>
    <li>Developers need to specify the JFR configuration in advance before the attached application starts. The configuration tells the Agent what kind of JFR data to collect and how often to send that data to Cryostat. This is necessary for Cryostat to save the data in storage for the user to analyze. At this point in time, the Agent does not allow for dynamically turning on and off JFR, and the data it collects will always be sent to Cryostat on a fixed consistent schedule.</li>
    <li>Once the Agent has been installed or attached to the running JVM instance, it can begin collecting data and sending it to Cryostat for analysis.</li>
</ol>

For instructions on how to install the Cryostat Agent into your applications, [check the Setup section in Getting Started](/get-started/#using-the-cryostat-agent).
