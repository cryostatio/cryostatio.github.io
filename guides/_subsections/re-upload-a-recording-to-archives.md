## [Re-Upload a Recording to Archives](#re-upload-a-recording-to-archives)
After downloading an `Archived Recording` from **Cryostat**, it can be re-uploaded
into **Cryostat's** archives later. This is useful if, for example, your **Cryostat**
instance has been scaled down or undeployed for some time and the attached
storage is lost, and you then want to use **Cryostat's** analysis tools with a
previously retrieved <code>Recording</code> in a new **Cryostat** instance.

<ol>
  <li>
    {% include howto_step.html
      summary="Navigate to the <i>Archives</i> Tab"
      image-name="4.0.0/re-upload-a-recording-to-archives-1.png"
      caption="Select the <i>Uploads</i> tab."
      text="The entire <i>Archives</i> view contains several tabs related to performing operations
      on <code>Archived Recordings</code>. See <a href='#view-archived-recordings'>Viewing Archived Recordings</a>.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Select the Recording to Upload"
      image-name="4.0.0/re-upload-a-recording-to-archives-2.png"
      caption="
        Click the <i>Upload Icon</i> to bring up the upload prompt. Then click <i>Upload</i> and select the
        <code>.jfr</code> file to upload. Note that the file must follow the <b>Cryostat</b> <code>Archive Recording</code>
        naming convention. Mouse over the <sup>[?]</sup> tooltip on the prompt for more information.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="(Optional) Add <code>Metadata Labels</code>"
      image-name="4.0.0/re-upload-a-recording-to-archives-3.png"
      caption="
        Click <i>Show metadata options</i> to add optional <code>Metadata Labels</code> to a <code>Recording</code>.
        You can either add <code>Labels</code> by clicking the <i>Add Label</i> button, or by uploading
        a custom <code>.json</code> <code>Labels</code> file from your local storage. A custom <code>Labels</code> file
        can be downloaded alongside downloading a <code>Recording</code>. To learn how to download a <code>Recording</code>
        and any associated <code>Labels</code>, see <a href='#download-an-active-or-archived-recording'>Download an Active or Archived Recording</a>.
        and for more on <b>Cryostat</b> <code>Metadata Labels</code>, see <a href='#add-and-edit-recording-metadata-labels'>Add and Edit Recording Metadata Labels</a>.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Upload the <code>Recording</code>"
      image-name="4.0.0/re-upload-a-recording-to-archives-4.png"
      caption="Click <i>Upload</i> and observe that the <code>Recording</code> is now present in
      the <i>Uploads</i> tab of the <i>Archives</i> view."
    %}
  </li>
</ol>
