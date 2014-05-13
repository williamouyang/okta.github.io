---
layout: docs_page
title: Apps
---


## Overview

The Okta Application API provides operations to manage applications and/or assignments to users or groups for your organization.

> This API is currently in **Beta** status

> This API currently only supports applications without user-management features enabled at this time

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

> `id`, `created`, `lastUpdated`, `status`, and `_links` are only available after an app is created


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

The current workaround is to manually configure the desired application via the Administration UI in a preview (sandbox) organization and view the application via [Get Application](#get-application)

> As previously stated, this API currently doesn't support creating or managing apps with user management features


#### Features

Applications may support optional features. Most apps only support sign-on and do not allow additional features.  

> At this time additional features may not be configured via the API

The list of possible features an app may support are:

* PUSH_NEW_USERS
* PUSH_USER_DEACTIVATION
* PROFILE_MASTERING
* REACTIVATE_USERS
* PUSH_PROFILE_UPDATES
* GROUP_PUSH
* IMPORT_NEW_USERS
* PUSH_PASSWORD_UPDATES

This setting modifies the same settings as the `User Management` tab when editing an application in your Okta Administration app.


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

This setting modifies the same settings as the `Sign On` tab when editing an application in your Okta Administration app.

### Accessibility Object

Specifies access settings for the application.

Attribute        | Description                                | DataType | MinLength | MaxLength | Nullable | Default
---------------- | ------------------------------------------ | -------- | --------- | --------- | -------- | -------
selfService      | Enable self service application assignment | Boolean  |           |           | TRUE     | FALSE
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

Attribute | Description                | DataType | Nullable | Default
--------- | -------------------------- | -------- | -------- | -------
iOS       | Okta Mobile for iOS        | Boolean  | FALSE    | FALSE
web       | Okta Web Browser Home Page | Boolean  | FALSE    | FALSE

#### AppLinks Object

Each application defines 1 or more appLinks that can be published. AppLinks can be disabled by setting the link value to `false` .

### Application Credentials Object

Specifies app credentials and vaulting for the application.

Attribute        | Description                                                                  | DataType                                              | MinLength | MaxLength | Nullable | Default
---------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------- | --------- | --------- | -------- | -------
scheme           | Determines how credentials are managed for the `signOnMode`                  | [Authentication Scheme](#authentication-schemes)      |           |           | TRUE     | NULL           
userNameTemplate | Default username that is generated when an application is assigned to a user | [UserName Template Object](#username-template-object) |           |           | TRUE     | *Okta UserName*
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

Apps that are configured with the `BASIC_AUTH`, `BROWSER_PLUGIN`, or `SECURE_PASSWORD_STORE`  have credentials vaulted by Okta and can be configured with the following schemes:

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

## Application User Model

The application user model defines a user's application assignment and credentials.

### Example

~~~ json
{
    "id": "00ubgfEUVRPSHGWHAZRI",
    "scope": "USER",
    "credentials": {
        "userName": "user@example.com",
        "password": { "value": "app_password" }
    },
    "lastUpdated": "2013-09-11T15:56:58.000Z",
    "_links": {
      "user": {
          "href": "https://example.okta.com/api/v1/users/00ubgfEUVRPSHGWHAZRI"
        }
    }
}
~~~

### Application User Attributes

All application users have the following attributes:

Attribute   | Description                                        | DataType                                                                    | MinLength | MaxLength | Nullable | Unique | Readonly
----------- | -------------------------------------------------- | --------------------------------------------------------------------------- | --------- | --------- | -------- | ------ | --------
id          | unique key of user                                 | String                                                                      |           |           | FALSE    | TRUE   | TRUE
scope       | toggles the assignment between user or group scope | `USER` or `GROUP`                                                           |           |           | FALSE    | FALSE  | FALSE
lastUpdated | timestamp when app user was last updated           | Date                                                                        |           |           | FALSE    | FALSE  | TRUE
credentials | credentials for assigned app                       | [Application User Credentials Object](#application-user-credentials-object) |           |           | TRUE     | FALSE  | FALSE
_links      | discoverable resources related to the app user     | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-05)              |           |           | TRUE     | FALSE  | TRUE

### Application User Credentials Object

Specifies a user's credentials for the application.  The [Authentication Scheme](#authentication-schemes) of the app determines whether a userName or password can be assigned to a user.

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

> The [UserName Template Object](#username-template-object) defines the default username generated when a user is assigned to an application.

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

#### POST /apps
{:.api .api-uri-template}

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
        "users": {
            "href": "https://example.okta.com/api/v1/apps/0oafxqCAJWWGELFTYASJ/users"
        },
        "self": {
            "href": "https://example.okta.com/api/v1/apps/0oafxqCAJWWGELFTYASJ"
        },
        "deactivate": {
            "href": "https://example.okta.com/api/v1/apps/0oafxqCAJWWGELFTYASJ/lifecycle/deactivate"
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
        "users": {
            "href": "https://example.okta.com/api/v1/apps/0oafwvZDWJKVLDCUWUAC/users"
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
        "users": {
            "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
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
        "users": {
            "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
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
        "users": {
            "href": "https://example.okta.com/api/v1/apps/0oafywQDNMXLYDBIHQTT/users"
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

#### GET /apps/*:id*
{:.api .api-uri-template}

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
        "users": {
            "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD/users"
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

#### GET /apps
{:.api .api-uri-template}

Enumerates apps added to your organization with pagination. A subset of apps can be returned that match a supported filter expression or query.

- [List Applications with Defaults](#list-applications-with-defaults)
- [List Applications Assigned to User](#list-applications-assigned-to-user)
- [List Applications Assigned to Group](#list-applications-assigned-to-group)

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                                   | Param Type | DataType | Required | Default
--------- | ------------------------------------------------------------- | ---------- | -------- | -------- | -------
limit     | Specified the number of results for a page                    | Query      | Number   | FALSE    | 20
filter    | Filters apps by `status`, `user.id`, or `group.id` expression | Query      | String   | FALSE    |
after     | Specifies the pagination cursor for the next page of apps     | Query      | String   | FALSE    |

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
            "users": {
                "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD/users"
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
            "users": {
                "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
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

Enumerates all applications assigned to a user

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X GET "https://your-domain.okta.com/api/v1/apps?filter=user.id+eq+\"00ucw2RPGIUNTDQOYPOF\""
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
            "users": {
                "href": "https://example.okta.com/api/v1/apps/0oabizCHPNYALCHDUIOD/users"
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
            "users": {
                "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
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
            "users": {
                "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
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

#### PUT /apps/*:id*
{:.api .api-uri-template}

Updates an application in your organization.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description         | Param Type | DataType                          | Required | Default
--------- | ------------------- | ---------- | --------------------------------- | -------- | -------
id        | id of app to update | URL        | String                            | TRUE     |
app       | Updated app         | Body       | [Application](#application-model) | FALSE    |

> All attributes must be specified when updating an app  **updates are not supported!**

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
        "users": {
            "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
        },
        "self": {
            "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
        },
        "metadata": {
            "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/sso/saml/metadata"
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
        "users": {
            "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
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
        "users": {
            "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
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
        "password":  { "value": "sharedpassword" }
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
        "users": {
            "href": "https://example.okta.com/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
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

#### DELETE /apps/*:id*
{:.api .api-uri-template}

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

#### POST /apps/*:id*/lifecycle/activate
{:.api .api-uri-template}

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

#### POST /apps/*:id*/lifecycle/deactivate
{:.api .api-uri-template}

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

### Assign User to Application
{:.api .api-operation}

Assigns a user to an application

#### PUT /apps/*:aid*/users/*:uid*
{:.api .api-uri-template}

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                     | Param Type | DataType                                    | Required | Default
--------- | ----------------------------------------------- | ---------- | ------------------------------------------- | -------- | -------
aid       | unique key of [Application](#application-model) | URL        | String                                      | TRUE     |
uid       | unique key of a valid [User](users.html)        | URL        | String                                      | TRUE     |
appuser   | App user                                        | Body       | [Application User](#application-user-model) | FALSE    |

> For applications with [SignOn Modes](#signon-modes) or [Authentication Schemes](#authentication-schemes) that do not require or support credentials, pass and empty json object `{}` as the `appuser` request body

##### Response Parameters
{:.api .api-response .api-response-params}

All responses return the assigned [Application User](#application-user-model).

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X PUT "https://your-domain.okta.com/api/v1/apps/0oad5lTSBOMUBOBVVQSC/users/00ud4tVDDXYVKPXKVLCO" \
-d \
'{
    "id": "00ud4tVDDXYVKPXKVLCO",
    "scope": "USER",
    "credentials": {
        "userName": "user@example.com",
        "password": { "value": "correcthorsebatterystaple" }
    }
}'
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
    "id": "00ud4tVDDXYVKPXKVLCO",
    "scope": "USER",
    "credentials": {
        "userName": "user@example.com",
        "password": {}
    },
    "lastUpdated": "2013-09-11T15:56:58.000Z",
    "_links": {
      "user": {
          "href": "https://example.okta.com/api/v1/users/00ud4tVDDXYVKPXKVLCO"
        }
    }
}
~~~

### Get Assigned User for Application
{:.api .api-operation}

#### GET /apps/*:aid*/users/*:uid*
{:.api .api-uri-template}

Fetches a specific application user assignment by `id`.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                     | Param Type | DataType | Required | Default
--------- | ----------------------------------------------- | ---------- | -------- | -------- | -------
aid       | unique key of [Application](#application-model) | URL        | String   | TRUE     |
uid       | unique key of assigned [User](users.html)       | URL        | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

Fetched [Application User](#application-user-model)

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
    "id": "00ud4tVDDXYVKPXKVLCO",
    "scope": "USER",
    "credentials": {
        "userName": "user@example.com",
        "password": {}
    },
    "lastUpdated": "2013-09-11T15:56:58.000Z",
    "_links": {
      "user": {
          "href": "https://example.okta.com/api/v1/users/00ud4tVDDXYVKPXKVLCO"
        }
    }
}
~~~

### List Users Assigned to Application
{:.api .api-operation}

#### GET /apps/*:aid*/users
{:.api .api-uri-template}

Enumerates application user assignments for an application.

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
      "id": "00ud4tVDDXYVKPXKVLCO",
      "scope": "USER",
      "credentials": {
          "userName": "user@example.com",
          "password": {}
      },
      "lastUpdated": "2013-09-11T15:56:58.000Z",
      "_links": {
        "user": {
            "href": "https://example.okta.com/api/v1/users/00ud4tVDDXYVKPXKVLCO"
          }
      }
  },
    {
      "id": "00ubgfEUVRPSHGWHAZRI",
      "scope": "USER",
      "credentials": {
          "userName": "admin@example.com",
          "password": {}
      },
      "lastUpdated": "2013-09-11T15:56:51.000Z",
      "_links": {
        "user": {
            "href": "https://example.okta.com/api/v1/users/00ubgfEUVRPSHGWHAZRI"
          }
      }
  }
]
~~~

### Update Credentials for Application
{:.api .api-operation}

#### PUT /apps/*:aid*/users/*:uid*
{:.api .api-uri-template}

Updates a user's credentials for an application

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                     | Param Type | DataType                                    | Required | Default
--------- | ----------------------------------------------- | ---------- | ------------------------------------------- | -------- | -------
aid       | unique key of [Application](#application-model) | URL        | String                                      | TRUE     |
uid       | unique key of a valid [User](users.html)        | URL        | String                                      | TRUE     |
appuser   | App user                                        | Body       | [Application User](#application-user-model) | FALSE    |

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

##### Response Parameters
{:.api .api-response .api-response-params}

All responses return the assigned [Application User](#application-user-model).

##### Request Example
{:.api .api-request .api-request-example}

~~~ ruby
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X PUT "https://your-domain.okta.com/api/v1/apps/0oad5lTSBOMUBOBVVQSC/users/00ud4tVDDXYVKPXKVLCO" \
-d \
'{
    "id": "00ud4tVDDXYVKPXKVLCO",
    "scope": "USER",
    "credentials": {
        "userName": "user@example.com",
        "password": { "value": "updatedP@55word" }
    }
}'
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ json
{
    "id": "00ud4tVDDXYVKPXKVLCO",
    "scope": "USER",
    "credentials": {
        "userName": "user@example.com",
        "password": {}
    },
    "lastUpdated": "2013-09-11T15:56:58.000Z",
    "_links": {
      "user": {
          "href": "https://example.okta.com/api/v1/users/00ud4tVDDXYVKPXKVLCO"
        }
    }
}
~~~

### Remove User from Application
{:.api .api-operation}

#### DELETE /apps/*:aid*/users/*:uid*
{:.api .api-uri-template}

Removes an assignment for a user from an application.

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

#### PUT /apps/*:aid*/groups/*:gid*
{:.api .api-uri-template}

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

#### GET /apps/*:aid*/groups/*:gid*
{:.api .api-uri-template}

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

#### GET /apps/*:aid*/groups
{:.api .api-uri-template}

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

#### DELETE /apps/*:aid*/groups/*:gid*
{:.api .api-uri-template}

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
