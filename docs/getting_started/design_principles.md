---
layout: sdks
title: Getting Started - Design Principles
category : Getting Started
tagline: "Getting Started - Design Principles"
tags : [getting stated, design principles]
icon: "glyphicon glyphicon-design"
position: leftsidebar
priority: 1
---

# Design Principles

- [URL Namespace](#url-namespace)
- [Media Types](#media-types)
- [HTTP Verbs](#http-verbs)
- [Errors](#errors)
- [Authentication](#authentication)
- [Pagination](#pagination)
	- [Link Header](#link-header)
- [Rate Limiting](#rate-limiting)

## Versioning

The Okta API is a versioned API.  Okta reserves the right to add new parameters, properties, or resources to the API without advance notice. These updates are considered **non-breaking** and the compatibility rules below should be followed to ensure your application does not break. Breaking changes such as removing or renaming an attribute will be released as a new version of the API.  Okta will provide a migration path for new versions of APIs and will communicate timelines for end-of-life when deprecating APIs.

### Compatibility rules for input parameters

- Requests are compatible irrespective of the order in which the query parameters appear.
- Requests are compatible irrespective of the order in which the properties of the JSON parameters appear
- New query parameters may be added to future versions of requests.
- Existing query parameters cannot be removed from future versions of requests.
- Existing properties cannot be removed from the JSON parameters in future versions of requests.

### Compatibility rules for JSON responses

- Responses are compatible irrespective of the order in which the properties appear.
- New properties may be added to future versions of the response.
- Existing properties cannot be removed from future versions of the response.
	- Properties with null values may be omitted by responses

## URL Namespace

All URLs listed in the documentation should be preceded with your organization's subdomain (tenant) https://*{yoursubdomain}*.okta.com/api/*{apiversion}*

The `apiversion` is is currently v1.

*Note: All API access is over HTTPS*

## Media Types

The API currently only supports JSON as an exchange format.  Be sure to set both the Content-Type and Accept headers for every request as `application/json`.

All Date objects are returned in ISO 8601 format:

    YYYY-MM-DDTHH:mm:ss.SSSZ
    
## HTTP Verbs

Where possible, the Okta API strives to use appropriate HTTP verbs for each
action.

GET
: Used for retrieving resources.

POST
: Used for creating resources, or performing custom actions (such as
user lifecycle operations).  POST requests
with no `body` param, be sure to set the `Content-Length` header to zero.

PUT
: Used for replacing resources or collections. For PUT requests
with no `body` param, be sure to set the `Content-Length` header to zero.

DELETE
: Used for deleting resources.

*Note: Any PUT or POST request with no Content-Length header nor a body will return a 411 error.  To get around this, either include a Content-Length: 0 header*

## Errors

All requests on success will return a 200 status if there is content to return or a 204 status if there is no content to return.

All requests that result in an error will return the appropriate 4xx or 5xx error code with a custom JSON error object:

- errorCode: A code that is associated with this error type
- errorLink: A link to documentation with a more detailed explanation of the error (note: this has yet to be implemented and for the time being is the same value as the errorCode)
- errorSummary: A natural language explanation of the error
- errorId: An id that identifies this request.  These ids are mapped to the internal error on the server side in order to assist in troubleshooting.

```json
{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed",
    "errorLink": "E0000001",
    "errorId": "oaeHfmOAx1iRLa0H10DeMz5fQ",
    "errorCauses": [
        {
            "errorSummary": "login: An object with this field already exists in the current organization"
        }
    ]
}
```

See [Error Codes](error_codes.md) for a list of API error codes.

*Note: Only the `errorCode` property is supported for runtime error flow control.  The `errorSummary` property is only to intended for troubleshooting and may change over time*

## Authentication

The API currently only supports API keys with a custom HTTP authentication scheme `SSWS` for API authentication. All requests must have a valid API key specified in the HTTP `Authorization` header with the `SSWS` scheme.

```Authorization: SSWS 00QCjAl4MlV-WPXM…0HmjFx-vbGua```

See [Obtaining a token](getting_a_token.md) for instructions on how to get an API key for your organization.


## Pagination

Requests that return a list of resources may support paging.  Pagination is based on
cursor and not on page number. The cursor is opaque to the client and specified in either the `?before` or `?after` query parameter.  For some resources, you can also set a custom page size with the `?limit` parameter.

Note that for technical reasons not all endpoints respect pagination or the `?limit` parameter,
see the [Events](../endpoints/events.md) API for example.


`before`
: This is the cursor that points to the start of the page of data that has been returned.

`after`
: This is the cursor that points to the end of the page of data that has been returned.

`limit`
: This is the number of individual objects that are returned in each page.

### Link Header

Pagination links are included in the [Link
header](http://tools.ietf.org/html/rfc5988). It is **important** to
follow these Link header values instead of constructing your own URLs.

    Link: <https://yoursubdomain.okta.com/api/v1/users?after=00ubfjQEMYBLRUWIEDKK; rel="next",
      <https://yoursubdomain.okta.com/api/v1/users?after=00ub4tTFYKXCCZJSGFKM>; rel="self"

The possible `rel` values are:

`self`
: Specifies the URL of the current page of results

`next`
: Specifies the URL of the immediate next page of results.

`prev`
: Specifies the URL of the immediate previous page of results.

When you first make an API call and get a cursor-paged list of objects, the end of the list will be the point at which you do not receive another `next` link value with the response. The behavior is different in the  *Events* API. In the *Events* API, the next link always exists, since that connotation is more like a cursor or stream of data. The other APIs are primarily fixed data lengths.

## Hypermedia

Resources in the Okta API use hypermedia for "discoverability".  Hypermedia enables API clients to navigate  resources by following links like a web browser instead of hard-coding URLs in your application.  Links are identified by link relations which are named keys. Link relations describe what resources are available and how they can be interacted with.  Each resource may publish a set of link relationships based on the state of the resource.  For example, the status of a user in the [User API](../endpoints/users.md#links-object) will govern which lifecycle operations are permitted.  Only the permitted operations will be published a lifecycle operations.

The Okta API had incorporated [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) or HAL format as the foundation for hypermedia "discoverability.  HAL provides a set of conventions for expressing hyperlinks in JSON responses representing two simple concepts: Resources and Links. 

*Note: The HAL-specific media type `application/hal+json` is currently not supported as a formal media type for content negotiation at this time.  Use the standard `application/json` media type.  As we get more experience with the media format we may add support for the media type.*  

### Resources

A Resource Object represents a resource.

- `"_links"` contains links to other resources.

- `"_embedded"` contains embedded resources.

All other properties represent the current state of the resource.

### Links

Object whose property names are link relation types (as defined by [RFC5988](http://tools.ietf.org/html/rfc5988)) and values are either a Link Object or an array of Link Objects.

- A target URI
- The name of the link relation (`rel`)
- A few other optional properties to help with deprecation, content negotiation, etc.

*Note: A resource may have multiple links that share the same link relation.*

```json
{
    "_links": {
        "self": { "href": "/example_resource" },
        "next": { "href": "/page=2" }
    }
}
```

## Rate Limiting

The number of API requests per-second for an organization is limited for all APIs based on your edition. 

The following three headers are set in each response:

`X-Rate-Limit-Limit` - the rate limit ceiling that is applicable for the current request.

`X-Rate-Limit-Remaining` - the number of requests left for the current rate-limit window.

`X-Rate-Limit-Reset` - the remaining time in the current rate-limit window before the rate limit resets, in UTC epoch seconds.

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 75
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1366037820
```

If the rate limit is exceeded, an HTTP 429 Status Code is returned.

**Rate Limits are currently not enforced. The headers are returned for information only.  Enforcement will be rolled out on a per-org basis for existing API users**
