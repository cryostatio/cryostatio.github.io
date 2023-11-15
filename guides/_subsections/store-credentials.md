## [Store Credentials](#store-credentials)
<<<<<<< HEAD
If you have Java Management Extensions (JMX) or HTTP authentication enabled on
your containerized JVMs, Cryostat will prompt you to enter your credentials
before it can access the JDK flight recordings on your target JVMs. You can
<a href="#configure-credentials-storage">Configure Credentials Storage</a> and
choose whether these credentials are held in browser memory for the current
session only, or if they are uploaded to Cryostat's credentials keyring. The
following instructions are only applicable to credentials keyring storage.

**Note**: for the best experience, it is recommended that you should use the
*Backend* JMX credentials keyring and choose a strong keyring password when
deploying the server.
=======
If you have Java Management Extensions **(JMX)** or `HTTP` authentication enabled on your containerized **JVMs**, **Cryostat** will prompt you to enter your credentials before it can access the **JDK** `Flight Recordings` on your target **JVMs**. You can <a href="#configure-credentials-storage">Configure Credentials Storage</a> and choose whether these credentials are held in browser memory for the current session only, or if they are uploaded to **Cryostat's** credentials keyring.

If you intend to use **Cryostat** <a href="#create-an-automated-rule">`Automated Rules`</a>, then you should store target application credentials in **Cryostat's** credentials keyring, which is outlined below. Even if you do not use `Automated Rules`, you may find it more convenient to store credentials in the keyring. This way, the **Cryostat Web** UI does not need to prompt you for credentials when you manually access **JFR** information about target applications.
>>>>>>> 17d0854 (done (first commit))

<ol>
  <li>
    {% include howto_step.html
      summary="Navigate to the <i>Security</i> tab"
      image-name="2.3.0/navigate-to-security.png"
      text="
<<<<<<< HEAD
        First, navigate to the <i>Security</i> tab. The Store Credentials table
        lists all credentials in Cryostat's keyring. Click <i>Add</i> to define
        a new credential.
=======
        First, navigate to the <i>Security</i> tab. The <code>Store Credentials</code> table lists all credentials in <b>Cryostat's</b> keyring. Click <i>Add</i> to define a new credential.
>>>>>>> 17d0854 (done (first commit))
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Enter your Credentials"
      image-name="2.3.0/store-credentials-1.png"
      text="
<<<<<<< HEAD
          A modal will appear. You can select a target JVM to view its
          properties.
          These properties can be used to define a <i>matchExpression</i> that
          tests whether this credential should apply to the selected target JVM.
          This is the same kind of <i>matchExpression</i> as those used by
          <a href='#create-an-automated-rule'>Automated Rules</a>, so you may
          find it useful to reuse the same <i>matchExpressions</i> from your
          rule definitions for your credential definitions. The
          <i>matchExpression</i>, username, and password fields are all required.
=======
          A modal will appear. You can select a <i>Target <b>JVM</b></i> to view its properties.
          These properties can be used to define a <i>matchExpression</i> that tests whether this credential should apply to the selected <i>Target <b>JVM</b></i>.
          This is the same kind of <i>matchExpression</i> as those used by <a href='#create-an-automated-rule'><code>Automated Rules</code></a>, so you may find it useful to reuse the same
          <i>matchExpressions</i> from your rule definitions for your credential definitions.
          The <i>matchExpression</i>, <code>username</code>, and <code>password</code> fields are all required.
>>>>>>> 17d0854 (done (first commit))
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Test your Credentials"
      image-name="2.3.0/store-credentials-3.png"
      text="
<<<<<<< HEAD
      Navigate to the <b>Test</b> tab to use the <b>Credential Test Table</b>
      to check if the entered credential is valid for the matched targets.
      <br><br>

      You can individually test each target or bulk test all targets at the
      same time. The <b>Status</b> column will report the following test
      status:
=======
      Navigate to the <i>Test</i> tab to use the <code>Credential Test Table</code> to check if the entered credential is valid for the matched targets.
      <br><br>

      You can individually test each target or bulk test all targets at the same time. The <code>Status</code> column will report the following test status:
>>>>>>> 17d0854 (done (first commit))

      <ol>
        <li>
            <code>Valid:</code> valid credential for the target <b>JVM</b>.
        </li>
        <li>
            <code>Invalid:</code> invalid credential for the target <b>JVM</b>.
        </li>
        <li>
<<<<<<< HEAD
            <b>Not applicable:</b> JMX authentication is not enabled on the
            target JVM.
=======
            <code>Not applicable:</code> <b>JMX</b> authentication is not enabled on the target <b>JVM</b>.
>>>>>>> 17d0854 (done (first commit))
        </li>
      </ol>
      "
    %}
  </li>
  <li>
    {% include howto_step.html
<<<<<<< HEAD
      summary="
          (Alternative to Steps 1 and 2) Store Credentials when connecting to a
          target JVM
          "
      image-name="2.3.0/navigate-to-recordings-1.png"
      text="
        Alternatively, credentials may also be stored if you navigate to either
        the <i>Recordings</i> tab or the <i>Events</i> tab and select a target
        JVM with authentication enabled. The authentication form will appear,
        prompting you to enter your credentials. If you have
        <a href='#configure-credentials-storage'>configured Backend Credentials Storage</a>,
        then a new credential definition with the provided username and
        password will be stored for this specific target application in the
        Cryostat keyring. If you have configured credentials with the
        <i>Session</i> option then these entered credentials will <i>not</i> be
        stored in the Cryostat keyring.
=======
      summary="(Alternative to Steps 1 and 2) Store Credentials When Connecting to a Target <b>JVM</b>"
      image-name="2.3.0/navigate-to-recordings-1.png"
      text="
        Alternatively, credentials may also be stored if you navigate to either the <i>Recordings</i> tab or the <i>Events</i> tab and select a target <b>JVM</b> with authentication enabled. The authentication form will appear, prompting you to enter your credentials. If you have <a href='#configure-credentials-storage'>configured <code>Backend Credentials Storage</code></a>, then a new credential definition with the provided <code>username</code> and <code>password</code> will be stored for this specific target application in the <b>Cryostat</b> keyring. If you have configured credentials with the <i>Session</i> option then these entered credentials will <i>not</i> be stored in the <b>Cryostat</b> keyring.
>>>>>>> 17d0854 (done (first commit))
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View your Stored Credentials"
      image-name="2.3.0/store-credentials-2.png"
      text="
        The <i>Store Credentials</i> table will update with a row for each of the credentials you have stored in the keyring. The <i>matchExpression</i> is visible along with a count of the number of known target applications that these credentials will apply to. You can expand the row to display a list of those matched target applications. For security reasons it is not possible to view the stored <code>username</code> and <code>password</code> associated with a credential definition in the keyring.
      "
    %}
  </li>
</ol>
