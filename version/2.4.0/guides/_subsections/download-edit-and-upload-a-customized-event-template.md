## [Download, Edit, and Upload a Customized Event Template](#download-edit-and-upload-a-customized-event-template)
Most **JVMs** will come with at least two **JFR** *Event Templates* definitions included:
the `Continuous` and `Profiling` templates.

The `Continuous` template:
- has very low runtime overhead
- collects basic data
- is intended to be left on at all times, even in production

The `Profiling` template:
- may have some detectable runtime overhead
- collects more in-depth data
- should be used for a fixed duration when a specific problem is discovered at runtime

These two definitions will fit many monitoring and profiling workflows, but not
all. It may be useful to use either of these as a starting point and tailor it
to meet your specific monitoring/profiling needs by including/excluding events,
increasing/decreasing sample rates, raising/lowering thresholds, etc.

Of special note, **JFR** allows for the definition of application-specific custom
events, which would not be captured in either of the default templates above.

**Cryostat** also provides the <code>ALL</code> meta-template, which enables all
event types in the selected `target` application, with default values for each
event option. This is not a true *Event Template* and does not have an `XML`
definition to download.

<ol>
  <li>
    {% include_relative _subsections/common/select-target-application.md
      select-target-application-additional-content="
        The <i>Target</i> selected will provide the base <code>Continuous</code> and
        <code>Profiling</code> template definitions to start from. Most target
        applications will be interchangeable here.
      "
    %}
  </li>
  <li>
    {% capture navigate-to-events-include-text %}
    <p>
      If the <i>Target</i> <b>JVM</b> has <code>SSL/TLS</code> enabled on <b>JMX</b> connections then it may be
      necessary to add the <i>Target's</i> certificate to <b>Cryostat's</b> trust store. Go
      to <a href="{{ page.url }}#add-a-trusted-certificate">Add a Trusted Certificate</a>
      and return to this section after completing that guide.
      <a href="{{ site.url }}/images/2.4.0/navigate-to-events-2.png" target="_blank">
        <img src="{{ site.url }}/images/2.4.0/navigate-to-events-2.png">
      </a>
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Navigate to Events"
      image-name="2.4.0/navigate-to-events-1.png"
      caption="
        Supply <b>JMX</b> credentials to authenticate to the target, if necessary. If
        the target is not configured with <b>JMX</b> authentication then the
        connection attempt will continue without prompting for credentials.
      "
      text=navigate-to-events-include-text
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Download the <i>Template</i>"
      image-name="2.4.0/download-edit-and-upload-a-customized-event-template-1.png"
      caption="
        Click the action overflow \"&#65049;\" <i>three-dot</i> menu on the right side of the
        template entry in the table, then click <i>Download</i>.
      "
    %}
  </li>
  <li>
    {% capture edit-template-additional-content %}
      The <i>Template</i> definition is an <code>XML</code> file, so you may open and edit it
      with your favourite text editor or <code>XML</code> document editor. The <b>JMC
      Template Manager</b> can also be used for this purpose, as described in
      <a href="{{ page.url }}#edit-template-with-jmc">
        Edit Template With JMC
      </a>.
    {% endcapture %}
    {% include howto_step.html
      summary="Edit the <i>Template</i>"
      image-name="2.4.0/download-edit-and-upload-a-customized-event-template-2.png"
      caption=edit-template-additional-content
      text="
        Edit the <i>Template</i> definition to suit your requirements. When you are
        satisfied with the new configuration, give your new <i>Template</i> a
        meaningful and recognizable tag by editing the
        <code>&lt;configuration&gt;</code> element at the top of the file and
        setting the <code>label=</code> attribute to the desired name. You
        should also save the file according to this new name, but this is not
        strictly necessary. The <code>description</code> and
        <code>provider</code> attributes can also be used to help identify this
        <i>Template</i> later and to explain its goals and purpose.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Open the <i>Template</i> Upload Dialog"
      image-name="2.4.0/download-edit-and-upload-a-customized-event-template-3.png"
      caption="
        Back on the <i>Cryostat Events View</i>, click the <i>Upload Icon</i>
        in the table toolbar. A dialog will appear.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Upload the <i>Template</i>"
      image-name="2.4.0/download-edit-and-upload-a-customized-event-template-4.png"
      caption="
        Click the <i>Browse</i> button. Your browser will present its
        native file chooser dialog to select the file to upload. Browse and
        select the <i>Template</i> file, then click
        <i>OK/Select/Continue/Open</i>. Click <i>Submit</i> on the
        <b>Cryostat</b> dialog.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Observe the new <i>Template</i>"
      image-name="2.4.0/download-edit-and-upload-a-customized-event-template-5.png"
      caption="
        Once the <i>Template</i> has been uploaded you will be returned to the
        <i>Events View</i>, and your template will be present in the
        table.
      "
    %}
  </li>
</ol>
