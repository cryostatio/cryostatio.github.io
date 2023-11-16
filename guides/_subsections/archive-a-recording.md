## [Archive a Recording](#archive-a-recording)
In contrast to `Active Recordings`, which reside within the container
of the target application, `Archived Recordings` reside within persistent
storage attached to a **Cryostat** instance. In **OpenShift**, for example, the
archives are stored in a `PersistentVolumeClaim`.

`Archived Recordings` are created by performing archival upon `Active Recordings`.
When this is requested, **Cryostat** connects to the target application and copies
the `Flight Recorder` data from the selected `Active Recording` into an `Archived
Recording` file in storage. The `Active` source recording may be `Continuous` or
`Fixed-duration`, using any `Event Template`, in
any state (`RUNNING`, `STOPPED`, etc.), and may even be a `snapshot`.

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
        If you do not have any <code>Recordings</code> present in the <i>Active Recordings</i>
        view, follow
        <a href="{{ page.url }}#startstop-a-recording"><i>Start/Stop</i> a <code>Recording</code></a>
        to create one, or select a different target application.
      </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Select an <i>Active Recording</i>"
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
        Once the <code>Recording</code> has been archived, a new entry will appear in the
        target <b>JVM's</b> <i>Archived Recordings</i> table. All <code>Recordings</code> that were
        saved from the current target will be listed here in their own table.
        Switching to a different target from the dropdown will list only the
        <code>Recordings</code> archived from that source target. The name of the <code>Archived
        Recording</code> reflects the address of the target application, the original
        name of the <code>Active Recording</code> that it was retrieved from, and includes a
        <code>timestamp</code> indicating when the <code>Archived Recording</code> was created.
      "
    %}
  </li>
</ol>
