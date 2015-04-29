---
layout: docs_page
title: Apps
---



## Overview

The Okta Application API provides operations to manage applications and/or assignments to users or groups for your organization.

## Application Model

### Example

~~~ json
{
  "id": "0oabhnUQFYHMBNVSVXMV",
  "name": "template_saml_2_0",
  "label": "Example SAML App",
  "status": "ACTIVE",
  "lastUpdated": "2013-09-09T16:25:14.000Z",
  "created": "2013-09-09T16:25:14.000Z",
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
  "signOnMode": "SAML_2_0",
  "credentials": {
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "audienceRestriction": "https://www.example.com/",
      "groupName": null,
      "forceAuthn": false,
      "defaultRelayState": null,
      "postBackURL": "https://www.example.com/sso/saml",
      "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
      "configuredIssuer": null,
      "requestCompressed": "COMPRESSED",
      "groupFilter": null,
      "recipient": "https://www.example.com/",
      "signAssertion": "SIGNED",
      "destination": "https://www.example.com/",
      "signResponse": "SIGNED",
      "nameIDFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
      "attributeStatements": null
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "groups": {
      "href": "http://example.okta.com/api/v1/apps/0oabhnUQFYHMBNVSVXMV/groups"
    },
    "users": {
      "href": "https://example.okta.com/api/v1/apps/0oabhnUQFYHMBNVSVXMV/users"
    },
    "self": {
      "href": "https://example.okta.com/api/v1/apps/0oabhnUQFYHMBNVSVXMV"
    },
    "metadata": {
      "href": "https://example.okta.com/app/0oabhnUQFYHMBNVSVXMV/sso/saml/metadata"
    },
    "deactivate": {
      "href": "https://example.okta.com/api/v1/apps/0oabhnUQFYHMBNVSVXMV/lifecycle/deactivate"
    }
  }
}
~~~

### Application Attributes

All applications have the following attributes:

Attribute     | Description                                | DataType                                                          | MinLength | MaxLength | Nullable | Unique | Readonly
------------- | ------------------------------------------ | ----------------------------------------------------------------- | --------- | --------- | -------- | ------ | --------
id            | unique key for app                         | String                                                            |           |           | FALSE    | TRUE   | TRUE
name          | unique key for app definition              | String ([App Names & Settings](#app-names--settings))             | 1         | 255       | FALSE    | TRUE   | TRUE
label         | unique user-defined display name for app   | String                                                            | 1         | 50        | FALSE    | TRUE   | FALSE
created       | timestamp when app was created             | Date                                                              |           |           | FALSE    | FALSE  | TRUE
lastUpdated   | timestamp when app was last updated        | Date                                                              |           |           | FALSE    | FALSE  | TRUE
status        | status of app                              | `ACTIVE` or `INACTIVE`                                            |           |           | FALSE    | FALSE  | TRUE
features      | enabled app features                       | [Features](#features)                                             |           |           | TRUE     | FALSE  | FALSE
signOnMode    | authentication mode of app                 | [SignOn Mode](#signon-modes)                                      |           |           | FALSE    | FALSE  | FALSE
accessibility | access settings for app                    | [Accessibility Object](#accessibility-object)                     |           |           | TRUE     | FALSE  | FALSE
visibility    | visibility settings for app                | [Visibility Object](#visibility-object)                           |           |           | TRUE     | FALSE  | FALSE
credentials   | credentials for the specified `signOnMode` | [Application Credentials Object](#application-credentials-object) |           |           | TRUE     | FALSE  | FALSE
settings      | settings for app                           | Object ([App Names & Settings](#app-names--settings))             |           |           | TRUE     | FALSE  | FALSE
_links        | discoverable resources related to the app  | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)    |           |           | TRUE     | FALSE  | TRUE
_embedded     | embedded resources related to the app      | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)    |           |           | TRUE     | FALSE  | TRUE

> `id`, `created`, `lastUpdated`, `status`, `_links`, and `_embedded` are only available after an app is created


#### App Names & Settings

The Okta Application Network (OAN) defines the catalog of applications that can be added to your Okta organization.  Each application has a unique name (key) and schema that defines the required and optional settings for the application.  When adding an application, the unique app name must be specified in the request as well as any required settings.

The catalog is currently not exposed via an API.  While additional apps may be added via the API, only the following template applications are documented:

Name                | Example
------------------- | ---------------------------------------------------------
bookmark            | [Add Bookmark Application](#add-bookmark-application)
template_basic_auth | [Add Basic Authentication Application](#add-basic-authentication-application)
template_swa        | [Add Plugin SWA Application](#add-plugin-swa-application)
template_swa3field  | [Add Plugin SWA (3 Field) Application](#add-plugin-swa-3-field-application)
tempalte_sps        | [Add SWA Application (No Plugin)](#add-swa-application-no-plugin)
template_saml_2_0   | [Add SAML 2.0 Application](#add-saml-20-application)
template_wsfed      | [Add WS-Federation Application](#add-ws-federation-application)

The current workaround is to manually configure the desired application via the Okta Admin UI in a preview (sandbox) organization and view the application via [Get Application](#get-application)

> App provisioning settings currently cannot be managed via the API and must be configured via the Okta Admin UI.

#### Features

Applications may support optional provisioning features on a per-app basis.

> Provisioning features currently may not be configured via the API and must be configured via the Okta Admin UI.

The list of provisioning features an app may support are:

App Feature            | Admin UI Name          | Description
---------------------- | ---------------------- | -----------------------------
IMPORT_NEW_USERS       | User Import            | Creates or links a user in Okta to a user from the application.
IMPORT_PROFILE_UPDATES | User Import            | Updates a linked user's app profile during manual or scheduled imports.
PROFILE_MASTERING      | Profile Master         | Designates the app as the identity lifecycle and profile attribute authority for linked users.  The user's profile in Okta is *read-only*
IMPORT_USER_SCHEMA     |                        | Discovers the profile schema for a user from the app automatically
PUSH_NEW_USERS         | Create Users           | Creates or links a user account in the application when assigning the app to a user in Okta.
PUSH_PROFILE_UPDATES   | Update User Attributes | Updates a user's profile in the app when the user's profile changes in Okta (Profile Master).
PUSH_USER_DEACTIVATION | Deactivate Users       | Deactivates a user's account in the app when unassigned from the app in Okta or deactivated.
REACTIVATE_USERS       | Deactivate Users       | Reactivates an existing inactive user when provisioning a user to the app.
PUSH_PASSWORD_UPDATES  | Sync Okta Password     | Updates the user's app password when their password changes in Okta.
GROUP_PUSH             | Group Push             | Creates or links a group in the app when a mapping is defined for a group in Okta.  Okta is the the master for group memberships and all group members in Okta who are also assigned to the app will be synced as group members to the app.

#### SignOn Modes

Applications support a limited set of sign-on modes that specify how a user is authenticated to the app.

The list of possible modes an app may support are:

Mode                  | Description
--------------------- | -------------------------------------------------------
BOOKMARK              | Just a bookmark (no-authentication)
BASIC_AUTH            | HTTP Basic Authentication with Okta Browser Plugin
BROWSER_PLUGIN        | Secure Web Authentication (SWA) with Okta Browser Plugin
SECURE_PASSWORD_STORE | Secure Web Authentication (SWA) with POST (plugin not required)
SAML_2_0              | Federated Authentication with SAML 2.0 WebSSO
WS_FEDERATION         | Federated Authentication with WS-Federation Passive Requestor Profile
Custom                | App-Specific SignOn Mode

This setting modifies the same settings as the `Sign On` tab when editing an application in your Okta Administration app.

### Accessibility Object

Specifies access settings for the application.

Attribute        | Description                                | DataType | MinLength | MaxLength | Nullable | Default
---------------- | ------------------------------------------ | -------- | --------- | --------- | -------- | -------
selfService      | Enable self-service application assignment | Boolean  |           |           | TRUE     | FALSE
errorRedirectUrl | Custom error page for this application     | String   |           |           | TRUE     | NULL (Global Error Page)

~~~ json
{
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null
  }
}
~~~


### Visibility Object

Specifies visibility settings for the application.

Attribute         | Description                                        | DataType                            | MinLength | MaxLength | Nullable | Default
----------------- | -------------------------------------------------- | ----------------------------------- | --------- | --------- | -------- | -------
autoSubmitToolbar | Automatically log in when user lands on login page | Boolean                             |           |           | FALSE    | FALSE
hide              | Hides this app for specific end-user apps          | [Hide Object](#hide-object)         |           |           | FALSE    |
appLinks          | Displays specific appLinks for the app             | [AppLinks Object](#applinks-object) |           |           | FALSE    |

~~~ json
{
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "login": true
    }
  }
}
~~~

#### Hide Object

Attribute | Description                                        | DataType | Nullable | Default
--------- | -------------------------------------------------- | -------- | -------- | -------
iOS       | Okta Mobile for iOS or Android (pre-dates Android) | Boolean  | FALSE    | FALSE
web       | Okta Web Browser Home Page                         | Boolean  | FALSE    | FALSE

#### AppLinks Object

Each application defines 1 or more appLinks that can be published. AppLinks can be disabled by setting the link value to `false` .

### Application Credentials Object

Specifies credentials and scheme for the application's `signOnMode`.

Attribute        | Description                                                                  | DataType                                              | MinLength | MaxLength | Nullable | Default
---------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------- | --------- | --------- | -------- | -------
scheme           | Determines how credentials are managed for the `signOnMode`                  | [Authentication Scheme](#authentication-schemes)      |           |           | TRUE     | NULL
userNameTemplate | Template used to generate a user’s username when the application is assigned via a group or directly to a user | [UserName Template Object](#username-template-object) |           |           | TRUE     | *Okta UserName*
userName         | Shared username for app                                                      | String                                                | 1         | 100       | TRUE     | NULL
password         | Shared password for app                                                      | [Password Object](#password-object)                   |           |           | TRUE     | NULL

~~~ json
{
  "credentials": {
    "scheme": "SHARED_USERNAME_AND_PASSWORD",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    },
    "userName": "test",
    "password": {}
  }
}
~~~

#### Authentication Schemes

Applications that are configured with the `BASIC_AUTH`, `BROWSER_PLUGIN`, or `SECURE_PASSWORD_STORE`  have credentials vaulted by Okta and can be configured with the following schemes:

Scheme                       | Description                                                               | Shared UserName | Shared Password | App UserName   | App Password
---------------------------- | ------------------------------------------------------------------------- | --------------- | --------------- | -------------- | -----------------------
SHARED_USERNAME_AND_PASSWORD | Users share a single username and password set by administrator           | Admin:R/W       | Admin:W         |                |
EXTERNAL_PASSWORD_SYNC       | Administrator sets username, password is the same as user's Okta password |                 |                 | Admin:R/W      | *Current User Password*
EDIT_USERNAME_AND_PASSWORD   | User sets username and password                                           |                 |                 | Admin/User:R/W | Admin/User:W
EDIT_PASSWORD_ONLY           | Administrator sets username, user sets password                           |                 |                 | Admin:R/W      | Admin/User:W

> `BOOKMARK`, `SAML_2_0`, and `WS_FEDERATION` signOnModes do not support an authentication scheme as they use a federated SSO protocol.  The `scheme` property should be omitted for apps with these signOnModes

#### UserName Template Object

Specifies the template used to generate a user's username when the application is assigned via a group or directly to a user

Attribute  | Description                             | DataType                         | MinLength | MaxLength | Nullable | Default
---------- | --------------------------------------- | -------------------------------- | --------- | --------- | -------- | ----------------
template   | mapping expression for username         | String                           |           | 1024      | TRUE     | `${source.login}`
type       | type of mapping expression              | `NONE`,  `BUILT_IN`, or `CUSTOM` |           |           | FALSE    | BUILT_IN
userSuffix | suffix for built-in mapping expressions | String                           |           |           | TRUE     | NULL

> You must use the `CUSTOM` type when defining your own expression that is not built-in

~~~ json
{
  "userNameTemplate": {
    "template": "${source.login}",
    "type": "BUILT_IN"
  }
}
~~~

##### Built-In Expressions

The following expressions are built-in and may be used with the `BUILT_IN` template type:

Name                            | Template Expression
------------------------------- | ---------------------------------------------
Okta username                   | ${source.login}
Okta username prefix            | ${fn:substringBefore(source.login, ""@"")}
Email                           | ${source.email}
Email prefix                    | ${fn:substringBefore(source.email, ""@"")}
Email (lowercase)               | ${fn:toLowerCase(source.email)}
AD SAM Account Name             | ${source.samAccountName}
AD SAM Account Name (lowercase) | ${fn:toLowerCase(source.samAccountName)}
AD User Principal Name          | ${source.userName}
AD User Principal Name prefix   | ${fn:substringBefore(source.userName, ""@"")}
AD Employee ID                  | ${source.employeeID}
LDAP UID + custom suffix        | ${source.userName}${instance.userSuffix}

### Password Object

Specifies a password for a user.  A password value is a **write-only** property.  When a user has a valid password and a response object contains a password credential, then the Password Object will be a bare object without the `value`  property defined (e.g. `password: {}` ) to indicate that a password value exists.

Attribute | DataType | MinLength | MaxLength | Nullable | Unique | Validation
--------- | -------- | --------- | --------- | -------- | ------ | ----------
value     | String   |           |           | TRUE     | FALSE  |

### Application Links Object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current status of an application using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification.  This object is used for dynamic discovery of related resources and lifecycle operations.  The Links Object is **read-only**.

Link Relation Type | Description
------------------ | -----------
self               | The actual application
activate           | [Lifecycle action](#activate-application) to transition application to `ACTIVE` status
deactivate         | [Lifecycle action](#deactivate-application) to transition application to `INACTIVE` status
metadata           | Protocol-specific metadata document for the configured `SignOnMode`
users              | [User](#application-user-operations) assignments for application
groups             | [Group](#application-group-operations) assignments for application
logo               | Application logo image

## Application User Model

The application user model defines a user's app-specific profile and credentials for an application.

### Example

~~~ json
{
  "id": "00u11z6WHMYCGPCHCRFK",
  "externalId": "70c14cc17d3745e8a9f98d599a68329c",
  "created": "2014-06-24T15:27:59.000Z",
  "lastUpdated": "2014-06-24T15:28:14.000Z",
  "scope": "USER",
  "status": "ACTIVE",
  "statusChanged": "2014-06-24T15:28:14.000Z",
  "passwordChanged": "2014-06-24T15:27:59.000Z",
  "syncState": "SYNCHRONIZED",
  "lastSync": "2014-06-24T15:27:59.000Z",
  "credentials": {
    "userName": "saml.jackson@example.com",
    "password": {}
  },
  "profile": {
    "secondEmail": null,
    "lastName": "Jackson",
    "mobilePhone": null,
    "email": "saml.jackson@example.com",
    "salesforceGroups": [
      "Employee"
    ],
    "role": "CEO",
    "firstName": "Saml",
    "profile": "Standard User"
  },
  "_links": {
    "app": {
      "href": "https://example.okta.com/api/v1/apps/0oabhnUQFYHMBNVSVXMV"
    },
    "user": {
      "href": "https://example.okta.com/api/v1/users/00u11z6WHMYCGPCHCRFK"
    }
  }
}
~~~

### Application User Attributes

All application user assignments have the following attributes:

Attribute       | Description                                                  | DataType                                                                    | MinLength | MaxLength | Nullable | Unique | Readonly
--------------- | ----------------------------------------------------------   | --------------------------------------------------------------------------- | --------- | --------- | -------- | ------ | --------
id              | unique key of [User](Users.html)                             | String                                                                      |           |           | FALSE    | TRUE   | TRUE
externalId      | id of user in target app *(must be imported or provisioned)* | String                                                                      |           | 512       | TRUE     | TRUE   | TRUE
created         | timestamp when app user was created                          | Date                                                                        |           |           | FALSE    | FALSE  | TRUE
lastUpdated     | timestamp when app user was last updated                     | Date                                                                        |           |           | FALSE    | FALSE  | TRUE
scope           | toggles the assignment between user or group scope           | `USER` or `GROUP`                                                           |           |           | FALSE    | FALSE  | FALSE
status          | status of app user                                           | `STAGED`, `PROVISIONED`, `ACTIVE`, `INACTIVE`, or `DEPROVISIONED`           |           |           | FALSE    | FALSE  | TRUE
statusChanged   | timestamp when status was last changed                       | Date                                                                        |           |           | TRUE     | FALSE  | TRUE
passwordChanged | timestamp when app password last changed                     | Date                                                                        |           |           | TRUE     | FALSE  | TRUE
syncState       | synchronization state for app user                           | `DISABLED`, `OUT_OF_SYNC`, `SYNCING`, `SYNCHRONIZED`, `ERROR`               |           |           | FALSE    | FALSE  | TRUE
lastSync        | timestamp when last sync operation was executed              | Date                                                                        |           |           | TRUE     | FALSE  | TRUE
credentials     | credentials for assigned app                                 | [Application User Credentials Object](#application-user-credentials-object) |           |           | TRUE     | FALSE  | FALSE
profile         | app-specific profile for the user                            | [Application User Profile Object](#application-user-profile-object)         |           |           | FALSE    | FALSE  | TRUE
_links          | discoverable resources related to the app user               | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-05)              |           |           | TRUE     | FALSE  | TRUE

> `lastSync` is only updated for applications with the `IMPORT_PROFILE_UPDATES` or `PUSH PROFILE_UPDATES` feature

#### External ID

Users in Okta are linked to a user in a target application via an `externalId`.  Okta anchors an user with his or her `externalId` during an import or provisioning synchronization event.  Okta uses the native app-specific identifier or primary key for the user as the `externalId`.  The `externalId` is selected during import when the user is confirmed (reconciled) or during provisioning when the user has been successfully created in the target application.

> SSO Application Assignments (e.g. SAML or SWA) do not have an `externalId` as they are not synchronized with the application.

#### Application User Status

##### Single Sign-On

Users assigned to an application for SSO without provisioning features enabled will have a an `ACTIVE` status with `syncState` as `DISABLED`.

##### User Import

Users imported and confirmed by an application with the `IMPORT_PROFILE_UPDATES` feature will have an `ACTIVE` status.  The application user's `syncState` depends on whether the `PROFILE_MASTERING` feature is enabled for the application. When `PROFILE_MASTERING` is enabled the `syncState` transitions to `SYNCHRONIZED` otherwise the `syncState` is `DISABLED`.

##### User Provisioning

User provisioning in Okta is an asynchronous background job that is triggered during assignment of user (or indirectly via a group assignment).

1. User is assigned to an application that has `PUSH_NEW_USERS` feature enabled
    * Application user will have a `STAGED` status with no `externalId` while the background provisioning job is queued.
2. When the background provisioning job completes successfully, the application user transitions to the `PROVISIONED` status.
    * Application user is assigned an `externalId` when successfully provisioned in target application.  The `externalId` should be immutable for the life of the assignment
3. If the background provisioning job completes with an error, the application user remains with the `STAGED` status but will have `syncState` as `ERROR`.  A provisioning task is created in the Okta Admin UI that must be resolved to retry the job.

When the `PUSH_PROFILE_UPDATES` feature is enabled, updates to an upstream profile are pushed downstream to the application according to profile mastering priority.  The app user's `syncState` will have the following values:

syncState    | Description
------------ | -----------
OUT_OF_SYNC  | Application user has changes that have not been pushed to the target application
SYNCING      | Background provisioning job is running to update the user's profile in the target application
SYNCHRONIZED | All changes to the app user profile have successfully been synchronized with the target application
ERROR        | Background provisioning job failed to update the user's profile in the target application. A provisioning task is created in the Okta Admin UI that must be resolved to retry the job.

> User provisioning currently must be configured via the Okta Admin UI and is only available to with specific editions.

### Application User Credentials Object

Specifies a user's credentials for the application.  The [Authentication Scheme](#authentication-schemes) of the application determines whether a userName or password can be assigned to a user.

Attribute | Description      | DataType                            | MinLength | MaxLength | Nullable | Default
--------- | ---------------- | ----------------------------------- | --------- | --------- | -------- | ---
userName  | username for app | String                              | 1         | 100       | TRUE     | NULL
password  | password for app | [Password Object](#password-object) |           |           | TRUE     | NULL

~~~ json
{
  "credentials": {
    "userName": "test",
    "password": {}
  }
}
~~~

> The application's [UserName Template](#username-template-object) defines the default username generated when a user is assigned to an application.

If you attempt to assign a username or password to an application with an incompatible [Authentication Scheme](#authentication-schemes) you will receive the following error:

~~~ json
{
  "errorCode": "E0000041",
  "errorSummary": "Credentials should not be set on this resource based on the scheme.",
  "errorLink": "E0000041",
  "errorId": "oaeUM77NBynQQu4C_qT5ngjGQ",
  "errorCauses": [
    {
      "errorSummary": "User level credentials should not be provided for this scheme."
    }
  ]
}
~~~

### Application User Profile Object

Application User profiles are app-specific but may be customized by the Profile Editor in the Okta Admin UI. SSO apps typically don't support a user profile while apps with [user provisioning features](#features) have an app-specific profiles with optional and/or required attributes.  Any profile attribute visible in the Okta Admin UI for an application assignment can also be assigned via the API. Some attributes are reference attributes and imported from the target application and only allow specific values to be configured.

#### Profile Editor

![Profile Editor UI](/assets/img/okta-admin-ui-profile-editor.png "Profile Editor UI")

> Managing profiles for applications is restricted to specific editions and requires access to the Universal Directory Early Access feature

#### Example Application Assignment

![App Assignment UI](/assets/img/okta-admin-ui-app-assignment.png "App Assignment UI")

#### Example Profile Object

~~~ json
{
  "profile": {
    "secondEmail": null,
    "lastName": "Jackson",
    "mobilePhone": null,
    "email": "saml.jackson@example.com",
    "salesforceGroups": [
      "Employee"
    ],
    "role": "CEO",
    "firstName": "Saml",
    "profile": "Standard User"
  }
}
~~~

## Application Group Model

### Example

~~~ json
{
  "id": "00gbkkGFFWZDLCNTAGQR",
  "lastUpdated": "2013-09-11T15:56:58.000Z",
  "priority": 0,
  "_links": {
    "user": {
      "href": "https://example.okta.com/api/v1/users/00ubgfEUVRPSHGWHAZRI"
    }
  }
}
~~~

### Application Group Attributes

All application groups have the following attributes:

Attribute   | Description                                     | DataType                                                       | MinLength | MaxLength | Nullable | Unique | Readonly
----------- | ----------------------------------------------- | -------------------------------------------------------------- | --------- | --------- | -------- | ------ | --------
id          | unique key of group                             | String                                                         |           |           | FALSE    | TRUE   | TRUE
lastUpdated | timestamp when app group was last updated       | Date                                                           |           |           | FALSE    | FALSE  | TRUE
priority    | priority of group assignment                    | Number                                                         | 0         | 100       | TRUE     | FALSE  | FALSE
_links      | discoverable resources related to the app group | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-05) |           |           | TRUE     | FALSE  | TRUE


## Application Operations

### Add Application
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST</span> /apps</span>

Adds a new application to your Okta organization.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                | Param Type | DataType                          | Required | Default
--------- | ------------------------------------------ | ---------- | --------------------------------- | -------- | -------
app       | App-specific name, signOnMode and settings | Body       | [Application](#application-model) | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

All responses return the created [Application](#application-model).

#### Add Bookmark Application
{:.api .api-operation}

Adds an new bookmark application to your organization.

##### Settings
{:.api .api-request .api-request-params}

Attribute          | Description                                             | DataType | Nullable | Unique | Validation
------------------ | ------------------------------------------------------- | -------- | -------- | ------ | ----------------------------------------
url                | The URL of the launch page for this app                 | String   | FALSE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986)
requestIntegration | Would you like Okta to add an integration for this app? | Boolean  | FALSE    | FALSE  |

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://your-domain.okta.com/api/v1/apps" \
-d \
'{
  "name": "bookmark",
  "label": "Sample Bookmark App",
  "signOnMode": "BOOKMARK",
  "settings": {
    "app": {
      "requestIntegration": false,
      "url": "https://example.com/bookmark.htm"
    }
  }
}'
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
  "id": "0oafxqCAJWWGELFTYASJ",
  "name": "bookmark",
  "label": "Sample Bookmark App",
  "status": "ACTIVE",
  "lastUpdated": "2013-10-01T04:22:31.000Z",
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
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "requestIntegration": false,
      "url": "https://example.com/bookmark.htm"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://example.okta.com/api/v1/apps/0oafxqCAJWWGELFTYASJ/users"
    },
    "groups": {
      "href": "https://example.okta.com/api/v1/apps/0oafxqCAJWWGELFTYASJ/groups"
    },
    "self": {
      "href": "https://example.okta.com/api/v1/apps/0oafxqCAJWWGELFTYASJ"
    },
    "deactivate": {
      "href": "https://example.okta.com/api/v1/apps/0oafxqCAJWWGELFTYASJ/lifecycle/deactivate"
    }
  }
}
~~~

#### Add Basic Authentication Application
{:.api .api-operation}

Adds an new application that uses HTTP Basic Authentication Scheme and requires a browser plugin.

##### Settings
{:.api .api-request .api-request-params}

Attribute | Description                                     | DataType | Nullable | Unique | Validation
--------- | ----------------------------------------------- | -------- | -------- | ------ | ----------------------------------------
url       | The URL of the login page for this app          | String   | FALSE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986)
authURL   | The URL of the authenticating site for this app | String   | FALSE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986)

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://your-domain.okta.com/api/v1/apps" \
-d \
'{
  "name": "template_basic_auth",
  "label": "Sample Basic Auth App",
  "signOnMode": "BASIC_AUTH",
  "settings": {
    "app": {
      "url": "https://example.com/login.html",
      "authURL": "https://example.com/auth.html"
    }
  }
}'
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
  "id": "0oafwvZDWJKVLDCUWUAC",
  "name": "template_basic_auth",
  "label": "Sample Basic Auth App",
  "status": "ACTIVE",
  "lastUpdated": "2013-09-30T00:56:52.365Z",
  "created": "2013-09-30T00:56:52.365Z",
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
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://example.okta.com/api/v1/apps/0oafwvZDWJKVLDCUWUAC/users"
    },
    "groups": {
      "href": "https://example.okta.com/api/v1/apps/0oafwvZDWJKVLDCUWUAC/groups"
    },
    "self": {
      "href": "https://example.okta.com/api/v1/apps/0oafwvZDWJKVLDCUWUAC"
    },
    "deactivate": {
      "href": "https://example.okta.com/api/v1/apps/0oafwvZDWJKVLDCUWUAC/lifecycle/deactivate"
    }
  }
}
~~~

#### Add Plugin SWA Application
{:.api .api-operation}

Adds a SWA application that requires a browser plugin.

##### Settings
{:.api .api-request .api-request-params}

Attribute     | Description                                           | DataType | Nullable | Unique | Validation
------------- | ----------------------------------------------------- | -------- | -------- | ------ | ----------------------------------------
url           | The URL of the login page for this app                | String   | FALSE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986)
usernameField | CSS selector for the username field in the login form | String   | FALSE    | FALSE  |
passwordField | CSS selector for the password field in the login form | String   | FALSE    | FALSE  |
buttonField   | CSS selector for the login button in the login form   | String   | FALSE    | FALSE  |

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://your-domain.okta.com/api/v1/apps" \
-d \
'{
  "name": "template_swa",
  "label": "Sample Plugin App",
  "signOnMode": "BROWSER_PLUGIN",
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  }
}'
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
  "id": "0oabkvBLDEKCNXBGYUAS",
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "lastUpdated": "2013-09-11T17:58:54.000Z",
  "created": "2013-09-11T17:46:08.000Z",
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
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "EDIT_USERNAME_AND_PASSWORD",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
    },
    "groups": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
    },
    "self": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
    },
    "deactivate": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
    }
  }
}
~~~

#### Add Plugin SWA (3 Field) Application
{:.api .api-operation}

Adds a SWA application that requires a browser plugin and supports 3 CSS selectors for the login form.

##### Settings
{:.api .api-request .api-request-params}

Attribute          | Description                                           | DataType | Nullable | Unique | Validation
------------------ | ----------------------------------------------------- | -------- | -------- | ------ | ----------------------------------------
url                | The URL of the login page for this app                | String   | FALSE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986)
usernameField      | CSS selector for the username field in the login form | String   | FALSE    | FALSE  |
passwordField      | CSS selector for the password field in the login form | String   | FALSE    | FALSE  |
buttonField        | CSS selector for the login button in the login form   | String   | FALSE    | FALSE  |
extraFieldSelector | CSS selector for the extra field in the form          | String   | FALSE    | FALSE  |
extraFieldValue    | Value for extra field form field                      | String   | FALSE    | FALSE  |

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X "POST https://your-domain.okta.com/api/v1/apps" \
-d \
'{
  "name": "template_swa3field",
  "label": "Sample Plugin App",
  "signOnMode": "BROWSER_PLUGIN",
  "settings": {
    "app": {
      "buttonField": "#btn-login",
      "passwordField": "#txtbox-password",
      "usernameField": "#txtbox-username",
      "url": "https://example.com/login.html",
      "extraFieldSelector": ".login",
      "extraFieldValue": "SOMEVALUE"
    }
  }
}'
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
  "id": "0oabkvBLDEKCNXBGYUAS",
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "lastUpdated": "2013-09-11T17:58:54.000Z",
  "created": "2013-09-11T17:46:08.000Z",
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
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "EDIT_USERNAME_AND_PASSWORD",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "#btn-login",
      "passwordField": "#txtbox-password",
      "usernameField": "#txtbox-username",
      "url": "https://example.com/login.html",
      "extraFieldSelector": ".login",
      "extraFieldValue": "SOMEVALUE"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
    },
    "groups": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
    },
    "self": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
    },
    "deactivate": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
    }
  }
}
~~~

#### Add SWA Application (No Plugin)
{:.api .api-operation}

Adds a SWA application that uses HTTP POST and does not require a browser plugin

##### Settings
{:.api .api-request .api-request-params}

Attribute           | Description                                           | DataType  | Nullable | Unique | Validation
------------------- | ----------------------------------------------------- | --------- | -------- | ------ | ----------------------------------------
url                 | The URL of the login page for this app                | String    | FALSE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986)
usernameField       | CSS selector for the username field in the login form | String    | FALSE    | FALSE  |
passwordField       | CSS selector for the password field in the login form | String    | FALSE    | FALSE  |
optionalField1      | Name of the optional parameter in the login form      | String    | TRUE     | FALSE  |
optionalField1Value | Name of the optional value in the login form          | String    | TRUE     | FALSE  |
optionalField2      | Name of the optional parameter in the login form      | String    | TRUE     | FALSE  |
optionalField2Value | Name of the optional value in the login form          | String    | TRUE     | FALSE  |
optionalField3      | Name of the optional parameter in the login form      | String    | TRUE     | FALSE  |
optionalField3Value | Name of the optional value in the login form          | String    | TRUE     | FALSE  |


##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://your-domain.okta.com/api/v1/apps" \
-d \
'{
  "name": "template_sps",
  "label": "Example SWA App",
  "signOnMode": "SECURE_PASSWORD_STORE",
  "settings": {
    "app": {
      "url": "https://example.com/login.html",
      "passwordField": "#txtbox-password",
      "usernameField": "#txtbox-username",
      "optionalField1": "param1",
      "optionalField1Value": "somevalue",
      "optionalField2": "param2",
      "optionalField2Value": "yetanothervalue",
      "optionalField3": "param3",
      "optionalField3Value": "finalvalue"
    }
  }
}'
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
  "id": "0oafywQDNMXLYDBIHQTT",
  "name": "template_sps",
  "label": "Example SWA App",
  "status": "ACTIVE",
  "lastUpdated": "2013-10-01T05:41:01.983Z",
  "created": "2013-10-01T05:41:01.983Z",
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
  "signOnMode": "SECURE_PASSWORD_STORE",
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
      "passwordField": "#txtbox-password",
      "usernameField": "#txtbox-username",
      "optionalField1": "param1",
      "optionalField1Value": "somevalue",
      "optionalField2": "param2",
      "optionalField2Value": "yetanothervalue",
      "optionalField3": "param3",
      "optionalField3Value": "finalvalue"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://example.okta.com/api/v1/apps/0oafywQDNMXLYDBIHQTT/users"
    },
    "groups": {
      "href": "https://example.okta.com/api/v1/apps/0oafywQDNMXLYDBIHQTT/groups"
    },
    "self": {
      "href": "https://example.okta.com/api/v1/apps/0oafywQDNMXLYDBIHQTT"
    },
    "deactivate": {
      "href": "https://example.okta.com/api/v1/apps/0oafywQDNMXLYDBIHQTT/lifecycle/deactivate"
    }
  }
}
~~~

#### Add SAML 2.0 Application
{:.api .api-operation}

Adds a SAML 2.0 WebSSO application

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://your-domain.okta.com/api/v1/apps" \
-d \
'{
  "name": "template_saml_2_0",
  "label": "Example SAML App",
  "signOnMode": "SAML_2_0",
  "settings": {
    "app": {
      "audienceRestriction": "https://example.com/tenant/123",
      "forceAuthn": false,
      "postBackURL": "https://example.com/sso/saml",
      "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
      "requestCompressed": "COMPRESSED",
      "recipient": "https://example.com/sso/saml",
      "signAssertion": "SIGNED",
      "destination": "https://example.com/sso/saml",
      "signResponse": "SIGNED",
      "nameIDFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
      "groupName": null,
      "groupFilter": null,
      "defaultRelayState": null,
      "configuredIssuer": null,
      "attributeStatements": null
    }
  }
}'
~~~

#### Add WS-Federation Application
{:.api .api-operation}

Adds a WS-Federation Passive Requestor Profile application with a SAML 2.0 token

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://your-domain.okta.com/api/v1/apps" \
-d \
'{
  "name": "template_wsfed",
  "label": "Sample WS-Fed App",
  "signOnMode": "WS_FEDERATION",
  "settings": {
    "app": {
      "audienceRestriction": "urn:example:app",
      "groupName": null,
      "groupValueFormat": "windowsDomainQualifiedName",
      "realm": "urn:example:app",
      "wReplyURL": "https://example.com/",
      "attributeStatements": null,
      "nameIDFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
      "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
      "siteURL": "https://example.com",
      "wReplyOverride": false,
      "groupFilter": null,
      "usernameAttribute": "username"
    }
  }
}'
~~~

### Get Application
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET</span> /apps/*:id*</span>

Fetches an application from your Okta organization by `id`.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description    | Param Type | DataType | Required | Default
--------- | -------------- | ---------- | -------- | -------- | -------
id        | `id` of an app | URL        | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

Fetched [Application](#application-model)

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X GET "https://your-domain.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
  "id": "0oabizCHPNYALCHDUIOD",
  "name": "template_saml_2_0",
  "label": "Example SAML App",
  "status": "ACTIVE",
  "lastUpdated": "2013-09-19T22:57:23.000Z",
  "created": "2013-09-10T23:52:31.000Z",
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
  "signOnMode": "SAML_2_0",
  "credentials": {
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "audienceRestriction": "https://example.com/tenant/123",
      "groupName": null,
      "forceAuthn": false,
      "defaultRelayState": null,
      "postBackURL": "https://example.com/sso/saml",
      "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
      "configuredIssuer": null,
      "requestCompressed": "COMPRESSED",
      "groupFilter": null,
      "recipient": "https://example.com/sso/saml",
      "signAssertion": "SIGNED",
      "destination": "https://example.com/sso/saml",
      "signResponse": "SIGNED",
      "nameIDFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
      "attributeStatements": null
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD/users"
    },
    "groups": {
      "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD/groups"
    },
    "self": {
      "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD"
    },
    "metadata": {
      "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD/sso/saml/metadata"
    },
    "deactivate": {
      "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD/lifecycle/deactivate"
    }
  }
}
~~~

### List Applications
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET</span> /apps</span>

Enumerates apps added to your organization with pagination. A subset of apps can be returned that match a supported filter expression or query.

- [List Applications with Defaults](#list-applications-with-defaults)
- [List Applications Assigned to User](#list-applications-assigned-to-user)
- [List Applications Assigned to Group](#list-applications-assigned-to-group)

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                                                                                      | Param Type | DataType | Required | Default
--------- | ---------------------------------------------------------------------------------------------------------------- | ---------- | -------- | -------- | -------
limit     | Specified the number of results for a page                                                                       | Query      | Number   | FALSE    | 20
filter    | Filters apps by `status`, `user.id`, or `group.id` expression                                                    | Query      | String   | FALSE    |
after     | Specifies the pagination cursor for the next page of apps                                                        | Query      | String   | FALSE    |
expand    | Traverses `users` link relationship and optionally embeds [Application User](#application-user-model) resource   | Query      | String   | FALSE    |

> The page cursor should treated as an opaque value and obtained through the next link relation. See [Pagination](/docs/getting_started/design_principles.html#pagination)

###### Filters

The following filters are supported with the filter query parameter:

Filter                 | Description
---------------------- | ------------------------------------------------------
`status eq "ACTIVE"`   | Apps that have a `status` of `ACTIVE`
`status eq "INACTIVE"` | Apps that have a `status` of `INACTIVE`
`user.id eq ":uid"`    | Apps assigned to a specific user such as `00ucw2RPGIUNTDQOYPOF`
`group.id eq ":gid"`   | Apps assigned to a specific group such as `00gckgEHZXOUDGDJLYLG`

> Only a single expression is supported as this time

###### Link Expansions

The following link expansions are supported to embed additional resources into the response:

Expansion    | Description
------------ | ---------------------------------------------------------------------------------------------------------------
`user/:id`   | Embeds the [Application User](#application-user-model) for an assigned user such as `user/00ucw2RPGIUNTDQOYPOF`

> The `user/:id` expansion can currently only be used in conjunction with the `user.id eq ":uid"` filter (See [List Applications Assigned to User](#list-applications-assigned-to-user)).


##### Response Parameters
{:.api .api-response .api-response-params}

Array of [Applications](#application-model)

#### List Applications with Defaults
{:.api .api-operation}

Enumerates all apps added to your organization

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X GET "https://your-domain.okta.com/api/v1/apps"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
[
  {
    "id": "0oabizCHPNYALCHDUIOD",
    "name": "template_saml_2_0",
    "label": "Example SAML App",
    "status": "ACTIVE",
    "lastUpdated": "2013-09-19T22:57:23.000Z",
    "created": "2013-09-10T23:52:31.000Z",
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
    "signOnMode": "SAML_2_0",
    "credentials": {
      "userNameTemplate": {
        "template": "${source.login}",
        "type": "BUILT_IN"
      }
    },
    "settings": {
      "app": {
        "audienceRestriction": "https://example.com/tenant/123",
        "groupName": null,
        "forceAuthn": false,
        "defaultRelayState": null,
        "postBackURL": "https://example.com/sso/saml",
        "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
        "configuredIssuer": null,
        "requestCompressed": "COMPRESSED",
        "groupFilter": null,
        "recipient": "https://example.com/sso/saml",
        "signAssertion": "SIGNED",
        "destination": "https://example.com/sso/saml",
        "signResponse": "SIGNED",
        "nameIDFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
        "attributeStatements": null
      }
    },
    "_links": {
      "logo": [
        {
          "href": "https:/example.okta.com/img/logos/logo_1.png",
          "name": "medium",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD/users"
      },
      "groups": {
        "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD/groups"
      },
      "self": {
        "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD"
      },
      "metadata": {
        "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD/sso/saml/metadata"
      },
      "deactivate": {
        "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD/lifecycle/deactivate"
      }
    }
  },
  {
    "id": "0oabkvBLDEKCNXBGYUAS",
    "name": "template_swa",
    "label": "Sample Plugin App",
    "status": "ACTIVE",
    "lastUpdated": "2013-09-11T17:58:54.000Z",
    "created": "2013-09-11T17:46:08.000Z",
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
    "signOnMode": "BROWSER_PLUGIN",
    "credentials": {
      "scheme": "EDIT_USERNAME_AND_PASSWORD",
      "userNameTemplate": {
        "template": "${source.login}",
        "type": "BUILT_IN"
      }
    },
    "settings": {
      "app": {
        "buttonField": "btn-login",
        "passwordField": "txtbox-password",
        "usernameField": "txtbox-username",
        "url": "https://example.com/login.html"
      }
    },
    "_links": {
      "logo": [
        {
          "href": "https:/example.okta.com/img/logos/logo_1.png",
          "name": "medium",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
      },
      "groups": {
        "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
      },
      "self": {
        "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
      },
      "deactivate": {
        "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
      }
    }
  }
]
~~~

#### List Applications Assigned to User
{:.api .api-operation}

Enumerates all applications assigned to a user and optionally embeds their [Application User](#application-user-model) in a single response.

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X GET "https://your-domain.okta.com/api/v1/apps?filter=user.id+eq+\"00ucw2RPGIUNTDQOYPOF\"&expand=user/00ucw2RPGIUNTDQOYPOF"
~~~

> The `expand=user/:id` query parameter optionally return the user's [Application User](#application-user-model) information  in the response body's `_embedded` property.

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
[
  {
    "id": "0oabizCHPNYALCHDUIOD",
    "name": "template_saml_2_0",
    "label": "Example SAML App",
    "status": "ACTIVE",
    "lastUpdated": "2013-09-19T22:57:23.000Z",
    "created": "2013-09-10T23:52:31.000Z",
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
    "signOnMode": "SAML_2_0",
    "credentials": {
      "userNameTemplate": {
        "template": "${source.login}",
        "type": "BUILT_IN"
      }
    },
    "settings": {
      "app": {
        "audienceRestriction": "https://example.com/tenant/123",
        "groupName": null,
        "forceAuthn": false,
        "defaultRelayState": null,
        "postBackURL": "https://example.com/sso/saml",
        "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
        "configuredIssuer": null,
        "requestCompressed": "COMPRESSED",
        "groupFilter": null,
        "recipient": "https://example.com/sso/saml",
        "signAssertion": "SIGNED",
        "destination": "https://example.com/sso/saml",
        "signResponse": "SIGNED",
        "nameIDFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
        "attributeStatements": null
      }
    },
    "_links": {
      "logo": [
        {
          "href": "https:/example.okta.com/img/logos/logo_1.png",
          "name": "medium",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD/users"
      },
      "groups": {
        "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD/groups"
      },
      "self": {
        "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD"
      },
      "metadata": {
        "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD/sso/saml/metadata"
      },
      "deactivate": {
        "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD/lifecycle/deactivate"
      }
    },
    "_embedded": {
      "user": {
        "id": "00ucw2RPGIUNTDQOYPOF",
        "externalId": null,
        "created": "2014-03-21T23:31:35.000Z",
        "lastUpdated": "2014-03-21T23:31:35.000Z",
        "scope": "USER",
        "status": "ACTIVE",
        "statusChanged": "2014-03-21T23:31:35.000Z",
        "passwordChanged": null,
        "syncState": "DISABLED",
        "lastSync": null,
        "credentials": {
          "userName": "user@example.com"
        },
        "_links": {
          "app": {
            "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD"
          },
          "user": {
            "href": "https://example.okta.com/api/v1/users/00ucw2RPGIUNTDQOYPOF"
          }
        }
      }
    }
  },
  {
    "id": "0oabkvBLDEKCNXBGYUAS",
    "name": "template_swa",
    "label": "Sample Plugin App",
    "status": "ACTIVE",
    "lastUpdated": "2013-09-11T17:58:54.000Z",
    "created": "2013-09-11T17:46:08.000Z",
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
    "signOnMode": "BROWSER_PLUGIN",
    "credentials": {
      "scheme": "EDIT_USERNAME_AND_PASSWORD",
      "userNameTemplate": {
        "template": "${source.login}",
        "type": "BUILT_IN"
      }
    },
    "settings": {
      "app": {
        "buttonField": "btn-login",
        "passwordField": "txtbox-password",
        "usernameField": "txtbox-username",
        "url": "https://example.com/login.html"
      }
    },
    "_links": {
      "logo": [
        {
          "href": "https:/example.okta.com/img/logos/logo_1.png",
          "name": "medium",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
      },
      "groups": {
        "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
      },
      "self": {
        "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
      },
      "deactivate": {
        "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
      }
    },
    "_embedded": {
      "user": {
        "id": "00ucw2RPGIUNTDQOYPOF",
        "externalId": null,
        "created": "2014-06-10T15:16:01.000Z",
        "lastUpdated": "2014-06-10T15:17:38.000Z",
        "scope": "USER",
        "status": "ACTIVE",
        "statusChanged": "2014-06-10T15:16:01.000Z",
        "passwordChanged": "2014-06-10T15:17:38.000Z",
        "syncState": "DISABLED",
        "lastSync": null,
        "credentials": {
          "userName": "user@example.com",
          "password": {}
        },
        "_links": {
          "app": {
            "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
          },
          "user": {
            "href": "https://example.okta.com/api/v1/users/00ucw2RPGIUNTDQOYPOF"
          }
        }
      }
    }
  }
]
~~~

#### List Applications Assigned to Group
{:.api .api-operation}

Enumerates all applications assigned to a group

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X GET "https://your-domain.okta.com/api/v1/apps?filter=group.id+eq+\"00gckgEHZXOUDGDJLYLG\""
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
[
  {
    "id": "0oabkvBLDEKCNXBGYUAS",
    "name": "template_swa",
    "label": "Sample Plugin App",
    "status": "ACTIVE",
    "lastUpdated": "2013-09-11T17:58:54.000Z",
    "created": "2013-09-11T17:46:08.000Z",
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
    "signOnMode": "BROWSER_PLUGIN",
    "credentials": {
      "scheme": "EDIT_USERNAME_AND_PASSWORD",
      "userNameTemplate": {
        "template": "${source.login}",
        "type": "BUILT_IN"
      }
    },
    "settings": {
      "app": {
        "buttonField": "btn-login",
        "passwordField": "txtbox-password",
        "usernameField": "txtbox-username",
        "url": "https://example.com/login.html"
      }
    },
    "_links": {
      "logo": [
        {
          "href": "https:/example.okta.com/img/logos/logo_1.png",
          "name": "medium",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
      },
      "groups": {
        "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
      },
      "self": {
        "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
      },
      "deactivate": {
        "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
      }
    }
  }
]
~~~

### Update Application
{:.api .api-operation}

<span class="api-uri-template api-uri-put"><span class="api-label">PUT</span> /apps/*:id*</span>

Updates an application in your organization.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description         | Param Type | DataType                          | Required | Default
--------- | ------------------- | ---------- | --------------------------------- | -------- | -------
id        | id of app to update | URL        | String                            | TRUE     |
app       | Updated app         | Body       | [Application](#application-model) | FALSE    |

> All attributes must be specified when updating an app.  **Delta updates are not supported.**

##### Response Parameters
{:.api .api-response .api-response-params}

Updated [Application](#application-model)

#### Set SWA User-Editable UserName & Password
{:.api .api-operation}

Configures the `EDIT_USERNAME_AND_PASSWORD` scheme for a SWA application with a username template

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X PUT "https://your-domain.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS" \
-d \
'{
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
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
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "EDIT_USERNAME_AND_PASSWORD",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  }
}'
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
  "id": "0oabkvBLDEKCNXBGYUAS",
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "lastUpdated": "2013-10-01T06:28:03.486Z",
  "created": "2013-09-11T17:46:08.000Z",
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
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "EDIT_USERNAME_AND_PASSWORD",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
    },
    "groups": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
    },
    "self": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
    },
    "deactivate": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
    }
  }
}
~~~

#### Set SWA User-Editable Password
{:.api .api-operation}

Configures the `EDIT_PASSWORD_ONLY` scheme for a SWA application with a username template

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X PUT "https://your-domain.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS" \
-d \
'{
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
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
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "EDIT_PASSWORD_ONLY",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  }
}'
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
  "id": "0oabkvBLDEKCNXBGYUAS",
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "lastUpdated": "2013-10-01T06:25:37.612Z",
  "created": "2013-09-11T17:46:08.000Z",
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
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "EDIT_PASSWORD_ONLY",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
    },
    "groups": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
    },
    "self": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
    },
    "deactivate": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
    }
  }
}
~~~

#### Set SWA Okta Password
{:.api .api-operation}

Configures the `EXTERNAL_PASSWORD_SYNC` scheme for a SWA application with a username template

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X PUT "https://your-domain.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS" \
-d \
'{
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
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
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "EXTERNAL_PASSWORD_SYNC",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  }
}'
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
  "id": "0oabkvBLDEKCNXBGYUAS",
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "lastUpdated": "2013-10-01T06:30:17.151Z",
  "created": "2013-09-11T17:46:08.000Z",
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
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "EXTERNAL_PASSWORD_SYNC",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
    },
    "groups": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
    },
    "self": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
    },
    "deactivate": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
    }
  }
}
~~~

#### Set SWA Shared Credentials
{:.api .api-operation}

Configures the `SHARED_USERNAME_AND_PASSWORD` scheme for a SWA application with a username and password

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X PUT "https://your-domain.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS" \
-d \
'{
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
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
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "SHARED_USERNAME_AND_PASSWORD",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    },
    "userName": "sharedusername",
    "password": {
      "value": "sharedpassword"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  }
}'
~~~

##### Response Example
{:.api .reponse}

~~~ json
{
  "id": "0oabkvBLDEKCNXBGYUAS",
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "lastUpdated": "2013-10-01T06:20:18.436Z",
  "created": "2013-09-11T17:46:08.000Z",
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
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "SHARED_USERNAME_AND_PASSWORD",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    },
    "userName": "sharedusername",
    "password": {}
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
    },
    "groups": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
    },
    "self": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
    },
    "deactivate": {
      "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
    }
  }
}
~~~

### Delete Application
{:.api .api-operation}

<span class="api-uri-template api-uri-delete"><span class="api-label">DELETE</span> /apps/*:id*</span>

Removes an inactive application.

> Applications must be deactivated before they can be deleted

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description         | Param Type | DataType | Required | Default
--------- | ------------------- | ---------- | -------- | -------- | -------
id        | id of app to delete | URL        | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

An empty JSON object `{}`

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X DELETE "https://your-domain.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ ruby
HTTP/1.1 204 No Content
~~~

If the application has an `ACTIVE` status you will receive an error response.

~~~ ruby
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "errorCode": "E0000056",
  "errorSummary": "Delete application forbidden.",
  "errorLink": "E0000056",
  "errorId": "oaeHifznCllQ26xcRsO5vAk7A",
  "errorCauses": [
    {
      "errorSummary": "The application must be deactivated before deletion."
    }
  ]
}
~~~

## Application Lifecycle Operations

### Activate Application
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST</span> /apps/*:id*/lifecycle/activate</span>

Activates an inactive application.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description           | Param Type | DataType | Required | Default
--------- | --------------------- | ---------- | -------- | -------- | -------
id        | `id` of app to activate | URL        | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

An empty JSON object `{}`

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://your-domain.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/activate"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{}
~~~

### Deactivate Application
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST</span> /apps/*:id*/lifecycle/deactivate</span>

Deactivates an active application.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description               | Param Type | DataType | Required | Default
--------- | ------------------------- | ---------- | -------- | -------- | -------
id        | `id` of app to deactivate | URL        | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

An empty JSON object `{}`

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://your-domain.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{}
~~~

## Application User Operations

### Assign User to Application for SSO
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST</span> /apps/*:aid*/users</span>

Assigns a user without a [profile](#application-user-profile-object) to an application for SSO.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                                            | Param Type | DataType                                    | Required | Default
--------- | ---------------------------------------------------------------------- | ---------- | ------------------------------------------- | -------- | -------
aid       | unique key of [Application](#application-model)                        | URL        | String                                      | TRUE     |
appuser   | user's [credentials](#application-user-credentials-object) for the app | Body       | [Application User](#application-user-model) | TRUE     |

> Only the user's `id` is required for the request body of applications with [SignOn Modes](#signon-modes) or [Authentication Schemes](#authentication-schemes) that do not require or support credentials

> If your SSO application requires a profile but doesn't have provisioning enabled, you should add a profile to the request and use the [Assign User to Application for SSO & Provisioning](#assign-user-to-application-for-sso--provisioning) operation

##### Response Parameters
{:.api .api-response .api-response-params}

[Application User](#application-user-model)

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://your-domain.okta.com/api/v1/apps/0oad5lTSBOMUBOBVVQSC/users" \
-d \
'{
  "id": "00ud4tVDDXYVKPXKVLCO",
  "scope": "USER",
  "credentials": {
    "userName": "user@example.com",
    "password": {
      "value": "correcthorsebatterystaple"
    }
  }
}'
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
  "id": "00u15s1KDETTQMQYABRL",
  "externalId": null,
  "created": "2014-08-11T02:24:31.000Z",
  "lastUpdated": "2014-08-11T05:38:01.000Z",
  "scope": "USER",
  "status": "ACTIVE",
  "statusChanged": "2014-08-11T02:24:32.000Z",
  "passwordChanged": null,
  "syncState": "DISABLED",
  "lastSync": null,
  "credentials": {
    "userName": "user@example.com"
  },
  "profile": {},
  "_links": {
    "app": {
      "href": "https://example.okta.com/api/v1/apps/0oaq2rRZUQAKJIZYFIGM"
    },
    "user": {
      "href": "https://example.okta.com/api/v1/users/00u15s1KDETTQMQYABRL"
    }
  }
}
~~~

### Assign User to Application for SSO & Provisioning
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST</span> /apps/*:aid*/users</span>

Assigns an user to an application with [credentials](#application-user-credentials-object) and an app-specific [profile](#application-user-profile-object). Profile mappings defined for the application are first applied before applying any profile attributes specified in the request.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                                                                                            | Param Type | DataType                                    | Required | Default
--------- | ---------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------- | -------- | -------
aid       | unique key of [Application](#application-model)                                                                        | URL        | String                                      | TRUE     |
appuser   | user's [credentials](#application-user-credentials-object) and [profile](#application-user-profile-object) for the app | Body       | [Application User](#application-user-model) | FALSE    |

> The [Application User](#application-user-model) must specify the user's `id` and should omit [credentials](#application-user-credentials-object) for applications with [SignOn Modes](#signon-modes) or [Authentication Schemes](#authentication-schemes) that do not require or support credentials.
>
> *You can only specify profile attributes that are not defined by profile mappings when Universal Directory is enabled.*

##### Response Parameters
{:.api .api-response .api-response-params}

[Application User](#application-user-model) with user profile mappings applied

Your request will be rejected with a `403 Forbidden` status for applications with the `PUSH_NEW_USERS` or `PUSH_PROFILE_UPDATES` features enabled if the request specifies a value for an attribute that is defined by an application user profile mapping (Universal Directory) and the value for the attribute does not match the output of the mapping.

*It is recommended to omit mapped attributes during assignment to minimize assignment errors.*

~~~ json
{
  "errorCode": "E0000075",
  "errorSummary": "Cannot modify the firstName attribute because it has a field mapping and profile push is enabled.",
  "errorLink": "E0000075",
  "errorId": "oaez9oW_WXiR_K-WwaTKhlgBQ",
  "errorCauses": []
}
~~~

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://your-domain.okta.com/api/v1/apps/0oad5lTSBOMUBOBVVQSC/users" \
-d \
'{
  "id": "00u15s1KDETTQMQYABRL",
  "scope": "USER",
  "credentials": {
    "userName": "saml.jackson@example.com"
  },
  "profile": {
      "salesforceGroups": [
        "Employee"
      ],
      "role": "Developer",
      "profile": "Standard User"
  }
}'
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
  "id": "00u13okQOVWZJGDOAUVR",
  "externalId": "005o0000000ogQ9AAI",
  "created": "2014-07-03T20:37:14.000Z",
  "lastUpdated": "2014-07-10T13:25:04.000Z",
  "scope": "USER",
  "status": "PROVISIONED",
  "statusChanged": "2014-07-03T20:37:17.000Z",
  "passwordChanged": null,
  "syncState": "SYNCHRONIZED",
  "lastSync": "2014-07-10T13:25:04.000Z",
  "credentials": {
    "userName": "saml.jackson@example.com"
  },
  "profile": {
    "secondEmail": null,
    "lastName": "Jackson",
    "mobilePhone": null,
    "email": "saml.jackson@example.com",
    "salesforceGroups": [
      "Employee"
    ],
    "role": "Developer",
    "firstName": "Saml",
    "profile": "Standard User"
  },
  "_links": {
    "app": {
      "href": "https://example.okta.com/api/v1/apps/0oa164zIYRQREYAAGGQR"
    },
    "user": {
      "href": "https://example.okta.com/api/v1/users/00u13okQOVWZJGDOAUVR"
    }
  }
}
~~~

### Get Assigned User for Application
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET</span> /apps/*:aid*/users/*:uid*</span>

Fetches a specific user assignment for application by `id`.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                     | Param Type | DataType | Required | Default
--------- | ----------------------------------------------- | ---------- | -------- | -------- | -------
aid       | unique key of [Application](#application-model) | URL        | String   | TRUE     |
uid       | unique key of assigned [User](users.html)       | URL        | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

[Application User](#application-user-model)

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X GET "https://your-domain.okta.com/api/v1/apps/0oad5lTSBOMUBOBVVQSC/users/00ud4tVDDXYVKPXKVLCO"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
  "id": "00u13okQOVWZJGDOAUVR",
  "externalId": "005o0000000ogQ9AAI",
  "created": "2014-07-03T20:37:14.000Z",
  "lastUpdated": "2014-07-10T13:25:04.000Z",
  "scope": "USER",
  "status": "PROVISIONED",
  "statusChanged": "2014-07-03T20:37:17.000Z",
  "passwordChanged": null,
  "syncState": "SYNCHRONIZED",
  "lastSync": "2014-07-10T13:25:04.000Z",
  "credentials": {
    "userName": "saml.jackson@example.com"
  },
  "profile": {
    "secondEmail": null,
    "lastName": "Jackson",
    "mobilePhone": null,
    "email": "saml.jackson@example.com",
    "salesforceGroups": [
      "Employee"
    ],
    "role": "Developer",
    "firstName": "Saml",
    "profile": "Standard User"
  },
  "_links": {
    "app": {
      "href": "https://example.okta.com/api/v1/apps/0oa164zIYRQREYAAGGQR"
    },
    "user": {
      "href": "https://example.okta.com/api/v1/users/00u13okQOVWZJGDOAUVR"
    }
  }
}
~~~

### List Users Assigned to Application
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET</span> /apps/*:aid*/users</span>

Enumerates all assigned [application users](#application-user-model) for an application.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                                      | Param Type | DataType | Required | Default
--------- | ---------------------------------------------------------------- | ---------- | -------- | -------- | -------
aid       | unique key of [Application](#application-model)                  | URL        | String   | TRUE     |
limit     | specifies the number of results for a page                       | Query      | Number   | FALSE    | 20
after     | specifies the pagination cursor for the next page of assignments | Query      | String   | FALSE    |

> The page cursor should treated as an opaque value and obtained through the next link relation. See [Pagination](/docs/getting_started/design_principles.html#pagination)

##### Response Parameters
{:.api .api-response .api-response-params}

Array of [Application Users](#application-user-model)

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X GET "https://your-domain.okta.com/api/v1/apps/0oad5lTSBOMUBOBVVQSC/users"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
[
  {
    "id": "00ui2sVIFZNCNKFFNBPM",
    "externalId": "005o0000000umnEAAQ",
    "created": "2014-08-15T18:59:43.000Z",
    "lastUpdated": "2014-08-15T18:59:48.000Z",
    "scope": "USER",
    "status": "PROVISIONED",
    "statusChanged": "2014-08-15T18:59:48.000Z",
    "passwordChanged": null,
    "syncState": "SYNCHRONIZED",
    "lastSync": "2014-08-15T18:59:48.000Z",
    "credentials": {
      "userName": "user@example.com"
    },
    "profile": {
      "secondEmail": null,
      "lastName": "McJanky",
      "mobilePhone": "415-555-555",
      "email": "user@example.com",
      "salesforceGroups": [],
      "role": "CEO",
      "firstName": "Karl",
      "profile": "Standard Platform User"
    },
    "_links": {
      "app": {
        "href": "https://example.okta.com/api/v1/apps/0oajiqIRNXPPJBNZMGYL"
      },
      "user": {
        "href": "https://example.okta.com/api/v1/users/00ui2sVIFZNCNKFFNBPM"
      }
    }
  },
  {
    "id": "00ujsgVNDRESKKXERBUJ",
    "externalId": "005o0000000uqJaAAI",
    "created": "2014-08-16T02:35:14.000Z",
    "lastUpdated": "2014-08-16T02:56:49.000Z",
    "scope": "USER",
    "status": "PROVISIONED",
    "statusChanged": "2014-08-16T02:56:49.000Z",
    "passwordChanged": null,
    "syncState": "SYNCHRONIZED",
    "lastSync": "2014-08-16T02:56:49.000Z",
    "credentials": {
      "userName": "saml.jackson@example.com"
    },
    "profile": {
      "secondEmail": null,
      "lastName": "Jackson",
      "mobilePhone": null,
      "email": "saml.jackson@example.com",
      "salesforceGroups": [
        "Employee"
      ],
      "role": "Developer",
      "firstName": "Saml",
      "profile": "Standard User"
    },
    "_links": {
      "app": {
        "href": "https://example.okta.com/api/v1/apps/0oajiqIRNXPPJBNZMGYL"
      },
      "user": {
        "href": "https://example.okta.com/api/v1/users/00ujsgVNDRESKKXERBUJ"
      }
    }
  }
]
~~~

### Update Application Credentials for Assigned User
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST</span> /apps/*:aid*/users/*:uid*</span>

Updates a user's [credentials](#application-user-credentials-object) for an assigned application

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                                        | Param Type | DataType                                    | Required | Default
--------- | ------------------------------------------------------------------ | ---------- | ------------------------------------------- | -------- | -------
aid       | unique key of [Application](#application-model)                    | URL        | String                                      | TRUE     |
uid       | unique key of a valid [User](users.html)                           | URL        | String                                      | TRUE     |
appuser   | user's [credentials](#application-user-credentials-object) for app | Body       | [Application User](#application-user-model) | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

[Application User](#application-user-model)

Your request will be rejected with a `400 Bad Request` status if you attempt to assign a username or password to an application with an incompatible [Authentication Scheme](#authentication-schemes)

~~~ json
{
  "errorCode": "E0000041",
  "errorSummary": "Credentials should not be set on this resource based on the scheme.",
  "errorLink": "E0000041",
  "errorId": "oaeUM77NBynQQu4C_qT5ngjGQ",
  "errorCauses": [
    {
      "errorSummary": "User level credentials should not be provided for this scheme."
    }
  ]
}
~~~

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://your-domain.okta.com/api/v1/apps/0oad5lTSBOMUBOBVVQSC/users/00ud4tVDDXYVKPXKVLCO" \
-d \
'{
  "credentials": {
    "userName": "user@example.com",
    "password": {
      "value": "updatedP@55word"
    }
  }
}'
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
  "id": "00ud4tVDDXYVKPXKVLCO",
  "externalId": null,
  "created": "2014-07-03T17:24:36.000Z",
  "lastUpdated": "2014-07-03T17:26:05.000Z",
  "scope": "USER",
  "status": "ACTIVE",
  "statusChanged": "2014-07-03T17:24:36.000Z",
  "passwordChanged": "2014-07-03T17:26:05.000Z",
  "syncState": "DISABLED",
  "lastSync": null,
  "credentials": {
    "userName": "user@example.com",
    "password": {}
  },
  "profile": {},
  "_links": {
    "app": {
      "href": "https://example.okta.com/api/v1/apps/0oad5lTSBOMUBOBVVQSC"
    },
    "user": {
      "href": "https://example.okta.com/api/v1/users/00ud4tVDDXYVKPXKVLCO"
    }
  }
}
~~~

### Update Application Profile for Assigned User
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST</span> /apps/*:aid*/users/*:uid*</span>

Updates a user's profile for an application

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                     | Param Type | DataType                                    | Required | Default
--------- | ----------------------------------------------- | ---------- | ------------------------------------------- | -------- | -------
aid       | unique key of [Application](#application-model) | URL        | String                                      | TRUE     |
uid       | unique key of a valid [User](users.html)        | URL        | String                                      | TRUE     |
appuser   | credentials for app                             | Body       | [Application User](#application-user-model) | FALSE    |

##### Response Parameters
{:.api .api-response .api-response-params}

[Application User](#application-user-model) with user profile mappings applied

Your request will be rejected with a `403 Forbidden` status for applications with the `PUSH_NEW_USERS` or `PUSH_PROFILE_UPDATES` features enabled if the request specifies a value for an attribute that is defined by an application user profile mapping (Universal Directory) and the value for the attribute does not match the output of the mapping.

> The Okta API currently doesn't support entity tags for conditional updates.  It is only safe to fetch the most recent profile with [Get Assigned User for Application](#get-assigned-user-for-application), apply your profile update, then `POST` back the updated profile as long as you are the **only** user updating a user's application profile.

~~~ json
{
  "errorCode": "E0000075",
  "errorSummary": "Cannot modify the firstName attribute because it has a field mapping and profile push is enabled.",
  "errorLink": "E0000075",
  "errorId": "oaez9oW_WXiR_K-WwaTKhlgBQ",
  "errorCauses": []
}
~~~

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://your-domain.okta.com/api/v1/apps/0oad5lTSBOMUBOBVVQSC/users/00ud4tVDDXYVKPXKVLCO" \
-d \
'{
  "profile": {
    "salesforceGroups": [
      "Partner"
    ],
    "role": "Developer",
    "profile": "Gold Partner User"
  }
}'
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
  "id": "00ujsgVNDRESKKXERBUJ",
  "externalId": "005o0000000uqJaAAI",
  "created": "2014-08-16T02:35:14.000Z",
  "lastUpdated": "2014-08-16T02:56:49.000Z",
  "scope": "USER",
  "status": "PROVISIONED",
  "statusChanged": "2014-08-16T02:56:49.000Z",
  "passwordChanged": null,
  "syncState": "SYNCHRONIZED",
  "lastSync": "2014-08-16T02:56:49.000Z",
  "credentials": {
    "userName": "saml.jackson@example.com"
  },
  "profile": {
    "secondEmail": null,
    "lastName": "Jackson",
    "mobilePhone": null,
    "email": "saml.jackson@example.com",
    "salesforceGroups": [
      "Partner"
    ],
    "role": "Developer",
    "firstName": "Saml",
    "profile": "Gold Partner User"
  },
  "_links": {
    "app": {
      "href": "https://example.com/api/v1/apps/0oad5lTSBOMUBOBVVQSC"
    },
    "user": {
      "href": "https://example.okta.com/api/v1/users/00ud4tVDDXYVKPXKVLCO"
    }
  }
}
~~~

### Remove User from Application
{:.api .api-operation}

<span class="api-uri-template api-uri-delete"><span class="api-label">DELETE</span> /apps/*:aid*/users/*:uid*</span>

Removes an assignment for a user from an application.

> This is a destructive operation and the user's app profile will not be recoverable.  If the app is enabled for provisioning and configured to deactivate users, the user will also be deactivated in the target application.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                     | Param Type | DataType | Required | Default
--------- | ----------------------------------------------- | ---------- | -------- | -------- | -------
aid       | unique key of [Application](#application-model) | URL        | String   | TRUE     |
uid       | unique key of assigned [User](users.html)       | URL        | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

An empty JSON object `{}`

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X DELETE "https://your-domain.okta.com/api/v1/apps/0oad5lTSBOMUBOBVVQSC/users/00ud4tVDDXYVKPXKVLCO"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{}
~~~

## Application Group Operations

### Assign Group to Application
{:.api .api-operation}

<span class="api-uri-template api-uri-put"><span class="api-label">PUT</span> /apps/*:aid*/groups/*:gid*</span>

Assigns a group to an application

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                     | Param Type | DataType                                      | Required | Default
--------- | ----------------------------------------------- | ---------- | --------------------------------------------- | -------- | -------
aid       | unique key of [Application](#application-model) | URL        | String                                        | TRUE     |
gid       | unique key of a valid [Group](groups.html)      | URL        | String                                        | TRUE     |
appgroup  | App group                                       | Body       | [Application Group](#application-group-model) | FALSE    |

##### Response Parameters
{:.api .api-response .api-response-params}

All responses return the assigned [Application Group](#application-group-model).

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X PUT "https://your-domain.okta.com/api/v1/apps/0oad5lTSBOMUBOBVVQSC/groups/00gbkkGFFWZDLCNTAGQR" \
-d \
'{
}'
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
  "id": "00gbkkGFFWZDLCNTAGQR",
  "lastUpdated": "2013-10-02T07:38:20.000Z",
  "priority": 0
}
~~~

### Get Assigned Group for Application
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET</span> /apps/*:aid*/groups/*:gid*</span>

Fetches an application group assignment

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                     | Param Type | DataType | Required | Default
--------- | ----------------------------------------------- | ---------- | -------- | -------- | -------
aid       | unique key of [Application](#application-model) | URL        | String   | TRUE     |
gid       | unique key of an assigned [Group](groups.html)  | URL        | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

Fetched [Application Group](#application-group-model)

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X GET "https://your-domain.okta.com/api/v1/apps/0oad5lTSBOMUBOBVVQSC/groups/00gbkkGFFWZDLCNTAGQR"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
  "id": "00gbkkGFFWZDLCNTAGQR",
  "lastUpdated": "2013-10-02T07:38:20.000Z",
  "priority": 0
}
~~~

### List Groups Assigned to Application
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET</span> /apps/*:aid*/groups</span>

Enumerates group assignments for an application.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                                      | Param Type | DataType | Required | Default
--------- | ---------------------------------------------------------------- | ---------- | -------- | -------- | -------
aid       | unique key of [Application](#application-model)                  | URL        | String   | TRUE     |
limit     | Specifies the number of results for a page                       | Query      | Number   | FALSE    | 20
after     | Specifies the pagination cursor for the next page of assignments | Query      | String   | FALSE    |

> The page cursor should treated as an opaque value and obtained through the next link relation. See [Pagination](/docs/getting_started/design_principles.html#pagination)

##### Response Parameters
{:.api .api-response .api-response-params}

Array of [Application Groups](#application-group-model)

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X GET "https://your-domain.okta.com/api/v1/apps/0oad5lTSBOMUBOBVVQSC/groups"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
[
  {
    "id": "00gbkkGFFWZDLCNTAGQR",
    "lastUpdated": "2013-10-02T07:38:20.000Z",
    "priority": 0
  },
  {
    "id": "00gg0xVALADWBPXOFZAS",
    "lastUpdated": "2013-10-02T14:40:29.000Z",
    "priority": 1
  }
]
~~~

### Remove Group from Application
{:.api .api-operation}

<span class="api-uri-template api-uri-delete"><span class="api-label">DELETE</span> /apps/*:aid*/groups/*:gid*</span>

Removes a group assignment from an application.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                     | Param Type | DataType | Required | Default
--------- | ----------------------------------------------- | ---------- | -------- | -------- | -------
aid       | unique key of [Application](#application-model) | URL        | String   | TRUE     |
gid       | unique key of an assigned [Group](groups.html)  | URL        | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

An empty JSON object `{}`

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X DELETE "https://your-domain.okta.com/api/v1/apps/0oad5lTSBOMUBOBVVQSC/groups/00gbkkGFFWZDLCNTAGQR"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{}
~~~
