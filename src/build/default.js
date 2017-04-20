import gulp from 'gulp';

const defaultGulp = [
  'main:html',
  'main:static',
  'main:styles',
  'main:scripts'
];

gulp.task('default', defaultGulp);
