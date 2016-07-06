---
layout: docs_page
title: Platform Release Notes July 7, 2016
---

Release 2016.27

Releases are rolled out to organizations in a staggered fashion: first to preview orgs, then to production orgs. 
Check the [Current Release Status](https://support.okta.com/help/articles/Knowledge_Article/Current-Release-Status) to verify whether the changes in this document have rolled out to your org yet.

## Feature Enhancements
 
### Improved Names and Locations for OAuth-related panels in the Admin Console

<!-- OKTA-93256 -->
We've rearranged some of the panels related to OAuth to improve usability:

* The **OAuth** tab has been renamed **Authorization Server**.
* The **Signing credentials rotation** option was on the **Client Registration** panel, but since it helps you configure tokens, we've
 moved it to the **Authorization Server** tab. 

![New Tab for Managing OAuth-Related Configuration](/assets/img/changed_tabs.png)
 
### Okta Sign-In Widget Updated

The Okta Sign-In Widget has been updated to version 1.4.0. See [the guide](http://developer.okta.com/docs/guides/okta_sign-in_widget.html) for updated sample code.

### Improved User Lookup for Password Recovery

For the `/authn` endpoint, we've improved how we look up a user based on login ID or email address for password recovery. 
This improvement prevents problems when the same email exists in different fields for different users.

1. We first search by login ID:
    * If only one user is found, start password recovery for the user.
    * If more than one user is found, the password recovery request fails. This can happen when the value is not fully qualified: `mary.smith` instead of `mary.smith@my_company.com`.
2. If no user is found in step 1, search primary email addresses.
    * If one user is found, start password recovery for the user.
    * If more than one user is found, the password recovery request fails.
3. If no user is found in step 2, search the secondary email addresses, then secondary email.
    * If one user is found, start password recovery for the user.
    * If more than one user is found, or no user is found, the password recovery request fails.

## Bugs Fixed

The following issues are fixed:
 
* The OIDC Access Token was incorrectly available to Okta endpoints other than `/oauth2/v1/userinfo`. (OKTA-91099)
* The `/authn` endpoint (Authentication API) incorrectly failed password recovery for some active users.  (OKTA-92001)
* The format of the issuer (`iss`) in the Access Token has changed: it was the client ID. It now takes the form: `https://<your-org>.okta.com/as/<authorization-server-ID>. (OKTA-93628)

## Looking for Product Release Notes?

For changes outside the Okta platform, see the [Release Notes Knowledge Hub](https://support.okta.com/help/articles/Knowledge_Article/Release-Notes-Knowledge-Hub).

## Earlier Release Notes

* [Platform Release Notes for the week ending Thursday, July 7](platform-release-notes2016-26.html)
* [Platform Release Notes for the week ending Wednesday, June 22](platform-release-notes2016-25.html)
* [Platform Release Notes for the week ending Wednesday, June 15](platform-release-notes2016-24.html)
* [Platform Release Notes for the week ending Wednesday, June 8](platform-release-notes2016-23.html)
