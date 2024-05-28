## [View a Recording in Grafana](#view-a-recording-in-grafana)
**Cryostat** provides integration with **Grafana** to plot curated time series
metrics from a `Recording`. By selecting _View in Grafana_ on either an
`Active` or `Archived Recording`, **Cryostat** uploads your `Recording` to
a custom **Grafana Data Source**, and launches **Grafana** in a new browser
tab. If **Cryostat** was installed to a **Kubernetes/OpenShift** cluster using the
**Cryostat Operator** or **Cryostat Helm Chart**, your browser should reuse the
same login credentials (if any) as for the Cryostat UI itself. If you are
greeted by a login page then simply log in again using your same account credentials
which you use to log in to Cryostat.

<ol>
  <li>
    {% include_relative _subsections/common/select-target-application.md %}
  </li>
  <li>
    {% include_relative _subsections/common/navigate-to-recordings.md %}
  </li>
  <li>
    {% include_relative _subsections/common/select-a-recording.md
      select-a-recording-caption="
        If you do not have any <b>Recordings</b> present in the <i>Active Recordings</i>
        view, follow
        <a href='#startstop-a-recording'>Start/Stop a Recording</a>
        to create one, or select a different <i>Target</i> application.
        You may also select an <code>Archived Recording</code> to view in <b>Grafana</b>.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Select <i>View in Grafana...</i>"
      image-name="3.0.0/view-in-grafana-1.png"
      caption="
        Select <i>View in Grafana...</i> from the <code>Recording's</code> overflow
        menu.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View and Interact With Data From Your <code>Recording</code>"
      image-name="3.0.0/view-in-grafana-2.png"
      caption="
        Observe the plotted time series data from curated metrics in your
        <code>Recording</code>. Select time ranges to zoom into the data.
      "
    %}
  </li>
</ol>
