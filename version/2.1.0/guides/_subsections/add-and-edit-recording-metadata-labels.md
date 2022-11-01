## [Add and Edit Recording Metadata Labels](#add-and-edit-recording-metadata-labels)
Users can attach metadata or custom labels to JDK flight recordings managed by Cryostat. Recording labels can be used to identify recordings during queries or perform actions on multiple recordings containing the same labels. Here’s how to add and edit metadata labels on your JDK flight recordings.

<ol>
  <li>
    {% include_relative _subsections/common/navigate-to-recordings.md %}
  </li>
  <li>
    {% include_relative _subsections/common/click-create.md %}
  </li>
  <li>
    {% include howto_step.html
      summary="Add a label on the Custom Flight Recording form"
      image-name="2.1.0/add-and-edit-recording-metadata-labels-1.png"
      text="
        When creating a custom flight recording with Cryostat, expand the form section <i>Show metadata options</i>. Click <i>Add Label</i> to add a key-value label pair to the recording.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View your labels on the Active Recordings Table"
      image-name="2.1.0/add-and-edit-recording-metadata-labels-2.png"
      text="
        The new recording will appear in the Recordings tab with your custom label as well as default labels containing information about the selected recording template.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Edit an existing label"
      image-name="2.1.0/add-and-edit-recording-metadata-labels-3.png"
      text="
        Recording labels can also be edited after recordings have been created or re-uploaded to archives. It looks like the custom label in our example contains a typo - we can fix the typo by editing the label. Click the ellipsis menu beside the recording table entry, then click <i>Edit Metadata</i>. The labels section will appear as a form where you can add, edit, or delete existing labels. Click <i>Save</i> to save your edited labels.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View your edited labels"
      image-name="2.1.0/add-and-edit-recording-metadata-labels-4.png"
      text="
        The recording labels should be updated in the Active Recordings table. 
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="(Optional) Archive your recording to view labels copied onto the archived recording"
      image-name="2.1.0/add-and-edit-recording-metadata-labels-5.png"
      text="
        On the Active Recordings table, click the checkbox next to the recording, then click <i>Archive</i> to archive your recording. Notice that the archived recording also copies the labels from the active recording. You can also add labels to any recording uploaded to Cryostat’s archives.
      "
    %}
  </li>
</ol>
