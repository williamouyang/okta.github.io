---
layout: docs_page
title: Schema
author: Benjamin Wesson
editor: Karl McGuinness
---

* Will be replaced with the ToC
{:toc .list-unstyled .toc}

## Overview
JSON Schema is a declaritive format for describing the structure and interaction models of metadata based on the `application/schema+json` media type.[^1]: The schema declaration is writen in JSON using the `$schema` keyword. This keyword appears as a root-level entry and describes the version of the schema referenced. Note that declarations without a version property are assumed to reference the current version. As of the time of this writing, the current draft specification for JSON Schemas was version 4. An example of a `$schema` property declaration is included below:

~~~json
"$schema": "http://json-schema.org/draft-04/schema#"
~~~

The JSON Schema declaration also inclues an `id` property to uniquely identify each schema and to declare a base URL against which `$ref` URLs are resolved. An example of an id property declaration is included below: 

~~~json
"id": "https://www.okta.com/api/v1/meta/schemas/users/{{name}}" 
~~~

The `$ref` property can also be used to combine schemas definitions into reusable subschemas. Such as structure is typically referred to as a **"Complex Schema"**.[^2]: Combining modular subschemas is one way of facilitiating reuse. For example, the schema definition for an address might include properties like:  `streetAddress`, `city` and `state`. In a so called **"Simple Schema"**, these properties are repeated for every address (e.g., home, work, etc.). Using complex schemas, the definition for a common properties can be stored using `$ref` properties and referenced using JSON Pointers. 

Note that a detailed explaination of JSON Pointers is beyond the scope of this document and readers are encourated to reference the JSON Pointer RFC draft.[^3]:

### Schema Property Attributes

The schema properties are divided into two sections called `base` and `custom`. The base property attributes are defined by Okta and cannot be updated. Custom property attributes can created, updated and removed.

> Note that the Okta schema definitions include an additional property attribute called `$ref`. This property attribute was included for future for future use only. It is not possible to reference individual base or custom schema attributes directly via a URL *namespace name* at this time.  

The base `user` schema properties have the following attributes:

|---------------+---------------------------------------------------+---------------+------------+------------+------------+------------+------------|
| Attribute     | Description                                       | DataType      |  MinLength | MaxLength  | Nullable   |Unique      | Readonly   |
|:--------------|:--------------------------------------------------|:--------------|-----------:|-----------:|:-----------|:----------:|:----------:|
| id            | URL Path                                          | string        |            |            |    FALSE   |    FALSE   |    TRUE    |
| $schema       | version of JSON Schema specification              | string        |            |            |    FALSE   |    FALSE   |    TRUE    |
| name          | variable name of the schema                       | string        |            |            |    FALSE   |    TRUE    |    TRUE    |
| title         | customer defined display name for the schema      | string        |          1 |         50 |    FALSE   |    FALSE   |    FALSE   |
| description   | customer defined description for schema           | string        |          1 |        255 |    TRUE    |    FALSE   |    FALSE   |
| lastUpdated   | timestamp when schema was last updated            | date          |            |            |    FALSE   |    FALSE   |    TRUE    |
| created       | timestamp when app was created                    | date          |            |            |    FALSE   |    FALSE   |    TRUE    |
| definition    | base or custom schema properties                  | string        |            |            |    FALSE   |    FALSE   |    TRUE    |
|---------------+---------------------------------------------------+---------------+------------+------------+------------+------------+------------|

> All root-level schema property attributes including `id`, `$schema`, `name` and `definition` are immutable. The `created` and `lastUpdated` attributes are read-only and maintained by Okta. Editable properties including `title` and `description` can not contain spaces, quotations marks or a solidus (i.e., slash) as per RFC 7158[^4]:. 

The custom `user` schema has similar attributes to the base schema (as shown below) but the `name` and other properties are editable.    

~~~json
{
    "custom": {
        "id": "#custom",
        "type": "object",
        "properties": {
            "{{name}}": {
                "title": "{{title}}",
                "description": "{{description}}",
                "type": "string",
                "permissions": [
                    {
                        "principal": "SELF",
                        "action": "READ_ONLY"
                    }
                ],
                "mastering": {
                    "inherit": true,
                    "priority": []
                }
            }
        },
        "required": []
    }
}
~~~

The custom `user` schema properties have the following attributes:

|---------------+-----------------------------------------------------------------------+---------------+------------+------------+------------+------------+------------|
| Attribute     | Description                                                           | DataType      |  MinLength |  MaxLength |  Nullable  |   Unique   |  Readonly  |
|:--------------|:----------------------------------------------------------------------|:--------------|-----------:|-----------:|:-----------|:----------:|:----------:|
| id            | symbolic link to schema type (i.e., #custom)                          | string        |            |            |    FALSE   |    TRUE    |    TRUE    |
| type          | defined by Okta                                                       | string        |            |            |    FALSE   |    FALSE   |    TRUE    |
| properties    | custom property attributes                                            | string        |            |            |    FALSE   |    FALSE   |    TRUE    |
| name          | custom defined variable name for the schema                           | string        |          1 |         50 |    FALSE   |    FALSE   |    FALSE   |
| title         | custom defined display name for the schema property                   | string        |          1 |         50 |    FALSE   |    FALSE   |    FALSE   |
| description   | customer defined description for schema                               | string        |          1 |        255 |    TRUE    |    FALSE   |    FALSE   |
| type          | schema property data type                                             | {{type}}      |            |            |    FALSE   |    FALSE   |    FALSE   |
| permissions   | array of JSON attribute-value pairs defining allowed operations       | string        |            |            |    FALSE   |    FALSE   |    TRUE    |
| mastering     | array of JSON attribute-value pairs defining inheritance properties   | string        |            |            |    FALSE   |    FALSE   |    TRUE    |
| required      | array of required attribute names                                     | string        |            |            |    FALSE   |    FALSE   |    TRUE    |
|---------------+-----------------------------------------------------------------------+---------------+------------+------------+------------+------------+------------|

> Note that the `name` property is prefaced by the schema object (e.g., `user`) automatically and only has be be unique within this object. 
> The `type` property attribute must be *number*, *string*, *boolean*, *array*, *value* or *object*. It cannot consist of *whitespace* or be *null*. 

## Schema Operations

### Describe User Schema
{:.api .api-operation}

Returns properties from the `users` schema

- [Describe User Schema](#describe-user-schema)

<span class="api-uri-template api-uri-get"><span class="api-label">GET</span> /meta/schemas/users/default</span>

##### Request Example
{:.api .api-request .api-request-example}

~~~http
curl -X GET \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -H "Authorization: SSWS {{apikey}}" \
    -H "Cache-Control: no-cache" \
    https://{{url}}/api/v1/meta/schemas/user/default
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
    "id": "https://{{url}}/meta/schemas/user/default",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "name": "user",
    "title": "Subscribers",
    "description": "Okta user profile template with default permission settings",
    "lastUpdated": "2015-06-24 19:26:14.0",
    "created": "2015-03-12 21:03:52.0",
    "definitions": {
        "base": {
            "id": "#base",
            "type": "object",
            "properties": {
                "login": {
                    "title": "Username",
                    "type": "string",
                    "required": true,
                    "minLength": 5,
                    "maxLength": 100,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "firstName": {
                    "title": "First name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "lastName": {
                    "title": "Last name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "middleName": {
                    "title": "Middle name",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "honorificPrefix": {
                    "title": "Honorific prefix",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "honorificSuffix": {
                    "title": "Honorific suffix",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "email": {
                    "title": "Primary email",
                    "type": "string",
                    "required": true,
                    "format": "email",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "title": {
                    "title": "Title",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "displayName": {
                    "title": "Display name",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "nickName": {
                    "title": "Nickname",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "profileUrl": {
                    "title": "Profile Url",
                    "type": "string",
                    "format": "uri",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "secondEmail": {
                    "title": "Secondary email",
                    "type": "string",
                    "format": "email",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "mobilePhone": {
                    "title": "Mobile phone",
                    "type": "string",
                    "maxLength": 100,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "primaryPhone": {
                    "title": "Primary phone",
                    "type": "string",
                    "maxLength": 100,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "streetAddress": {
                    "title": "Street address",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "city": {
                    "title": "City",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "state": {
                    "title": "State",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "zipCode": {
                    "title": "Zip code",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "countryCode": {
                    "title": "Country code",
                    "type": "string",
                    "format": "country-code",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "postalAddress": {
                    "title": "Postal Address",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "preferredLanguage": {
                    "title": "Preferred language",
                    "type": "string",
                    "format": "language-code",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "locale": {
                    "title": "Locale",
                    "type": "string",
                    "format": "locale",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "timezone": {
                    "title": "Time zone",
                    "type": "string",
                    "format": "timezone",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "userType": {
                    "title": "User type",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "employeeNumber": {
                    "title": "Employee number",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "costCenter": {
                    "title": "Cost center",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "organization": {
                    "title": "Organization",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "division": {
                    "title": "Division",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "department": {
                    "title": "Department",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "managerId": {
                    "title": "ManagerId",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "manager": {
                    "title": "Manager",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                }
            },
            "required": [
                "login",
                "firstName",
                "lastName",
                "email"
            ]
        },
        "custom": {
            "id": "#custom",
            "type": "object",
            "properties": {
                "{{name}}": {
                    "title": "{{displayName}}",
                    "description": "{{description}}",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                }
            },
            "required": []
        }
    },
    "type": "object",
    "properties": {
        "profile": {
            "allOf": [
                {
                    "$ref": "#/definitions/base"
                },
                {
                    "$ref": "#/definitions/custom"
                }
            ]
        }
    }
}
~~~

### Add User Schema Property
{:.api .api-operation}

Adds a custom property to the `users` schema

- [Add User Schema Property](#add-user-schema-property)

<span class="api-uri-template api-uri-get"><span class="api-label">POST</span> /meta/schemas/users/default</span>

##### Request Example
{:.api .api-request .api-request-example}

~~~http
curl -X POST -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -H "Authorization: SSWS {{apikey}}" \
    -H "Cache-Control: no-cache" \
    -d '{
        "definitions": {
            "custom": {
                "id": "#custom",
                "type": "object",
                "properties": {
                    "{{name}}": {
                        "title": "{{displayName}}",
                        "description": "{{description}}",
                        "type": "string",
                        "required": false,
                        "minLenght": 2,
                        "maxLenght": 64,
                        "permissions": [
                            {
                                "principal": "SELF",
                                "action": "READ_ONLY"
                            }
                        ],
                        "mastering": {
                            "inherit": true,
                            "priority": [ ]
                        }
                        
                    }
                    
                },
                "required": [ ]
            }
        }
    }' https://{{url}}/api/v1/meta/schemas/user/default
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
    "id": "https://{{url}}/meta/schemas/user/default",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "name": "user",
    "title": "Subscribers",
    "description": "Okta user profile template with default permission settings",
    "lastUpdated": "2015-06-24 19:26:14.0",
    "created": "2015-03-12 21:03:52.0",
    "definitions": {
        "base": {
            "id": "#base",
            "type": "object",
            "properties": {
                "login": {
                    "title": "Username",
                    "type": "string",
                    "required": true,
                    "minLength": 5,
                    "maxLength": 100,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "firstName": {
                    "title": "First name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "lastName": {
                    "title": "Last name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "middleName": {
                    "title": "Middle name",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "honorificPrefix": {
                    "title": "Honorific prefix",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "honorificSuffix": {
                    "title": "Honorific suffix",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "email": {
                    "title": "Primary email",
                    "type": "string",
                    "required": true,
                    "format": "email",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "title": {
                    "title": "Title",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "displayName": {
                    "title": "Display name",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "nickName": {
                    "title": "Nickname",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "profileUrl": {
                    "title": "Profile Url",
                    "type": "string",
                    "format": "uri",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "secondEmail": {
                    "title": "Secondary email",
                    "type": "string",
                    "format": "email",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "mobilePhone": {
                    "title": "Mobile phone",
                    "type": "string",
                    "maxLength": 100,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "primaryPhone": {
                    "title": "Primary phone",
                    "type": "string",
                    "maxLength": 100,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "streetAddress": {
                    "title": "Street address",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "city": {
                    "title": "City",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "state": {
                    "title": "State",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "zipCode": {
                    "title": "Zip code",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "countryCode": {
                    "title": "Country code",
                    "type": "string",
                    "format": "country-code",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "postalAddress": {
                    "title": "Postal Address",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "preferredLanguage": {
                    "title": "Preferred language",
                    "type": "string",
                    "format": "language-code",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "locale": {
                    "title": "Locale",
                    "type": "string",
                    "format": "locale",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "timezone": {
                    "title": "Time zone",
                    "type": "string",
                    "format": "timezone",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "userType": {
                    "title": "User type",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "employeeNumber": {
                    "title": "Employee number",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "costCenter": {
                    "title": "Cost center",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "organization": {
                    "title": "Organization",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "division": {
                    "title": "Division",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "department": {
                    "title": "Department",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "managerId": {
                    "title": "ManagerId",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "manager": {
                    "title": "Manager",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                }
            },
            "required": [
                "login",
                "firstName",
                "lastName",
                "email"
            ]
        },
        "custom": {
            "id": "#custom",
            "type": "object",
            "properties": {
                "{{name}}": {
                    "title": "{{displayName}}",
                    "description": "{{description}}",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                }
            },
            "required": []
        }
    },
    "type": "object",
    "properties": {
        "profile": {
            "allOf": [
                {
                    "$ref": "#/definitions/base"
                },
                {
                    "$ref": "#/definitions/custom"
                }
            ]
        }
    }
}
~~~

### Remove User Schema Property
{:.api .api-operation}

Removes a custom property from the `users` schema by setting the `name` property to __null__.

<span class="api-uri-template api-uri-get"><span class="api-label">POST</span> /meta/schemas/users/default</span>

##### Request Example
{:.api .api-request .api-request-example}

~~~http
curl -X POST \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -H "Authorization: SSWS 00Ixx80zCWDY0cLrDPTGSWsHTK8SWDLVmtEpVPkId3" \
    -H "Cache-Control: no-cache" \
    -d '{
        "definitions": {
            "custom": {
                "properties": {
                    "{{name}}": null
                }
            }
        }
    }' https://{{url}}/api/v1/meta/schemas/user/default
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
    "id": "https://dev-520300.okta.com/meta/schemas/user/default",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "name": "user",
    "title": "Subscribers",
    "description": "Okta user profile template with default permission settings",
    "lastUpdated": "2015-06-24 19:26:14.0",
    "created": "2015-03-12 21:03:52.0",
    "definitions": {
        "base": {
            "id": "#base",
            "type": "object",
            "properties": {
                "login": {
                    "title": "Username",
                    "type": "string",
                    "required": true,
                    "minLength": 5,
                    "maxLength": 100,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "firstName": {
                    "title": "First name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "lastName": {
                    "title": "Last name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "middleName": {
                    "title": "Middle name",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "honorificPrefix": {
                    "title": "Honorific prefix",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "honorificSuffix": {
                    "title": "Honorific suffix",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "email": {
                    "title": "Primary email",
                    "type": "string",
                    "required": true,
                    "format": "email",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "title": {
                    "title": "Title",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "displayName": {
                    "title": "Display name",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "nickName": {
                    "title": "Nickname",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "profileUrl": {
                    "title": "Profile Url",
                    "type": "string",
                    "format": "uri",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "secondEmail": {
                    "title": "Secondary email",
                    "type": "string",
                    "format": "email",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "mobilePhone": {
                    "title": "Mobile phone",
                    "type": "string",
                    "maxLength": 100,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "primaryPhone": {
                    "title": "Primary phone",
                    "type": "string",
                    "maxLength": 100,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "streetAddress": {
                    "title": "Street address",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "city": {
                    "title": "City",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "state": {
                    "title": "State",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "zipCode": {
                    "title": "Zip code",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "countryCode": {
                    "title": "Country code",
                    "type": "string",
                    "format": "country-code",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "postalAddress": {
                    "title": "Postal Address",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "HIDE"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "preferredLanguage": {
                    "title": "Preferred language",
                    "type": "string",
                    "format": "language-code",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "locale": {
                    "title": "Locale",
                    "type": "string",
                    "format": "locale",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "timezone": {
                    "title": "Time zone",
                    "type": "string",
                    "format": "timezone",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "userType": {
                    "title": "User type",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "employeeNumber": {
                    "title": "Employee number",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "costCenter": {
                    "title": "Cost center",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "organization": {
                    "title": "Organization",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "division": {
                    "title": "Division",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "department": {
                    "title": "Department",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "managerId": {
                    "title": "ManagerId",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "manager": {
                    "title": "Manager",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                }
            },
            "required": [
                "login",
                "firstName",
                "lastName",
                "email"
            ]
        },
        "custom": {
            "id": "#custom",
            "type": "object",
            "properties": {
                "shoeSize": {
                    "title": "Shoe Size",
                    "description": "{{description}}",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "iceCreamFlavor": {
                    "title": "Ice Cream Flavor",
                    "description": "My favorite flavor of ice cream.",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                },
                "name": {
                    "title": "Display Name",
                    "description": "Description",
                    "type": "string",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_ONLY"
                        }
                    ],
                    "mastering": {
                        "inherit": true,
                        "priority": []
                    }
                }
            },
            "required": []
        }
    },
    "type": "object",
    "properties": {
        "profile": {
            "allOf": [
                {
                    "$ref": "#/definitions/base"
                },
                {
                    "$ref": "#/definitions/custom"
                }
            ]
        }
    }
}
~~~

##Acknowledgments
The author wishes to acknowledge Michael Droettbom of the Space Telescope Science Institute for publishing *Understanding JSON Schema*[^3]:. 

##Works Cited
[^1]: Gallegue, F., & Zyp, K. (2013, January 30). JSON Schema: Core definitions and terminology json-schema-core. Retrieved from http://json-schema.org/latest/json-schema-core.html

[^2]: Bryan, P., Zyp, K., & Nottingham, M. (Eds.). (2013, April 1). JavaScript Object Notation (JSON) Pointer. Retrieved from https://tools.ietf.org/html/rfc6901

[^3]: Michael, D. (2015, May 14). Understanding JSON Schema. Retrieved from http://spacetelescope.github.io/understanding-json-schema/index.html

[^4]: Bray, T. (Ed.). (2014, March). The JavaScript Object Notation (JSON) Data Interchange Format. Retrieved from https://tools.ietf.org/html/rfc7159#section-8