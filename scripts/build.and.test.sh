#!/bin/bash

# start credzilla-test
DEVELOPER_OKTA_DOT_COM_BUILD_TEST_SUITE_ID=4d6d899a-4abf-4696-9067-26b98424e333
start_test_suite ${DEVELOPER_OKTA_DOT_COM_BUILD_TEST_SUITE_ID}

# Run the build and unit tests, don't fail on error
function build_developer_okta_dot_com() {
 	 source /home/ubuntu/.rvm/scripts/rvm
	 if [ $? -gt 0 ]; then
		 echo "RVM sourcing failed"
		 return 1
	 fi
	 
 	 rvm use 2.0
	 if [ $? -gt 0 ]; then
		 echo "RVM use failed"
		 return 1
	 fi

     bundle install
	 if [ $? -gt 0 ]; then
		 echo "Gems installation failed"
		 return 1
	 fi

     bundle exec jekyll build
	 if [ $? -gt 0 ]; then
		 echo "Building the website failed"		 
		 return 1
	 fi
	 
     rsync -av ./_site/ ./
	 if [ $? -gt 0 ]; then
		 echo "Synching new site failed"		 		 
		 return 1
	 fi
	 
	 fileschanged=`git diff --numstat | wc -l`

	 # We allow one changed file, because sitemap.xml always changes (the time is updated each build)
	 if [ $? -gt 1 ]; then
		 echo "You forgot to check in some of changed files. Please rebuild it and check in everything. Here is your git diff"
		 git diff
		 
		 return 1
	 fi
	 
     return 0
}

# Catch compilation errors and log to s3 (fail/finish_test_suite will do this)
if ! build_developer_okta_dot_com; then
  echo "Failing the test suite"
  fail_test_suite
  exit 1
fi

echo "Test suite succeeded"
finish_test_suite build
