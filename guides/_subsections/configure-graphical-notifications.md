## [Configure Graphical Notifications](#configure-graphical-notifications)
Actions such as starting/stopping/archiving `Recordings` and state changes such as `Recordings` stopping after a fixed duration
produce graphical notifications. These notifications appear both when an interactive user performs the action via the
**web-client**, as well as when an [`Automated Rule`](#create-an-automated-rule) performs the action, or when any other API
client performs the action. If many `Automated Rules` or other API clients are active, the notification stream within
the **web-client** graphical console can become quite noisy.

<ol>
  <li>
    {% include_relative _subsections/common/navigate-to-settings.md %}
  </li>
  <li>
    {% include howto_step.html
      summary="Locate the <i>Notifications</i> Setting"
      image-name="2.3.0/notifications-setting.png"
      text="
        The <i>Notifications</i> setting within this view is used to control the graphical display of notifications that
        correspond to <code>WebSocket</code> messages sent by the <b>Cryostat</b> backend when actions and state changes occur. The setting
        contains a toggle switch for each category of notification, as well as a global switch <i>All Notifications </i>, to enable/disable all
        categories at once. Disabling a notification category only prevents it from appearing as a pop-up notification
        toast in the current <b>web-client</b> instance. The notification will still appear in the notification drawer, accessed
        by clicking the <i>bell icon</i> in the application masthead, and other <b>web-client</b> instances or API clients will still
        receive the notification to process as they will.
      "
    %}
  </li>
</ol>
