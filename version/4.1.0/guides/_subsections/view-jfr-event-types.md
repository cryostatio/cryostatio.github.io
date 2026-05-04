## [View JFR Event Types](#view-jfr-event-types)
The **JVM** comes with many built-in **JDK Flight Recorder** *Event Types* out-of-the-box.
You can also register new *event types* at the framework- or application-level using the
`jdk.jfr` API. **Cryostat** can list out all of a *Target* **JVM**'s registered *event types*
so you can see what kind of data may be captured by **Flight Recordings**.

<ol>
  <li>
    {% include_relative _subsections/common/select-target-application.md
      select-target-application-additional-content="
        The <i>Target</i> selected will provide the base <code>Continuous</code> and
        <code>Profiling</code> template definitions to start from. Most target
        applications will be interchangeable here.
      "
    %}
  </li>
  <li>
    {% capture navigate-to-events-include-text %}
    <p>
      If the <i>Target</i> <b>JVM</b> has <code>SSL/TLS</code> enabled on <b>JMX</b> connections then it may be
      necessary to add the <i>Target's</i> certificate to <b>Cryostat's</b> trust store. Go
      to <a href="{{ page.url }}#add-a-trusted-certificate">Add a Trusted Certificate</a>
      and return to this section after completing that guide.
      <a href="{{ site.url }}/images/4.0.0/navigate-to-events-2.png" target="_blank">
        <img src="{{ site.url }}/images/4.0.0/navigate-to-events-2.png">
      </a>
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Navigate to Events"
      image-name="4.0.0/navigate-to-events-1.png"
      caption="
        Supply <b>JMX</b> credentials to authenticate to the target, if necessary. If
        the target is not configured with <b>JMX</b> authentication then the
        connection attempt will continue without prompting for credentials.
      "
      text=navigate-to-events-include-text
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Navigate to Event Types"
      image-name="4.0.0/navigate-to-event-types-1.png"
      caption="
        Select the <i>Event Types</i> tab to view a table listing of all the <b>JDK Flight Recorder</b>
        <i>Event Types</i> registered in the <i>Target JVM</i>.
      "
    %}
  </li>
</ol>
