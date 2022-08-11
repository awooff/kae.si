---
title: Dev
layout: layouts/wiki.njk
tags: ["nav"]
---

### A collection of info for software development

Here you'll find a collection of my notes on development that I've learned over the years, & hopefully you'll find some of it useful.

---

{% for post in collections.dev | filterTagList | reverse %}
  <a href={{post.url}}> {{post.data.title}} </a> - <cite> {{post.data.description}} </cite>
  <br/>
{% endfor %}
