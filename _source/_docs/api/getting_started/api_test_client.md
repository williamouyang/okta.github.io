---
layout: docs_page
weight: 1
title: API Test Client
redirect_from: "/docs/getting_started/api_test_client.html"
---

# Getting Started with the Okta API

A great way to learn an API is to issue requests and inspect the responses. You can easily access our Postman collections and Example environment to do just that.

![Postman and an Okta Collection](/assets/img/postman.png)

## Set Up Your Environment

1. [Sign up for an Okta Developer org](https://www.okta.com/platform-signup/), log in, and [create an API key](getting_a_token.html).
2. [Install the Postman App](http://getpostman.com).
3. Launch Postman.
4. [Download the Okta Example environment for Postman](http://developer.okta.com/docs/api/postman/example.okta.com.environment), and modify the environment variables for your org, username, and password.
    If you're not familiar with Postman, use [the configuration instructions](#configure-the-example-postman-environment) to set up your example environment and send your first request.

## Import Collections

Click the "Run in Postman" button at the top of each API topic that has a collection, for example [the Authentication API](/docs/api/resources/authn.html#getting-started-with-authentication).

Or, you can import the collections here:

| [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/07df454531c56cb5fe71) Authentication API    | [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8438ef3445415386b407) Identity Providers (IdP) API  |
| [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/17d9f7e4f331c1d3c858) Sessions API   | [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5f91aaea133fe6c9cb8b) Admin Roles API  |
| [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/4b283a9afed50a1ccd6b) Apps API    | [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/443242e60287fb4b8d6d) Schemas API   |
| [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/44d6b3bbbbf674035a86) Events API   | [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/d71f7946d8d56ccdaa06) Custom SMS Templates   |
| [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/b055a859dbe24a54814a) Factors API   | [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/78060451b3ba309f5bcf) Users API  |
| [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c33a1f9fa8a44c481a6f) Groups API   |   |

You're ready to send requests to an Okta API and read the response.

## Configure the Example Postman Environment

If you're not familiar with Postman, use the following instructions to configure your environment.
 
1. Launch the Postman app and import the Okta Example environment using this link: http://developer.okta.com/docs/api/postman/example.okta.com.environment
    ![Importing the Okta Example Environment](/assets/img/import_enviro.png)
2. Make sure the example.com environment is selected:
    ![Postman app with collections](/assets/img/postman_example_start.png)

3. Click the eye icon next to `example.com` and select **Edit** to add these values:
    * `url`: Replace the example value with your org's URL, for example **https://myOrg.okta.com**.
    * `apikey`: Enter the API Key you created in your org, for example **00LzMWxMq_0sdErHy9Jf1sijEGexYZlsdGr9a4QjkS**.
    * `email-suffix`: Enter the email suffix for your domain, for example **myOrg.com**.
    * `subdomain`: Enter the subdomain, for example **myOrg**.
    * `username`, `password`: Enter the username and password for the API user that sends your requests.

4. Save your changes. If you click on the eye icon again, your environment looks similar to this example:
 
![Example.com environment with required values](/assets/img/postman_example_enviro.png)

## Finding IDs for Okta API Requests

Your imported collections contain URLs and JSON request bodies that have sample data with variables such as **\{\{userId\}\}**.
Replace URL and body variables with the IDs of specific resources for your organization.

To find an ID:

1. List a resource collection with a search or filter. For example, [list the users in your org](/docs/api/resources/users.html#list-users).
    ![List Users Response](/assets/img/postman_response.png)
2. Copy the `id` of the resource, in this example the `id` for Tony Stark, in your next request. 
