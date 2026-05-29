## [View a Recording in JFR Analytics](#view-a-recording-in-jfr-analytics)
**Cryostat** integrates [`jfr-analytics`](https://github.com/moditect/jfr-analytics)
and enables clients to perform **SQL** queries against `Archived Recordings` to
inspect their contents. Select the _View in Analytics ..._ menu action item from
the **Archives** view to jump to the `Flight Recorder > Analyze > Analytics`
view with the selected recording pre-filled.

This feature enables users to analyze `Archived Recording` data with in-depth and
highly specific queries to suit their own individual use cases and needs.

When an `Archived Recording` is loaded for analysis, **Cryostat** retains a local
copy of that data for some time to avoid re-loading the data from object storage
for each SQL query. This reduces the request latency of follow-up queries and may
reduce the operational costs of object storage requests and data transfers if
using external commercial object storage.

<ol>
  <li>
    {% include howto_step.html
      summary="Select <i>View in Analytics...</i>"
      image-name="4.2.0/archives-actions-1.png"
      caption="
        Select <i>View in Analytics...</i> from the <code>Archived Recording's</code>
        overflow menu.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Choose a sample query or enter your own query"
      image-name="4.2.0/view-in-analytics-1.png"
      caption="
        The upper text input area allows you to choose from a supplied list of example
        queries or to write your own free-form SQL queries. The text input provides SQL
        syntax highlighting. When you are ready to execute your query, click the
        triangular 'Play' icon button.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Test the <code>'tables'</code> sample meta-query"
      image-name="4.2.0/view-in-analytics-2.png"
      caption="
        The first sample meta-query is simply 'tables'. This meta-query lists all of the
        tables present in the database view of the recording. Each Flight Recorder event
        type is represented as a table.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Test the <code>'columns $TABLE_NAME'</code> sample meta-query"
      image-name="4.2.0/view-in-analytics-3.png"
      caption="
        The second sample meta-query is 'columns $TABLE_NAME', where `$TABLE_NAME` is
        a placeholder that you must replace with the name of a table you are interested
        in. The query result is the list of column names on that table, or in other words
        the Flight Recorder event attribute names that can be queried.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Test a complex sample query or write your own"
      image-name="4.2.0/view-in-analytics-4.png"
      caption="
        Select another sample query which performs a more complex operation against
        the recording's database view, or write your own SQL query, and execute it
        to view the result.
      "
    %}
  </li>
</ol>
