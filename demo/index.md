---
layout: demo
---

<div style="margin: 0px 1em 2em 1em;">
On this page you can play with a live demo of the Cryostat Web UI. This runs entirely in your browser and does not access any real Cryostat backend server instances.
Core JFR functionality is not available in this stubbed out demo, but you can use this to get a sense of what features Cryostat offers and what it looks like.
Try clicking on the `Topology` navigation menu item after the view below loads.
</div>

<div style="position: relative;">
  <div
    id="loading"
    style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; align-items: center; display: flex; justify-content: center">
      Demo loading...
  </div>
  <iframe
    id="demo-frame"
    src="{{ "/assets/demo/site/index.html" | relative_url }}"
    style="opacity: 0; max-width: initial !important; width: 99%; height: 54em; margin: 0px 10px 0px 10px; border: none">
  </iframe>
</div>
<script>
    var loading = document.getElementById("loading");
    var frame = document.getElementById("demo-frame");
    frame.addEventListener("load", function() {
        loading.style.display = "none";
        frame.style.opacity = 1;
    });
</script>
