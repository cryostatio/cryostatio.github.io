## [Capture a Heap Dump](#capture-a-thread-dump)
<ol>
    <li>
      {% capture capture-a-heap-dump-text %}
      <p>
        The <i>Diagnostics</i> <code>card</code> and Capture/Diagnostics page 
        allows you to perform diagnostic operations on a <code>target</code> <b>JVM</b> through remote access to supported <b>Java MXBeans</b>.
      </p>
      <p>
        Currently <b>Cryostat</b> supports invoking garbage collection, capturing Thread Dumps, and capturing Heap Dumps on <code>target</code> <b>JVMs</b>. Capturing Heap Dumps additionally requires a <b>Cryostat Agent</b> connection.
      </p>
      <p>
        <b>Heap Dumps</b> are a profiling tool that is built into the JVM. They allow you to capture a snapshot of all the memory currently in use within a JVM Process at a specific moment in time. They proide detailed information about all Java objects and classes residing in memory at the time that aid in diagnosing performance issues, memory leaks, and othe rproblems with memory usage.
      </p>
      {% endcapture %}
      {% include howto_step.html
        summary="Add the <i>Diagnostics</i> <code>Card</code>"
        image-name="4.0.0/dashboard/add-diagnostics-card.png"
        caption="Click on the <i>Diagnostics</i> <code>card</code> for a preview."
        text=capture-a-heap-dump-text
      %}
    </li>
    <li>
      {% capture diagnostics-card-finish %}
      <p>
        After clicking <i>Finish</i>, the <code>card</code> will be added to the dashboard. You can click the <i>Invoke Heap Dump</i> button in the middle of the <code>card</code> at any time to trigger a thread dump that will then be uploaded to the archives. If the button is disabled check that the target is a <b>Cryostat Agent</b> target
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Finish <code>Card</code> Creation"
      image-name="4.1.0/diagnostics-card.png"
      caption="The <i>Diagnostics</i> <code>card</code> displayed on the dashboard."
      text=diagnostics-card-finish
    %}
    </li>
    <li>
    <summary>Click the <i>Archive</i> button</summary>
  </li>
  <li>
    {% include howto_step.html
      summary="Navigate to the <i>Heap Dumps</i> tab"
      image-name="4.1.0/archive-a-heap-dump.png"
      caption="
        Once the <code>Heap Dump</code> has been archived, a new entry will appear in the
        <code>target</code> <b>JVM's</b> <i>Heap Dumps</i> table. All <code>Heap Dumps</code> that were
        saved from the current <code>target</code> will be listed here in their own table.
        Switching to a different <code>target</code> from the dropdown will list only the
        <code>Heap Dumps</code> archived from that source <code>target</code>. Alternatively, clearing the target will provide access to the All-Targets view. The name of the <code>Heap Dump</code> reflects the address of the <code>target</code> application.
      "
    %}
  </li>
</ol>