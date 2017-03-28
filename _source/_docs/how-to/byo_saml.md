## Bring Your Own SAML App Certificate

Okta Admins admin can upload their own SAML certificates to control the private signing keys used to sign my SAML assertions for both inbound and outbound SAML apps. 


## Prerequisite

To use your own SAML certificate, you must update the key credential for the affected apps. Key rollover is an **Early Access** (EA) feature; contact Okta support to enable it. 

### Inbound and Outbound SAML Applications

The general procedure is the same for inbound and outbound SAML application; however, some of the api calls are different, as described in the steps below. The general procedure contains the following six steps:

  1. [List your apps](#step1) 
  2. [Generate a certificate signing request (CSR)](#step2)
  3. [Sign the CSR](#step3)
  4. [Publish the CSR](#step4)
  5. [Update the key credential for the app to specify the new certificate](#step5)
  6. [Upload the new certificate to the ISV](#step6) 

> **Important:** In the third step, you will use your own process to sign the CSR. You cannot move to step four until the process is completed.


For information on using the Postman REST API test client for these steps, see [API Test Client](http://developer.okta.com/docs/api/getting_started/api_test_client.html).

#### [Step 1 – List your apps](id:step1)

Use the [List Apps API](http://developer.okta.com/docs/api/resources/apps.html#list-applications) to return a list of all apps and get the app id, name, and label for each app to update.


For each app to update, collect the `id`, `name`, and `label` elements.

Request: `GET /api/v1/apps`

Truncated Response:

~~~json

{
    "id": "0000000000aaaaaBBBBBo",
    "name": "appname",
    "label": "Application Name",
    "status": "ACTIVE",
    "lastUpdated": "2015-01-24T00:09:01.000Z",
    "created": "2014-01-06T23:42:40.000Z",
    "accessibility": {
      "selfService": false,
      "errorRedirectUrl": null,
      "loginRedirectUrl": null
    },
    "visibility": {
      "autoSubmitToolbar": true,
      "hide": {
        "iOS": false,
        "web": false
      },
      "appLinks": {
        "login": true
      }
    },
    "features": [],
    "signOnMode": "SAML_2_0",
    "credentials": {
      "scheme": "EDIT_USERNAME_AND_PASSWORD",
      "userNameTemplate": {
        "template": "${source.login}",
        "type": "BUILT_IN"
      },
      "revealPassword": true,
      "signing": {
        "kid": "ZcLGUsl4Xn3996YYel6KPvOxZOhNWfly5-q36CByH4o"
      }
    },
    "settings": {
      "app": {
        "instanceType": null
      },
      "notifications": {
        "vpn": {
          "network": {
            "connection": "DISABLED"
          },
          "message": null,
          "helpUrl": null
        }
      }
    }
  }
~~~

#### [Step 2 – Generate a CSR](id:step2)

* Use the [Generate CSR API](http://developer.okta.com/docs/api/apps/TBD.html#list-applications) to return a list of all apps to use with outbound SAML apps. 
* Use the [Generate CSR API2](http://developer.okta.com/docs/api/apps/TBD.html#list-applications) to return a list of all apps to use with inbound SAML apps.

You can generate a CSR and receive the response in either JSON or PKCS#10 format.

The follow request generates a CSR in JSON format to use with outbound SAML apps. For inbound SAML, change the request to `POST /api/v1/idps/:uid/credentials/csrs/`.

~~~json
POST /api/v1/apps/:uid/credentials/csrs/
Accept: application/json
Content-Type: application/json

{
  "subject": {
    "countryName"            : "US",
    "stateOrProvinceName"    : "California",
    "localityName"           : "San Francisco",
    "organizationName"       : "Your Company, Inc.",
    "organizationalUnitName" : "YourOrgUnit",
    "commonName"             : "IdP Issuer"
  },
  "subjectAltNames": 
    {
      "dnsNames": [ "yourorgunit.example.com" ] 
    },
  "use": "sig",
  "key_size": 2048
}

201 Created
Location: http://yoururl.com/api/v1/apps/00000id1U3iyFqLu0g4/credentials/csrs/

{
  "id": "abckutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azh000",
  "created": "2017-04-19T12:50:58.000Z",
  "csr":  "ABCC6jCCAdICAQAwdjELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xEDAOBgNVBAsMB0phbmt5Q28xEzARBgNVBAMMCklkUCBJc3N1ZXIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCpus1zL9sVhEDhwEcdQFWYerAOkDn+J3OkpXFyTPBUFLDYe21CoQN0TQOl5CgtEa8rViyNj0Drv8bWppojLbEkBO3FY6YqDbqSlU+ZuBlhvwiaxnGBnKeRLH6RoWn/6+I1GwHkJJDGYzVtYfELu92sZnhLzNJFcleI41OK7Ll1fWI+un4N5Ryd2JHHtczo7t9N0hWgulckmXHM+qOk1/0abXGZUV2QMDNVIgDcSswyK/n3Ri1p5ccJGX8sJdYCiihxE+Ms97z+PO7oLVbdVLkRDcSDE0T/dTK8CThI5otvhM4PlEeYbNUa8/9f88bUteA2oxDdTWJVurH6FeMvZ6iFAgMBAAGgLzAtBgkqhkiG9w0BCQ4xIDAeMBwGA1UdEQQVMBOCEWphbmt5LmV4YW1wbGUuY29tMA0GCSqGSIb3DQEBCwUAA4IBAQB3o1VcZ+NnwBzSKITWKnf9Pb0wY8hrHsVo+jAX0eUrotMCSnCIL3hyLOZW+LXvITfaREM6l/L0vKLqbhNto9trmpn9wy+fFqRboC/0zAyIotPiRDBsCVD+UEKea5IIrDAWsq2Guv1RfUcyI79rblwctfNZbIHj5rpoYVpDqYvQpCHRMmQrzKMDb9qVtZVHbAHqTKEDQTLnQbyvwuw/kmaiPMK7SDSHTPpgq+izW2M6Qqqjn8Mz8RNgQcantXvjcb70uAFt1uxkQR4j9K/kRoY7pjR4d/FrAq/oxfnNPQxyvXYr+/MzOxEFdDKts4vSCYqpOLgQs2xpC6vfhAeHGYEFK",
  "kty": "RSA",
  "_links": {
    "self": {
      "href": "http://yoururl.com/api/v1/apps/00000id1U3iyFqLu0g4/credentials/csrs/abckutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azh000",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "publish": {
      "href": "http://yoururl.com/api/v1/apps/00000id1U3iyFqLu0g4/credentials/csrs/abckutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azh000/lifecycle/publish",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
~~~

The following request generates a CSR in PKCS#10 format.

~~~json
POST /api/v1/apps/:uid/credentials/csrs/
Accept: application/pkcs10
Content-Type: application/json

201 Created
Location: http://yoururl.com/api/v1/apps/00000id1U3iyFqLu0g4/credentials/csrs/
ABDuuPz0KZJxIoUOyz5hHsI7OUDPSFxLoiNc1dXj_EfK
Content-Type: application/pkcs10; filename=okta.p10
Content-Transfer-Encoding: base64

ABCC6jCCAdICAQAwdjELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xEDAOBgNVBAsMB0phbmt5Q28xEzARBgNVBAMMCklkUCBJc3N1ZXIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCpus1zL9sVhEDhwEcdQFWYerAOkDn+J3OkpXFyTPBUFLDYe21CoQN0TQOl5CgtEa8rViyNj0Drv8bWppojLbEkBO3FY6YqDbqSlU+ZuBlhvwiaxnGBnKeRLH6RoWn/6+I1GwHkJJDGYzVtYfELu92sZnhLzNJFcleI41OK7Ll1fWI+un4N5Ryd2JHHtczo7t9N0hWgulckmXHM+qOk1/0abXGZUV2QMDNVIgDcSswyK/n3Ri1p5ccJGX8sJdYCiihxE+Ms97z+PO7oLVbdVLkRDcSDE0T/dTK8CThI5otvhM4PlEeYbNUa8/9f88bUteA2oxDdTWJVurH6FeMvZ6iFAgMBAAGgLzAtBgkqhkiG9w0BCQ4xIDAeMBwGA1UdEQQVMBOCEWphbmt5LmV4YW1wbGUuY29tMA0GCSqGSIb3DQEBCwUAA4IBAQB3o1VcZ+NnwBzSKITWKnf9Pb0wY8hrHsVo+jAX0eUrotMCSnCIL3hyLOZW+LXvITfaREM6l/L0vKLqbhNto9trmpn9wy+fFqRboC/0zAyIotPiRDBsCVD+UEKea5IIrDAWsq2Guv1RfUcyI79rblwctfNZbIHj5rpoYVpDqYvQpCHRMmQrzKMDb9qVtZVHbAHqTKEDQTLnQbyvwuw/kmaiPMK7SDSHTPpgq+izW2M6Qqqjn8Mz8RNgQcantXvjcb70uAFt1uxkQR4j9K/kRoY7pjR4d/FrAq/oxfnNPQxyvXYr+/MzOxEFdDKts4vSCYqpOLgQs2xpC6vfhAeHGYEFK
~~~

#### [Step 3 – Sign the CSR](id:step3)

Follow the third-party process that your company uses to sign the CSR. Wait for the process to complete before moving to step 4.

**Note: ** The CSR is generated in Base64 DER format. If your process requires a different format, convert it using openSSL or a third-party decoder. Free, third-party decoders are readily available.

#### [Step 4 – Publish the CSR](id:step4)

You can publish the certificate in PEM or CER/DER format using the [Publish Cert API](http://developer.okta.com/docs/api/apps/TBD.html#pubcert). The returned Key ID (kid) is used in the following step.

The following request generates a CSR in PEM format.

~~~json
POST /api/v1/apps/00000sid1U3iyFqLu0g4/credentials/csrs/aeT9qCTiUumO7TvxA4jq3gNFIfbtimiSpQ9jssB5iyE/lifecycle/publish
Accept: application/json
Content-Type: application/x-pem-file
~~~

The following request generates a CSR in CER/DER format.

~~~json
POST /api/v1/apps/00000sid1U3iyFqLu0g4/credentials/csrs/FzAuuPz0KZJxIoUOyz5hHsI7OUDPSFxLoiNc1dXj_jM/lifecycle/publish
Accept: application/json
Content-Type: application/x-x509-ca-cert
Content-Transfer-Encoding: base64
~~~ 

The responses are identical except the *Begin Certificate* and *End Certificate* lines are not present in the CER/DER format. 

The PEM request returns the following response.

~~~
-----BEGIN CERTIFICATE-----
MIIFgDCCA2igAwIBAgICEAEwDQYJKoZIhvcNAQELBQAwXjELMAkGA1UEBhMCVVMx
CzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMQ0wCwYDVQQKDARP
...
ZZc+BUqujfMzY+coqgn0gCRUSIKy/Jrj7VJkbrnq6zjbb1FVFqBE5pSgf9Pbhald
++kto/WJsmtwBQmZmwP87YAeWoDMkCSSN+mtX13kJYp0pLTu3wwHZj5V1vt9Bv2k
WIUayqnunOUqjF7ZcOr3UegJHPFEJ9VaDpMQR3nBTVce+xbi2NgV3m+lLQc4s7xc
FjGQoNZ/hJ+xBkcXaoxvpOyMV7Z2VHOV5UC8CLcU5Bwc6p+GB0R+RF6YATOwwX1D
Ox5WhmQExOF7xtxFb93mPe0g+voSLNZjsQYUHDs30T+iVmUbp+SQE7HofPB4JTO7
ZRUaagvFUo1EO9m1xnjpLDIa7+M=
-----END CERTIFICATE-----


201 Created
Location: http://rain.okta1.com:1802/api/v1/apps/0oa1ysid1U3iyFqLu0g4/credentials/keys/ElsCzR8nbPamANBFu7QPRvtLD6Q3O1KQNJ92zkfFJNw
Content-Type: application/json;charset=UTF-8

{
  "created": "2017-03-15T00:03:43.000Z",
  "lastUpdated": "2017-03-15T00:03:43.000Z",
  "expiresAt": "2018-03-25T11:58:43.000Z",
  "x5c": [
    "MIIFgDCCA2igAwIBAgICEAEwDQYJKoZIhvcNAQELBQAwXjELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMQ0wCwYDVQQKDARPa3RhMQwwCgYDVQQLDANFbmcxDTALBgNVBAMMBFJvb3QwHhcNMTcwMzE1MTE...RF6YATOwwX1DOx5WhmQExOF7xtxFb93mPe0g+voSLNZjsQYUHDs30T+iVmUbp+SQE7HofPB4JTO7ZRUaagvFUo1EO9m1xnjpLDIa7+M="
  ],
  "e": "AQAB",
  "n": "vQ3U2VsfmF9yYs-JxJlgjPm12d4LUZZZf7WEopc1CAdtqxiA7hPQGzdvKBKR-xGLYUeMY3vQ1nObiIFGci1kvtPbiwWoafPS8zNupMIvEZ5b9zANUtuuvaBnQN0VOABt9crKvhMQIGj6k1Uz0bPooiwNt0Fz9jr_JsuD1-OSrot6Nro-AH8otGvlineMOR380CbKuJVQvOqRlRne-M6VEY_aX96RZfBBOFEKstJfemV-uimd8QyIuv6iazoVcJ9qVMKbfqJ0Na1W1_zAC0SgvScgzF6058GatFdfHYyl-EXIp0-MCfpjcH-gR5fOPo4052gOvWpBSiW6HTOCG-cjJw",
  "kid": "ElsCzR8nbPamANBFu7QPRvtLD6Q3O1KQNJ92zkfFJNw",
  "kty": "RSA",
  "use": "sig",
  "x5t#S256": "6ZA0gDvExTUMszE4Dvs72pEj396Q7vOHJkQQrdSddVE"
}
~~~


#### [Step 5 – Update the key credential for the app to specify the new signing key id](id:step5)

Call the [Apps API](http://developer.okta.com/docs/api/resources/apps.html#app-id) with the app ID you obtained in step 1. In the body, include
the app name and the app label that you obtained in step 1, the key ID that you obtained in step 4.

Request:

~~~ sh
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "appname",
  "label": "Application Name",
  "signOnMode": "SAML_2_0",
  "credentials": {
    "signing": {
      "kid": "w__Yr9AElCftDtLP5CmjzZFMKXndqHtx7B3QPkg9jrI"
    }
  }
 }
}' "https://${org}.okta.com/api/v1/apps/${aid}"

~~~


#### [Step 6 – Upload the SHA1 certificate to the ISV](id:step6)

> After completing step 5, your users cannot access the SAML app until you complete this step.

**Note: ** This step cannot be automated.


1. In the Okta user interface, select **Applications > Applications** and choose your app. 
2. Select **Sign-On Options**.
3. Click **View Setup Instructions**, as shown below. <br />![Accessing SAML Setup Instructions](../../assets/img/saml_setup_link.png "Accessing SAML Setup Instructions")
4. Perform the setup for your app again, using the instructions provided. During this setup, you will upload the certificate in a specified format, the metadata, or the certificate fingerprint.




`