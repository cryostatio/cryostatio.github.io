<<<<<<< HEAD
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
=======
## [View and Download Automated Analysis for a Recording](#view-and-download-automated-analysis-for-a-recording)
**Cryostat** integrates the same `Automated Analysis` reports that you would
find in [`JDK Mission Control`](https://github.com/openjdk/jmc). The
`JMC` rules engine analyzes your `Recording` and looks for common problems
and assigns a severity score from 0 (no problem) to 100 (potentially
severe problem). Results with score 0 are hidden from the report unless
you select the _Show OK Results_ checkbox. More details on each
result can be found by clicking on the _+_ symbol to the right of
the rule name. These details often include suggestions on how to fix
the problem. **Cryostat** also allows you to download the report `HTML` file
for offline use.

**Cryostat** also provides an *Automated Analysis Card* that is able to display the same information in a more user-friendly format, with more tools and control over the data you see. The card is available for use in the *Dashboard*. Read the section on the [*Automated Analysis Card*](#automated-analysis-card) for more information.
>>>>>>> 17d0854 (done (first commit))

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
        If you do not have any `Recordings` present in the *Active Recordings*
        view, follow
        <a href='#startstop-a-recording'><i>Start/Stop</i> a <code>Recording</code></a>
        to create one, or select a different target application.
        You may also select an Archived Recording for <code>Automated Analysis</code>.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Expand the <code>Recording</code>"
      image-name="2.3.0/automated-analysis-1.png"
      caption="
        Expand the <code>Recording</code> with the <i>Chevron</i> to the left of the <code>Recording</code>
        name. The <code>Automated Analysis</code> report will appear below the <code>Recording</code>.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View Details and Suggestions for Results"
      image-name="2.3.0/automated-analysis-2.png"
      caption="
        Click on each result to view
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
          View the report on its own without connecting to <b>Cryostat</b>.
          Check <i>Show OK Results</i> to include results where the rules
          engine found no issues in the <code>Recording</code>.
        </figcaption>
      </figure>
      <figure>
        <a href="{{ site.url }}/images/2.3.0/automated-analysis-5.png" target="_blank">
          <img src="{{ site.url }}/images/2.3.0/automated-analysis-5.png">
        </a>
        <figcaption>
          To download the <code>HTML</code> <i>Automated Analysis</i> report to local disk, right click
          the page and select <i>Save Page As...</i>. Alternatively, press <kbd>Ctrl</kbd>+<kbd>S</kbd>
          on Windows/Linux, or <kbd>⌘</kbd>+<kbd>S</kbd> on macOS.
        </figcaption>
      </figure>
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Download the Report"
      image-name="2.3.0/automated-analysis-3.png"
      caption="
        To download the <code>Automated Analysis</code> report for offline viewing,
        select <i>View Report ...</i> from the <code>Recording's</code> overflow
        menu.
      "
      text=download-report-text
    %}
  </li>
</ol>
