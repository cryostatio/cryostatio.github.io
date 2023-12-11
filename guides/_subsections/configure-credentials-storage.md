## [Configure Credentials Storage](#configure-credentials-storage)

Target JVM applications may require Cryostat to pass an authentication challenge before being able to communicate over JMX or HTTP
and manage JFR. Cryostat has two supported mechanisms for these credentials:
<ol>
  <li>
    <b>Credentials Keyring</b>: see <a href="#store-credentials">Store Credentials</a> for more detail.
    This mechanism entails uploading a Credentials definition to the Cryostat backend keyring storage. Cryostat
    automatically checks the keyring for credentials matching a target application when a request to that application
    is opened. If no credentials are found, Cryostat responds to the requesting client (e.g. the Cryostat Web UI) with
    a response indicating the authentication failure.
  </li>
  <li>
    <b>X-JMX-Authorization</b> header passthrough: when the Cryostat Web UI receives a JMX authentication failure response
    from the Cryostat server, it displays a prompt asking for JMX credentials. Depending on the configuration set in this
    section, those credentials may either be held locally in your browser session, or they may be uploaded to the Cryostat
    credentials keyring. If the credentials are held locally in your browser session, then the Cryostat Web UI will
    automatically attach a custom header with API requests containing the JMX credentials you specify. The Cryostat
    server sees this header and uses the credentials when opening the JMX connection to the target, but <i>does not
    persist these credentials</i>. When the JMX credentials passthrough header is present, they supersede credentials
    stored in the Cryostat server's keyring.
  </li>
</ol>

Now that you understand the difference, let's continue to see how you can configure the Cryostat Web UI to use one
or the other when you complete a Authentication prompt.

<ol>
  <li>
    {% include_relative _subsections/common/navigate-to-settings.md %}
  </li>
  <li>
    {% include howto_step.html
      summary="Locate the Credentials Storage setting"
      image-name="2.4.0/credentials-setting.png"
      text="
        This setting contains a brief explanation of its purpose and a simple dropdown menu with selections for where any
        Credentials entered into a <i>Authentication Required</i> challenge modal will be stored.
        Choose <i>Session (Browser Memory)</i> to use the header passthrough mechanism described above, or choose
        <i>Backend</i> to automatically store the credentials in the Cryostat server keyring.
      "
    %}
  </li>
</ol>
