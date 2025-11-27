## [Download an Active or Archived Recording](#download-an-active-or-archived-recording)
**Cryostat** provides some basic capabilities for analysis of **Flight Recording** data
in-cluster. However, the core analysis workflow is to collect **JFR** files from
`target` applications and copy them to local developer or admin workstations, then
use tools such as [`JDK Mission Control`](https://github.com/openjdk/jmc),
[`Visual VM`](https://visualvm.github.io/), [`binjr`](https://github.com/binjr/binjr),
or [`jfr`](https://dev.java/learn/jvm/jfr/tools/) for the heavy lifting on your workstation.

<ol>
  <li>
    {% include_relative _subsections/common/select-target-application.md %}
  </li>
  <li>
    {% include_relative _subsections/common/navigate-to-recordings.md %}
  </li>
  <li>
    {% include_relative _subsections/common/select-a-recording.md
        select-a-recording-caption="
        Determine the <code>Recording</code> you wish to download to your local workstation.
        This may be either an <code>Active</code> or <code>Archived Recording</code>.
        Select the appropriate tab in the <i>Recordings</i> view. No actual action
        needs to be taken at this step.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Download the <code>Recording</code>"
      image-name="4.0.0/download-an-active-or-archived-recording-1.png"
      caption="
        Click the action overflow \"&#65049;\" <i>three-dot</i> menu on the right side of the
        recording entry in the table, then click <i>Download Recording</i>.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Choose what to do with the <code>Recording</code> File"
      image-name="4.0.0/download-an-active-or-archived-recording-2.png"
      caption="
        Your browser will present you with its standard file-save dialog for both
        the <code>Archived Recording</code>, and a <code>.metadata.json</code> file containing any
        <code>Metadata Labels</code> that were attached. It may take some time for these dialogs
        to appear. Once it does, you can choose to open the <code>Recording</code> file directly
        in an analysis tool, or to save the <code>Recording</code> to disk for later analysis.
      "
    %}
  </li>
</ol>
