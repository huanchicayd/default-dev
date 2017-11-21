var gulp = require('gulp');
clean = require('gulp-clean');
cssmin = require('gulp-cssmin');
htmlmin = require('gulp-htmlmin');
uglify = require('gulp-uglify');
imagemin = require('gulp-imagemin');
imageminJpegRecompress = require('imagemin-jpeg-recompress');

gulp.task('default', ['copy'], function(){
  gulp.start('build-img', 'build-js', 'build-css', 'build-html');
});

gulp.task('copy', ['clean'], function(){
  return gulp.src([
      'dev/**/*',
      '!dev/styles/**'
  ])
      .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(){
  return gulp.src('dist')
      .pipe(clean());
});

gulp.task('build-img', function(){
  gulp.src('dev/images/**/*')
      .pipe(imagemin([
          imageminJpegRecompress({
              loops: 6,
              min: 40,
              max: 85,
              quality: 'low'
          })
      ]))
      .pipe(gulp.dest('dist/images'));
});

gulp.task('build-js', function(){
  gulp.src('dev/scripts/**/*')
      .pipe(uglify())
      .pipe(gulp.dest('dist/scripts'));
});

gulp.task('build-css', function(){
  gulp.src('dev/styles/*.css')
      .pipe(cssmin())
      .pipe(gulp.dest('dist/styles'));
});

gulp.task('build-html', function(){
  gulp.src('dev/*.php')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('dist'));
});