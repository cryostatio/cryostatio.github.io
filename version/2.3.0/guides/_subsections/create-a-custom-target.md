## [Create a Custom Target](#create-a-custom-target)

By default, Cryostat automatically discovers target JVMs over remote Java Management Extensions (JMX), using various mechanisms (e.g. Kubernetes API, JDP). However, in some cases (e.g. for Kubernetes API, JMX port is not `9091` and port name is not `jfr-jmx`), Cryostat might not see your applications. Fortunately, you can tell Cryostat about them by filling out the *Custom Target* form to specify *Custom Targets*.

<ol>
  <li>
    {% include_relative _subsections/common/navigate-to-topology.md %}
  </li>
  <li>
    {% capture open-custom-target-form-text %}
    <p>
      Search for <i>Custom Target</i> tab and click <i>Create</i> to open the <i>Custom Target</i> form.
      <figure>
        <a href="{{ site.url }}/images/2.3.0/custom-target-1.png" target="_blank">
          <img src="{{ site.url }}/images/2.3.0/custom-target-1.png">
        </a>
        <figcaption>
          Use the <i>Custom Target</i> form to tell Cryostat about a JVM application that are not automatically discovered.
        </figcaption>
      </figure>
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Open the <i>Custom Target</i> form"
      image-name="2.3.0/topology-7.png"
      caption="Click on Catalog Icon to open the Topology Entity Catalog."
      text=open-custom-target-form-text
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Enter <i>Custom Target</i> definition"
      image-name="2.3.0/custom-target-2.png"
      caption="Use the form to enter the <i>Custom Target</i> definition."
      text="
      The <code>Connection URL</code> is required for Cryostat to attempt to find the target. You can optionally provide an  <code>Alias</code> or <code>JMX credentials</code> if the target has JMX authentication enabled.
      "
    %}
  </li>
  <li>
    {% capture test-custom-target-text %}
      <p>
        Once you enter a valid connection URL, click on the sample node to test the target connection.
        <figure>
          <a href="{{ site.url }}/images/2.3.0/custom-target-4.png" target="_blank">
            <img src="{{ site.url }}/images/2.3.0/custom-target-4.png">
          </a>
          <figcaption>
            An exclamation mark and an alert banner will show if an error occurs while connecting to the target.
          </figcaption>
        </figure>
      </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Test the <i>Custom Target</i> definition"
      image-name="2.3.0/custom-target-3.png"
      caption="A checkmark will show if Cryostat can connect to the sample app."
      text=test-custom-target-text
    %}
  </li>
  <li>
    <summary>Click <i>Create</i> button to generate a new <i>Custom Target</i> definition once the test is successful.</summary>
  </li>
  <li>
    {% include howto_step.html
      summary="View the <i>Custom Targets</i>"
      image-name="2.3.0/custom-target-5.png"
      caption="The <i>Custom Target</i> will be available under <i>Custom Targets</i> realm."
      text="
      Once the <i>Custom Target</i> form is successfully submitted, you will be redirected to the Topology View. Here, you can view your target under <i>Custom Targets</i> realm.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="<i>(Optional)</i> Delete <i>Custom Targets</i>"
      image-name="2.3.0/custom-target-6.png"
      caption="<i>Custom Targets</i> can be cleaned up with Actions menu."
      text="
      If the <i>Custom Targets</i> is no longer needed, in the target detail panel, click the <i>Actions</i> menu and select <b>Delete Target</b>.
      "
    %}
  </li>
</ol>
