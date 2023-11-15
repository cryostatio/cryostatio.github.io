## [Configure Credentials Storage](#configure-credentials-storage)

Target JVM applications may require Cryostat to pass an authentication
challenge before being able to communicate over JMX or HTTP and manage JFR.

Cryostat has two supported mechanisms for these credentials:

<ol>
  <li>
    <b>Credentials Keyring</b>: see <a href="#store-credentials">Store Credentials</a>
    for more detail. This mechanism entails uploading a Credentials definition
    to the Cryostat backend's encrypted keyring storage. Cryostat automatically
    checks the keyring for credentials matching a target application when a
    request to that application is opened. If no credentials are found,
    Cryostat responds to the requesting client with a response indicating the
    authentication failure. The Cryostat Web UI then prompts and the user for
    credentials. If credentials are entered on the prompt then they will also
    be stored in this same encrypted keyring.

    Credentials entered in the <a href="#store-credentials">Store Credentials</a>
    table are <i>always</i> stored in the server's encrypted keyring.
    Additionally, Cryostat Agent HTTP credentials are always stored in the
    same encrypted keyring.
  </li>
  <li>
    <b>Web Session</b>: This mechanism entails holding Credentials only in the
    Cryostat Web UI's currently active session memory. Whenever the Cryostat
    Web UI makes a request to the Cryostat server it includes the relevant JMX
    Credential in an **X-JMX-Authorization** header, which the server reads and
    passes through to the target application. In this scheme the Cryostat
    server does not store or persist the Credentials in any way - they are only
    held in server memory long enough to complete the current request, then
    are dropped. If the server sees this header on a request it will *not*
    check its encrypted Credentials keyring for any other credentials matching
    the target application, so this mechanism and header can also be used to
    override the keyring stored Credentials.
  </li>
</ol>

Now that you understand the difference, let's continue to see how you can
configure the Cryostat Web UI to use one or the other when you complete a
Authentication prompt.

<ol>
  <li>
    {% include_relative _subsections/common/navigate-to-settings.md %}
  </li>
  <li>
    {% include howto_step.html
      summary="Locate the Credentials Storage setting"
      image-name="2.3.0/credentials-setting.png"
      text="
        This setting contains a brief explanation of its purpose and a simple
        dropdown menu with selections for where any Credentials entered into a
        <i>Authentication Required</i> challenge modal will be stored. Choose
        <i>Session (Browser Memory)</i> to use the header passthrough mechanism
        described above, or choose <i>Backend</i> to automatically store the
        credentials in the Cryostat server keyring.
      "
    %}
  </li>
</ol>
