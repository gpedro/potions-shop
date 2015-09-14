'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('build:styles', ['inject'], function() {
  return gulp.src(paths.tmp + '/serve/**/*')
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build:app', function() {
  var source = paths.src + '/app';
  var stream = gulp.src(source + '/**/*.{html,js}', {base: source});

  if (argv.watch) {
    stream = stream.pipe($.watch(source, {base: source}));
  }

  return stream.pipe(gulp.dest(paths.dist + '/app'));
});

gulp.task('build:components', function() {
  var source = paths.src + '/components';
  var stream = gulp.src(source + '/**/*.{html,js}', {base: source});

  if (argv.watch) {
    stream = stream.pipe($.watch(source, {base: source}));
  }

  return stream.pipe(gulp.dest(paths.dist + '/components'));
});

gulp.task('build:libraries', function() {
  return gulp.src('bower_components/**/*')
    .pipe(gulp.dest(paths.dist + '/bower_components'));
});

gulp.task('build:partials', function() {
  return gulp.src(paths.src + '/{app,components}/**/*.html')
    .pipe($.if(function(file) {
        return $.match(file, ['!**/examples/*.html']);
      },
      $.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
    )
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'cartExample'
    }))
    .pipe(gulp.dest(paths.tmp + '/partials/'));
});

gulp.task('build:html', ['inject', 'build:partials'], function() {
  var partialsInjectFile = gulp.src(paths.tmp + '/partials/templateCacheHtml.js', { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: paths.tmp + '/partials',
    addRootSlash: false
  };
  var htmlFilter = $.filter(['*.html', '!/' + paths.src + '/app/elements/examples/*.html']);
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src(paths.dist + '/*.html')
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest(paths.dist + '/'))
    .pipe($.size({ title: paths.dist + '/', showFiles: true }));
});

gulp.task('build:images', function() {
  var source = paths.src + '/assets/images';
  var stream = gulp.src(source + '/**/*', {base: source});

  if (argv.watch) {
    stream = stream.pipe($.watch(source, {base: source}));
  }

  return stream.pipe(gulp.dest(paths.dist + '/assets/images'));
});

gulp.task('build:fonts', function() {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,otf,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(paths.dist + '/fonts/'));
});

gulp.task('build:translations', function() {
  var source = paths.src;
  var stream = gulp.src(source + '/**/i18n/*.json', {base: source});

  if (argv.watch) {
    stream = stream.pipe($.watch(source, {base: source}));
  }

  return stream
    .pipe(gulp.dest(paths.dist + '/'))
    .pipe($.size());
});

gulp.task('build:jshint', function() {
  return gulp.src(paths.src + '/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('build:clean', function(done) {
  $.del([paths.dist + '/', paths.tmp + '/'], done);
});

gulp.task('build', ['build:clean'], function() {
  argv.watch = true;
  gulp.start([
    'build:styles',
    'build:app',
    'build:components',
    'build:libraries',
    'build:images',
    'build:fonts',
    'build:translations'
  ]);
});

gulp.task('build:dist', ['build:clean'], function() {
  gulp.start([
    'build:html',
    'build:images',
    'build:fonts',
    'build:translations'
  ]);
});
