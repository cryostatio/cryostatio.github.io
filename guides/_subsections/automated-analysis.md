## [View and Download Automated Analysis for a Recording](#automated-analysis)
Cryostat integrates the same automated analysis reports that you would
find in [JDK Mission Control](https://github.com/openjdk/jmc). The
JMC rules engine analyzes your recording and looks for common problems
and assigns a severity score from 0 (no problem) to 100 (potentially
severe problem). Results with score 0 are hidden from the report unless
you select the _Show OK Results_ checkbox. More details on each
result can be found by clicking on the _+_ symbol to the right of
the rule name. These details often include suggestions on how to fix
the problem. Cryostat also allows you to download the report HTML file
for offline use.

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
      image-name="2.2.0/automated-analysis-1.png"
      caption="
        Expand the recording with the chevron to the left of the recording
        name. The automated analysis report will appear below the recording.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View details and suggestions for results"
      image-name="2.2.0/automated-analysis-2.png"
      caption="
        Click the <i>+</i> button on the right side of each result to view
        specifics on what the result means and possible suggestions to fix
        the potential problem.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Select <i>Download Report</i>"
      image-name="2.2.0/automated-analysis-3.png"
      caption="
        To download the automated analysis report for offline viewing,
        select <i>Download Report</i> from the recording's overflow
        menu.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Open the downloaded report in your browser"
      image-name="2.2.0/automated-analysis-4.png"
      caption="
        View the report on its own without connecting to Cryostat.
        Check <i>Show OK Results</i> to include results where the rules
        engine found no issues in the recording.
      "
    %}
  </li>
</ol>
