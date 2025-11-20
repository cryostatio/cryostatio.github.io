## [Snapshot a Recording](#snapshot-a-recording)
Snapshotting an application produces a new `Flight Recording` named `snapshot-n`,
where `n` is a natural number. This `snapshot` contains all of the **JFR** data that
was present in the <code>target</code> **JVM** at the time that the `snapshot` was taken and is in
the `STOPPED` state as soon as it is created (that is, the` snapshot` will never
record any further information and is fixed in size). This is useful when you
have an ongoing, `Continuous Recording` active in a <code>target</code> application and want
to preserve the specific information at a given point in time. If the
`Continuous` source `Recording` is configured with a maximum event age or maximum
recording size then the need for `snapshots` is more apparent, since without
snapshotting, some older data will eventually be dropped and lost from the
source `Recording`. It is also useful when you have multiple concurrent source
`Recordings` running and want an easy way to capture the sum of all of their data
at a given point in time.

<ol>
  <li>
    {% include_relative _subsections/common/select-target-application.md %}
  </li>
  <li>
    {% capture navigate-recordings-additional-content %}
      <p>
        If you do not have any <code>Recordings</code> present in the <i>Active Recordings</i>
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
      image-name="4.1.0/snapshot-a-recording-1.png"
      caption="
        Switch to the <i>Snapshot Recording</i> Tab and Click the <i>Create</i>
        button.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Observe the New <code>snapshot</code>"
      image-name="4.1.0/snapshot-a-recording-2.png"
      caption="
        After clicking the <i>Create</i> button you will be returned to the
        <i>Active Recordings</i> view and the new <code>snapshot</code> recording will be present
        in the table. The <code>snapshot</code> recording can then be treated as any other
        <code>Active Recording</code> in the <code>target</code> application's <b>JVM</b> memory.
      "
    %}
  </li>
</ol>
