## [Analyze a Heap Dump](#analyze-a-heap-dump)
<ol>
    <li>
      <p>
        The <i>Visualize Heap Dumps</i> page
        allows you to visualize captured heap dumps from a <code>target</code> <b>JVM</b>, looking for common problems
        and analyzing for wasted memory. Heap Dumps can be analyzed from the archives or selected from a dropdown.
      </p>
    </li>
    <li>
    {% include howto_step.html
      summary="Navigate to the Analysis Page"
      image-name="4.2.0/analyze-a-heap-dump-1.png"
      caption="
        Navigate to the Analyze Heap Dumps page below the Heap Dump Archives to begin.
      "
    %}
    {% include howto_step.html
      summary="Select a Heap Dump"
      image-name="4.2.0/analyze-a-heap-dump-2.png"
      caption="
        The dropdown menu will be populated with Heap Dumps from the archives for the currently selected target. If there are no <code>Heap Dumps</code> to source data from, capture one then return back to this view. For more information on capturing Heap Dumps, see <a href='#capture-a-heap-dump'>Capture a Heap Dump</a>.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Request analysis from the Heap Dump Archives"
      image-name="4.2.0/analyze-a-heap-dump-3.png"
      caption="
        Alternatively, Click the Analyze Heap Dump button in the dropdown for a Heap Dump in the archives to pre-select it in the Analysis page. If there are no <code>Heap Dumps</code> to source data from, capture one then return back to this view. For more information on capturing Heap Dumps, see <a href='#capture-a-heap-dump'>Capture a Heap Dump</a>. 
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View basic statistics"
      image-name="4.2.0/analyze-a-heap-dump-4.png"
      caption="
        Once a heap dump has been selected the view will be populated with the analyzed data. The initial page contains cards detailing a number of basic statistics about the captured memory. Under Fundamental Statistics, this includes aggregated totals of various types of memory objects, such as Arrays and Object Instances, as well as memory properties such as Object Header Size and Pointer Size. Under Compressible String Stats and Duplicate String Stats, the number of Strings contained in memory is shown as well as a detailed breakdown of the type of Strings present with how much memory they consume. Finally, the Object Histogram provides a breakdown of the number of classes and objects in memory, as well as how many are empty or single fields.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View Null and Near Null Problem Fields"
      image-name="4.2.0/analyze-a-heap-dump-5.png"
      caption="
        The Null Problem Fields and Near Null Problem Fields views provide a breakdown of objects that are consuming memory by declaring fields that are empty. Each Object displayed in the table can be expanded to view which fields were found to be empty and how much memory is being consumed by each. The Problem Type column identifies the type of finding for each problematic object, in this case either NO_FIELDS to indicate High overhead due to fields that are non-existent, and SOME_FIELDS_EMPTY to indicate high overhead due to some or all fields being null/zero/non-existent. Hovering over the problem type will display a tooltip with more information.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View High or Full Bytes Problem Fields"
      image-name="4.2.0/analyze-a-heap-dump-6.png"
      caption="
        The High Bytes Problem Fields and Full Bytes Problem Fields views provide a breakdown of objects that are consuming memory by declaring primitive fields that are unused. Entries in the table can be expanded to show the fields responsible for the memory usage, how much memory each uses, as well as the class that declares them. Similarly to the null and near null problem fields, each entry will have a Problem Type indicating the type of problem the analysis found. In this case SOME_FIELDS_UNUSED_HI_BYTES indicates high overhead due to primitive fields reserving a high number of unused bytes. Hovering over the problem type will display a tooltip with more information.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View Detailed Object Histogram"
      image-name="4.2.0/analyze-a-heap-dump-7.png"
      caption="
        The Object Histogram view provides a detailed breakdown of every class found in the heap memory, the number of instances of each, and the total memory footprint of each class. The memory footprint is broken down into inclusive and shallow size. Shallow size refers to the amount of memory consumed by the object instance itself, excluding the contents of any objects it refers to. In contrast, inclusive size refers to the amount of memory consumed by the object instance as well as any memory consumed by the objects that it may directly or indirectly reference.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View Collections"
      image-name="4.2.0/analyze-a-heap-dump-8.png"
      caption="
        The Collections view provides a detailed breakdown of every problematic collection found in the heap memory, the class declaring each, the total memory footprint of each collection, the number of problematic objects contained in each collection type, and the number of non problematic collections of that type. Expanding the collection will show detailed information on the objects that are consuming large amounts of memory. The class, memory overhead, number of instances, and problem type will be shown. Hovering over the problem type will provide a tooltip with detailed information on what the identified problem means. In this case, LENGTH_ZERO and LENGTH_ONE indicate standalone arrays of length 0 or 1 that are wasting memory.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View Collections"
      image-name="4.2.0/analyze-a-heap-dump-9.png"
      caption="
        The Collections view provides a detailed breakdown of every problematic collection found in the heap memory, the class declaring each, the total memory footprint of each collection, the number of problematic objects contained in each collection type, and the number of non problematic collections of that type. Expanding the collection will show detailed information on the objects that are consuming large amounts of memory. The class, memory overhead, number of instances, and problem type will be shown. Hovering over the problem type will provide a tooltip with detailed information on what the identified problem means. In this case, LENGTH_ZERO and LENGTH_ONE indicate standalone arrays of length 0 or 1 that are wasting memory.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View Duplicate Arrays"
      image-name="4.2.0/analyze-a-heap-dump-10.png"
      caption="
        The Duplicate Arrays view provides a detailed breakdown of memory wasted by storing duplicated arrays. Each entry in the table shows the field and class declaring the duplicate arrays, the memory consumed by each, and the number of duplicated and non-duplicate arrays being declared by each class and field combination. Expanding a row will show the value of the duplicated arrays for each class and field combination and how many copies there are of each.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="View Duplicate Strings"
      image-name="4.2.0/analyze-a-heap-dump-11.png"
      caption="
        The Duplicate Strings view provides a detailed breakdown of memory wasted by storing duplicated strings. Each entry in the table shows the field and class declaring the duplicate strings, the memory consumed by each, the number of duplicated strings, the amount of memory consumed internally by char arrays for those strings, and the number of non-duplicate strings being declared by each class and field combination. Expanding a row will show the value of the duplicated strings for each class and field combination and how many copies there are of each.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Class Loader Charts"
      image-name="4.2.0/analyze-a-heap-dump-12.png"
      caption="
        The Class Loader Class and Class Loader Instance views provide a simple pie chart displaying the number of classes and object instances loaded by each Class Loader found in heap memory.
      "
    %}
  </li>
</ol>