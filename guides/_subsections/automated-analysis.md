## [View Automated Analysis for a Recording](#view-automated-analysis-for-a-recording)
Cryostat integrates the same automated analysis reports that you would
find in [JDK Mission Control ("JMC")](https://github.com/openjdk/jmc). The
JMC rules engine analyzes your recording and looks for common problems,
assigning a severity score from 0 (no problem) to 100 (potentially
severe problem) to each potential problem type.

Cryostat also provides an *Automated Analysis Card* that is able to display
the same information in a more flexible format, with more tools and control
over the data you see and the ability to resize the view. The card is available
for use in the *Dashboard*. Read the section on the
[Automated Analysis Card](#automated-analysis-card) for more information.

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
        If you do not have any recordings present in the Active Recordings
        view, follow
        <a href='#startstop-a-recording'>Start/Stop a Recording</a>
        to create one, or select a different target application.
        You may also select an archived recording for automated analysis.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Expand the recording"
      image-name="2.3.0/automated-analysis-1.png"
      caption="
        Expand the recording with the chevron to the left of the recording
        name. The automated analysis report will appear below the recording.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View details and suggestions for results"
      image-name="2.3.0/automated-analysis-2.png"
      caption="
        Click the <i>+</i> button on the right side of each result to view
        specifics on what the result means and possible suggestions to fix
        the potential problem.
      "
    %}
  </li>
  <li>
    {% capture download-report-text %}
    <p>
      <figure>
        <a href="{{ site.url }}/images/2.3.0/automated-analysis-4.png" target="_blank">
          <img src="{{ site.url }}/images/2.3.0/automated-analysis-4.png">
        </a>
        <figcaption>
          View the report on its own without connecting to Cryostat.
          Check <i>Show OK Results</i> to include results where the rules
          engine found no issues in the recording.
        </figcaption>
      </figure>
      <figure>
        <a href="{{ site.url }}/images/2.3.0/automated-analysis-5.png" target="_blank">
          <img src="{{ site.url }}/images/2.3.0/automated-analysis-5.png">
        </a>
        <figcaption>
          To download the HTML <i>Automated Analysis</i> report to local disk, right click 
          the page and select <i>Save Page As...</i>. Alternatively, press <kbd>Ctrl</kbd>+<kbd>S</kbd> 
          on Windows/Linux, or <kbd>⌘</kbd>+<kbd>S</kbd> on macOS.
        </figcaption>
      </figure>
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Download the report"
      image-name="2.3.0/automated-analysis-3.png"
      caption="
        To download the automated analysis report for offline viewing,
        select <i>View Report ...</i> from the recording's overflow
        menu.
      "
      text=download-report-text
    %}
  </li>
</ol>
