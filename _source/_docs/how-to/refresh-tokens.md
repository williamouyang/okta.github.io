---
layout: docs_page
title: Refreshing Access and ID Tokens
excerpt: How to refresh access tokens with Okta.
---

## What Is a Refresh Token?

A refresh token is a special token that is used to generate additional access tokens. This allows you to have short-lived access tokens without having to collect credentials every single time one expires.

## How to Get a Refresh Token

(jakub.todo) This breaks the structure of the other sections. We don't cover how to get an access or ID token in the previous two sections, why cover how to get a refresh token here?

Cover what grant flows and what scope you need to get one

The following combinations of grant type and scope will return a Refresh token:

| Grant Type  | Scope |
|-------------|-------|
| `authorization_code`  | `offline_scope`  |
| `refresh_token`  | `offline_scope` |
| `password`  | `offline_scope`  |

> Note: This table only shows the minimum requirements. For example, with the `authorization_code` grant type you can also include an `openid` scope alongside the `offline_scope` in order to also get an ID token along with the refresh token.

## How to Refresh an Access Token

To refresh your access token, you send a token request with a `grant_type` of `refresh_token`.

## How to Refresh an ID Token

To refresh your ID token, you send a token request with a `grant_type` of `refresh_token`.

## Refreshing Tokens Silently


Silent authentication