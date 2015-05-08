---
layout: blog_post
title: Okta Software Engineering Design Principles
author: jon_todd
tags: [software_engineering, architecture, design_principles]
---

## Provide Value to Your Users

First and foremost, writing software is about creating value for users. This seems pretty straight forward, but as systems evolve and become more complex we start to introduce more abstraction and layering which brings us further away from the concrete problems. It's important to keep in mind the reason you're writing software in the first place and use the understanding of your audience to inform priority.

At Okta our #1 core value is [customer success](https://www.okta.com/customers/focus-on-customer-success.html) which means not just engineering but everyone in the company is aligned and making decisions where we put customer value first.

--Incremental vs Iterative --

![xkcd - pass the salt](http://imgs.xkcd.com/comics/the_general_problem.png)

## Keep it Simple

This is a truism that’s been around for ages and it goes hand in hand with the first principle.

>   Everything should be made as simple as possible, but no simpler — Albert Einstein 

We all know bad code when we see it, but reasoning about what actually makes for good code is more complex and an area with a lot of prior art. A great place to start on this topic is [Clean Code](http://books.google.com/books?id=dwSfGQAACAAJ) by Robert C. Martin aka Uncle Bob. The book provides a framework for understanding what makes code good and provides perspectives from a number of high profile developers.

Here are some guiding principles about writing clean code which are covered in the book.

* Clean code makes intent clear, use comments when code isnt' expressive enough
* It can be read and enhanced by others (or the author after a few years)
* It provides one way, rather than many, to do a particular task
* It is idomatic
* It is broken into pieces which each do one thing and do it well

Bubbling a layer up from the code and looking at software as a system, we all know that it become inherently more complex as it grows and evolves. These are some of the strategies we use to deal with the growing complexity:

* hide implementation details from clients behind well defined, minimal APIs
* make modularity cheap by using tools for dependency management and artifact discovery
* keep modules small and purposeful, break them up early
* modularized monoliths allow for learning the domain before pulling out to separate services
* microservices lower friction and separate deployment lifecyle but require more devops investment

Finally, getting even more general still, we look back to the first principle of providing value to our users. If it doesn’t add value today, [you ain’t gonna need it](http://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)!

![wtfs per minute](/assets/img/code_quality_wtfs_per_minute.jpg)

## Degrade Gracefully

Every software system will experience failures and all code has bugs. We start from these assumptions and build our systems to be robust to failure by continuly testing our assumptions. 

* Return reduce or read-only response over nothing at all --REWORD--
* Avoid single points of failure at all layers of the stack full
* Design code and infrastructure to be forward and backward compatible allowing rollback
* Release to a small set of users first, incrementally roll out to the rest with ability to go back
* Health check and automatically remove down nodes across all datacenters in a region
* Full disaster recovery system in a separate region, tested regularly, monitored continuosly just like prod
* War games and controlled failures introduced routinely

![an escalator an never break, it can only become stairs - Mitch Hedberg](/assets/img/an_escalator_can_never_break_by_mith_hedberg.jpg)

## With Performance, Less is More

We find especially with performance, there are typically huge wins to be had in up front design decisions which may come at very little to no cost. Our design mantras for performance are:

1. Don't do it
2. Do it, but don't do it again
3. Do it less
4. Do it later
5. Do it when they're not looking
6. Do it concurrently
7. Do it cheaper

In practice we implement a number of strategies to limit risk to poorly performing code:

* Major new features and performance tunings live behind feature flags allowing slow rollout and tuning in real life environment
* Chunk everything that scales on order of N. When N is controlled by customer enforce limits and design for infinity.

![automate all the things](/assets/img/more_is_less.jpg)

## Automate Everything

* Automate every aspect of the deployment
* Embrace immutability: immutable versioned artifacts and machine images
* Automated config managment
* CI & Aperture
* Automated testing 
* Devlopers own tests

![automate all the things](/assets/img/automate_all_the_things.jpg)

## Make failure cheap
Feature flag
EA
Quick release cycle (1 week)
Prevent failures in master - Bacon link


## Data Driven Decision Making

- Self service
- Baked into the design
- Continually developed and watched
- Everyone has access
- Cavok, prime, ...
- Ability to turn on log lines dynamically

