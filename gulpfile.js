var gulp     = require('gulp');
var minifier = require('gulp-minifier');
var clean    = require('gulp-clean');
var concat   = require('gulp-concat');
var rename   = require('gulp-rename');

gulp.task('scripts', function () {
    return gulp.src([
            'src/js/**'                    
        ])
        .pipe(concat('bundle.min.js'))
        .pipe(minifier({
            minify: true,
            minifyJS: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function () {
    return gulp.src([
            'src/css/**'            
        ])
        .pipe(concat('style.min.css'))
        .pipe(minifier({
            minify: true,
            minifyCSS: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('index', function () {
    return gulp.src([
            'src/index-dev.html'           
        ])        
        .pipe(minifier({
            minify: true,
            minifyCSS: true,
            collapseWhitespace: true
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src('dist', {
        read: false
    }).pipe(clean());
});

gulp.task('default', ['scripts', 'css'], function () {

});