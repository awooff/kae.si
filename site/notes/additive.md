---
title: Additive Synthesis
description: Additive Synthesis is the foundation of modern sound design.
date: 2022-08-25
tags: 'audio'
---

<https://en.wikipedia.org/wiki/Additive_synthesis>

Additive synthesis works by composing sound through the combination of sine (or other) sound waves & files.
Through this technique you can technically generate literally any sound imaginable,
and even the vocoded human voice.

Essentially, it works by analyzing the waveforms of any given sound file & using a [[Fourier Transform]]
to plot an incoming linear signal into an oscillator graph composed of thousands of sine waves, in turn approximating the original source to a high degree of accuracy.

In the use of practical music production, we can use this technique to create our own synth patches that
use a combination of different sine waves; for example, layer a synthesized white noise underneath a tambourine,
or a kick drum to create a more textured sound, as noted below;

<audio
  controls
  source="/static/media/additive_example.mp3"
/>

<iframe
  width="560"
  height="315"
  src="https://invidious.flokinet.to/embed/YXsH2b3QWi8"
  title="Additive Synthesis Example"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
>
</iframe>
