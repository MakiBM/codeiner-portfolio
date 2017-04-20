import gulp from 'gulp';
import del from 'del';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';

const onError = err => {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('clean', cb => {
  del(['dist'], cb);
});

gulp.task('main:images', () => {
  return gulp.src('src/assets/images/**/*')
    .pipe(plumber({errorHandler: onError}))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('main:fonts', () => {
  return gulp.src('src/assets/fonts/**/*')
    .pipe(plumber({errorHandler: onError}))
    .pipe(gulp.dest('dist/assets/fonts'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('main:icons', () => {
  return gulp.src('src/assets/icons/**/*')
    .pipe(plumber({errorHandler: onError}))
    .pipe(gulp.dest('dist/assets/icons'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('main:static', ['main:images', 'main:fonts', 'main:icons']);
