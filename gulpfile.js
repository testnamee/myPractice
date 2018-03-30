var gulp = require('gulp'),
  watch = require('gulp-watch'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  browserSync = require('browser-sync').create();

gulp.task('watch', function() {
  browserSync.init({
    server: {
      notify: false,
      baseDir: 'app',
    },
  });
  watch('./app/index.html', function() {
    browserSync.reload();
  });

  watch('./app/styles/*.css', function() {
    gulp.start('styles');
  });
});

gulp.task('styles', function() {
  return gulp
    .src('./app/styles/styles.css')
    .pipe(postcss([autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles'))
    .pipe(browserSync.stream());
});
