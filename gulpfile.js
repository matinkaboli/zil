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
  ]));

gulp.task('dev:server', () =>
  gulp.src('src/server/app.js')
    .pipe(webpack(webpackDev))
    .pipe(gulp.dest('build/')));

gulp.task('prod:server', () =>
  gulp.src('src/server/app.js')
    .pipe(webpack(webpackProd))
    .pipe(gulp.dest('build/')));

gulp.task('dev', ['clean', 'dev:server']);
gulp.task('prod', ['clean', 'prod:server']);
