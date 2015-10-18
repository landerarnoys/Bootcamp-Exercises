/*
 * gulpfile.js
 * ===========
 * Rather than manage one giant configuration file responsible
 * for creating multiple tasks, each task has been broken out into
 * its own file in the 'gulp' folder. Any files in that directory get
 *  automatically required below.
 *
 * To add a new task, simply add a new task file in that directory.
 */

var gulp = require('gulp');
var requireDir = require('require-dir');

// Specify paths & globbing patterns for tasks.
global.paths = {
  // HTML sources.
  'html': './app/*.html',
  // JS sources.
  'js': './app/scripts/*.js',
  // SASS sources.
  'styles': './app/styles/',
  // Sources folder.
  'app': './app/',
  // Compiled CSS folder.
  tmp: './.tmp/',
  // Distribution folder.
  'dist': './dist'
};

// Require all tasks in the 'gulp' folder.
requireDir('./gulp', { recurse : false });

// Default task; start local server & watch for changes.
gulp.task('default', ['serve']);
gulp.task('serve', ['sass', 'watch', 'connect']);
gulp.task('build', ['sass', 'html']);
