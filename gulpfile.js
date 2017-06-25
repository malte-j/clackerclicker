var gulp		=	require('gulp');
var	pug			=	require('gulp-pug');
var	sass		=	require('gulp-sass');
var	jshint		=	require('gulp-jshint');

gulp.task('html', function(){
	return gulp.src('src/*.pug')
	.pipe(pug())
	.pipe(gulp.dest('public'))
});
gulp.task('css', function(){
	return gulp.src('src/css/screen.sass')
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(gulp.dest('public'))
});

gulp.task('watch', function(){
	gulp.watch('src/**/*.pug', ['html']);
	gulp.watch('src/**/*.sass', ['css']);
});

gulp.task('js', function(){
	return gulp.src('src/js/app.js')
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))

}); 

gulp.task('default', ['html', 'css', 'js']);
