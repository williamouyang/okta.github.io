---
layout: docs_page
title: Templates
redirect_from: "/docs/api/rest/templates.html"
---

# Custom Templates API

The Okta Templates API provides operations to manage custom templates. 

> Currently, only the SMS custom templates are implemented.

SMS templates customize the SMS message sent to users. One default SMS template is provided. All custom templates must have the variable **${code}** as part of the text. The **${code}** variable is replaced with the actual SMS code when the message is sent. Optionally, you can use the variable **${org.name}**. If a template contains **${org.name}**, it is replaced with organization name before the SMS message is sent.

## Getting Started with Custom Templates

Explore the Custom Templates API: 

<div class="postman-run-button"
data-postman-action="collection/import"
data-postman-var-1="39f1fa6662309121c81a"
data-postman-param="env%5Bexample.okta.com%5D=W3siZW5hYmxlZCI6dHJ1ZSwia2V5IjoidXJsIiwibmFtZSI6InVybCIsInR5cGUiOiJ0ZXh0IiwidmFsdWUiOiJodHRwczovL2V4YW1wbGUub2t0YS5jb20ifSx7ImVuYWJsZWQiOnRydWUsImtleSI6ImFwaWtleSIsIm5hbWUiOiJhcGlrZXkiLCJ0eXBlIjoidGV4dCIsInZhbHVlIjoiIn0seyJlbmFibGVkIjp0cnVlLCJrZXkiOiJlbWFpbC1zdWZmaXgiLCJuYW1lIjoiZW1haWwtc3VmZml4IiwidHlwZSI6InRleHQiLCJ2YWx1ZSI6ImV4YW1wbGUuY29tIn0seyJlbmFibGVkIjp0cnVlLCJrZXkiOiJzdWJkb21haW4iLCJuYW1lIjoic3ViZG9tYWluIiwidHlwZSI6InRleHQiLCJ2YWx1ZSI6ImV4YW1wbGUifSx7ImVuYWJsZWQiOnRydWUsImtleSI6InVzZXJuYW1lIiwibmFtZSI6InVzZXJuYW1lIiwidHlwZSI6InRleHQiLCJ2YWx1ZSI6InVzZXJAZXhhbXBsZS5jb20ifSx7ImVuYWJsZWQiOnRydWUsImtleSI6InBhc3N3b3JkIiwibmFtZSI6InBhc3N3b3JkIiwidHlwZSI6InRleHQiLCJ2YWx1ZSI6IiJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoidXNlcklkIiwibmFtZSI6InVzZXJJZCIsInR5cGUiOiJ0ZXh0IiwidmFsdWUiOiIifSx7ImVuYWJsZWQiOnRydWUsImtleSI6Imdyb3VwSWQiLCJuYW1lIjoiZ3JvdXBJZCIsInR5cGUiOiJ0ZXh0IiwidmFsdWUiOiIifSx7ImVuYWJsZWQiOnRydWUsImtleSI6ImFwcElkIiwibmFtZSI6ImFwcElkIiwidHlwZSI6InRleHQiLCJ2YWx1ZSI6IiJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5Ijoic2Vzc2lvbklkIiwibmFtZSI6InNlc3Npb25JZCIsInR5cGUiOiJ0ZXh0IiwidmFsdWUiOiIifSx7ImVuYWJsZWQiOnRydWUsImtleSI6InRydXN0SWQiLCJuYW1lIjoidHJ1c3RJZCIsInR5cGUiOiJ0ZXh0IiwidmFsdWUiOiIifSx7ImVuYWJsZWQiOnRydWUsImtleSI6ImZhY3RvcklkIiwibmFtZSI6ImZhY3RvcklkIiwidHlwZSI6InRleHQiLCJ2YWx1ZSI6IiJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5Ijoic3RhdGVUb2tlbiIsIm5hbWUiOiJzdGF0ZVRva2VuIiwidHlwZSI6InRleHQiLCJ2YWx1ZSI6IiJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoicmVjb3ZlcnlUb2tlbiIsIm5hbWUiOiJyZWNvdmVyeVRva2VuIiwidHlwZSI6InRleHQiLCJ2YWx1ZSI6IiJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoicG9saWN5SWQiLCJuYW1lIjoicG9saWN5SWQiLCJ0eXBlIjoidGV4dCIsInZhbHVlIjoiIn0seyJlbmFibGVkIjp0cnVlLCJrZXkiOiJydWxlSWQiLCJuYW1lIjoicnVsZUlkIiwidHlwZSI6InRleHQiLCJ2YWx1ZSI6IiJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5Ijoic2Vzc2lvblRva2VuIiwibmFtZSI6InNlc3Npb25Ub2tlbiIsInR5cGUiOiJ0ZXh0IiwidmFsdWUiOiIifSx7ImVuYWJsZWQiOnRydWUsImtleSI6InJlbGF5U3RhdGUiLCJuYW1lIjoicmVsYXlTdGF0ZSIsInR5cGUiOiJ0ZXh0IiwidmFsdWUiOiIifSx7ImVuYWJsZWQiOnRydWUsImtleSI6ImRldmljZVRva2VuIiwibmFtZSI6ImRldmljZVRva2VuIiwidHlwZSI6InRleHQiLCJ2YWx1ZSI6IiJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoiYXBwTmFtZSIsIm5hbWUiOiJhcHBOYW1lIiwidHlwZSI6InRleHQiLCJ2YWx1ZSI6ImFtYXpvbl9hd3MifSx7ImVuYWJsZWQiOnRydWUsImtleSI6ImlkcElkIiwibmFtZSI6ImlkcElkIiwidHlwZSI6InRleHQiLCJ2YWx1ZSI6IiJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5Ijoicm9sZUlkIiwibmFtZSI6InJvbGVJZCIsInR5cGUiOiJ0ZXh0IiwidmFsdWUiOiIifSx7ImVuYWJsZWQiOnRydWUsImtleSI6InJlZGlyZWN0VXJsIiwibmFtZSI6InJlZGlyZWN0VXJsIiwidHlwZSI6InRleHQiLCJ2YWx1ZSI6IiJ9XQ=="></div>
<script type="text/javascript">
  (function (p,o,s,t,m,a,n) {
    !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
    !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
      (n = o.createElement("script")),
      (n.id = s+t), (n.async = 1), (n.src = m), n
    ));
  }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
</script>

## Template Operations

### Add SMS Template
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST</span> /templates/sms</span>

Adds a new custom SMS template to your organization.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                               | ParamType | DataType                          | Required | Default
--------- | ----------------------------------------- | --------- | --------------------------------- | -------- | ---
          | Definition of the new custom SMS template | Body      | (#template-object)                | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

The created [SMS Template](#sms-template-model).

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


### Get SMS Template
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET</span> /templates/sms/*:id*</span>

Fetches a specific template by `id`

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter |    Description     | ParamType | DataType | Required | Default
--------- | ------------------ | --------- | -------- | -------- | -------
id        | `id` of a template | URL       | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

Fetched [SMS Template](#sms-template-model)

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

### List SMS Templates
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET</span> /templates/sms</span>

Enumerates custom SMS templates in your organization. A subset of templates can be returned that match a template type.

- [List SMS Templates with Defaults](#list-sms-templates-with-defaults)
- [List SMS Templates with Type](#list-sms-templates-with-type)

##### Request Parameters
{:.api .api-request .api-request-params}

 Parameter     | Description                                                                                | ParamType | DataType | Required | Default
-------------- | ------------------------------------------------------------------------------------------ | --------- | -------- | -------- | ----------------
 templateType  | Searches the `type` property of templates for matching value                               | Query     | String   | FALSE    |

> Search currently performs an exact match of the type but this is an implementation detail and may change without notice in the future.

##### Response Parameters
{:.api .api-response .api-response-params}

Array of [SMS Template](#sms-template-model)

#### List SMS Templates with Defaults
{:.api .api-operation}

Enumerates all SMS templates.

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

#### List SMS Templates with Type
{:.api .api-operation}

Enumerates all SMS templates of particular type

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

### Update SMS Template
{:.api .api-operation}

<span class="api-uri-template api-uri-put"><span class="api-label">PUT</span> /templates/sms/*:id*</span>

Updates the SMS template.

> The default SMS template can't be updated.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                 | ParamType | DataType                            | Required | Default
--------- | ------------------------------------------- | --------- | ----------------------------------- | -------- | -------
id        | id of the sms template to update            | URL       | String                              | TRUE     |
          | full description of the custom sms template | Body      | [Sms Template](#sms-template-model) | TRUE     |

> All profile properties must be specified when updating an SMS custom template. Partial updates are described [here](#partial-sms-template-update).

##### Response Parameters
{:.api .api-response .api-response-params}

Updated [SMS Template](#sms-template-model)

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

### Partial SMS Template Update
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST</span> /templates/sms/*:id*</span>

Updates only some of the SMS template properties:

* All properties with the custom SMS template with values are updated.
* Any translation that doesn't exist is added. 
* Any translation with a null or empty value is removed. 
* Any translation with non empty/null value is updated.

> The default SMS template can't be updated.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                                 | ParamType | DataType                            | Required | Default
--------- | ------------------------------------------- | --------- | ----------------------------------- | -------- | -------
id        | id of the sms template to update            | URL       | String                              | TRUE     |
          | attributes that we want to change           | Body      | [Sms Template](#sms-template-model) | TRUE     |

> Full SMS template update is described [here](#update-sms-template).

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

### Remove SMS Template
{:.api .api-operation}

<span class="api-uri-template api-uri-delete"><span class="api-label">DELETE</span> /templates/sms/*:id*</span>

Removes an SMS template.

> The default SMS template can't be removed.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description                        | ParamType | DataType | Required | Default
--------- | ---------------------------------- | --------- | -------- | -------- | -------
id        | `id` of the SMS template to delete | URL       | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

There is no content in the response.

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

## SMS Template Model

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

### SMS Template Attributes

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

### SMS Template Types

Select a fallback template based on the workflow.

|-------------------+--------------------------------------------------------------------------------------------------+
| Type              | Description                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| `SMS_VERIFY_CODE` | This template is used when the SMS for code verification is sent.                                |
|-------------------+--------------------------------------------------------------------------------------------------+


### SMS Template Translations

Template translations are optionally provided when we want to be able to localize the SMS messages. Translations are
provided in pairs: the language and translated template text.