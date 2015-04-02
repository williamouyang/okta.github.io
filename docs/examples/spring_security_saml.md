---
layout: docs_page
title: Spring Security SAML (Java)
---

This guide describes how to use [Spring Security
SAML](http://projects.spring.io/spring-security-saml/) to add support
for Okta (via SAML) to Java applications that use the Spring
framework.

In this guide, you will learn how to install and configure the sample
application that is included with Spring Security SAML. Once you have
completed integrating Okta with the sample application, you will know
what you will need to do to integrate Okta into your production
application.

This guide assumes that you are familiar with the basics of Java
software development: editing text files, using the command line, and
running Tomcat, Maven or Gradle.

If you're already familiar with Okta and Spring, you can skip to the
section titled "Configuring Spring Security SAML to work with Okta".

* Will be replaced with the ToC
{:toc .list-unstyled .toc}

## Installing the Spring Security SAML sample application

This section covers what you need to do to install and configure Tomcat
from scratch on Mac OS X. If you already have Tomcat on your system, you
can skip to Step 2 below.

How to install the Spring Security SAML sample application on Mac OS X:

1.  If it's not already installed, install Tomcat
    with [Homebrew](http://brew.sh/) using these directions:
    <http://blog.bolshchikov.net/post/50277857673/installing-tomcat-on-macos-with-homebrew>

2.  Set up the Spring Security SAML sample application on Tomcat using
    these directions:
    <http://docs.spring.io/spring-security-saml/docs/1.0.x/reference/html/chapter-quick-start.html#quick-start-steps>

    *   Skip the steps where you modify the `securityContext.xml` file. Normally, you
        shouldn't skip this step. However, for purpose of simplicity, we
        will edit that file later in this guide.
    *   For the "Compilation" step, make sure that your working
        directory is the "sample" sub-directory of the
        "spring-security-saml" directory.

	<pre>
        $ pwd
        ~/spring-security-saml/sample
	</pre>
    *   Instead of running the commands in the "Deployment"
        section, use the command below to copy the compiled
        spring-security-saml2-sample.war file to the Tomcat directory
        you set up earlier

	<pre>
        cp target/spring-security-saml2-sample.war /Library/Tomcat/webapps/
	</pre>

3.  Start Tomcat

    ~~~ shell
    $ /Library/Tomcat/bin/startup.sh
    ~~~

4.  Load the Spring Security SAML sample application by opening this URL:
    <http://localhost:8080/spring-security-saml2-sample>

    If everything worked, you will see a page that looks like this:

    ![Screenshot of the Spring SAML Sample application](/assets/img/spring-security-saml-sample-application-screenshot.png)

## Configuring Okta to work with Spring Security SAML

Before we can configure Spring Security SAML we need to set up an
application in Okta that will connect to Spring Security SAML.

In SAML terminology, what we are doing here is configuring Okta, our
SAML Identity Provider (SAML IdP), with the details of Spring Security
SAML, the new SAML Service Provider (SAML SP) that you will be creating
next.

Here is how to configure Okta:

1.  Log in to your Okta organization as a user with administrative
    privileges.
    
    If you don't have an Okta organization, you can create a free Okta
    Developer Edition organization here:
    <https://www.okta.com/developer/signup/>

2.  Click on the blue "Admin" button
    ![Admin](/assets/img/okta-admin-ui-button-admin.png)

3.  Click on the "Add Applications" shortcut
    ![Add Applications](/assets/img/okta-admin-ui-add-applications.png)

4.  Click on the green "Create New App" button
    ![Create New App](/assets/img/okta-admin-ui-button-create-new-app.png)

5.  In the dialog that opens, select the "SAML 2.0" option, then click
    the green "Create" button
    ![Create a New Application Integration](/assets/img/okta-admin-ui-create-new-application-integration.png)

6.  In Step 1 "General Settings", enter "Spring Security SAML" in the
    "App name" field, then click the green "Next" button.
    ![General Settings](/assets/img/spring-security-saml-okta-general-settings.png)

7.  In Step 2 "Configure SAML",
    Paste the URL below into the "Single sign on URL" field:

    ~~~ shell
    http://localhost:8080/spring-security-saml2-sample/saml/SSO
    ~~~

    Then paste the URL below into the "Audience URI (SP Entity ID)"
    field:

    ~~~ shell
    http://localhost:8080/spring-security-saml2-sample/saml/metadata
    ~~~

    Then click the green "Next" button
    
    ![SAML Settings](/assets/img/spring-security-saml-okta-configure-settings.png)


8.  In Step 3 "Feedback", click the checkbox next to the text "This is
    an internal application that we created", then click the green
    "Finish" button.
    ![App type](/assets/img/okta-admin-ui-new-application-step-3-feedback.png)

9.  You will now see the "Sign On" section of your newly created "Spring
    Security SAML" application.

10. Keep this page open it a separate tab or browser window. You will
    need to return to this page later in this guide and copy the
    "Identity Provider metadata" link. (To copy the that link, right
    click on the "Identity Provider metadata" link and select "Copy")
    ![Sign on methods](/assets/img/okta-admin-ui-identity-provider-metadata-link.png)

11. Right-click on the "People" section of the "Spring Security SAML"
    application and select "Open Link In New Tab" (so that you can come
    back to the "Sign On" section later).
    
    In the new tab that opens, click on the "Assign Application" button
    ![Assign Application](/assets/img/spring-security-saml-okta-assign-people-to-application.png)

12. A dialog titled "Assign Spring Security SAML to up to 500 people"
    will open. Type your username into the search box, select the
    checkbox next to your username, then click the green "Next" button
    ![People search box](/assets/img/okta-admin-ui-confirm-assignments.png)

13. You will be prompted to "Enter user-specific attributes". Just click
    the green "Confirm Assignments" button to keep the defaults.
    ![Enter user attributes](/assets/img/spring-security-saml-okta-confirm-assignments.png)

14. You are now ready to proceed to the next section. Make sure that the
    link you copied in step \#9 is still in your clipboard, as you will
    need it in the next section.

## Configuring Spring Security SAML to work with Okta

Now that you have configured a "Spring Security SAML" application, you
are ready to configure Spring Security SAML to work with Okta. In this
section we will use the "Identity Provider metadata" link from the
section above to configure Spring Security SAML. Once you've completed
these steps, you'll have a working example of connecting Okta to Spring.


1.  Open the `securityContext.xml` file in your favorite text editor.
    If you followed the instructions above for "Installing the Spring
    Security SAML sample application" on Mac OS X, this file will be
    located here at 
    `/Library/Tomcat/webapps/spring-security-saml2-sample/WEB-INF/securityContext.xml`
    (Normally, you would do this step *before* running Maven or Gradle
    to create the .war file you deploy to Tomcat. In this case, I'm
    having you edit the file in the Tomcat path directly, since it's
    easier to make small changes and test them this way).

2.  Once you've opened the `securityContext.xml` file, add the XML below
    to the end of the tag identified by this CSS selector syntax:
    `#metadata > constructor-arg > list`.

    ~~~ xml
    <bean class="org.opensaml.saml2.metadata.provider.HTTPMetadataProvider">
      <!-- URL containing the metadata -->
      <constructor-arg>
        <!-- This URL should look something like this: https://example.okta.com/app/abc0defghijK1lmN23o4/sso/saml/metadata -->
        <value type="java.lang.String">{metadata-url}</value>
      </constructor-arg>
      <!-- Timeout for metadata loading in ms -->
      <constructor-arg>
        <value type="int">5000</value>
      </constructor-arg>
      <property name="parserPool" ref="parserPool"/>
    </bean>    
    ~~~

3.  Make sure to replace the contents of `{metdata-url}` with the link
    that you copied in step \#9 of the "Configuring Okta to work with
    Spring Security SAML" instructions above!**


4.  Save the `securityContext.xml` file, then restart Tomcat

5.  If you are using Mac OS X, you can restart Tomcat using the commands
    below:

    ~~~ shell
    $ /Library/Tomcat/bin/shutdown.sh
    $ /Library/Tomcat/bin/startup.sh
    ~~~


## Test the SAML integration

Now that you've set up an application in Okta and configured the Spring
Security SAML example application to use that application, you're ready
to test it out.

There are two ways to test a SAML application: Starting from the Spring
application ("SP initiated") and starting from Okta ("IdP initiated").
You will be testing both methods. In both cases, you will know of the
test worked when you see a screen that looks like the one below:

![Authenticated user](/assets/img/spring-security-saml-authenticated-user.png)


1.  Login from the Spring Security SAML sample application (This is
    known as an "SP initiated" login)

    -   Open the sample application in your browser:
        <http://localhost:8080/spring-security-saml2-sample>
	
    -   Select the Okta IdP from the list
        It will be a URL that starts with "http://www.okta.com/"
	
    -   Click the "Start single sign-on" button.
        ![Start single sign-on](/assets/img/spring-security-saml-idp-selection.png)

2.  Login from Okta (This is known as an "IdP initiated" login)

    -   Log in to your Okta organization
    
    -   Click the button for the application you created in the
        "Configuring Okta to work with Spring Security SAML" section
        above:
        ![Spring Security SAML](/assets/img/spring-security-saml-okta-chiclet.png)

If you're able to get to the "Authenticated User" page using both of the
methods above, then you're done.

Congratulations on getting Okta working with Spring!

## Next steps

At this point, you
should understand how to set up an application in Okta and how to
configure Spring to work with that Okta application.

Once you have Okta working with the Spring Security SAML sample application,
the next step is to move the configuration in
`securityContext.xml` file for your production application.
The specifics of how this will work will
be different depending on how your application is set up.

If you want to learn more about SAML and what you should consider when writing a SAML implementation, our
in-depth [SAML guidance](http://developer.okta.com/docs/getting_started/saml_guidance.html)
is a great place to learn more.

Finally, if you got this far into this guide and still have questions,
please reach out to me at: joel.franusic@okta.com
