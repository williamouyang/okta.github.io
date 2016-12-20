---
layout: docs_page
title: Platform Release Notes
excerpt: Summary of changes to the Okta Platform since Release 2016.50
---

## Release 2016.51

### Platform Bugs Fixed

* The HAL links for self-service actions forgot password, reset password, and unlock were being returned for every user whether the action was allowed by policy or not. 
This behavior applied to new orgs as of [2016.45](http://developer.okta.com/docs/platform-release-notes/platform-release-notes2016-45.html#user-api-response-always-contains-hal-links) and is being reversed. 
As of 2016.51, HAL links for these three operations are returned only if the policy for that user indicates the action is available. (OKTA-110739)

### Does Your Org Have This Change Yet?

To verify the current release for an org, click the **Admin** button and check the footer of the Dashboard page.

![Release Number in Footer](/assets/img/release_notes/version_footer.png)

### Looking for Product Release Notes?

For changes outside the Okta platform, see the [Release Notes Knowledge Hub](http://support.okta.com/help/articles/Knowledge_Article/Release-Notes-Knowledge-Hub).

### Earlier Platform Release Notes

* [Platform Release Notes for Release 2016.50](platform-release-notes2016-50.html)
* [Platform Release Notes for Release 2016.49](platform-release-notes2016-49.html)
* [Platform Release Notes for Release 2016.47](platform-release-notes2016-47.html)
* [Platform Release Notes for Release 2016.46](platform-release-notes2016-46.html)
* [Platform Release Notes for Release 2016.45](platform-release-notes2016-45.html)
* [Platform Release Notes for Release 2016.43](platform-release-notes2016-43.html)
* [Platform Release Notes for Release 2016.41](platform-release-notes2016-41.html)
* [Platform Release Notes for Release 2016.40](platform-release-notes2016-40.html)
* [Platform Release Notes for Release 2016.39](platform-release-notes2016-39.html)
* [Platform Release Notes for Release 2016.37](platform-release-notes2016-37.html)
* [Platform Release Notes for Release 2016.36](platform-release-notes2016-36.html)
* [Platform Release Notes for Release 2016.35](platform-release-notes2016-35.html)
* [Platform Release Notes for Release 2016.34](platform-release-notes2016-34.html)
* [Platform Release Notes for Release 2016.33](platform-release-notes2016-33.html)
* [Platform Release Notes for Release 2016.31](platform-release-notes2016-31.html)
* [Platform Release Notes for Release 2016.30](platform-release-notes2016-30.html)
* [Platform Release Notes for Release 2016.29](platform-release-notes2016-29.html)
* [Platform Release Notes for Release 2016.28](platform-release-notes2016-28.html)
* [Platform Release Notes for Release 2016.27](platform-release-notes2016-27.html)
* [Platform Release Notes for Release 2016.26](platform-release-notes2016-26.html)
* [Platform Release Notes for Release 2016.25](platform-release-notes2016-25.html)
* [Platform Release Notes for Release 2016.24](platform-release-notes2016-24.html)
* [Platform Release Notes for Release 2016.23](platform-release-notes2016-23.html)
