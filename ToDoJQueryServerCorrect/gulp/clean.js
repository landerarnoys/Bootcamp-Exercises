var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function(cb) {
    return del([
        paths.tmp,
        paths.dist,
        '!' + paths.dist + 'deploy.json'   // this file is excluded
    ]);
});