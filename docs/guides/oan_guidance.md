---
layout: docs_page
title: Okta Application Network
excerpt: Become a member of the Okta Application Network.  Enhance your identity integration and improve adoption with your customers.
---

* Will be replaced with the ToC
{:toc .list-unstyled .toc}

## Overview


With over 4000 pre-integrated applications, the Okta Application Network (OAN) provides a great way for ISVs to integrate with an enterprise grade identity management solution. The goal of the OAN is to take the burden of integration away from your customers while providing a simple, standards-based methodology for your application to support federated single sign-on, automated provisioning, and directory integration. By integrating with Okta, your application also benefits from other powerful features such as advanced password policy and multi-factor authentication (MFA).

![OAN Intro](/assets/img/oan_guidance_intro.png "OAN Intro")

There are two main area of focus – Authentication and Provisioning. You need to support at least one of these features in order to be part of Okta Application Network. Okta strongly recommends that you implement both.


### Authentication

Your application needs to support Federated Single Sign-On, a common approach for an application to rely on an external identity provider. For web-based applications, Security Assertion Markup Language (SAML) is the standard. For mobile applications, many mobile solution vendors offer proprietary SDKs to provide support. Okta offers Okta Mobile Connect which is based on the SAML protocol.

For details on how to federate your application with SAML and Okta Mobile Connect, go to our [Single Sign-On with Okta](/docs/getting_started/saml_guidance.html) section for additional guidance.

### Provisioning

Single sign-on is just one aspect of federation. First, an account for the user must be created to grant access to your application. In order to “automate” this process, your application should expose APIs to manage the account lifecycle that account creation, user profile updates, authorization settings (such as groups or roles), account deactivation, etc.

While many ISVs use proprietary APIs, Okta recommends that you implement your API using the Simple Cloud Identity Management protocol which supports all of the key features needed in provisioning.

For details on how to implement provisioning for your application, go to our “… SCIM Guidance page”

## Getting Started

Use the following instructions to integrate your app into the Okta Application Network:

### 1. Review Pre-Integration Resources

* Is supporting single sign-on making you anxious? Use our [Single Sign-On with Okta](/docs/getting_started/saml_guidance.html) tools which includes toolkits and even a tool for testing your SAML configuration.

* Ready to offload user on-boarding with Okta? Find recommendations on building APIs for user creation, update, and deactivation in our [Building a Well-Managed Cloud Application](https://www.okta.com/resources/whitepaper-bwmca-thank-you.html) guide.

### 2. Integrate Your App

* Sign up for an Okta [developer account](https://www.okta.com/developer/signup/).
* Use the [App Wizard](https://support.okta.com/articles/Knowledge_Article/27560008-Using-the-App-Integration-Wizard) to integrate single sign-on after you sign into Okta as an admin. For more details, see our videos for [SAML](https://www.youtube.com/watch?v=rQpUsRe0Jxw) and [SWA](https://www.youtube.com/watch?v=FoyhQEwOnqg).
* Currently provisioning integrations are custom-built by Okta. Email <oan@okta.com> to submit a request for your app.
* Get Stuck? See our *Okta Application Network FAQs* below.

### 3. Partner with Okta
Already integrated? Become an [Okta App Partner](https://www.okta.com/partners). Benefits include direct access to Okta support, marketing support, and a free version of Okta for your app.

### 4. Need Help?

Ask questions and get help by emailing <developers@okta.com> or post your questions on [stackoverflow](https://stackoverflow.com).

##Okta Application Network FAQs

**Q: Do I need to contact Okta first to start integrating my application?**

A: You should start by enabling SSO and provisioning with your application. Use the material on this site to help with your implementation. There are instructions on how to test your implementation as well.

<br/>

**Q: I am having issues integrating my app or have questions about single sign-on support in my app. How do I contact Okta?**

A: If you have any technical questions, you can submit them to <developers@okta.com> or post your questions on [stackoverflow](https://stackoverflow.com).

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

A: Currently, the App Wizard does not support custom domains. Create an app using the Template SAML 2.0 Application. In order to promote your Template App to the Okta Application Network, please email a screenshot of the configured app details to oan@okta.com with your app name in the subject line.

<br/>

**Q: My app currently supports WS-FED for SSO. Can I use the App Wizard?**

A: The Okta App Wizard only supports SAML 2.0 for federated SSO. If your app supports WS-Fed, you will instead need to create a WS-Fed Template App. Once completed, the Template Application you have created will only be able to be used within your account. In order to promote your Template App to the Okta Application Network, please email a screenshot of the configured app details to oan@okta.com with your app name in the subject line.

<br/>

**Q: I am creating a SWA using the App Wizard but I realize my application has additional fields on the login page beyond the standard username and password (example: Customer / OrgID). Can an app with additional fields like this on the login be configured using the App Wizard?**

A: Currently, the App Wizard does not support extra login fields. Create an app using the Plug-in (SWA) Template Application. In order to promote your Template App to the Okta Application Network, please email a screenshot of the configured app details to <oan@okta.com> with your app name in the subject line.

<br/>

**Q: Does Okta support single logout / single sign-out (SAML protocol)?**

A: No, Okta does not currently support single logout / single sign-out (SAML protocol).

<br/>

**Q: Is the IDP session time out a setting that an Okta admin can change? And if so, can it be changed on a per application basis, or is it a global setting for all of the user’s applications?**

A: Yes, the session time out default is 2 hours but can be customized by the hour or minute by the Okta administrator. This session time out is an IDP setting – and therefire, it is global and applies to all applications.

<br/>

**Q: My app is now in OAN, what is the user experience for a joint customer that wants to set up SSO and Account Provisioning for my app in the Okta interface?**

A: Okta creates unique SAML configuration documentation for each application in the OAN so each will be different but for a sample, see our instructions for “How to Configure SAML 2.0 in Slack” as an example. Also, if you haven’t already done so, sign up for an Okta developer account and you can test drive the Okta user experience yourself.

<br/>

**Q: In general, how can I get familiar with the Okta product?**

A: To get started, check out our Training Resources or Okta Academy on Youtube. Also see the Okta Help Center for FAQs and support articles and the Okta Community. App Partners are eligible for live Okta 101 sessions as well, please email <oan@okta.com> if you are interested.