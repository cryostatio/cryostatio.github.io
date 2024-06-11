{% capture caption-content %}
  {{ include.select-a-recording-caption }}
{% endcapture %}
{% capture text-content %}
  {{ include.select-a-recording-additional-content }}
{% endcapture %}
{% include howto_step.html
  summary="Select a <code>Recording</code>"
  image-name="3.0.0/select-a-recording.png"
  caption=caption-content
  text=text-content
%}
