## [Combining Archived Recordings](#combining-archived-recordings)

After collecting a series of `archived recordings`, for example via [`Automated Rule`](#create-an-automated-rule)
or [`Agent Harvester`](/docs/#configure-the-agent-harvester), you may realize that
some types of analyses work better over larger numbers of `Flight Recorder`
events or over a longer span of time. Consider a scenario where you have
collected 12 `archived recordings` from a `target`, one per every 5 minutes,
each one containing 7.5 minutes' worth of events, and you are attempting to
diagnose an apparent slow memory leak in the application. From external
high-level observability metrics you can see that the application's memory
usage rises steadily over time, and from the container's event log you can see
that it is `OOMKill`ed (OutOfMemory) roughly every 2 hours under average load.
From a 5 minute data sample there may not be enough information to definitively
trace which object type is consuming the most heap or from where it is
allocated. However, the full hour of data that you have collected *should*
illuminate the issue when viewed in full.

For this purpose, **Cryostat** offers the `Recording Synthesis` feature. This
allows you to *synthesize* a new `archived recording` from a series of
already-existing `archived recording` files collected from a single target
application. The resulting `synthetic recording` is a plain `archived recording`
file like any other, and can be analyzed or interacted with just the same.

<ol>
  <li>
    {% include_relative _subsections/common/select-target-application.md %}
  </li>
  <li>
    {% include howto_step.html
      summary="Navigate to the Flight Recorder Archives view"
      image-name="4.3.0/recording-synthesis-1.png"
      caption="
        Navigate to <code>Flight Recorder > Analyze > Archives</code>
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Click the Synthesize button"
      image-name="4.3.0/recording-synthesis-2.png"
      caption="
        The Synthesize toolbar button is also available in the <code>All Archives</code>
        table. Within the <code>Targets</code> table, if you do not select a target
        application, a cog icon appears beside each target table row which performs
        the same function.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Select or enter a timeframe"
      image-name="4.3.0/recording-synthesis-3.png"
      caption="
        Select one of the presets to quickly set a timeframe from the present
        moment stretching back by the selected duration, or enter specific
        start and end timestamps. The table rows become shaded to indicate which
        candidate recordings will be synthesized together to form the new
        recording file. If the selected timeframe cannot be fully satisfied
        the UI will display a warning, but the operation will proceed and
        result in a file containing as much data as was available. If there
        is any one single existing recording which already covers the entire
        timeframe given, then the request will be accepted but no synthetic
        recording will be created. If there is no available data within the
        requested timeframe then the operation will fail. If the start or end
        timestamp falls anywhere within the time span covered by a recording,
        then that recording <b>is</b> selected as a candidate to ensure that
        the requested range is fully covered, so the resulting recording may
        incude event data from before the given start timestamp or after the
        given end timestamp. The optional tag field can be set to influence the
        filename assigned to the new synthetic recording. Take note that the
        candidate recordings are combined by simple JFR file concatenation and
        there is no deduplication or other filtering applied. Duplicated chunks
        and events are handled at parse time rather than at construction time.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Submit the request"
      image-name="4.3.0/recording-synthesis-4.png"
      caption="
        Click the <code>Submit</code> button. The result may take some time
        to appear, depending on the size of the candidate recordings, the
        speed of network connection between Cryostat and its object storage
        (in particular if external storage is configured), and the speed of the
        local temporary storage attached to the Cryostat container. Once the
        operation completes the table will automatically update and include the
        new synthetic recording, which can be identified by the
        <code>synthetic=true</code> label which is automatically applied.
      "
    %}
  </li>
</ol>
