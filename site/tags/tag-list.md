---
title: Tags
description: All tags on Kaeforest.
layout: layouts/home.njk
permalink: /tags/
---

## All topics.

<div style="display: flex; overflow-x: scroll;">
{% for tag in collections.tagList %}
  {% set tagUrl %}/tags/{{ tag | slug }}/{% endset %}
  <button>
    <a href={{tagUrl | url}}>[{{tag}}]</a>
  </button>
{% endfor %}
</div>

<br/>

## All notes on Kaeforest.

{% for entry in collections.notes | filterTagList | reverse  %}
{ {{entry.data.date | readableDate}} } - <a href="{{entry.url}}"> {{entry.data.title}} </a>
{% endfor %}
