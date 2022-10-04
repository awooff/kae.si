---
title: Language
description: Notes & writings on language, used as a research base.
tags: ["nav"]
layout: layouts/wiki.njk
date: 2022-08-12
---

![Language header](/static/img/cityscape.jpg)

{% for entry in collections.language | filterTagList | reverse %}
  <a href={{entry.url}}> {{entry.data.title}} </a> - <cite> {{entry.data.description}} </cite>
{% endfor %}
