// dependencies
var browserify = require('browserify');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var postcss = require('gulp-postcss');
var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');
var watchify = require('watchify');

// settings
var paths = {
  css: {
    main: './src/css/site.styl',
    all: './src/css/**/*.styl',
    output: './public/css/'
  },

  js: {
    main: './src/js/site.js',
    all: './src/js/**/*.js',
    output: './public/js/'
  },

  html: {
    all: './templates/**/*.jade',
  }
};

// gulp stylus
gulp.task('stylus', function () {
  return gulp.src(paths.css.main)
    .pipe(stylus({ 'include css': true }))
    .pipe(postcss([ require('autoprefixer') ]))
    .pipe(gulp.dest(paths.css.output))
    .pipe(browserSync.reload({ stream: true }));
});

// gulp browserify
watchify.args.debug = true;
var bundler = watchify(browserify(paths.js.main, watchify.args));

function bundle () {
  return bundler.bundle()
    .on('error', function (err) {
        if (err) console.log(err);
        browserSync.notify('Browserify Error!');
        this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(paths.js.output))
    // .pipe(browserSync.stream({ once: true }));
}

bundler.on('update', bundle);
gulp.task('browserify', function () {
  return bundle();
});

// gulp watchers
gulp.task('watch:stylus', function () {
  return gulp.watch(paths.css.all, [ 'stylus' ]);
});

gulp.task('watch:browserify', function () {
  return gulp.watch(paths.js.all, [ 'browserify' ]);
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
gulp.task('build', [ 'stylus', 'browserify' ]);
gulp.task('watch', [ 'watch:stylus', 'watch:browserify', 'watch:jade' ]);
gulp.task('default', [ 'build', 'watch', 'browser-sync' ]);
