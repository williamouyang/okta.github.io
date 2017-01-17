---
layout: docs_page
weight: 5
title: Okta Release Lifecycle
---

# Okta Release Lifecycle

Features of the Okta platform travel through a regular lifecycle:

* [Beta](#beta)
* [Early Access (EA)](#early-access-ea)
* [General Availability (GA)](#general-availability-ga)
* [Deprecation](#deprecation)

This lifecycle applies to most features and behaviors of the platform.
However, Okta is a shared service, so we reserve the right to change a few
things with little notice when required for the safety of our customers, 
such as rate limits or errors thrown, or fixes to issues that are affecting customers.

## Beta

Okta selects a small number of customers for early testing of features in a Beta release. 
Features in Beta are managed and supported by the Product Team and have been internally validated for a set of use cases. 
Minimal documentation is supplied for platform Beta releases; API endpoint and configuration information are usually supplied.

Customers participating in a Beta program agree to provide feedback which is required for maturing the feature; 
however, the timeline for addressing specific areas of feedback (including bugs) is determined by Okta's market requirements for that feature.
Any customer interested in a feature in Beta must apply by visiting [our Beta Signup page](https://oktabeta.zendesk.com/hc/en-us). 
Only customers with use cases that match our use cases are invited.

Beta releases are either high touch or low touch:

* High-touch Beta releases involve regular contact with Okta, typically consisting of conference calls covering specified use cases, deployment guidance, and feedback.
* Low-touch Beta releases are self-directed without ongoing support and limited to collecting feedback.

Okta only enables Beta features in non-production or sandbox environments, because features in Beta are not yet supported by Okta Customer Support and
may change at any time during the Beta release.

Features in Beta release are marked with the Beta icon: {% api_lifecycle beta %}

## Early Access (EA)

A feature in an Early Access (EA) release is new or enhanced functionality made available for customers to selectively "opt-in" to and use in both Production and non-Production environments. 
Features in EA are supported by Okta Customer Support, SLAs, and announced in Okta's weekly Release Notes. 
Any bugs or improvements will be managed and fixed with the same timeline and processes as those in General Availability.

Features in EA release are marked with the EA icon: {% api_lifecycle ea %}

## General Availability (GA)

A feature in General Availability ("GA") is new or enhanced functionality that is enabled by default for all new customers. 
Features in GA will be rolled out to existing customers based on a feature-specific schedule (typically within 3 months of GA release). 
Features in GA are supported by Okta Customer Support, and issues will be addressed according to your Customer Agreement with Okta. 
Features moving to GA are announced in Okta's weekly Release Notes; features implementing changes to product behavior or end user experience will be enabled in Preview at least two weeks prior to being enabled in Production.   

Features in GA release are not marked with any icons.

## Deprecation

A feature identified as Deprecated is no longer recommended and may be removed in the future. 
The timing and recommended path forward will be identified in the relevant documentation, libraries, or references. 

Features that have been deprecated are marked with the Deprecated icon: {% api_lifecycle deprecated %}

When Okta has an end-of-life plan, information about the timing will be included with the icon.

## Quick Reference Table

| Description | Beta (High touch) | Beta (Low touch) | EA |  GA  | Deprecated |
|:------------|:------------------|:-----------------|:---|:---|:---|
| Contact with Product Team  |     X              |                   |       |       |       |
| Stable API                 |   Subject to change  | Subject to change | X   | X   | X   |
| Okta Support               |                   |                      | X   | X   | X   |
| Service-level agreements   |                   |                      | X   | X   | X   |
| Announced in Release Notes |                   |                      | X   | X   |       |
| In preview orgs            | By invitation     | By invitation        | By request | X | X |
| In production orgs         |                   |                      | By request | X | X |
| Documentation              | Limited           | Limited              | X   | X   | X   |
