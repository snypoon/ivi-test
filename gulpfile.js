'use strict'

var gulp = require('gulp'),
    gp = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create();


gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  }); 
});

gulp.task('pug', function () {
  return gulp.src('src/pug/pages/*.pug')
    .pipe(gp.pug({
      pretty: true
    }))
    .pipe(gulp.dest('build'))
    .on('end',browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src('src/assets/styles/main.scss')
    .pipe(gp.sass.sync({outputStyle: 'compressed'}).on('error', gp.sass.logError))
    .pipe(gp.autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('script',  function () {
  return gulp.src('src/assets/js/*.js')
        .pipe(gp.babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('build/js'))
      });

gulp.task("images", () => {
  return gulp.src('src/assets/img/**/*.*')
    .pipe(gulp.dest('build/images/'));
});


gulp.task('watch', function () {
  gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
  gulp.watch('src/assets/styles/**/*.scss', gulp.series('sass'))
  gulp.watch('src/assets/js/**/*.js', gulp.series('script'))
})

gulp.task('default', gulp.series(
  gulp.parallel('pug', 'sass', 'script', 'images'),
  gulp.parallel('watch', 'serve')
));