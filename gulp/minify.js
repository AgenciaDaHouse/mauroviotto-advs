'use strict'

/**
 * dependencies
 */
var gulp = require('gulp')
var plumber = require('gulp-plumber')
var notify = require('gulp-notify')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var cssmin = require('gulp-cssmin')

/**
 * minify js task
 */
gulp.task('minify:js', function () {
  return gulp.src('./public/js/**/*.js')
    .pipe(plumber({ errorHandler: notify.onError('MINIFY JS Error: <%= error.message %>') }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public/js'))
})

/**
 * minify css task
 */
gulp.task('minify:css', function () {
  return gulp.src('./public/css/*.css')
    .pipe(plumber({ errorHandler: notify.onError('MINIFY CSS Error: <%= error.message %>') }))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public/css'))
})

/**
 * minify task
 */
gulp.task('minify', [ 'minify:js', 'minify:css' ])
