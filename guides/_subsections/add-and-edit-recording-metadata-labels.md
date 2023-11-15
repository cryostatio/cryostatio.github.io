## [Add and Edit Recording Metadata Labels](#add-and-edit-recording-metadata-labels)
Users can attach `Metadata` or `Custom` labels to **JDK** `Flight Recordings` managed by **Cryostat**. **Recording** labels can be used to identify `Recordings` during queries or perform actions on multiple `Recordings` containing the same labels. Here’s how to *Add* and *Edit* `Metadata Labels` on your **JDK** `Flight Recordings`.

<ol>
  <li>
    {% include_relative _subsections/common/navigate-to-recordings.md %}
  </li>
  <li>
    {% include_relative _subsections/common/click-create.md %}
  </li>
  <li>
    {% include howto_step.html
      summary="Add <code>Metadata Labels</code> to the <i>Create Recording</i> form"
      image-name="2.3.0/add-and-edit-recording-metadata-labels-1.png"
      text="
        When creating a custom <code>Flight Recording</code> with <b>Cryostat</b>, expand the form section <i>Show metadata options</i>. Click <i>Add Label</i> and add key-value label pairs to the form. Finally, click <i>Create</i> to attach the labels and create the <code>Recording</code>.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View your Labels on the <i>Active Recordings Table</i>"
      image-name="2.3.0/add-and-edit-recording-metadata-labels-2.png"
      text="
        The new <code>Recording</code> will appear in the <i>Recordings Tab</i> with your <code>Custom</code> label as well as default labels containing information about the selected <code>Recording</code> template.
      "
    %}
  </li>
  <li>
    {% capture edit-an-existing-label-text %}
    <p>
      <code>Recording</code> labels can also be edited after <code>Recordings</code> have been created or re-uploaded to archives. It looks like the <code>Custom</code> label in our example contains a typo - we can fix the typo by editing the label. First select a <code>Recording</code> from the table with the 🗹 checkbox. Then, click the <i>Edit Labels</i> button to bring up the label drawer. Finally, click the <i>Edit</i> button that appears from the drawer.
      <br><br>
      <a href="{{ site.url }}/images/2.3.0/add-and-edit-recording-metadata-labels-4.png" target="_blank">
        <img src="{{ site.url }}/images/2.3.0/add-and-edit-recording-metadata-labels-4.png">
      </a>
      <br><br>
      The labels section will appear as a form where you can <i>Add</i>, <i>Edit</i>, or <i>Delete</i> existing labels, just like before when we created the <code>Recording</code>. Fix the typo, and click <i>Save</i> to save your edited labels.
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Edit an Existing Label"
      image-name="2.3.0/add-and-edit-recording-metadata-labels-3.png"
      text=edit-an-existing-label-text
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View your Edited Labels"
      image-name="2.3.0/add-and-edit-recording-metadata-labels-5.png"
      text="
        The <code>Recording</code> labels should be updated in the <i>Active Recordings</i> table.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="<i>(Optional)</i> Archive your <code>Recording</code> to view labels copied onto the <code>Archived Recording</code>"
      image-name="2.3.0/add-and-edit-recording-metadata-labels-6.png"
      text="
        On the <i>Active Recordings</i> table, click the <i>Checkbox</i> next to the <code>Recording</code>, then click <i>Archive</i> to archive your <code>Recording</code>. Notice that the <code>Archived Recording</code> also copies the labels from the <code>Active Recording</code>. You can also add labels to any <code>Recording</code> uploaded to <b>Cryostat’s</b> archives.
      "
    %}
  </li>
  <li>
    {% capture bulk-edit-recording-labels-text %}
    <p>
      Create another <code>Recording</code> on the same target. Then select both <code>Recordings</code> on the <i>Recordings Table</i> and click <i>Edit Labels</i> and <i>Edit</i>.This time, only labels that are present on both <code>Recordings</code> will be shown in the form. Let's <i>Delete</i> the two common template-related labels, and add a new label to both <code>Recordings</code>. Then finally, click <i>Save</i>.
      <br><br>
      <a href="{{ site.url }}/images/2.3.0/add-and-edit-recording-metadata-labels-8.png" target="_blank">
        <img src="{{ site.url }}/images/2.3.0/add-and-edit-recording-metadata-labels-8.png">
      </a>
      <br><br>
      Congratulations, you have successfully bulk-edited labels across multiple <code>Recordings</code>!
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="<i>(Optional)</i> Bulk-edit <code>Recording</code> labels Across Multiple <code>Recordings</code>"
      image-name="2.3.0/add-and-edit-recording-metadata-labels-7.png"
      text=bulk-edit-recording-labels-text
    %}
  </li>
</ol>
