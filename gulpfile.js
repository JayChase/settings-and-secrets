var gulp = require('gulp'),
	del = require('del'),
	gldr = require('gulp-load-plugins')({ lazy: true });

gulp.task('test', function (callback) {
	return gulp.src(['test/*.js'], { read: false })
		.pipe(gldr.mocha({ reporter: 'list' }))
		.on('error', gldr.util.log);
});

gulp.task('watch', function (callback) {	
	gulp.watch(['./**/*.js','test/**/*.js'],['test']);
});

gulp.task('build', ['copy-source-to-build'], function () {

});

gulp.task('copy-source-to-build', ['minify'], function () {
	return gulp.src('./source/*.js')
		.pipe(gulp.dest('dist'));
});

gulp.task('minify', ['clean-dist'], function () {
	return gulp.src('./source/*.js')
		.pipe(gldr.uglify())
		.pipe(gldr.rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist'));
});

gulp.task('clean-dist', ['test'], function () {
	del('dist/**.*');
});

