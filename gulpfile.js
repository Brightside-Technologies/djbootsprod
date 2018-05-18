var gulp = require("gulp");
var imagemin = require("gulp-imagemin");

gulp.task("default", function() {
    console.log("default task");
});

gulp.task("minify:images", function() {
    return gulp
        .src("src/jekyll/assets/images/*")
        .pipe(
            imagemin(
                [
                    imagemin.gifsicle({ interlaced: true }),
                    imagemin.jpegtran({ progressive: true }),
                    imagemin.optipng({ optimizationLevel: 5 }),
                    imagemin.svgo({
                        plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
                    })
                ],
                { verbose: true }
            )
        )
        .pipe(gulp.dest("dist/assets/images"));
});
