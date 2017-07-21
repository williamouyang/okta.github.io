---
layout: docs_page
title: Validating Access Tokens
excerpt: How to validate access tokens in your API or Resource Server
---

## Overview

## Access Tokens for API / Resource Servers

Why is it important for the RP to only pass the Access Token (as opposed to the ID Token or the Refresh Token)

ID Tokens are intended to be consumed by clients. Because of this, when a client makes an authentication request, the ID Token that is returned contains the `client_id` in the ID Token's `aud` claim. 

An API or Resource Server will not know what this Client ID is, and instead requires a unique API identifier for the user. ???

ID Token tells the client about a user

An access token authorizes a user to access the server

ID Tokens are also signed with a client secret, and an API/Resource server would have no way of verifying whether the ID Token was modified by the client in some unintended or malicious way.

## How to Validate the Signature Using the JWKs

## What to check When Validating an Access Token 

## Code Samples

