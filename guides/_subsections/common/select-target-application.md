{% capture caption-content %}
  {{ include.select-target-application-caption }}
{% endcapture %}
{% capture text-content %}
  {{ include.select-target-application-additional-content }}
{% endcapture %}
{% include howto_step.html
  summary="Select the target application"
  image-name="2.2.0/select-target-application.png"
  caption=caption-content
  text=text-content
%}
