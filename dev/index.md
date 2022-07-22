---
title: Dev
layout: layouts/wiki.njk
tags: ["nav"]
---

## A collection of info for software development

{% for post in collections.dev | filterTagList | reverse %}
  <a href={{post.url}}> {{post.data.title}} </a>
{% endfor %}


