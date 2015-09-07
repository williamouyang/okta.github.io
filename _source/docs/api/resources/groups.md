---
layout: docs_page
title: Groups
redirect_from: "/docs/api/rest/groups.html"
---

## Overview

The Okta Groups API provides operations to manage your organization groups and their user members.

## Group Model

### Example

~~~json
{
    "id": "00g1emaKYZTWRYYRRTSK",
    "objectClass": [
        "okta:user_group"
    ],
    "profile": {
        "name": "West Coast Users",
        "description": "Straight Outta Compton"
    },
    "_links": {
        "logo": [
            {
                "href": "https://example.okta.com/img/logos/groups/okta-medium.png",
                "name": "medium",
                "type": "image/png"
            },
            {
                "href": "https://example.okta.com/img/logos/groups/okta-large.png",
                "name": "large",
                "type": "image/png"
            }
        ],
        "users": {
            "href": "https://example.okta.com/api/v1/groups/00g1emaKYZTWRYYRRTSK/users"
        },
        "apps": {
            "href": "https://example.okta.com/api/v1/groups/00g1emaKYZTWRYYRRTSK/apps"
        }
    }
}
~~~

### Group Attributes

All groups have the following properties:

|--------------+--------------------------------------------------------------+----------------------------------------------------------------+----------|--------|----------|-----------|-----------+------------|
| Property     | Description                                                  | DataType                                                       | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| ------------ | ------------------------------------------------------------ | -------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| id           | unique key for group                                         | String                                                         | FALSE    | TRUE   | TRUE     |           |           |            |
| objectClass  | determines the group's `profile`                             | Array of String                                                | TRUE     | FALSE  | TRUE     | 1         |           |            |
| profile      | the group's profile properties                               | [Profile Object](#profile-object)                              | FALSE    | FALSE  | FALSE    |           |           |            |
| _links       | [discoverable resources](#links-object) related to the group | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |           |           |            |
| _embedded    | [embedded resources](#embedded-object) related to the group  | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |           |           |            |
|--------------+--------------------------------------------------------------+----------------------------------------------------------------+----------|--------|----------|-----------|-----------+------------|

> `id`, `objectClass`, and `_links` are only available after a group is created

### Profile Object

Specifies required and optional properties for a group.  The `objectClass` of group determines what additional properties are available.

#### ObjectClass: okta:user_group

Profile for any group that is **not** imported from Active Directory

|-------------+--------------------------+----------+----------+----------+-----------+-----------+------------|
| Property    | Description              | DataType | Nullable | Readonly | MinLength | MaxLength | Validation |
| ----------- | ------------------------ | -------- | -------- | -------- | --------- | --------- | ---------- |
| name        | name of the group        | String   | FALSE    | FALSE    | 1         | 255       |            |
| description | description of the group | String   | TRUE     | FALSE    | 0         | 1024      |            |
|-------------+--------------------------+----------+----------+----------+-----------+-----------+------------|

~~~json
{
    "name": "West Coast Users",
    "description": "Straight Outta Compton"
}
~~~

#### ObjectClass: okta:windows_security_principal

Profile for a group that is imported from Active Directory

|----------------------------+--------------------------------------------------------+----------+-----------+----------+-----------+-----------+------------|
| Property                   | Description                                            | DataType | Nullable  | Readonly | MinLength | MaxLength | Validation |
| -------------------------- | ------------------------------------------------------ | -------- | --------- | -------- | --------- | --------- | ---------- |
| name                       | name of the windows group                              | String   | FALSE     | TRUE     |           |           |            |
| description                | description of the windows group                       | String   | FALSE     | TRUE     |           |           |            |
| samAccountName             | pre-windows 2000 name of the windows group             | String   | FALSE     | TRUE     |           |           |            |
| dn                         | the distinguished name of the windows group            | String   | FALSE     | TRUE     |           |           |            |
| windowsDomainQualifiedName | fully-qualified name of the windows group              | String   | FALSE     | TRUE     |           |           |            |
| externalId                 | base-64 encoded GUID (objectGUID) of the windows group | String   | FALSE     | TRUE     |           |           |            |
|----------------------------+--------------------------------------------------------+----------+-----------+----------+-----------+-----------+------------|

~~~json
{
    "profile": {
        "name": "West Coast Users",
        "description": "example.com/West Coast/West Coast Users",
        "samAccountName": "West Coast Users",
        "dn": "CN=West Coast Users,OU=West Coast,DC=example,DC=com",
        "windowsDomainQualifiedName": "EXAMPLE\\West Coast Users",
        "externalId": "VKzYZ1C+IkSZxIWlrW5ITg=="
    }
}
~~~

### Links Object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the group using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification.  This object is used for dynamic discovery of related resources and lifecycle operations.  The Links Object is **read-only**.

|--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Link Relation Type | Description                                                                                                                                                      |
| ------------------ | -----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| self               | The primary URL for the group                                                                                                                                    |
| logo               | Provides links to logo images for the group if available                                                                                                         |
| users              | Provides [group member operations](#group-member-operations) for the group                                                                                       |
| apps               | Lists all [applications](apps.html#application-model) that are assigned to the group. See [Application Group Operations](apps.html#application-group-operations) |
|--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## Group Operations

### Add Group
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST</span> /groups</span>

Adds a new Okta group to your organization.

> Only Okta groups can be added.  Application import operations are responsible for syncing non-Okta groups such as Active Directory groups.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                               | ParamType | DataType                          | Required | Default
--------- | ----------------------------------------- | --------- | --------------------------------- | -------- | ---
profile   | `okta:user_group` profile for a new group | Body      | [Profile-Object](#profile-object) | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

The created [Group](#group-model).

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "name": "West Coast Users",
    "description": "Straight Outta Compton"
  }
}' "https://${org}.okta.com/api/v1/groups"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
    "id": "00gevhYMOEIQMDAPUQGQ",
    "objectClass": [
        "okta:user_group"
    ],
    "profile": {
        "name": "West Coast Users",
        "description": "Straight Outta Compton"
    },
    "_links": {
        "logo": [
            {
                "href": "https://your-domain.okta.com/img/logos/groups/okta-medium.png",
                "name": "medium",
                "type": "image/png"
            },
            {
                "href": "https://your-domain.okta.com/img/logos/groups/okta-large.png",
                "name": "large",
                "type": "image/png"
            }
        ],
        "users": {
            "href": "https://your-domain.okta.com/api/v1/groups/00gevhYMOEIQMDAPUQGQ/users"
        },
        "apps": {
            "href": "https://your-domain.okta.com/api/v1/groups/00gevhYMOEIQMDAPUQGQ/apps"
        }
    }
}
~~~

### Get Group
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET</span> /groups/*:id*</span>

Fetches a specific group by `id` from your organization

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description     | ParamType | DataType | Required | Default
--------- | --------------- | --------- | -------- | -------- | -------
id        | `id` of a group | URL       | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

Fetched [Group](#group-model)

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${org}.okta.com/api/v1/groups/00gevhYMOEIQMDAPUQGQ"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
    "id": "00gevhYMOEIQMDAPUQGQ",
    "objectClass": [
        "okta:user_group"
    ],
    "profile": {
        "name": "West Coast Users",
        "description": "Straight Outta Compton"
    },
    "_links": {
        "logo": [
            {
                "href": "https://your-domain.okta.com/img/logos/groups/okta-medium.png",
                "name": "medium",
                "type": "image/png"
            },
            {
                "href": "https://your-domain.okta.com/img/logos/groups/okta-large.png",
                "name": "large",
                "type": "image/png"
            }
        ],
        "users": {
            "href": "https://your-domain.okta.com/api/v1/groups/00gevhYMOEIQMDAPUQGQ/users"
        },
        "apps": {
            "href": "https://your-domain.okta.com/api/v1/groups/00gevhYMOEIQMDAPUQGQ/apps"
        }
    }
}
~~~

### List Groups
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET</span> /groups</span>

Enumerates groups in your organization with pagination. A subset of groups can be returned that match a supported filter expression or query.

- [List All Groups](#list-all-groups)
- [Search Groups](#search-groups)

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                                 | ParamType | DataType | Required | Default
--------- | ----------------------------------------------------------- | --------- | -------- | -------- | -------
q         | Searches the `name` property  of groups for matching value  | Query     | String   | FALSE    |
limit     | Specifies the number of group results in a page             | Query     | Number   | FALSE    | 10000
after     | Specifies the pagination cursor for the next page of groups | Query     | String   | FALSE    |

> The `after` cursor should treated as an opaque value and obtained through the next link relation. See [Pagination](/docs/getting_started/design_principles.html#pagination)

##### Response Parameters
{:.api .api-response .api-response-params}

Array of [Groups](#group-model)

#### List All Groups
{:.api .api-operation}

Fetches all groups in your organization.

The default group limit is set to a very high number due to historical reasons which is no longer valid for most organizations.  This will change in a future version of this API.  The recommended page limit is now `limit=200`.

> If you receive a HTTP 500 status code, you more than likely have exceeded the request timeout.  Retry your request with a smaller `limit` and page the results (See [Pagination](/docs/getting_started/design_principles.html#pagination))

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${org}.okta.com/api/v1/groups?limit=200"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~http
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://your-domain.okta.com/api/v1/groups?limit=200>; rel="self"
Link: <https://your-domain.okta.com/api/v1/groups?after=00ud4tVDDXYVKPXKVLCO&limit=200>; rel="next"

[
  {
      "id": "00gevhYMOEIQMDAPUQGQ",
      "objectClass": [
          "okta:user_group"
      ],
      "profile": {
          "name": "West Coast Users",
          "description": "Straight Outta Compton"
      },
      "_links": {
          "logo": [
              {
                  "href": "https://your-domain.okta.com/img/logos/groups/okta-medium.png",
                  "name": "medium",
                  "type": "image/png"
              },
              {
                  "href": "https://your-domain.okta.com/img/logos/groups/okta-large.png",
                  "name": "large",
                  "type": "image/png"
              }
          ],
          "users": {
              "href": "https://your-domain.okta.com/api/v1/groups/00gevhYMOEIQMDAPUQGQ/users"
          },
          "apps": {
              "href": "https://your-domain.okta.com/api/v1/groups/00gevhYMOEIQMDAPUQGQ/apps"
          }
      }
  },
  {
      "id": "00gq96KPRVMTHOQAQWAC",
      "objectClass": [
          "okta:user_group"
      ],
      "profile": {
          "name": "East Coast",
          "description": "Illmatic"
      },
      "_links": {
          "logo": [
              {
                  "href": "https://your-domain.okta.com/img/logos/groups/okta-medium.png",
                  "name": "medium",
                  "type": "image/png"
              },
              {
                  "href": "https://your-domain.okta.com/img/logos/groups/okta-large.png",
                  "name": "large",
                  "type": "image/png"
              }
          ],
          "users": {
              "href": "https://your-domain.okta.com/api/v1/groups/00gq96KPRVMTHOQAQWAC/users"
          },
          "apps": {
              "href": "https://your-domain.okta.com/api/v1/groups/00gq96KPRVMTHOQAQWAC/apps"
          }
      }
  }
]
~~~

#### Search Groups
{:.api .api-operation}

Searches for groups by `name` in your organization.

> Paging and searching are currently mutually exclusive.  You cannot page a query.  The default limit for a query is `300` results. Query is intended for an auto-complete picker use case where users will refine their search string to constrain the results.

> Search currently performs a startsWith match but it should be considered an implementation detail and may change without notice in the future. Exact matches will always be returned before partial matches

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${org}.okta.com/api/v1/groups?q=West&limit="
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
[
  {
      "id": "00gevhYMOEIQMDAPUQGQ",
      "objectClass": [
          "okta:user_group"
      ],
      "profile": {
          "name": "West Coast Users",
          "description": "Straight Outta Compton"
      },
      "_links": {
          "logo": [
              {
                  "href": "https://your-domain.okta.com/img/logos/groups/okta-medium.png",
                  "name": "medium",
                  "type": "image/png"
              },
              {
                  "href": "https://your-domain.okta.com/img/logos/groups/okta-large.png",
                  "name": "large",
                  "type": "image/png"
              }
          ],
          "users": {
              "href": "https://your-domain.okta.com/api/v1/groups/00gevhYMOEIQMDAPUQGQ/users"
          },
          "apps": {
              "href": "https://your-domain.okta.com/api/v1/groups/00gevhYMOEIQMDAPUQGQ/apps"
          }
      }
  }
]
~~~

### Update Group
{:.api .api-operation}

<span class="api-uri-template api-uri-put"><span class="api-label">PUT</span> /groups/*:id*</span>

Updates an Okta group's profile.

> Only profiles for Okta groups can be modified.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                   | ParamType | DataType                          | Required | Default
--------- | ----------------------------- | --------- | --------------------------------- | -------- | -------
id        | id of the group to update     | URL       | String                            | TRUE     |
profile   | Updated profile for the group | Body      | [Profile Object](#profile-object) | TRUE     |

> All profile properties must be specified when updating a user's profile.  **partial updates are not supported!**

##### Response Parameters
{:.api .api-response .api-response-params}

Updated [Group](#group-model)

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "name": "Ameliorate Name",
    "description": "Amended description",
  }
}' "https://${org}.okta.com/api/v1/groups/00ub0oNGTSWTBKOLGLNR"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
    "id": "00ub0oNGTSWTBKOLGLNR",
    "objectClass": [
        "okta:user_group"
    ],
    "profile": {
        "name": "Ameliorate Name",
        "description": "Amended description"
    },
    "_links": {
        "logo": [
            {
                "href": "https://your-domain.okta.com/img/logos/groups/okta-medium.png",
                "name": "medium",
                "type": "image/png"
            },
            {
                "href": "https://your-domain.okta.com/img/logos/groups/okta-large.png",
                "name": "large",
                "type": "image/png"
            }
        ],
        "users": {
            "href": "https://your-domain.okta.com/api/v1/groups/00ub0oNGTSWTBKOLGLNR/users"
        },
        "apps": {
            "href": "https://your-domain.okta.com/api/v1/groups/00ub0oNGTSWTBKOLGLNR/apps"
        }
    }
}
~~~

### Remove Group
{:.api .api-operation}

<span class="api-uri-template api-uri-delete"><span class="api-label">DELETE</span> /groups/*:id*</span>

Removes an Okta group from your organization.

> Only Okta groups can be removed.  Application import operations are responsible for syncing non-Okta groups such as Active Directory groups.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                 | ParamType | DataType | Required | Default
--------- | --------------------------- | --------- | -------- | -------- | -------
id        | `id` of the group to delete | URL       | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

N/A

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${org}.okta.com/api/v1/groups/00ub0oNGTSWTBKOLGLNR"
~~~


##### Response Example
{:.api .api-response .api-response-example}

~~~http
HTTP/1.1 204 No Content
~~~

## Group Member Operations

### List Group Members
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET</span> /groups/*:id*/users</span>

Enumerates all [users](#users.html) that are a member of a group.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                                | ParamType | DataType | Required | Default
--------- | ---------------------------------------------------------- | --------- | -------- | -------- | -------
id        | `id` of the group                                          | URL       | String   | TRUE     |
limit     | Specifies the number of user results in a page             | Query     | Number   | FALSE    | 10000
after     | Specifies the pagination cursor for the next page of users | Query     | String   | FALSE    |

> The `after` cursor should treated as an opaque value and obtained through the next link relation. See [Pagination](/docs/getting_started/design_principles.html#pagination)

The default user limit is set to a very high number due to historical reasons which is no longer valid for most organizations.  This will change in a future version of this API.  The recommended page limit is now `limit=200`.

> If you receive a HTTP 500 status code, you more than likely have exceeded the request timeout.  Retry your request with a smaller `limit` and page the results (See [Pagination](/docs/getting_started/design_principles.html#pagination))

##### Response Parameters
{:.api .api-response .api-response-params}

Array of [Users](users.html#user-model)

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${org}.okta.com/api/v1/groups/00g1fanEFIQHMQQJMHZP/users?limit=2"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~http
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://your-domain.okta.com/api/v1/groups/00g1fanEFIQHMQQJMHZP/users?limit=2>; rel="self"
Link: <https://your-domain.okta.com/api/v1/groups/00g1fanEFIQHMQQJMHZP/users?after=00u1f9cMYQZFMPVXIDIZ&limit=200>; rel="next"

[
    {
        "id": "00u1f96ECLNVOKVMUSEA",
        "status": "ACTIVE",
        "created": "2013-12-12T16:14:22.000Z",
        "activated": "2013-12-12T16:14:22.000Z",
        "statusChanged": "2013-12-12T22:14:22.000Z",
        "lastLogin": null,
        "profile": {
            "firstName": "Easy",
            "lastName": "E",
            "email": "easy-e@example.com",
            "login": "easy-e@example.com",
            "mobilePhone": null
        },
        "credentials": {
            "password": {}
        },
        "_links": {
            "resetPassword": {
                "href": "https://your-domain.okta.com/api/v1/users/00u1f96ECLNVOKVMUSEA/lifecycle/reset_password"
            },
            "changeRecoveryQuestion": {
                "href": "https://your-domain.okta.com/api/v1/users/00u1f96ECLNVOKVMUSEA/credentials/change_recovery_question"
            },
            "deactivate": {
                "href": "https://your-domain.okta.com/api/v1/users/00u1f96ECLNVOKVMUSEA/lifecycle/deactivate"
            },
            "changePassword": {
                "href": "https://your-domain.okta.com/api/v1/users/00u1f96ECLNVOKVMUSEA/credentials/change_password"
            }
        }
    },
    {
        "id": "00u1f9cMYQZFMPVXIDIZ",
        "status": "ACTIVE",
        "created": "2013-12-12T16:14:42.000Z",
        "activated": "2013-12-12T16:14:42.000Z",
        "statusChanged": "2013-12-12T16:14:42.000Z",
        "lastLogin": "2013-12-12T18:14:42.000Z",
        "profile": {
            "firstName": "Dr.",
            "lastName": "Dre",
            "email": "dr.dre@example.com",
            "login": "dr.dre@example.com",
            "mobilePhone": null
        },
        "credentials": {
            "password": {}
        },
        "_links": {
            "resetPassword": {
                "href": "https://your-domain.okta.com/api/v1/users/00u1f9cMYQZFMPVXIDIZ/lifecycle/reset_password"
            },
            "changeRecoveryQuestion": {
                "href": "https://your-domain.okta.com/api/v1/users/00u1f9cMYQZFMPVXIDIZ/credentials/change_recovery_question"
            },
            "deactivate": {
                "href": "https://your-domain.okta.com/api/v1/users/00u1f9cMYQZFMPVXIDIZ/lifecycle/deactivate"
            },
            "changePassword": {
                "href": "https://your-domain.okta.com/api/v1/users/00u1f9cMYQZFMPVXIDIZ/credentials/change_password"
            }
        }
    }
]
~~~

### Add User to Group
{:.api .api-operation}

<span class="api-uri-template api-uri-put"><span class="api-label">PUT</span> /groups/*:gid*/users/*:uid*</span>

Adds an [Okta user](users.html#user-model) to an Okta group.

> You can only manage Okta-mastered group memberships.  Application import operations are responsible for syncing non-Okta group memberships such as Active Directory groups.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description     | ParamType | DataType | Required | Default
--------- | --------------- | --------- | -------- | -------- | -------
gid       | id of the group | URL       | String   | TRUE     |
uid       | id of the user  | URL       | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

N/A

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${org}.okta.com/api/v1/groups/00g1fanEFIQHMQQJMHZP/users/00u1f96ECLNVOKVMUSEA"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~http
HTTP/1.1 204 No Content
~~~

### Remove User from Group
{:.api .api-operation}

<span class="api-uri-template api-uri-delete"><span class="api-label">DELETE</span> /groups/*:gid*/users/*:uid*</span>

Removes an [Okta user](users.html#user-model) from an Okta group.

> You can only manage Okta-mastered group memberships.  Application import operations are responsible for syncing non-Okta group memberships such as Active Directory groups.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description       | ParamType | DataType | Required | Default
--------- | ----------------- | --------- | -------- | -------- | -------
gid       | `id` of the group | URL       | String   | TRUE     |
uid       | `id` of the user  | URL       | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

N/A

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${org}.okta.com/api/v1/groups/00g1fanEFIQHMQQJMHZP/users/00u1f96ECLNVOKVMUSEA"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~http
HTTP/1.1 204 No Content
~~~

## Related Resources

### List Assigned Applications
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET</span> /groups/*:id*/apps</span>

Enumerates all [applications](apps.html#application-model) that are assigned to the group. See [Application Group Operations](apps.html#application-group-operations)

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                               | ParamType | DataType | Required | Default
--------- | --------------------------------------------------------- | --------- | -------- | -------- | -------
id        | id of the group                                           | URL       | String   | TRUE     |
limit     | Specifies the number of app results for a page            | Query     | Number   | FALSE    | 20
after     | Specifies the pagination cursor for the next page of apps | Query     | String   | FALSE    |

> The page cursor should treated as an opaque value and obtained through the next link relation. See [Pagination](/docs/getting_started/design_principles.html#pagination)

##### Response Parameters
{:.api .api-response .api-response-params}

Array of [Applications](apps.html#application-model)

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${org}.okta.com/api/v1/groups/00g1fanEFIQHMQQJMHZP/apps"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~http
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://your-domain.okta.com/api/v1/groups/00g1fanEFIQHMQQJMHZP/apps>; rel="self"
Link: <https://your-domain.okta.com/api/v1/groups/00g1fanEFIQHMQQJMHZP/apps?after=0oafxqCAJWWGELFTYASJ>; rel="next"

[
 {
        "id": "0oafwvZDWJKVLDCUWUAC",
        "name": "template_basic_auth",
        "label": "Sample Basic Auth App",
        "status": "ACTIVE",
        "lastUpdated": "2013-09-30T00:56:52.000Z",
        "created": "2013-09-30T00:56:52.000Z",
        "accessibility": {
            "selfService": false,
            "errorRedirectUrl": null
        },
        "visibility": {
            "autoSubmitToolbar": false,
            "hide": {
                "iOS": false,
                "web": false
            },
            "appLinks": {
                "login": true
            }
        },
        "features": [],
        "signOnMode": "BASIC_AUTH",
        "credentials": {
            "scheme": "EDIT_USERNAME_AND_PASSWORD",
            "userNameTemplate": {
                "template": "${source.login}",
                "type": "BUILT_IN"
            }
        },
        "settings": {
            "app": {
                "url": "https://example.com/login.html",
                "authURL": "https://example.com/auth.html"
            }
        },
        "_links": {
            "appLinks": [
                {
                    "href": "https://your-domain.okta.com/home/template_basic_auth/0oafwvZDWJKVLDCUWUAC/1438",
                    "name": "login",
                    "type": "text/html"
                }
            ],
            "users": {
                "href": "https://your-domain.okta.com/api/v1/apps/0oafwvZDWJKVLDCUWUAC/users"
            },
            "deactivate": {
                "href": "https://your-domain.okta.com/api/v1/apps/0oafwvZDWJKVLDCUWUAC/lifecycle/deactivate"
            },
            "groups": {
                "href": "https://your-domain.okta.com/api/v1/apps/0oafwvZDWJKVLDCUWUAC/groups"
            }
        }
    },
    {
        "id": "0oafxqCAJWWGELFTYASJ",
        "name": "bookmark",
        "label": "Sample Bookmark App",
        "status": "ACTIVE",
        "lastUpdated": "2013-10-02T22:06:24.000Z",
        "created": "2013-10-01T04:22:27.000Z",
        "accessibility": {
            "selfService": false,
            "errorRedirectUrl": null
        },
        "visibility": {
            "autoSubmitToolbar": false,
            "hide": {
                "iOS": false,
                "web": false
            },
            "appLinks": {
                "login": true
            }
        },
        "features": [],
        "signOnMode": "BOOKMARK",
        "credentials": {
            "userNameTemplate": {
                "template": "${user.firstName}",
                "type": "CUSTOM"
            }
        },
        "settings": {
            "app": {
                "requestIntegration": false,
                "url": "https://example.com/bookmark.htm"
            }
        },
        "_links": {
            "appLinks": [
                {
                    "href": "https://your-domain.okta.com/home/bookmark/0oafxqCAJWWGELFTYASJ/1280",
                    "name": "login",
                    "type": "text/html"
                }
            ],
            "users": {
                "href": "https://your-domain.okta.com/api/v1/apps/0oafxqCAJWWGELFTYASJ/users"
            },
            "deactivate": {
                "href": "https://your-domain.okta.com/api/v1/apps/0oafxqCAJWWGELFTYASJ/lifecycle/deactivate"
            },
            "groups": {
                "href": "https://your-domain.okta.com/api/v1/apps/0oafxqCAJWWGELFTYASJ/groups"
            }
        }
    }
]
~~~
