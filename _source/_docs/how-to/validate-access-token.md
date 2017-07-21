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

## What to Check When Validating an Access Token 

To validate an access token, you must verify the following:

- The JWT itself is well-formed. For more on this see the JWT spec: https://tools.ietf.org/html/rfc7519#section-7.2
- The `iss` (issuer) claim matches the identifier of your Authorization Server.
- The `aud` (audience) claim is the value configured in the Authorization Server.
- The `cid` (client ID) claim is your client id.
4. The signature of the Access Token according to JWS using the algorithm specified in the JWT `alg` header property. Use the public keys provided by Okta via the Get Keys endpoint.
5. The expiry time (from the `exp` claim) has not already passed.

## How to Validate the Signature Using the JWKs

JSON Web Key - (`jwks_uri`)there is a /keys endpoint

Step 4 involves downloading the public JWKS from Okta (specified by the jwks_uri property in the Authorization Server metadata. The result of this call is a JSON Web Key set.

Each public key is identified by a kid attribute, which corresponds with the kid claim in the Access Token header.

The Access Token is signed by an RSA private key, and we publish the future signing key well in advance. However, in an emergency situation you can still stay in sync with Okta’s key rotation. Have your application check the `kid`, and if it has changed and the key is missing from the local cache, check the `jwks_uri` value in the Authorization Server metadata and you can go back to the `jwks_uri` to get keys again from Okta.

Please note the following:

- For security purposes, Okta automatically rotates the keys used to sign the token.
- The current key rotation schedule is four times a year. This schedule can change without notice.
- In case of an emergency, Okta can rotate keys as needed.
- Okta always publishes keys to the JWKS.
- To save the network round trip, your app can cache the JWKS response locally. The standard HTTP caching headers are used and should be respected.
- The administrator can switch the Authorization Server key rotation mode to MANUAL by updating the Authorization Server and then control when to rotate the keys.
- Keys used to sign tokens automatically rotate and should always be resolved dynamically against the published JWKS. Your app can fail if you hardcode public keys in your applications. Be sure to include key rollover in your implementation.

Alternatively, you can also validate an Access or Refresh Token using the Token Introspection endpoint: https://developer.okta.com/docs/api/resources/oauth2.html#introspection-request

## Code Samples

