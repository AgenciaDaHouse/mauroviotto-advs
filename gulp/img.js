'use strict'

/**
 * dependencies
 */
var gulp = require('gulp')

/**
 * favicon task
 */
gulp.task('favicon', function () {
  return gulp.src('./src/img/favicon/**')
    .pipe(gulp.dest('./public'))
})

/**
 * images task
 */
gulp.task('img', [ 'favicon' ], function () {
  return gulp.src('./src/img/*.{jpg,png,gif,svg,ico}')
    .pipe(gulp.dest('./public/img'))
})
