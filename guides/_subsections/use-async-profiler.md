## [Use async-profiler](#use-async-profiler)

**Cryostat 4.2** includes basic integration with
[`async-profiler`](https://github.com/async-profiler/async-profiler).
This is a [beta-level feature](#configure-feature-level) which requires opt-in
before it is visible in the UI. The integration is also only currently
supported when interfacing with a target application
[using the **Cryostat Agent**](/docs/#using-the-cryostat-agent) - the feature
is disabled for **JMX** target connections.

In order for **Cryostat** to communicate with `async-profiler` within your
target application, you must ensure that the correct `libasyncProfiler.so` is
present in your application JVM's library path, either by using the
`-Djava.library.path` flag to set the property or by including the `.so` file
within the default path location (ex. `/usr/lib64/`) at application build time.
Additionally, the `AsyncProfilerMXBean` must be loaded and registered with your
application's platform `MXBean` server. Since `async-profiler` version 4.3 this
can be done simply by setting the `-javaagent:/path/to/async-profiler.jar`
(replace `/path/to/` with the correct in-container path location) JVM flag on
your application.

Once these prerequisites are satisfied you are ready to start using
**Cryostat** to remotely control `async-profiler` and capture its profiling
data. In this release, **Cryostat** does not provide any facilities for
archiving `async-profiler` data into object storage nor does it provide any
capabilities for analyzing `async-profiler` data. You can retrieve the profiling
session data, download it to your workstation, and analyze the data separately.

<ol>
  <li>
    {% include_relative _subsections/common/select-target-application.md %}
  </li>
  <li>
    {% include howto_step.html
      summary="Navigate to async-profiler"
      image-name="4.2.0/async-profiler-1.png"
      caption="
        Navigate to the async-profiler view. If your target application is not
        using the Cryostat Agent, or if the AsyncProfilerMXBean is not detected,
        you may see an empty state with a message explaining the apparent
        problem.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Start a profiling session"
      image-name="4.2.0/async-profiler-2.png"
      caption="
        Click the Create button to move into the profiling session creation
        form view. This view allows you to select which profiling data types
        you would like to capture, as well as to set a profiling session
        duration. Unlike Flight Recordings which may run continuously,
        async-profiler profiling sessions must have a fixed duration. Not all
        combinations of profiling data types can be captured simultaneously as
        some are mutually exclusive with others. If you attempt to create a
        session including mutually exclusive data types, Cryostat will display
        an error notification and the profiling session will not be created.
        When you are satisfied with the configuration, click the Create button
        - you may need to scroll down to see it.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Wait for the session to complete"
      image-name="4.2.0/async-profiler-3.png"
      caption="
        Once the session has been created you will be brought back to the
        session table view and the new session will be visible. Only one active
        async-profiler session may be running at one time, also in contrast to
        Flight Recorder which allows multiple concurrent recordings with
        separate configurations. Sessions cannot be stopped before the
        configured duration elapses, though they may be deleted prematurely -
        but this will result in the captured data being lost. Once the duration
        elapses the Size column of the table will populate and the State
        will update automatically.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Download and delete sessions"
      image-name="4.2.0/async-profiler-4.png"
      caption="
        After a session concludes, the action menu Download item is unlocked
        and you will be able to download the session in .jfr binary file format
        to your local workstation for independent analysis. The Create toolbar
        action button is also unlocked and you may begin a new profiling
        session.
      "
    %}
  </li>
</ol>
