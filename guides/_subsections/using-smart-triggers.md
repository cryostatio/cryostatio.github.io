## [Using Smart Triggers](#using-smart-triggers)
**Cryostat Agent** supports custom triggers that are based on MBean metric values. You can configure **Cryostat Agent** to start **JFR** `Recordings` dynamically when these custom trigger conditions are met.

You can set up a custom trigger condition in **Cryostat** to initiate Java Flight Recorder **(JFR)** `Recordings` dynamically. This trigger condition is based on MBean counters, covering various runtime, memory, thread, and OS metrics. The condition includes MBean counter types and allows specifying a duration for the trigger to activate only if the specified values persist for that duration. **Cryostat's Agent** supports smart triggers, which continuously monitor MBean counter values. When the current values match the configured conditions for the specified duration, the trigger initiates a **JFR** `Recording` dynamically through the **Cryostat Agent**.

Additional Trigger conditions may be set to configure when a recording started by a Smart Trigger should be stopped, as well as setting limits on how many such recordings should be created.

<span style="color:red">**Note**</span>: A **JFR** `Recording` will not start dynamically if the custom trigger condition associated with this `Recording` is not met.

#### [Configure Custom Trigger for Dynamic Recording](#configure-custom-trigger-for-dynamic-recording)
When you configure your `target` application to load the **Cryostat Agent**, you can define one or more custom triggers that are then passed as arguments to the **Agent**.
For more information, learn how to [use the Cryostat Agent](#using-the-cryostat-agent).

#### [Options for Defining a Custom Trigger](#options-for-defining-a-custom-trigger)
You can define a custom trigger in any of the following ways:

<ol>
  <li>
    <details>
      <summary>Using a <b>JVM</b> System Property Flag</summary>
      <p>
The following example shows how to specify a simple custom trigger by using a <b>JVM</b> system property flag:
      </p>
      <pre>
  -Dcryostat.agent.smart-trigger.definitions="{"condition":"ProcessCpuLoad > 0.2", "duration":"30000", "recordingTemplate":"profile"}"
      </pre>
      <p>
      The preceding example trigger instructs the <b>Agent</b> to start a <b>JFR</b> <code>Recording</code> if the <i>ProcessCpuLoad</i> metric has a value greater than 0.2 for a duration of more than 30 seconds: This example also instructs the <b>Agent</b> to use the <i>Profile</i> event template for the <b>JFR</b> <code>Recording</code>.
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
    value: "{"condition":"ProcessCpuLoad > 0.2", "duration":"30s", "recordingTemplate":"profile"}"
      </pre>
      <p>
This example uses the same custom trigger criteria as the preceding example.
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
      This example uses the same custom trigger definition as the previous example, written to a file called trigger-definitions.txt
      </p>
    </details>
  </li>
  <li>
    <details>
      <summary>Using the Cryostat UI</summary>
    {% include howto_step.html
      summary="Navigate to the <i>Capture/Triggers</i> view"
      image-name="4.2.0/create-a-smart-trigger-1.png"
      caption="
        After navigating to the Capture/Triggers page and clicking the Create button, a form will be displayed allowing for the creation of smart triggers. Simply select the MBean Attribute for the trigger and set the condition, then select a target duration if desired and select an event template to be used. Custom event templates may be used as well as the built in templates. For more information on the available MBean Attributes, see <a href='#supported-mbean-attributes'>Supported MBean Attributes</a>.
      "
    %}
    {% include howto_step.html
      summary="View active Smart Triggers"
      image-name="4.2.0/create-a-smart-trigger-2.png"
      caption="
        Once the Smart Trigger has been created it will be displayed in the table, showing the conditions that must be met as well as the Recording Template used for starting a Recording once conditions are met. From this table, the user can filter by any of the displayed attributes (ID, duration, condition, template), for instance entering Profiling will display any active Smart Triggers using the Profiling template. Triggers may also be deleted, stopping them from activating.
      "
    %}
    </details>
  </li>
</ol>

#### [General Syntax Rules for Custom Triggers](#general-syntax-rules-for-custom-triggers)
Consider the following syntax guidelines for defining custom triggers:
<ol>
    <li>A custom trigger definition must consist of an expression that defines the overall trigger condition, a duration specifying how long the condition must be met, and the name of an event template that is used for the <b>JFR</b> <code>Recording</code>. Optionally, the trigger definition may include conditions for stopping the created recording as well as the number of times the trigger may activate.</li>
    <li>The entire trigger expression must follow a specific JSON format:
    <code>{ "condition": "constraint1(&&/||)constraint2...constraintN" ,
      "duration": "number of milliseconds" ,
      "stopCondition": "constraint1(&&/||)constraint2...constraintN",
      "stopDuration": "number of milliseconds" ,
      "recordingTemplate": "recordingTemplateNameOrLabel",
      "invocationCountTarget": "number of triggers"
    }</code>
    </li>
    <li> For example: <code>{"condition":"ProcessCpuLoad > 0.2", "duration":"30000", "recordingTemplate":"profile"}</code></li>
    <li>A <code>cpndition</code> expression can consist of one or more constraints. </li>
    <li>Each constraint must include: the name of an MBean counter; a relational operator such as <code>></code> (greater than), <code>=</code> (equal to), <code><</code>(less than), and so on; and a specified value. The type of relational operator and value that you can specify depends on the associated MBean counter type. For example: <pre>ProcessCpuLoad > 0.2</pre></li>
    <li>Constraints can be grouped together by using logical operators such as <code>&&</code> (AND), <code>||</code> (OR), or <code>!</code> (NOT) logic. For readability and clarity around the order of operations and operator precedence, grouped constraints may be enclosed in round brackets, but this is not a requirement. For example:
    <pre>
  (MetricA > value1 && MetricB < value2) || MetricC == 'stringvalue'
    </pre>
    </li>
    <li>
    The name of each MBean counter that is specified as part of a custom trigger must follow precise syntax rules in terms of spelling and capitalization.
    </li>
    <li>The <code>stopCondition</code> property follows the same syntax rules as the condition property, the difference being stopCondition specifies conditions for stopping the created recording.</li>
    <li>
    Only one <code>target</code> duration can be defined for a custom trigger. The <code>target</code> duration is applied to the entire trigger expression that is enclosed within the square brackets
    </li>
    <li>
    A <code>target</code> duration is expressed in terms of milliseconds,  For example, <code>30000</code> means 30 seconds, <code>300000</code> means five minutes and so on.
    </li>
    <li>
    A <code>target</code> duration is optional. If a <code>target</code> duration is not specified, triggering will occur immediately once the trigger conditions are met.
    </li>
    <li>
    Multiple custom trigger definitions can be specified together, each of which relates to a separate <b>JFR</b> <code>Recording</code>. Different custom trigger definitions must be separated by a comma <code>(,)</code> character. For example:
    <pre>
  {"condition":"ProcessCpuLoad>0.2","recordingTemplate":"profile"},{"condition":"ThreadCount>30","recordingTemplate":"Continuous"}
    </pre>
    </li>
    <li>
    When specifying a trigger condition, <code>triggerActivationCount</code>, <code>timeLastActivated</code>, and <code>durationSinceLastActivation</code> are optional variables that can be used in the expression. For instance <code>processCpuLoad > 0.2 && durationSinceLastActivation > 30000</code>. This example will activate when the CPU load exceeds 0.2 and the trigger hasn't previously activated in the last 30 seconds.
    </li>
    <li>
    For an example of a complete smart trigger definition:
    <code>
    {
      "condition": "(ProcessCpuLoad>0.5||SystemCpuLoad>0.25)&&HeapMemoryUsagePercent>0.1",
      "duration": "60000",
      "stopCondition":"ProcessCpuLoad<0.4",
      "stopDuration":"30000",
      "recordingTemplate": "Continuous"
    }
    </code>
    </li>
</ol>

#### [Supported MBean Attributes](#supported-mbean-attributes)

The following MBean Attributes are supported for use with Smart Triggers:

**Operating System Metrics**
- DaemonThreadCount
- ThreadCount
- AvailableProcessors
- SystemCpuLoad
- SystemLoadAverage
- ProcessCpuLoad
- TotalPhyiscalMemorySize
- FreePhysicalMemorySize
- TotalSwapSpaceSize

**Thread Metrics**
- ThreadCount
- DaemonThreadCount

**Runtime Metrics**
- StartTime
- Uptime

**Memory Metrics**
- HeapMemoryUsage
- NonHeapMemoryUsage
- HeapMemoryUsagePercent



