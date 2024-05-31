## [Navigate the Dashboard](#navigate-the-dashboard)
The *Dashboard* is the first view you will see when you log into **Cryostat**. It provides a high-level overview of the state of your **Cryostat** instance and the `target` **JVM** applications it is monitoring.

{% include_relative _subsections/common/navigate-to-dashboard.md %}

### [Dashboard Cards](#dashboard-cards)

`Dashboard cards` are widgets that display information about your **Cryostat** instance and the `target` **JVM** applications it is monitoring. Let's walk through the available `cards` and how to add them to your *Dashboard*.

{% include_relative _subsections/common/card-catalog.md %}

#### [Target JVM Details Card](#target-jvm-details-card)

<ol>
  <li>
    {% capture target-jvm-details-text %}
    The <i>Target JVM Details</i> <code>card</code> displays information about the <code>target</code> <b>JVM</b> application that is currently selected. There are two tabs that display different information:
    <ul>
        <li>
            <i>Details Tab</i> - Displays information about the <code>target</code> <b>JVM</b> application, including:
            <ol>
                <li>
                    <code>Connection URL</code> - The <b>JMX</b> connection URL of the <code>target</code> <b>JVM</b> application.
                </li>
                <li>
                    <code>Alias</code> - The alias of the <code>target</code> <b>JVM</b> application.
                </li>
                <li>
                    <code>JVM ID</code> - The JVM ID of the <code>target</code> <b>JVM</b> application.
                </li>
                <li>
                    <code>Labels</code> - The labels of the <code>target</code> <b>JVM</b> application.
                </li>
                <li>
                    <code>Annotations</code> - The annotations of the <code>target</code> <b>JVM</b> application.
                </li>
                and more...
            </ol>
        </li>
        <li>
            <i>Resources Tab</i> - Displays the resources associated with the <code>target</code> <b>JVM</b> application. There are two tables:
            <ul>
                <li>
                    <code>Owned Resources:</code> Resources that the <b>JVM</b> owns (i.e. <a href="#startstop-a-recording">Active Recordings</a>, <a href="#viewing-archived-recordings">Archived Recordings</a>, <a href="#download-edit-and-upload-a-customized-event-template">Event Templates</a> and <a href="#download-edit-and-upload-a-customized-event-template">Event Types</a>).
                </li>
                <li>
                    <code>Related Resources:</code> Resources that are tied to the <b>JVM</b> by <i><code>Match Expression</code></i> (i.e. <a href="#create-an-automated-rule">Automated Rules</a> and <a href="#store-credentials">Credentials</a>).
                </li>
            </ul>
        </li>
    </ul>
    {% endcapture %}
    {% include howto_step.html
      summary="Add the <i>Target JVM Details</i> <code>Card</code>"
      image-name="3.0.0/dashboard/targetjvmdetails-preview.png"
      caption="
        Click on the <i>Target JVM Details</i> <code>card</code> for a preview.
      "
      text=target-jvm-details-text
    %}
  </li>
  <li>
    <details>
        <summary>Finish <code>Card</code> Creation</summary>
              There are no extra steps in the creation wizard for this <code>card</code>. Click <code>Finish</code> to add the <code>card</code> to your dashboard.
        <div class="multi-image">
            <figure>
                <a href="{{ site.url }}/images/3.0.0/dashboard/targetjvmdetails-details.png" target="_blank">
                <img src="{{ site.url }}/images/3.0.0/dashboard/targetjvmdetails-details.png" alt="Details tab">
                </a>
                <figcaption><i>Details Tab</i></figcaption>
            </figure>
            <figure>
                <a href="{{ site.url }}/images/3.0.0/dashboard/targetjvmdetails-resources.png" target="_blank">
                <img src="{{ site.url }}/images/3.0.0/dashboard/targetjvmdetails-resources.png" alt="Resources tab">
                </a>
                <figcaption><i>Resources Tab</i></figcaption>
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
    The <i>Automated Analysis</i> <code>card</code> allows users to view <b>JMC</b> <i>Automated Analysis</i> reports in a nicely formatted dashboard <code>card</code>. The <code>card</code> allows the user to create a special <code>Recording</code>, and then automatically generates an <i>Automated Analysis</i> report. The report displays potential problems with your <b>JVM</b>, and provides suggestions on how to improve the performance and security of your selected <b>JVM</b> application. The <code>card</code> also contains a toolbar that allows you to refresh the report, delete the report, filter results, and change the view.
    </p>
    <h4>Gallery view</h4>
        <figure>
            <a href="{{ site.url }}/images/3.0.0/dashboard/automatedanalysis-gallery.png" target="_blank">
                <img src="{{ site.url }}/images/3.0.0/dashboard/automatedanalysis-gallery.png" alt="Gallery view">
            </a>
        </figure>
        <p>
            The <i>Gallery</i> view of the <i>Automated Analysis</i> <code>Card</code> displays a <i>Result</i>, a report summary, for each <code>Rule</code> that was triggered in the selected <code>Recording</code>. In this view, each <code>Rule</code> is listed in categories based on the event type. For example, the <code>Thrown Errors</code> and the <code>Thrown Exceptions</code> <code>Rules</code> are part of the <i>exceptions</i> category, as seen in the figure above. By clicking on each <code>Rule</code>, you can view more details about the <code>Rule</code> and the <i>Result</i> that was generated.
        </p>
        <figure>
            <a href="{{ site.url }}/images/3.0.0/dashboard/automatedanalysis-result.png" target="_blank">
                <img src="{{ site.url }}/images/3.0.0/dashboard/automatedanalysis-result.png" alt="Automated Analysis Result">
            </a>
            <figcaption>
                The <code>Discouraged Management Agent Settings</code> <code>Rule</code> result with a severity score of 25.0.
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
                    <i>Summary:</i> A short summary of the problem.
                </li>
                <li>
                    <i>Explanation:</i> A detailed explanation of the problem.
                </li>
                <li>
                    <i>Solution:</i> A suggested solution to the problem.
                </li>
            </ul>
        </p>
    <h4>List View</h4>
        <figure>
            <a href="{{ site.url }}/images/3.0.0/dashboard/automatedanalysis-list.png" target="_blank">
                <img src="{{ site.url }}/images/3.0.0/dashboard/automatedanalysis-list.png" alt="List view">
            </a>
        </figure>
        <p>
            The <i>List view</i> of the <i>Automated Analysis</i> <code>Card</code> displays each <i>Result</i> in a listed table. The table can be sorted by clicking on the <i>column headers</i>. The <i>Result</i> will also show the <i>Summary</i>, <i>Explanation</i>, and <i>Solution</i> in the <i>Description</i> column.
        </p>
    <h4>Toolbar</h4>
        The <i>Toolbar</i> allows you to <i>filter</i> results, <i>change</i> the view, <i>refresh</i> the report, and <i>delete</i> the report.

        You are able to <i>filter</i>:
         <ol>
            <li>
                <code>By severity:</code> You can filter by severity score by dragging the <i>score slider</i> or typing a score in the <i>score input</i>. The <i>Result</i> table will only show results with the score greater or equal to the selected filter score. Additionally, if there are <i>Critical</i> or <i>Warning</i> results, click the corresponding labels in the <code>card</code> header to only show those <i>Results</i>. <i>Reset</i> the filter by clicking on the buttons next to the <i>Reset</i> text (i.e the <code>`0`</code>).
            </li>
            <li>
                <code>By category:</code> You can filter by <code>Rule</code> <i>Name</i> or <i>Topic</i> by clicking on the <i>Name</i> filter dropdown. Then select a filtered item by clicking the <i>Dropdown</i> next to it. You may also type in this <i>Dropdown</i> to search for a specific item. The <i>Result</i> table will only show results that match the selected filter.
            </li>
        </ol>
    {% endcapture %}
    {% include howto_step.html
      summary="Add the <i>Automated Analysis</i> <code>Card</code>"
      image-name="3.0.0/dashboard/automatedanalysis-preview.png"
      caption="
        Click on the <i>Automated Analysis</i> <code>card</code> for a preview.
      "
      text=automated-analysis-text
    %}
  </li>
  <li>
    {% capture configure-automated-analysis %}
    <p>
      In the next steps of the <code>card</code> creation, you can optionally provide <i>Advanced Configuration</i>. You can configure the settings of the special <code>Recording</code> that is used to generate the report. The <i>Current Configuration</i> will be shown and can be edited by clicking the <i>Pencil icon</i>. By default, the <code>Recording</code> uses a <code>Continuous template</code>, a <code>Maximum size</code> of <code>10MB</code>, and a <code>0</code> second <code>Maximum age</code> (meaning an unlimited recording duration).
    </p>
    <p>
        <b style="color:red;">Note:</b> It is possible that setting both an infinite <code>maximum size</code> and <code>age</code> will result in an <code>Out Of Memory</code> error during report generation.
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Configure the <i>Automated Analysis</i> <code>Card</code>"
      image-name="3.0.0/dashboard/automatedanalysis-configuration.png"
      caption="Click <i>Next</i> to optionally provide <i>Advanced Configuration</i>."
      text=configure-automated-analysis
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Finish <code>Card</code> Creation"
      image-name="3.0.0/dashboard/automatedanalysis-errorview.png"
      caption="The <code>card</code> will be added to the dashboard with an error view."
      text="After clicking <i>Finish</i>, the <code>card</code> will be added to the dashboard with an error view. This is because the <code>card</code> has not yet detected a special <i>Automated Analysis</i> <code>Recording</code> to source reports from."
    %}
  </li>
  <li>
      {% include howto_step.html
      summary="Click <i>Create Recording</i>"
      image-name="3.0.0/dashboard/automatedanalysis-success.png"
      caption="The <i>Automated Analysis</i> <code>card</code> displayed with a successful report."
      text="After clicking <i>Create Recording</i>, the <code>card</code> should be populated with report data containing the <i>Results</i> of the <i>Automated Analysis</i> report."
    %}
    </li>
</ol>

#### [MBean Metrics Chart Card](#mbean-metrics-chart-card)

<ol>
  <li>
    {% capture mbean-metrics-chart-text %}
    <p>
        The <i>MBean Metrics Chart</i> <code>card</code> displays performance metrics about the <code>target</code> <b>JVM</b> through remote access to supported <b>Java MXBeans</b> interfaces of the <b>JVM</b>, including <i>Thread, Runtime, OperatingSystem</i>, and <i>Memory MXBeans</i>.
    </p>
    <p>
        <b>Cryostat</b> gathers this data and displays them in various charts. You can customize each <code>card</code> by going through the card creation wizard. The wizard will guide you through the process of selecting the metrics you want to display, how you want to display them, and other various configuration options. Some examples of <code>Performance Metrics</code> that can be displayed are:
    </p>
    <ul>
        <li><i>Process CPU Load</i></li>
        <li><i>System Load Average</i></li>
        <li><i>Heap Memory Usage</i></li>
        <li>...</li>
    </ul>
    {% endcapture %}
    {% include howto_step.html
      summary="Add the <i>MBean Metrics Chart</i> <code>Card</code>"
      image-name="3.0.0/dashboard/mbeanmetrics-preview.png"
      caption="Click on the <i>MBean Metrics Chart</i> <code>card</code> for a preview."
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
      summary="Configure the <i>MBean Metrics Chart</i> <code>Card</code>"
      image-name="3.0.0/dashboard/mbeanmetrics-configuration.png"
      caption="Click <i>Next</i> to provide <code>card</code> configuration."
      text=configure-mbean-metrics-chart
    %}
  </li>
  <li>
    {% capture mbean-metrics-chart-finish %}
    <p>
        After clicking <i>Finish</i>, the <code>card</code> will be added to the dashboard. You can click the <i>refresh button</i> "↻" on the top right of the <code>card</code> at any time to reload the metrics.
    </p>
    {% endcapture %}
    {% include howto_step.html
      summary="Finish <code>Card</code> Creation"
      image-name="3.0.0/dashboard/mbeanmetrics.png"
      caption="The <i>MBean Metrics Chart</i> <code>card</code> displayed with the <i>Process CPU Load</i> metric."
      text=mbean-metrics-chart-finish
    %}
  </li>
</ol>

### [Configuring the Dashboard](#configuring-the-dashboard)
The <i>Dashboard</i> is highly customizable and can be configured to display the <code>cards</code> you want to see. You can customize the layout of the <code>cards</code> on the dashboard by <i>Moving, Resizing</i>, and <i>Removing</i> <code>cards</code>.

#### [Moving, Resizing, and Removing cards](#moving-and-resizing-cards)
<ol>
    <li>
        {% include howto_step.html
        summary="Add a <code>Card</code> to the <i>Dashboard</i>"
        image-name="3.0.0/dashboard/targetjvmdetails-preview.png"
        caption="Open the <code>card</code> catalog by clicking the <i>Catalog icon</i> on the Dashboard toolbar."
        text="Let's add the <i>Target JVM Details</i> <code>card</code>."
        %}
    </li>
    <li>
        {% include howto_step.html
        summary="Resize the <code>Card</code>"
        image-name="3.0.0/dashboard/dashboard-resize.png"
        caption="Click and drag the right edge of the <code>card</code> to resize it."
        %}
    </li>
    <li>
        {% include howto_step.html
        summary="Add another <code>Card</code> to the <i>Dashboard</i>"
        image-name="3.0.0/dashboard/mbeanmetrics-preview.png"
        caption="Open the <code>card</code> catalog by clicking the <i>Catalog icon</i> on the Dashboard toolbar."
        text="Let's add the <i>MBean Metrics Chart</i> <code>card</code> this time."
        %}
    </li>
    <li>
        {% include howto_step.html
        summary="Rearrange <code>Cards</code>"
        image-name="3.0.0/dashboard/dashboard-rearrange.png"
        caption="Click and drag the <i>Target JVM Details</i> <code>card's</code> header on top or to the right of the <i>MBeans Metrics Chart</i> <code>card</code> to swap their positions."
        %}
    </li>
    <li>
        {% capture remove-card-text %}
            <p>
                Each card header contains a <i>kebab</i> icon that opens a menu of card actions. The actions menu contains the following options:
                <ul>
                    <li>
                        <i>View</i> - Opens the <code>card</code> in fullscreen mode.
                    </li>
                    <li>
                        <i>Remove</i> - Removes the <code>card</code> from the dashboard.
                    </li>
                    <li>
                        <i>Reset Size</i> - Resets the <code>card</code> to its default size.
                    </li>
                </ul>
            </p>
            <figure>
                <a href="{{ site.url }}/images/3.0.0/dashboard/dashboard-cardremoved.png" target="_blank">
                    <img src="{{ site.url }}/images/3.0.0/dashboard/dashboard-cardremoved.png" alt="{{ Removed card }}">
                </a>
                <figcaption>Click <i>Remove</i> to remove the <code>card</code>.</figcaption>
            </figure>
        {% endcapture %}
        {% include howto_step.html
        summary="Remove <code>Cards</code>"
        image-name="3.0.0/dashboard/dashboard-cardkebab.png"
        caption="Click the <i>Kebab</i> icon on the <code>card</code> header to open the card actions menu."
        text=remove-card-text
        %}
    </li>
</ol>

### [Dashboard Layouts and Templates](#dashboard-layouts-and-templates)
*Dashboard Layouts* are a way to organize your dashboard `cards` into different views. You can create multiple layouts and switch between them to view different `cards`. <i>Favorite, Rename</i>, and <i>Delete</i> layouts to customize your dashboard.

By default, the `Default` layout is created for you. This layout contains the cards three *MBean Metrics Chart* `cards`. You can modify this layout's `card` configuration, but you cannot *Rename* or *Delete* it.

*Layout Templates* save your layouts for later use. You can *Create* a template from a layout, and then use that template to *Create* a new layout with the same `cards`. You can also *Import* and *Export* templates to share them with other **Cryostat** users.

#### [Create a new Dashboard Layout](#create-a-new-dashboard-layout)
<ol>
    <li>
        {% include_relative _subsections/common/layout-selector.md %}
    </li>
    <li>
        {% include howto_step.html
        summary="Click <i>New Layout</i>"
        image-name="3.0.0/dashboard/dashboard-blanklayout.png"
        text="Clicking <i>New Layout</i> will create a new blank layout and switch the dashboard view to the new layout. The layout should be called something like <code>Custom1</code>."
        %}
    </li>
    <li>
        {% include howto_step.html
        summary="<i>(Optional)</i> Rename Layouts"
        image-name="3.0.0/dashboard/dashboard-renamelayout.png"
        caption="Click the <i>Pencil</i> button to rename the currently selected layout."
        text="You are able to rename layouts by clicking the <i>Pencil</i> button next to the layout selector. This will rename the currently selected layout. You can also rename layouts within the layout selector dropdown itself."
        %}
    </li>
    <li>
        {% include howto_step.html
        summary="<i>(Optional)</i> Delete Layouts"
        image-name="3.0.0/dashboard/dashboard-deletelayout.png"
        caption="Click 🗑️ <i>Delete</i> to delete the currently selected layout."
        text="Deletion is similar to renaming. Click the trash can icon with the text <i>Delete</i> next to the layout selector to delete the currently selected layout. You can also delete layouts within the layout selector dropdown itself."
        %}
    </li>
</ol>

#### [Set a Layout as a Template](#set-a-layout-as-a-template)
<ol>
    <li>
        {% include howto_step.html
        summary="Save a layout as a template"
        image-name="3.0.0/dashboard/dashboard-layout-setastemplate.png"
        caption='Click more options "⋮" on the dashboard toolbar, then click <i>Set as template</i> to set the desired layout as a template.'
        text="The layout template will be saved as a <i>User-submitted</i> template in the template picker."
        %}
    </li>
</ol>

#### [Create a new Dashboard Layout from a Template](#create-a-new-dashboard-layout-from-a-template)

<ol>
    <li>
        {% include_relative _subsections/common/layout-selector.md %}
    </li>
    <li>
        {% include howto_step.html
        summary="Select <i>Choose Template</i>"
        image-name="3.0.0/dashboard/dashboard-layoutselector-options.png"
        text="Click the expandable menu on <i>New Layout</i> button and select <i>Choose Template</i>. This will open the template picker."
        %}
    </li>
    <li>
        {% capture template-picker-guide-text %}
        <p>
            The template picker displays all the available templates. Templates are categorized into 3 groups.
            <ol>
                <li>
                    <i>Suggested:</i> Templates that are suggested for you based on recent activity.
                </li>
                <li>
                    <i>Cryostat:</i> Templates that come with <b>Cryostat</b>.
                </li>
                <li>
                    <i>User-submitted</i>: Templates that you have created or imported.
                </li>
            </ol>
            <p>
            Additionally, you can search for templates by typing in the <i>Search</i> bar or <i>Filter</i> templates by category. You can also upload templates directly here by clicking <i>Upload</i>.
            </p>
            <p>
            Select a template by clicking on it.
            </p>
        </p>
        {% endcapture %}
        {% include howto_step.html
        summary="Choose a Template"
        image-name="3.0.0/dashboard/dashboard-templatepicker.png"
        caption="Clicking a template will open a preview where you can view the template's <code>cards</code>."
        text=template-picker-guide-text
        %}
    </li>
    <li>
        {% include howto_step.html
        summary="Enter a Name for the New Layout"
        image-name="3.0.0/dashboard/dashboard-templatepicker-name.png"
        text="A layout name must be entered before the <i>Create</i> button is enabled. The name must be <code>alphanumeric</code>, can only contain <code>underscores</code>, <code>dashes</code>, and <code>periods</code>, and must be <code>20</code> characters or less."
        %}
    </li>
    <li>
        {% include howto_step.html
        summary="Click <i>Create</i>"
        image-name="3.0.0/dashboard/dashboard-layouttemplate.png"
        caption="The new layout will be created and the dashboard view will switch to the new layout with the template applied."
        %}
    </li>
</ol>
