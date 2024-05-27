## [Configure Credentials Storage](#configure-credentials-storage)

Target **JVM** applications may require **Cryostat** to pass an authentication
challenge before being able to communicate over **JMX** or `HTTP` and manage **JFR**.

**Cryostat** has two supported mechanisms for these <code>Credentials</code>:

<ol>
  <li>
    <code>Credentials Keyring</code>: see <a href="#store-credentials">Store Credentials</a>
    for more detail. This mechanism entails uploading a <code>Credentials</code> definition
    to the <b>Cryostat</b> backend's encrypted <code>Keyring</code> storage. <b>Cryostat</b> automatically
    checks the <code>Keyring</code> for <code>Credentials</code> matching a target application when a
    request to that application is opened. If no <code>Credentials</code> are found,
    <b>Cryostat</b> responds to the requesting client with a response indicating the
    authentication failure. The <b>Cryostat Web</b> UI then prompts the user for
    <code>Credentials</code>. If <code>Credentials</code> are entered on the prompt, they will also be
    stored in this same encrypted <code>Keyring</code>.

    <code>Credentials</code> entered in the <a href="#store-credentials">Store Credentials</a>
    table are <code>always</code> stored in the server's encrypted <code>Keyring</code>.
    Additionally, <b>Cryostat Agent</b> <code>HTTP</code> <code>Credentials</code> are always stored in the
    same encrypted <code>Keyring</code>.
  </li>
  <li>
    <code>Web Session</code>: This mechanism entails holding <code>Credentials</code> only in the
    <b>Cryostat Web</b> UI's currently active session memory. Whenever the <b>Cryostat
    Web</b> UI makes a request to the <b>Cryostat</b> server, it includes the relevant <b>JMX</b>
    <code>Credential</code> in an <b>X-JMX-Authorization</b> header, which the server reads
    and passes through to the target application. In this scheme, the <b>Cryostat</b>
    server does not store nor persist the <b>Credentials</b> in any way - they are only
    held in server memory long enough to complete the current request, then
    are dropped. If the server sees this header on a request it will <span style="color:red;">not</span>
    check its encrypted <code>Credentials Keyring</code> for any other <code>Credentials</code> matching
    the target application, so this mechanism and header can also be used to
    override the <code>Keyring</code> stored <code>Credentials</code>.
  </li>
</ol>

Now that you understand the difference, let's continue to see how you can
configure the **Cryostat Web** UI to use one or the other when you complete an
<code>Authentication</code> prompt.

<ol>
  <li>
    {% include_relative _subsections/common/navigate-to-settings.md %}
  </li>
  <li>
    {% include howto_step.html
      summary="Locate the <i>Credentials Storage</i> Setting"
      image-name="3.0.0/credentials-setting.png"
      text="
        This setting contains a brief explanation of its purpose and a simple
        dropdown menu with selections for where any <code>Credentials</code> entered into an
        <i>Authentication Required</i> challenge modal will be stored. Choose
        <i>Session (Browser Memory)</i> to use the header passthrough mechanism
        described above, or choose <i>Backend</i> to automatically store the
        <code>Credentials</code> in the <b>Cryostat</b> server <code>Keyring</code>.
      "
    %}
  </li>
</ol>
