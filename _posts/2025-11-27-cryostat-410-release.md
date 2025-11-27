---
layout: post
title: Cryostat 4.1.0 is Released!
date: 2025-11-27
synopsis: Cryostat 4.1.0 is here. Learn what's new in this release.
author: Andrew Azores
---

#### Table of Contents
* auto-gen TOC:
{:toc}
<hr>

Hello everyone,

Cryostat 4.1.0 has landed. It's a minor release in semantic versioning terms, but it's a big release in terms of functionality and features. Read on to find out what's new.

## Release Highlights

### [New Features](#new-features)

#### [OpenShift-specific](#openshift-specific)

<ol>
    <li>
        <b>Console Plugin auto-configuration UI</b>: <a href="/2025/03/20/cryostat-400-release.html#openshift-specific-features">Cryostat 4.0</a> introduced a Console Plugin and Cryostat Agent Autoconfiguration feature for OpenShift users. Cryostat 4.1 expands on that with a new feature allowing Agent Autoconfiguration to be performed graphically within the Console UI, rather than requiring you to manually edit your application <code>Deployment</code> YAML.
    </li>
</ol>

#### [General](#general)

<ol>
    <li>
        <b>New Navigation</b>: the navigation sidebar has been reorganized into nested sections, and a few new navigable pages have been added (more details below). The old <code>Automated Rules</code> view is now under the <code>Flight Recorder</code> section, under the <code>Capture</code> subsection, as the <code>Automated Rules</code> item - or <i>Flight Recorder/Capture/Automated Rules</i>. <code>Recordings</code> has been split into <i>Flight Recorder/Capture/Recordings</i> and <i>Flight Recorder/Analyze/Archives</i>, and <code>Events</code> has been split into <i>Flight Recorder/Capture/Events</i> and <i>Flight Recorder/Capture/Instrumentation</i>.
    </li>
    <li>
        <b>Automated Reports view</b>: the new <i>Flight Recorder/Analyze/Automated Reports</i> view provides an overview of all recent automated analysis reports per target. It has controls to sort and filter the reports to help surface which JVMs in your deployment may require your attention.
    </li>
    <li>
        <b>Diagnostics section</b>: the new <i>Diagnostics</i> contains controls for <a href="/guides/#perform-garbage-collection">performing garbage collection</a>, <a href="/guides/#capture-a-thread-dump">capturing a thread dump</a>, and <a href="/guides/#capture-a-heap-dump">capturing a heap dump</a>. Performing garbage collection is still possible via a <code>Dashboard</code> card, and that same card also now contains the same thread and heap dump controls as this new navigable view. Thread and heap dumps are stored in new, separate buckets in Cryostat's object storage, and have similar <i>Targets</i>, <i>All-Targets</i>, and <i>All-Archives</i> viewing modes as <code>Archived Recordings</code>. They can also be downloaded, deleted, and labeled like archived recordings, but there are no analysis tools for these data types within the Cryostat UI.
    </li>
    <li>
        <b>External object storage</b>: since Cryostat 3.0, file-based data like archived recordings have been stored in a <a href="https://github.com/cryostatio/cryostat-storage"><code>cryostat-storage</code></a> S3-compatible object storage instance, as opposed to simply written to local filesystem within the Cryostat container. In Cryostat 4.1 the configuration knobs to choose your own S3-compatible object storage are now finally exposed, so when you install a Cryostat instance you can choose the batteries-included <code>cryostat-storage</code> option, or opt for your own choice of object storage provider. This may be your own self-hosted object storage which you manage or it can be a commercial service provider. For long-lived production Cryostat installations it is highly recommended that you should choose a commercial service provider or your own self-managed object storage, rather than relying on the simple object storage included with Cryostat. Various internal improvements have also been made for the communication between Cryostat, <code>cryostat-storage</code>, <code>cryostat-reports</code>, and <code>jfr-datasource</code> to optimize the transfer of files between containers.
    </li>
    <li>
        <b>Declarative configurations</b> have new additions. These are configurations that allow you to define ex. <a href="/guides/#preconfiguring-event-templates-within-cryostat">custom event templates</a> by mounting a volume containing definition files to Cryostat, rather than needing to use the Cryostat UI or API to create these resources. In Kubernetes or OpenShift this can be achieved using <code>ConfigMaps</code> or <code>Secrets.</code> It is now also possible to define the following resource types declaratively:
        <ul>
            <li>automated rules</li>
            <li>JMC agent probe templates</li>
            <li>stored credentials</li>
        </ul>
    </li>
    <li>
        <b>Cryostat Agent Smart Triggers via file</b>: similarly, <a href="/guides/#using-smart-triggers">Cryostat Agent Smart Triggers</a> can be configured by providing the Agent with a path to a file containing Smart Triggers definitions, not only by passing them as command line parameters. Use the JVM flag <code>-Dcryostat.agent.smart-trigger.config.path=/path/to/file</code> or the environment variable <code>CRYOSTAT_AGENT_SMART_TRIGGER_CONFIG_PATH=/path/to/file</code>.
    </li>
    <li>
        <b>Accessibility settings</b>: the Settings view has a new <i>General/Accessibility</i> section, which allows you to select the colour palette and icon size used for components like the <code>Automated Analysis Reports</code>.
    </li>
    <li>
        <b>Topology analysis filtering</b>: the Settings view has a new <i>Topology</i> section which allows you to configure the behaviour of the <i>Overview/Topology</i> view. The <code>Topology</code> view indicates <code>Automated Analysis</code> scores on discovered targets using a status badge displaying the maximum (most critical) analysis score. However, some of these analysis scores are static, configuration-based scores which may not be of particular interest in all cases - for example, the <i>Passwords in Environment Variables</i> score. In many cases it is acceptable to include passwords in environment variables, so if this is the only detected "issue" with a target JVM, it may not be desirable for this to reflect as a critical status on the <code>Topology</code> view. You can use this new Settings configuration to control which analysis results are used for determining the Topology view status badges.
    </li>
    <li>
        <b>Target-based automated analysis</b>: along with the split of <code>Recordings</code> into <i>Flight Recorder/Capture/Recordings</i> and <i>Flight Recorder/Analyze/Archives</i> and the new <i>Flight Recorder/Analyze,Automated Reports</i> and <code>autoanalyze=true</code> feature described above, the workflow for manually generating an Automated Analysis report for a target JVM <a href="/guides/#view-automated-analysis-for-a-target">has been reworked</a>. The new workflow guides you through creating a recording (with selected default values) if required, then creates, archives, and deletes a Snapshot recording with the `autoanalyze=true` label to trigger the automated analysis. The results will be viewable in the new <code>Analyze</code> panel in the <i>Flight Recorder/Capture/Recordings</i> view as well as at <i>Flight Recorder/Analyze/Automated Reports</i>, and will also be cached and connected to the archived recording copy viewable at <i>Flight Recorder/Analyze/Archives</i>. This reduces the number of clicks to get to an automated analysis report for a target application, as well as ensuring the results are easy to both view immediately and reference back to in the future.
    </li>
</ol>

### [Feature Enhancements](#feature-enhancements)

<ol>
    <li>
        <b>Automatic Automated Analysis</b>: when an <code>Archived Recording</code> with the label <code>autoanalyze=true</code> is created, Cryostat will automatically perform <a href="/guides/#view-automated-analysis-for-a-target">automated analysis</a> of that recording. The results will be cached and viewable in the new <i>Flight Recorder/Analyze/Automated Reports</i> view. Hint: labels applied to <code>Active Recordings</code> are copied to <code>Archived Recordings</code>, so the act of archiving any active recording with this label applied will trigger this behaviour. You will notice that the active recording creation form and Automated Rule creation form have new controls to enable this feature, which is turned on by default. Cryostat will also automatically perform this function for "external recordings" - ones which Cryostat observes are available in a target JVM, which Cryostat did not initiate. Such recordings are often present due to the use of the <code>-XX:StartFlightRecording</code> JVM flag.
    </li>
    <li>
        <b>External recording enhancements</b>: continuing on the topic of external recordings, these are now handled completely as if they were started by Cryostat with the "archive on stop" and "automatically analyze" options enabled. Whether the recording is manually stopped or its fixed duration elapses, Cryostat will copy the recording data into the archives and automatically analyze the contents.
    </li>
    <li>
        <b>Archive On Stop for Continuous Recordings</b>: previously, the "archive on stop" option was only available for fixed-duration recordings, so that Cryostat would automatically copy JFR data to archives when the configured duration elapsed. This option is now available for continuous recordings (those without a fixed duration) and is enabled by default. When a continuous recording is manually stopped, Cryostat will also automatically copy the JFR data to archives.
    </li>
    <li>
        <b>Automated Rule copying and editing</b> has been implemented. Previously, if you wanted to use an existing <code>Automated Rule</code> from the Cryostat UI as a basis for a new rule, you would need to either:
        <ul>
            <li>
                <a href="/guides/#download-an-automated-rule">download the Rule</a>, make edits locally with a text or JSON editor, and <a href="/guides/#upload-an-automated-rule">upload the new Rule</a>
            </li>
            <li>
                <a href="/guides/#create-an-automated-rule">create a new Rule</a> graphically and manually copy the settings
            </li>
        </ul>
        In the Automated Rule overflow menu there is a new <code>Edit</code> action which allows you to edit a Rule in-place (with some limitations), and a new <code>Copy</code> action which allows you to create a new Rule using the existing Rule as a template with the same configuration.
    </li>
    <li>
        <b>JVM details modal</b> anywhere: the <a href="/guides/#target-jvm-details-card"><code>Dashboard</code></a> and <a href="/guides/#view-jvm-details-and-resources"><code>Topology</code></a> views contain a component which displays details about a selected JVM target. This also includes components where a miniature Topology view is included, such as <code>Automated Rules</code> and <code>Security</code>. Other views, such as <i>Flight Recorder/Capture/Recordings</i> provided no way to view JVM details beyond the alias and connection URL via the target selector dropdown. There is a new info button beside the dropdown which, when clicked, summons a modal dialog containing the same details component so that this information is visible anywhere a target selection has been made.
    </li>
    <li>
        <b>Merged Target and All-Targets archives</b>: the old <code>Recordings</code> view had a tab for target-specific archived recordings, and the old <code>Archives</code> view had a tab for <i>All Targets</i>. These were extremely similar and redundant. The new <i>Flight Recorder/Capture/Recordings</i> view focuses only on active recordings and removes the target-specific archives tab. The new <i>Flight Recorder/Analyze/Archives</i> view has a <i>Targets</i> tab with a target selector dropdown. If a target is selected this behaves just like the old <code>Recordings</code> view and its target-specific archives tab. If the target selection is cleared then this behaves just like the old <code>Archives</code> view and its <i>All Targets</i> tab.
    </li>
    <li>
        <b>Grafana dashboard</b> now includes a <code>Frameworks</code> row. This includes a chart for <a href="https://mvnrepository.com/artifact/org.hibernate.orm/hibernate-jfr"><code>Hibernate ORM</code></a> JFR events, and a chart and a table for <a href="https://quarkus.io/guides/jfr"><code>Quarkus REST</code></a> JFR events. <a href="/2025/03/20/cryostat-400-release.html">Cryostat 4.0</a> previously shipped <i>Preset Event Templates</i>, <i>Preset Automated Rules</i>, and a <code>Match Expression</code> feature to help you take capture these JFR event types, so this new feature provides a convenient way for you to visualize this captured data.
    </li>
    <li>
        <b>IPv6 targets</b>: support for IPv6 is improved, including for Kubernetes/OpenShift EndpointSlice-based discovery. Kubernetes clusters using IPv6 or running IPv4/IPv6 dual-stack should pose no issue for Cryostat.
    </li>
</ol>

### [General Maintenance](#general-maintenance)
<ol>
    <li>
        Container resource limits and requests: when deploying Cryostat via the operator or Helm chart, the default resource requests have been raised to avoid low-resource scenarios which were often seen in Cryostat 4.0, and there are now default resource limits applied so that Cryostat will not try to consume all available resources if you give it a lot of work to do.
    </li>
    <li>
        Routine maintenance: dependency version updates and container base image version updates.
    </li>
</ol>

For further details on these items, [check the GitHub Discussions release announcement](https://github.com/cryostatio/cryostat/discussions/1191).

## Where can I get the latest version of Cryostat?
You can install Cryostat using our
[Kubernetes operator on OperatorHub.io](https://operatorhub.io/operator/cryostat-operator)
or via a
[Helm Chart](https://github.com/cryostatio/cryostat-helm/releases/tag/v2.1.0)
. As always, you can also run Cryostat in other environments with a little more manual setup.

If this is your first time installing Cryostat on Kubernetes, you can [Get Started](/get-started) right here on this
website.

If you had previously installed Cryostat Operator 4.0.x with OLM, then you may have already been upgraded to 4.1.0, or
else you should be able to approve and install the upgrade.

## Feedback
Please reach out to the [Cryostat mailing list](mailto:cryostat-development@googlegroups.com) or
[GitHub Discussion](https://github.com/cryostatio/cryostat/discussions/1191) with any questions or comments.
