---
layout: docs_page
title: Platform Release Notes
excerpt: Summary of changes to the Okta Platform since Release 2016.39
---

## Release 2016.40

### Feature Enhancements

* [Sign-In Widget Version 1.7.0](#sign-in-widget-1-7-0)
* [Auth SDK Version 1.5.0](#auth-sdk-version-1-5-0)
* [Application Key Credential Sharing](#application-key-credential-sharing)

#### Sign-In Widget Version 1.7.0

Internationalization (i18n), OAuth and OIDC support improvements are available in version 1.7.0. 
It's easier to use other languages (including Hungarian and Romanian).
You can also perform full-page redirects to create tokens and authorization codes. 
When you receive these tokens, store them in the new tokenManager to have them cached and auto-refreshed. 
We've also included the ability to receive a phone call to recover your account when you've forgotten your password.

Features:

* 2b56a0d9529121fc4c4db51469aae47182bc5cc9 - Added tokenManager (#102)
* 9a364393873c455ede589f5eda5e6c5551a3e43e - Added support for scrolling in embedded browsers (#107)
* 4adb59f64b8767f77828f7e4ef21c78ffb882406 - Added support for Hungarian and Romanian (#109)
* 181ba2c751967ab1d29a47aa6711ee814aebad68 - Added support for redirects to create tokens and authorization codes (#111)
* 3ccbeb275841f465f8b0a85d24f5a4c4975efdfd - Added support for Voice Call in the forgot password flow (#112) 
* 559aeb72231700a527c5cb38857e448974cab70b - Improved i18n ease-of-use (#115)

Bug fixes:

* 31bfa94cc4cf915a931211a79c4e955dbbaae567 - Fixed padding issue with contact support form (#118)

Other notable changes:

* 74e21f249cff984983ceff3aba1b7d0ac46cf780 - Textboxes highlight on focus (#105)
* 66d349311abe1fcf56d4886ae5fe0f3fd502751d - Upgraded okta-auth-js to 1.5.0 (#120)
* 9d7350c7d0f9c8187cf851ee0beeed0ea62e8009 - Updated documentation with API and config information (#117)

See [Okta Sign-In Widget](http://developer.okta.com/code/javascript/okta_sign-in_widget) for updated sample code 
after Release 2016.40 is available in production orgs.

The new version is an npm module and is available on [the npm registry](https://www.npmjs.com/package/@okta/okta-signin-widget).

#### Auth SDK Version 1.5.0

We've expanded our OAuth 2.0 and OpenID Connect support. 
You can retrieve user details with `token.getUserInfo` or create an authorization code for server-side flows. 
Additionally, `tokenManager` is no longer necessary to refresh an Access Token or ID Token; 
`token.refresh` allows you to refresh the token directly.

Features:

* 1c598a692869d7bc91cd5c32a8e1e5c21cf7a881 - Added `token.refresh` (#39)
* e8ac02cff9030ed266250f0da38fc3a5fad1904d - Added authorization code support (#40)
* a4147b347ce0e69a4c9fcb03808f26abd5504e51 - Added `token.getUserInfo` (#41)
* 28a1700d80e99fdc3a8c1dfd807833fabbfa8bf6 - Improved performance when refreshing tokens simultaneously (#44)

Bug fixes:

* 1dc62f8d1bf443dba107ab00095a19903d3d80c1 - Made some validation errors easier to catch in the OAuth flows (#43)

Other notable changes:

* b21b9b732085b4f9eeca03035cf025a762967020 - Deprecated `idToken` methods in favor of `token` methods (#42)

For more details including feature and bug-fix commits, see [the okta-auth-js Git repository](https://github.com/okta/okta-auth-js/releases/latest).

#### Application Key Credential Sharing
<!-- OKTA-100232 -->
Share application key credentials between apps. Sharing credentials is useful for Okta orgs
with two or more apps that need to share the same identity provider (IdP), requiring that
assertions from the apps must be signed by the same key.

Once you have shared a credential between apps, you can list all the applications that are using 
the same [application key credential](/api/resources/apps.md#list-applications-using-a-key). <!-- OKTA-100925 -->

For more information, see the [how-to guide](/docs/how-to/sharing-cert.html) or Apps API reference for [updating](/api/resources/apps.html#update-key-credential-for-application)
and [cloning](/api/resources/apps.html#clone-application-key-credential).

<!-- ### Platform Bugs Fixed -->

### Does Your Org Have These Changes Yet?

Check the footer of any Admin page in an org to verify the current release for that org. For example,
scroll to the bottom of the Admin <b>Dashboard</b> page to see the version number:

![Release Number in Footer](/assets/img/release_notes/version_footer.png)

### Looking for Product Release Notes?

For changes outside the Okta platform, see the [Release Notes Knowledge Hub](https://support.okta.com/help/articles/Knowledge_Article/Release-Notes-Knowledge-Hub).

### Earlier Release Notes

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
