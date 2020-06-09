#!/bin/bash
# run this file through `shellcheck` and/or `shfmt` when editing to ensure there are no warnings/issues.

TRAVIS_BUILD_NUMBER="$TRAVIS_BUILD_NUMBER" TRAVIS_BUILD_WEB_URL="$TRAVIS_BUILD_WEB_URL" WEBHOOK_URL="$WEBHOOK_URL" npm start
