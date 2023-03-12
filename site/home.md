---
title: Home
layout: layouts/home.njk
eleventyExcludeFromNavigavtion: true
---

## Meta

Welcome to *Kaeforest*, a wiki engine for notes on [audio](/audio), [software development](/notes/dev/) and [[language]].

This site aims to be a knowledge base & general collection of notes pertaining to select values, beliefs & miscellaneous notes, which may help (mostly myself) and others record knowledge that may become useful later.

Like a late mathematician once spoke;

> "I pray that one day these works may become useful, though despite my best efforts, I can never see such happening."

## A few notes

##### See all notes [here.](/tags/)

{% for entry in collections.posts | filterTagList | reverse | head(5) %}
  { {{entry.data.date | readableDate}} } - <a href={{entry.url}}> {{entry.data.title}} </a>
{% endfor %}

## Friends

{% for friend in friends %}
  <a href={{friend.url}}>{{friend.name}}</a>
{% endfor %}
