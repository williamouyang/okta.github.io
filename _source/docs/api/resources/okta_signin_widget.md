---
layout: docs_page
title: Okta Sign-In Widget
excerpt: Easily add Okta Sign-in capabilities to your website.
---

## Overview

The Okta Sign-In Widget is a JavaScript widget from Okta that gives you a fully featured and customizable login experience which can be used to authenticate users on any web site.

### Sample Usage
~~~ javascript
// Initialize
var oktaSignIn = new OktaSignIn({
  baseUrl: 'https://acme.okta.com',
  features: {
    rememberMe: true,
    rememberDevice: true,
    smsRecovery: true,
    windowsVerify: true,
    multiOptionalFactorEnroll: true
  },
  labels: {
    'primaryauth.title': 'Partner login',
    'help': 'Click here for more help'
  },
  transformUsername: function(username) {
    var suffix = '@acme.com';
    return (username.indexOf(suffix) !== -1) ? username : (username + suffix);
  }
});

// Render the widget if there is no active session
oktaSignIn.session.exists(function (exists) {
  if (exists) {
    // showHomePage();
    return;
  }

  // Show the sign-in widget
  oktaSignIn.renderEl(
    { el: '#sign-in-container' },
    // Success callback (invoked on successful authentication)
    function (res) {
      if (res.status === 'SUCCESS') {
        // showHomePageForUser(res.user);
      }
    },
    // Failure callback (invoked if the authentication is unsuccessful
    // or if there is a failure on authentication)
    function (err) {
      // handleErrors(err);
    }
  );
});
~~~

## Configuration options

-   `baseUrl`
    
    The base URL for your Okta organization. (e.g., `https://acme.okta.com`
    and `https://acme.oktapreview.com`)

      Type    |   Required   | Default
    --------  | -----------  | -----------
    String    | Yes          | None

-   `recoveryToken`
    
    Bootstrap the widget in the recovery flow (e.g., Unlock Account or Forgot Password).

      Type    |   Required   | Default
    --------  | -----------  | -----------
    String    | No           | None

-   `stateToken`
    
    Bootstrap the widget in a specific flow (e.g., Enroll MFA or MFA challenge).

      Type    |   Required   | Default
    --------  | -----------  | -----------
    String    | No           | None

-   `logo`
    
    Logo to use in the widget (e.g., `https://acme.com/assets/logo/acme-logo.png`).

      Type    |   Required   | Default
    --------  | -----------  | -----------
    String    | No           | `Okta logo`

-   `username`
    
    Bootstrap the widget with a username i.e., pre-fill the username in the widget.

      Type    |   Required   | Default
    --------  | -----------  | -----------
    String    | No           | None

-   `transformUsername`
    
    Transform the username before sending the request. The function is passed the username
    and the operation as parameters.

    #### Example
    ~~~ javascript
    transformUsername: function (username, op) {
      var suffix = '@acme.com';

      // op can be PRIMARY_AUTH, FORGOT_PASSWORD or UNLOCK_ACCOUNT
      if (_.contains['FORGOT_PASSWORD', 'UNLOCK_ACCOUNT'], op) {
        return (username.indexOf(suffix) !== -1) ? username : (username + suffix);
      }
    }
    ~~~
    
      Type    |   Required   | Default
    --------  | -----------  | -----------
    Function  | No           | None

-   `features`
    
    Options to enable or disable a feature in the widget.

    #### Example
    ~~~ javascript
    features: {
      rememberMe: true,
      rememberDevice: false,
      selfServiceUnlock: true,
      windowsVerify: true,
      multiOptionalFactorEnroll: true
    }
    ~~~
    
    Here is the full list of features that you can configure:
    
    -   `rememberMe` `(default: true)`
        
        Display a checkbox to enable "Remember me" functionality at login.
    -   `rememberDevice` `(default: true)`
        
        Display a checkbox to enable "Trust this device" functionality in MFA required flow.
    -   `rememberDeviceAlways` `(default: false)`

        Default the "Trust this device" checkbox to `true` always.
    -   `smsRecovery` `(default: false)`
        
        Allow users with a configured mobile phone number to recover their password using SMS.
    -   `selfServiceUnlock` `(default: false)`
  
        Display the "Unlock Account" link to allow users to unlock their accounts.
    -   `multiOptionalFactorEnroll` `(default: false)`
  
        Allow users the option to enroll in multiple optional factors.
    -   `windowsVerify` `(default: false)`
  
        Allow users the option to enroll a Windows device for push or TOTP.
    -   `router` `(default: false)`
  
        Update the browser location bar with a route on navigation.

-   `helpLinks`
    
    Options to configure alternate help links in the widget.

    #### Example
    ~~~ javascript
    helpLinks: {
      help: 'https://acme.com/custom/help',
      forgotPassword: 'https://acme.com/custom/forgotpassword',
      unlock: 'https://acme.com/custom/unlock',
      custom: [{
        text: 'Acme IT Support Page',
        href: 'https://acme.com/custom/itsupport'
      },
      {
        text: 'About Acme',
        href: 'https://acme.com/custom/about'
      }]
    }
    ~~~

    Here is the full list of help links that you can configure:
    
    -   `help`
        
        Custom link `href` for the 'Help' link.
    -   `forgotPassword`
        
        Custom link `href` for the 'Forgot Password' link.
    -   `unlock`
        
        Custom link `href` for the 'Unlock Account' link.
    -   `custom`
        
        Array of custom link objects. Each custom link object must have `text` and `href` properties.
-   `helpSupportNumber`
    
    Option to display a Help/Support phone number if the user does not have access to email.

### OIDC options

Options for the [OpenID Connect](/docs/api/resources/oidc.html) authentication flow.
More information about the options can be found [here.](/docs/api/resources/oidc.html#request-parameters)

#### Sample Usage for OIDC flow
~~~ javascript
var oktaSignIn = new OktaSignIn({
  baseUrl: 'https://acme.okta.com',
  features: {
    rememberDevice: false,
  },
  // OIDC options
  clientId: 'GHtf9iJdr60A9IYrR0jw',
  redirectUri: 'https://acme.com/oauth2/callback/home',
  authScheme: 'OAUTH2',
  authParams: {
    responseType: 'id_token',
    responseMode: 'okta_post_message',
    scope: [
      'openid',
      'email',
      'profile',
      'address',
      'phone'
    ]
  },
  idpDisplay: 'PRIMARY',
  idps: [{
    'type': 'GOOGLE',
    'id': '0oaaix1twko0jyKik0g4'
  }, {
    'type': 'FACEBOOK',
    'id': '0oar25ZnMM5LrpY1O0g3'
  }, {
    'type': 'LINKEDIN',
    'id': '0oaaix1twko0jyKik0g4'
  }]
});

oktaSignIn.renderEl({
    el: '#sign-in-container'
  },
  function (res) {
    // res.idToken - id_token generated
    // res.claims - decoded id_token information
  },
  function (err) {
    // handleErrors(err);
  });
~~~

-   `clientId`
    
    [Client Id](docs/api/resources/oauth-clients.html) pre-registered with Okta for OIDC authentication flow.

      Type    |   Required    | Default
    --------  | ------------  | -----------
    String    | Yes           | None

-   `redirectUri`
    
    Callback location to send the authorization code to. This must be pre-registered as part of client registration.

      Type    |   Required   | Default
    --------  | -----------  | -----------
    String    | Yes          | `window.location.href`

-   `idps`
    
    External Identity Providers to use in OIDC authentication.
    Supported Identity providers - `GOOGLE`, `FACEBOOK` and `LINKEDIN`.
    Each idp needs to be passed an object with `id` and `type`.

      Type    |   Required   | Default
    --------  | -----------  | -----------
    Array     | No           | `[]`

-   `idpDisplay`
    
    Display order for External Identity providers. `PRIMARY` to display external Idps
    as primary Idps over Okta and `SECONDARY` to display Okta as the primary Idp.

      Type    |   Required   | Default
    --------  | -----------  | -----------
    String    | No           | `SECONDARY`

-   `oAuthTimeout`
    
    Timeout for the OIDC authentication flow requests.

      Type    |   Required   | Default
    --------  | -----------  | -----------
    Number    | No           | `120000`

-   `authScheme`
    
    Authentication scheme for OIDC authentication.
        
      Type    |   Required   | Default
    --------  | -----------  | -----------
    String    | Yes          | `OAUTH2`

-   `authParams`
    
    Authentication params for OIDC. Here is the full list of `authParams` that you can configure:
    
    -   `display`
        
        Specify how to display authentication UI.
        
          Type    |   Required   | Default    | Allowed values
        --------  | -----------  | ---------  | --------------
        String    | No          | `none` (for Okta) and `popup` (External Idp)| `none`, `popup`, `page`

    -   `responseMode`
        
        Specify how the authorization response should be returned.
        
          Type    |   Required   | Default            | Allowed values
        --------  | -----------  | -----------------  | --------------
        String    | Yes          | `okta_post_message`| `query`, `fragment`, `form_post`, `okta_post_message`

    -   `responseType`

        Specify the response type for OIDC authentication. The authorization code returned can later
        be exchanged for Access token or Refresh token.
        
          Type    |   Required   | Default     | Allowed values
        --------  | -----------  | ----------- | --------------
        String    | Yes          | `id_token`  | `code`, `token`, `id_token`

    -   `scope`

        Specify what information to make available in the `id_token`. `openid` is required.
        
          Type    |   Required   | Default              | Allowed values
        --------  | -----------  | -------------------  | --------------
        Array     | Yes          | `['openid', 'email']`| `openid`, `email`, `profile`, `address`, `phone`

## Render the widget

`.renderEl()` Render function for the sign-in widget. The function must be called with an `options` object containing any of the configuration options, a `success` callback function and a `failure` callback function. The options object must have an `el` property, usually an HTML DOM element `id` or `selector`, which becomes the container element for the widget DOM.

#### Example
~~~ javascript
var oktaSignIn = new OktaSignIn({
  baseUrl: 'https://acme.okta.com'
});

oktaSignIn.renderEl({
    el: '#sign-in-container',
    features: {
      rememberDevice: false,
    },
    labels: {
      'primaryauth.title': 'Partner login',
      'help': 'Click here for more help'
    },
    helpLinks: {
      'help': 'https://acme.com/custom/help'
    }
  },
  function (res) {
    if (res.status === 'SUCCESS') {
      // Success callback
      res.session.setCookieAndRedirect('https://acme.com/home');
    }
  },
  function (err) {
    // Error callback
    alert(err.message);
  });
~~~

##### Parameters
Name                  |   Type    |   Required    | Description
--------------------- | --------  | ------------  | -----------
options               | Object    | Yes           | Configuration options for the widget. `el` is required.
successCallback       | Function  | Yes           | Success callback to invoke on successful authentication.
failureCallback       | Function  | Yes           | Failure callback to invoke on unsuccessful authentication.

## Session Management

The Sign-in widget SDK allows managing your Okta session.

#### Check for an existing session

`.session.exists()` Check if there is an active session.

##### Example
~~~ javascript
oktaSignIn.session.exists(function (exists) {
  if (exists) {
    // There is an active session
  } else {
    // No active session found
  }
});
~~~

##### Parameters
Name                  |   Type    |   Required    | Description
--------------------- | --------  | ------------  | -----------
callback              | Function  | Yes           | Callback function. The function is passed a boolean value.

#### Get the session

`.session.get()` Get the active session information.

##### Example
~~~ javascript
oktaSignIn.session.get(function (res) {
  if (res.status !== 'INACTIVE') {
    /**
     * res.status - 'ACTIVE'
     * res.session - session object
     * res.user - user object
     */
  } else {
    // There is no active session. Show the login flow.
    oktaSignIn.renderEl(options, successFn, errorFn);
  }
});
~~~

##### Parameters
Name                  |   Type    |   Required    | Description
--------------------- | --------  | ------------  | -----------
callback              | Function  | Yes           | Callback function. The function is passed an object with status, session, user information if there is an active session and `{status: 'INACTIVE'}` if there is none.

#### Refresh the session

`.session.refresh()` Refresh the current session by extending its lifetime. This can be used as a keep-alive operation.

##### Example
~~~ javascript
oktaSignIn.session.refresh(function (res) {
  if (res.status === 'INACTIVE') {
    // There is no active session to refresh
  } else {
    // The session now has an extended lifetime
    
    /**
     * res.status - 'ACTIVE'
     * res.session - session object
     * res.user - user object
     */
  }
});
~~~

##### Parameters
Name                  |   Type    |   Required    | Description
--------------------- | --------  | ------------  | -----------
callback              | Function  | Yes           | Callback function. The function is passed an object with status, session, user information if there is an active session and `{status: 'INACTIVE'}` if there is none.

#### Close the session

`.session.close()` Close the active session. Same as `.signOut()`

##### Example
~~~ javascript
oktaSignIn.session.close(function () {
  // User is now logged out
});
~~~

##### Parameters
Name                  |   Type    |   Required    | Description
--------------------- | --------  | ------------  | -----------
callback              | Function  | Yes           | Callback function to invoke after closing the session. The function is invoked with an error message if the operation was not successful.

#### Sign-out the user

`.signOut()` Sign-out the current signed-in user. Shorthand for `.session.close()`

##### Example
~~~ javascript
oktaSignIn.signOut(function () {
  // User is now logged out
});
~~~

##### Parameters
Name                  |   Type    |   Required    | Description
--------------------- | --------  | ------------  | -----------
callback              | Function  | Yes           | Callback function to invoke after signing out the user. The function is invoked with an error message if the operation was not successful.

## Token Management

The Sign-in widget SDK allows managing your ID tokens.

#### Refresh an id token

`.idToken.refresh()` Refresh the `id_token` by extending its lifetime.

##### Example
~~~ javascript
oktaSignIn.idToken.refresh(token, function (newToken) {
  // New id_token with extended lifetime
});
~~~

##### Parameters
Name                  |   Type    |   Required    | Description
--------------------- | --------  | ------------  | -----------
token                 | String    | Yes           | `id_token` to refresh
callback              | Function  | Yes           | Callback function. The function is passed a new `id_token` if the operation was successful and an error message if it was not.
options               | Object    | No            | OIDC options