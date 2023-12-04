## [Using Smart Triggers](#using-smart-triggers)
Cryostat 2.4 agent supports custom triggers that are based on MBean metric values. You can configure Cryostat agent to start JFR recordings dynamically when these custom trigger conditions are met.

You can set up a custom trigger condition in Cryostat to initiate Java Flight Recorder (JFR) recordings dynamically. This trigger condition is based on MBean counters, covering various runtime, memory, thread, and OS metrics. The condition includes MBean counter types and allows specifying a duration for the trigger to activate only if the specified values persist for that duration. Cryostat's agent supports smart triggers, which continuously monitor MBean counter values. When the current values match the configured conditions for the specified duration, the trigger initiates a JFR recording dynamically through the Cryostat agent.

**NOTE:** A JFR recording will not start dynamically if the custom trigger condition associated with this recording is not met.

#### [Configure Custom Trigger for Dynamic Recording](#configure-custom-trigger-for-dynamic-recording)
When you configure your target application to load the Cryostat agent, you can define one or more custom triggers that are then passed as arguments to the agent.
For more information see [Using-the-Cryostat-Agent](#using-the-cryostat-agent).

#### [Defining a Custom Trigger](#defining-a-custom-trigger)
You can define a custom trigger in any of the following ways:

<ol>
  <li>
    
  </li>
  </ol>
