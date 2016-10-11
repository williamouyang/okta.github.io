#!/bin/bash -x

cd ${OKTA_HOME}/${REPO}

function scan_broken_links() {
    echo "---- Scanning http://developer.okta.com for broken links ---"
    wget --spider  -o links.log  -e robots=off --wait 1 -r -p http://developer.okta.com --debug 
    echo "---- Broken Links ----" 
    grep -B34 'broken link!' links.log  
}
if ! scan_broken_links;
then
    echo "Broken Link Scan Failed!"
    exit $BUILD_FAILURE;
fi
exit $SUCCESS;

