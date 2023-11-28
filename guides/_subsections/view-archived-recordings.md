## [Viewing Archived Recordings](#viewing-archived-recordings)
There are several ways to view <code>Archived Recordings</code>. The first method is to navigate to the <i>Archived Recordings</i> tab. See <a href="#archive-a-recording">Archive a Recording</a>.

### [All-Targets Archived Recordings View](#all-targets-archived-recordings-view)

The second method is to navigate to the <i>All-Targets</i> archived recording view within the <i>Archives</i> tab on <b>Cryostat</b> console sidebar.

The <i>All-Targets</i> view gathers all of <b>Cryostat's</b> discovered <code>target</code> <b>JVM</b> applications into one section for ease of access. Here, we are able to interact with any <code>Archived Recordings</code> that have been saved from a source <code>target</code> by opening a target's nested recordings table.

<ol>
  <li>
    {% capture navigate-to-all-targets-include-text %}
    <p>
        The option to automatically hide all <code>targets</code> with zero <code>Archived Recordings</code> is on by default and can be toggled. <code>Targets</code> can also be filtered in the search bar.
    </p>
    {% endcapture %}
    {% include howto_step.html
        summary="Navigate to the <i>All-Targets</i> Archived Recordings view"
        image-name="2.3.0/navigate-to-all-targets.png"
        caption="Click on the <i>Archives</i> tab on the sidebar, and the first tab should automatically be selected as the <i>All Targets</i> Archives view."
        text=navigate-to-all-targets-include-text
    %}

  </li>
  <li>
    {% capture click-on-source-target-include-text %}
    {% endcapture %}
    {% include howto_step.html
        summary="Select a Source Target Application"
        image-name="2.3.0/view-archives-recordings-1.png"
        caption="Clicking the <i>dropdown arrow</i> next to a <code>target</code> name will list any <code>Archived Recordings</code> originating from that source <code>target</code>."
        text=click-on-source-target-include-text
    %}
  </li>
</ol>

### [All-Archives Archived Recordings View](#all-archives-archived-recordings-view)

The third method is to navigate to the <i>All-Archives</i> <code>Archived Recording</code> view within the <i>Archives</i> tab on **Cryostat** console sidebar.

The *All-Archives* view is a view which queries **Cryostat's** internal storage for any created `Archived Recordings` and the directories that contain them. Here, we are able to interact with any `Archived Recordings` that have been saved into storage by opening a nested recordings table within each directory.

This view is used to save any lost `Archived Recordings` in case any `target` **JVM** restarts or exits. It will be empty if no <code>Recordings</code> are currently saved to storage.

<ol>
  <li>
    {% capture navigate-to-all-archives-include-text %}
    <p>
      Directories can be filtered in the search bar.
    </p>
    {% endcapture %}
    {% include howto_step.html
        summary="Navigate to the <i>All-Archives</i> <code>Archived Recordings</code> View"
        image-name="2.3.0/navigate-to-all-archives.png"
        caption="Click on the <i>Archives</i> tab on the sidebar, and select the second tab titled <i>All Archives</i>."
        text=navigate-to-all-archives-include-text
    %}

  </li>
  <li>
      {% capture click-on-directory-include-text %}
    <p>
      A directory name is related to its corresponding source <code>target's serviceUrl</code>. Mousing over the tooltip, we can also see a <b>Cryostat</b> generated <code>hash ID</code> for that <code>target</code>.
    </p>
    {% endcapture %}
    {% include howto_step.html
        summary="Select an <i>Archives</i> directory"
        image-name="2.3.0/view-archives-recordings-2.png"
        caption="Clicking the <i>dropdown</i> arrow next to a directory name will list any <code>Archived Recordings</code> within that directory in the <b>Cryostat</b> storage. Again, we can interact with any <code>Archived Recordings</code> in a similar fashion as before."
        text=click-on-directory-include-text
    %}
  </li>
</ol>
