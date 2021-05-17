## [Archive a Recording](#archive-a-recording)
In contrast to <i>Active Recordings</i>, which reside within the container
of the target application, <i>Archived Recordings</i> reside within persistent
storage attached to a Cryostat instance. In OpenShift, for example, the
archives are stored in a `PersistentVolumeClaim`.

Archived recordings are created by performing archival upon active recordings.
When this is requested, Cryostat connects to the target application and copies
the Flight Recorder data from the selected active recording into an archived
recording file in storage. The active source recording may be continuous or
fixed-duration, using any event template or event specifier string, may be in
any state (`RUNNING`, `STOPPED`, etc.), and may even be a snapshot.

<ol>
  <li>
    {% include_relative _subsections/common/select-target-application.md %}
  </li>
  <li>
    {% include_relative _subsections/common/navigate-to-recordings.md %}
  </li>
  <li>
    {% capture select-recording-additional-content %}
      <p>
        If you do not have any recordings present in the Active Recordings
        view, follow
        <a href="{{ site.url }}/getting-started#startstop-a-recording">Start/Stop a Recording</a>
        to create one, or select a different target application.
      </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Select an active recording"
      image-name="archive-a-recording-1.png"
      caption=select-recording-additional-content
    %}
  </li>
  <li>
    <summary>Click the <i>Archive</i> button</summary>
  </li>
  <li>
    {% include howto_step.html
      summary="Navigate to the <i>Archived Recordings</i> tab"
      image-name="archive-a-recording-2.png"
      caption="
        Once the recording has been archived, a new entry will appear in the
        <i>Archived Recordings</i> table. All recordings in the archives are
        displayed here, regardless of the selected target application. The
        name of the archived recording reflects the address of the target
        application and the original name of the active recording that it was
        retrieved from, and includes a timestamp indicating when the archived
        recording was created.
      "
    %}
  </li>
</ol>
