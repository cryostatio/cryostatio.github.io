## [Perform Garbage Collection](#perform-garbage-collection)
<ol>
    <li>
      {% capture perform-garbage-collection-text %}
      <p>
        The <i>Diagnostics</i> <code>card</code> allows 
        you to perform diagnostic operations on a <code>target</code> <b>JVM</b> through remote access to supported <b>Java MXBeans</b>.
      </p>
      <p>
        Currently <b>Cryostat</b> supports invoking garbage collection on <code>target</code> <b>JVMs</b>.
      </p>
      {% endcapture %}
      {% include howto_step.html
        summary="Add the <i>Diagnostics</i> <code>Card</code>"
        image-name="4.0.0/dashboard/add-diagnostics-card.png"
        caption="Click on the <i>Diagnostics</i> <code>card</code> for a preview."
        text=perform-garbage-collection-text
      %}
    </li>
    <li>
      {% capture diagnostics-card-finish %}
      <p>
        After clicking <i>Finish</i>, the <code>card</code> will be added to the dashboard. You can click the <i>Start Garbage Collection</i> button in the middle of the <code>card</code> at any time to trigger a garbage collection cycle.
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Finish <code>Card</code> Creation"
      image-name="4.1.0/diagnostics-card.png"
      caption="The <i>Diagnostics</i> <code>card</code> displayed on the dashboard."
      text=diagnostics-card-finish
    %}
    </li>
</ol>