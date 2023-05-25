## [Archive a Recording](#archive-a-recording)
In contrast to <i>Active Recordings</i>, which reside within the container
of the target application, <i>Archived Recordings</i> reside within persistent
storage attached to a Cryostat instance. In OpenShift, for example, the
archives are stored in a `PersistentVolumeClaim`.

Archived recordings are created by performing archival upon active recordings.
When this is requested, Cryostat connects to the target application and copies
the Flight Recorder data from the selected active recording into an archived
recording file in storage. The active source recording may be continuous or
fixed-duration, may be using any event template, may be in
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
        <a href="{{ page.url }}#startstop-a-recording">Start/Stop a Recording</a>
        to create one, or select a different target application.
      </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Select an Active Recording"
      image-name="2.3.0/archive-a-recording-1.png"
      caption=select-recording-additional-content
    %}
  </li>
  <li>
    <summary>Click the <i>Archive</i> button</summary>
  </li>
  <li>
    {% include howto_step.html
      summary="Navigate to the <i>Archived Recordings</i> tab"
      image-name="2.3.0/archive-a-recording-2.png"
      caption="
        Once the recording has been archived, a new entry will appear in the
        target JVM's <i>Archived Recordings</i> table. All recordings that were
        saved from the current target will be listed here in their own table.
        Switching to a different target from the dropdown will list only the 
        recordings archived from that source target. The name of the archived 
        recording reflects the address of the target application, the original 
        name of the active recording that it was retrieved from, and includes a 
        timestamp indicating when the archived recording was created.
      "
    %}
  </li>
</ol>
