## [Download an Active or Archived Recording](#download-an-active-or-archived-recording)
Cryostat provides some basic capabilities for analysis of Flight Recording data
in-cluster. However, the core analysis workflow is to collect JFR files from
target applications and copy them to local developer or admin workstations, then
use [JDK Mission Control](https://github.com/openjdk/jmc) for the heavy lifting.

<ol>
  <li>
    {% include_relative _subsections/common/select-target-application.md %}
  </li>
  <li>
    {% include_relative _subsections/common/navigate-to-recordings.md %}
  </li>
  <li>
    {% include howto_step.html
      summary="Select a recording"
      image-name="download-a-recording-1.png"
      caption="
        Determine the recording you wish to download to your local workstation.
        This may be either an <i>Active</i> or <i>Archived</i> recording.
        Select the appropriate tab in the Recordings view. No actual action
        needs to be taken at this step.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Download the recording"
      image-name="download-a-recording-2.png"
      caption="
        Click the action overflow three-dot menu on the right side of the
        recording entry in the table, then click <i>Download Recording</i>.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Choose what to do with the recording file"
      image-name="download-a-recording-3.png"
      caption="
        Your browser will present you with its standard file-save dialog. It
        may take some time for this to appear. Once it does, you can choose to
        open the file directly in <i>JDK Mission Control</i>, or (recommended)
        to save the file to disk.
      "
    %}
  </li>
</ol>
