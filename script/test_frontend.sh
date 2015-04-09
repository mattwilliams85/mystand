#!/bin/bash

webdriver-manager update
webdriver-manager start </dev/null &>/dev/null &

protractor ./test/protractor.conf.js
