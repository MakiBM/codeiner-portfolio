import gulp from 'gulp';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import fileInclude from 'gulp-file-include';

const onError = err => {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('main:html', () => {
  return gulp.src('src/*.html')
    .pipe(plumber({errorHandler: onError}))
    .pipe(fileInclude({basepath: 'src/partials'}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream: true}));
});
