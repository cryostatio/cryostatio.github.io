## [Snapshot a Recording](#snapshot-a-recording)
Snapshotting an active recording produces a new recording in the target JVM
named `snapshot-n`, where `n` is a natural number. This snapshot contains all of
the JFR data that was present in the target JVM at the time that the snapshot
was taken and is in the `STOPPED` state as soon as it is created (that is, the
snapshot will never record any further information and is fixed in size).
This is useful when you have an ongoing, continuous recording active in a
target application and want to preserve the specific information at a given
point in time. If the continuous source recording is configured with a maximum
event age or maximum recording size then the need for snapshots is more
apparent, since without snapshotting some older data will eventually be dropped
from the source recording and lost.

<ol>
  <li>
    {% include_relative _subsections/common/select-target-application.md %}
  </li>
  <li>
    {% capture navigate-recordings-additional-content %}
      <p>
        If you do not have any recordings present in the Active Recordings
        view, follow
        <a href="{{ page.url }}#startstop-a-recording">Start/Stop a Recording</a>
        to create one, or select a different target application.
      </p>
    {% endcapture %}
    {% include_relative _subsections/common/navigate-to-recordings.md additional-content=navigate-recordings-additional-content %}
  </li>
  <li>
    {% include_relative _subsections/common/click-create.md %}
  </li>
  <li>
    {% include howto_step.html
      summary="Switch to the <i>Snapshot Recording</i> tab"
      image-name="snapshot-a-recording-1.png"
      caption="
        Switch to the <i>Snapshot Recording</i> tab and click the <i>Create</i>
        button.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Observe the new snapshot"
      image-name="snapshot-a-recording-2.png"
      caption="
        After clicking the <i>Create</i> button you will be returned to the
        Active Recordings view and the new snapshot recording will be present
        in the table. The snapshot recording can then be treated as any other
        active recording in the target application's JVM memory.
      "
    %}
  </li>
</ol>
