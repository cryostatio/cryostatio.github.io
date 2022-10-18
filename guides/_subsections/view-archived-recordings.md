## [Viewing Archived Recordings](#view-archived-recordings)
<<<<<<< HEAD
There are two ways to view <i>Archived Recordings</i>. The first method is to navigate to the Archived Recordings tab. See <a href="#archive-a-recording">Archive a Recording</a>.

### [Archives View](#archives-view)

The second method is to navigate to the <i>Archives</i> tab on Cryostat console sidebar.

The Archives view gathers all of Cryostat's saved archived recordings into one view. Here, we are able to interact with any archived recordings that have been saved from discovered target JVMs, or that have been re-uploaded to Cryostat.

<ol>
  <li>
    {% capture navigate-to-archives-include-text %}
    <p>
        If no <i>Archived Recordings</i> are present, see <a href="#archive-a-recording">Archive a Recording</a> to create one.
    </p>
    <a href="{{ site.url }}/images/view-archives-recordings-2.png" target="_blank">
      <img src="{{ site.url }}/images/view-archives-recordings-2.png">
    </a>
    <p>
      <br>
        Here, we can also directly re-upload saved <i>Archived Recordings</i>. See <a href="#re-upload-a-recording-to-archives">Re-Upload a Recording to Archives</a> for a similar guide.
    </p>
    {% endcapture %}
    {% include howto_step.html
        summary="Navigate to the Archives view"
        image-name="view-archives-recordings-1.png"
        caption="Click on the <i>Archives</i> tab on the sidebar."
        text=navigate-to-archives-include-text
    %}
  </li>
</ol>
=======
There are several ways to view <i>Archived Recordings</i>. The first method is to navigate to the Archived Recordings tabs as mentioned in the previous section. See <a href="#archive-a-recording">Archive a Recording</a>.

### [All-Targets Archives View](#all-targets-archives-view)

The second method is to navigate to the new <i>All-Targets</i> archived recording view within the <i>Archives</i> tab on Cryostat console sidebar.

The All-Targets view is a view which gathers all of Cryostat's discovered target JVM applications into one section for ease of access. In this view, we are able to interact with any archived recordings that have been saved from a source target by opening a target's nested recordings table. 

<ol>
  <li>
    {% capture navigate-to-all-targets-include-text %}
    <p>
        Click on the <i>Archives</i> tab on the sidebar, and the first tab should automatically be selected as the <i>All Targets</i> Archives view. 
    </p>
    {% endcapture %}
    {% include howto_step.html
        summary="Navigate to the All-Targets Archived Recordings view"
        caption="The option to automatically hide all targets with zero archived recordings is on by default and can be toggled."
        image-name="navigate-to-all-targets.png"
        text=navigate-to-all-targets-include-text
    %}

  </li>
  <li>
    {% capture click-on-source-target-include-text %}
    <p>
        Clicking the dropdown arrow next to a target's alias will list any archived recordings originating from that source target.
    </p>
    {% endcapture %}
    {% include howto_step.html
        summary="Select a source target application"
        image-name="view-archives-recordings-1.png"
        text=click-on-source-target-include-text
    %}
  </li>
</ol>

### [All-Archives Archives View](#all-archives-archives-view)

The third method is to navigate to the new <i>All-Archives</i> archived recording view within the <i>Archives</i> tab on Cryostat console sidebar. 

The All-Archives view is a view which queries Cryostat's internal file-system for any archived recordings that have been created during runtime. The web-client maps the directories into nested recordings tables, laid out in rows.

A Cryostat file-system directory is created and used to store archived recordings that have been saved from an active target JVM. This view is used to save any lost archived recordings in case any target JVM expectedly or unexpectedly restarts. The view will be empty if no recordings are currently saved into the file-system.

<ol>
  <li>
    {% capture navigate-to-all-archives-include-text %}
    <p>
        Click on the <i>Archives</i> tab on the sidebar, and select the second tab titled <i>All Archives</i>.
    </p>
    {% endcapture %}
    {% include howto_step.html
        summary="Navigate to the All-Archives Archived Recordings view"
        image-name="navigate-to-all-archives.png"
        text=navigate-to-all-archives-include-text
    %}

  </li>
  <li>
      {% capture click-on-directory-include-text %}
    <p>
        Clicking the dropdown arrow next to a directory name will list any archived recordings within that directory in the Cryostat container filesystem. Again, we can interact with any archived recordings in a similar fashion as before.
    </p>
    {% endcapture %}
    {% include howto_step.html
        summary="Select an archives directory"
        image-name="view-archives-recordings-2.png"
        caption="A directory name is related to its corresponding source target's serviceUrl. Mousing over the tooltip, we can also see a Cryostat generated hash id for that target."
        text=click-on-directory-include-text
    %}
  </li>
</ol>
>>>>>>> 1d40844 (added subsection for view archived recordings)
