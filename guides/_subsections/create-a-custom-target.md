## [Create a Custom Target](#create-a-custom-target)

**Cryostat** automatically discovers `target` **JVMs** using various mechanisms
(e.g. **Kubernetes API**, **JDP**, [Cryostat Agent plugin](#using-the-cryostat-agent)).
However, in some cases it may not be feasible or desirable to configure your
application to suit **Cryostat**'s discovery requirements. In these scenarios
you can tell **Cryostat** about them by filling out the *Custom Target* form to
specify *Custom Targets*. This can also be used to have **Cryostat** register
itself as a discovered target by using the special value `localhost:0`, which
informs **Cryostat**'s **JVM** to use a special **JMX** connection to itself
without going through the network stack.

<ol>
  <li>
    {% include_relative _subsections/common/navigate-to-topology.md %}
  </li>
  <li>
    {% capture open-custom-target-form-text %}
    <p>
      Search for <i>Custom Target</i> tab and click <i>Create</i> to open the
      <i>Custom Target</i> form.
      <figure>
        <a href="{{ site.url }}/images/3.0.0/custom-target-1.png" target="_blank">
          <img src="{{ site.url }}/images/3.0.0/custom-target-1.png">
        </a>
        <figcaption>
          Use the <i>Custom Target</i> form to tell <b>Cryostat</b> about <b>JVM</b>
          applications that are not automatically discovered.
        </figcaption>
      </figure>
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Open the <i>Custom Target</i> Form"
      image-name="3.0.0/topology-7.png"
      caption="Click on <i>Catalog Icon</i> to open the <i>Topology Entity Catalog</i>."
      text=open-custom-target-form-text
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Enter <i>Custom Target</i> Definition"
      image-name="3.0.0/custom-target-2.png"
      caption="Use the form to enter the <i>Custom Target</i> definition."
      text="
      The <i>Connection URL</i> is required for <b>Cryostat</b> to attempt to
      find the <code>target</code>. You can optionally provide an  <i>Alias</i> or
      <i><b>JMX</b> credentials</i> if the <code>target</code> has <b>JMX</b> authentication enabled.
      "
    %}
  </li>
  <li>
    {% capture test-custom-target-text %}
      <p>
        Once you enter a valid <i>Connection URL</i>, click on the sample <code>node</code> to test
        the <code>target</code> connection.
        <figure>
          <a href="{{ site.url }}/images/3.0.0/custom-target-4.png" target="_blank">
            <img src="{{ site.url }}/images/3.0.0/custom-target-4.png">
          </a>
          <figcaption>
            An exclamation mark and an alert banner will show if an error
            occurs while connecting to the <code>target</code>. This may
            occur if the URL is incorrect due to incorrect hostname or
            port number, or if the port is blocked by a firewall or network
            policy, or if the JVM listening on the specified port requires
            JMX credentials that Cryostat does not have in its keyring, or
            if the JVM listening on the specified port presents an SSL/TLS
            certificate which Cryostat does not trust.
          </figcaption>
        </figure>
      </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Test the <i>Custom Target</i> Definition"
      image-name="3.0.0/custom-target-3.png"
      caption="A &#9989; checkmark will show if <b>Cryostat</b> can connect to the sample app."
      text=test-custom-target-text
    %}
  </li>
  <li>
    <summary>Click <i>Create</i> Button to Generate a New <i>Custom Target</i>
    definition once the test is successful.</summary>
  </li>
  <li>
    {% include howto_step.html
      summary="View the <i>Custom Targets</i>"
      image-name="3.0.0/custom-target-5.png"
      caption="The <i>Custom Target</i> will be available under <i>Custom Targets</i> realm."
      text="
          Once the <i>Custom Target</i> form is successfully submitted, you
          will be redirected to the <i>Topology View</i>. Here, you can view your
          <code>target</code> under <i>Custom Targets</i> realm.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="<i>(Optional)</i> Delete <i>Custom Targets</i>"
      image-name="3.0.0/custom-target-6.png"
      caption="<i>Custom Targets</i> can be cleaned up with <i>Actions</i> menu."
      text="
      If the <i>Custom Targets</i> is no longer needed, in the target detail
      panel, click the <i>Actions</i> menu and select <i>Delete Target</i>.
      "
    %}
  </li>
</ol>
