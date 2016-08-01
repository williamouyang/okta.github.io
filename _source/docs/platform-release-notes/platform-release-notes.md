---
layout: docs_page
title: Platform Release Notes August 3, 2016
---

Release 2016.31

## Feature Enhancements
 
### Version 1.4.0 of okta-auth-js Available
 
<!-- OKTA-97056 -->
We've added support for accessTokens and two new namespaces, token and tokenManager, 
to handle both idTokens and accessTokens. 
The token namespace makes it easier to specify how to retrieve your tokens: 
getWithoutPrompt, getWithPopup, and getWithRedirect. 
The tokenManager allows tracking tokens and automatically refreshes them for you.
 
For more details including feature and bug-fix commits, 
see [the okta-auth-js Git repository](https://github.com/okta/okta-auth-js/releases/tag/okta-auth-js-1.4.0).

### Rules Included in Policy API requests

<!-- OKTA-40548 -->
Use the `expand` query parameter to include up to twenty rules in a Policy API query:

     `GET https://my-org.okta.com/api/v1/policies/{id}?expand=rules`

If more than twenty rules are returned, an error occurs.

### Scope Response Parameter

<!-- OKTA-93308 -->
The `scope` response parameter is available for the `/oauth2/v1/authorize` and `/oauth2/v1/token` endpoints.
This parameter is returned if the response also includes an `access_token`.

## Bug Fixed

The following issue is fixed:

* The ampersand (&) character in a username caused Forgot Password API requests (`/api/v1/authn/recovery/password` to fail. (OKTA-93994)


### Does Your Org Have These Changes Yet?

Check the footer of any Admin page in an org, for example the **Dashboard** or **Directory** tab, to verify the current release for that org.

### Looking for Product Release Notes?

For changes outside the Okta platform, see the [Release Notes Knowledge Hub](https://support.okta.com/help/articles/Knowledge_Article/Release-Notes-Knowledge-Hub).

### Earlier Release Notes

* [Platform Release Notes for the week ending Wednesday, July 27](platform-release-notes2016-30.html)
* [Platform Release Notes for the week ending Wednesday, July 20](platform-release-notes2016-29.html)
* [Platform Release Notes for the week ending Wednesday, July 13](platform-release-notes2016-28.html)
* [Platform Release Notes for the week ending Wednesday, July 7](platform-release-notes2016-27.html)
* [Platform Release Notes for the week ending Wednesday, June 29](platform-release-notes2016-26.html)
* [Platform Release Notes for the week ending Wednesday, June 22](platform-release-notes2016-25.html)
* [Platform Release Notes for the week ending Wednesday, June 15](platform-release-notes2016-24.html)
* [Platform Release Notes for the week ending Wednesday, June 8](platform-release-notes2016-23.html)
