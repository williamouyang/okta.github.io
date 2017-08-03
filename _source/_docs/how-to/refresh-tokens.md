---
layout: docs_page
title: Refreshing Access and ID Tokens
excerpt: How to refresh access tokens with Okta.
---

## What Is a Refresh Token?

A refresh token is a special token that is used to generate additional access tokens. This allows you to have short-lived access tokens without having to collect credentials every single time one expires. Normally you would request this token alongside the access and/or ID tokens as part of a user's initial authentication flow. 

## Setting Up Your Application

Refresh tokens are available for a subset of Okta OAuth 2.0 Client Applications, specifically `web` or `native` applications. For more about creating an OAuth 2.0 application see [Using the App Integration Wizard](https://help.okta.com/en/prev/Content/Topics/Apps/Apps_App_Integration_Wizard.htm).

Once you have an application, you need to make sure that the "Allowed grant types" include "Refresh Token". 

## How to Get a Refresh Token

To get a refresh token, you send a request to your Okta Authorization Server. 

In the case of the Authorization Code or Implicit flows, you use the Authorization Server's `/authorize` endpoint to get an authorization code, specifying an `offline_access` scope. You then send this code the `/token` endpoint to get the refresh token. For more information about this endpoint, see [Obtain an Authorization Grant from a User](https://developer.okta.com/docs/api/resources/oauth2.html#obtain-an-authorization-grant-from-a-user). For more information about the Authorization Code and Implicit flows, see: (jakub.todo)

For the Client Credentials and Resource Owner Password flows, you use the Authorization Server's `/token` endpoint directly. For more information about this endpoint, see [Request a Token](https://developer.okta.com/docs/api/resources/oauth2.html#request-a-token). For more information about the Client Credentials and Resource Owner Password flows, see: (jakub.todo)

The following combinations of grant type and scope, when sent to `/token` endpoint, will return a refresh token:

|Grant Type  | Scope |
|-------------|-------|
`authorization_code`  | `offline_access`  |
`refresh_token`  | `offline_access` |
`password`  | `offline_access`  |

This table only shows the minimum requirements. For example, with the `password` grant type you can also include an `openid` scope alongside the `offline_scope`:

```
'grant_type=password&redirect_uri=http%3A%2F%2Flocalhost&username=example%40mailinator.com&password=a.gReAt.pasSword&scope=openid%20offline_access'
```

You would then get back an ID token alongside your access and refresh tokens.

For more information see the [Okta OAuth 2.0 reference page](https://developer.okta.com/docs/api/resources/oauth2.html#response-parameters-1).



## Get a Refresh Token Silently for Your SPA

## How to Use a Refresh Token

### Refresh an Access Token

To refresh your access token, you send a token request with a `grant_type` of `refresh_token`.

### Refresh an ID Token

To refresh your ID token, you send a token request with a `grant_type` of `refresh_token`.