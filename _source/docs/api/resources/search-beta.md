---
layout: docs_page
title: Users
redirect_from: "docs/api/rest/search-beta.html"
---

## Overview

The Okta User API provides operations to manage users in your organization.

## User Operations

### List Users
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET</span> /users</span>

Enumerates users in your organization with pagination.  A subset of users can be returned that match a supported filter expression, query or advanced search.

- [List Users with Advanced Search](#list-users-with-advanced-search)

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                                                                              | Param Type | DataType | Required | Default
--------- | -------------------------------------------------------------------------------------------------------- | ---------- | -------- | -------- | -------
q         | Searches `firstName`, `lastName`, and `email` properties of users for matching value                     | Query      | String   | FALSE    |
limit     | Specified the number of results                                                                          | Query      | Number   | FALSE    | 200
filter    | [Filter expression](/docs/api/getting_started/design_principles.html#filtering) for users                | Query      | String   | FALSE    |
after     | Specifies the pagination cursor for the next page of users                                               | Query      | String   | FALSE    |
search    | [Filter expression](/docs/api/getting_started/design_principles.html#filtering) for advanced user search | Query      | String   | FALSE    |

> The `after` cursor should treated as an opaque value and obtained through the next link relation. See [Pagination](/docs/getting_started/design_principles.html#pagination)

> Search using `q` currently performs a startsWith match but it should be considered an implementation detail and may change without notice in the future

###### Advanced Search

> The `advanced search` feature is [Beta](/docs/api/resources/users.html#list-users-with-advanced-search)

Advanced search provides the option to filter on any user profile attribute, any custom defined profile attribute, as well as the following top-level attributes: `id`, `status`, `created`, `activated`, `statusChanged` and `lastUpdated`. The advanced search performs a case insensitive filter against all fields specified in the search parameter.
Note that the results might not yet be up to date, as the most up to date data can be delayed up to a few seconds, so use for convenience.

Filter                                         | Description
---------------------------------------------- | ------------------------------------------------
`profile.department eq "Engineering"`          | Users that have a `department` of `Engineering`
`profile.occupation eq "Leader"`               | Users that have a `occupation` of `Leader`

See [Filtering](/docs/api/getting_started/design_principles.html#filtering) for more information on expressions

> All advanced search must be [URL encoded](http://en.wikipedia.org/wiki/Percent-encoding) where `search=profile.department eq "Engineering"` is encoded as `search=profile.department%20eq%20%22Engineering%22`

**Advanced Search Examples**

Users with occupation of `Leader`

    search=profile.occupation eq "Leader"

Users with department of `Engineering` and either was created before `01/01/2014` or has a status of `ACTIVE`

    search=profile.department eq "Engineering" and (created lt "2014-01-01T00:00:00.000Z" or status eq "ACTIVE")
    
##### Response Parameters
{:.api .api-response .api-response-params}

Array of [User](#user-model)

#### List Users with Advanced Search
{:.api .api-operation}

Enable search for all user profile attribute as well as id, status, created, activated, statusChanged and lastUpdated.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${org}.okta.com/api/v1/users?search=profile.mobilePhone+sw+\"555\"+and+status+eq+\"ACTIVE\""
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
[
  {
    "id": "00ub0oNGTSWTBKOLGLNR",
    "status": "ACTIVE",
    "created": "2013-06-24T16:39:18.000Z",
    "activated": "2013-06-24T16:39:19.000Z",
    "statusChanged": "2013-06-24T16:39:19.000Z",
    "lastLogin": "2013-06-24T17:39:19.000Z",
    "lastUpdated": "2013-07-02T21:36:25.344Z",
    "passwordChanged": "2013-07-02T21:36:25.344Z",
    "profile": {
      "firstName": "Isaac",
      "lastName": "Brock",
      "email": "isaac.brock@example.com",
      "login": "isaac.brock@example.com",
      "mobilePhone": "555-415-1337"
    },
    "credentials": {
      "password": {},
      "recovery_question": {
        "question": "Who's a major player in the cowboy scene?"
      },
      "provider": {
        "type": "OKTA",
        "name": "OKTA"
      }
    },
    "_links": {
      "resetPassword": {
        "href": "https://your-domain.okta.com/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_password"
      },
      "resetFactors": {
        "href": "https://your-domain.okta.com/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_factors"
      },
      "expirePassword": {
        "href": "https://your-domain.okta.com/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/expire_password"
      },
      "forgotPassword": {
        "href": "https://your-domain.okta.com/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/forgot_password"
      },
      "changeRecoveryQuestion": {
        "href": "https://your-domain.okta.com/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_recovery_question"
      },
      "deactivate": {
        "href": "https://your-domain.okta.com/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/deactivate"
      },
      "changePassword": {
        "href": "https://your-domain.okta.com/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_password"
      }
    }
  }
]
~~~
