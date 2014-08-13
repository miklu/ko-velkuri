var gulp = require('gulp'),
  less = require('gulp-less'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  livereload = require('gulp-livereload'),
  path = require('path');

gulp.task('styles', function() {
  gulp.src('./public/css/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('./public/css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('./public/css'))
    .pipe(connect.reload());
});

gulp.task('hbs', function() {
  gulp.src('./public/views/*.hbs')
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  gulp.src('./public/js/atomic.min.js', './public/js/knockout.js', './public/js/app.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function() {
  gulp.watch('./public/views/*.hbs', ['hbs']);
  gulp.watch('./public/css/*.less', ['styles']);
});


gulp.task('connect', function() {
  var express = require('./server');
  connect.server({
    root: 'public',
    livereload: true,
    port: 3000
  });
});

gulp.task('default', ['connect', 'styles', 'watch']);