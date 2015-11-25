// dependencies
var browserSync = require('browser-sync');
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var nodemon = require('gulp-nodemon');
var stylus = require('gulp-stylus');

// settings
var paths = {
  style: {
    main: './src/css/site.styl',
    all: './src/css/**/*.styl',
    output: './public/css/'
  },

  html: {
    all: './templates/**/*.jade',
  }
};

// gulp stylus
gulp.task('stylus', function () {
  return gulp.src(paths.style.main)
    .pipe(stylus({ 'include css': true }))
    .pipe(postcss([ require('autoprefixer') ]))
    .pipe(gulp.dest(paths.style.output))
    .pipe(browserSync.reload({ stream: true }));
});

// gulp watchers
gulp.task('watch:stylus', function () {
  return gulp.watch(paths.style.all, [ 'stylus' ]);
});

gulp.task('watch:jade', function () {
  return gulp.watch(paths.html.all).on('change', browserSync.reload);
});

// browser sync
gulp.task('browser-sync', [ 'nodemon' ], function () {
  browserSync.init({
    proxy: 'http://localhost:3000',
    files: [ 'public/**/*.*' ],
    port: 4000
  });
});

// nodemon
gulp.task('nodemon', function (next) {
  var started = false;
  return nodemon({ script: 'keystone.js' }).on('start', function () {
    if (!started) {
      next();
      started = true;
    }
  });
});

// gulp tasks
gulp.task('build', [ 'stylus' ]);
gulp.task('watch', [ 'watch:stylus', 'watch:jade' ]);
gulp.task('default', [ 'build', 'watch', 'browser-sync' ]);
