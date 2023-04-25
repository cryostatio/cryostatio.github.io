## [Edit Template With JMC](#edit-template-with-jmc)
[JDK Mission Control](https://github.com/openjdk/jmc) has a *Template Manager*
functionality which also contains a graphical wizard for editing *.jfc* event
template files. This may be preferred to editing the templates directly as XML
plaintext or using XML document editors, which do not have .jfc-specific XSD
validation or any hinting for event types and options.

<ol>
  <li>
    {% capture acquire-template-additional-context %}
      If you do not have an event template definition then you can visit
      <a href="{{ page.url }}#download-edit-and-upload-a-customized-event-template">
        Download, Edit, and Upload a Customized Event Template
      </a>
      and follow the first few steps to retrieve one from a remote target
      application accessible by Cryostat. Otherwise, if you have the JDK
      installed locally, you can find templates at
      <code>$JAVA_HOME/lib/jfr</code>.
    {% endcapture %}
    {% include howto_step.html
      summary="Acquire an Event Template"
      image-name="2.3.0/edit-template-with-jmc-1.png"
      caption="
        Ensure that you have an event template definition <i>.jfc</i> file
        somewhere on your local workstation, with read/write permissions.
      "
      text=acquire-template-additional-context
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Launch JDK Mission Control"
      image-name="2.3.0/edit-template-with-jmc-2.png"
      caption="The main JMC window after launch"
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Open the Template Manager"
      image-name="2.3.0/edit-template-with-jmc-3.png"
      caption="Select Window > Flight Recording Template Manager"
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Import the Base Template"
      image-name="2.3.0/edit-template-with-jmc-4.png"
      caption="
        Click <i>Import Files...</i>, then browse to and select the
        template from Step 1.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Edit the Template"
      image-name="2.3.0/edit-template-with-jmc-5.png"
      caption="
        Select the imported template, then click <i>Edit</i> and make your
        desired changes. Before making changes you may also click
        <i>Duplicate</i> to create an identical copy of the template as a base
        to iterate upon.
      "
    %}
  </li>
  <li>
    {% capture use-edited-template-additional-content %}
      Once your edited template is saved to to a file on your local workstation
      it can be used when starting new Flight Recordings. To do this using
      Cryostat, see
      <a href="{{ page.url }}#download-edit-and-upload-a-customized-event-template">Download, Edit, and Upload a Customized Event Template</a>
      for instructions on how to upload the new template to Cryostat and 
      <a href="{{ page.url }}#startstop-a-recording">Start/Stop a Recording</a>
      for instructions on how to create a new recording using this template.
    {% endcapture %}
    {% include howto_step.html
      summary="Export the Template"
      image-name="2.3.0/edit-template-with-jmc-6.png"
      caption="
        Click <i>Export File...</i> to save the event template to a <i>.jfc</i>
        file on your local workstation.
      "
      text=use-edited-template-additional-content
    %}
  </li>
</ol>
