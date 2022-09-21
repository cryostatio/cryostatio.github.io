{% capture navigate-to-settings-include-text %}
<p>
  The Settings view contains web-client instance configuration settings. These
  affect the appearance or behaviour of the web-client frontend only, not the
  behaviour of the Cryostat backend server. These frontend settings are persisted
  to web browser local storage only.
</p>
{% endcapture %}
{% include howto_step.html
  summary="Navigate to Settings"
  image-name="navigate-to-settings.png"
  caption="
    Click the cog or gear icon in the application masthead to access the Settings view.
  "
  text=navigate-to-settings-include-text
%}
