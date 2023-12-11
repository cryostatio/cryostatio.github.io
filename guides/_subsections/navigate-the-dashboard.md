## [Navigate the Dashboard](#navigate-the-dashboard)
The *Dashboard* is the first view you will see when you log into Cryostat. It provides a high-level overview of the state of your Cryostat instance and the target JVM applications it is monitoring.

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
      summary="Add the <i>Target JVM Details</i> card"
      image-name="2.4.0/dashboard/targetjvmdetails-preview.png"
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
                <a href="{{ site.url }}/images/2.4.0/dashboard/targetjvmdetails-details.png" target="_blank">
                <img src="{{ site.url }}/images/2.4.0/dashboard/targetjvmdetails-details.png" alt="Details tab">
                </a>
                <figcaption><i>Details tab</i></figcaption>
            </figure>
            <figure>
                <a href="{{ site.url }}/images/2.4.0/dashboard/targetjvmdetails-resources.png" target="_blank">
                <img src="{{ site.url }}/images/2.4.0/dashboard/targetjvmdetails-resources.png" alt="Resources tab">
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
            <a href="{{ site.url }}/images/2.4.0/dashboard/automatedanalysis-gallery.png" target="_blank">
                <img src="{{ site.url }}/images/2.4.0/dashboard/automatedanalysis-gallery.png" alt="Gallery view">
            </a>
        </figure>
        <p>
            The Gallery view of the Automated Analysis Card displays a <i>Result</i>, a report summary, for each <i>Rule</i> that was triggered in the selected recording. In this view, each rule is listed in categories based on the event type. For example, the <code>Thrown Errors</code> rule and the <code>Thrown Exceptions</code> rule are part of the <code>exceptions</code> category, as seen in the figure above. By clicking on each rule, you can view more details about the rule and the <i>Result</i> that was generated.
        </p>
        <figure>
            <a href="{{ site.url }}/images/2.4.0/dashboard/automatedanalysis-result.png" target="_blank">
                <img src="{{ site.url }}/images/2.4.0/dashboard/automatedanalysis-result.png" alt="Automated Analysis Result">
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
            <a href="{{ site.url }}/images/2.4.0/dashboard/automatedanalysis-list.png" target="_blank">
                <img src="{{ site.url }}/images/2.4.0/dashboard/automatedanalysis-list.png" alt="List view">
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
      summary="Add the <i>Automated Analysis</i> card"
      image-name="2.4.0/dashboard/automatedanalysis-preview.png"
      caption="
        Click on the <i>Automated Analysis</i> card for a preview.
      "
      text=automated-analysis-text
    %}
  </li>
  <li>
    {% capture configure-automated-analysis %}
    <p>
      In the next steps of the card creation, you can optionally provide advanced configuration. You can configure the settings of the special recording that is used to generate the report. The <i>Current Configuration</i> will be shown and can be edited by clicking the Pencil icon. By default, the recording uses a <code>Continuous</code> template, a <code>Maximum size</code> of <code>10MB</code>, and a <code>0</code> second <code>Maximum age</code> (meaning an unlimited recording duration).
    </p>
    <p>
        <b>Note:</b> It is possible that setting both an infinite maximum size and age will result in an <code>Out Of Memory</code> error during report generation.
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Configure the <i>Automated Analysis</i> card"
      image-name="2.4.0/dashboard/automatedanalysis-configuration.png"
      caption="Click <i>Next</i> to optionally provide advanced configuration."
      text=configure-automated-analysis
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Finish card creation"
      image-name="2.4.0/dashboard/automatedanalysis-errorview.png"
      caption="The card will be added to the dashboard with an error view."
      text="After clicking <i>Finish</i>, the card will be added to the dashboard with an error view. This is because the card has not yet detected a special <i>Automated Analysis</i> recording to source reports from."
    %}
  </li>
  <li>
      {% include howto_step.html
      summary="Click <i>Create Recording</i>"
      image-name="2.4.0/dashboard/automatedanalysis-success.png"
      caption="The <i>Automated Analysis</i> card displayed with a successful report."
      text="After clicking <i>Create Recording</i>, the card should be populated with report data containing the results of the <i>Automated Analysis</i> report."
    %}
    </li>
</ol>

#### [MBean Metrics Chart Card](#mbean-metrics-chart-card)

<ol>
  <li>
    {% capture mbean-metrics-chart-text %}
    <p>
        The <i>MBean Metrics Chart</i> card displays performance metrics about the target JVM through remote access to supported Java MXBeans interfaces of the JVM, including Thread, Runtime, OperatingSystem, and Memory MXBeans.
    </p>
    <p>
        Cryostat gathers this data and displays them in various charts. You can customize each card by going through the card creation wizard. The wizard will guide you through the process of selecting the metrics you want to display, how you want to display them, and other various configuration options. Some examples of Performance Metrics that can be displayed are:
    </p>
    <ul>
        <li>Process CPU Load</li>
        <li>System Load Average</li>
        <li>Heap Memory Usage</li>
        <li>...</li>
    </ul>
    {% endcapture %}
    {% include howto_step.html
      summary="Add the <i>MBean Metrics Chart</i> card"
      image-name="2.4.0/dashboard/mbeanmetrics-preview.png"
      caption="Click on the <i>MBean Metrics Chart</i> card for a preview."
      text=mbean-metrics-chart-text
    %}
  </li>
    <li>
    {% capture configure-mbean-metrics-chart %}
    <p>
      In the next steps of the card creation, you can configure the details of the chart card. 
    </p>
    <p>
      Configure the metric data by clicking the <i>Performance Metric</i> dropdown and selecting a metric. You can also configure the <i>Data Window</i> to display a specific time range of data, the <i>Refresh Period</i> to control how often the chart is updated, and the <i>Color Theme</i> to change the chart metric color.
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Configure the <i>MBean Metrics Chart</i> card"
      image-name="2.4.0/dashboard/mbeanmetrics-configuration.png"
      caption="Click <i>Next</i> to provide card configuration."
      text=configure-mbean-metrics-chart
    %}
  </li>
  <li>
    {% capture mbean-metrics-chart-finish %}
    <p>
        After clicking <i>Finish</i>, the card will be added to the dashboard. You can click the refresh button "↻" on the top right of the card at any time to reload the metrics.
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Finish card creation"
      image-name="2.4.0/dashboard/mbeanmetrics.png"
      caption="The <i>MBean Metrics Chart</i> card displayed with the <i>Process CPU Load</i> metric."
      text=mbean-metrics-chart-finish
    %}
  </li>
</ol>

### [Configuring the Dashboard](#configuring-the-dashboard)
The <i>Dashboard</i> is highly customizable and can be configured to display the cards you want to see. You can customize the layout of the cards on the dashboard by moving, resizing, and removing cards.

#### [Moving, resizing, and removing cards](#moving-and-resizing-cards)
<ol>
    <li>
        {% include howto_step.html
        summary="Add a card to the <i>Dashboard</i>"
        image-name="2.4.0/dashboard/targetjvmdetails-preview.png"
        caption="Open the card catalog by clicking the Catalog icon on the Dashboard toolbar."
        text="Let's add the <i>Target JVM Details</i> card."
        %}
    </li>
    <li>
        {% include howto_step.html
        summary="Resize the card"
        image-name="2.4.0/dashboard/dashboard-resize.png"
        caption="Click and drag the right edge of the card to resize it."
        %}
    </li>
    <li>
        {% include howto_step.html
        summary="Add another card to the <i>Dashboard</i>"
        image-name="2.4.0/dashboard/mbeanmetrics-preview.png"
        caption="Open the card catalog by clicking the Catalog icon on the Dashboard toolbar."
        text="Let's add the <i>MBean Metrics Chart</i> card this time."
        %}
    </li>
    <li>
        {% include howto_step.html
        summary="Rearrange cards"
        image-name="2.4.0/dashboard/dashboard-rearrange.png"
        caption="Click and drag the <i>Target JVM Details</i> card's header on top or to the right of the <i>MBeans Metrics Chart</i> card to swap their positions."
        %}
    </li>
    <li>
        {% capture remove-card-text %}
            <p>
                Each card header contains a kebab icon that opens a menu of card actions. The actions menu contains the following options:
                <ul>
                    <li>
                        <b>View</b> - Opens the card in fullscreen mode.
                    </li>
                    <li>
                        <b>Remove</b> - Removes the card from the dashboard.
                    </li>
                    <li>
                        <b>Reset Size</b> - Resets the card to its default size.
                    </li>
                </ul>
            </p>
            <figure>
                <a href="{{ site.url }}/images/2.4.0/dashboard/dashboard-cardremoved.png" target="_blank">
                    <img src="{{ site.url }}/images/2.4.0/dashboard/dashboard-cardremoved.png" alt="{{ Removed card }}">
                </a>
                <figcaption>Click <i>Remove</i> to remove the card.</figcaption>
            </figure>
        {% endcapture %}
        {% include howto_step.html
        summary="Remove cards"
        image-name="2.4.0/dashboard/dashboard-cardkebab.png"
        caption="Click the Kebab icon on the card header to open the card actions menu."
        text=remove-card-text
        %}
    </li>
</ol>

### [Dashboard Layouts and Templates](#dashboard-layouts-and-templates)
*Dashboard Layouts* are a way to organize your dashboard cards into different views. You can create multiple layouts and switch between them to view different cards. Favorite, rename, and delete layouts to customize your dashboard.

By default, the `Default` layout is created for you. This layout contains the cards three *MBean Metrics Chart* cards. You can modify this layout's card configuration, but you cannot rename or delete it.

*Layout Templates* save your layouts for later use. You can create a template from a layout, and then use that template to create a new layout with the same cards. You can also import and export templates to share them with other Cryostat users.

#### [Create a new Dashboard Layout](#create-a-new-dashboard-layout)
<ol>
    <li>
        {% include_relative _subsections/common/layout-selector.md %}
    </li>
    <li>
        {% include howto_step.html
        summary="Click <i>New Layout</i>"
        image-name="2.4.0/dashboard/dashboard-blanklayout.png"
        text="Clicking <i>New Layout</i> will create a new blank layout and switch the dashboard view to the new layout. The layout should be called something like <code>Custom1</code>."
        %}
    </li>
    <li>
        {% include howto_step.html
        summary="<i>(Optional)</i> Rename layouts"
        image-name="2.4.0/dashboard/dashboard-renamelayout.png"
        caption="Click the pencil button to rename the currently selected layout."
        text="You are able to rename layouts by clicking the pencil button next to the layout selector. This will rename the currently selected layout. You can also rename layouts within the layout selector dropdown itself."
        %}
    </li>
    <li>
        {% include howto_step.html
        summary="<i>(Optional)</i> Delete layouts"
        image-name="2.4.0/dashboard/dashboard-deletelayout.png"
        caption="Click 🗑️ <i>Delete</i> to delete the currently selected layout."
        text="Deletion is similar to renaming. Click the trash can icon with the text <i>Delete</i> next to the layout selector to delete the currently selected layout. You can also delete layouts within the layout selector dropdown itself."
        %}
    </li>
</ol>

#### [Set a layout as a template](#set-a-layout-as-a-template)
<ol>
    <li>
        {% include howto_step.html
        summary="Save a layout as a template"
        image-name="2.4.0/dashboard/dashboard-layout-setastemplate.png"
        caption='Click more options "⋮" on the dashboard toolbar, then click <i>Set as template</i> to set the desired layout as a template.'
        text="The layout template will be saved as a <i>User-submitted</i> template in the template picker."
        %}
    </li>
</ol>

#### [Create a new Dashboard Layout from a template](#create-a-new-dashboard-layout-from-a-template)

<ol>
    <li>
        {% include_relative _subsections/common/layout-selector.md %}
    </li>
    <li>
        {% include howto_step.html
        summary="Select <i>Choose Template</i>"
        image-name="2.4.0/dashboard/dashboard-layoutselector-options.png"
        text="Click the expandable menu on <i>New Layout</i> button and select <i>Choose Template</i>. This will open the template picker."
        %}
    </li>
    <li>
        {% capture template-picker-guide-text %}
        <p>
            The template picker displays all the available templates. Templates are categorized into 3 groups.
            <ol>
                <li>
                    <b>Suggested:</b> Templates that are suggested for you based on recent activity.
                </li>
                <li>
                    <b>Cryostat:</b> Templates that come with Cryostat.
                </li>
                <li>
                    <b>User-submitted</b>: Templates that you have created or imported.
                </li>
            </ol>
            <p>     
            Additionally, you can search for templates by typing in the search bar or filter templates by category. You can also upload templates directly here by clicking <i>Upload</i>.
            </p>
            <p>
            Select a template by clicking on it.
            </p>
        </p>
        {% endcapture %}
        {% include howto_step.html
        summary="Choose a template"
        image-name="2.4.0/dashboard/dashboard-templatepicker.png"
        caption="Clicking a template will open a preview where you can view the template's cards."
        text=template-picker-guide-text
        %}
    </li>
    <li>
        {% include howto_step.html
        summary="Enter a name for the new layout"
        image-name="2.4.0/dashboard/dashboard-templatepicker-name.png"
        text="A layout name must be entered before the <i>Create</i> button is enabled. The name must be alphanumeric, can only contain underscores, dashes, and periods, and must be 20 characters or less."
        %}
    </li>
    <li>
        {% include howto_step.html
        summary="Click <i>Create</i>"
        image-name="2.4.0/dashboard/dashboard-layouttemplate.png"
        caption="The new layout will be created and the dashboard view will switch to the new layout with the template applied."
        %}
    </li>
</ol>
