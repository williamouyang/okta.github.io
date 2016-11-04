---
layout: docs_page
title: API Access Management Troubleshooting
---

# Troubleshooting for API Access Management

If you run into trouble setting up an authorization server or performing
other tasks for API Access Management, use the following suggestions to resolve your issues before calling Support.

## Always Start with the System Log

The system log contains detailed information about why a request was denied and other useful information. 

## Limits

* Each authorization server can have only one resource. If you have resources that share a common path,
you can control access to the common path with one authorization server.

* Scopes are unique per authorization server. 

* The resource URI you specify in an authorization server must be an absolute path.

* If token revocation is explicit, that is, a request to `/oauth2/v1/revoke` is successful, the revocation is immediate.

* Token revocation can be implicit in two ways: token expiration or a change to the source. 
    * Expiration happens at different times:
        * ID Token expires after one hour.
        * Access Token expiration is configured in a policy, but is always between five minutes and one day.
        * Refresh Token expiration depends on two factors: 1) Expiration configured in a policy, no limits, 
          but must be greater than or equal to the Access Token lifetime, and 2) A Refresh Token must be used
          before it is revoked, any time between ten minutes and the limit set in a policy.
    
    * Expiration happens when the client source is changed or deleted:
        * User deactivation or deletion.
        * A resource specified in the authorization server is changed or deleted.
        * The client app is deactivated, changed, unassigned, or deleted.
        
* If a client requests multiple scopes, but the policy for that client only allows for a subset of the scopes,
then the token isn't minted and an error is returned. The system log contains the details about the error.

## Subtle Truths

* If you choose a scope that the client app doesn't support, no token is minted and an error is returned.

* A user must be assigned to the client in Okta for the client to get Access Tokens from that client. The error
message may not be clear. To resolve, assign a user, or a group that contains the user, to the client.

* If you haven't created a rule in a policy in the authorization server to allow the client, user, and 
scope combination that you want, the request fails and the error message may not be clear.
To resolve, create at least one rule in a policy in the authorization server for the relevant resource
that specifies client, user, and scope.

* OpenID Connect scopes are granted by default, so if you are requesting only those scopes ( `openid`, `email`, `phone`,
`offline_access`, `profile`, or `address`), you don't need to define a policy and rule in the authorization server.
If no policies exist, token expiration is the default expiration for that token. If policies and rules are created, 
token expiration depends on how they are defined in the rules, and which polices and rules match the request.

* OpenID scopes can be requested with custom scopes. For example, a request can include `openid` and a custom scope.