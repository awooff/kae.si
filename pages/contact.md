---
title: Contact
description: Where to find us
order: 4
layout: layouts/home.njk
---

## Email

`curl https://kae.si/static/content/key.asc`

And our address is ~ <a href="mailto:{{site.author.email}}">here!</a>

m (at) kae (dot) si

## Socials

{% for link in links %}

<a class='link' href="{{link.url}}"> {{link.name}} - {{link.user}} </a>

{% endfor %}

## Discord / IRC

Jxnosila.#4086

Kae@irc.kae.si#6677
