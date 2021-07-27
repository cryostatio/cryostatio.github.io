## [View a Recording in Grafana](#view-in-grafana)
Cryostat provides integration with Grafana to plot curated time series
metrics from a recording. By selecting _View in Grafana_ on either an
_Active_ or _Archived Recording_, Cryostat uploads your recording to
a custom Grafana Data Source, and launches Grafana in a new browser
tab. To log into Grafana, you must retrieve the credentials generated
by the Cryostat Operator. The credentials are stored in a Kubernetes
Secret. Once logged in, navigate to the dashboard titled _Dashboard_. You
will see a variety of metrics plotted from your recording.

<ol>
  <li>
    <details>
      <summary>Retrieve the Grafana credentials</summary>
      <figure>
        {% highlight bash %}
CRYOSTAT_NAME=$(kubectl get cryostat -o jsonpath='{$.items[0].metadata.name}')
# Username
kubectl get secret ${CRYOSTAT_NAME}-grafana-basic -o jsonpath='{$.data.GF_SECURITY_ADMIN_USER}' | base64 -d
# Password
kubectl get secret ${CRYOSTAT_NAME}-grafana-basic -o jsonpath='{$.data.GF_SECURITY_ADMIN_PASSWORD}' | base64 -d
        {% endhighlight %}
        <figcaption>Use <i>kubectl</i> or <i>oc</i> to get the generated username and password
          for Grafana and save them for later</figcaption>
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
    {% capture navigate-recordings-additional-content %}
      <p>
        If you do not have any recordings present in the Active Recordings
        view, follow
        <a href="{{ page.url }}#startstop-a-recording">Start/Stop a Recording</a>
        to create one, or select a different target application.
      </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Select an active or archived recording"
      image-name="view-in-grafana-1.png"
      caption=select-recording-additional-content
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Select <i>View in Grafana...</i>"
      image-name="view-in-grafana-2.png"
      caption="
        Select <i>View in Grafana...</i> from the recording's overflow
        menu.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Log into Grafana"
      image-name="view-in-grafana-3.png"
      caption="
        Use the credentials retrieved in step 1 to log into the Grafana
        web client.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Select Cryostat's dashboard"
      image-name="view-in-grafana-4.png"
      caption="
        Navigate to the Dashboards tab in Grafana and select the dashboard
        named <i>Dashboard</i>.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View and interact with data from your recording"
      image-name="view-in-grafana-5.png"
      caption="
        Observe the plotted time series data from curated metrics in your
        recording. Select time ranges to zoom into the data.
      "
    %}
  </li>
</ol>
