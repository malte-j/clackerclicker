var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');

gulp.task('html', function(){
    return gulp.src('src/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('public'))
});
gulp.task('css', function(){
    return gulp.src('src/*.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('public'))
});

gulp.task('watch', function(){
    gulp.watch('src/*.pug', ['html']);
    gulp.watch('src/*.sass', ['css']);
});

gulp.task('default', ['html', 'css']);
