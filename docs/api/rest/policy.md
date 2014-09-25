---
layout: docs_page
title: Policy
---

* Will be replaced with the ToC
{:toc .list-unstyled .toc}

# Overview

The Okta Policy API enables you to peform policy and rule operations. These operation apply to various policies including Okta Signon.

This API supports the following **policy operations**:

* Get all policies of a specific type
* Create, read, update, and delete a policy for an org
* Activate and deactivate a policy

This API supports the following **rule operations**:

* Get all rules for a policy
* Create, read, update, and delete a rule for a policy
* Activate and deactivate a rule
* Manage rules for the default policy

# Policies

## Policy Model and Defaults

### Default Policies

There is always a default policy created for each type for any users for whom other policies in the org do not apply. This ensures that there is always a policy to apply to a user in all situations. 

 - A default policy is required and cannot be deleted.

 - The default policy is always the last policy in the priority order. Any added policies of this type have higher priority than the default policy. 

 - The default policy always has one default rule that is required and always is the last rule in the priority order. If you add rules to the default policy, they have a higher priority than the default rule.

 - The only permitted edits to the default policy are settings edits. You can add an unlimited number of rules.

 - The `system` attribute determines whether a policy is created by a system or by a user. The default policy is the only policy that has this attribute.

### Policy Model

### Example

~~~ json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "type": "OKTA_SIGN_ON",
  "status": "ACTIVE",
  "name": "Policy Name",
  "description": "Description of this policy",
  "priorityOrder": 1,
  "system": false,
  "created": "2014-05-25T21:40:49.000Z",
  "lastUpdated": "2014-05-25T21:40:49.000Z",
  "conditions": {
    "people": {
      "groups": {
        "include": [
          "00geutPTXWYKIKWNOKUX"
        ],
      }
    }
  },
  "_links": {
    "self": {
      "href": "https://your-domain.com/api/v1/policies/00ub0oNGTSWTBKOLGLNR",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "deactivate": {
      "href": "https://your-domain.com/api/v1/policies/00ub0oNGTSWTBKOLGLNR/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "rules": {
      "href": "https://your-domain.com/api/v1/policies/00ub0oNGTSWTBKOLGLNR/rules",
      "hints": {
        "allow": [
          "GET",
          "POST"
        ]
      }
    }
  }
}
~~~

### Policy Object

The Policy model defines several attributes:

Parameter | Description | DataType | Required | Default
--------- | ----------- | -------- | -------- | ------- 
id | Identifier for the policy | String | No | Assigned 
type | Type for the policy | String | Yes | 
name | Name for the policy | String | Yes | 
description | Description for the policy | String | No | Null 
priorityOrder | Priority for the policy | Int | No | Last / Lowest Priority 
system | Whether or not the policy is the default | boolean | No | false 
status | Status of the policy: ACTIVE or INACTIVE | String | No | "ACTIVE" 
created | Timestamp when the policy was created | Date | No | Assigned 
lastUpdated | Timestamp when the policy was last modified | Date | No | Assigned

### People Object

The people condition identifies users and groups that are used together.

Parameter | Description | DataType | Required | Default
--------- | ----------- | -------- | -------- | ------- 
groups | The group condition | Group Condition | No | Include Everyone users | The user condition | User Condition | No | Empty

### Group Condition Object

Parameter | Description | DataType | Required | Default
--------- | ----------- | -------- | -------- | ------- 
include	| The groups to be included |	Collection of String	| No |	Everyone Group if exclude is empty
exclude	| The groups to be excluded	| Collection of String	| No	| Empty


### User Condition Object

Parameter | Description | DataType | Required | Default
--------- | ----------- | -------- | -------- | ------- 
include	| The users to be included	| Collection of String	| No	| Empty
exclude	| The users to be excluded	| Collection of String	| No	| Empty

### Links Object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current policy.  The Links Object is used for dynamic discovery of related resources.  The Links Object is **read-only**.

Specified link 

Link Relation Type     | Description
---------------------- | -----------
self	| The policy or rule
activate	| Action to activate a policy or rule
deactivate	| Action to deactivate a policy or rule
rules	| Rules objects for a policy only
policy	| Policy object for a rule only

## Policy Operations

### Get All Policies by Type
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET </span> /api/v1/policies</span>

#### Request Parameters

Parameter	| Description	| Param | Type	| DataType	| Required	| Default
| --- | --- | --- | ---
type	| Policy Type	| Query	| String	| Yes	
status	| Policy | Status	| Query	| String	| No	| Empty

#### Response Parameters

An array policies.

### Create a Policy
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST </span> /api/v1/policies</span>

Creates a new policy.

#### Request Parameters

Parameter | Description | Param | Type  | DataType  | Required  | Default
----------|-------------|-------|-------|-----------|-----------|--------
activate	| Policy Type	| Query	| Boolean	| No	| true

#### Request Body

A Policy object.

#### Response Parameters

The created policy.

### Get a Policy
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET </span> /api/v1/policies/{id}</span>

Gets an existing policy.

#### Request Parameters

Parameter | Description | Param | Type  | DataType  | Required  | Default
----------|-------------|-------|-------|-----------|-----------|--------
id	| Policy ID	| URL	| String	| YES	

#### Response Parameters

The policy.

### Update a Policy
{:.api .api-operation}

<span class="api-uri-template api-uri-put"><span class="api-label">PUT </span> /api/v1/policies/{id}</span>

Updates an existing policy.

#### Request Parameters

Parameter | Description | Param | Type  | DataType  | Required  | Default
| --- | --- | --- | ---
id  | Policy ID | URL | String  | YES 

### Request Body

The policy in a changed state. Note this will be a strict PUT. Any missing item is set to its default value. For example if `priorityOrder` is missing from the policy body, the item moves to the lowest priority order in the policy.

### Response Parameters

The updated policy.

### Delete Policy
{:.api .api-operation}

<span class="api-uri-template api-uri-delete"><span class="api-label">Delete </span> /api/v1/policies/{id}</span>

Deletes a policy and all rules associated with it.

#### Request Parameters

Parameter | Description |  Type  | DataType  | Required  | Default
----------|-------------|-------|-----------|-----------|--------
id	| Policy ID	| URL	| String	| YES	

### Response Parameters

None.

### Activate a Policy
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST </span>/api/v1/policies/{id}/lifecycle/activate</span>

Activates the specified policy.

#### Request Parameters

Parameter | Description |  Type  | DataType  | Required  | Default
----------|-------------|-------|-----------|-----------|--------
id	| Policy ID	| URL	| String	| YES	

### Response Parameters

None.

### Deactivate a Policy
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST </span>/api/v1/policies/{id}/lifecycle/deactivate</span>

Deactivates the specified policy.

#### Request Parameters

Parameter | Description |  Type  | DataType  | Required  | Default
----------|-------------|-------|-----------|-----------|--------
id  | Policy ID | URL | String  | YES 

### Response Parameters

None.

# Rules

## Rules Model and Defaults

### Default Rules

 - Only the default policy contains a default rule. The default rule cannot be edited or deleted.

 - The default rule is required and always is the last rule in the priority order. If you add rules to the default policy, they have a higher priority than the default rule.

 - The `system` attribute determines whether a rule is created by a system or by a user. The default rule is the only rule that has this attribute.

### Rule Model

~~~ json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "type": "SIGN_ON",
  "name": "Require MFA OffPrem",
  "status": "ACTIVE",
  "priorityOrder": 1,
  "system": false,
  "created": "2013-11-14T15:56:58.000Z",
  "lastUpdated": "2013-11-14T15:56:58.000Z",
  "conditions": {
    "people": {
      "users": {
        "exclude": ["00ub0oNGTSWTBKOLGLNRY"]
      }
    },
    "network": {
      "connection": "ON_NETWORK"
    },
    "authContext": {
      "authType": "RADIUS"
    }
  },
  "actions": {
    "signon": {
      "access": "ALLOW",
      "requireFactor": true,
      "factorPromptMode": "SESSION",
      "factorLifetime": 15
    }
  },
  "_links": {
    "self": {
      "href": "/api/v1/policies/00ub0oNGTSWTBKOLGLNR/rules",
      "hints": {
        "allow": ["GET", "POST"]
      }
    },
    "policy": {
      "href": "/api/v1/policies/00ub0oNGTSWTBKOLGLNR",
      "hints": {
        "allow": ["GET", "POST", "PUT", "DELETE"]
      }
    }
  }
}
~~~

### Conditions

Rule conditions include the people, user, and group conditions from the policy model in addition to:

**Network Condition Body**

Specifies a network segment.

Parameter |	Description	| DataType	|  Required	|  Default
----------|-------------|----------|-----------|-----------
connection	|  `ANYWHERE`, `ON_NETWORK`, or `OFF_NETWORK` | 	String	| No	|  Empty

**AuthContext Condition Body**

Specifies an authentication entry point.

Parameter | Description | DataType  |  Required |  Default
----------|-------------|----------|-----------|-----------
authType	| `ANY` or `RADIUS`	| String	| No	| Empty

### Actions

**Signon Action**

Parameter | Description | DataType  |  Required |  Default
----------|-------------|----------|-----------|-----------
access	| `ALLOW` or `DENY`	| String	| YES	
requireFactor	| `true` or `false`	| Boolean	| NO	| `false`
factorPromptMode	| `DEVICE`, `SESSION` or `ALWAYS`	| String	| When requireFactor = `true`	
factorLifetime	| How long until factor times out	| Int	| When factorPromptMode = `SESSION`	

## Rules Operations

### Get Policy Rules
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET </span> /api/v1/policies/{policyId}/rules</span>

Retrieves all rules for a specified policy. 

#### Request Parameters

Parameter | Description | Param | Type   | Required
----------|-------------|-------|--------|----------
policyId	 |Policy ID	   | URL	  | String	| YES	

#### Response Parameters

An array of Rules for the policy.

### Create Rule 
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST </span> /api/v1/policies/{policyId}/rules</span>

Creates a new rule for a specified policy. 

#### Request Parameters

Parameter | Description | Param | Type   | Required
----------|-------------|-------|--------|----------
policyId	 | Policy ID	  | URL	  | String	| YES	

#### Request Body

The rule to create.

#### Response Parameters

The created rule.

### Get a Rule
{:.api .api-operation}

<span class="api-uri-template api-uri-get"><span class="api-label">GET </span> /api/v1/policies/{policyId}/rules/{ruleId}</span>

Retrieves the specified rule for a specified policy. 

#### Request Parameters

Parameter | Description | Param | Type   | Required
----------|-------------|-------|--------|----------
policyId	| Policy ID	| URL	| String	| YES	
ruleId	| Rule ID	| URL	| String	| YES	

#### Response Parameters

The specified rule.

### Update a Rule
{:.api .api-operation}

<span class="api-uri-template api-uri-put"><span class="api-label">PUT </span> /api/v1/policies/{policyId}/rules/{ruleId}</span>

Retrieves the specified rule for the specified policy. 

#### Request Parameters

Parameter | Description | Param | Type   | Required
----------|-------------|-------|--------|----------
policyId  | Policy ID | URL | String  | YES 
ruleId  | Rule ID | URL | String  | YES 


#### Response Parameters

The updated rule.

### Request Body

The rule in a changed state. Note this will be a strict PUT. Any missing item is set to its default value. For example if `priorityOrder` is missing from the rule body, the item moves to the lowest priority order in the list of rules.

### Response Parameters

The updated rule.

### Delete a Rule
{:.api .api-operation}

<span class="api-uri-template api-uri-delete"><span class="api-label">DELETE </span> /api/v1/policies/{policyId}/rules/{ruleId}</span>

Deletes the specified rule for the specified policy. 

#### Request Parameters

Parameter | Description | Param | Type  | DataType  | Required  | Default
----------|-------------|-------|-------|-----------|-----------|--------
policyId  | Policy ID | URL | String  | YES 
ruleId  | Rule ID | URL | String  | YES 

#### Response Parameters

None

### Activate a Rule
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST </span> /api/v1/policies/{policyId}/rules/{ruleId}/lifecycle/activate</span>

Activates the specified rule for the specified policy. 

#### Request Parameters

Parameter | Description | Param | Type   | Required
----------|-------------|-------|--------|----------
policyId  | Policy ID | URL | String  | YES 
ruleId  | Rule ID | URL| String  | YES 

#### Response Parameters

None.

### Deactivate a Rule
{:.api .api-operation}

<span class="api-uri-template api-uri-post"><span class="api-label">POST </span> /api/v1/policies/{policyId}/rules/{ruleId}/lifecycle/deactivate</span>

Deactivates the specified rule for the specified policy. 

#### Request Parameters

Parameter | Description | Param | Type   | Required
----------|-------------|-------|--------|----------
policyId  | Policy ID | URL | String  | YES 
ruleId  | Rule ID | URL | String  | YES 

#### Response Parameters

None.
