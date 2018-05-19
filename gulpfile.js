var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var cleanCss = require("gulp-clean-css");
var autoprefixer = require("gulp-autoprefixer");
var del = require("del");

gulp.task("clean", function() {
    return del(["dist/**/*", "!dist"]);
});

gulp.task("minify:images", function() {
    return gulp
        .src("jekyll-dist/assets/images/*")
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

gulp.task("minify:js", function() {
    return gulp
        .src("jekyll-dist/*.js")
        .pipe(uglify())
        .pipe(
            rename(function(path) {
                path.basename += ".min";
            })
        )
        .pipe(gulp.dest("dist"));
});

gulp.task("minify:css", function() {
    return gulp
        .src("jekyll-dist/*.css")
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"],
                cascade: false
            })
        )
        .pipe(cleanCss())
        .pipe(
            rename(function(path) {
                path.basename += ".min";
            })
        )
        .pipe(gulp.dest("dist"));
});
