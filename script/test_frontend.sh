#!/bin/bash

webdriver-manager update --standalone
webdriver-manager start </dev/null &>/dev/null &

protractor ./test/protractor.conf.js
