var gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    watch = require('gulp-watch'),
    sass  = require("gulp-sass");

gulp.task("sass", function(){
  return gulp.src("styles/style.scss")
      .pipe(sass())
      .pipe(gulp.dest("styles/"));
});

// Watch asset folder for changes
gulp.task("default", function() {
  gulp.watch("styles/*.scss", gulp.registry().get("sass"));
});
