## [Perform Garbage Collection](#perform-garbage-collection)
<ol>
    <li>
      {% capture perform-garbage-collection-text %}
      <p>
        The <i>Diagnostics/Capture</i> view allows 
        you to perform diagnostic operations on a <code>target</code> <b>JVM</b> through remote access to supported <b>Java MXBeans</b>.
      </p>
      {% endcapture %}
      {% include howto_step.html
        summary="Navigate to the <i>Diagnostics Page</i>"
        image-name="4.1.0/capture-diagnostics-page.png"
        caption="Click on <i>Diagnostics/Capture</i> on the sidebar."
        text=perform-garbage-collection-text
      %}
    </li>
    <li>
      {% capture diagnostics-card-finish %}
      <p>
      Clicking the <code>Invoke Garbage Collection</code> button causes Cryostat to send a request to the selected target JVM to perform a Garbage Collection cycle. If the target JVM accepts and performs this cycle, and if it was able to free up heap space during the cycle, then the Heap Memory Usage chart should update and reflect the new heap usage.
      </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Click the Invoke Garbage Collection button"
      image-name="4.1.0/capture-diagnostics-invoke-gc.png"
      text=diagnostics-card-finish
    %}
    </li>
</ol>
