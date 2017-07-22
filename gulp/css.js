'use strict'

/**
 * dependencies
 */
var gulp = require('gulp')
var plumber = require('gulp-plumber')
var notify = require('gulp-notify')
var changed = require('gulp-changed')
var stylus = require('gulp-stylus')
var postcss = require('gulp-postcss')
var combineMq = require('gulp-combine-mq')
var rename = require('gulp-rename')
var livereload = require('gulp-livereload')

/**
 * settings
 */
var DIST = './public/css'

/**
 * css task
 */
gulp.task('css:build', function () {
  return gulp.src('./src/css/*.styl')
    .pipe(plumber({ errorHandler: notify.onError('CSS Error: <%= error.message %>') }))
    .pipe(changed(DIST))
    .pipe(stylus())
    .pipe(postcss([ require('autoprefixer-core') ]))
    .pipe(combineMq())
    .pipe(gulp.dest(DIST))
    .pipe(livereload())
})

gulp.task('css:vendor', function () {
  return gulp.src('./bower_components/normalize.css/normalize.css')
    .pipe(rename({ extname: '.styl' }))
    .pipe(gulp.dest('./src/css/vendor'))
})

gulp.task('css', [ 'css:vendor', 'css:build' ])
