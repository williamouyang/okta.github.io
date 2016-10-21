---
layout: docs_page
title: Change Private Resource Server to Shared Authorization Server
---

## Change Private Resource Server to Shared Authorization Server

Okta provided the private resource server for OAuth 2.0 (Beta).
However, with release 2016.45, you can use a shared authorization server instead, which provides several benefits:

* You created a separate private resource server for each client, which required you to set scopes and claims 
  and Group filters for each client on a separate server, but keeping many configurations in sync is challenging.
  With the shared resource server, you can create a single configuration of scopes, claims, and Group filters, and
  assign multiple clients. 
* With the shared resource server, you can create one server per API or other service that you need to secure.
  When you bring a new client online, you can choose which combination of services it can use by choosing the
  appropriate combination of authorization servers. This ensures that access is being granted with the same permissions
  (scopes) each time.

Since a shared authorization server meets the same needs as the current private resource server,
we are deprecating the private resource server. All orgs using the private resource server must create 
a shared authentication server and manually transfer their OAuth 2.0 configuration information
using the instructions provided. 

> Do this within two weeks after preview release 2016.45 is available, currently scheduled for early November. 
After that date, the private resource server and all configuration information for it (scopes, claims, and groups claims)
will be removed and you'll have to recreate configurations without reference to the existing configuration. 

## Prerequisites

* You participate in the OAuth 2.0 Beta program or OpenID Connect Early Access program, and set up scopes and claims
  or have an OpenID Connect ID Token or OAuth 2.0 Access Token set up, and want to keep these configurations. 
  If not, you don't have any information to transfer and don't need to perform these steps.
* You have Admin access to the org where the private resource server is set up. You need this access
  to collect the existing information and manually transfer it to the new shared authorization server that you will create.

## Instructions

To move from the private resource server to the shared authorization server:

1. [Create a new Authorization Server](#step-one-create-a-new-authorization-server).
2. [Copy your scopes, claims, and group claims configurations to the new authorization server](#step-two-copy-your-configuration).
3. [Test your shared authorization server configuration](#step-three-test-your-configuration).
4. [Change your clients to use the new endpoints](#step-four-change-your-clients-to-consume-the-new-endpoints).

> You can create more than one shared authorization server. However, to ensure the move is made correctly,
we recommend you create one shared authorization server, complete these steps, and test it before making any other changes.

### Step One: Create a New Authorization Server

In the Okta user interface, create a new authorization server:

1. In the Okta Admin user interface, go to **Security > API**.
2. Click **Add Authorization Server**.
3. Enter a unique name that indicates the purpose of this authorization server.
4. Enter the **Resource URI**, your base URL for the resources you are storing in the authorization server.
   For example, if your resource is `mycorp.mydomain.com/api/cats`, the resource URI is `mycorp.mydomain.com/api`.
   This value becomes the `audience` in the Access Token.
5. Enter a description, for example, describe the resources that this authorization server will manage.
6. Select **Save**. Okta displays the detail page for the authorization server you just created. 
   Notice the values for **Issuer** and **Metadata URI**. They both contain the ID of the authorization server.

### Step Two: Copy Your Configuration

Copy the custom scopes, custom claims, and group claims configuration from the private resource server 
to the shared resource server:

1. Navigate to **Security > Applications** and select an app.
2. Select **Authorization Server**.
3. Collect the information about **Token Credentials**: automatic or manual
4. Collect all information about the **OpenID Connect ID Token**: `issuer`, `audience`, `claims settings`, and `groups claims`.
5. Collect all the information about **OAuth 2.0 Access Token**: `issuer`, `audience`, `scopes`, `claims`, and `groups claims`.
6. Select **Security > API** 
7. Select your authorization server name.
7. Select **Scopes** and add any of the scopes you copied in step 2.
8. Select **Claims** and add any of the claims you copied in step 2.

>Hint: Instead of copying strings from the UI to a text document, you can capture the screen for each Authorization Server
configuration screen.

The final configuration step is to create access policies for your new authorization server. 
The private authorization server provided a single default access policy--all users received all claims.
The shared authorization server allows you to control which users receive which claims, so you must set the access policy
to ensure behavior is the same between private and shared authorization server.

To copy the default access policy from the private authorization server:

1. In **Security > API**, select the name of the authorization server you are configuring.
2. Select **Access Policies > Add Rule**.
3. Create a rule.
4. Select **User is assigned this client**
5. Check the box for every scope displayed.
4. Select **Update Rule**.

### Step Three: Test Your Configuration

Send an API request for a token to the old private authorization server and the new shared authorization server.
Both tokens should contain the same scope and claim information. 

<Link to the api doc for the correct operations to use.>

### Step Four: Change Your Clients to Consumer the New Endpoints

Change the common base URL for the OAuth endpoints. If you perform validation, change the validation to
check for the issuer, because the issuer is now a different authorization server. 

To change the well-known endpoint:

1. Use the [Discovery Document](http://developer.okta.com/docs/api/resources/oidc.html#openid-connect-discovery-document)
to identify all endpoints that must be changed, as shown in the example below.

2. Find all the code you've written that references the authorization server in the endpoints returned by the discovery document. For example,
in step 1., the following endpoints were identified: `/oauth2/v1/authorize`, `/oauth2/v1/token`, and `/oauth2/v1/userinfo`.

3. For every instance in your code of the endpoints that reference the private authorization server, 
change the common base URL for the OAuth endpoints described in step 2. You can find the new authorization server ID 
in the Okta Admin user interface: **Security > Authorization Server**, in either
**Metadata URI** or **Issuer**. The URL formatting should stay the same otherwise (query parameters, client IDs, scopes, and other qualifiers). 

4. Finally, where you perform validation checks, modify the issuer, which is now a different authorization server. 

>Hint: If you haven't already, structure your code to make the ID of the authorization server a variable. 
If you have different authorization servers for the app lifecycle (dev, test, prod) or want to move authorization servers
in the future, you can adjust a few variables. 

Discovery Document Example:

Request:
    
        ~~~sh 
        https://${org}.{subdomain}.com/.well-known/openid-configuration
        ~~~
        
Response:       
    
        ~~~sh
        {
          "issuer": "https://myOrg.example.com",
          "authorization_endpoint": "https://myOrg.example.com/oauth2/v1/authorize",
          "token_endpoint": "https://myOrg.example.com/oauth2/v1/token",
          "userinfo_endpoint": "https://myOrg.example.com/oauth2/v1/userinfo",
          "jwks_uri": "https://myOrg.example.com/oauth2/v1/keys",
          "response_types_supported": [
            "code",
            "id_token",
            "token",
            "code id_token",
            "code token",
            "id_token token",
            "code id_token token"
          ],
          ...
        }
        ~~~
    
## Troubleshooting

If you don't get a successful test in [Step Three](#step-three-test-your-configuration), 
check for the following symptoms and try the resolutions.

### Symptom 1: Some requests still using the old base URL

Did you hard-code the base URL anywhere? If so, remove the hard-coding.

### Symptom 2: 

### Symptom 3: