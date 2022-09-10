---
title: Dev
description: Software development is a way of expressing our thoughts & ideals through code.
layout: layouts/wiki.njk
tags: ["nav"]
---

![Zankyou no Terror programming gif](/static/img/fcntl_code.gif)

---

{% for post in collections.dev | filterTagList | reverse %}
  <a href={{post.url}}> {{post.data.title}} </a> - <cite> {{post.data.description}} </cite>
{% endfor %}
