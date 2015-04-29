---
layout: master
css: docs
title: Developer Documentation
description: This is the starting point for documentation on the Okta API. If you are new, take a look at the getting started section below.
---

<div class="boundary docs docs-index">

  <div class="block title-block text-ctr">
    <h1>{{ page.title }}</h1>
    <p class="tagline">{{ page.tagline }}</p>
  </div>

  <div class="block docs-index-body"  id="main-container">
    {{ content }}
    {% for nav in site.data.docs %}
      <div class="docs-section">
        <h2>{{ nav.title }}</h2>
        <ul class="list-unstyled docs-index-list">
          {% for item in nav.pages %}
            {% for page in site.pages %}
              {% if page.layout == 'docs_page' %}
                {% assign name = page.path | replace: '.md', '' | split: '/' | last | downcase %}
                {% if name == item %}
                  <li data-name="{{ page.title }}">
                    <a href="/docs/{{ nav.section }}/{{ item }}.html">{{ page.title }}</a>
                  </li>
                {% endif %}
              {% endif %}
            {% endfor %}
          {% endfor %}
        </ul>
      </div>
    {% endfor %}
  </div>

</div>