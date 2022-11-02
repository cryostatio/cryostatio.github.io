## [Download, Edit, and Upload a Customized Event Template](#download-edit-and-upload-a-customized-event-template)
Most JVMs will come with at least two JFR event template definitions included:
the *Continuous* and *Profiling* templates.

The *Continuous* template:
- has very low runtime overhead
- collects basic data
- is intended to be left on at all times, even in production

The *Profiling* template:
- may have some detectable runtime overhead
- collects more in-depth data
- should be used for a fixed duration when a specific problem is discovered at runtime

These two definitions will fit many monitoring and profiling workflows, but not
all. It may be useful to use either of these as a starting point and tailor it
to meet your specific monitoring/profiling needs by including/excluding events,
increasing/decreasing sample rates, raising/lowering thresholds, etc.

Of special note, JFR allows for the definition of application-specific custom
events, which would not be captured in either of the default templates above.

Cryostat also provides the <code>ALL</code> meta-template, which enables all
event types in the selected target application, with default values for each
event option. This is not a true event template and does not have an XML
definition to download.

<ol>
  <li>
    {% include_relative _subsections/common/select-target-application.md
      select-target-application-additional-content="
        The target selected will provide the base <i>Continuous</i> and
        <i>Profiling</i> template definitions to start from. Most target
        applications will be interchangeable here.
      "
    %}
  </li>
  <li>
    {% capture navigate-to-events-include-text %}
    <p>
      If the target JVM has SSL/TLS enabled on JMX connections then it may be
      necessary to add the target's certificate to Cryostat's trust store. Go
      to <a href="{{ page.url }}#add-a-trusted-certificate">Add a Trusted Certificate</a>
      and return to this section after completing that guide.
      <a href="{{ site.url }}/images/2.1.0/navigate-to-events-2.png" target="_blank">
        <img src="{{ site.url }}/images/2.1.0/navigate-to-events-2.png">
      </a>
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Navigate to Events"
      image-name="2.1.0/navigate-to-events-1.png"
      caption="
        Supply JMX credentials to authenticate to the target, if necessary. If
        the target is not configured with JMX authentication then the
        connection attempt will continue without prompting for credentials.
      "
      text=navigate-to-events-include-text
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Download the template"
      image-name="2.1.0/download-a-template-1.png"
      caption="
        Click the action overflow three-dot menu on the right side of the
        template entry in the table, then click <i>Download</i>.
      "
    %}
  </li>
  <li>
    {% capture edit-template-additional-content %}
      The template definition is an XML file, so you may open and edit it
      with your favourite text editor or XML document editor. The JMC
      Template Manager can also be used for this purpose, as described
      <a href="{{ page.url }}#edit-template-with-jmc">
        in this section
      </a>.
    {% endcapture %}
    {% include howto_step.html
      summary="Edit the template"
      image-name="2.1.0/download-a-template-2.png"
      caption=edit-template-additional-content
      text="
        Edit the template definition to suit your requirements. When you are
        satisfied with the new configuration, give your new template a
        meaningful and recognizable tag by editing the
        <code>&lt;configuration&gt;</code> element at the top of the file and
        setting the <code>label=</code> attribute to the desired name. You
        should also save the file according to this new name, but this is not
        strictly necessary. The <code>description</code> and
        <code>provider</code> attributes can also be used to help identify this
        template later and to explain its goals and purpose.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Open the template upload dialog"
      image-name="2.1.0/download-a-template-3.png"
      caption="
        Back on the Cryostat Events view, click the plus (<code>+</code>) icon
        in the table toolbar. A dialog will appear.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Upload the template"
      image-name="2.1.0/download-a-template-4.png"
      caption="
        Click the <code>Browse</code> button. Your browser will present its
        native file chooser dialog to select the file to upload. Browse and
        select the template file, then click
        <code>OK/Select/Continue/Open</code>. Click <code>Submit</code> on the
        Cryostat dialog.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Observe the new template"
      image-name="2.1.0/download-a-template-5.png"
      caption="
        Once the template has been uploaded you will be returned to the
        <code>Events</code> view, and your template will be present in the
        table.
      "
    %}
  </li>
</ol>
