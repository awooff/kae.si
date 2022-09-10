---
title: Tags
description: All tags on Kaeforest.
layout: layouts/home.njk
permalink: /tags/
---

## All topics.

<div style="display: flex;">
{% for tag in collections.tagList %}
  {% set tagUrl %}/tags/{{ tag | slug }}/{% endset %}
  [{{tag}}]({{ tagUrl | url }}) |
{% endfor %}
</div>

## All notes on Kaeforest.

{% for entry in collections.posts | filterTagList | reverse  %}
  { {{entry.data.date | readableDate}} } - <a href={{entry.url}}> {{entry.data.title}} </a>
{% endfor %}
