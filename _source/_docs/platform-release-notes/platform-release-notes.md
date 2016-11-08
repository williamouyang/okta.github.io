---
layout: docs_page
title: Platform Release Notes
excerpt: Summary of changes to the Okta Platform since Release 2016.43
---

# Release 2016.45

## Feature Enhancements

### New Version of Okta Sign-In Widget

The new version of Okta Sign-In Widget, 1.8.0, is available:

* Localized security questions
* Added Microsoft as a Social Provider
* Added an option to provide your own dependencies

Learn about these and other improvements in [the GitHub repository](https://github.com/okta/okta-signin-widget/releases/tag/okta-signin-widget-1.8.0).

### Improved Error Message for OpenID Connect
 
OpenID Connect error messages related to invalid scopes now return more information. 
<!-- OKTA-94798 -->


### User API Response Always Contains HAL Links

The context of the initial user request is sometimes different from the context where the self-service operation is performed. Requests for the user via the API now always return the HAL links for reset password, change password and, if the user is in the locked state, self-service unlock.

This enhancement applies to all new preview and productions orgs. Existing orgs receive the enhancement at a later date.
<!-- OKTA-104084 -->


## Platform Bugs Fixed

* Blank or empty passwords were allowed when users reset their passwords via the API following a reset password action.
Following the login with a temporary password the user would be prompted to enter their new password. 
At that time, the user could enter an empty password without generating an error. (OKTA-100802)
* Validation of the security answer length in accordance with password policy wasn't performed 
when creating a user via the API with the group password policy feature enabled.
Before the fix, the minimum security answer length was assumed to always be 4, regardless of the policy settings. (OKTA-103407)
* Improved the error message returned by an HTTP 429 error to remind the user to wait 30 seconds before re-issuing the request for an SMS message. (OKTA-104738)
* Removed some app metadata that was incorrectly returned from a `GET /api/v1/apps/{app-ID}` request for an OpenID Connect app. (OKTA-104767)
* After resetting an SMS factor for a user, that factor was incorrectly included in a subsequent API call for that user. (OKTA-105672)
* Changed validation of OpenID Connect client apps to disallow fragment components in configured redirect URIs. (OKTA-106049)


## Does Your Org Have These Changes Yet?

Check the footer of any Admin page in an org to verify the current release for that org. For example,
scroll to the bottom of the Admin <b>Dashboard</b> page to see the version number:

![Release Number in Footer](/assets/img/release_notes/version_footer.png)

## Looking for Product Release Notes?

For changes outside the Okta platform, see the [Release Notes Knowledge Hub](http://support.okta.com/help/articles/Knowledge_Article/Release-Notes-Knowledge-Hub).

## Earlier Release Notes

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
