## [Use Topology View](#use-topology-view)

The *Topology View* provides a visual presentation of all the discovered **JVM** applications, and all their associated resources. It also allows users to perform actions on one or multiple targets.

{% include_relative _subsections/common/navigate-to-topology.md %}

### [View all Target JVMs](#view-all-target-jvms)

<ol>
    {% capture topology-graphview-guide-text %}
    By default, an interactive <b>Graph View</b> of target <b>JVMs</b> (<i>nodes</i>) are shown nested within their associated groups (<i>surrounding lines</i>), for example, <b>Pods</b>, or <b>Realms</b> (i.e. discovery mechanisms to discover <b>Java Applications</b>, such as <b>Kubernetes API, JDP</b> or <a href="#using-the-cryostat-agent"><b>Cryostat Agent</b></a>).
    <br><br>

    You can drag target nodes/groups or use the bottom control bar to adjust the graph. For example, zoom out or fit all nodes into view. A <i>toolbar</i> is also available to allow further customization:

    <ol>
        <li>
            <b>Display Options:</b> adjust how the nodes and groups are displayed, for example, whether to show connection URL.
        </li>
        <li>
            <b>Filters:</b> determine which targets or groups to show.
        </li>
        <li>
            <b>Search bar:</b> find a target using <b>Match Expression</b>. The matched targets will be highlighted.
        </li>
    </ol>
    {% endcapture %}
    {% capture topology-listview-guide-text %}
    <i>Topology View</i> also supports <i>List View</i> mode, where your <b>JVM</b> targets and their groups are shown as expandable rows.
    <br><br>
    Click the <i>List</i> icon on the toolbar to switch to <b>List View</b>. Expand each row to see nested groups or targets. All the above features of the toolbar can also be used to customize your view.
    {% endcapture %}

    {% include howto_step.html
      summary="View <b>JVM</b> applications with <i>Graph View</i>"
      image-name="2.3.0/topology-1.png"
      caption="View <b>JVM</b> applications with topology Graph view."
      text=topology-graphview-guide-text
    %}
    {% include howto_step.html
      summary="View <b>JVM</b> applications with List View"
      image-name="2.3.0/topology-2.png"
      caption="View <b>JVM</b> applications with <i>Topology List</i> view."
      text=topology-listview-guide-text
    %}
</ol>

### [View JVM Details and Resources](#view-jvm-details-and-resources)
<ol>

    {% capture sidebar-detail-guide-text %}
    In <i>Graph View</i>, select a target <b>JVM</b> node to open the drawer panel that shows its details, for example, <code>Connection URL</code>, <code>Labels</code> and <code>Annotations</code>.
    <br><br>
    In <i>List View</i>, expand each row to open nested groups until you find the target. Expand the target to see its details and associated resources.

    {% endcapture %}

    {% capture sidebar-resource-guide-text %}
        Navigate to the <b>Resources</b> tab to see the target’s associated resources. There are 2 tables:
    <ol>
        <li>
        
        <b>Owned Resources:</b> Resources that the <b>JVM</b> owns (i.e. <a href="#startstop-a-recording"><code>Active Recordings</code></a>, <a href="#viewing-archived-recordings"><code>Archived Recordings</code></a>, <a href="#download-edit-and-upload-a-customized-event-template"><code>Event Templates</code></a> and <a href="#download-edit-and-upload-a-customized-event-template"><code>Event Types</code></a>).</li>
        <li>
        <b>Related Resources:</b> Resources that are tied to the <b>JVM</b> by <b>Match Expression</b> (i.e. <a href="#create-an-automated-rule"><code>Automated Rules</code></a> and <a href="#store-credentials"><code>Credentials</code></a>).
        </li>
    </ol>

    In the <i>Graph View</i>, each target node also has an indicator that tells whether the target has any running <code>Active Recordings</code>. The same information can be seen within the <b>Owned Resources</b> table by expanding the <code>Active Recordings</code> row.

    {% endcapture %}

    {% include howto_step.html
      summary="View <b>JVM</b> details"
      image-name="2.3.0/topology-3.png"
      caption="View target <b>JVM’s</b> details with drawer panel."
      text=sidebar-detail-guide-text
    %}
    {% include howto_step.html
      summary="View <b>JVM's</b> associated resources"
      image-name="2.3.0/topology-4.png"
      caption="View <b>JVM's</b> associated resources with drawer panel."
      text=sidebar-resource-guide-text
    %}
</ol>

### [Perform actions on JVMs](#perform-actions-on-jvms)

<ol>
    {% capture single-action-guide-text %}
    The details panel for each target <b>JVM</b> supports performing simple actions on the <b>JVM</b>. Click the <i>Actions</i> menu to show available options.
    <br><br>
    For example, select <i>View Recordings</i> to be redirected to the <i>Recordings</i> view for the target <b>JVM</b>, where you can view and manage <a href="#startstop-a-recording"><code>Active Recordings</code></a>.
    {% endcapture %}
    {% capture bulk-action-guide-text %}
    The details panel also supports performing actions on multiple target <b>JVMs</b>. Select a group of targets, for example, a <b>Pod</b>. A drawer panel will appear to show the group details. Select <b>Actions</b> menu to show available options.
    <br><br>
    For example, select <i>Start recording</i> to start a <code>Recording</code> on all target <b>JVMs</b> under this group. <b style="color:red">Caution:</b> repeatedly selecting this option will cause the <code>Recording</code> to be restarted and may result in <code>Recording</code> data loss.
    {% endcapture %}
    
    {% include howto_step.html
      summary="Perform actions for a single <b>JVM</b>"
      image-name="2.3.0/topology-5.png"
      caption="Perform actions on an individual <b>JVM</b>."
      text=single-action-guide-text
    %}
    {% include howto_step.html
      summary="Perform actions for a group of <b>JVMs</b>"
      image-name="2.3.0/topology-6.png"
      caption="Perform actions on a group of <b>JVMs</b>."
      text=bulk-action-guide-text
    %}
</ol>
