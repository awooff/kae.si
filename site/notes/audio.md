---
title: Audio
description: Selected audio works & production.
permalink: /audio/
date: 2022-04-12
tags:
  - nav
  - pages
---

## h.x.r.†

...explores modernized avenues of British rave, gabber, garage and drum & bass music.

![Ouroboros](/static/img/vx_underground.jpg)

{% for track in music %}
  <h4> {{track.title}} </h4>
  {{track.content | safe}}
{% endfor %}

{% for post in collections.audio %}
  <a href="{{post.url}}"> {{post.data.title}} </a> - <o> {{post.data.description}} </o>
{% endfor %}
