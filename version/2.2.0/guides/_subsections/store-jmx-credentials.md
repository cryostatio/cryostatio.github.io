## [Store JMX Credentials](#store-jmx-credentials)
If you have Java Management Extensions (JMX) authentication enabled on your containerized JVMs, Cryostat will prompt you to enter your JMX credentials before it can access the JDK flight recordings on your target JVMs. When monitoring multiple target JVMs with Cryostat features such as <a href="{{ page.url }}#create-an-automated-rule">Automatic Rules</a>, you may want Cryostat to remember and reuse your JMX credentials for each target connection. JMX credentials are automatically stored when you navigate to the <i>Recordings</i> tab and select a target JVM with JMX authentication enabled.

Cryostat stores JMX credentials according to each target’s unique JMX service URL, also known as a connection URL. Even if the underlying JVM instance changes, the target alias changes, or the target application restarts, Cryostat will apply the stored JMX credentials to the connection URL that the credentials are associated with.

Here’s how to manage stored JMX credentials with the Cryostat web UI.

<ol>
  <li>
    {% include howto_step.html
      summary="Navigate to the Security tab"
      image-name="2.1.0/store-jmx-credentials-1.png"
      text="
        First, navigate to the <i>Security</i> tab. The Stored Credentials table lists all targets for which Cryostat has stored JMX credentials. Click <i>Add</i> to enter JMX credentials for your desired target JVM.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Enter your JMX credentials"
      image-name="2.1.0/store-jmx-credentials-2.png"
      text="A modal will appear, prompting you to select a target JVM and enter your JMX credentials."
    %}
  </li>
    <li>
    {% include howto_step.html
      summary="(Alternative to Steps 1 and 2) Store JMX Credentials when connecting to a target JVM"
      image-name="2.1.0/navigate-to-recordings-1.png"
      text="
        Alternatively, JMX credentials will also be stored if you navigate to either the <i>Recordings</i> tab or the <i>Events</i> tab and select a target JVM with JMX authentication enabled. The authentication form will appear, prompting you to enter your JMX credentials. The credentials will be automatically stored and will appear in the Stored JMX Credentials table.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View your stored JMX credentials"
      image-name="2.1.0/store-jmx-credentials-3.png"
      text="
        The target name will appear on the <i>Stored Credentials</i> table to indicate that Cryostat has stored JMX credentials for that target. As a security precaution, you will not be able to view the actual credentials after you have submitted them. To remove any stored credentials, select the checkbox next to the target and click <i>Delete</i>.
      "
    %}
  </li>
</ol>
