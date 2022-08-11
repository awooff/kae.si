---
title: Xhaart
description: Selected audio works & production
permalink: /audio/
tags: ["nav", "audio"]
---

## h.x.r.†

...explores modernized avenues of British rave, gabber, garage and drum & bass music.

![Ouroboros](/static/img/vx_underground.jpg)

{% for track in music %}
  <h4> {{track.title}} </h4>
  {{track.content | safe}}
{% endfor %}
