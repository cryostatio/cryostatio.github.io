---
layout: post
title: '"Archive On Stop" feature in the Cryostat 2.2'
date: 2022-10-18
synopsis: Cryostat 2.2 New features
author: Leticia Konno
---

Hello, readers!

There is a new option by default for Custom Flight Recording creation to have the recording automatically archived on stop. 

When manually capturing a new recording in the **Recordings** tab, it is possible to select if it is going to be *Continuous* or with a fixed duration of time. Create a recording with a defined duration and keep the **Archive On Stop** option checked as below:

![Alt text](/images/archive-on-stop-1-post.png "Active Recording creation form with Archive On Stop checkbox checked")

The recording state will change from RUNNING to STOPPED when the capture is concluded and the recording is automatically archived:

![Alt text](/images/archive-on-stop-2-post.png "Recordings View displaying Active Recordings and created recording in RUNNING state")

![Alt text](/images/archive-on-stop-3-post.png "Recordings View displaying Active Recordings and created recording in STOPPED state, with a notification indicating it has been archived")

Go to the Archived Recording tab to see the recording archived:

![Alt text](/images/archive-on-stop-4-post.png "Recordings View displaying Archived Recordings with the automatically archived copy of the recording")

I hope you find this new option helpful and if you have any suggestions, comments, questions or want to contribute, feel free to connect with us on [Github](https://github.com/cryostatio).

