---
layout: blog_post
title: Android Unit Testing Part I&#58; What Makes Strong Test Automation
author: victor_ronin
tags: [android, testing]
---
When we started to work on [Okta Mobility Management](https://www.okta.com/product/mobility-management/) (OMM) for Android about six months ago, our mobile team needed to extend the current Okta Mobile for Android to provide new OMM functionality. In doing so, we needed a process that ensured and improved the quality of Okta Mobile. 

At the center of this process was test automation, which let us move
forward quickly without breaking existing functionality. It worked
quite well for Okta Mobile Android and saved us a lot of timeframe to
deliver OMM on date (before [Oktane14](http://oktane14.com/)).

The setup we used required a lot of research, and could be applied to
most of Android applications to let engineers be more productive and
deliver excellent products. (Most Android engineers don’t use the
standard Android out-of-box tests as the tests are simply not very
good.)

Over the course of four blog posts, my aim is to show you not only why
these tests have been problematic for Android engineers in the past,
but also how to turn these Android tests into viable and useful
tools. For this first part, we’re going to dig into what makes a
strong test automation &#x2013; and where current Android tests are failing
as a result.

**Criteria for a Strong Test Automation**

To start, let’s look at the importance of test automations in the app
engineering cycle. I believe the only way to build a solid application
is to employ robust test automation. Test automation of web and
desktop apps is a common practice for a reason: it’s been around for
decades, and most software engineers are familiar and comfortable with
the practice. However, in the mobile world, most engineers use testing
automation sporadically at best. Why?

*It takes more work.*

Good tests, whether they’re on web, desktop or mobile apps, should
include the following criteria:

1.  **Repeatable** - If tests aren’t repeatable (i.e., they fail
    intermittently), then developers won’t know whether that failure
    indicates broken code or a problem with the test environment. If the
    reason for failure is not clear, they are easily dismissed.
2.  **Isolated** - If tests aren’t performed in isolation from each other,
    developers run the risk of changes in one test cascading and breaking
    others. This, in turn, leads to problems with repeatability.
3.  **Simple** - It’s really hard to read and maintain tests if they aren’t simple and
    consistent. Further, complicated tests require developers to spend
    additional time carefully reading through each test they need to
    modify.
4.  **Fast** - If tests are slow moving, engineers are less willing
    to run them. As a result, problems are found much later than when they
    were introduced.

Only *unit* tests match all these parameters. And for this reason, I’d
argue they should be the predominant method. This opinion, however, is
a touchy subject, with differing opinions amongst qualified
professionals. The main point of disagreement is that unit tests are
designed to test very small units of code, not end-to-end testing (as
UI or integration tests do).

Let’s now dig into Android tests specifically and see some of the
challenges with the current out-of-the-box tests.

**Android Out-of-the-Box Tests**

If you were to Google “Android tests”, you would find an ample number
of articles on writing tests for Android. However, if you dig a bit
deeper - say under Android “test automations” - you’ll discover
several problems related to Android out-of-box tests, and there are
several reasons these out-of-the box tests are not ideal:

-   **These tests must run on an Android device or Android emulator.**
    If you run a couple of tests using an example app, you may be happy
    with the result. But they don’t always work as well: the emulator
    hangs, ADB throws an error or a device inadvertently disconnects. This
    can happen often enough to make your life miserable — especially if
    you have hundreds of tests running under Continuous Integration
    (CI). Issues like these render the test non-repeatable.
-   **These so-called “activity tests” are actually “integration”— not unit tests.**
    Unit tests assess just one unit (e.g., a class or method). However,
    when you run an activity test, you test the whole stack (UI, business
    logic, persistence, and network). Integration tests are great for
    seeing that end-to-end scenario work, but they tend to be flakey
    (depending on UI performance, network condition, and the preexisting
    persistence state).
-   **These tests run slowly.**
    It takes seconds for each test to complete. If hundreds of them are
    running, you could end up waiting 5-10 minutes for completion. As a
    result, engineers will resist running them after each small change.
-   **These tests tend to be complicated.**
    Most of the time these tests are neither simple, nor consistent. There
    is no single blueprint on how to write these tests (e.g., how to setup
    an environment, act, or assert results). Given that each developer
    comes up with their own way of writing such tests, they are often hard
    to decipher and read.

It’s pretty clear that the Google Android out-of-the-box tests do not
comply with our definition of what a good test should be. They are not
**repeatable**, **simple** or **fast**. Over the course of my next three posts,
we’ll walk through the steps needed to resolve these problems and
offer simple, viable tools to help build Android applications. If
you’d like to get a preview of the code I’ll be sharing, you can also
[visit GitHub](https://github.com/vronin-okta/okta_blog_samples/tree/master/android_unit_testing) and get the full process now.
