---
layout: docs_page
title: Platform Release Notes June 29, 2016
---

The Okta Platform adds new features and changes existing features to improve your experience, as well as fixing bugs.
Features also move from Beta to Early Access to General Availability, and more rarely, are removed after end-of-life notifications.
Okta platform changes delivered since the last Platform Release Note are listed here.
 
## New Feature: API for Custom SMS Template
    
You can send custom text as part of an SMS message request:

1. Use the `/api/v1/templates/sms` endpoint to create a custom SMS text template. 
2. Send a request to the Factors API specifying the template for verification. There is no change in the response.

For more information, see [Templates API](/docs/api/resources/templates.html) and [Factors API](docs/api/resources/factors.html).

## Feature Enahancement: Password Credential Flow Supports Refresh Tokens

The `/oauth2/v1/token` endpoint includes a Refresh Token if:
 
* The request contains a `grant_type` with the value `password` and your client supports the `grant_type` value `refresh_token`. For more information, see [Token Request](http://developer.okta.com/docs/api/resources/oauth2.html#request-parameters-1).
* You request the `offline_access` scope. For more information, see [Refresh Tokens for Web and Native Applications](http://developer.okta.com/docs/api/resources/oauth2.html#refresh-tokens-for-web-and-native-applications).

## Bugs Fixed

The following issue is fixed:
 
* For some customers, an API request for users based on matching last_name failed to return all matches. (OKTA-91367) 

## Looking for Product Release Notes?

For changes that affect the Okta user interface, see the [Release Notes Knowledge Hub](https://support.okta.com/help/articles/Knowledge_Article/Release-Notes-Knowledge-Hub).

## Earlier Release Notes

* [Platform Release Notes for the week ending Wednesday, June 22](platform-release-notes2016-25.html) (link won't work until Wed. night)
* [Platform Release Notes for the week ending Wednesday, June 15](platform-release-notes2016-24.html)
* [Platform Release Notes for the week ending Wednesday, June 8](platform-release-notes2016-23.html)