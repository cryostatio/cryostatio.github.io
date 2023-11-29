{% capture caption-content %}
  {{ include.select-target-application-caption }}
{% endcapture %}
{% capture text-content %}
  If you wish to create a custom target from here, click <i>Create Target</i> displayed at the bottom. Go to <a href='#create-a-custom-target'> Create a Custom Target</a> and proceed from step 3.
  Also, see <a href='#using-the-cryostat-agent'> Using the Cryostat Agent</a> section to help discover other <code>targets</code>.
{% endcapture %}
{% include howto_step.html
  summary="Select the <i>Target Application</i>"
  image-name="2.3.0/select-target-application.png"
  caption="Clik the <i>Dropdown arrow</i> on the right side of <i>Target</i> prompt to select or create a <code>target</code>."
  text=text-content
%}
