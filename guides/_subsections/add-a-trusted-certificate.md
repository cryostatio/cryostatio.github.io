## [Add a Trusted Certificate](#-add-a-trusted-certificate)
If you have Java Management Extensions (JMX) over SSL enabled on your containerized JVMs, you must configure Cryostat to trust the SSL certificate presented by the containerized JVM when Cryostat attempts to open a JMX connection. If this configuration is not completed then Cryostat will be unable to open the connection and unable to perform JFR management tasks.

Here's how to add a trusted SSL certificate with the Cryostat web UI.

<ol>
    <li>
        {% include howto_step.html
          summary="Navigate to the Security tab"
          image-name="store-jmx-credentials-1.png"
          text="
            First, navigate to the <i>Security</i> tab. The Import SSL Certificates card contains an <i>Upload</i> button. Click <i>Upload</i> to open a file upload dialog and choose the certificate you wish to upload. You may repeat this process multiple times to add multiple trusted certificates.
          "
        %}
    </li>
    <li>
        Restart Cryostat to apply the changes. If Cryostat is not restarted then the newly-added certificates are not reloaded and trusted by the Cryostat JMX client and connections will continue to fail. Depending on your deployment platform and configuration, restarting Cryostat might entail any of the following:
        <ul>
            <li>
                <pre>oc delete cryostat/&lt;my-cryostat-name&gt;<br>oc create -f &lt;my-cryostat-name&gt;.yaml</pre>
            </li>
            <li>
                <pre>oc rollout retry dc/&lt;my-cryostat-name&gt;</pre>
            </li>
            <li>
                <pre>podman restart &lt;my-cryostat-name&gt;</pre>
            </li>
        </ul>
    </li>
</ol>
