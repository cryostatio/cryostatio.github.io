## [View Automated Analysis for a Target](#view-automated-analysis-for-a-target)
**Cryostat** integrates the same `Automated Analysis` reports that you would
find in [JDK Mission Control ("JMC")](https://github.com/openjdk/jmc). The
**JMC** rules engine analyzes your `Recording` and looks for common problems,
assigning a severity score from 0 (no problem) to 100 (potentially
severe problem) to each potential problem type.

**Cryostat** also provides an `Automated Analysis Card` that is able to display
the same information. The `Card` is available for use in the *Dashboard*.
Read the section on the [`Automated Analysis Card`](#automated-analysis-card) for more information.

<ol>
  <li>
    {% include_relative _subsections/common/select-target-application.md %}
  </li>
  <li>
    {% include_relative _subsections/common/navigate-to-recordings.md %}
  </li>
  <li>
    {% include howto_step.html
      summary="Click the <code>Analyze</code> toolbar button"
      image-name="4.1.0/automated-analysis-1.png"
      caption="
        The analysis drawer will appear from the side. If Cryostat has already analyzed recording data from
        this target recently then content will appear in the drawer. If there are no <code>Active Recordings</code>
        to source data from, click the <code>Create a Recording</code> call to action to be guided through
        <code>Recording</code> creation, then return back to this view.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Request analysis"
      image-name="4.1.0/automated-analysis-2.png"
      caption="
        Click the analysis process button in the corner of the drawer panel.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View Details and Suggestions for Results"
      image-name="4.1.0/automated-analysis-3.png"
      caption="
        Click on each result to view specifics on what the result means and possible suggestions to fix
        the potential problem.
      "
    %}
  </li>
  <li>
    <p>
    {% include howto_step.html
      summary="View analysis of an archived recording"
      image-name="4.1.0/automated-analysis-4.png"
      caption="
        Automated analysis results for individual <code>Archived Recordings</code> are also available.
      "
      text="
        Follow <a href='#viewing-archived-recordings'>the <code>Archived Recordings</code></a>
        guide to find an <code>Archived Recording</code> you are interested in. Click the chevron icon
        beside a <code>recording</code> item to expand the row and view analysis results.
      "
    %}
    </p>
  </li>
</ol>
