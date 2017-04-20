import gulp from 'gulp';
import plumber from 'gulp-plumber';
import zip from 'gulp-zip';

const onError = err => {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('build:zip', () => {
  const distFiles = [
    '*.html',
    '!index.html',
    'assets/dist/**/*',
    'assets/src/styles/**/*'
  ];

  return gulp.src(distFiles, {base: '.'})
    .pipe(plumber({errorHandler: onError}))
    .pipe(zip('latest.zip'))
    .pipe(gulp.dest('dist/releases'));
});

gulp.task('build', ['default', 'build:zip']);
