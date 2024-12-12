## [Add a Trusted Certificate](#add-a-trusted-certificate)
If you have Java Management Extensions **(JMX)** over `SSL` enabled on your containerized **JVMs**, you must configure **Cryostat** to trust the `SSL/TLS` certificate presented by the containerized **JVM** when **Cryostat** attempts to open a **JMX** connection. If you do not complete this configuration, **Cryostat** cannot open a **JMX** connection for the purposes of performing **JFR** management tasks.

<ol>
    <li>
        {% include howto_step.html
          summary="Navigate to the <i>Security</i> Tab"
          image-name="4.0.0/navigate-to-security.png"
          text="Click the <i>Security</i> tab. This should initially be in an empty state if you have not yet defined any additional trusted certificates."
        %}
    </li>
</ol>

In order to add a trusted certificate to Cryostat's custom truststore you must first determine the directory that Cryostat loads certificates from.
This is controlled by the configuration property `ssl.truststore.dir` and defaults to `/truststore`. If you are deploying Cryostat manually in an
environment like Podman or Docker Compose, you should create a volume containing the certificates and mount it to this location, or bind-mount a host
directory to this location. If you are using the Cryostat Helm Chart then you should create Secrets containing each trusted certificate and mount
each within this location. If you are using the Cryostat Operator, you should use the `.Spec.TrustedCertSecrets` `CR` property.

Once you have loaded your additional certificates to the truststore you must restart the Cryostat container, since it can only load certificates
into the JVM truststore at startup time. The container may be restarted automatically when you modify the configuration, depending on your deployment
platform.

After you have loaded the certificates and verified that the Cryostat container has restarted, you can verify that Cryostat correctly found the
certificate(s) within the truststore directory.

<ol>
    <li>
        {% include howto_step.html
          summary="Navigate to the <i>Security</i> Tab"
          image-name="4.0.0/navigate-to-security-with-certs.png"
          text="Click the <i>Security</i> tab. The file paths of any additional trusted certificates you have added should appear in the list."
        %}
    </li>
</ol>
