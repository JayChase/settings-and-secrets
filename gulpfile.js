var gulp = require('gulp'),
	gldr = require('gulp-load-plugins')({ lazy: true });

gulp.task('test', function (callback) {
	return gulp.src(['tests/*.js'], { read: false })
		.pipe(gldr.mocha({ reporter: 'list' }))
		.on('error', gldr.util.log);
});