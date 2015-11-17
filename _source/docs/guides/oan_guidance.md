---
layout: docs_page
title: Okta Application Network
excerpt: Become a member of the Okta Application Network.  Enhance your identity integration and improve adoption with your customers.
redirect_from: "/docs/getting_started/oan_guidance.html"

---

## Overview


With over 4000 pre-integrated applications, the Okta Application Network (OAN) provides a great way for ISVs to integrate with an enterprise grade identity management solution. The goal of the OAN is to take the burden of integration away from your customers while providing a simple, standards-based methodology for your application to support federated single sign-on, automated provisioning, and directory integration. By integrating with Okta, your application also benefits from other powerful features such as advanced password policy and multi-factor authentication (MFA).

![OAN Intro](/assets/img/oan_guidance_intro.png "OAN Intro")

There are two main area of focus – Single Sign-On and Provisioning. You need to support at least one of these features in order to be part of Okta Application Network. Okta strongly recommends that you implement both. 


## Single Sign-On

Your application needs to support Federated Single Sign-On, a common approach for an application to rely on an external identity provider. For web-based applications, Security Assertion Markup Language (SAML) is the standard. For mobile applications, many mobile solution vendors offer proprietary SDKs to provide support. Okta offers [Okta Mobile Connect](/docs/guides/okta_mobile_connect.html) which is based on the SAML protocol.

For details on how to federate your application with SAML and Okta Mobile Connect, go to our [Single Sign-On with Okta](/docs/guides/saml_guidance.html) section for additional guidance.


### Single Sign-On: Building an Integration with Okta

Use the following instructions to support single sign-on for app in the public-facing Okta Application Network:

### 1. Prepare Your Application

* Use Okta’s [Single Sign-On with Okta](/docs/guides/saml_guidance.html) guide for best practices on supporting SAML in your app which includes toolkits and testing tools.

### 2. Integrate Your App

* Sign up for an Okta [developer account](https://www.okta.com/developer/signup/).
* In your Okta account (make sure you are signed in as an admin), use the [App Wizard](https://support.okta.com/help/articles/Knowledge_Article/Using-the-App-Integration-Wizard) to build a Single Sign-on integration with Okta. For the more visually inclined, see our videos for [SAML](https://www.youtube.com/watch?v=rQpUsRe0Jxw) and [SWA](https://www.youtube.com/watch?v=FoyhQEwOnqg).
* Note: In the SAML Wizard step #3 Feedback, be sure to identify yourself as a Partner (“I'm a software vendor. I'd like to integrate my app with Okta”) and that you want to your app reviewed and promoted to the OAN (“Yes, my app integration is ready for public use in the Okta Application Network”)
* Currently provisioning integrations are custom-built by Okta. Email <oan@okta.com> to submit a request for your app.
* Get Stuck? See our *Okta Application Network FAQs* below.

### 3. Need Help?

Get stuck or have questions? See our Okta Application Network FAQs (below), email <oan@okta.com> or post your questions on [stackoverflow](https://stackoverflow.com).

### 4. Partner with Okta (Optional)

Already part of the Okta App Network but looking for a more “go-to-market” partnership? Contact us about becoming an [Okta App Partner](https://www.okta.com/partners/). App Partners are fully integrated with Okta and get access to great benefits like marketing support and a free version of Okta for your app.


## Provisioning

Single sign-on is just one aspect of federation. First, an account for the user must be created to grant access to your application. In order to “automate” this process, your application should expose APIs to manage the account lifecycle that account creation, user profile updates, authorization settings (such as groups or roles), account deactivation, etc.

While many ISVs use proprietary APIs, Okta recommends that you implement your API using the [Simple Cloud Identity Management protocol](http://www.simplecloud.info/) (SCIM) which supports all of the key features needed in provisioning.


### Provisioning: Building an Integration with Okta

With the new Cloud Provisioning Connector (CPC) Program, you can now build and support a provisioning integration between your application and Okta. At a high level, the CPC program let’s you choose between two technical approaches for building the integration, each with it’s own advantages:

 | **Java Connector** | **SCIM**
-------- | ----------- | --------
**What is it?**  | Connector written in Java that takes Okta provisioning signals and translates them into your service’s User API. The Connector is built and managed by the ISV (you) and hosted in the Okta service. Typical development effort is ~1-3 man-weeks. | Okta SCIM 1.1/2.0 Client interfaces directly with compatible SCIM 1.1/2.0 Server APIs. The integration is just a template that is configured. No coding required.
**Who is it designed for?** | ISVs with an existing proprietary API for user operations. You want maximum flexibility and do not plan on supporting the SCIM standard. | ISVs that: a) currently support the SCIM standard; b) plan to support the SCIM standard; c) don’t already have proprietary APIs for user operations.
**How do I get started?** |Email <oan@okta.com> and express interest in developing using Java Connector. We’ll share the SDK and additional program details. `Note: We are only accepting a limited number of ISV partners into the Java Connector program to start. Please try to share some details on customer demand and urgency (e.g. # of joint customers that would benefit, deployment deadlines) in your email.` | Okta support for SCIM is coming in March 2016. If you are interested in being part of the SCIM Beta reply to <oan@okta.com> and we’ll add you to the list. We’ll reach back out with additional SCIM documentation and SCIM Beta details by March 2016.

Interested in provisioning with Okta but have general questions about the approaches above? Email us at <oan@okta.com>


##Okta Application Network FAQs

**Q: Do I need to contact Okta first to start integrating my application?**

A: No, the materials here should be enough to help you get started. You should start by enabling [SAML](/docs/guides/saml_guidance.html) with your application. Then test your app integration and submit for review by Okta with the [App Wizard](https://support.okta.com/help/articles/Knowledge_Article/Using-the-App-Integration-Wizard). Get stuck or have questions? Email oan@okta.com.

<br/>

**Q: I am having issues integrating my app or have questions about single sign-on support in my app. How do I contact Okta?**

A: If you have any technical questions, you can submit them to <oan@okta.com> or post your questions on [stackoverflow](https://stackoverflow.com).

<br/>

**Q: Where can I get a free Okta account to play around with?**

A: Sign up for an [Okta Developer Edition](https://www.okta.com/developer/signup/) account.

<br/>

**Q: Are there any cost associated with joining the Okta Application Network (OAN)?**

A: No, integrating your application with the Okta Application Network is completely FREE. Also, Okta’s paid SSO and Enterprise customers can utilize all application integrations in the OAN free of charge.

<br/>

**Q: By following the guidance here, am I building an integration that only works with Okta? What about other identity vendors?**

A: Absolutely not. Our goal is to help you identity-enable your application using industry standards. The guidance offered here for SAML and SCIM allows you to integrate with customers using other identity solutions.

<br/>

**Q: My customer is asking for AD (Active Directory) integration. Is that SSO, provisioning, or both?**

A: AD (and LDAP) play a role in both SSO and provisioning. For SSO, customers often want end users to be able to log into SaaS applications with their corporate password. When you integrate with Okta through SAML, authentication is done by Okta, and Okta supports delegated authentication against AD. For provisioning, Okta acts as a universal directory containing all the information about the AD user. During provisioning, Okta can push information such as user profile, manager, security group membership to your application if needed. Effectively, Okta acts as a cloud representation of your customers' AD that makes integration much simpler for your application.

<br/>

**Q: What is Secure Web Authentication (SWA)?**

A: SWA was developed by Okta to provide single sign-on for apps that do not support federated sign-on methods. Users can still sign in directly through the application and then enter their credentials for these apps on their Okta homepage. These credentials are stored such that users can access their apps with a single sign-on. When users first sign-in to a SWA app from their homepage, they see a pop-up message asking if they were able to sign-in successfully.

<br/>

**Q: What is the process after I have submitted my app using the App Wizard?**

A: Okta App Integration team reviews all submitted apps. The team will reach out during the testing and documentation process for additional information. When completed, the application is then be promoted to the public Okta Application Network, and you are notified. Typical review time is two weeks. Have you submitted an app but have not heard from Okta? Email <developers@okta.com>.

<br/>

**Q: What is the difference between Community Created and Okta Verified in the Okta Application Network?**

A: There are two different levels of app integrations in the OAN – Okta Verified and Community Created. Okta Verified apps have custom configuration documentation and are tested by Okta initially and on an ongoing basis. All other apps are labeled as Community Created and have not been tested and verified by Okta.

![OAN Cert vs Community](/assets/img/oan_guidance_cert_vs_community.png "OAN Cert vs Community")

<br/>

**Q: I’m setting up a SAML 2.0 app using the App Wizard and we have different domains for each customer. How do you manage these types of situations?**

A: Currently, the App Wizard does not support custom domains. Create an app integration as you normally would using the [App Wizard](https://support.okta.com/help/articles/Knowledge_Article/Using-the-App-Integration-Wizard). In step #3 Feedback, please try to include in the “How to enable SAML” section or email oan@okta.com. Our team will work with you to add this functionality when they begin to work with you.

<br/>

**Q: My app currently supports WS-FED for SSO. Can I use the App Wizard?**

A: The Okta App Wizard only supports SAML 2.0 for federated SSO. If your app supports WS-Fed, you will instead need to create a WS-Fed Template App. Once completed, the Template Application you have created will only be able to be used within your account. In order to promote your Template App to the Okta Application Network, please email a screenshot of the configured app details to oan@okta.com with your app name in the subject line.

<br/>

**Q: I am creating a SWA using the App Wizard but I realize my application has additional fields on the login page beyond the standard username and password (example: Customer / OrgID). Can an app with additional fields like this on the login be configured using the App Wizard?**

A: Currently, the App Wizard does not support extra login fields. Create an app using the Plug-in (SWA) Template Application. In order to promote your Template App to the Okta Application Network, please email a screenshot of the configured app details to <oan@okta.com> with your app name in the subject line.

<br/>

**Q: Does Okta support single logout / single sign-out (SAML protocol)?**

A: Yes. For more information, see [Using the App Integration Wizard](https://support.okta.com/help/articles/Knowledge_Article/Using-the-App-Integration-Wizard#SAML_Single_Logout_section).

<br/>

**Q: Is the IDP session time out a setting that an Okta admin can change? And if so, can it be changed on a per application basis, or is it a global setting for all of the user’s applications?**

A: Yes, the session time out default is 2 hours but can be customized by the hour or minute by the Okta administrator. This session time out is an IDP setting – and therefore, it is global and applies to all applications.

<br/>

**Q: My app is now in OAN, what is the user experience for a joint customer that wants to set up SSO and Account Provisioning for my app in the Okta interface?**

A: Okta creates unique SAML configuration documentation for each application in the OAN so each will be different but for a sample, see our instructions for [How to Configure SAML 2.0 in Slack](http://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-Slack.html) as an example. Also, if you haven’t already done so, sign up for an Okta [developer account](https://www.okta.com/developer/signup/) and you can test drive the Okta user experience yourself.

<br/>

**Q: In general, how can I get familiar with the Okta product?**

A: To get started, check out the [Okta Help Center](https://support.okta.com/help) or [Okta Academy](https://www.youtube.com/playlist?list=PLIid085fSVdurJ8l_UgfNGJohaSW6w97p) on Youtube. App Partners are eligible for live Okta 101 sessions as well, please email oan@okta.com if you are interested.
