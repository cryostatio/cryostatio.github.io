## [Add a Trusted Certificate](#add-a-trusted-certificate)
If you have Java Management Extensions **(JMX)** over `SSL` enabled on your containerized **JVMs**, you must configure **Cryostat** to trust the `SSL` certificate presented by the containerized **JVM** when **Cryostat** attempts to open a **JMX** connection. If you do not complete this configuration, **Cryostat** cannot open a **JMX** connection for the purposes of performing **JFR** management tasks.

Here's how to add a trusted `SSL` certificate with the **Cryostat Web** UI.

<ol>
    <li>
        {% include howto_step.html
          summary="Navigate to the <i>Security</i> Tab"
          image-name="2.3.0/navigate-to-security.png"
          text="Click the <i>Security</i> tab."
        %}
    </li>
    <li>
        {% include howto_step.html
          summary="Upload the Certificate"
          image-name="2.3.0/add-a-trusted-certificate-upload.png"
          text="
              Click the <i>Upload</i> button on the <i>Import SSL Certificates</i> card. This action opens a file-upload dialog, where you can choose the certificate that you want to upload to <b>Cryostat</b>. You can repeat this process multiple times to add multiple trusted certificates.
          "
        %}
    </li>
    <li>
        Restart <b>Cryostat</b> to apply the changes. If you do not restart your <b>Cryostat</b> instance, the added certificates are not reloaded. This causes connections to fail because the <b>Cryostat JMX</b> client cannot trust the certificates. Depending on your deployment platform and configuration, restarting <b>Cryostat</b> might require any of the following:
        <ul>
            <li>
                On <b>OpenShift/Kubernetes</b> with <b>Cryostat Operator</b>:
                <pre>oc delete cryostat/&lt;my-cryostat-cr-name&gt;<br>oc create -f &lt;my-cryostat-cr-name&gt;.yaml</pre>
            </li>
            <li>
                On <b>OpenShift/Kubernetes</b> without <b>Cryostat Operator</b>:
                <pre>oc rollout retry dc/&lt;my-cryostat-dc-name&gt;</pre>
            </li>
            <li>
                On <b>Podman</b>:
                <pre>podman restart &lt;my-cryostat-container-id&gt;</pre>
            </li>
        </ul>
    </li>
</ol>
