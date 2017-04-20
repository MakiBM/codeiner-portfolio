import gulp from 'gulp';

gulp.task('watch', () => {
  // static files
  gulp.watch('src/**/*.html', ['main:html']);
  gulp.watch('src/assets/images/**/*', ['main:images']);
  gulp.watch('src/assets/fonts/**/*', ['main:fonts']);
  gulp.watch('src/assets/icons/**/*', ['main:icons']);
  // scripts
  gulp.watch('src/assets/js/**/*.js', ['main:scripts']);
  // styles
  gulp.watch('src/assets/styles/**/*.scss', ['main:styles']);
});
