## [Use Topology View](#use-topology-view)

The *Topology View* provides a visual presentation of all the discovered **JVM** applications, and all their associated resources. It also allows users to perform actions on one or multiple `targets`.

{% include_relative _subsections/common/navigate-to-topology.md %}

### [View all Target JVMs](#view-all-target-jvms)

<ol>
    {% capture topology-graphview-guide-text %}
    By default, an interactive <i>Graph View</i> of <code>target</code> <b>JVMs</b> (<code>nodes</code>) are shown nested within their associated groups (<i>surrounding lines</i>), for example, <b>Pods</b>, or <b>Realms</b> (i.e. discovery mechanisms to discover <b>Java Applications</b>, such as <b>Kubernetes API, JDP</b> or <a href="#using-the-cryostat-agent">Cryostat Agent</a>).
    <br><br>

    You can drag <code>target</code> <code>nodes/groups</code> or use the bottom control bar to adjust the graph. For example, zoom out or fit all <code>nodes</code> into view. A <i>toolbar</i> is also available to allow further customization:

    <ol>
        <li>
            <i>Display Options:</i> adjust how the <code>nodes</code> and <code>groups</code> are displayed, for example, whether to show connection URL.
        </li>
        <li>
            <i>Filters:</i> determine which <code>targets</code> or <code>groups</code> to show.
        </li>
        <li>
            <i>Search bar:</i> find a <code>target</code> using <code>Match Expression</code>. The matched <code>targets</code> will be highlighted.
        </li>
    </ol>
    {% endcapture %}
    {% capture topology-listview-guide-text %}
    <i>Topology View</i> also supports <i>List View</i> mode, where your <b>JVM</b> <code>targets</code> and their <code>groups</code> are shown as expandable rows.
    <br><br>
    Click the <i>List</i> icon on the toolbar to switch to <b>List View</b>. Expand each row to see nested <code>groups</code> or <code>targets</code>. All the above features of the toolbar can also be used to customize your view.
    {% endcapture %}

    {% include howto_step.html
      summary="View <b>JVM</b> Applications with <i>Graph View</i>"
      image-name="3.0.0/topology-1.png"
      caption="View <b>JVM</b> applications with <i>Topology Graph view</i>."
      text=topology-graphview-guide-text
    %}
    {% include howto_step.html
      summary="View <b>JVM</b> Applications with <i>List View</i>"
      image-name="3.0.0/topology-2.png"
      caption="View <b>JVM</b> applications with <i>Topology List</i> view."
      text=topology-listview-guide-text
    %}
</ol>

### [View JVM Details and Resources](#view-jvm-details-and-resources)
<ol>

    {% capture sidebar-detail-guide-text %}
    In <i>Graph View</i>, select a <code>target</code> <b>JVM</b> <code>node</code> to open the drawer panel that shows its details, for example, <i>Connection URL</i>, <i>Labels</i> and <i>Annotations</i>.
    <br><br>
    In <i>List View</i>, expand each row to open nested <code>groups</code> until you find the <code>target</code>. Expand the <code>target</code> to see its details and associated resources.

    {% endcapture %}

    {% capture sidebar-resource-guide-text %}
        Navigate to the <i>Resources</i> tab to see the <code>target’s</code> associated resources. There are 2 tables:
    <ol>
        <li>
        
        <i>Owned Resources:</i> Resources that the <b>JVM</b> owns (i.e. <a href="#startstop-a-recording">Active Recordings</a>, <a href="#viewing-archived-recordings">Archived Recordings</a>, <a href="#download-edit-and-upload-a-customized-event-template">Event Templates</a> and <a href="#download-edit-and-upload-a-customized-event-template">Event Types</a>).</li>
        <li>
        <i>Related Resources:</i> Resources that are tied to the <b>JVM</b> by <code>Match Expression</code> (i.e. <a href="#create-an-automated-rule">Automated Rules</a> and <a href="#store-credentials">Credentials</a>).
        </li>
    </ol>

    In the <i>Graph View</i>, each <code>target node</code> also has an indicator that tells whether the <code>target</code> has any running <code>Active Recordings</code>. The same information can be seen within the <i>Owned Resources</i> table by expanding the <code>Active Recordings</code> row.

    {% endcapture %}

    {% include howto_step.html
      summary="View <b>JVM</b> Details"
      image-name="3.0.0/topology-3.png"
      caption="View <code>target</code> <b>JVM’s</b> details with drawer panel."
      text=sidebar-detail-guide-text
    %}
    {% include howto_step.html
      summary="View <b>JVM's</b> Associated Resources"
      image-name="3.0.0/topology-4.png"
      caption="View <b>JVM's</b> associated resources with drawer panel."
      text=sidebar-resource-guide-text
    %}
</ol>

### [Perform actions on JVMs](#perform-actions-on-jvms)

<ol>
    {% capture single-action-guide-text %}
    The details panel for each <code>target</code> <b>JVM</b> supports performing simple actions on the <b>JVM</b>. Click the <i>Actions</i> menu to show available options.
    <br><br>
    For example, select <i>View Recordings</i> to be redirected to the <i>Recordings View</i> for the <code>target</code> <b>JVM</b>, where you can view and manage <a href="#startstop-a-recording">Active Recordings</a>.
    {% endcapture %}
    {% capture bulk-action-guide-text %}
    The <i>Details</i> panel also supports performing actions on multiple <code>target</code> <b>JVMs</b>. Select a group of <code>targets</code>, for example, a <b>Pod</b>. A drawer panel will appear to show the group details. Select <b>Actions</b> menu to show available options.
    <br><br>
    For example, select <i>Start recording</i> to start a <code>Recording</code> on all <code>targets</code> <b>JVMs</b> under this group. If this action fails (for example, due to intermittent network issues) then it is safe to repeat this action again: the action will only start new <code>Recordings</code> or replace <code>STOPPED</code> <code>Recordings</code> on <code>targets</code> under this group, it will not affect <code>RUNNING</code> <code>Recordings</code>.
    {% endcapture %}

    {% include howto_step.html
      summary="Perform Actions for a Single <b>JVM</b>"
      image-name="3.0.0/topology-5.png"
      caption="Perform actions on an individual <b>JVM</b>."
      text=single-action-guide-text
    %}
    {% include howto_step.html
      summary="Perform Actions for a Group of <b>JVMs</b>"
      image-name="3.0.0/topology-6.png"
      caption="Perform actions on a group of <b>JVMs</b>."
      text=bulk-action-guide-text
    %}
</ol>
