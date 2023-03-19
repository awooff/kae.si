---
title: Contact
description: Where to find us
layout: layouts/home.njk
---

## Email

`curl https://kae.si/static/content/key.asc`

And our address is ~ <a href="mailto:{{site.author.email}}">here!</a>

m (at) kae (dot) si

## Socials

{% for link in links %}
<a href={{link.url}}>{{link.user}} on {{link.name}}</a>
{% endfor %}