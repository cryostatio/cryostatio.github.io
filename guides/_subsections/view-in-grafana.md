## [View a Recording in Grafana](#view-a-recording-in-grafana)
**Cryostat** provides integration with **Grafana** to plot curated time series
metrics from a `Recording`. By selecting _View in Grafana_ on either an
`Active` or `Archived Recording`, **Cryostat** uploads your `Recording` to
a custom **Grafana Data Source**, and launches **Grafana** in a new browser
tab. If **Cryostat** was installed to a **Kubernetes/OpenShift** cluster using the
**Cryostat Operator,** you must retrieve the credentials generated
by the **Operator** in order to log into **Grafana**. These credentials are stored
in a `Kubernetes Secret`. Once logged in, navigate to the dashboard titled
_Dashboard_. You will see a variety of metrics plotted from your `Recording`.

<ol>
  <li>
    <details>
      <summary>Retrieve the <b>Grafana</b> credentials</summary>
      <figure>
        {% highlight bash %}
CRYOSTAT_NAME=$(kubectl get cryostat -o jsonpath='{$.items[0].metadata.name}')
# Username
kubectl get secret ${CRYOSTAT_NAME}-grafana-basic -o jsonpath='{$.data.GF_SECURITY_ADMIN_USER}' | base64 -d
# Password
kubectl get secret ${CRYOSTAT_NAME}-grafana-basic -o jsonpath='{$.data.GF_SECURITY_ADMIN_PASSWORD}' | base64 -d
        {% endhighlight %}
        <figcaption>
          If you installed <b>Cryostat</b> into <b>Kubernetes</b> or <b>OpenShift</b> using the
          <b>Cryostat Operator</b>, use <code>kubectl</code> or <code>oc</code> to get the
          generated username and password for <b>Grafana</b> and save them for later.
        </figcaption>
      </figure>
    </details>
  </li>
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
      image-name="2.3.0/view-in-grafana-1.png"
      caption="
        Select <i>View in Grafana...</i> from the <code>Recording's</code> overflow
        menu.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Log into <b>Grafana</b>"
      image-name="2.3.0/view-in-grafana-2.png"
      caption="
        Use the credentials retrieved in step 1 to log into the <b>Grafana</b>
        web client.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View and Interact With Data From Your <code>Recording</code>"
      image-name="2.3.0/view-in-grafana-4.png"
      caption="
        Observe the plotted time series data from curated metrics in your
        <code>Recording</code>. Select time ranges to zoom into the data.
      "
    %}
  </li>
</ol>
