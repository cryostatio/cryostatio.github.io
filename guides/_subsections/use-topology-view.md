## [Use Topology View](#use-topology-view)

The *Topology View* provides a visual presentation of all the discovered JVM applications, and all their associated resources. It also allows users to perform actions on one or multiple targets.

{% include_relative _subsections/common/navigate-to-topology.md %}

### [View all target JVMs](#view-all-target-jvms)

<ol>
    {% capture topology-graphview-guide-text %}
    By default, an interactive <b>Graph View</b> of target JVMs (<i>nodes</i>) are shown nested within their associated groups (<i>surrounding lines</i>), for example, Pods, or Realms (i.e. discovery mechanisms to discover Java Applications, such as Kubernetes API, JDP or <a href="#using-the-cryostat-agent">Cryostat Agent</a>). 
    <br><br>

    You can drag target nodes/groups or use the bottom control bar to adjust the graph. For example, zoom out or fit all nodes into view. A toolbar is also available to allow further customization:

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
    <i>Topology View</i> also supports <b>List View</b> mode, where your JVM targets and their groups are shown as expandable rows. 
    <br><br>
    Click the List icon on the toolbar to switch to <b>List View</b>. Expand each row to see nested groups or targets. All the above features of the toolbar can also be used to customize your view.
    {% endcapture %}

    {% include howto_step.html
      summary="View JVM applications with Graph View"
      image-name="2.3.0/topology-1.png"
      caption="View JVM applications with topology Graph view."
      text=topology-graphview-guide-text
    %}
    {% include howto_step.html
      summary="View JVM applications with List View"
      image-name="2.3.0/topology-2.png"
      caption="View JVM applications with Topology List view."
      text=topology-listview-guide-text
    %}
</ol>

### [View JVM details and resources](#view-jvm-details-and-resources)
<ol>

    {% capture sidebar-detail-guide-text %}
    In <b>Graph View</b>, select a target JVM node to open the drawer panel that shows its details, for example, <code>Connection URL</code>, <code>Labels</code> and <code>Annotations</code>.
    <br><br>
    In <b>List View</b>, expand each row to open nested groups until you find the target. Expand the target to see its details and associated resources.

    {% endcapture %}

    {% capture sidebar-resource-guide-text %}
        Navigate to the <b>Resources</b> tab to see the target’s associated resources. There are 2 tables:
    <ol>
        <li>
        
        <b>Owned Resources:</b> Resources that the JVM owns (i.e. <a href="#startstop-a-recording">Active Recordings</a>, <a href="#viewing-archived-recordings">Archived Recordings</a>, <a href="#download-edit-and-upload-a-customized-event-template">Event Templates</a> and <a href="#download-edit-and-upload-a-customized-event-template">Event Types</a>).</li>
        <li>
        <b>Related Resources:</b> Resources that are tied to the JVM by <b>Match Expression</b> (i.e. <a href="#create-an-automated-rule">Automated Rules</a> and <a href="#store-credentials">Credentials</a>).
        </li>
    </ol>

    In the <b>Graph View</b>, each target node also has an indicator that tells whether the target has any running <b>Active Recordings</b>. The same information can be seen within the <b>Owned Resources</b> table by expanding the <b>Active Recordings</b> row.

    {% endcapture %}

    {% include howto_step.html
      summary="View JVM details"
      image-name="2.3.0/topology-3.png"
      caption="View target JVM’s details with drawer panel."
      text=sidebar-detail-guide-text
    %}
    {% include howto_step.html
      summary="View JVM's associated resources"
      image-name="2.3.0/topology-4.png"
      caption="View JVM's associated resources with drawer panel."
      text=sidebar-resource-guide-text
    %}
</ol>

### [Perform actions on JVMs](#perform-actions-on-jvms)

<ol>
    {% capture single-action-guide-text %}
    The details panel for each target JVM supports performing simple actions on the JVM. Click the <b>Actions</b> menu to show available options.
    <br><br>
    For example, select <b>View Recordings</b> to be redirected to the <i>Recordings</i> view for the target JVM, where you can view and manage <a href="#startstop-a-recording">Active Recordings</a>.
    {% endcapture %}
    {% capture bulk-action-guide-text %}
    The details panel also supports performing actions on multiple target JVMs. Select a group of targets, for example, a Pod. A drawer panel will appear to show the group details. Select <b>Actions</b> menu to show available options.
    <br><br>
    For example, select <b>Start recording</b> to start a recording on all target JVMs under this group. <b>Caution:</b> repeatedly selecting this option will cause the recording to be restarted and may result in recording data loss.
    {% endcapture %}
    
    {% include howto_step.html
      summary="Perform actions for a single JVM"
      image-name="2.3.0/topology-5.png"
      caption="Perform actions on an individual JVM."
      text=single-action-guide-text
    %}
    {% include howto_step.html
      summary="Perform actions for a group of JVMs"
      image-name="2.3.0/topology-6.png"
      caption="Perform actions on a group of JVMs."
      text=bulk-action-guide-text
    %}
</ol>
