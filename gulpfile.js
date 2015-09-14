'use strict';

var gulp = require('gulp');

gulp.paths = {
  src: 'src',
  dist: 'www',
  tmp: '.tmp'
};

require('require-dir')('./gulp');

gulp.task('default', ['build:dist']);
