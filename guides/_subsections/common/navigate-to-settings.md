{% capture navigate-to-settings-include-text %}
  The <i>Settings</i> view contains <b>web-client</b> instance configuration settings. These
  affect the appearance or behaviour of the <b>web-client</b> frontend only, not the
  behaviour of the <b>Cryostat</b> backend server. These frontend settings are persisted
  to web browser local storage only.
{% endcapture %}
{% include howto_step.html
  summary="Navigate to <i>Settings</i>"
  image-name="4.1.0/navigate-to-settings.png"
  caption="
    Click the <i>cog</i> or <i>gear</i> icon in the application masthead to access the <i>Settings</i> view.
  "
  text=navigate-to-settings-include-text
%}
