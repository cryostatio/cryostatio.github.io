## [View Automated Analysis for a Recording](#view-automated-analysis-for-a-recording)
**Cryostat** integrates the same `Automated Analysis` reports that you would
find in [JDK Mission Control ("JMC")](https://github.com/openjdk/jmc). The
**JMC** rules engine analyzes your `Recording` and looks for common problems,
assigning a severity score from 0 (no problem) to 100 (potentially
severe problem) to each potential problem type.

**Cryostat** also provides an `Automated Analysis Card` that is able to display
the same information in a more flexible format, with more tools and control
over the data you see and the ability to resize the view. The `Card` is available
for use in the *Dashboard*. Read the section on the
[`Automated Analysis Card`](#automated-analysis-card) for more information.

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
        If you do not have any <code>Recordings</code> present in the <i>Active Recordings</i>
        view, follow
        <a href='#startstop-a-recording'>Start/Stop a Recording</a>
        to create one, or select a different <code>target</code> application.
        You may also select an <code>Archived Recording</code> for <code>Automated Analysis</code>.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Expand the <code>Recording</code>"
      image-name="4.0.0/automated-analysis-1.png"
      caption="
        Expand the <code>Recording</code> with the <i>Chevron</i> to the left of the <code>Recording</code>
        name. The <code>Automated Analysis</code> report will appear below the <code>Recording</code>.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View Details and Suggestions for Results"
      image-name="4.0.0/automated-analysis-2.png"
      caption="
        Click on each result to view
        specifics on what the result means and possible suggestions to fix
        the potential problem.
      "
    %}
  </li>
</ol>
