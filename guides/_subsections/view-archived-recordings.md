## [Viewing Archived Recordings](#view-archived-recordings)
There are several ways to view <i>Archived Recordings</i>. The first method is to navigate to the Archived Recordings tab. See <a href="#archive-a-recording">Archive a Recording</a>.

### [All-Targets Archived Recordings View](#all-targets-archived-recordings-view)

The second method is to navigate to the new <i>All-Targets</i> archived recording view within the <i>Archives</i> tab on Cryostat console sidebar.

The All-Targets view gathers all of Cryostat's discovered target JVM applications into one section for ease of access. Here, we are able to interact with any archived recordings that have been saved from a source target by opening a target's nested recordings table. 

<ol>
  <li>
    {% capture navigate-to-all-targets-include-text %}
    <p>
        The option to automatically hide all targets with zero archived recordings is on by default and can be toggled. Targets can also be filtered in the search bar.
    </p>
    {% endcapture %}
    {% include howto_step.html
        summary="Navigate to the All-Targets Archived Recordings view"
        image-name="navigate-to-all-targets.png"
        caption="Click on the <i>Archives</i> tab on the sidebar, and the first tab should automatically be selected as the <i>All Targets</i> Archives view."
        text=navigate-to-all-targets-include-text
    %}

  </li>
  <li>
    {% capture click-on-source-target-include-text %}
    {% endcapture %}
    {% include howto_step.html
        summary="Select a source target application"
        image-name="view-archives-recordings-1.png"
        caption="Clicking the dropdown arrow next to a target name will list any archived recordings originating from that source target."
        text=click-on-source-target-include-text
    %}
  </li>
</ol>

### [All-Archives Archived Recordings View](#all-archives-archived-recordings-view)

The third method is to navigate to the new <i>All-Archives</i> archived recording view within the <i>Archives</i> tab on Cryostat console sidebar. 

The All-Archives view is a view which queries Cryostat's internal storage for any created archived recordings and the directories that contain them. Here, we are able to interact with any archived recordings that have been saved into storage by opening a nested recordings table within each directory.

This view is used to save any lost archived recordings in case any target JVM restarts or exits. It will be empty if no recordings are currently saved to storage.

<ol>
  <li>
    {% capture navigate-to-all-archives-include-text %}
    <p>
      Directories can be filtered in the search bar.
    </p>
    {% endcapture %}
    {% include howto_step.html
        summary="Navigate to the All-Archives Archived Recordings view"
        image-name="navigate-to-all-archives.png"
        caption="Click on the <i>Archives</i> tab on the sidebar, and select the second tab titled <i>All Archives</i>."
        text=navigate-to-all-archives-include-text
    %}

  </li>
  <li>
      {% capture click-on-directory-include-text %}
    <p>
      A directory name is related to its corresponding source target's serviceUrl. Mousing over the tooltip, we can also see a Cryostat generated hash ID for that target.
    </p>
    {% endcapture %}
    {% include howto_step.html
        summary="Select an archives directory"
        image-name="view-archives-recordings-2.png"
        caption="Clicking the dropdown arrow next to a directory name will list any archived recordings within that directory in the Cryostat storage. Again, we can interact with any archived recordings in a similar fashion as before."
        text=click-on-directory-include-text
    %}
  </li>
</ol>