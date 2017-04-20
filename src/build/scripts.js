import gulp from 'gulp';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import eslint from 'gulp-eslint';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import babelify from 'babelify';
import browserSync from 'browser-sync';

const onError = err => {
  console.log(err);
};

// Lint JavaScript
gulp.task('main:lint', () => {
  return gulp.src('src/assets/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('main:scripts', ['main:lint'], () => {
  const bundler = browserify({
    entries: 'src/assets/js/main.js'
  });

  bundler.transform(babelify);

  bundler.bundle()
    .on('error', onError)
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.reload({stream: true}))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'));
});
