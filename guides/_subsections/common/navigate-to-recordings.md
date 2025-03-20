{% capture navigate-to-recordings-include-text %}
  If the <code>target</code> <b>JVM</b> has <code>SSL/TLS</code> enabled on <b>JMX</b> connections, it may be
  necessary to add the <code>target's</code> certificate to <b>Cryostat's</b> trust store. Go
  to <a href="{{ site.url }}/guides/#add-a-trusted-certificate">Add a Trusted Certificate</a>
  and return to this section after completing that guide.
  <a href="{{ site.url }}/images/4.0.0/navigate-to-recordings-2.png" target="_blank">
    <img src="{{ site.url }}/images/4.0.0/navigate-to-recordings-2.png">
  </a>
  {{ include.additional-content }}
{% endcapture %}
{% include howto_step.html
  summary="Navigate to <i>Recordings</i>"
  image-name="4.0.0/navigate-to-recordings-1.png"
  caption="
    Supply <b>JMX</b> credentials to authenticate to the <code>target</code>, if necessary. If
    the <code>target</code> is not configured with <b>JMX</b> authentication then the
    connection attempt will continue without prompting for credentials.
  "
  text=navigate-to-recordings-include-text
%}
