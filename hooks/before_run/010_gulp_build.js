#!/usr/bin/env node

var execSync = require('shelljs').exec;

execSync('gulp build:dist');
