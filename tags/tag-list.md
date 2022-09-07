---
title: Tags
description: All tags on Kaeforest.
layout: layouts/home.njk
permalink: /tags/
---

<h2> All topics. </h2>

<div style="display: flex;">
{% for tag in collections.tagList %}
  {% set tagUrl %}/tags/{{ tag | slug }}/{% endset %}
  [{{tag}}]({{ tagUrl | url }}) |
{% endfor %}
</div>

<h2> All notes on Kaeforest. </h2>
{% for entry in collections.posts | filterTagList | reverse  %}
  { {{entry.data.date}} } - <a href={{entry.url}}> {{entry.data.title}} </a>
{% endfor %}



