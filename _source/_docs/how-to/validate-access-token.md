---
layout: docs_page
title: Validating Access Tokens
excerpt: How to validate access tokens in your server-side application
---

## Overview

If you are building an application that is running on the server-side, like an API, it is likely one of your requirements that your end-users are authenticated. You can use Okta to authenticate your end-users and issue them access and ID tokens, which your application can then use. It is important that your application only uses the access token to grant access, and not the ID token. For more information about this, see the (jakub.todo) section below.

> For more information on issuing access tokens, see here (jakub.todo). 

Once the tokens are issued to the end-users they are passed to your application, which must validate them. There are two ways to verify a token: locally, or remotely with Okta.

### Terms 

In the OAuth 2.0 flows under discussion here, we have four important roles:

- The authorization server, which is the server that issues the access token. In this case Okta is the authorization server.
- The resource owner, which is the entity (for example your application's end-user) that grants permission to access the resource server with an access token. 
- The client, which is the application that requests the access token from Okta and then passes it to the resource server.
- The resource server, which accepts the access token and therefore also must verify that it is valid. In this case this is your application.

More information about all of these can be found in our high-level discussion of OAuth 2, which you can find here: (jakub.todo).

## Access Tokens vs ID Tokens

As mentioned above, it is important that the resource server (your server-side application) only take the access token, as opposed to the ID token. This is because access tokens are intended for authorizing access to a resource, which is exactly the use case you have here. 

ID Tokens, on the other hand, are intended for authentication. They provide information about the end-user, to allow you verify that they are who they say they are. Authentication is the concern of the clients. Because of this, when a client makes an authentication request, the ID Token that is returned contains the `client_id` in the ID Token's `aud` claim. 

ID Tokens are also signed with a client secret, and your resource server has no way of verifying whether the ID Token was modified by the client in some unintended or malicious way. More information about ID tokens can be found here: (jakub.todo).

## What to Check When Validating an Access Token 

The high-level overview of validating an access token looks like this:

- Parse the 


 verify the following:

- The JWT itself is well-formed. For more on this see the JWT spec: https://tools.ietf.org/html/rfc7519#section-7.2
- The `iss` (issuer) claim matches the identifier of your Authorization Server.
- The `aud` (audience) claim is the value configured in the Authorization Server.
- The `cid` (client ID) claim is your client id.
4. The signature of the Access Token according to JWS using the algorithm specified in the JWT `alg` header property. Use the public keys provided by Okta via the Get Keys endpoint.
5. The expiry time (from the `exp` claim) has not already passed.

## How to Validate the Signature Using the JWKs

JSON Web Key - (`jwks_uri`)there is a /keys endpoint

Step 4 involves downloading the public JWKS from Okta (specified by the `jwks_uri` property in the Authorization Server metadata. The result of this call is a JSON Web Key set.

Each public key is identified by a `kid` attribute, which corresponds with the `kid` claim in the Access Token header.

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

