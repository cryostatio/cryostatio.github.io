## [Start/Stop a Recording](#startstop-a-recording)
The first and most basic workflow is to start a Flight Recording in a target
JVM.

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
      image-name="2.2.0/startstop-a-recording-1.png"
      text="
      <p>
        Enter a name for the new recording. The form will alert you if the name
        entered has an invalid format. If the name is already in use then the
        creation will fail and you will need to try again.
      </p>
      <p>
        Select the duration of the recording. The duration can be specified in
        seconds, minutes, or hours. If you want to record indefinitely, select the
        <i>Continuous</i> option. You may also want to save the recording to Cryostat archive
        storage when the recording stops with the <i>Archive on Stop</i> option.
      </p>
      <p>
        Select an event template or enter a custom event definition. If you are
        unsure which to choose, the <code>Continuous</code> template is useful for
        always-on production monitoring with the <i>Continuous</i> recording
        duration setting, and the <code>Profiling</code> template is useful for
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
      image-name="2.2.0/startstop-a-recording-2.png"
      text="
      <p>
        In many cases, the <i>Advanced Options</i> can be left with their
        default values. To view and change their values, select <i>Show
        advanced options</i> above the <i>Create</i> button. The following
        options are configurable:
      </p>
      <p>
        <i>To Disk</i>: Use this parameter to specify whether to write data to
        your JVM container's disk while recording. By default, this parameter
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
        seconds, minutes, or hours that events should be kept in the recording
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
        When you no longer desire for the Flight Recording to be active and
        collecting data in your target application, select the recording from
        the list by clicking the checkbox to the left of the recording name.
        This will enable the <i>Stop</i> button in the toolbar. Click the
        <i>Stop</i> button to end the data collection. 
      </p>
      <p>
        If the recording has a fixed duration then it will automatically stop
        after the target JVM measures that the duration has elapsed. If the
        recording was created with a continuous duration then it will collect
        data until explicitly stopped.
      </p>
      <p>
        After stopping a recording it remains in the <i>Active</i> section of
        the Recordings view. This signifies that the recording data is still
        present in the target JVM, and not within Cryostat's storage. If the
        target JVM crashes, is killed, or the process otherwise restarts, then
        the recording data will be lost. To learn how to persist the Flight
        Recording data, continue on to
        <a href="{{ page.url }}#archive-a-recording">Archive a Recording</a>.
      </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Stop the recording"
      image-name="2.2.0/startstop-a-recording-3.png"
      text=stop-the-recording-additional-content
    %}
  </li>
</ol>
