## [Store Credentials](#store-credentials)
If you have Java Management Extensions (JMX) or HTTP authentication enabled on your containerized JVMs, Cryostat will prompt you to enter your credentials before it can access the JDK flight recordings on your target JVMs. You can <a href="#configure-credentials-storage">Configure Credentials Storage</a> and choose whether these credentials are held in browser memory for the current session only, or if they are uploaded to Cryostat's credentials keyring.

If you intend to use Cryostat <a href="#create-an-automated-rule">Automated Rules</a>, then you should store target application credentials in Cryostat's credentials keyring, which is outlined below. Even if you do not use Automated Rules, you may find it more convenient to store credentials in the keyring. This way, the Cryostat web UI does not need to prompt you for credentials when you manually access JFR information about target applications.

<ol>
  <li>
    {% include howto_step.html
      summary="Navigate to the Security tab"
      image-name="2.3.0/navigate-to-security.png"
      text="
        First, navigate to the <i>Security</i> tab. The Store Credentials table lists all credentials in Cryostat's keyring. Click <i>Add</i> to define a new set of credentials.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Enter your credentials"
      image-name="2.3.0/store-credentials-1.png"
      text="
          A modal will appear. You can select a target JVM to view its properties.
          These properties can be used to define a <i>matchExpression</i> that tests whether this set of credentials should apply to the selected target JVM.
          This is the same kind of <i>matchExpression</i> as those used by <a href='#create-an-automated-rule'>Automated Rules</a>, so you may find it useful to reuse the same
          <i>matchExpressions</i> from your rule definitions for your credentials definitions.
          The <i>matchExpression</i>, username, and password fields are all required.
      "
    %}
  </li>
    <li>
    {% include howto_step.html
      summary="(Alternative to Steps 1 and 2) Store Credentials when connecting to a target JVM"
      image-name="2.3.0/navigate-to-recordings-1.png"
      text="
        Alternatively, credentials may also be stored if you navigate to either the <i>Recordings</i> tab or the <i>Events</i> tab and select a target JVM with authentication enabled. The authentication form will appear, prompting you to enter your credentials. If you have <a href='#configure-credentials-storage'>configured Backend Credentials Storage</a>, then a new credentials definition with the provided username and password will be stored for this specific target application in the Cryostat keyring. If you have configured credentials with the <i>Session</i> option then these entered credentials will <i>not</i> be stored in the Cryostat keyring.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View your stored credentials"
      image-name="2.3.0/store-credentials-2.png"
      text="
        The <i>Store Credentials</i> table will update with a row for each of the credentials you have stored in the keyring. The <i>matchExpression</i> is visible along with a count of the number of known target applications that these credentials will apply to. You can click the reverse chevron icon at the left of the table row to expand the row, which will display a list of those matched target applications. For security reasons it is not possible to view the stored username and password associated with a credentials definition in the keyring.
      "
    %}
  </li>
</ol>
