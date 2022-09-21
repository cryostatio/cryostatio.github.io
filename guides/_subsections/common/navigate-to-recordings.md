{% capture navigate-to-recordings-include-text %}
<p>
  If the target JVM has SSL/TLS enabled on JMX connections then it may be
  necessary to add the target's certificate to Cryostat's trust store. Go
  to <a href="{{ site.url }}/guides/#add-a-trusted-certificate">Add a Trusted Certificate</a>
  and return to this section after completing that guide.
  <a href="{{ site.url }}/images/navigate-to-recordings-2.png" target="_blank">
    <img src="{{ site.url }}/images/navigate-to-recordings-2.png">
  </a>
  {{ include.additional-content }}
</p>
{% endcapture %}
{% include howto_step.html
  summary="Navigate to Recordings"
  image-name="navigate-to-recordings-1.png"
  caption="
    Supply JMX credentials to authenticate to the target, if necessary. If
    the target is not configured with JMX authentication then the
    connection attempt will continue without prompting for credentials.
  "
  text=navigate-to-recordings-include-text
%}
