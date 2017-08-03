---
layout: docs_page
title: Platform Release Notes
excerpt: Summary of changes to the Okta Platform since Release 2017.31
---

## Platform Release Notes for Release 2017.32

### Platform Feature Enhancements

| Feature Enhancement                                                               | Expected in Preview Orgs        | Expected in Production Orgs             |
|:----------------------------------------------------------------------------------|:--------------------------------|:----------------------------------------|
|        [SHA-256 Signed Certificates for New SAML 2.0 Apps](#sha-256-signed-certificates-for-new-saml-20-apps) | Generally Available by 8/3/2017 | Generally Available beginning 9/11/2017 |

To enable an Early Availability (EA) feature, contact Okta Support. For more information, see [Okta Release Lifecycle](https://developer.okta.com/docs/api/getting_started/releases-at-okta.html). 


#### SHA-256 Signed Certificates for New SAML 2.0 Apps

All new SAML 2.0 apps are bootstrapped with SHA-256 signed public certificates. Existing SAML 2.0 apps are unchanged.

### Platform Bug Fixes

Bug fixes are expected on preview orgs starting August 9, 2017, and on production orgs starting August 14, 2017.

* Some requests to `oauth2/v1/authorize` with the `state` parameter incorrectly returned an error (OKTA-130916)

### Does Your Org Have This Change Yet?

To verify the current release for an org, click the **Admin** button and check the footer of the Dashboard page.

{% img release_notes/version_footer.png alt:"Release Number in Footer" %}

### Looking for Something Else?

* [Platform Release Note Index for 2016](platform-release-notes2016-index.html) 
* [Platform Release Note Index for 2017](platform-release-notes2017-index.html)
* For changes outside the Okta platform, see the [Product Release Notes](https://help.okta.com/en/prev/Content/Topics/ReleaseNotes/preview.htm).

