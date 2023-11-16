{% capture navigate-to-recordings-include-text %}
  If the target <b>JVM</b> has <code>SSL/TLS</code> enabled on <b>JMX</b> connections then it may be
  necessary to add the target's certificate to <b>Cryostat's</b> trust store. Go
  to <a href="{{ site.url }}/guides/#add-a-trusted-certificate">Add a Trusted Certificate</a>
  and return to this section after completing that guide.
  <a href="{{ site.url }}/images/2.3.0/navigate-to-recordings-2.png" target="_blank">
    <img src="{{ site.url }}/images/2.3.0/navigate-to-recordings-2.png">
  </a>
  {{ include.additional-content }}
{% endcapture %}
{% include howto_step.html
  summary="Navigate to <i>Recordings</i>"
  image-name="2.3.0/navigate-to-recordings-1.png"
  caption="
    Supply <b>JMX</b> credentials to authenticate to the target, if necessary. If
    the target is not configured with <b>JMX</b> authentication then the
    connection attempt will continue without prompting for credentials.
  "
  text=navigate-to-recordings-include-text
%}
