## [Create an Automated Rule](#create-an-automated-rule)

Automated Rules are configurations that instruct Cryostat to create JDK Flight Recordings on matching
target JVM applications. Each Automated Rule specifies parameters for which Event Template to use, how
much data should be kept in the application recording buffer, and how frequently Cryostat should copy the
application recording buffer into Cryostat's own archived storage.

Once you've created a rule, Cryostat immediately matches it against all existing discovered targets and starts your flight recording. Cryostat will also apply the rule to newly discovered targets that match its definition. You can create multiple rules to match different subsets of targets or to layer different recording options for your needs.

We'll walk through two use cases: continuous monitoring in a containerized JVM, and custom monitoring with Kubernetes labels or annotations.

### [Continuous monitoring in a containerized JVM](#continuous-monitoring-in-a-containerized-jvm)

Previously, if we wanted to enable always-on continuous monitoring using JDK Flight Recorder (JFR) in a containerized Java virtual machine (JVM), we would set JVM flags on the target application, then restart the application to start monitoring. With Cryostat's automated rules, we can enable JDK Flight Recorder at runtime to continuously monitor an already-running target application, with no restart, no redeploy, and no downtime.

<ol>
  <li>
      {% include howto_step.html
      summary="Navigate to the <i>Automated Rules</i> tab"
      image-name="2.1.0/create-an-automated-rule-1.png"
      caption="Switch to the <i>Automated Rules</i> tab."
    %}
  </li>
  <li>
    <summary>Click the <i>Create</i> button</summary>
  </li>
  <li>
      {% include howto_step.html
        summary="Configure the new automated rule"
        image-name="2.1.0/create-an-automated-rule-2.png"
        text="
      <p>
        Name: Enter a name for the new rule. The form will alert you if the name
        entered has an invalid format. If the name is already in use then the
        creation will fail and you will need to try again.
      </p>
      <p>
        Description: Enter an optional description for your rule.
      </p>
      <p>
        Match Expression: We will fill this field in the next step.
      </p>
      <p>
        Template: Select an event template or enter a custom event definition. If you are
        unsure which to choose, the <i>Continuous</i> template is useful for
        always-on production monitoring with the <i>continuous</i> recording
        duration setting, and the <i>Profiling</i> template is useful for
        collecting extra information for troubleshooting a specifically
        identified problem with a fixed recording duration.
      </p>
      "
      %}  
  </li>
  <li>
    <details>
        <summary>Create your match expression</summary>
        <p>
            The match expression in a rule definition is a Java-like snippet of code that Cryostat interprets and uses to determine if a rule should be applied to any given target. Match expressions should thus evaluate to a boolean value. The simplest match expressions would be the booleans true or false; if we use true, the rule will apply to every target. The expression has a target object in global scope, with the following form in JSON notation:
        </p>
        <figure>
{% highlight json %}
{
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
          The <i>alias, connectUrl, labels, annotations.platform,</i> and <i>annotations.cryostat</i> properties are all guaranteed to be present on the target object. <i>alias</i> and <i>connectUrl</i> will be non-empty strings. The <i>labels</i> and <i>platform annotations</i> may be empty—in OpenShift or Kubernetes, these are populated from the labels and annotations applied to the target’s pod, if any. The Cryostat annotations map will vary per platform, but on OpenShift or Kubernetes you can expect the <i>HOST, PORT, NAMESPACE,</i> and <i>POD_NAME</i> keys to be present and non-empty.

          Here are some examples of match expressions:
        </p>
        <figure>

{% highlight bash %}
target.alias == ’com.example.MainClass’

target.alias == ’myAlias’

target.labels[‘com.example/service’] == ’customer-login’

target.labels[‘com.example/service’] != ’customer-login’

target.annotations.cryostat.PORT > 3000

target.annotations.cryostat.PORT > 3000 && target.annotations.platform[‘io.kubernetes/annotation’] == ‘enabled’

!!target.annotations.platform[‘io.kubernetes/annotation’]

/^customer-login[0-9]\*$/.test(target.alias)
{% endhighlight %}

</figure>
</details>

  </li>
  <li>
      {% include howto_step.html
        summary="Evaluate your match expression"
        image-name="2.1.0/create-an-automated-rule-3.png"
        text="
          <p>
          When you enter a match expression in the <i>Match Expression</i> field, the <i>Match Expression Evaluator</i> will test if your match expression matches the target selected in the dropdown. You can check that your match expression
          matches all of your desired targets by selecting different targets from the dropdown.
          </p>
          "
      %}
  </li>
  <li>
      {% include howto_step.html
        summary="<i>(Optional)</i> Adjust recording options"
        image-name="2.1.0/create-an-automated-rule-4.png"
        caption="
          Optionally set the recording options."
        text="
        <p>Maximum Size: The maximum size of recording data retained in the target application's recording buffer. Values less than 1 indicate no limit.</p>
        <p>Maximum Age: The maximum age of recording data retained in the target application's recording buffer. Values less than 1 indicate no limit.</p>
        <p>Archival Period: Time between copies of active recording data being pulled into Cryostat archive storage.
        Values less than 1 prevent data from being copied into archives - recordings will be started and remain only in target JVM memory.</p>
        <p>Preserved Archives: The number of recording copies to preserve in archives for each target application affected by this rule. Values less than 1 prevent data from being copied into archives - recordings will be started and remain only in target JVM memory.</p>

        <p>In the example image, the maximum recording age was set to 300 seconds and the archival period was set to a slightly shorter time period of 285 seconds. This overlap ensures that all of your flight recorder data is preserved in Cryostat's archives.</p>
        "
      %}

  </li>
  <li>
    <summary>Click the <i>Create</i> button</summary>
  </li>
  <li>
      {% include howto_step.html
        summary="Observe the new rule in the <i>Automated Rules</i> table"
        image-name="2.1.0/create-an-automated-rule-5.png"
        caption="
          The new rule will appear in the <i>Automated Rules</i> table."
      %}  
  </li>
  <li>
      {% include_relative _subsections/common/navigate-to-recordings.md %}
  </li>
  <li>
      {% include howto_step.html
        summary="Observe the automatically generated recording in the <i>Active Recordings</i> table"
        image-name="2.1.0/create-an-automated-rule-6.png"
        caption="
          Switch to the <i>Recordings</i> tab and view the new recording in the <i>Active Recordings</i>
          table."
        text="Once you've set up your automated rules, Cryostat will continuously monitor applications that meet the criteria defined in those rules, with no need to restart or redeploy those applications."
      %}  
  </li>
</ol>

### [Custom monitoring with Kubernetes labels or annotations](#custom-monitoring-with-kubernetes-labels-or-annotations)

We can define a rule that applies to any target application that has platform-specific attributes, such as Kubernetes labels or annotations. Here's an example in JSON notation:

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
    To create this rule with the Cryostat UI, follow the guide in <a href="{{ page.url }}#continuous-monitoring-in-a-containerized-jvm">Continuous monitoring in a containerized JVM</a>.
  </figcaption>
</figure>

Once we've created this rule definition, Cryostat will check all of the existing target applications and watch for new targets that appear with the <i>jfrMonitoring=enabled</i> annotation. Any matching targets found will have a recording started automatically using the custom <i>Demo</i> template from our first use case. It will take an archived snapshot every five minutes and maintain an hour’s worth of these archives in storage.

With this rule definition in place, Kubernetes or Red Hat OpenShift users can use familiar tools like <i>kubectl/oc</i> or the OpenShift console to mark target applications for monitoring, without needing to interact directly with the Cryostat API or UI. This opens the door to further automating your workflow.

As an example, you might use or implement an Operator that monitors traffic flow or pod restarts and enables monitoring on pods after some criterion threshold is met, then disables it again if the target application's behavior returns to normal. As a Kubernetes administrator, you could receive a notification when this occurs and check the Cryostat archives to retrieve JDK Flight Recorder data from the target application recorded during the problematic period, or you could view these archived recordings in Cryostat’s Grafana dashboard.

**Note**: An important caveat is that Cryostat does not watch for changes in the Kubernetes annotations or labels; it only watches to see if target applications appear or disappear. To apply the annotation to a target application, we must apply the annotation or label to the application <i>pod</i> (which will cause Kubernetes to roll out a new replica), and not to the <i>deployment</i>.
