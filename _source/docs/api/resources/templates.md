---
layout: docs_page
title: Templates
redirect_from: "/docs/api/rest/templates.html"
---

## Overview
The Okta Templates API provides operations to manage custom templates. Currently only the sms custom templates are implemented.

## Sms Templates
Sms templates are used to customize the sms message sent to the users. By default a single sms template "default" exists. All custom templates must have **${code}** variable as part of the text. The **${code}** variable will be replaced with the actual sms code when the message is sent. Optionally a variable **${org.name}** can be used. If a template contains **${org.name}** variable it will be replaced with organization name before the sms message is sent.

## Sms Template Model

### Example
~~~json
{
  "id": "cstk2flOtuCMDJK4b0g3",
  "name": "Custom",
  "type": "SMS_VERIFY_CODE",
  "template": "Your ${org.name} code is: ${code}",
  "created": "2016-06-21T20:49:52.000Z",
  "lastUpdated": "2016-06-21T20:49:52.000Z",
  "translations": {
    "it": "Il codice ${org.name} è: ${code}.",
    "fr": "Votre code ${org.name} : ${code}.",
    "es": "Tu código de ${org.name} es: ${code}."
  }
}
~~~

### Sms Template Attributes

All templates have the following properties:

|------------------------+--------------------------------------------------------------+----------------------------------------------------------------+----------|--------|----------|-----------|-----------+------------|
| Property               | Description                                                  | DataType                                                       | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| ---------------------- | ------------------------------------------------------------ | -------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| id                     | unique key for template                                      | String                                                         | FALSE    | TRUE   | TRUE     |           |           |            |
| name                   | human readable name of the template                          | String                                                         | FALSE    | FALSE  | FALSE    |           |           |            |
| type                   | type of the template                                         | String                                                         | FALSE    | FALSE  | FALSE    |           |           |            |
| template               | text of the template                                         | String                                                         | FALSE    | FALSE  | FALSE    |           |           |            |
| created                | timestamp when template was created                          | Date                                                           | FALSE    | FALSE  | TRUE     |           |           |            |
| lastUpdated            | timestamp when template was last updated                     | Date                                                           | FALSE    | FALSE  | TRUE     |           |           |            |
| translations           | list of translations                                         |                                                                |          |        |          |           |           |            |
|   <language>           | language that was used for translation                       | String                                                         | FALSE    | FALSE  | FALSE    |           |           |            |
|   <translated_template>| translated text of the template                              | String                                                         | FALSE    | FALSE  | FALSE    |           |           |            |
|------------------------+--------------------------------------------------------------+----------------------------------------------------------------+----------|--------|----------|-----------|-----------+------------|

### Sms Template Types

The template type is used to select a fallback template based on the workflow.

|-------------------+--------------------------------------------------------------------------------------------------+
| Type              | Description                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| `SMS_VERIFY_CODE` | Template will be used when we send SMS for code verification.                                    |
|-------------------+--------------------------------------------------------------------------------------------------+


### Sms Template Translations

Template translations are optionally provided when we want to be able to localize the sms messages. The translations are
provided in pair of language and translated template text.

## Add Sms Template
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST</span> /templates/sms</span>

Adds a new custom sms template to your organization.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                               | ParamType | DataType                          | Required | Default
--------- | ----------------------------------------- | --------- | --------------------------------- | -------- | ---
          | Definition of the new custom sms template | Body      | (#template-object)                | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

The created [Sms Template](#sms-template-model).

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "Custom",
  "type": "SMS_VERIFY_CODE",
  "template": "${org.name}: your verification code is ${code}",
  "translations":
  {
     "es" : "${org.name}: el código de verificación es ${code}",
     "fr" : "${org.name}: votre code de vérification est ${code}",
     "it" : "${org.name}: il codice di verifica è ${code}"
  }
}' "https://${org}.okta.com/api/v1/templates/sms"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
    "id": "cstkd89Qu2ypkxNQv0g3",
    "name": "Custom",
    "type": "SMS_VERIFY_CODE",
    "template": "${org.name}: your verification code is ${code}",
    "created": "2016-06-23T17:20:22.000Z",
    "lastUpdated": "2016-06-23T17:20:22.000Z",
    "translations": {
      "it": "${org.name}: il codice di verifica è ${code}",
      "fr": "${org.name}: votre code de vérification est ${code}",
      "es": "${org.name}: el código de verificación es ${code}"
    }
  }
~~~


### Get Sms Template
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET</span> /templates/sms/*:id*</span>

Fetches a specific template by `id`.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter |    Description     | ParamType | DataType | Required | Default
--------- | ------------------ | --------- | -------- | -------- | -------
id        | `id` of a template | URL       | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

Fetched [Sms Template](#sms-template-model)

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${org}.okta.com/api/v1/templates/sms/${templateId}"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
    "id": "cstkd89Qu2ypkxNQv0g3",
    "name": "Custom",
    "type": "SMS_VERIFY_CODE",
    "template": "${org.name}: your verification code is ${code}",
    "created": "2016-06-23T17:20:22.000Z",
    "lastUpdated": "2016-06-23T17:20:22.000Z",
    "translations": {
      "it": "${org.name}: il codice di verifica è ${code}",
      "fr": "${org.name}: votre code de vérification est ${code}",
      "es": "${org.name}: el código de verificación es ${code}"
    }
  }
~~~

### List Sms Templates
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET</span> /templates/sms</span>

Enumerates custom sms templates in your organization. A subset of templates can be returned that match a template type.

- [List Sms Templates with Defaults](#list-sms-templates-with-defaults)
- [List Sms Templates with Type](#list-sms-templates-with-type)

##### Request Parameters
{:.api .api-request .api-request-params}

 Parameter     | Description                                                                                | ParamType | DataType | Required | Default
-------------- | ------------------------------------------------------------------------------------------ | --------- | -------- | -------- | ----------------
 templateType  | Searches the `type` property of templates for matching value                               | Query     | String   | FALSE    |

> Search currently performs exact match ot the type but it should be considered an implementation detail and may change without notice in the future

##### Response Parameters
{:.api .api-response .api-response-params}

Array of [Sms Template](#sms-template-model)

#### List Sms Templates with Defaults
{:.api .api-operation}

Enumerates all sms templates.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${org}.okta.com/api/v1/templates/sms"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
[
  {
    "id": "default",
    "name": "Default",
    "type": "SMS_VERIFY_CODE",
    "template": "Your verification code is ${code}.",
    "created": "2016-06-23T17:41:13.000Z",
    "lastUpdated": "2016-06-23T17:41:13.000Z"
  },
  {
    "id": "cstkdgSQOUacCuF750g3",
    "name": "Custom",
    "type": "SMS_ENROLLMENT_CODE",
    "template": "${org.name}: your enrollment code is ${code}",
    "created": "2016-06-23T17:41:07.000Z",
    "lastUpdated": "2016-06-23T17:41:07.000Z",
    "translations": {
      "it": "${org.name}: il codice di iscrizione è ${code}",
      "fr": "${org.name}: votre code d'inscription est ${code}",
      "es": "${org.name}: su código de inscripción es ${code}"
    }
  },
  {
    "id": "cstkd89Qu2ypkxNQv0g3",
    "name": "Custom",
    "type": "SMS_VERIFY_CODE",
    "template": "${org.name}: your verification code is ${code}",
    "created": "2016-06-23T17:20:22.000Z",
    "lastUpdated": "2016-06-23T17:20:22.000Z",
    "translations": {
      "it": "${org.name}: il codice di verifica è ${code}",
      "fr": "${org.name}: votre code de vérification est ${code}",
      "es": "${org.name}: el código de verificación es ${code}"
    }
  }
]
~~~

#### List Sms Templates with Type
{:.api .api-operation}

Enumerates all sms templates of particular type.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${org}.okta.com/api/v1/templates/sms?templateType=SMS_ENROLLMENT_CODE"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
[
  {
    "id": "cstkdgSQOUacCuF750g3",
    "name": "Custom",
    "type": "SMS_ENROLLMENT_CODE",
    "template": "${org.name}: your enrollment code is ${code}",
    "created": "2016-06-23T17:41:07.000Z",
    "lastUpdated": "2016-06-23T17:41:07.000Z",
    "translations": {
      "it": "${org.name}: il codice di iscrizione è ${code}",
      "fr": "${org.name}: votre code d'inscription est ${code}",
      "es": "${org.name}: su código de inscripción es ${code}"
    }
  }
]
~~~

### Update Sms Template
{:.api .api-operation}

<span class="api-uri-template api-uri-put"><span class="api-label">PUT</span> /templates/sms/*:id*</span>

Updates the sms template.

> The default sms template cannot be updated

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                 | ParamType | DataType                            | Required | Default
--------- | ------------------------------------------- | --------- | ----------------------------------- | -------- | -------
id        | id of the sms template to update            | URL       | String                              | TRUE     |
          | full description of the custom sms template | Body      | [Sms Template](#sms-template-model) | TRUE     |

> All profile properties must be specified when updating a sms custom template, partial updates are described [here](#partial-sms-template-update).

##### Response Parameters
{:.api .api-response .api-response-params}

Updated [Sms Template](#sms-template-model)

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "name": "Custom",
    "type": "SMS_ENROLLMENT_CODE",
    "template": "${org.name}: your enrollment code is ${code}",
    "translations": {
      "it": "${org.name}: il codice di iscrizione è ${code}",
      "fr": "${org.name}: votre code d'inscription est ${code}",
      "es": "${org.name}: su código de inscripción es ${code}",
      "de": "${org.name}: ihre anmeldung code ist ${code}"
    }
}' "https://${org}.okta.com/api/v1/templates/sms/${templateId}"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "id": "cstkdgSQOUacCuF750g3",
  "name": "Custom",
  "type": "SMS_ENROLLMENT_CODE",
  "template": "${org.name}: your enrollment code is ${code}",
  "created": "2016-06-23T17:41:07.000Z",
  "lastUpdated": "2016-06-23T17:47:06.000Z"
}
~~~


### Partial Sms Template Update
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST</span> /templates/sms/*:id*</span>

Updates anly some of sms template attributes. All the attributes with of the custom sms template with values will be updated.
Any translation that does not exists will be added. Any translation with null/empty value will be removed. Any translation with non empty/null value will be updated.

> The default sms template cannot be updated

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                 | ParamType | DataType                            | Required | Default
--------- | ------------------------------------------- | --------- | ----------------------------------- | -------- | -------
id        | id of the sms template to update            | URL       | String                              | TRUE     |
          | attributes that we want to change           | Body      | [Sms Template](#sms-template-model) | TRUE     |

> Full sms template update is described [here](update-sms-template).

##### Response Parameters
{:.api .api-response .api-response-params}

Updated [Sms Template](#sms-template-model)

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
   "translations":
   {
      "de" : "${org.name}: ihre bestätigungscode ist ${code}."
   }
}' "https://${org}.okta.com/api/v1/templates/sms/${templateId}"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "id": "cstkd89Qu2ypkxNQv0g3",
  "name": "Custom",
  "type": "SMS_VERIFY_CODE",
  "template": "${org.name}: your verification code is ${code}",
  "created": "2016-06-23T17:20:22.000Z",
  "lastUpdated": "2016-06-23T17:58:10.000Z",
  "translations": {
    "de": "${org.name}: ihre bestätigungscode ist ${code}.",
    "it": "${org.name}: il codice di verifica è ${code}",
    "fr": "${org.name}: votre code de vérification est ${code}",
    "es": "${org.name}: el código de verificación es ${code}"
  }
}
~~~

### Remove Sms Template
{:.api .api-operation}

<span class="api-uri-template api-uri-delete"><span class="api-label">DELETE</span> /templates/sms/*:id*</span>

Removes a sms template.

> The default sms template cannot be removed.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                        | ParamType | DataType | Required | Default
--------- | ---------------------------------- | --------- | -------- | -------- | -------
id        | `id` of the sms template to delete | URL       | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

N/A

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${org}.okta.com/api/v1/templates/sms/${templateId}"
~~~


##### Response Example
{:.api .api-response .api-response-example}

~~~http
HTTP/1.1 204 No Content
~~~
