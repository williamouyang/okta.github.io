#!/bin/bash

###############################################################################
# LINT
###############################################################################

function url_consistency_check() {
    interject "Checking ${GENERATED_SITE_LOCATION} to make sure documentation uses proper prefixes ('/api/v1', '/oauth2', etc) in example URLs"
    if [ ! -d "$GENERATED_SITE_LOCATION" ]; then
       echo "Directory ${GENERATED_SITE_LOCATION} not found";
       return 1;
    fi

    url_consistency_check_file=`mktemp`
    # Search the dist directory for all files (-type f) ending in .html (-iname '*.html')
    find $GENERATED_SITE_LOCATION -type f -iname '*.html' | \
        # 'grep' all found files for 'api-uri-template', printing line numbers on output
        xargs grep -n api-uri-template | \
        # Search for the 'api/v' string, so we match "api/v1", "api/v2", etc
        grep -v api/v | grep -v oauth2 | grep -v .well-known | \
        # The 'sed' command below pulls out the filename (\1), the line number (\2) and the URL path (\3)
        # For example, this:
        # dist/docs/api/resources/authn.html:2278:<p><span class="api-uri-template api-uri-post"><span class="api-label">POST</span> /api/v1/authn</span></p>
        # becomes this:
        # dist/docs/api/resources/authn.html:2278:/api/v1/authn
        sed -e 's/^\([^:]*\):\([^:]*\).*<\/span> \(.*\)<\/span>.*/\1:\2:\3/' | \
        # Write the results to STDOUT and the $url_consistency_check_file
        tee $url_consistency_check_file
    interject "Done checking $GENERATED_SITE_LOCATION for proper prefixes in URLs"
    # Return "True" if the file is empty
    return `[ ! -s $url_consistency_check_file ]`
}

function duplicate_slug_in_url() {
    interject "Checking ${GENERATED_SITE_LOCATION} to verify duplicate /api/v1 does not exist"
    output_file=`mktemp`
    find $GENERATED_SITE_LOCATION -iname '*.html' | xargs grep '/api/v1/api/v1' | tee $output_file
    interject "Done checking $GENERATED_SITE_LOCATION for duplicate slugs"
    # Return "True" if the file is empty
    return `[ ! -s $output_file ]`
}

###############################################################################
# SETUP
###############################################################################

# Print an easily visible line, useful for log files.
function interject() {
    echo "----- ${1} -----"
}

function check_for_npm_dependencies() {
    interject 'Checking NPM dependencies'
    command -v npm > /dev/null 2>&1 || { echo "This script requires 'npm', which is not installed"; exit 1; }
    npm install
    interject 'Done checking NPM dependencies'
}

function check_for_jekyll_dependencies() {
    interject 'Checking Jekyll dependencies'
    command -v rvm > /dev/null 2>&1 || { echo "This script requires 'rvm', which is not installed"; exit 1; }

    # The file `.ruby-version` has the current ruby version and is used by rbenv
    # https://rvm.io/workflow/projects#project-file-ruby-version
    # For example, this file might contain this line: "ruby-2.0.0-p643"
    # This version of ruby is needed for the gems that Jekyll requires.
    ruby_version=`cat .ruby-version`
    if ! rvm list strings | grep $ruby_version > /dev/null; then
        interject "Installing the version of Ruby needed by Jekyll (${ruby_version})"
        rvm install $ruby_version
        interject "Installed ${ruby_version}"
    fi
    # "source" the version of Ruby that we need, so the "gem" and "bundler"
    # commands use the version of Ruby that we want.
    # https://rvm.io/rvm/basics#post-install-configuration
    source $(rvm `cat .ruby-version` do rvm env --path)
    if ! ((command -v bundler && bundler --version) > /dev/null 2>&1); then
        interject 'Bundler is not installed, installing now'
        gem install bundler --version '1.14.6'
        interject 'Done installing bundler'
    else
        interject 'Bundler is installed at:' `command -v bundler`
    fi
    interject 'Installing the gems needed for Jekyll'
    bundle install
    interject 'Done installing the gems needed for Jekyll'
    interject 'Done Jekyll checking dependencies'
}


function generate_html() {
    check_for_jekyll_dependencies

    interject 'Using Jekyll to generate HTML'

    if [ ! -d $GENERATED_SITE_LOCATION ]; then
        check_for_npm_dependencies
        bundle exec jekyll build
        local status=$?
        interject 'Done generating HTML'
        return $status
    else
        interject 'HTML already generated'
        return 0
    fi
}

function require_env_var() {
    local env_var_name=$1
    eval env_var=\$$env_var_name
    if [[ -z "${env_var}" ]]; then
        echo "Environment variable '${env_var_name}' must be defined, but isn't.";
        exit 1
    fi
}

# Verify for occurences of localhost:4000 have been removed
function check_for_localhost_links() {
    local links=$(grep -R "localhost:4000" ../* --exclude-dir={node_modules,scripts,tests,dist} --exclude={README.md,package.json})
    if [ "$links" ];
    then
        echo $links
        echo "Files contain localhost:4000!"
        return 1
    fi
}

# Check for broken markdown headers
function header_checker() {
    local dir=$(pwd)
    local allheaders=$( grep -EoR "##" --include="*.html" $dir --exclude-dir={node_modules,scripts,tests,dist,_source} | sort | uniq )
    if [ "$allheaders" ];
    then
        echo $allheaders
        echo "Files contain broken headers."
        return 1
    fi
}

function check_sample_code_orgs() {
    # Sample code URLS should be in the following format:
    # Currently: https://your-org.okta.com
    
    local dir=$(pwd)
    local yourOrgUrls=$(grep -EoR "(http|https)://your-org.okta*" --include="*.md" $dir --exclude-dir={node_modules,scripts,tests,dist} | sort | uniq)
    local yourExampleUrls=$(grep -EoR "(http|https)://example.okta*" --include="*.md" $dir --exclude-dir={node_modules,scripts,tests,dist} | sort | uniq)
    local rainUrls=$(grep -EoR "http://rain.okta1.com:1802*" --include="*.md" $dir --exclude-dir={node_modules,scripts,tests,dist} | sort | uniq)
    local subdomainUrls=$(grep -EoR "(http|https)://your-subdomain.okta*" --include="*.md" $dir --exclude-dir={node_modules,scripts,tests,dist} | sort | uniq)
    local yourDomainUrls=$(grep -EoR "(http|https)://your-domain.okta*" --include="*.md" $dir --exclude-dir={node_modules,scripts,tests,dist} | sort | uniq)
    local jspUrls=$(grep -EoR "(http|https)://.*{org}.okta*" --include="*.md" $dir --exclude-dir={node_modules,scripts,tests,dist,s} | sort | uniq)
    local oktaPreviewUrls=$(grep -EoR "(http|https)://.*oktapreview.com*" --include="*.md" $dir --exclude-dir={node_modules,scripts,tests,dist,_posts,getting_started} | sort | uniq)
    
    if [ "$yourOrgUrls" ];
    then
        echo "$yourOrgUrls"
        echo "Files contain old URL reference -> https://your-org.okta{preview}.com"
        return 1
    fi

    if [ "$yourExampleUrls" ];
    then
        echo "$yourExampleUrls"
        echo "Files contain old URL reference -> https://example.okta{preview}.com"
        return 1
    fi

    if [ "$rainUrls" ];
    then
        echo "$rainUrls"
        echo "Files contain old URL reference -> http://rain.okta1.com:1802"
        return 1
    fi

    if [ "$subdomainUrls" ];
    then
        echo "$subdomainUrls"
        echo "Files contain old URL reference -> https://subdomain.okta{preview}.com"
        return 1
    fi

    if [ "$yourDomainUrls" ];
    then
        echo "$yourDomainUrls"
        echo "Files contain old URL reference -> https://your-domain.okta{preview}.com"
        return 1
    fi

    if [ "$jspUrls" ];
    then
        echo "$jspUrls"
        echo "Files contain old URL reference -> https://\${org}.okta{preview}.com"
        return 1
    fi

    if [ "$oktaPreviewUrls" ];
    then
        echo "$oktaPreviewUrls"
        echo "Files contain old URL reference -> oktapreview.com"
        return 1
    fi
}
