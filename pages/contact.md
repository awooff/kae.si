---
title: Contact
description: Where to find us
order: 4
---

## Email

`curl https://kae.si/static/content/key.asc`

And our address is ~ <a href="mailto:{{site.author.email}}">here!</a>

## Socials

{% for link in links %}

<a class='link' href="{{link.url}}"> {{link.name}} - {{link.user}} </a>

{% endfor %}

## Discord / IRC

Jxnosila.#4086

kori@lainchan.org#6677
