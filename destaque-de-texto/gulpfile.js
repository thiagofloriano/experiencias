const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean_css = require('gulp-clean-css');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');

// ENTRADA E SAIDA
const i = {
  sass: './src/sass/*',
  js: './src/js/*',
  html: './src/*'
}

const o = {
  sass: './dist/css/',
  js: './dist/js/',
  html: './dist/'
}

// FUNCOES
const buildCSS = () => {
  return gulp.src(i.sass)
  .pipe( sass().on('error', sass.logError ))
  .pipe( clean_css() )
  .pipe( rename(
			function (path) {
				path.basename += ".min";
			}
		))
  .pipe( gulp.dest(o.sass) )
}

const buildJS = () => {
  return gulp.src(i.js)
  .pipe( uglify() )
  .pipe( rename(
			function (path) {
				path.basename += ".min";
			}
		))
  .pipe( gulp.dest(o.js) )
}

const buildHTML = () => {
  return gulp.src(i.html)
  .pipe( gulp.dest(o.html) )
}

// TAREFAS
gulp.task( 'sass', async () => {
  buildCSS()
} )

gulp.task( 'js', async () => {
  buildJS()
} )

gulp.task('once', async () => {
  buildCSS()
  buildJS()
  buildHTML()
})

gulp.task('watch', async () => {
  gulp.watch(i.sass)
  .on('change', function (file) {
    buildCSS()
    console.log( file );
  });

  gulp.watch(i.js)
  .on('change', function (file) {
    buildJS()
    console.log( file );
  });

  gulp.watch(i.html)
  .on('change', function (file) {
    buildHTML()
    console.log( file );
  });

})
