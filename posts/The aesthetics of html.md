---
title: The aesthetics of Html / Nunjucks
description: Learning to love Html (and stylus too)
tags:
  - programming
  - tech
  - webdev
---

While writing this site, we've *really* come to enjoy using __Nunjucks__. Developers over the course of many years have had to (unfortunately) write a lot of `Html` code.
And in response, have striven to write as little of it as humanly possible. (in fact doing so is a good design practice)

Through other preprocessors such as `Pug` (formerly Jade), we are provide a much cleaner experience while writing `Html`, ie:

{% raw %}

```pug
- var name = "Hiwoo!"
section#love
  .text
    p #{name} // Outputs Hiwoo!
    | How wonderful~
```

{% endraw %}

Where each `Html` element is stylized to its exact `CSS` equivalent, allowing for a lot more readability in your code, including extra nice features such as variable interlop, scoping, templating, iteration, conditional rendering, list goes on! All of which before would have required you to use an ugly mess of `Javascript`.

Using this combined with other `CSS` preprocessors such as `Stylus` (the one used in this site) can give you some *really* nice stylesheets & workflows. For example, we can add varying degrees of shading to every `n'th` child cell within a table, like so,

{% raw %}

```stylus
-table-value($exponent)
  padding $exponent
  margin 1em / $exponent 0

-theme($accent)
  color $accent
  border-color darken($accent, 0.2)

table
  // Random table rules, boring..
  td
    -table-value(1.2em)
    -theme(white)
    for iter in (0..6)
      &:nth-child({iter})
        -theme(fogra29) // Cool nesting of theme overrides!
        background hsl(iter * 2.5, iter * 6.6, 50%)
```

{% endraw %}

Or incrementally change font sizes of header tags:
{% raw %}

```stylus
text_scale_size($exponent)
  font-size (round($mobile_text_scale ** $exponent * 1000) / 1000)

for i in (1..6)
  h{i}
    text_scale_size (7 - i)
```

{% endraw %}

See? Simply just get rid of braces, semicolons & colons and your code is so much more  *a e s t h e t i c ~~~*

However, while this is all nice & good, and don't get me wrong, it most definately is, we still chose to use `Nunjucks` as our templating engine.

> But why, Kae? Why write more lines of code when you can embrace the pythonic nature of indent-based code?

Take the following snippet as an example:
{% raw %}

```jinja2
{% block content %}
<ul>
  {% for post in collections.post %}
    {% block posts %}
    <li{% if tag == post %} class="{collections.tags}"{% endif %}>
      <a href="{{post.url}}">
        {{post.data.title}}
      </a>
    </li>
    {% endblock posts %}
  {% endfor %}
</ul>
{% endblock content %}
```

{% endraw %}

While a solution to this in `Pug` would be a lot less to *write*, ultimately, this is not all that matters.
We'd argue that while this is a lot more to *read*, after having knowledge on what `Html` syntax is like, you don't *need* to read everything line by line, and instead pay attention to the indents that the code resides on, while still being easily readable at first glance.

The extra expressiveness instead of being a hindrance to legibility, improves the ultimate *a e s t h e t i c* of the code.
