'use strict';

var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var bower = require('bower');

gulp.task('install:bower', ['git:check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      $.util.log('bower', $.util.colors.cyan(data.id), data.message);
    });
});

gulp.task('install', ['install:bower']);
