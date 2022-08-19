---
title: Home
layout: layouts/home.njk
---

## Kaeforest

<img style='
max-width: 250px;'
src='/static/icons/about_icon.png'/>

## Friends

{% for friend in friends %}
<a href={{friend.url}}>{{friend.name}}</a>
{% endfor %}

You <3

