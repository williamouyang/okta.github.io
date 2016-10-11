---
layout: docs_page
title: Platform Release Notes
excerpt: Summary of changes to the Okta Platform since Release 2016.40
---

## Release 2016.41

### Feature Enhancements:

* [New Version of Okta Sign-In Widget](#new-version-of-okta-sign-in-widget)
* [New Version of Okta Auth JS](#new-version-of-okta-auth-js)
* [Key Store Operations for Identity Providers API](#key-store-operations-are-available-for-identity-providers-api)
* [New Functions for Replacing Strings](#new-functions-for-replacing-strings)

#### New Version of Okta Sign-In Widget

The new version of Okta Sign-In Widget, 1.7.0, is available:

* The Widget can create access tokens and authorization codes.
* `tokenManager` manages OAuth 2.0 and OpenID Connect tokens.
* Voice Call is supported in the forgot password flow.
* Localization is available for Hungarian and Romanian.
* Added the language option to set the displayed language.

Learn about these and other improvements in [the GitHub repository](https://github.com/okta/okta-signin-widget/releases/latest).

#### New Version of Okta Auth JS

The new version of Okta Auth JS, 1.5.0, is available:

* Perform manual token refreshes with the `token.refresh` method.
* Create authorization codes in Okta Auth JS.
* Access updated user information with `token.getUserInfo`.
* Performance has improved when refreshing multiple tokens.

Learn about these and other improvements in [the GitHub repository](https://github.com/okta/okta-auth-js/releases/latest).

#### Key Store Operations are Available for Identity Providers API
     
Just as you can in the Apps API, you can perform key store operations in the Identity Providers API:
     
* Generate an X.509 certificate public key
* Retrieve and list public keys

For more information, see [Identity Provider Singing Key Store Operations](https://developer.okta.com/idps.html#identity-provider-signing-key-store-operations).
<!-- OKTA-91498 -->

#### New Functions for Replacing Strings

Use the Expression Language functions `String.replace` and `String.replaceOnce` to replace strings.

Examples:

* `String.replace("This list includes chores", "is", "at") = "That last includes chores"`
* `String.replaceOnce("This list includes chores", "is", "at") = "That list includes chores"`

For more information, see [Expression Language: String Functions](http://developer.okta.com/reference/okta_expression_language/#string-functions).

<!-- OKTA-103057, OKTA-103966 -->

### Platform Bug Fixed

* Reauthorization using app sign-on policy wasn't always enforced for OpenID Connect flows.(OKTA-99897, OKTA-99900)

### Does Your Org Have These Changes Yet?

Check the footer of any Admin page in an org to verify the current release for that org. For example,
scroll to the bottom of the Admin <b>Dashboard</b> page to see the version number:

![Release Number in Footer](/assets/img/release_notes/version_footer.png)

### Looking for Product Release Notes?

For changes outside the Okta platform, see the [Release Notes Knowledge Hub](https://support.okta.com/help/articles/Knowledge_Article/Release-Notes-Knowledge-Hub).

### Earlier Release Notes

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
