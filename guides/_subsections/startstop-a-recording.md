## [Start/Stop a Recording](#startstop-a-recording)
The first and most basic workflow is to start a `Flight Recording` in a target
**JVM**.

<ol>
  <li>
    {% include_relative _subsections/common/select-target-application.md %}
  </li>
  <li>
    {% include_relative _subsections/common/navigate-to-recordings.md %}
  </li>
  <li>
    {% include_relative _subsections/common/click-create.md %}
  </li>
  <li>
    {% include howto_step.html
      summary="Configure the new recording"
      image-name="2.3.0/startstop-a-recording-1.png"
      text="
      <p>
        Enter a <i>Name</i> for the new recording. The form will alert you if the name
        entered has an invalid format. If the name is already in use then the
        creation will fail and you will need to try again.
      </p>
      <p>
        Select the <i>Duration</i> of the recording. The duration can be specified in
        <code>seconds</code>, <code>minutes</code>, or <code>hours</code>. If you want to record indefinitely, select the
        <i>Continuous</i> option. You may also want to save the recording to <b>Cryostat</b> archive
        storage when the recording stops with the <i>Archive on Stop</i> option.
      </p>
      <p>
        Select an event <i>Template</i> or enter a custom event definition. If you are
        unsure which to choose, the <code>Continuous</code> template is useful for
        always-on production monitoring with the <i>Continuous</i> recording
        duration setting, and the <i>Profiling</i> template is useful for
        collecting extra information for troubleshooting a specifically
        identified problem with a fixed recording duration.
      </p>
      <p>
        To learn about <i>Metadata Options</i>, see <a href='#add-and-edit-recording-metadata-labels'>Add and Edit Recording Metadata Labels</a>.
      </p>
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="<i>(Optional)</i> Adjust any <i>Advanced Options</i> for the recording"
      image-name="2.3.0/startstop-a-recording-2.png"
      text="
      <p>
        In many cases, the <i>Advanced Options</i> can be left with their
        default values. To view and change their values, select <i>Show
        advanced options</i> above the <i>Create</i> button. The following
        options are configurable:
      </p>
      <p>
        <i>To Disk</i>: Use this parameter to specify whether to write data to
        your <b>JVM</b> container's disk while recording. By default, this parameter
        is true.
      </p>
      <p>
        <i>Maximum Size</i>: Use this parameter to specify the maximum size of
        disk data to keep for the recording. This parameter is valid only when
        the disk parameter is set to true. By default, the maximum size of disk
        data isn’t limited, and this parameter is set to 0.
      </p>
      <p>
        <i>Maximum Age</i>: Use this parameter to specify the maximum number of
        <code>seconds</code>, <code>minutes</code>, or <code>hours</code> that events should be kept in the recording
        before being discarded. This parameter is valid only when the disk
        parameter is set to true, and the recording duration is not <i>Continuous</i>.
        By default, this parameter is set to 0, which means there is no limit set.
      </p>
      "
    %}
  </li>
  <li>
    <summary>Click the <i>Create</i> button</summary>
  </li>
  <li>
    {% capture stop-the-recording-additional-content %}
      <p>
        When you no longer desire for the <code>Flight Recording</code> to be active and
        collecting data in your target application, select the recording from
        the list by clicking the checkbox to the left of the recording name.
        This will enable the <i>Stop</i> button in the toolbar. Click the
        <i>Stop</i> button to end the data collection.
      </p>
      <p>
        If the recording has a <code>fixed duration</code> then it will automatically stop
        after the target <b>JVM</b> measures that the duration has elapsed. If the
        recording was created with a <code>continuous duration</code> then it will collect
        data until explicitly stopped.
      </p>
      <p>
        After <code>stopping</code> a recording it remains in the <i>Active</i> section of
        the <i>Recordings</i> view. This signifies that the recording data is still
        present in the target <b>JVM</b>, and not within <b>Cryostat's</b> storage. If the
        target <b>JVM</b> <code>crashes</code>, is <code>killed</code>, or the process otherwise <code>restarts</code>, then
        the recording data will be lost. To learn how to persist the <code>Flight
        Recording</code> data, continue on to
        <a href="{{ page.url }}#archive-a-recording"><code>Archive a Recording</code></a>.
      </p>
    {% endcapture %}
    {% include howto_step.html
      summary="<i>Stop</i> the recording"
      image-name="2.3.0/startstop-a-recording-3.png"
      text=stop-the-recording-additional-content
    %}
  </li>
</ol>
