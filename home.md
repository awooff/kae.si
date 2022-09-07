---
title: Home
layout: layouts/home.njk
eleventyExcludeFromNavigavtion: true
---

<h2> Meta </h2>

<p>
  Welcome to Kaeforest, a wiki engine for notes on
  <a href="/audio">music</a>,
  <a href="/dev">software development</a>,
  and <a href="/language">language</a>.
<p>

<img style='
max-width: 250px;'
src='/static/icons/about_icon.png'/>

<h2> Friends </h2>

{% for friend in friends %}
  <a href={{friend.url}}>{{friend.name}}</a>
{% endfor %}

<h2> A few notes </h2>
{% for entry in collections.posts | filterTagList | reverse | head(-8) %}
  { {{entry.data.date}} } - <a href={{entry.url}}> {{entry.data.title}} </a>
{% endfor %}
