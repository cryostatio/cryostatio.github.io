## [Create an Automated Rule](#create-an-automated-rule)

`Automated Rules` are configurations that instruct **Cryostat** to create **JDK** `Flight Recordings` on matching
`target` **JVM** applications. Each `Automated Rule` specifies parameters for which *Event Template* to use, how
much data should be kept in the application recording buffer, and how frequently **Cryostat** should copy the
application recording buffer into **Cryostat's** own archived storage.

Once you've created a rule, **Cryostat** immediately matches it against all existing discovered `targets` and starts your `Flight Recording`. **Cryostat** will also apply the rule to newly discovered `targets` that match its definition. You can create multiple rules to match different subsets of `targets` or to layer different recording options for your needs.

We'll walk through two use cases: `Continuous` monitoring in a containerized **JVM**, and `Custom` monitoring with **Kubernetes** labels or annotations.

### [Continuous Monitoring in a Containerized JVM](#continuous-monitoring-in-a-containerized-jvm)

Previously, if we wanted to enable always-on `Continuous` monitoring using **JDK** Flight Recorder **(JFR)** in a containerized Java virtual machine **(JVM)**, we would set **JVM** flags on the `target` application, then restart the application to start monitoring. With **Cryostat's** `Automated Rules`, we can enable **JDK** Flight Recorder  **(JFR)** at runtime to continuously monitor an already-running `target` application, with no restart, no redeploy, and no downtime.

<ol>
  <li>
      {% include howto_step.html
      summary="Navigate to the <i>Automated Rules</i> Tab"
      image-name="3.0.0/create-an-automated-rule-1.png"
      caption="Switch to the <i>Automated Rules</i> tab."
    %}
  </li>
  <li>
    <summary>Click the <i>Create</i> Button</summary>
  </li>
  <li>
      {% include howto_step.html
        summary="Configure the new <code>Automated Rule</code>"
        image-name="3.0.0/create-an-automated-rule-2.png"
        text="
      <p>
        <i>Name:</i> Enter a name for the new rule. The form will alert you if the name
        entered has an invalid format. If the name is already in use then the
        creation will fail and you will need to try again.
      </p>
      <p>
        <i>Description:</i> Enter an optional description for your rule.
      </p>
      <p>
        <i>Match Expression:</i> We will fill this field in the next step.
      </p>
      <p>
        <i>Enabled:</i> Enable or disable the rule. If disabled, the rule will not be applied to any <code>targets</code>.
      </p>
      <p>
        <i>Template:</i> Select an <code>Event Template</code> or enter a custom event definition. If you are
        unsure which to choose, the <i>Continuous</i> template is useful for
        always-on production monitoring with the <i>Continuous</i> recording
        duration setting, and the <i>Profiling</i> template is useful for
        collecting extra information for troubleshooting a specifically
        identified problem with a fixed recording duration.
      </p>
      "
      %}
  </li>
  <li>
    <details>
        <summary>Create your <code>Match Expression</code></summary>
        <p>
            The <code>Match Expression</code> in a rule definition is a <code><a href="https://cel.dev/">Common Expression Language</a></code> expression that <b>Cryostat</b> interprets and uses to determine if a rule should be applied to any given <code>target</code>. <code>Match Expressions</code> should thus evaluate to a <code>boolean</code> value. The simplest <code>Match Expressions</code> would be the <code>booleans</code> true or false; if we use true, the rule will apply to every <code>target</code>. The <code>Expression</code> has a <code>target</code> object in global scope, with the following form in <code>JSON</code> notation:
        </p>
        <figure>
{% highlight json %}
{
  "jvmId": "abcd1234",
  "alias": "myAppAlias",
  "connectUrl": "service:jmx:rmi:///jndi/rmi://cryostat:9091/jmxrmi",
  "labels": {
    "com.example/service": "customer-login",
  },
  "annotations": {
    "platform": {
      "io.kubernetes/annotation": "annotated"
    },
    "cryostat": {
      "PORT": 9091,
      "HOST": "cryostat",
      "NAMESPACE": "myproject"
    }
  }
}
{% endhighlight %}
        </figure>
        <p>
          The <i>alias, connectUrl, labels, annotations.platform,</i> and <i>annotations.cryostat</i> properties are all guaranteed to be present on the <code>target</code> object. <i>alias</i> and <i>connectUrl</i> will be non-empty strings. The <i>jvmId</i> is a hash string computed by Cryostat after it successfully connects to a <code>target</code> <b>JVM</b> and is used to uniquely identify that <b>JVM</b> instance - it will be empty if <b>Cryostat</b> has not yet connected to that <code>target</code> (for example, if its <a href="#add-a-trusted-certificate"><code>SSL/TLS</code> certificate is not trusted</a> or if <a href="#store-credentials"><b>Cryostat</b> is missing the required credentials</a>) The <i>labels</i> and <i>platform annotations</i> may be empty — in <b>OpenShift</b> or <b>Kubernetes</b>, these are populated from the labels and annotations applied to the <code>target</code>’s pod, if any. The <b>Cryostat</b> annotations map will vary per platform, but on <b>OpenShift</b> or <b>Kubernetes</b> you can expect the <i>HOST, PORT, NAMESPACE,</i> and <i>POD_NAME</i> keys to be present and non-empty.

          Here are some examples of <code>Match Expressions</code>:
        </p>
        <figure>

{% highlight bash %}
target.alias == 'com.example.MainClass'

target.alias == 'myAlias'

target.labels[‘com.example/service’] == 'customer-login'

target.labels[‘com.example/service’] != 'customer-login'

target.annotations.cryostat.PORT > 3000

target.annotations.cryostat.PORT > 3000 && target.annotations.platform['io.kubernetes/annotation'] == 'enabled'

!!target.annotations.platform['io.kubernetes/annotation']

target.alias.matches("^customer-login[0-9]\*$")
{% endhighlight %}

</figure>
</details>

  </li>
  <li>
      {% include howto_step.html
        summary="Check your <code>Match Expression</code>"
        image-name="3.0.0/create-an-automated-rule-3.png"
        caption="You can select a <code>target</code> <b>JVM</b> to view its properties and use them to build your <code>Match Expression</code>."
        text="
          <p>
          When you enter a <code>Match Expression</code> in the <i>Match Expression</i> field, the <i>Match Expression Visualizer</i> will highlight which <code>targets</code> are matched.
          </p>
          "
      %}
  </li>
  <li>
      {% include howto_step.html
        summary="<i>(Optional)</i> Adjust <i>Rule Parameters</i>"
        image-name="3.0.0/create-an-automated-rule-4.png"
        caption="
          Optionally set the <code>Recording</code> Options and <i>Rule Parameters.</i>"
        text="
        <p><i>Maximum Size:</i> The maximum size of <code>Recording</code> data retained in the <code>target</code> application's recording buffer. Values less than 1 indicate no limit.</p>
        <p><i>Maximum Age:</i> The maximum age of <code>Recording</code> data retained in the <code>target</code> application's recording buffer. Values less than 1 indicate no limit.</p>
        <p><i>Archival Period:</i> Time between copies of <code>Active recording</code> data being pulled into <b>Cryostat</b> archive storage.
        Values less than 1 prevent data from being copied into archives - <code>Recordings</code> will be started and remain only in <code>target</code> <b>JVM</b> memory.</p>
        <p><i>Initial Delay:</i> Time between rule creation and when the first archived copy should be transferred. Values less than 1 are treated as being equal to the <i>Archival Period</i> above.</p>
        <p><i>Preserved Archives:</i> The number of <code>Recording</code> copies to preserve in archives for each <code>target</code> application affected by this rule. Values less than 1 prevent data from being copied into archives - <code>Recordings</code> will be started and remain only in <code>target</code> <b>JVM</b> memory.</p>

        <p>In the example image, the <i>Maximum Recording</i> age was set to 300 seconds and the <i>Archival Period</i> was set to a slightly shorter time period of 285 seconds. This overlap ensures that all of your <code>Flight Recorder</code> data is preserved in <b>Cryostat's</b> archives. The initial delay is set to 60 seconds however, so the first archive copy will be made 1 minute after the rule is created. The next copy will be made 5 minutes after that, the next another 5 minute later, etc.</p>
        "
      %}

  </li>
  <li>
    <summary>Click the <i>Create</i> Button</summary>
  </li>
  <li>
      {% include howto_step.html
        summary="Observe the new Rule in the <i>Automated Rules</i> Table"
        image-name="3.0.0/create-an-automated-rule-5.png"
        caption="
          The new rule will appear in the <i>Automated Rules</i> table."
      %}
  </li>
  <li>
      {% include_relative _subsections/common/navigate-to-recordings.md %}
  </li>
  <li>
      {% include howto_step.html
        summary="Observe the automatically generated <code>Recording</code> in the <i>Active Recordings</i> Table"
        image-name="3.0.0/create-an-automated-rule-6.png"
        caption="
          Switch to the <i>Recordings</i> tab and view the new <code>Recording</code> in the <i>Active Recordings</i>
          table."
        text="Once you've set up your <code>Automated Rules</code>, <b>Cryostat</b> will continuously monitor applications that meet the criteria defined in those rules, with no need to restart or redeploy those applications."
      %}
  </li>
</ol>

### [Custom Monitoring with Kubernetes Labels or Annotations](#custom-monitoring-with-kubernetes-labels-or-annotations)

We can define a rule that applies to any `target` application that has platform-specific attributes, such as **Kubernetes** labels or annotations. Here's an example in `JSON` notation:

<figure>
{% highlight json %}

{
  "name": "k8sMonitoring",
  "description": "Enable the Demo template on any target with the jfrMonitoring=true annotation",
  "matchExpression": "target.annotations.platform[‘jfrMonitoring’]==’enabled’",
  "eventSpecifier": "template=Demo,type=CUSTOM",
  "archivalPeriodSeconds": 300,
  "preservedArchives": 12
}

{% endhighlight %}

  <figcaption>
    To create this rule with the <b>Cryostat</b> UI, follow the guide in <a href="{{ page.url }}#continuous-monitoring-in-a-containerized-jvm">Continuous Monitoring in a Containerized JVM</a>.
  </figcaption>
</figure>

Once we've created this rule definition, **Cryostat** will check all of the existing `target` applications and watch for new `targets` that appear with the `jfrMonitoring=enabled` annotation. Any matching `targets` found will have a `Recording` started automatically using the *Custom Demo* template from our first use case. It will take an `Archived snapshot` every five minutes and maintain an hour’s worth of these archives in storage.

With this rule definition in place, **Kubernetes** or **Red Hat OpenShift** users can use familiar tools like `kubectl/oc` or the `OpenShift console` to mark `target` applications for monitoring, without needing to interact directly with the **Cryostat** API or UI. This opens the door to further automating your workflow.

As an example, you might use or implement an `Operator` that monitors traffic flow or pod restarts and enables monitoring on pods after some criterion threshold is met, then disables it again if the `target` application's behavior returns to normal. As a **Kubernetes** administrator, you could receive a notification when this occurs and check the **Cryostat** archives to retrieve <code><b>JDK</b> Flight Recorder</code> data from the `target` application recorded during the problematic period, or you could view these `Archived Recordings` in **Cryostat’s Grafana** dashboard.

<span style="color:red">**Note**</span>: An important caveat is that **Cryostat** does not watch for changes in the **Kubernetes** annotations or labels; it only watches to see if `target` applications appear or disappear. To apply the annotation to a `target` application, we must apply the annotation or label to the application *pod* (which will cause **Kubernetes** to roll out a new replica), and not to the deployment.
