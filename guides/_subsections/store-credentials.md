## [Store Credentials](#store-credentials)
If you have Java Management Extensions **(JMX)** or `HTTP` authentication enabled on
your containerized **JVMs**, **Cryostat** will prompt you to enter your credentials
before it can access the **JDK** `Flight Recordings` on your `target` **JVMs**.

<ol>
  <li>
    {% include howto_step.html
      summary="Navigate to the <i>Security</i> tab"
      image-name="4.1.0/navigate-to-security.png"
      text="
        First, navigate to the <i>Security</i> tab. The <i>Store Credentials</i> table
        lists all credentials in <b>Cryostat's</b> <code>Keyring</code>. Click <i>Add</i> to define
        a new credential.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Enter your Credentials"
      image-name="4.1.0/store-credentials-1.png"
      text="
          A modal will appear. You can select a <code>target</code> <b>JVM</b> to view its
          properties.
          These properties can be used to define a <i>matchExpression</i> that
          tests whether this credential should apply to the selected <code>target</code> <b>JVM</b>.
          This is the same kind of <i>matchExpression</i> as those used by
          <a href='#create-an-automated-rule'>Automated Rules</a>, so you may
          find it useful to reuse the same <i>matchExpressions</i> from your
          rule definitions for your credential definitions. The
          <i>matchExpression</i>, username, and password fields are all required.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Test your Credentials"
      image-name="4.1.0/store-credentials-3.png"
      text="
      Navigate to the <i>Test</i> tab to use the <i>Credential Test</i> table
      to check if the entered credential is valid for the matched <code>targets</code>.
      <br><br>

      You can individually test each <code>target</code> or bulk test all <code>targets</code> at the
      same time. The <i>Status</i> column will report the following test
      status:

      <ol>
        <li>
            <code>Valid:</code> valid credential for the <code>target</code> <b>JVM</b>.
        </li>
        <li>
            <code>Invalid:</code> invalid credential for the <code>target</code> <b>JVM</b>.
        </li>
        <li>
            <b>Not applicable:</b> JMX authentication is not enabled on the
            <code>target</code> JVM.
        </li>
      </ol>
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="
          (Alternative to Steps 1 and 2) Store Credentials when Connecting to a
          <code>Target</code> <b>JVM</b>
          "
      image-name="4.1.0/navigate-to-recordings-1.png"
      text="
        Alternatively, credentials may also be stored if you navigate to either
        the <i>Recordings</i> tab or the <i>Events</i> tab and select a <code>target</code>
        <b>JVM</b> with authentication enabled. The authentication form will appear,
        prompting you to enter your credentials. A new credential definition with the provided
        username and password will be stored for this specific <code>target</code> application
        in the <b>Cryostat</b> <code>Keyring</code>.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View your Stored Credentials"
      image-name="4.1.0/store-credentials-2.png"
      text="
        The <i>Store Credentials</i> table will update with a row for each of the credentials you have stored in the <code>Keyring</code>. The <i>matchExpression</i> is visible along with a count of the number of known <code>target</code> applications that these credentials will apply to. You can expand the row to display a list of those matched <code>target</code> applications. For security reasons it is not possible to view the stored <code>username</code> and <code>password</code> associated with a credential definition in the <code>Keyring</code>.
      "
    %}
  </li>
</ol>

### [Preconfiguring Stored Credentials within Cryostat](#preconfiguring-automated-rules-within-cryostat)

If deploying **Cryostat** in a **Kubernetes** environment through the **Cryostat Operator**, stored credentials can be preconfigured within **Cryostat**.

To begin, create a **Secret** within **Kubernetes** or **Red Hat Openshift** from this text file
    
```yaml
kubectl create secret generic application-credentials --from-file=credentials.json
```

or

```yaml
oc create secret generic application-credentials --from-file=credentials.json
```

Now that this Secret has been created, when creating the **Cryostat Custom Resource** we can specify it, either through the **Red Hat Openshift** console under **Stored Credentials** while creating the **Cryostat Custom Resource**, or through the **Custom Resource** YAML:

```yaml
apiVersion: operator.cryostat.io/v1beta2
kind: Cryostat
metadata:
  name: cryostat-sample
spec:
  storedCredentials:
    - secretName: application-credentials
```

Once the **Custom Resource** has been created, the credentials will be pre-loaded into **Cryostat** and be available from startup without any further configuration needed. 