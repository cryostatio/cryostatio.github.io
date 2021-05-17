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
    {% include howto_step.html
      summary="Click <i>Create</i>"
      image-name="startstop-a-recording-3.png"
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Configure and create the new recording"
      image-name="startstop-a-recording-4.png"
      text="
      <p>
        Enter a name for the new recording. The form will alert you if the name
        entered has an invalid format. If the name is already in use then the
        creation will fail and you will need to try again.
      </p>
      <p>
        Select an event template or enter a custom event definition. If you are
        unsure which to choose, the <i>Continuous</i> template is useful for
        always-on production monitoring with the <i>continuous</i> recording
        duration setting, and the <i>Profiling</i> template is useful for
        collecting extra information for troubleshooting a specifically
        identified problem with a fixed recording duration.
      </p>
      <p>
        Leave the <i>Advanced Options</i> to their default values for now.
      </p>
      <p>
        When you are satisfied with the recording configuration click
        <i>Create</i>.
      </p>
      "
    %}
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
        <a href="{{ site.url }}/getting-started#archive-a-recording">Archive a Recording</a>.
      </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Stop the recording"
      image-name="startstop-a-recording-5.png"
      text=stop-the-recording-additional-content
    %}
  </li>
</ol>
