const del = require('del');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');

const webpackDev = require('./webpack/dev');
const webpackProd = require('./webpack/prod');

gulp.task('lint', () =>
  gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));


gulp.task('clean', () =>
  del([
    'build/**',
    '!build',
    '!build/static',
    '!build/static/uploads',
    '!build/static/uploads/**',
  ]));

gulp.task('dev', ['clean'], () =>
  gulp.src('src/app.js')
    .pipe(webpack(webpackDev))
    .pipe(gulp.dest('build/')));

gulp.task('prod', ['clean'], () =>
  gulp.src('src/app.js')
    .pipe(webpack(webpackProd))
    .pipe(gulp.dest('build/')));
