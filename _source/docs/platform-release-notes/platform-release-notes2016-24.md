---
layout: docs_page
title: Platform Release Notes June 15, 2016
---

Platform changes available after Wednesday, June 15, 2016

The Okta Platform adds new features and changes existing features to improve your experience, as well as fixing bugs.
Features also move from Beta to Early Access to General Availability, and more rarely, are removed after end-of-life notifications.
All Okta platform changes are listed here. For product changes, see the Okta Product Release Notes.

## New Platform Feature

### New Version of Okta Sign-In Widget
Version 1.3.3 of the Okta Sign-In Widget, and version 1.0.2 of okta-auth-js are available for Preview orgs. For more information, see Okta Sign-In Widget.

### Policy API
The Links object, _links, is available in the Policy object. For more information, see Links Object.

### Improved Error Descriptions
The error descriptions related to OAuth provide more helpful information about invalid clients for OpenID Connect flows. 

### Disable Automatic Key Rotation
If you need to disable automatic key rotation for an OpenID Connect flow, you can do so in General Settings section under the General tab for an app, and then use the /oauth2/v1/keys endpoint to fetch public keys for your app. For more information, see OpenID Connect.


### Looking for Product New Features?

For changes that appear in the Okta user interface, see the [Release Notes Knowledge Hub](https://support.okta.com/help/articles/Knowledge_Article/Release-Notes-Knowledge-Hub).

<!-- ## Enhancements -->

<!-- ## Feature Status Changes -->

## Bugs Fixed

* OKTA-69173 – The <em>helpURL</em> for <em>vpn</em> wasn't returned even though it had been set previously in a request to `/api/v1/apps`.

## Return to Current Release Notes

[Current Platform Release Notes](platform-release-notes.html)

<!-- Platform Release Notes: 2016.24 -->

