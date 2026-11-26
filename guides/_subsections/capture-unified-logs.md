## [Capture Unified Logs](#capture-unified-logs)

**Cryostat** can configure the JVM *Unified Logging* framework (<code>-Xlog</code>) dynamically and pull log files into
its archives. This requires that the *Target* application is connected to **Cryostat** via the [**Cryostat Agent**](/docs/#using-the-cryostat-agent).
This can be used to capture *Garbage Collector* (<code>GC</code>) logs, for example, so that they can then be downloaded
to your workstation and analyzed with various other scripts and tools available in the Java ecosystem. This is a
[beta-level feature](#configure-feature-level) which requires opt-in before it is visible in the UI.

<ol>
  <li>
    {% capture capture-unified-logs-text %}
    <p>
      The <i>Diagnostics</i> <code>card</code> and <i>Diagnostics/Capture</i> page
      allows you to perform diagnostic operations on a <code>target</code> <b>JVM</b> through remote access to supported <b>Java MXBeans</b>.
    </p>
    <p>
      Currently <b>Cryostat</b> supports capturing Unified Logs, invoking garbage collection, capturing Thread Dumps, and capturing Heap Dumps on <code>target</code> <b>JVMs</b>.
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Navigate to the <i>Diagnostics/Capture</i> Page"
      image-name="4.3.0/capture-diagnostics-page-beta.png"
      caption="Click on <i>Diagnostics/Capture</i> on the sidebar."
      text=capture-unified-logs-text
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Configure <code>Unified Logs</code>"
      image-name="4.3.0/configure-unified-logs.png"
      caption="
        Click the <code>Reconfigure</code> button to configure or reconfigure the <code>Unified Logging</code> framework in the target JVM. You can choose which events to log,
        which data decorators to include, and various other logging parameters. Scroll down to the end of the modal and <code>Save</code> your selection.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Navigate to <code>Unified Logs Archives</code>"
      image-name="4.3.0/archived-unified-logs-empty.png"
      caption="
        Click the list icon button on the <i>Diagnostics</i> <code>card</code> or directly navigate to <code>Diagnostics &gt; Analyze &gt; Unified Log Archives</code>
        to view the table of collected log files. This will initially be empty.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Pull <code>Unified Logs</code>"
      image-name="4.3.0/pull-unified-logs.png"
      caption="
        Click the pull button in the table toolbar (arrow pointing down and to the right) to request <bold>Cryostat</bold> to pull the latest <code>Unified Log</code>
        content to an archived file. If there is no remote content available you will see a notification indicating so, otherwise the table will update with the new
        file's name. This file can be downloaded to your local workstation for analysis.
      "
    %}
  </li>
</ol>
