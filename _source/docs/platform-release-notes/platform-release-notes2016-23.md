---
layout: docs_page
title: Platform Release Notes June 8, 2016
---

Platform changes available after Wednesday, June 8, 2016

The Okta Platform adds new features and changes existing features to improve your experience, as well as fixing bugs.
Features also move from Beta to Early Access to General Availability, and more rarely, are removed after end-of-life notifications.
All Okta platform changes are listed here. For product changes, see the Okta Product Release Notes.

<!-- ## New Platform Feature -->

### Looking for Product New Features?

For changes that appear in the Okta user interface, see the [Release Notes Knowledge Hub](https://support.okta.com/help/articles/Knowledge_Article/Release-Notes-Knowledge-Hub).

<!-- ## Enhancements -->

<!-- ## Feature Status Changes -->

## Bugs Fixed

* OKTA-73691 – HTML tags were incorrectly allowed in POST and PUT requests to `/api/v1/idps/`.
* OKTA-90218 – Requests to `/oauth2/v1/authorize` failed if they included a state value with special characters.
* OKTA-91074 – Requests to `/oauth2/v1/introspect` incorrectly included scopesList.
* OKTA-91441 – The Users API incorrectly returned an error when updating login. 

## Return to Current Release Notes

[Current Platform Release Notes](platform-release-notes.html)

<!-- Platform Release Notes: 2016.23 -->