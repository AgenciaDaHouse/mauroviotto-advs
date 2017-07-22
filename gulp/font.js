'use strict'

/**
 * dependencies
 */
var gulp = require('gulp')

/**
 * fonts task
 */
gulp.task('font', function () {
  return gulp.src('./src/fonts/*.*')
    .pipe(gulp.dest('./public/fonts'))
})
