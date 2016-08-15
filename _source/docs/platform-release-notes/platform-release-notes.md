---
layout: docs_page
title: Platform Release Notes
excerpt: Summary of changes to the Okta Platform since Release 2016.31
---

Release 2016.33

## Bugs Fixed

The following issue is fixed:

* Matching against attributes that exceed the allowed length of `appuser.username` failed without an appropriate message,
and the failure wasn't logged. (OKTA-96437)
* GET requests to `oauth2/v1/authorize` that specified the value `form_post` for the parameter `response_mode` sometimes 
failed to receive `expires_in` and `scope` in the response. (OKTA-98245)
* Some custom apps couldn't upgdate the signing key. (OKTA-93959)
* For OpenID client apps that configured their application type as "Okta or App,"
the **App Embed Link** dialog incorrectly displayed additional sections. (OKTA-95526)

## Does Your Org Have These Changes Yet?

Check the footer of any Admin page in an org, for example the **Dashboard** or **Directory** tab, to verify the current release for that org.

## Looking for Product Release Notes?

For changes outside the Okta platform, see the [Release Notes Knowledge Hub](https://support.okta.com/help/articles/Knowledge_Article/Release-Notes-Knowledge-Hub).

## Earlier Release Notes

* [Platform Release Notes for Release 2016.30](platform-release-notes2016-31.html)
* [Platform Release Notes for Release 2016.30](platform-release-notes2016-30.html)
* [Platform Release Notes for Release 2016.29](platform-release-notes2016-29.html)
* [Platform Release Notes for Release 2016.28](platform-release-notes2016-28.html)
* [Platform Release Notes for Release 2016.27](platform-release-notes2016-27.html)
* [Platform Release Notes for Release 2016.26](platform-release-notes2016-26.html)
* [Platform Release Notes for Release 2016.25](platform-release-notes2016-25.html)
* [Platform Release Notes for Release 2016.24](platform-release-notes2016-24.html)
* [Platform Release Notes for Release 2016.23](platform-release-notes2016-23.html)
