## [Upload an Automated Rule](#upload-an-automated-rule)

Instead of stepping through the form every time, you can also edit your Automated Rule definition files (JSON format) locally and quickly upload them.

Below is an example of a rule file content:

{% highlight json %}
{
  "name":"my_automated_rule",
  "description":"This is an example automated rule.",
  "matchExpression":"target.alias == 'io.cryostat.Cryostat'",
  "eventSpecifier":"template=Continuous,type=TARGET",
  "archivalPeriodSeconds":285,
  "initialDelaySeconds":60,
  "preservedArchives":10,
  "maxAgeSeconds":300,
  "maxSizeBytes":0,
  "enabled":true
}
{% endhighlight %}

<ol>
  <li>
      {% include howto_step.html
        summary="Open <i>Automated Rules</i> upload prompt"
        image-name="2.2.0/upload-an-automated-rule-1.png"
        caption="Click on upload icon button to open upload prompt."
      %}  
  </li>
  <li>
      {% include howto_step.html
        summary="Attach a rule file by dragging & dropping or clicking <i>Browse...</i>."
        image-name="2.2.0/upload-an-automated-rule-2.png"
        caption="Select a rule file to upload."
      %}  
  </li>
  <li>
    <summary>Click <i>Submit</i> button to upload.</summary>
  </li>
  <li>
      {% include howto_step.html
        summary="Observe the new rule in the <i>Automated Rules</i> table"
        image-name="2.2.0/create-an-automated-rule-5.png"
        caption="
          The new rule will appear in the <i>Automated Rules</i> table."
      %}  
  </li>
</ol>
