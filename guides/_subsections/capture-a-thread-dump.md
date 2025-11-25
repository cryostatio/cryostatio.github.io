## [Capture a Thread Dump](#capture-a-thread-dump)
<ol>
    <li>
      {% capture capture-a-thread-dump-text %}
      <p>
        The <i>Diagnostics</i> <code>card</code> and Diagnostics/Capture page 
        allows you to perform diagnostic operations on a <code>target</code> <b>JVM</b> through remote access to supported <b>Java MXBeans</b>.
      </p>
      <p>
        Currently <b>Cryostat</b> supports invoking garbage collection, capturing Thread Dumps, and capturing Heap Dumps on <code>target</code> <b>JVMs</b>.
      </p>
      <p>
        <b>Thread Dumps</b> are a profiling tool that is built into the <b>JVM</b>. They allow you to capture a snapshot of all the threads currently running within a <b>JVM</b> Process at a specific moment in time. They provide detailed information about each thread that aid in diagnosing performance issues, identifying deadlocks and determining other problems with concurrency.
      </p>
      <p>
        You can click the <i>Invoke Thread Dump</i> button in the middle of the <code>card</code> at any time to trigger a <code>Thread Dump</code> that will then be uploaded to the archives.
    </p>
      {% endcapture %}
      {% include howto_step.html
        summary="Navigate to the <i>Diagnostics</i> Page"
        image-name="4.1.0/capture-diagnostics-page.png"
        caption="Click on <i>Diagnostics/Capture</i> on the sidebar."
        text=capture-a-thread-dump-text
      %}
    </li>
    <li>
    <summary>Click the <i>Invoke Thread Dump</i> button</summary>
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
        <code>Thread Dumps</code> archived from that source <code>target</code>. Alternatively, clearing the target will provide access to the All-Targets view. There is also an All-Archives view that allows access to all <code>Thread Dumps</code> currently available in storage. 
      "
    %}
    The name of the <code>Thread Dump</code> when downloaded reflects the address of the <code>target</code> application. Thread dumps also support labels similar to Archived Recordings. See     <a href="#add-and-edit-recording-metadata-labels">
        Add and Edit Recording Metadata Labels</a>.
  </li>
</ol>