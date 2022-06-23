---
title: Home
layout: layouts/home.njk
---

# Hi, this is Kaelta.

![Twink breakfast](/static/img/twinkbreakfast.png)

See my work on my [bandcamp](<https://xhaart.bandcamp.com>)
Or my programming & web development on my [gitlab](<https://gitlab.com/kaelta>)

{# ![hihi :>](./img/juuzo.jpg) #}

## Friends

{% for friend in friends %}
<a href={{friend.url}}>{{friend.name}}</a>
{% endfor %}

You <3

