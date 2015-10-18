var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');

gulp.task('connect', function() {
    browserSync.init({
        server: {
            baseDir: [ paths.app, paths.tmp ]
        }
    });
});

gulp.task('sass', function() {
    gulp.src(paths.styles + '/app.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.tmp + 'styles'))
        .pipe(browserSync.stream());
});


gulp.task('lint', function() {

    return gulp.src(['scripts/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(browserSync.stream());

});


gulp.task('watch', function() {
    gulp.watch(paths.styles + '**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch(paths.styles + '**/*.scss').on('change', browserSync.reload);
    gulp.watch(paths.app + 'index.html').on('change', browserSync.reload);
});