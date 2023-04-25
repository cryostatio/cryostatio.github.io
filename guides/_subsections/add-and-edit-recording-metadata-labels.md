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
      summary="Add metadata labels to the Create Recording form"
      image-name="2.3.0/add-and-edit-recording-metadata-labels-1.png"
      text="
        When creating a custom flight recording with Cryostat, expand the form section <i>Show metadata options</i>. Click <i>Add Label</i> and add key-value label pairs to the form. Finally, click <i>Create</i> to attach the labels and create the recording.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View your labels on the Active Recordings Table"
      image-name="2.3.0/add-and-edit-recording-metadata-labels-2.png"
      text="
        The new recording will appear in the Recordings tab with your custom label as well as default labels containing information about the selected recording template.
      "
    %}
  </li>
  <li>
    {% capture edit-an-existing-label-text %}
    <p>
      Recording labels can also be edited after recordings have been created or re-uploaded to archives. It looks like the custom label in our example contains a typo - we can fix the typo by editing the label. First select a recording from the table with the 🗹 checkbox. Then, click the <i>Edit Labels</i> button to bring up the label drawer. Finally, click the <i>Edit</i> button that appears from the drawer.
      <br><br>
      <a href="{{ site.url }}/images/2.3.0/add-and-edit-recording-metadata-labels-4.png" target="_blank">
        <img src="{{ site.url }}/images/2.3.0/add-and-edit-recording-metadata-labels-4.png">
      </a>
      <br><br>
      The labels section will appear as a form where you can add, edit, or delete existing labels, just like before when we created the recording. Fix the typo, and click <i>Save</i> to save your edited labels.
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Edit an existing label"
      image-name="2.3.0/add-and-edit-recording-metadata-labels-3.png"
      text=edit-an-existing-label-text
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View your edited labels"
      image-name="2.3.0/add-and-edit-recording-metadata-labels-5.png"
      text="
        The recording labels should be updated in the Active Recordings table. 
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="<i>(Optional)</i> Archive your recording to view labels copied onto the archived recording"
      image-name="2.3.0/add-and-edit-recording-metadata-labels-6.png"
      text="
        On the Active Recordings table, click the checkbox next to the recording, then click <i>Archive</i> to archive your recording. Notice that the archived recording also copies the labels from the active recording. You can also add labels to any recording uploaded to Cryostat’s archives.
      "
    %}
  </li>
  <li>
    {% capture bulk-edit-recording-labels-text %}
    <p>
      Create another recording on the same target. Then select both recordings on the Recordings Table and click <i>Edit Labels</i> and <i>Edit</i>.This time, only labels that are present on both recordings will be shown in the form. Let's delete the two common template-related labels, and add a new label to both recordings. Then finally, click <i>Save</i>.
      <br><br>
      <a href="{{ site.url }}/images/2.3.0/add-and-edit-recording-metadata-labels-8.png" target="_blank">
        <img src="{{ site.url }}/images/2.3.0/add-and-edit-recording-metadata-labels-8.png">
      </a>
      <br><br>
      Congratulations, you have successfully bulk-edited labels across multiple recordings!
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="<i>(Optional)</i> Bulk-edit recording labels across multiple recordings"
      image-name="2.3.0/add-and-edit-recording-metadata-labels-7.png"
      text=bulk-edit-recording-labels-text
    %}
  </li>
</ol>
