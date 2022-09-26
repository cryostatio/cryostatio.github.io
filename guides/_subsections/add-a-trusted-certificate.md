## [Add a Trusted Certificate](#-add-a-trusted-certificate)
If you have Java Management Extensions (JMX) over SSL enabled on your containerized JVMs, you must configure Cryostat to trust the SSL certificate presented by the containerized JVM when Cryostat attempts to open a JMX connection. If you do not complete this configuration, Cryostat cannot open a JMX connection for the purposes of performing JFR management tasks.

Here's how to add a trusted SSL certificate with the Cryostat web UI.

<ol>
    <li>
        {% include howto_step.html
          summary="Navigate to the Security tab"
          image-name="store-jmx-credentials-1.png"
          text="
            <ol>
                <li>
                    Click the <i>Security</i> tab.
                </li>
                <li>
                    Click the <i>Upload</i> button on the <i>Import SSL Certificates</i> card. This action opens a file-upload dialog, where you can choose the certificate that you want to upload to Cryostat. You can repeat this process multiple times to add multiple trusted certificates.
                </li>
            </ol>
          "
        %}
    </li>
    <li>
        Restart Cryostat to apply the changes. If you do not restart your Cryostat instance, the added certificates are not reloaded. This causes connections to fail because the Cryostat JMX client cannot trust the certificates. Depending on your deployment platform and configuration, restarting Cryostat might require any of the following:
        <ul>
            <li>
                On OpenShift/Kubernetes with Cryostat Operator:
                <pre>oc delete cryostat/&lt;my-cryostat-cr-name&gt;<br>oc create -f &lt;my-cryostat-cr-name&gt;.yaml</pre>
            </li>
            <li>
                On OpenShift/Kubernetes without Cryostat Operator:
                <pre>oc rollout retry dc/&lt;my-cryostat-dc-name&gt;</pre>
            </li>
            <li>
                On Podman:
                <pre>podman restart &lt;my-cryostat-container-id&gt;</pre>
            </li>
        </ul>
    </li>
</ol>
