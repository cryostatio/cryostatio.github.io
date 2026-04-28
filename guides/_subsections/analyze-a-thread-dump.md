## [Capture a Thread Dump](#capture-a-thread-dump)
<ol>
    <li>
      <p>
        The <i>Visualize Thread Dumps</i> page
        allows you to visualize captured thread dumps from a <code>target</code> <b>JVM</b>, looking for common problems
        and analyzing for deadlocks. Thread Dumps can be analyzed from the archives or selected from a dropdown.
      </p>
    </li>
    <li>
    {% include howto_step.html
      summary="Select a Thread Dump"
      image-name="4.2.0/analyze-a-thread-dump-1.png"
      caption="
        The dropdown menu will be populated with Thread Dumps from the archives for the currently selected target. If there are no <code>Thread Dumps</code> to source data from, capture one   then return back to this view.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Request analysis"
      image-name="4.2.0/analyze-a-thread-dump-2.png"
      caption="
        Click the analysis process button in the corner of the drawer panel.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View aggregated data"
      image-name="4.2.0/analyze-a-thread-dump-3.png"
      caption="
        Once a thread dump has been selected the view will be populated with the analyzed data. There are pie charts displaying aggregation by thread state, running methods, and lock instances. 
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View detailed thread information"
      image-name="4.2.0/analyze-a-thread-dump-4.png"
      caption="
        Once a thread dump has been selected the view will be populated with the analyzed data. There is as a table for specific patterns found in the data, and deadlocks detected as well as detailed thread information. The thread information table rows can be expanded to view the stack trace and lock instances held by a thread. 
      "
    %}
  </li>
</ol>