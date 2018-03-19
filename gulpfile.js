var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

var scssPath = './src/scss/**/*.scss';
var htmlPath = './src/*.html';

var scripts = [
  "./src/js/features/global-trackers.js",
  "./src/js/features/starting-and-stopping.js",
  "./src/js/features/animations-upbeat.js",
  "./src/js/features/generating-circles.js",
	"./src/js/index.js"
]; 

gulp.task('sass', function () {
 return gulp.src(scssPath)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./build/css'));
});

gulp.task('html', function () {
 return gulp.src(htmlPath)
  .pipe(gulp.dest('./build/'));
});

gulp.task('js', function () {
 return gulp.src(jsPath)
  .pipe(gulp.dest('./build/js/'));
});

gulp.task('buildScripts', function() {  
  return gulp.src(scripts)
    .pipe(concat('index.js'), {sourceRoot: '/'})
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('build', [
		'sass',
		'html',
		'buildScripts', 
	], function() {  
    	//
	}
);

gulp.task('watch', function () {
  gulp.watch(scssPath, ['sass']);
  gulp.watch(htmlPath, ['html']);
  gulp.watch(scripts, ['buildScripts']);
});