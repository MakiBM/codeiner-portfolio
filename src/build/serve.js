import gulp from 'gulp';
import browserSync from 'browser-sync';

gulp.task('browser-sync', () => {
  const config = {server: {baseDir: './dist'}};
  browserSync(config);
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});

gulp.task('serve', ['default', 'watch', 'browser-sync']);
