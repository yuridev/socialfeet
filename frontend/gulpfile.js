var gulp = require('gulp');
var webserver = require('gulp-webserver');
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');


var paths = {
	temp: 'temp',
	tempVendor: 'temp/vendor',
	index: 'app/index.html'
}

gulp.task('default', ['scripts', 'serve']);

gulp.task('scripts', function() {
	var tempVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(paths.tempVendor));

	var scripts = gulp.src('app/**/*.js').pipe(gulp.dest(paths.temp));

	var tempIndex = gulp.src(paths.index).pipe(gulp.dest(paths.temp));

	tempIndex.pipe(inject(scripts, {relative: true}))
		.pipe(inject(tempVendors, {relative: true, name: 'vendorInject'}))
		.pipe(gulp.dest(paths.temp));
});

gulp.task('serve', function() {
	gulp.src(paths.temp)
	.pipe(webserver({
		//open: true
	}));
});