## [Re-Upload a Recording to Archives](#re-upload-a-recording-to-archives)
After downloading an archived recording from Cryostat, it can be re-uploaded
into Cryotat's archives later. This is useful if, for example, your Cryostat
instance has been scaled down or undeployed for some time and the attached
storage lost, and you then want to use Cryostat's analysis tools with a
previously retrieved recording in a new Cryostat instance.

<ol>
  <li>
    {% include howto_step.html
      summary="Select an application"
      image-name="select-target-application.png"
      text="
        Although the archived storage is global to the Cryostat instance and is
        not target application specific, the view for <i>Archived Recordings</i>
        is only visible when a target application is selected.
      "
    %}
  </li>
  <li>
    {% include_relative _subsections/common/navigate-to-recordings.md %}
  </li>
  <li>
    {% include howto_step.html
      summary="Select the Archived Recordings tab"
      image-name="re-upload-a-recording-to-archives-1.png"
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Select the Recording to Upload"
      image-name="re-upload-a-recording-to-archives-2.png"
      caption="
        Click the '+' button, then click <i>Browse...</i> and select the .jfr
        file to upload. Then click 'Submit'.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Upload the Recording"
      image-name="re-upload-a-recording-to-archives-3.png"
      caption="Click 'Upload' and observe that the recording is now present in
      the <i>Archived Recordings</i> tab."
    %}
  </li>
</ol>
