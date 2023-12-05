## [Using Smart Triggers](#using-smart-triggers)
Cryostat 2.4 agent supports custom triggers that are based on MBean metric values. You can configure Cryostat agent to start JFR recordings dynamically when these custom trigger conditions are met.

You can set up a custom trigger condition in Cryostat to initiate Java Flight Recorder (JFR) recordings dynamically. This trigger condition is based on MBean counters, covering various runtime, memory, thread, and OS metrics. The condition includes MBean counter types and allows specifying a duration for the trigger to activate only if the specified values persist for that duration. Cryostat's agent supports smart triggers, which continuously monitor MBean counter values. When the current values match the configured conditions for the specified duration, the trigger initiates a JFR recording dynamically through the Cryostat agent.

**NOTE:** A JFR recording will not start dynamically if the custom trigger condition associated with this recording is not met.

#### [Configure Custom Trigger for Dynamic Recording](#configure-custom-trigger-for-dynamic-recording)
When you configure your target application to load the Cryostat agent, you can define one or more custom triggers that are then passed as arguments to the agent.
For more information see [Using-the-Cryostat-Agent](#using-the-cryostat-agent).

#### [Options for Defining a Custom Trigger](#options-for-defining-a-custom-trigger)
You can define a custom trigger in any of the following ways:

<ol>
  <li>
    <details>
      <summary>Appending a Custom Trigger to the Cryostat Agent’s JAR File Path</summary>
      <p>
The following example shows how to append a simple custom trigger to the Cryostat agent’s JAR file path:
      </p>
      <pre>
      JAVA_OPTS="-javaagent:/deployments/app/cryostat-agent-shaded.jar=[ProcessCpuLoad > 0.2 ;
      TargetDuration > duration("30s")]~profile"
      </pre>
      <p>
      The preceding example trigger instructs the agent to start a JFR recording if the ProcessCpuLoad metric has a value greater than 0.2 for a duration of more than 30 seconds: This example also instructs the agent to use the profile event template for the JFR recording.
      </p>
    </details>
  </li>
  <li>
    <details>
      <summary>Using a JVM system property flag</summary>
      <p>
The following example shows how to specify a simple custom trigger by using a JVM system property flag:
      </p>
      <pre>
      JDcryostat.agent.smart-trigger.definitions="[ProcessCpuLoad > 0.2 ;
      TargetDuration > duration(\"30s\")]~profile"
      </pre>
      <p>
      This example uses the same custom trigger criteria as the preceding example.
      </p>
    </details>
  </li>
  <li>
    <details>
      <summary>Using an environment variable</summary>
      <p>
The following example shows how to specify a simple custom trigger by using an environment variable:
      </p>
      <pre>
      - name: CRYOSTAT_AGENT_SMART_TRIGGER_DEFINITIONS
        value: "[ProcessCpuLoad > 0.2 ;
        TargetDuration > duration(\"30s\")]~profile"
      </pre>
      <p>
This example uses the same custom trigger criteria as the preceding examples.
      </p>
    </details>
  </li>
</ol>

#### [General Syntax Rules for Custom Triggers](#general-syntax-rules-for-custom-triggers)
Consider the following syntax guidelines for defining custom triggers:
<ol>
    <li>A custom trigger definition must consist of both an expression that defines the overall trigger condition and the name of an event template that is used for the JFR recording.</li>
    <li>The entire trigger expression must be enclosed in square brackets. For example: <pre>[ProcessCpuLoad > 0.2 ; TargetDuration < duration("30s")]</pre></li>
    <li>The name of the event template must be defined after the trigger expression and preceded by a tilde <code>(~)</code> character. For example: <pre>~profile</pre></li>
    <li>A trigger expression can consist of one or more constraints and a target duration. The set of constraints and target duration must be separated by a semicolon <code>(;)</code> character.</li>
    <li>Each constraint must include: the name of an MBean counter; a relational operator such as <code> ></code> (greater than), <code>=</code> (equal to), <code> < </code>(less than), and so on; and a specified value. The type of relational operator and value that you can specify depends on the associated MBean counter type. For example: <pre>ProcessCpuLoad > 0.2</pre></li>
    <li>Constraints can be grouped together by using logical operators such as <code>&&</code> (AND), <code>|| </code> (OR), or <code> ! </code> (NOT) logic. For readability and clarity around the order of operations and operator precedence, grouped constraints may be enclosed in round brackets, but this is not a requirement. For example:
    <pre>
    [(MetricA > value1 && MetricB < value2) || MetricC == 'stringvalue' ;
    TargetDuration > duration("30s")]
    </pre>
    </li>
    <li>
    The name of each MBean counter that is specified as part of a custom trigger must follow precise syntax rules in terms of spelling and capitalization.
    </li>
    <li>
    Only one target duration can be defined for a custom trigger. The target duration is applied to the entire trigger expression that is enclosed within the square brackets
    </li>
    <li>
    A target duration can be expressed in terms of seconds, minutes, or hours. For example, <code>30s</code> means 30 seconds, <code>5m</code> means five minutes, <code>2h</code> means two hours, and so on.
    </li>
    <li>
    A target duration is optional. If a target duration is not specified, triggering will occur immediately once the trigger conditions are met.
    </li>
    <li>
    Multiple custom trigger definitions can be specified together, each of which relates to a separate JFR recording. Different custom trigger definitions must be separated by a comma <code>(,)</code> character. For example:
    <pre>
    [ProcessCpuLoad>0.2]~profile,[ThreadCount>30]~Continuous
    </pre>
    </li>
</ol>
