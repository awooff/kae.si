---
title: Home
layout: layouts/home.njk
eleventyExcludeFromNavigavtion: true
---

<h2> Meta </h2>

Welcome to Kaeforest, a wiki engine for notes on [audio](/audio), [software development](/notes/dev/) and [[language]].


<img style='
max-width: 250px;'
src='/static/icons/about_icon.png'/>

## A few notes

##### See all notes [here.](/tags/)

{% for entry in collections.posts | filterTagList | reverse | head(5) %}
  { {{entry.data.date | readableDate}} } - <a href={{entry.url}}> {{entry.data.title}} </a>
{% endfor %}

## Friends

{% for friend in friends %}
  <a href={{friend.url}}>{{friend.name}}</a>
{% endfor %}
