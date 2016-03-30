---
layout: docs_page
title: Okta Auth SDK
excerpt: Easily add Okta capabilities to your website.
---

> This SDK is currently in **Beta** status.

# Introduction

The Okta Sign-In SDK builds on top of our [Authentication APIs](), allowing 
you to create a custom login experience using JavaScript. This includes 
a traditional Okta authentication flow with MFA or Social Auth.

# Prerequisites

- An Okta org - Register for [Okta Developer Edition](https://www.okta.com/developer/signup/) if you don't have an existing org
- [CORS enabled for your domain](/docs/api/getting_started/enabling_cors.html)

# Installation

Include the following script in your page:

~~~ html
<script src="OktaAuth.js" type="text/javascript"></script>
~~~

## Authentication Flow

The goal of an authentication flow is setting an Okta cookie. Simple!

~~~ javascript
var authClient = new OktaAuth({url: 'https://your-org.okta.com'});
authClient.signIn({
  username: 'some-username',
  password: 'some-password'
})
.then(function(transaction) {
  switch(transaction.status) {
    
    case 'SUCCESS':
      authClient.session.setCookieAndRedirect(transaction.sessionToken);
      break;

    default:
      throw 'We cannot handle the ' + transaction.status + ' status';
  }
})
.fail(function(err) {
  console.error(err);
});
~~~

As you can see, we use [A+ Promises](https://promisesaplus.com/) (via
[Q](https://github.com/kriskowal/q)). This allows us to handle asynchronous 
actions, like HTTP requests, in a way that appears more synchronous.

Most methods during an authentication flow will resolve `then` with a 
[Transaction](#transactions).

A `fail` will resolve with one of several [Errors](#errors).

## Transactions

Providing only a username and password may not be sufficient to obtain a
sessionToken. You may need to reset a password, enroll in MFA, or verify your
existing MFA. To track your progression through these states, we use a
transaction. The possible states, their definitions, and their flow can be found
in our [Authentication API documentation](/docs/api/resources/authn.html#transaction-state).

Here is a list of the states and their possible methods:

> Methods listed for certain states may only be available in certain scenarios

> `stateToken` is never required as a parameter

> All transactions have:
>
> * `status` - Matches the transaction's state
> * `data` - The response body as an object

### SUCCESS

Name                  |   Type    | Description
--------------------- | --------  | -----------
`expiresAt`           | [Date String](https://tools.ietf.org/html/rfc3339) | Time the sessionToken will expire
`sessionToken`        | [Session Token](/docs/api/resources/authn.html#session-token) | Token that can be exchanged for a cookie
`user`                | [User](http://localhost:4000/docs/api/resources/authn.html#user-object) | Subset of user properties

### LOCKED_OUT

Name                  |   Type    | Description
--------------------- | --------  | -----------
`unlock`            | Function | [Parameters](/docs/api/resources/authn.html#unlock-account)
`cancel`            | Function | Ends the transaction

### PASSWORD_EXPIRED

Name                  |   Type    | Description
--------------------- | --------  | -----------
`expiresAt`           | [Date String](https://tools.ietf.org/html/rfc3339) | Time the transaction will expire
`user`                | [User](/docs/api/resources/authn.html#user-object) | Subset of user properties
`changePassword`      | Function | [Parameters](/docs/api/resources/authn.html#change-password)
`cancel`              | Function | Ends the transaction

### PASSWORD_RESET

Name                  |   Type    | Description
--------------------- | --------  | -----------
`expiresAt`           | [Date String](https://tools.ietf.org/html/rfc3339) | Time the transaction will expire
`user`                | [User](/docs/api/resources/authn.html#user-object) | Subset of user properties
`resetPassword`       | Function | [Parameters](/docs/api/resources/authn.html#reset-password)
`cancel`              | Function | Ends the transaction

### PASSWORD_WARN

Name                  |   Type    | Description
--------------------- | --------  | -----------
`expiresAt`           | [Date String](https://tools.ietf.org/html/rfc3339) | Time the transaction will expire
`user`                | [User](/docs/api/resources/authn.html#user-object) | Subset of user properties
`policy`              | [Policy](/docs/api/resources/authn#password-policy-object) | Password requirements
`changePassword`      | Function | [Parameters](/docs/api/resources/authn.html#change-password)
`skip`                | Function | Ignore the warning and continue
`cancel`              | Function | Ends the transaction

### RECOVERY

Name                  |   Type    | Description
--------------------- | --------  | -----------
`recoveryType`        | ? | ?
`user`                | [User](/docs/api/resources/authn.html#user-object) | Subset of user properties
`answer`              | Function | [Parameters](/docs/api/resources/authn#answer-recovery-question)
`cancel`              | Function | Ends the transaction

### RECOVERY_CHALLENGE

Name                  |   Type    | Description
--------------------- | --------  | -----------
`expiresAt`           | [Date String](https://tools.ietf.org/html/rfc3339) | Time the transaction will expire
`user`                | [User](/docs/api/resources/authn.html#user-object) | Subset of user properties
`factorType`          | String | `EMAIL` or `SMS`
`recoveryType`        | String | `PASSWORD` or `UNLOCK`
`verify`              | Function | [Parameters](/docs/api/resources/authn.html#verify-recovery-factor)
`resend`              | Function | Resend the recovery email or text
`cancel`              | Function | Ends the transaction

### MFA_ENROLL

Name                  |   Type    | Description
--------------------- | --------  | -----------
`expiresAt`           | [Date String](https://tools.ietf.org/html/rfc3339) | Time the transaction will expire
`user`                | [User](/docs/api/resources/authn.html#user-object) | Subset of user properties
`factors`             | List of [Enroll Factors](#enroll-factor) | Factors enabled for an org
`skip`                | Function | Ignore enrollment and continue
`cancel`              | Function | Ends the transaction

#### Enroll Factor

Name                  |   Type    | Description
--------------------- | --------  | -----------
`enrollment`          | String    | `OPTIONAL` or `REQUIRED`
`status`              | String    | `NOT_SETUP`, `PENDING_ACTIVATION`, `ENROLLED`, `ACTIVE`, `INACTIVE`, or `EXPIRED`
`factorType`          | [Factor Type](/docs/api/resources/factors.html#factor-type) | Type of factor
`provider`            | [Factor Provider](/docs/api/resources/factors.html#provider-type) | Provider of the given `factorType`
`enroll`              | Function  | [Parameters](/docs/api/resources/authn.html#enroll-factor). `factorType` and `provider` are optional
`questions`           | Function  | Returns [available questions](/docs/api/resources/factors.html#response-example-3), not a transaction. Only available for the `question` factorType

### MFA_ENROLL_ACTIVATE

Name                  |   Type    | Description
--------------------- | --------  | -----------
`expiresAt`           | [Date String](https://tools.ietf.org/html/rfc3339) | Time the transaction will expire
`factorResult`        | String   | `WAITING`, `CANCELLED`, `TIMEOUT`, or `ERROR`
`user`                | [User](/docs/api/resources/authn.html#user-object) | Subset of user properties
`factor`              | [Activate Enroll Factor](#activate-enroll-factor) | Factor to activate
`poll`                | Function | Poll until `factorResult` changes. Throws [AuthPollStopError](#AuthPollStopError) when `prev` or `cancel` is called
`prev`                | Function | End current factor enrollment and return to [MFA_ENROLL](#mfaenroll)
`cancel`              | Function | Ends the transaction

#### Activate Enroll Factor

Name                  |   Type    | Description
--------------------- | --------  | -----------
`id`                  | String    | Unique id for the factor
`factorType`          | [Factor Type](/docs/api/resources/factors.html#factor-type) | Type of factor
`provider`            | [Factor Provider](/docs/api/resources/factors.html#provider-type) | Provider of the given `factorType`
`activation`          | [Activation](#activation) | Activation properties

#### Activation

Name                  |   Type    | Description
--------------------- | --------  | -----------
`expiresAt`           | [Date String](https://tools.ietf.org/html/rfc3339) | Time the activation will expire
`factorResult`        | String   | `WAITING`, `CANCELLED`, `TIMEOUT`, or `ERROR`
`send`                | Function | Takes a `name` parameter that's usually `sms` or `email`
`qrcode`              | [Link](/docs/api/getting_started/design_principles.html#links) | Contains `href` and `type` to embed as an image

### MFA_REQUIRED

Name                  |   Type    | Description
--------------------- | --------  | -----------
`expiresAt`           | [Date String](https://tools.ietf.org/html/rfc3339) | Time the transaction will expire
`user`                | [User](/docs/api/resources/authn.html#user-object) | Subset of user properties
`factors`             | List of [Enrolled Factors](#enrolled-factor) | Factors available to pass MFA
`cancel`              | Function | Ends the transaction

#### Enrolled Factor

Name                  |   Type    | Description
--------------------- | --------  | -----------
`id`                  | String    | Unique id for the factor
`factorType`          | [Factor Type](/docs/api/resources/factors.html#factor-type) | Type of factor
`provider`            | [Factor Provider](/docs/api/resources/factors.html#provider-type) | Provider of the given `factorType`
`profile`             | [Factor Profile](/docs/api/resources/factors.html#factor-profile-object) | Details about the factor
`verify`              | Function  | [Parameters](/docs/api/resources/authn.html#verify-factor)

### MFA_CHALLENGE

Name                  |   Type    | Description
--------------------- | --------  | -----------
`expiresAt`           | [Date String](https://tools.ietf.org/html/rfc3339) | Time the transaction will expire
`user`                | [User](/docs/api/resources/authn.html#user-object) | Subset of user properties
`factor`              | [Challenge Factor](#challenge-factor) | Factor currently being challenged
`poll`                | Function | Poll until `factorResult` changes. Throws [AuthPollStopError](#AuthPollStopError) when `prev`, `resend`, or `cancel` is called
`resend`              | Function | Takes a `name` parameter that's usually `sms` or `push`
`prev`                | Function | End current factor enrollment and return to [MFA_ENROLL](#mfaenroll)
`cancel`              | Function | Ends the transaction

#### Challenge Factor

Name                  |   Type    | Description
--------------------- | --------  | -----------
`id`                  | String    | Unique id for the factor
`factorType`          | [Factor Type](/docs/api/resources/factors.html#factor-type) | Type of factor
`provider`            | [Factor Provider](/docs/api/resources/factors.html#provider-type) | Provider of the given `factorType`
`profile`             | [Factor Profile](/docs/api/resources/factors.html#factor-profile-object) | Details about the factor
`verification`        | [Verification](#verification)  | Verification properties

## Social Auth and OIDC

If you have [set up social auth](/docs/guides/social_authentication.html#setting-up-a-social-authentication-provider-in-okta), it's possible to manage the flow with the SDK. To do so, instantiate your client with a clientId and redirectUri.

~~~ javascript
var authClient = new OktaAuth({
  url: 'https://your-org.okta.com',
  clientId: 'your-client-id',
  redirectUri: 'https://your.redirect.uri/redirect' // defaults to current url if omitted
});
~~~

### Get an Id Token
~~~ javascript
authClient.idToken.authorize()
.then(function(res) {
  // Raw Id Token
  res.idToken;

  // Decoded Id Token claims
  res.claims;
})
~~~

### Exchange a sessionToken for an Id Token
~~~ javascript
authClient.idToken.authorize({
  sessionToken: 'testSessionToken'
});
~~~

### Get an Id Token from an IDP
~~~ javascript
authClient.idToken.authorize({
  idp: 'target-idp'
});
~~~

### Refresh an Id Token

Returns a new idToken if the Okta session is still valid.

~~~ javascript
authClient.idToken.refresh();
~~~

### Decode an Id Token

Decode a raw Id Token

~~~ javascript
authClient.idToken.decode(idTokenString);
~~~

## Session Management

The SDK allows managing your Okta session. Each of these methods returns a Promise.

### Create a session

To create a session, you must first have a `sessionToken`. This can be created by going through the [Authentication Flow](#authentication-flow) until the [SUCCESS](#success) status. The transaction will contain the `sessionToken`. If a `redirectUri` is not passed, Okta will redirect to the current page.

~~~ javascript
authClient.session.setCookieAndRedirect(sessionToken, redirectUri);
~~~

### Check for an existing session

Resolves with `true` or `false`.

~~~ javascript
authClient.session.exists();
~~~

### Get an existing session

Resolves with a [session](/docs/api/resources/sessions.html#example)

~~~ javascript
authClient.session.get();
~~~

### Refresh a session

Resolves with a refreshed version of your existing [session](/docs/api/resources/sessions.html#example)

~~~ javascript
authClient.session.refresh();
~~~

### Close a session

~~~ javascript
authClient.session.close();
~~~

## Errors

A `fail` on a promise will resolve with one of these failures:

#### AuthApiError

This is thrown when we receive a response from the Okta service that is not a 200.

Name                  |   Type    | Description
--------------------- | --------  | -----------
`errorCode`           | String | Okta [Error Code](/docs/api/getting_started/error_codes)
`errorSummary`        | String | Summary of the error
`errorLink`           | String | Okta [Error Code](/docs/api/getting_started/error_codes)
`errorId`             | String | Unique error id
`errorCauses`         | List of Strings | More detailed causes of the error, if any

#### AuthSdkError

This is thrown when an error occurs within the SDK.

Name                  |   Type    | Description
--------------------- | --------  | -----------
`errorCode`           | String | Always `INTERNAL`
`errorSummary`        | String | Summary of the error
`errorLink`           | String | Always `INTERNAL`
`errorId`             | String | Always `INTERNAL`
`errorCauses`         | List of Strings | Always `[]`

#### AuthPollStopError

This is thrown when a `poll` has been initiated, but another action is taken before the `poll` is finished.

#### OAuthError

This is thrown when an [error occurs during the OAuth flow](docs/api/getting_started/error_codes.html#openid-connect-and-okta-social-authentication).

Name                  |   Type    | Description
--------------------- | --------  | -----------
`errorCode`           | String | The OAuth error code
`errorSummary`        | String | Summary of the error