## [Edit Template With JMC](#edit-template-with-jmc)
[JDK Mission Control](https://github.com/openjdk/jmc) has a *Template Manager*
functionality which also contains a graphical wizard for editing `.jfc` *Event
Template* files. This may be preferred to editing the templates directly as `XML`
plaintext or using `XML` document editors, which do not have `.jfc-specific XSD`
validation or any hinting for event types and options.

<ol>
  <li>
    {% capture acquire-template-additional-context %}
      If you do not have an <code>event template definition</code> then you can visit
      <a href="{{ page.url }}#download-edit-and-upload-a-customized-event-template">
        Download, Edit, and Upload a Customized Event Template
      </a>
      and follow the first few steps to retrieve one from a remote target
      application accessible by <b>Cryostat</b>. Otherwise, if you have the <b>JDK</b>
      installed locally, you can find templates at
      <code>$JAVA_HOME/lib/jfr</code>.
    {% endcapture %}
    {% include howto_step.html
      summary="Acquire an <i>Event Template</i>"
      image-name="2.3.0/edit-template-with-jmc-1.png"
      caption="
        Ensure that you have an <code>event template definition</code> <code>.jfc</code> file
        somewhere on your local workstation, with <code>read/write</code> permissions.
      "
      text=acquire-template-additional-context
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Launch <code>JDK Mission Control</code>"
      image-name="2.3.0/edit-template-with-jmc-2.png"
      caption="The main <b>JMC</b> window after launch"
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Open the <i>Template Manager</i>"
      image-name="2.3.0/edit-template-with-jmc-3.png"
      caption="Select <i>Window</i> > <i>Flight Recording Template Manager</i>"
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Import the Base <i>Template</i>"
      image-name="2.3.0/edit-template-with-jmc-4.png"
      caption="
        Click <i>Import Files...</i>, then browse to and select the
        <i>Template</i> from Step 1.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Edit the <i>Template</i>"
      image-name="2.3.0/edit-template-with-jmc-5.png"
      caption="
        Select the imported <i>Template</i>, then click <i>Edit</i> and make your
        desired changes. Before making changes you may also click
        <i>Duplicate</i> to create an identical copy of the <i>Template</i> as a base
        to iterate upon.
      "
    %}
  </li>
  <li>
    {% capture use-edited-template-additional-content %}
      Once your edited <i>Template</i> is saved to a file on your local workstation
      it can be used when starting new <code>Flight Recordings</code>. To do this using
      <b>Cryostat</b>, see
      <a href="{{ page.url }}#download-edit-and-upload-a-customized-event-template">Download, Edit, and Upload a Customized Event Template</a>
      for instructions on how to upload the new template to <b>Cryostat</b> and
      <a href="{{ page.url }}#startstop-a-recording">Start/Stop a Recording</a>
      for instructions on how to create a new <code>Recording</code> using this <i>Template</i>.
    {% endcapture %}
    {% include howto_step.html
      summary="Export the <i>Template</i>"
      image-name="2.3.0/edit-template-with-jmc-6.png"
      caption="
        Click <i>Export File...</i> to save the event template to a <code>.jfc</code>
        file on your local workstation.
      "
      text=use-edited-template-additional-content
    %}
  </li>
</ol>
