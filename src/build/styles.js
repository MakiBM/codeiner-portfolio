import gulp from 'gulp';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import minify from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import csscomb from 'gulp-csscomb';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';

const onError = err => {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('main:styles', () => {
  const browsers = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  return gulp
    .src('src/assets/styles/main.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer({browsers: browsers, cascade: false}))
    .pipe(csscomb())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({stream: true}))
    .pipe(minify({keepSpecialComments: 0}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/assets/css'));
});
