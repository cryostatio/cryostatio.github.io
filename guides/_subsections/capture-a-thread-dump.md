## [Capture a Thread Dump](#capture-a-thread-dump)
<ol>
    <li>
      {% capture capture-a-thread-dump-text %}
      <p>
        The <i>Diagnostics</i> <code>card</code> and Capture/Diagnostics page 
        allows you to perform diagnostic operations on a <code>target</code> <b>JVM</b> through remote access to supported <b>Java MXBeans</b>.
      </p>
      <p>
        Currently <b>Cryostat</b> supports invoking garbage collection, capturing Thread Dumps, and capturing Heap Dumps on <code>target</code> <b>JVMs</b>.
      </p>
      <p>
        <b>Thread Dumps</b> are a profiling tool that is built into the <b>JVM</b>. They allow you to capture a snapshot of all the threads currently running within a <b>JVM</b> Process at a specific moment in time. They provide detailed information about each thread that aid in diagnosing performance issues, identifying deadlocks and determining other problems with concurrency.
      </p>
      {% endcapture %}
      {% include howto_step.html
        summary="Add the <i>Diagnostics</i> <code>Card</code>"
        image-name="4.1.0/dashboard/add-diagnostics-card.png"
        caption="Click on the <i>Diagnostics</i> <code>card</code> for a preview."
        text=capture-a-thread-dump-text
      %}
    </li>
    <li>
      {% capture diagnostics-card-finish %}
      <p>
        After clicking <i>Finish</i>, the <code>card</code> will be added to the dashboard. You can click the <i>Invoke Thread Dump</i> button in the middle of the <code>card</code> at any time to trigger a thread dump that will then be uploaded to the archives.
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Finish <code>Card</code> Creation"
      image-name="4.1.0/dashboard/diagnostics-card.png"
      caption="The <i>Diagnostics</i> <code>card</code> displayed on the dashboard."
      text=diagnostics-card-finish
    %}
    </li>
    <li>
    <summary>Click the <i>Archive</i> button</summary>
  </li>
  <li>
    {% include howto_step.html
      summary="Navigate to the <i>Thread Dumps</i> tab"
      image-name="4.1.0/archive-a-thread-dump.png"
      caption="
        Once the <code>Thread Dump</code> has been archived, a new entry will appear in the
        <code>target</code> <b>JVM's</b> <i>Thread Dumps</i> table. All <code>Thread Dumps</code> that were
        saved from the current <code>target</code> will be listed here in their own table.
        Switching to a different <code>target</code> from the dropdown will list only the
        <code>Thread Dumps</code> archived from that source <code>target</code>. Alternatively, clearing the target will provide access to the All-Targets view. The name of the <code>Thread Dump</code> reflects the address of the <code>target</code> application.
      "
    %}
  </li>
</ol>