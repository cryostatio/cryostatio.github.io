## [Create a Custom Target](#create-a-custom-target)

By default, Cryostat automatically discovers target JVMs over remote Java Management Extensions (JMX), using various mechanisms (e.g. Kubernetes API, JDP). However, in some cases (e.g. for Kubernetes API, JMX port is not `9091` and port name is not `jfr-jmx`), Cryostat might not see your applications. Fortunately, you can tell Cryostat about them by specifying Custom Targets by filling out the Custom Target form.

<ol>
  <li>
    {% include_relative _subsections/common/navigate-to-topology.md %}
  </li>
  <li>
    {% capture open-custom-target-form-text %}
    <p>
      Search for Custom Target tab and click <i>Create</i> to open the Custom Target form.
      <figure>
        <a href="{{ site.url }}/images/2.3.0/custom-target-1.png" target="_blank">
          <img src="{{ site.url }}/images/2.3.0/custom-target-1.png">
        </a>
        <figcaption>
          Use the Custom Target form to tell Cryostat about a JVM application that are not automatically discovered.
        </figcaption>
      </figure>
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Open the <i>Custom Target form</i>"
      image-name="2.3.0/topology-8.png"
      caption="Click on Catalog Icon to open the Topology Entity Catalog."
      text=open-custom-target-form-text
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Enter Custom Target definition"
      image-name="2.3.0/custom-target-2.png"
      caption="Use the form to enter the Custom Target definition."
      text="
      The <b>connection URL</b> is required for Cryostat to attempt to find the target. You can optionally provide an  <b>alias</b> or <b>JMX credentials</b> if the target has JMX authentication enabled.
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
      summary="Test the Custom Target definition"
      image-name="2.3.0/custom-target-3.png"
      caption="A checkmark will show if Cryostat can connect to the sample app."
      text=test-custom-target-text
    %}
  </li>
  <li>
    <summary>Click <i>Create</i> button to generate a new Custom Target definition once the test is successful.</summary>
  </li>
  <li>
    {% include howto_step.html
      summary="View the Custom Targets"
      image-name="2.3.0/custom-target-5.png"
      caption="The Custom Target will be available under Custom Targets realm."
      text="
      Once Custom Target form is successfully submitted, you will be redirected to the Topology View. Here, you can view your target under Custom Targets realm.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="(Optional) Delete Custom Targets"
      image-name="2.3.0/custom-target-6.png"
      caption="Custom Targets can be cleaned up with Actions menu."
      text="
      If the custom target is no longer needed, in the target detail panel, click the <i>Actions</i> menu and select <b>Delete Target</b>.
      "
    %}
  </li>
</ol>
