---
layout: docs_page
title: Platform Release Notes
excerpt: Summary of changes to the Okta Platform since Release 2017.02
---

## Release 2017.03

### Advance Notice: API Rate Limit Improvements

In the coming months, Okta will improve how API rate limits are reported, and how they are enforced.

* Shortly after February 8, 2017, we'll provide system log alerts to let you know that you exceeded an API rate limit. At this time, we'll change some rate limits.
* Shortly after March 8, 2017, rate limits will be enforced.

Of course, as each change is released, we'll announced here.

For more details, see [API Rate Limit Improvements](https://support.okta.com/help/articles/Knowledge_Article/API-Rate-Limit-Improvements).<!-- OKTA-110472 -->

### Feature Improvements

* You can now search (exact match) for an authorization server name or an audience.



### Platform Bugs Fixed

* When authentication fails because of the user's sign-on policy, the HTTP code returned was 403
but is now 401. (OKTA-111888)
* The one time sessionToken in the response from the POST `/api/v1/authn` request with username
and password was valid for two hours after issuance. It is now valid for 5 minutes. (OKTA-109907)
* Trying to modify the rule conditions of a default rule or to modify a default policy that affects
evaluation did not return a read-only attribute error. Now it does.
If you modified one of these read-only
attributes before this bug fix and need to change the attribute back to its initial value,
contact Okta Technical Support. (OKTA-110155)
* This is done. Mysti will update (OKTA-110472)
* Requesting an authorization code with `response_mode` set to `okta_post_message` failed to return
the error message ("The authorization server does not support the requested response mode") in the
response. Instead it redirected the error response to the URI specified in `redirect_uri`. (OKTA-103437)
* Mysti is doing this one. (OKTA-110644)
* Mysti is doing this one. (OKTA-110682)
* Searching for a user with GET on `/api/v1/users` when the user is federated returned an incorrect
value for `provider`. (OKTA-110929)

### Does Your Org Have This Change Yet?

To verify the current release for an org, click the **Admin** button and check the footer of the Dashboard page.

![Release Number in Footer](/assets/img/release_notes/version_footer.png)

### Looking for Something Else?

* [Platform Release Note Index for 2016](platform-release-notes2016-index.html)
* For changes outside the Okta platform, see the [Release Notes Knowledge Hub](http://support.okta.com/help/articles/Knowledge_Article/Release-Notes-Knowledge-Hub).

