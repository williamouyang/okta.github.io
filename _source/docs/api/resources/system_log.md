---
layout: docs_page
title: System Log
---

## Overview

The Okta System Log API provides read access to your organization's system log. This API provides more functionality than the Events API.

Use this API to export event data as a batch job from your organization to another system for reporting or analysis.

## Log Model

Every organization has a system log that maintains a history of actions performed by users.  The Log model describes a single action performed by a set of actors for a set of targets.

### Example

~~~ json
{
"eventId": Randomly generated String, Required //note, not uuid as in underlying
"published": ISO8601 string for timestamp, Required //note, published, not timestamp as in underlying
"eventType": String, Required
"version": String, Required
"severity": String, one of DEBUG, INFO, WARN, ERROR, Required
"legacyEventType": String, Optional
"displayMessage": String, Optional
"actor": { Object, Required
     "id": String, Required
     "type": String, Required
     "alternateId": String, Optional
     "displayName": String, Optional
     "detailEntry" = {
     String -> String/Resource Map
     }
},
"client": { Object, Optional
     "userAgent": { Object, Optional
          "rawUserAgent": String, Optional
          "os": String, Optional
          "browser": String, Optional
     },
     "geographicalContext": { Object, Optional
          "geolocation": { Object, Optional
               "lat":Double, Optional
               "lon": Double, Optional
          }
     },
     "zone": String, Optional
     "ipAddress": String, Optional
     "device": String, Optional
     "id": String, Optional
     },
      
     "outcome": { Object, Optional
          "result": String, one of: SUCCESS, FAILURE, SKIPPED, UNKNOWN, Required
          "reason": String, Optional
     },
     "target": [ List of Objects of the form:
          {
               "id": String, Required
               "type": String, Required
               "alternateId": String, Optional
               "displayName": String, Optional
               "detailEntry" = {
               String -> String/Resource Map
          }
     }
     ],
     "transaction": { Object, Optional
          "id": String, Optional
          "type": String one of "WEB", "JOB", Optional
          "detail" = {
               String -> String/Resource Map
          }
     },
     "debugContext": { Object, Optional
          "debugData": {
               String -> String/Resource Map
               "requestUri": "/api/1/devtools/global/test/orgs/specific"
               "originalPrincipal": {
                    "id": "00ujchcbjpltartYI0g3",
                    "type": "User",
                    "alternateId": "admin@saasure.com",
                    "displayName": "Piras Add-min"
               },
          }
     },
     "authenticationContext": { Object, Optional
          "authenticationProvider": String one of OKTA_AUTHENTICATION_PROVIDER, ACTIVE_DIRECTORY, LDAP, FEDERATION, 
            SOCIAL, FACTOR_PROVIDER, Optional
          "credentialProvider": String one of OKTA_CREDENTIAL_PROVIDER, RSA, SYMANTEC, GOOGLE, DUO, YUBIKEY, Optional
          "credentialType": String one of OTP, SMS, PASSWORD, ASSERTION, IWA, EMAIL, Optional
          "issuer": Object, Optional {
               "id": String, Optional
               "type": String Optional
          }
          "externalSessionId": String, Optional
          "interface": String, Optional i.e. Outlook, Office365, wsTrust
          }
     }
}
~~~

### Attributes

The Log model is read-only. The following properties are available:
TODO: Verify if these are the properties of Log. Log is an object, right? Or is it just a new endpoint for Event object?

|-----------+-----------------------------------------------------------------------+----------------------------------------------------------------+----------+--------+----------+-----------+-----------+------------|
| Property  | Description                                                           | DataType                                                       | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| -------   | --------------------------------------------------------------------- | ---------------------------------------------------------------| -------- | ------ | -------- | --------- | --------- | ---------- |
| eventId   | Unique key for event                                                  | String                                                         | FALSE    | TRUE   | TRUE     |           |           |            |
| published | Timestamp when event was published                                    | Date                                                           | FALSE    | TRUE   | TRUE     | 1         | 255       |            |
| requestId | Identifies the request                                                | String                                                         | TRUE     | FALSE  | TRUE     | 1         | 50        |            |
| sessionId | Session in which the event occurred                                   | String                                                         | TRUE     | FALSE  | TRUE     |           |           |            |
| action    | Identifies the action that the event describes                        | [Action Object](#action-object)                                | FALSE    | FALSE  | TRUE     |           |           |            |
| actors    | Describes zero or more entities that performed the action             | Array of [Actor Object](#actor-object)                         | FALSE    | FALSE  | TRUE     |           |           |            |
| targets   | Describes zero or more entities that the action was performed against | Array of [Target Object](#target-object)                       | TRUE     | FALSE  | TRUE     |           |           |            |
| _links    | discoverable resources related to the event                           | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |           |           |            |
| _embedded | embedded resources related to the event                               | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |           |           |            |
|-----------+-----------------------------------------------------------------------+----------------------------------------------------------------+----------+--------+----------+-----------+-----------+------------|

> The actor and/or target of an event is dependent on the action performed. Not all events have an actor or target.

> The `sessionId` can identify multiple requests.  A single `requestId` can identify multiple events.  Use the `sessionId` to link events and requests that occurred in the same session.

### Action Object

Describes an activity that published an event.

|------------+----------------------------------------------------------------+-----------------+----------+---------+-----------+-----------+------------|
| Property   | Description                                                    | DataType        | Nullable | Default | MinLength | MaxLength | Validation |
| ---------- | -------------------------------------------------------------- | --------------- | -------- | ------- | --------- | --------- | ---------- |
| message    | Description of an action                                       | String          | FALSE    |         |           |           |            |
| categories | [Categories](#action-categories) for an action                 | Array of String | FALSE    |         |           |           |            |
| objectType | Identifies the [unique type](#action-objecttypes) of an action | String          | FALSE    |         |           |           |            |
| requestUri | Uri of the request that generated the event.                   | String          | TRUE     |         |           |           |            |  
|------------+----------------------------------------------------------------+-----------------+----------+---------+-----------+-----------+------------|

> Actions that do not define any categories have a zero element array value.

~~~  json
{
    "message": "User performed single sign on to app",
    "categories": [
        "Application Access"
    ],
    "objectType": "app.auth.sso",
    "requestUri": "/app/salesforce/kdx9PWYBPEOBAUNVRBHK/sso/saml"
}
~~~

#### Action Categories

TODO: Validate all new categories, map them to old categories. May want to structure this differently when you add descriptions.
Map of old to new is in REQ for each here: https://oktawiki.atlassian.net/wiki/display/PM/CEF+Event+Migrations
TODO: Add the events listed in each link. I did one as an example. But if we want mapping, should probably be a table. Not all lists have descriptions.

* AD Events
    * https://oktawiki.atlassian.net/wiki/pages/viewpage.action?pageId=98435389
* API Errors
    * TODO: Where is the source for this? Not listed in https://oktawiki.atlassian.net/wiki/display/PM/CEF+Event+Migrations
* API Token Events
    * https://oktawiki.atlassian.net/wiki/display/PM/Migrate+API+Token+Events
* App Lifecycle Events
    * https://oktawiki.atlassian.net/wiki/display/PM/Migrate+App+Lifecycle+and+Config+Events
* App Sign-on Policy Events
    * https://oktawiki.atlassian.net/wiki/display/PM/App+Sign+On+Policy+Event+Migration
* Application User Membership
    * https://oktawiki.atlassian.net/wiki/display/PM/Application+User+Membership+Event+Migration
* Application User Provisioning
    * https://oktawiki.atlassian.net/wiki/display/PM/Application+User+Provisioning+Event+Migration
* Authentication Events
    * https://oktawiki.atlassian.net/wiki/display/PM/Authentication+Event+Migration
* Connector Agent Events
    * https://oktainc.atlassian.net/browse/REQ-4022
* CPC
    * https://oktawiki.atlassian.net/wiki/display/PM/Migrate+CPC+Events
* Directory
    * https://oktawiki.atlassian.net/wiki/display/PM/Directory+Event+Migration
* Group
    * https://oktawiki.atlassian.net/wiki/display/PM/Migrate+Group+Related+Events
* Impersonation
    * user.session.impersonation.end	
    * user.session.impersonation.extend	
    * user.session.impersonation.grant
    * user.session.impersonation.initiate
    * user.session.impersonation.revoke
* IWA
    * https://oktawiki.atlassian.net/wiki/display/PM/IWA+Event+Migration
* LDAP Agent Events
    * https://oktawiki.atlassian.net/wiki/display/PM/LDAP+Agent+Event+Migration
* MFA
    * https://oktawiki.atlassian.net/wiki/display/PM/MFA+Event+Migration
* Okta User
* Policy
    * https://oktawiki.atlassian.net/wiki/display/PM/Migrate+Policy+Events
* SMS
    * https://oktawiki.atlassian.net/wiki/display/PM/SMS+Event+Migration
* SSO and SLO
    * https://oktawiki.atlassian.net/wiki/display/PM/SSO+and+SLO+event+migration
* System Email
    * https://oktawiki.atlassian.net/wiki/display/PM/Migrate+System+Email+Events
* System Import
    * https://oktawiki.atlassian.net/wiki/display/PM/System+Import+Event+Migration
* User
    * https://oktawiki.atlassian.net/wiki/pages/viewpage.action?pageId=98435443 (overlap with lifecycle events? session?)
* User Lifecycle
    * https://oktawiki.atlassian.net/wiki/display/PM/User+Lifecycle+Event+Migration
* User Session
    * https://oktawiki.atlassian.net/wiki/pages/viewpage.action?pageId=99583508 (???)

TODO Delete OLD CATEGORIES?
 
 Categories for an action:

* Application Assignment
* Application Access
* Active Directory Agent
* User Creation
* User Activation
* User Deactivation
* User Locked Out
* Sign-in Failure
* Sign-in Success
* Suspicious Activity
* Application Imports (Summary)
* Application Imports (Detailed)
* SMS Messages

> Additional categories may be added in the future without versioning.

TODO: Delete the old events?
#### Action ObjectTypes

Action `objectType` identifies the unique action performed.

TODO: Add all new object types and descriptions. This is the old list. 

##### Application Authentication

ObjectType | Description
--- | ---
app.auth.sso | Event occurred during single sign on
app.auth.delegated.outbound | Event occurred during outbound delegated authentication

##### Application User Management

ObjectType | Description
--- | ---
app.user_management.push_password_update | Update user's password in application
app.user_management.push_profile_success | Successfully created or updated user's profile in application
app.user_management.push_profile_failure | Failed to create or update user's profile in application
app.user_management.push_new_user | Create new user in application
app.user_management.push_pending_user | Queue update of user for application
app.user_management.provision_user | Created or updated user from application
app.user_management.provision_user_failed | Failed to create or update user from application
app.user_management.importing_profile | Create or update user's profile from application
app.user_management.update_from_master_failed | Failed to master user's profile from application
app.user_management.verified_user_with_thirdparty | Verified user against application
app.user_management.updating_api_credentials_for_password_change | Updating API credentials due to  API admin user password change
app.user_management.activate_user | Activate user in application
app.user_management.deactivate_user | Deactivate user in application
app.user_management.reactivate_user | Reactivate user in application
app.user_management.provision_user.user_inactive | Attempt to provision a user to an inactive account, and cannot reactivate
app.user_management.deactivate_user.api_account | Deactivate API user in application
app.user_management.deprovision_task_complete | Deprovisioning task has been marked complete (automatically or manually)

##### Application Group Management

ObjectType | Description
--- | ---
app.user_management.user_group_import.upsert_success | Successfully created or updated group from application
app.user_management.user_group_import.delete_success | Successfully removed imported group that was deleted from application
app.user_management.app_group_member_import.insert_success | Update group memmbership  an AppGroupUserMember from an import succeeded
app.user_management.app_group_member_import.delete_success | Deleting an AppGroupUserMember from an import succeeded
app.user_management.app_group_group_member_import.insert_success |  Upserting an ResolvedAppGroupMember from an import succeeded
app.user_management.app_group_group_member_import.delete_success | Deleting an ResolvedAppGroupMember from an import succeeded
app.user_management.grouppush.mapping.created.from.rule |  A new mapping has been created from a rule
app.user_management.grouppush.mapping.created.from.rule.error.duplicate | A new mapping from a rule was attempted to be created, but it turned out to be a dupe
app.user_management.grouppush.mapping.created.from.rule.warning.duplicate.name | A new mapping from a rule was not created due to a duplicate group name
app.user_management.grouppush.mapping.created.from.rule.warning.duplicate.name.tobecreated | A new mapping from a rule was not created due to another mapping will be created that has the same user group name
app.user_management.grouppush.mapping.created.from.rule.warning.upsertGroup.duplicate.name | Create or update of source group triggered mapping rule re-evaluation preventing a new application group mapping due to a duplicate group name
app.user_management.grouppush.mapping.created.from.rule.error.validation | Failed to create new application group mapping due to a validation error
app.user_management.grouppush.mapping.created.from.rule.errors | Failed to create new application group mapping due to an error
app.user_management.grouppush.mapping.deactivated.source.group.renamed | Successfully deactivate target application group when source group was renamed
app.user_management.grouppush.mapping.deactivated.source.group.renamed.failed | Failed to deactivate target application group when source group was renamed
app.user_management.grouppush.mapping.app.group.renamed | Successfully renamed target application group when source group was renamed
app.user_management.grouppush.mapping.app.group.renamed.failed | Failed to rename target application group when source group was renamed
app.user_management.grouppush.mapping.and.groups.deleted.rule.deleted | An existing mapping and its target groups have been deleted because a mapping rule was deleted
{:.table .table-word-break}

##### Delegated Authentication

ObjectType | Description
--- | ---
app.inbound_del_auth.failure.not_supported | Application doesn't support delauth
app.inbound_del_auth.failure.instance_not_found | Couldn't find delauth app instance
app.inbound_del_auth.failure.invalid_request.could_not_parse_credentials | Couldn't parse credentials in delauth request
app.inbound_del_auth.failure.account_not_found | Inbound delauth account not found
app.inbound_del_auth.failure.invalid_login_credentials | Inbound delauth, invalid login credentials
app.inbound_del_auth.login_success | Successful delauth login

##### Rich Client Authentication

ObjectType | Description
--- | ---
app.rich_client.instance_not_found |
app.rich_client.account_not_found |
app.rich_client.multiple_accounts_found |
app.rich_client.login_failure |
app.rich_client.login_success |

##### Admin Appplication

ObjectType | Description
--- | ---
app.admin.sso.no_response |
app.admin.sso.bad_response |
app.admin.sso.orgapp.notfound |

##### Applications

ObjectType | Description
--- | ---
app.generic.provision.assign_user_to_app | Assign external user to internal Okta user
app.generic.provision.deactivate_user_from_app | Deactivate external user to internal Okta user
app.generic.config.app_activated | Application has been activated
app.generic.config.app_deactivated | Application has been deactivated
app.generic.import.provisioning_data | Imported data used for provisioning
app.generic.import.import_user | Started user import
app.generic.config.app_updated | Application config has been updated
app.generic.import.new_user | Application has imported a new user
app.generic.import.user_update | Application has updated an exsiting user
app.generic.config.app_username_update | User credentials for an application have been updated
app.generic.config.app_password_update | User credentials for an application have been updated
app.generic.import.user_delete | Application has deleted user
app.generic.import.started |
app.generic.import.complete |
app.generic.import.user_match.complete |
app.generic.import.details.add_custom_object |
app.generic.import.details.update_custom_object |
app.generic.import.details.delete_custom_object |
app.generic.import.details.add_user |
app.generic.import.details.update_user |
app.generic.import.details.delete_user |
app.generic.import.details.add_group |
app.generic.import.details.update_group |
app.generic.import.details.delete_group |
app.generic.import.summary.custom_object |
app.generic.import.summary.user |
app.generic.import.summary.group |
app.generic.import.summary.group_membership |

##### Credential Recovery

ObjectType | Description
--- | ---
app.generic.reversibility.credentials.recover |
app.generic.reversibility.personal.app.recovery |
app.generic.reversibility.individual.app.recovery |

##### Application Instance

ObjectType | Description
--- | ---
app.app_instance.change |
app.app_instance.logo_update |
app.app_instance.logo_reset |
app.app_instance.outbound_delauth_enabled |
app.app_instance.outbound_delauth_disabled |
app.app_instance.config-error |

##### User Authentication

ObjectType | Description
--- | ---
core.user_auth.login_failed |
core.user_auth.login_success |
core.user_auth.logout_success |
core.user_auth.account_locked |
core.user_auth.session_expired |
core.user_auth.mfa_bypass_attempted |

##### User MFA Authentication

ObjectType | Description
--- | ---
core.user.sms.message_sent.factor |
core.user.sms.message_sent.verify |
core.user.sms.message_sent.forgotpw |

##### User RADIUS Authentication

ObjectType | Description
--- | ---
core.user_auth.radius.login.succeeded |
core.user_auth.radius.login.failed |

##### User Status

ObjectType | Description
--- | ---
core.user.config.password_update.success |
core.user.config.password_update.failure |
core.user.config.user_activated |
core.user.config.user_deactivated" |
core.user.config.user_status.password_reset |
core.user.config.user_creation.success |
core.user.config.user_creation.failure |

##### User Impersonation

ObjectType | Description
----------------------------------------- | ---
core.user.impersonation.session.initiated |
core.user.impersonation.session.ended |
core.user.impersonation.grant.enabled |
core.user.impersonation.grant.extended |
core.user.impersonation.grant.revoked |

##### User Administrator Roles

ObjectType                        | Description
--------------------------------- | ---
core.user.admin_privilege.granted |
core.user.admin_privilege.revoked |

TODO: Validate all objects should be in this topic.

### Actor Object

Actor of an event

|-------------+----------------------------------------------------------+----------+----------+---------+-----------+-----------+------------|
| Property    | Description                                              | DataType | Nullable | Default | MinLength | MaxLength | Validation |
| ----------- | ---------------------------------------------------------| -------- | -------- | ------- | --------- | --------- | ---------- |
| id          | Unique key for actor                                     | String   | FALSE    |         |           |           |            |
| displayName | Name of actor used for display purposes                  | String   | TRUE     |         |           |           |            |
| objectType  | [User](#user-objecttype) or [Client](#client-objecttype) | String   | FALSE    |         |           |           |            |
|-------------+----------------------------------------------------------+----------+----------+---------+-----------+-----------+------------|

> The schema of an actor is dependent on the actor's `objectType`.

### Target Object

Target of an event

|-------------+--------------------------------------------------------------------+----------+----------+---------+-----------+-----------+------------|
| Property    | Description                                                        | DataType | Nullable | Default | MinLength | MaxLength | Validation |
| ----------- | ------------------------------------------------------------------ | -------- | -------- | ------- | --------- | --------- | ---------- |
| id          | Unique key for target                                              | String   | FALSE    |         |           |           |            |
| displayName | Name of target used for display purposes                           | String   | TRUE     |         |           |           |            |
| objectType  | [User](#user-objecttype) or [AppInstance](#appinstance-objecttype) | String   | FALSE    |         |           |           |            |
|-------------+--------------------------------------------------------------------+----------+----------+---------+-----------+-----------+------------|

> The schema of a target is dependent on the actor's `objectType`.

### Actor/Target ObjectTypes

#### User ObjectType

A denormalized reference to a [User](users.html#user-model).

|-------------+---------------------------------------------------------+----------+----------+---------+-----------+-----------+------------|
| Property    | Description                                             | DataType | Nullable | Default | MinLength | MaxLength | Validation |
| ----------- | ------------------------------------------------------- | -------- | -------- | ------- | --------- | --------- | ---------- |
| id          | Unique key for [user](users.html#user-model)            | String   | FALSE    |         |           |           |            |
| displayName | [User's](users.html#profile-object) first and last name | String   | TRUE     |         |           |           |            |
| login       | Unique login for [user](users.html#user-model)          | String   | TRUE     |         |           |           |            |
| objectType  | Type of object                                          | `User`   | FALSE    |         |           |           |            |
|-------------+---------------------------------------------------------+----------+----------+---------+-----------+-----------+------------|

~~~ json
{
    "id": "00u3gjksoiRGRAZHLSYV",
    "displayName": "Jon Stewart",
    "login": "jon@example.com",
    "objectType": "User"
}
~~~

> The user can be retrieved by `id` with the [User API](users.html#get-user-with-id).

#### AppInstance ObjectType

A denormalized reference to an application

|-------------+-------------------------------------------+---------------+----------+---------+-----------+-----------|
| Property    | Description                               | DataType      | Nullable | Default | MinLength | MaxLength |
| ----------- | ----------------------------------------- | ------------- | -------- | ------- | --------- | --------- |
| id          | Unique key for [app](apps.html#application-model) | String        | FALSE    |         |           |           |
| displayName | [App's](apps.html#application-model) label | String        | TRUE     |         |           |           |
| objectType  | Type of object                            | `AppInstance` | FALSE    |         |           |           |
|-------------+-------------------------------------------+---------------+----------+---------+-----------+-----------|

~~~ json
{
    "id": "0oab5cZEHFHXHGRNRRNL",
    "displayName": "Zendesk",
    "objectType": "AppInstance"
}
~~~

> The app can be retrieved by `id` with the [Apps API](apps.html#get-application).

#### Client ObjectType

A denormalized reference to a client such as a browser.

|-------------+-----------------------+----------+----------+---------+-----------+-----------|
| Property    | Description           | DataType | Nullable | Default | MinLength | MaxLength |
| ----------- | --------------------- | ---------| -------- | ------- | --------- | --------- |
| id          | User agent of client  | String   | FALSE    |         |           |           |
| displayName | Name of client        | String   | TRUE     |         |           |           |
| ipAddress   | IP Address of client  | String   | TRUE     |         |           |           |
| objectType  | Type of object        | `Client` | FALSE    |         |           |           |
|-------------+---------------------  +----------+----------+---------+-----------+-----------|

~~~ json
{
    "id": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.65 Safari/537.36",
    "displayName": "CHROME",
    "ipAddress": "127.0.0.1",
    "objectType": "Client"
}
~~~

## Event Operations

### List Events
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET</span> /api/v1/logs</span>

Fetch a list of events from your Okta organization system log.

##### Request Parameters
{:.api .api-request .api-request-params}
TODO: This is from the Design Doc Syslog2 API spec. Should be validated. Do we need to put any caveats on
the content linked to in "filter"? I left filter in even though the spec doesn't have it because of conversations
in related docs. Notes after the parameter may not be true.

Parameter | Description                                                                         | Param Type | DataType | Required | Default
--------- | ----------------------------------------------------------------------------------- | ---------- | -------- | -------- | -------
limit     | Specifies the number of results to page                                             | Query      | Number   | FALSE    | 1000
since     | Specifies the last date before the oldest result is returned                        | Query      | DateTime | FALSE    |
filter    | [Filter expression](/docs/api/getting_started/design_principles.html#filtering) for events | Query      | String   | FALSE    |
q         | Finds a user that matches firstName, lastName, and email properties                 | Query      | String   | FALSE    |
until     | Specifies the first date after which results aren't returned                        | Query      | DateTime   | FALSE    |
from      | An opaque identifier used for pagination                                            | Query      |            | FALSE

TODO: What does the description of "from" mean?

> The `until` cursor should treated as an opaque value and obtained through the next link relation. See [Pagination](/docs/api/getting_started/design_principles.html#pagination)

> `since` and `filter` query parameters are mutually exclusive and cannot be used together in the same request.

###### Filter

TODO: Verify examples in table and example section are all correct. Links to action still make sense?
The following expressions are supported for events with the `filter` query parameter:

Filter                                       | Description
-------------------------------------------- | ------------------------------------------------------------------------------
`action.objectType eq ":actionType"`         | Events that have a specific [action objectType](#action-objecttypes)
`target.objectType eq ":objectType"`         | Events published with a specific [target objectType](#actortarget-objecttypes)
`target.id eq ":id"`                         | Events published with a specific target id
`published lt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`  | Events published before a specific datetime
`published eq "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`  | Events published updated at a specific datetime
`published gt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`  | Events published updated after a specific datetime

See [Filtering](/docs/getting_started/design_principles.html#filtering) for more information on expressions
TODO: this section doesn't explain q, only the section in Users does. We need to expand the getting started section I think to include this.

> All filters must be [URL encoded](http://en.wikipedia.org/wiki/Percent-encoding) where `filter=published gt "2013-06-01T00:00:00.000Z"` is encoded as `filter=published%20gt%20%222013-06-01T00:00:00.000Z%22`

**Filter Examples**

TODO: Add examples for the other parameters. Validate that these are all still good.
Events published after 06/01/2013

    filter=published gt "2013-06-01T00:00:00.000Z"

Events published for a target user

    filter=target.id eq "00uxc78lMKUMVIHLTAXY"

Failed login events published after 06/01/2013

    filter=published gt "2013-06-01T00:00:00.000Z" and action.objectType eq "core.user_auth.login_failed"

Events published after 06/01/2013 for a target user and application

    filter=published gt "2013-06-01T00:00:00.000Z" and target.id eq "00uxc78lMKUMVIHLTAXY" and target.id eq "0oabe82gnXOFVCDUMVAK"

App SSO events for a target user and application

    filter=action.objectType eq "app.auth.sso" and target.id eq "00uxc78lMKUMVIHLTAXY" and target.id eq "0oabe82gnXOFVCDUMVAK"


##### Response Parameters
{:.api .api-response .api-response-params}

Array of [Log object](#log-model)

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
TODO: Need new Example
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~http
TODO: Need new example
~~~
