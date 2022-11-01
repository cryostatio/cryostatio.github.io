## [Configure Graphical Notifications](#configure-graphical-notifications)
Actions such as starting/stopping/archiving recordings and state changes such as recordings stopping after a fixed duration
produce graphical notifications. These notifications appear both when an interactive user performs the action via the
web-client, as well as when an [Automated Rule](#create-an-automated-rule) performs the action, or when any other API
client performs the action. If many Automated Rules or other API clients are active then the notification stream within
the web-client graphical console can become quite noisy.

<ol>
  <li>
    {% include_relative _subsections/common/navigate-to-settings.md %}
  </li>
  <li>
    {% include howto_step.html
      summary="Locate the Notifications card"
      image-name="2.1.0/notifications-card.png"
      text="
        The Notifications card within this view is used to control the graphical display of notifications that
        correspond to WebSocket messages sent by the Cryostat backend when actions and state changes occur. The card
        contains a toggle switch for each category of notification, as well as a global switch to enable/disable all
        categories at once. Disabling a notification category only prevents it from appearing as a pop-up notification
        toast in the current web-client instance. The notification will still appear in the notification drawer, accessed
        by clicking the bell icon in the application masthead, and other web-client instances or API clients will still
        receive the notification to process as they will.
      "
    %}
  </li>
</ol>
