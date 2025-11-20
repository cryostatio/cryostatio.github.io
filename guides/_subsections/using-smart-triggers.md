## [Using Smart Triggers](#using-smart-triggers)
**Cryostat Agent** supports custom triggers that are based on MBean metric values. You can configure **Cryostat Agent** to start **JFR** `Recordings` dynamically when these custom trigger conditions are met.

You can set up a custom trigger condition in **Cryostat** to initiate Java Flight Recorder **(JFR)** `Recordings` dynamically. This trigger condition is based on MBean counters, covering various runtime, memory, thread, and OS metrics. The condition includes MBean counter types and allows specifying a duration for the trigger to activate only if the specified values persist for that duration. **Cryostat's Agent** supports smart triggers, which continuously monitor MBean counter values. When the current values match the configured conditions for the specified duration, the trigger initiates a **JFR** `Recording` dynamically through the **Cryostat Agent**.

<span style="color:red">**Note**</span>: A **JFR** `Recording` will not start dynamically if the custom trigger condition associated with this `Recording` is not met.

#### [Configure Custom Trigger for Dynamic Recording](#configure-custom-trigger-for-dynamic-recording)
When you configure your `target` application to load the **Cryostat Agent**, you can define one or more custom triggers that are then passed as arguments to the **Agent**.
For more information, learn how to [use the Cryostat Agent](#using-the-cryostat-agent).

#### [Options for Defining a Custom Trigger](#options-for-defining-a-custom-trigger)
You can define a custom trigger in any of the following ways:

<ol>
  <li>
    <details>
      <summary>Appending a Custom Trigger to the <b>Cryostat Agent’s</b> JAR File Path</summary>
      <p>
The following example shows how to append a simple custom trigger to the <b>Cryostat Agent’s</b> JAR file path:
      </p>
      <pre>
  JAVA_OPTS="-javaagent:/deployments/app/cryostat-agent-shaded.jar=[ProcessCpuLoad > 0.2 ; TargetDuration > duration("30s")]~profile"
      </pre>
      <p>
      The preceding example trigger instructs the <b>Agent</b> to start a <b>JFR</b> <code>Recording</code> if the <i>ProcessCpuLoad</i> metric has a value greater than 0.2 for a duration of more than 30 seconds: This example also instructs the <b>Agent</b> to use the <i>Profile</i> event template for the <b>JFR</b> <code>Recording</code>.
      </p>
    </details>
  </li>
  <li>
    <details>
      <summary>Using a <b>JVM</b> System Property Flag</summary>
      <p>
The following example shows how to specify a simple custom trigger by using a <b>JVM</b> system property flag:
      </p>
      <pre>
  -Dcryostat.agent.smart-trigger.definitions="[ProcessCpuLoad > 0.2 ; TargetDuration > duration(\"30s\")]~profile"
      </pre>
      <p>
      This example uses the same custom trigger criteria as the preceding example.
      </p>
    </details>
  </li>
  <li>
    <details>
      <summary>Using an Environment Variable</summary>
      <p>
The following example shows how to specify a simple custom trigger by using an environment variable:
      </p>
      <pre>
  - name: CRYOSTAT_AGENT_SMART_TRIGGER_DEFINITIONS
    value: "[ProcessCpuLoad > 0.2 ; TargetDuration > duration(\"30s\")]~profile"
      </pre>
      <p>
This example uses the same custom trigger criteria as the preceding examples.
      </p>
    </details>
  </li>
  <li>
    <details>
      <summary>Using a Configuration File</summary>
      <p>
      Smart Triggers may also be defined using a text file, then passing an environment variable or configuration property to the cryostat agent specifying the path to the file with the smart trigger definitions:
      </p>
      <pre>
      - name: CRYOSTAT_AGENT_SMART_TRIGGER_CONFIG_PATH
        value: "trigger-definitions.txt"
      </pre>
      <p>
      This example uses the same custom trigger definition as the previous examples, written to a file called trigger-definitions.txt
      </p>
    </details>
  </li>
</ol>

#### [General Syntax Rules for Custom Triggers](#general-syntax-rules-for-custom-triggers)
Consider the following syntax guidelines for defining custom triggers:
<ol>
    <li>A custom trigger definition must consist of both an expression that defines the overall trigger condition and the name of an event template that is used for the <b>JFR</b> <code>Recording</code>.</li>
    <li>The entire trigger expression must be enclosed in square brackets. For example: <pre>[ProcessCpuLoad > 0.2 ; TargetDuration < duration("30s")]</pre></li>
    <li>The name of the event template must be defined after the trigger expression and preceded by a tilde <code>(~)</code> character. For example: <pre>~profile</pre></li>
    <li>A trigger expression can consist of one or more constraints and a <code>target</code> duration. The set of constraints and <code>target</code> duration must be separated by a semicolon <code>(;)</code> character.</li>
    <li>Each constraint must include: the name of an MBean counter; a relational operator such as <code>></code> (greater than), <code>=</code> (equal to), <code><</code>(less than), and so on; and a specified value. The type of relational operator and value that you can specify depends on the associated MBean counter type. For example: <pre>ProcessCpuLoad > 0.2</pre></li>
    <li>Constraints can be grouped together by using logical operators such as <code>&&</code> (AND), <code>||</code> (OR), or <code>!</code> (NOT) logic. For readability and clarity around the order of operations and operator precedence, grouped constraints may be enclosed in round brackets, but this is not a requirement. For example:
    <pre>
  [(MetricA > value1 && MetricB < value2) || MetricC == 'stringvalue' ; TargetDuration > duration("30s")]
    </pre>
    </li>
    <li>
    The name of each MBean counter that is specified as part of a custom trigger must follow precise syntax rules in terms of spelling and capitalization.
    </li>
    <li>
    Only one <code>target</code> duration can be defined for a custom trigger. The <code>target</code> duration is applied to the entire trigger expression that is enclosed within the square brackets
    </li>
    <li>
    A <code>target</code> duration can be expressed in terms of seconds, minutes, or hours. For example, <code>30s</code> means 30 seconds, <code>5m</code> means five minutes, <code>2h</code> means two hours, and so on.
    </li>
    <li>
    A <code>target</code> duration is optional. If a <code>target</code> duration is not specified, triggering will occur immediately once the trigger conditions are met.
    </li>
    <li>
    Multiple custom trigger definitions can be specified together, each of which relates to a separate <b>JFR</b> <code>Recording</code>. Different custom trigger definitions must be separated by a comma <code>(,)</code> character. For example:
    <pre>
  [ProcessCpuLoad>0.2]~profile,[ThreadCount>30]~Continuous
    </pre>
    </li>
</ol>
