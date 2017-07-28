---
layout: docs_page
title: Refreshing Access and ID Tokens
excerpt: How to refresh access tokens with Okta.
---

## What Is a Refresh Token?

A refresh token is a special token that is used to generate additional access tokens. This allows you to have short-lived access tokens without having to collect credentials every single time one expires.

## How to Get a Refresh Token

Cover what grant flows and what scope you need to get one

The following combinations of grant type and scope will return a Refresh token:

| Grant Type  | Scope |
|-------------|-------|
| `authorization_code`  | `offline_scope`  |
| `refresh_token`  | N/A |
| `password`  | `offline_scope`  |

> Note: This table only shows the minimum combination. For example, with the `authorization_code` grant type you can also include an `openid` scope alongside the `offline_scope` in order to also get an ID token along with the refresh token.

## What About SPAs?

Silent authentication

## How to Refresh an Access Token

## How to Refresh an ID Token