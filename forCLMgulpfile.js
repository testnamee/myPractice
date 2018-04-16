var gulp = require('gulp'),
  watch = require('gulp-watch'),
  autoprefixer = require('autoprefixer'),
  cssImport = require('postcss-import'),
  postcss = require('gulp-postcss'),
  nested = require('postcss-nested'),
  simplevars = require('postcss-simple-vars'),
  mixins = require('postcss-mixins'),
  webpack = require('gulp-webpack'),
  browsersync = require('browser-sync').create();

gulp.task('default', function() {
  console.log(currentPath);
});
gulp.task('watch', function() {
  browsersync.init({
    server: {
      baseDir: './Servier_Acertil_2018_003', // ', 계속 바꾸어주어야함. 이게 최선인가
    },
  });
  watch('./Servier_Acertil_2018_003/index.html', function() {
    browsersync.reload();
  });
  watch('Servier_Acertil_2018_003/css/**/*.css', function() {
    gulp.start('cssChange');
  });
});

//CSS가 바뀌면 Postcss를 통하여 변형한다음 다시 브라우저싱크 리로드하는 task
gulp.task('cssChange', ['styles'], function() {
  return gulp
    .src('./Servier_Acertil_2018_003/temp/css/main.css')
    .pipe(browsersync.stream());
});

gulp.task('styles', function() {
  return gulp
    .src('./Servier_Acertil_2018_003/css/main.css')
    .pipe(postcss([autoprefixer, cssImport, simplevars, mixins, nested]))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./Servier_Acertil_2018_003/temp/styles'))
    .pipe(browsersync.stream());
});

// 현재 작업하고 있는 디렉토리
// var currentPath = process.cwd();
// currentPath = currentPath.substr(
//   currentPath.lastIndexOf('/') + 1,
//   currentPath.length - currentPath.lastIndexOf('/')
// )
