---
layout: docs_page
title: Platform Release Notes
excerpt: Summary of changes to the Okta Platform since Release 2016.37
---

## Release 2016.39

### Feature Enhancement: Sharing Certificates Between App Instances

By cloning an app key credential with the Apps API, you can share the same certificate between two or more apps:

<pre>/apps/<em>:aid</em>/credentials/keys/<em>:kid</em>/clone?targetAid=<em>:targetAid</em></pre>

To share a certificate among app instances:

1. Generate a new app key credential for an app (the source app).
2. Use the new credential in the source app.
3. Share the credential (`kid`) with one or more target apps.
4. Use the new credential in the target app.

For more detailed instructions, see ["Clone Key Credential for Application"](http://developer.okta.com/docs/api/resources/apps.html#clone-key-credential-for-application)
and ["Update Key Credential for Application"](http://developer.okta.com/docs/api/resources/apps.html#update-key-credential-for-application).

### Bug Fixed

The WWW-Authenticate header couldn't be read when the `/oauth2/v1/userinfo` endpoint returned errors in a browser. (OKTA-101943)

### Does Your Org Have These Changes Yet?

Check the footer of any Admin page in an org to verify the current release for that org. For example,
scroll to the bottom of the Admin <b>Dashboard</b> page to see the version number:

![Release Number in Footer](/assets/img/release_notes/version_footer.png)

### Looking for Product Release Notes?

For changes outside the Okta platform, see the [Release Notes Knowledge Hub](https://support.okta.com/help/articles/Knowledge_Article/Release-Notes-Knowledge-Hub).

### Earlier Release Notes

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
