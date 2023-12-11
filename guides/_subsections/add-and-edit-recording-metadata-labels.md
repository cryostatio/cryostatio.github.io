## [Add and Edit Recording Metadata Labels](#add-and-edit-recording-metadata-labels)
Users can attach `Metadata` or `Custom Labels` to **JDK** `Flight Recordings` managed by **Cryostat**. `Recording Labels` can be used to identify `Recordings` during queries or perform actions on multiple `Recordings` containing the same `Labels`. Here’s how to *Add* and *Edit* `Metadata Labels` on your **JDK** `Flight Recordings`.

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
      image-name="2.4.0/add-and-edit-recording-metadata-labels-1.png"
      text="
        When creating a custom <code>Flight Recording</code> with <b>Cryostat</b>, expand the form section <i>Show metadata options</i>. Click <i>Add Label</i> and add <i>key-Value</i> <code>Label</code> pairs to the form. Finally, click <i>Create</i> to attach the <code>Labels</code> and create the <code>Recording</code>.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View your <code>Labels</code> on the <i>Active Recordings</i> Table"
      image-name="2.4.0/add-and-edit-recording-metadata-labels-2.png"
      text="
        The new <code>Recording</code> will appear in the <i>Recordings Tab</i> with your <code>Custom Label</code> as well as default <code>Labels</code> containing information about the selected <code>Recording</code> template.
      "
    %}
  </li>
  <li>
    {% capture edit-an-existing-label-text %}
    <p>
      <code>Recording Labels</code> can also be edited after <code>Recordings</code> have been created or re-uploaded to archives. It looks like the <code>Custom Label</code> in our example contains a typo - we can fix the typo by editing the <code>Label</code>. First select a <code>Recording</code> from the table with the 🗹 checkbox. Then, click the <i>Edit Labels</i> button to bring up the label drawer. Finally, click the <i>Edit</i> button that appears from the drawer.
      <br><br>
      <a href="{{ site.url }}/images/2.4.0/add-and-edit-recording-metadata-labels-4.png" target="_blank">
        <img src="{{ site.url }}/images/2.4.0/add-and-edit-recording-metadata-labels-4.png">
      </a>
      <br><br>
      The <code>Labels</code> section will appear as a form where you can <i>Add</i>, <i>Edit</i>, or <i>Delete</i> existing <code>Labels</code>, just like before when we created the <code>Recording</code>. Fix the typo, and click <i>Save</i> to save your edited <code>Labels</code>.
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Edit an Existing <code>Label</code>"
      image-name="2.4.0/add-and-edit-recording-metadata-labels-3.png"
      text=edit-an-existing-label-text
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View your edited <code>Labels</code>"
      image-name="2.4.0/add-and-edit-recording-metadata-labels-5.png"
      text="
        The <code>Recording Labels</code> should be updated in the <i>Active Recordings</i> table.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="<i>(Optional)</i> Archive your <code>Recording</code> to view <code>Labels</code> copied onto the <code>Archived Recording</code>"
      image-name="2.4.0/add-and-edit-recording-metadata-labels-6.png"
      text="
        On the <i>Active Recordings</i> table, click the <i>Checkbox</i> next to the <code>Recording</code>, then click <i>Archive</i> to archive your <code>Recording</code>. Notice that the <code>Archived Recording</code> also copies the <code>Labels</code> from the <code>Active Recording</code>. You can also add <code>Labels</code> to any <code>Recording</code> uploaded to <b>Cryostat’s</b> archives.
      "
    %}
  </li>
  <li>
    {% capture bulk-edit-recording-labels-text %}
    <p>
      Create another <code>Recording</code> on the same target. Then select both <code>Recordings</code> on the <i>Recordings Table</i> and click <i>Edit Labels</i> and start editing. This time, only <code>Labels</code> that are present on both <code>Recordings</code> will be shown in the form. Let's <i>Delete</i> the two common template-related <code>Labels</code>, and <i>Add</i> a new <code>Label</code> to both <code>Recordings</code>. Then finally, click <i>Save</i>.
      <br><br>
      <a href="{{ site.url }}/images/2.4.0/add-and-edit-recording-metadata-labels-8.png" target="_blank">
        <img src="{{ site.url }}/images/2.4.0/add-and-edit-recording-metadata-labels-8.png">
      </a>
      <br><br>
      Congratulations, you have successfully bulk-edited <code>Labels</code> across multiple <code>Recordings</code>!
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="<i>(Optional)</i> Bulk-edit <code>Recording Labels</code> across multiple <code>Recordings</code>"
      image-name="2.4.0/add-and-edit-recording-metadata-labels-7.png"
      text=bulk-edit-recording-labels-text
    %}
  </li>
</ol>
