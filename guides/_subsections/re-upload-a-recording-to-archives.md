## [Re-Upload a Recording to Archives](#re-upload-a-recording-to-archives)
After downloading an `Archived Recording` from **Cryostat**, it can be re-uploaded
into **Cryostat's** archives later. This is useful if, for example, your **Cryostat**
instance has been scaled down or undeployed for some time and the attached
storage lost, and you then want to use **Cryostat's** analysis tools with a
previously retrieved recording in a new **Cryostat** instance.

<ol>
  <li>
    {% include howto_step.html
      summary="Navigate to the <i>Archives</i> tab"
      image-name="2.3.0/re-upload-a-recording-to-archives-1.png"
      caption="Select the <i>Uploads</i> tab."
      text="The entire <i>Archives</i> view contains several tabs related to performing operations
      on <code>Archived recordings</code>. See <a href='#view-archived-recordings'>Viewing <code>Archived Recordings</code></a>.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Select the Recording to Upload"
      image-name="2.3.0/re-upload-a-recording-to-archives-2.png"
      caption="
        Click the '+' button to bring up the upload prompt. Then click <i>Browse...</i> and select the
        <code>.jfr</code> file to upload. Note that the file must follow the <b>Cryostat</b> <code>Archive Recording</code>
        naming convention. Mouse over the <sup>[?]</sup> tooltip on the prompt for more information.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="<i>(Optional)</i> Add Metadata Labels"
      image-name="2.3.0/re-upload-a-recording-to-archives-3.png"
      caption="
        Click <i>Show metadata options</i> to add optional metadata labels to recording.
        You can either add labels by clicking the <i>Add Label</i> button, or by uploading
        a custom <code>.json</code> labels file from your local storage. A custom labels file
        can be downloaded alongside downloading a recording. To learn how to download a recording
        and any associated labels, see <a href='#download-an-active-or-archived-recording'>Download and <code>Active</code> or <code>Archived Recording</code></a>.
        and for more on <b>Cryostat</b> metadata labels, see <a href='#add-and-edit-recording-metadata-labels'>Add and Edit Recording Metadata Labels</a>.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Upload the Recording"
      image-name="2.3.0/re-upload-a-recording-to-archives-4.png"
      caption="Click <i>Upload</i> and observe that the recording is now present in
      the <i>Uploads</i> tab of the <i>Archives</i> view."
    %}
  </li>
</ol>
