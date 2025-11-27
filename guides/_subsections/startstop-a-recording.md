## [Start/Stop a Recording](#startstop-a-recording)
The first and most basic Flight Recorder workflow is to start a `Flight Recording` in a `target`
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
      summary="Configure the new <code>Recording</code>"
      image-name="4.1.0/startstop-a-recording-1.png"
      text="
      <p>
        Enter a <i>Name</i> for the new <code>Recording</code>. The form will alert you if the name
        entered has an invalid format. If the name is already in use then the
        creation will fail and you will need to try again, or check the <i>Restart if recording already exists</i>
        checkbox to allow Cryostat to reuse the same recording name for a new recording with new settings.
      </p>
      <p>
        Select the <i>Duration</i> of the <code>Recording</code>. The duration can be specified in
        <code>seconds</code>, <code>minutes</code>, or <code>hours</code>. If you want to record indefinitely, select the
        <i>Continuous</i> option. You may also want to save the <code>Recording</code> to <b>Cryostat</b> archive
        storage when the <code>Recording</code> stops with the <i>Archive on Stop</i> option.
      </p>
      <p>
        Select an event <i>Template</i> or enter a custom event definition. If you are
        unsure which to choose, the <i>Continuous</i> template is useful for
        always-on production monitoring with the <i>Continuous</i> recording
        duration setting, and the <i>Profiling</i> template is useful for
        collecting extra information for troubleshooting a specifically
        identified problem with a fixed <code>Recording</code> duration.
        You can also
        <a href='#download-edit-and-upload-a-customized-event-template'>upload a custom Event Template</a>
        and select it here.
      </p>
      <p>
        To learn about <code>Metadata Options</code>, see <a href='#add-and-edit-recording-metadata-labels'>Add and Edit Recording Metadata Labels</a>.
      </p>
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="<i>(Optional)</i> Adjust any <i>Advanced Options</i> for the <code>Recording</code>"
      image-name="4.1.0/startstop-a-recording-2.png"
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
        disk data to keep for the <code>Recording</code>. This parameter is valid only when
        the disk parameter is set to true. By default, the maximum size of disk
        data isn’t limited, and this parameter is set to 0.
      </p>
      <p>
        <i>Maximum Age</i>: Use this parameter to specify the maximum number of
        <code>seconds</code>, <code>minutes</code>, or <code>hours</code> that events should be kept in the <code>Recording</code>
        before being discarded. This parameter is valid only when the disk
        parameter is set to true, and the <code>Recording</code> duration is not <i>Continuous</i>.
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
        When you no longer desire for the <code>Flight Recording</code> to be <code>Active</code> and
        collecting data in your target application, select the <code>Recording</code> from
        the list by clicking the checkbox to the left of the <code>Recording</code> name.
        This will enable the <i>Stop</i> button in the toolbar. Click the
        <i>Stop</i> button to end the data collection.
      </p>
      <p>
        If the <code>Recording</code> has a fixed duration then it will automatically stop
        after the <code>target</code> <b>JVM</b> measures that the duration has elapsed. If the
        <code>Recording</code> was created with a <code>Continuous Duration</code> then it will collect
        data until explicitly stopped.
      </p>
      <p>
        After <code>Stopping</code> a <code>Recording</code> it remains in the <i>Active</i> section of
        the <i>Recordings</i> view. This signifies that the <code>Recording</code> data is still
        present in the <code>target</code> <b>JVM</b>, and not within <b>Cryostat's</b> storage. If the
        <code>target</code> <b>JVM</b> crashes, is killed, or the process otherwise restarts, then
        the <code>Recording</code> data will be lost. To learn how to persist the <code>Flight
        Recording</code> data, continue on to
        <a href="{{ page.url }}#archive-a-recording">Archive a Recording</a>.
      </p>
    {% endcapture %}
    {% include howto_step.html
      summary="<i>Stop</i> the <code>Recording</code>"
      image-name="4.1.0/startstop-a-recording-3.png"
      text=stop-the-recording-additional-content
    %}
  </li>
</ol>
