---
layout: docs_page
title: Set Up Authorization Service
excerpt: Set Up an Authorization Service with OAuth 2.0 or OpenID Connect
---

## Overview

API Access Management allows you to build custom authorization servers in Okta which can be used to protect your own API endpoints. 
An authorization server defines your security boundary, for example "staging" or "production."
Within each authorization server you can define your own OAuth scopes, claims, and access policies. 
This allows your apps and your APIs to anchor to a central authorization point and leverage the rich identity features of Okta,
such as Universal Directory for transforming attributes, adaptive MFA for end-users, analytics, and system log, and extend it out to the API economy.

At its core, an authorization server is simply an OAuth 2.0 token minting engine. 
Each authorization server has a unique [issuer URI](https://tools.ietf.org/html/rfc7519#section-4.1.1)
and its own signing key for tokens in order to keep proper boundary between security domains. 
The authorization server also acts as an [OpenID Connect Provider](http://openid.net/connect/), 
which means you can request [ID tokens](http://openid.net/specs/openid-connect-core-1_0.html#IDToken) 
in addition to [access tokens](https://tools.ietf.org/html/rfc6749#section-1.4) from the authorization server endpoints.

How do you know if you need to use Okta's Darkoauthorization server instead of the authorization service that is
built in to your Okta app?

* You need to protect non-Okta resources.
* You need different authorization policies depending on whether the person is an employee, partner, or end user, or
other similar specializations.

> Note: If your employees, partners, and users can all use the same authentication policies for single sign-on, 
try [Okta's built in authorization service](https://support.okta.com/help/articles/Knowledge_Article/Single-Sign-On-Knowledge-Hub). 


## Set Up an Authorization Server

Create and configure an authorization server to manage authorization between clients and Okta:

* Define the scopes and claims in your client app and register it with Okta.
* Create one or more authorization servers and define the scopes and claims to match those you've defined in your app.

It doesn't matter which task you do first, but the client app must recognize the scope names and be expecting the
claims as defined in the authorization server.

This document provides step-by-step instructions for creating and configuring the authorization server:

1. [Create the Authorization Server](#create-the-authorization-server).
2. [Create scopes](#create-scopes).
3. [Create claims](#create-claims).
4. [Create access policies and rules](#create-access-policies).
5. [Test the ID Tokens or Access Tokens](#test-your-authorization-server-configuration).

> Note: OpenID Connect mints a token for OIDC flows if the appropriate claims and scopes are configured in the OpenID Connect client. 
However, the authorization server mints an ID Token based on the configured claims and scopes if they are created and assigned to an OpenID Connect client.

### Create the Authorization Server

1. In the Okta user interface, navigate to **Security > API**.
<img src="/assets/img/auth_server_image.png" alt="Authorization Server" widgth="800px" />

2. Choose **Add Authorization Server** and supply the requested information.

    * Name
    * Resource URI. URI for the OAuth resource that consumes the Access Tokens. This value is used as the default [audience](https://tools.ietf.org/html/rfc7519#section-4.1.3) for Access Tokens.
    * Description 

When complete, your authorization server **Settings** tab displays the information that you provided and allows you to edit it.
<img src="/assets/img/auth_server2.png" alt="Add Authorization Server" width="800px" />

### Create Scopes

Scopes represent high-level operations that can be performed on your API endpoints. 
These are coded into applications, which then ask for them from the authorization server, 
and the access policy decides which ones to grant and which ones to deny.

If you need scopes in addition to the reserved scopes provided, create them now. 

1. In the Okta user interface, navigate to **Security > API**.
2. Choose the name of the authorization server to display it.
<img src="/assets/img/scope1.png" alt="Add Scopes" width="800px" />

3. Choose **Scopes > Add Scope**, and provide a name and description.
<img src="/assets/img/scope2.png" alt="View Scopes" width="800px" />

These scopes are referenced by the **Claims** dialog.

### Create Claims
 
Tokens contain claims that are statements about the subject or another subject, for example name, role, or email address.

Create ID Token claims for OpenID Connect, or Access Tokens for OAuth 2.0:

1. In the Okta user interface, navigate to **Security > API**.
2. Choose the name of the authorization server to display it.
<img src="/assets/img/claims1.png" alt="Choose Claims" width="800px" />

3. Choose **Claims > Add Claim** and provide the requested information.
<img src="/assets/img/claim.png" alt="Edit Claims" width="800px" />

    * **Name**
    * **Claim type**: Choose Access Token (Oauth 2.0) or ID Token (OpenID Connect).
    * **Value type**: Choose whether you'll define the claim by a list of **Groups** or by a list of users defined by an **Expression** written in Okta Expression Language.
        * **Mapping**: This option displays if you chose **Expression** in the previous field. Add the mapping here using [Okta's Expression Language](/reference/expressionlanguage/), for example `appuser.username=="Bob"`.
          Be sure to check that your expression returns the results expected--the expression isn't validated here.
        * **Filter**: If you chose **Groups** in the previous field, add a group filter. If you leave it blank, all users are specified for this claim.
    * **Disable claim**: Check this option if you want to temporarily disable the claim for testing or debugging.
    * **Include in**: Specify whether the claim is valid for any scope, or select the scopes for which it is valid.
    
### Create Access Policies

Okta provides a default policy and two default rules, one for service apps (client credential flows) and one for all other flows.

Create access policies and rules for a client or set of clients.

1. In the Okta user interface, navigate to **Security > API**.
2. Choose the name of the authorization server. 
3. Choose **Access Policies > Add New Access Policy** and provide the requested information.
<img src="/assets/img/access_policy1.png" alt="Add Access Policy and Rule" width="800px" />

    * Name
    * Description
    * Assign to all clients, or enter the name of the clients covered by this access policy.

While in the Access Policy list, you can:

* Set access policies to be active or deactivate them for testing or debugging purposes.
* Reorder any policies you create using drag-n-drop. The default policy is always last (lowest priority). 

Polices are evaluated in priority order, as are the rules in a policy. 
The first policy and rule that matches the client request is applied and no further rule or policy processing occurs.

### Create Rules for Each Access Policy

Rules control the mapping of client, user, and custom scope. For example, you can specify
a rule for an access policy that says "If the user is assigned to this client, the the custom scope Scope1
is valid."

While in the Rules list for an Access Policy, you can:

* Set a rule to be inactive for testing or debugging.
* Reorder rules, except for the default rule in the default policy. Rules are evaluated in priority order,
so the first rule that matches the client request is applied and no further processing occurs.

>Note: Because service applications (client credentials flow) there is no user. So make sure you have at least one rule
that specifies the condition **No user**.

### Test Your Authorization Server Configuration

For each combination of authorization server and scopes and claims, issue an API call and check that the contents
of the ID Token or Access Token are as expected.

Add details.

 