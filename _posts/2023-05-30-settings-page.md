---
layout: post
title: Using the improved settings page in Cryostat 2.3.0
date: 2023-05-30
synopsis: Read about the new configurable settings in Cryostat 2.3.0.
author: Max Cao
---

#### Table of Contents
* auto-gen TOC:
{:toc}
<hr>

Hello readers!

Cryostat 2.3 introduces an improved settings page that offers a wide range of configuration options to optimize the application and tailor it to your specific needs. Whether you need to adjust the theme, language, date locale, or other settings, the settings page provides a user-friendly interface that makes it easy to fine-tune Cryostat to your liking.

### [Settings Page](#settings-page)
Click the cog icon on the upper right corner of the web interface to take you to the General tab of the settings page.

#### [General](#general)
![General settings tab](/images/blog/settings-page-general.png)
The **General** settings tab is where you can adjust various general settings to tailor your experience with the application. You can select a preferred theme, the date locale, and the current timezone.
##### [Theme](#theme)
Allows you to configure the theme of the Cryostat UI. Currently Cryostat only supports the Light and Dark theme. The web page defaults to `Auto` which defaults to the current theme of the browser you are working with.
##### [Date & Time](#date-time)
Allows you to configure the current date locale, as well as the current timezone for more accurate analysis on any time-dependent data.

#### [Connectivity](#connectivity)
![Connectivity settings tab](/images/blog/settings-page-connectivity.png)
The **Connectivity** settings tab allows you to configure settings related to the Cryostat web client and its WebSocket connection to the Cryostat server.
##### [WebSocket Connection Debounce](#websocket-connection-debounce)
This setting allows you to configure the retry interval for establishing WebSocket connections. Increase this time if the web-interface repeatedly displays WebSocket connection/disconnection messages. Decrease this time if the web-interface takes a long time to populate on startup.
##### [Auto-Refresh](#auto-refresh)
Sets the refresh period for content views. Views normally update dynamically via WebSocket notifications, so this should not be needed unless WebSockets are not working.

#### [Notifications & Messages](#notifications-messages)
![Notifications & Messages settings tab](/images/blog/settings-page-notifications&messages.png)
The **Notifications & Messages** tab allows you to configure settings related to the dynamic status notifications that pop up in the web interface.
##### [Notifications](#notifications)
Here you can enable/disable notifications (enabled by default). By clicking **Show more** you can filter which type of notifications you want to receive. You may also control the maximum number of notification alerts that appear at once.
##### [Show Deletion Dialogs](#show-deletion-dialogs)
When deleting important resources such as recordings, Cryostat displays confirmation dialogs to confirm the deletion. You can control whether these dialogs are displayed or not and adjust each deletion warning category to your liking.

#### [Dashboard](#dashboard)
![Dashboard settings tab](/images/blog/settings-page-dashboard.png)
The **Dashboard** tab allows you to configure settings related to the Dashboard. 
##### [Automated Analysis Recording Configuration](#automated-analysis-recording-configuration)
The `Template` field allows you to specify the recording template to be used for automated analysis recordings. Meanwhile, the max-age and max-size fields set a limit on the recording's size and duration. Depending on how recent you want events to be recorded from the analysis, you may want to adjust the max-age and max-size values accordingly. Click the pencil icon on the settings card to edit the recording template.

{% include tip.html 
text="We strongly recommend setting a maximum age and/or maximum size for your recordings. If the recording becomes too large or lasts for too long, it may cause the analysis report generation to fail." %}

##### [Dashboard Metrics Configuration](#dashboard-metrics-configuration)
We can configure the period between data refreshes for dashboard metric cards. Individual metrics cards may still request updates on a faster cycle, but the client application instance will throttle update requests to the server according to this setting. Depending on the performance of your machine and network, you may choose a longer minimum period to avoid overloading the application, or a shorter period if you prefer to have no throttling and allow quicker update frequency.

#### [Advanced](#advanced)
![Advanced settings tab](/images/blog/settings-page-advanced.png)
Finally, the **Advanced** settings tab provides access to more advanced configurations and options for Cryostat.
##### [Credentials Storage](#credentials-storage)
When attempting to connect to a target application that requires authentication, a prompt will appear asking for credentials to complete the connection. You have the option to choose where to store these credentials.
* **Backend**: If you select `Backend`, the credentials will be stored in Cryostat's backend encrypted storage. 
* **Session (Browser Memory)**: If you select `Session (Browser Memory)`, the credentials will instead be cached within browser memory for the duration of the session. Cryostat will pass authentication headers and completely bypass the backend storage of credentials. 

It is important to note that any credentials added through the `Security` panel will always be stored in Cryostat's backend encrypted storage.
##### [Feature Level](#feature-level)
This setting allows you to enable graphical features that are still in beta and not yet ready for production use. If interested, feel free to explore these features. If you encounter any issues, please report them on our [GitHub Issues page](https://github.com/cryostatio/cryostat-web/issues).

### [Conclusion](#conclusion)
This concludes the Settings page in Cryostat 2.3. We are constantly working on new features to enhance your experience with Cryostat and provide even more powerful capabilities. Stay tuned for future updates and releases!
