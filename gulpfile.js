var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');

gulp.task('html', ['css'], function(){
    return gulp.src('src/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('public'))
});
gulp.task('css', function(){
    return gulp.src('src/css/screen.sass')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('src/build'))
});

gulp.task('watch', function(){
    gulp.watch('src/**/*.pug', ['html']);
    gulp.watch('src/**/*.sass', ['css']);
});

gulp.task('default', ['html']);
