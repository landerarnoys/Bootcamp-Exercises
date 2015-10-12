'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var gulpif = require('gulp-if');


    //default task
    gulp.task('default', ['browser-sync']);



    //browsersync
    gulp.task('browser-sync', ['sass'], function() {

            browserSync.init({
                server: "."
            });

            gulp.watch("./node_modules/todomvc-app-css/*.scss", ['sass']);
            gulp.watch("./*.html").on('change', browserSync.reload);

    });



    // sass task
    gulp.task('sass', function () {
       gulp.src('./node_modules/todomvc-app-css/index.scss')
           .pipe(sass().on('error', sass.logError))
           .pipe(gulp.dest('./node_modules/todomvc-app-css/'))
           .pipe(browserSync.stream());
    });

    // build to dest and wiredep

     gulp.task('html', function () {
        var assets = useref.assets();

        return gulp.src('./*.html')
            .pipe(assets)
            .pipe(gulpif('*.js', uglify()))
            .pipe(gulpif('*.css', minify()))
            .pipe(assets.restore())
            .pipe(useref())
            .pipe(gulp.dest('dist'));
    });







