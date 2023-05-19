## [Navigate the Dashboard](#navigate-the-dashboard)
The *Dashboard* view is the first view you will see when you log into Cryostat. It provides a high-level overview of the state of your Cryostat instance and the target JVM applications it is monitoring.

{% include_relative _subsections/common/navigate-to-dashboard.md %}

### [Dashboard Cards](#dashboard-cards)

Dashboard cards are widgets that display information about your Cryostat instance and the target JVM applications it is monitoring. Let's walk through the available cards and how to add them to your dashboard.

{% include_relative _subsections/common/card-catalog.md %}

#### [Target JVM Details Card](#target-jvm-details-card)

<ol>
  <li>
    {% capture target-jvm-details-text %}
    The <i>Target JVM Details</i> card displays information about the target JVM application that is currently selected. There are two tabs that display different information:
    <ul>
        <li>
            <b>Details tab</b> - Displays information about the target JVM application, including:
            <ol>
                <li>
                    <code>Connection URL</code> - The JMX connection URL of the target JVM application.
                </li>
                <li>
                    <code>Alias</code> - The alias of the target JVM application.
                </li>
                <li>
                    <code>JVM ID</code> - The JVM ID of the target JVM application.
                </li>
                <li>
                    <code>Labels</code> - The labels of the target JVM application.
                </li>
                <li>
                    <code>Annotations</code> - The annotations of the target JVM application.
                </li>
                and more...
            </ol>
        </li>
        <li>
            <b>Resources tab</b> - Displays the resources associated with the target JVM application. There are two tables:
            <ul>
                <li>
                    <b>Owned Resources:</b> Resources that the JVM owns (i.e. <a href="#startstop-a-recording">Active Recordings</a>, <a href="#viewing-archived-recordings">Archived Recordings</a>, <a href="#download-edit-and-upload-a-customized-event-template">Event Templates</a> and <a href="#download-edit-and-upload-a-customized-event-template">Event Types</a>).
                </li>
                <li>
                    <b>Related Resources:</b> Resources that are tied to the JVM by <i>Match Expression</i> (i.e. <a href="#create-an-automated-rule">Automated Rules</a> and <a href="#store-credentials">Credentials</a>).
                </li>
            </ul>
        </li>
    </ul>
    {% endcapture %}
    {% include howto_step.html
      summary="Add the Target JVM Details Card"
      image-name="2.3.0/dashboard/targetjvmdetails-preview.png"
      caption="
        Click on the <i>Target JVM Details</i> card for a preview.
      "
      text=target-jvm-details-text
    %}
  </li>
  <li>
    <details>
        <summary>Finish card creation</summary>
              There are no extra steps in the creation wizard for this card. Click <code>Finish</code> to add the card to your dashboard.
        <div class="multi-image">
            <figure>
                <a href="{{ site.url }}/images/2.3.0/dashboard/targetjvmdetails-details.png" target="_blank">
                <img src="{{ site.url }}/images/2.3.0/dashboard/targetjvmdetails-details.png" alt="Details tab">
                </a>
                <figcaption><i>Details tab</i></figcaption>
            </figure>
            <figure>
                <a href="{{ site.url }}/images/2.3.0/dashboard/targetjvmdetails-resources.png" target="_blank">
                <img src="{{ site.url }}/images/2.3.0/dashboard/targetjvmdetails-resources.png" alt="Resources tab">
                </a>
                <figcaption><i>Resources tab</i></figcaption>
            </figure>
        </div>
    </details>
  </li>
</ol>

#### [Automated Analysis Card](#automated-analysis-card)

<ol>
  <li>
    {% capture automated-analysis-text %}
    <p>
    The <i>Automated Analysis</i> card allows users to view JMC <i>Automated Analysis</i> reports in a nicely formatted dashboard card. The card allows the user to create a special recording, and then automatically generates a <i>Automated Analysis</i> report. The report displays potential problems with your JVM, and provides suggestions on how to improve the performance and security of your selected JVM application. The card also contains a toolbar that allows you to refresh the report, delete the report, filter results, and change the view.
    </p>
    <h4>Gallery view</h4>
        <figure>
            <a href="{{ site.url }}/images/2.3.0/dashboard/automatedanalysis-gallery.png" target="_blank">
                <img src="{{ site.url }}/images/2.3.0/dashboard/automatedanalysis-gallery.png" alt="Gallery view">
            </a>
        </figure>
        <p>
            The Gallery view of the Automated Analysis Card displays a <i>Result</i>, a report summary, for each <i>Rule</i> that was triggered in the selected recording. In this view, each rule is listed in categories based on the event type. For example, the <code>Thrown Errors</code> rule and the <code>Thrown Exceptions</code> rule are part of the <code>exceptions</code> category, as seen in the figure above. By clicking on each rule, you can view more details about the rule and the <i>Result</i> that was generated.
        </p>
        <figure>
            <a href="{{ site.url }}/images/2.3.0/dashboard/automatedanalysis-result.png" target="_blank">
                <img src="{{ site.url }}/images/2.3.0/dashboard/automatedanalysis-result.png" alt="Automated Analysis Result">
            </a>
            <figcaption>
                The <code>Discouraged Management Agent Settings</code> rule result with a severity score of 25.0.
                A <i>Summary</i>, <i>Explanation</i>, and <i>Solution</i> can be seen in the <i>Result</i>.   
            </figcaption>
        </figure>
        <p>
            A <i>Result</i> has a severity score from 0 (no problem) to 100 (potentially severe problem).
        </p>
        <p>
            The <i>Result</i> will also show three text details, if applicable:
            <ul>
                <li>
                    <b>Summary:</b> A short summary of the problem.
                </li>
                <li>
                    <b>Explanation:</b> A detailed explanation of the problem.
                </li>
                <li>
                    <b>Solution:</b> A suggested solution to the problem.
                </li>
            </ul>
        </p>
    <h4>List view</h4>
        <figure>
            <a href="{{ site.url }}/images/2.3.0/dashboard/automatedanalysis-list.png" target="_blank">
                <img src="{{ site.url }}/images/2.3.0/dashboard/automatedanalysis-list.png" alt="List view">
            </a>
        </figure>
        <p>
            The List view of the Automated Analysis Card displays each <i>Result</i> in a listed table. The table can be sorted by clicking on the column headers. The <i>Result</i> will also show the Summary, Explanation, and Solution in the Description column.
        </p>
    <h4>Toolbar</h4>
        The toolbar allows you to filter results, change the view, refresh the report, and delete the report.

        You are able to filter:
         <ol>
            <li>
                <b>By severity:</b> You can filter by severity score by dragging the score slider or typing a score in the score input. The <i>Result</i> table will only show results with the score greater or equal to the selected filter score. Additionally, if there are <i>Critical</i> or <i>Warning</i> results, click the corresponding labels in the card header to only show those <i>Results</i>. Reset the filter by clicking on the buttons next to the <code>Reset</code> text.
            </li>
            <li>
                <b>By category:</b> You can filter by rule <i>Name</i> or <i>Topic</i> by clicking on the <i>Name</i> filter dropdown. Then select a filtered item by clicking the dropdown next to it. You may also type in this dropdown to search for a specific item. The <i>Result</i> table will only show results that match the selected filter.
            </li>
        </ol>
    {% endcapture %}
    {% include howto_step.html
      summary="Add the Automated Analysis Card"
      image-name="2.3.0/dashboard/automatedanalysis-preview.png"
      caption="
        Click on the <i>Automated Analysis</i> card for a preview.
      "
      text=automated-analysis-text
    %}
  </li>
  <li>
    {% capture configure-automated-analysis %}
    <p>
      In the next steps of the card creation, you can optionally provide advanced configuration. You can configure the settings of the special recording that is used to generate the report. The <code>Current Configuration</code> will be shown and can be edited by clicking the Pencil icon. By default, the recording uses a <code>Continuous</code> template, a <code>Maximum size</code> of <code>10MB</code>, and a <code>0</code> second <code>Maximum age</code> (meaning an unlimited recording duration).
    </p>
    <p>
        <b>Note:</b> It is possible that setting both an infinite maximum size and age will result in an <code>Out Of Memory</code> error during report generation.
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Configure the Automated Analysis Card"
      image-name="2.3.0/dashboard/automatedanalysis-wizard-step-1.png"
      caption="Advanced Configuration: Click <i>Next</i> to configure the card to display the <i>Automated Analysis Report</i> for a specific target JVM application or recording."
      text=configure-automated-analysis
    %}
    </li>
  <li>
    {% include howto_step.html
      summary="Finish card creation"
      image-name="2.3.0/dashboard/automatedanalysis-errorview.png"
      caption="The card will be added to the dashboard with an error view."
      text="After clicking <i>Finish</i>, the card will be added to the dashboard with an error view. This is because the card has not yet detected a special <i>Automated Analysis</i> recording to source reports from."
    %}
  </li>
  <li>
      {% include howto_step.html
      summary="Click <i>Create Recording</i>"
      image-name="2.3.0/dashboard/automatedanalysis-success.png"
      caption="The <i>Automated Analysis</i> card displayed with a successful report."
      text="After clicking <i>Create Recording</i>, the card should be populated with report data containing the results of the <i>Automated Analysis</i> report."
    %}
    </li>
</ol>

#### [MBean Metrics Card](#mbean-metrics-card)

### [Configuring the Dashboard](#configuring-the-dashboard)
#### [Manage Cards](#manage-cards)

### [Dashboard Layouts and Templates](#dashboard-layouts-and-templates)
#### [Add Dashboard Layout](#modify-card-configuration)
#### [Switch Dashboard Layouts](#switch-dashboard-layouts)
