## [View a Recording in Grafana](#view-in-grafana)
Cryostat provides integration with Grafana to plot curated time series
metrics from a recording. By selecting _View in Grafana_ on either an
_Active_ or _Archived Recording_, Cryostat uploads your recording to
a custom Grafana Data Source, and launches Grafana in a new browser
tab. If Cryostat was installed to a Kubernetes/OpenShift cluster using the
Cryostat Operator, you must retrieve the credentials generated
by the operator in order to log into Grafana. These credentials are stored
in a Kubernetes Secret. Once logged in, navigate to the dashboard titled
_Dashboard_. You will see a variety of metrics plotted from your recording.

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
        <figcaption>
          If you installed Cryostat into Kubernetes or OpenShift using the
          Cryostat Operator, use <i>kubectl</i> or <i>oc</i> to get the
          generated username and password for Grafana and save them for later.
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
        If you do not have any recordings present in the Active Recordings
        view, follow
        <a href='#startstop-a-recording'>Start/Stop a Recording</a>
        to create one, or select a different target application. 
        You may also select an archived recording to view in Grafana.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Select <i>View in Grafana...</i>"
      image-name="2.3.0/view-in-grafana-1.png"
      caption="
        Select <i>View in Grafana...</i> from the recording's overflow
        menu.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Log into Grafana"
      image-name="2.3.0/view-in-grafana-2.png"
      caption="
        Use the credentials retrieved in step 1 to log into the Grafana
        web client.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View and interact with data from your recording"
      image-name="2.3.0/view-in-grafana-4.png"
      caption="
        Observe the plotted time series data from curated metrics in your
        recording. Select time ranges to zoom into the data.
      "
    %}
  </li>
</ol>
