var gulp = require("gulp");
var minifyCSS = require("gulp-minify-css");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var gp_concat = require("gulp-concat");
var gp_rename = require("gulp-rename");
var gp_uglify = require("gulp-uglify");
var less = require("gulp-less");
var path = require("path");

gulp.task("style-bootstrap", function() {
  return gulp
    .src(["./public/css/bootstrap.css"])
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(autoprefixer("last 2 version", "safari 5", "ie 8", "ie 9"))
    .pipe(gp_concat("bootstrap.min.css"))
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest("./public/dist/css/"));
});

gulp.task("style-bootstrap-slider", function() {
  return gulp
    .src(["./public/css/bootstrap-slider.css"])
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(autoprefixer("last 2 version", "safari 5", "ie 8", "ie 9"))
    .pipe(gp_concat("bootstrap-slider.min.css"))
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest("./public/dist/css/"));
});

gulp.task("style-fonts", function() {
  return gulp
    .src(["./public/css/fonts.css"])
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(autoprefixer("last 2 version", "safari 5", "ie 8", "ie 9"))
    .pipe(gp_concat("fonts.min.css"))
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest("./public/dist/css/"));
});

gulp.task("style-main", function() {
  return gulp
    .src(["./public/css/main.css"])
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(autoprefixer("last 2 version", "safari 5", "ie 8", "ie 9"))
    .pipe(gp_concat("main.min.css"))
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest("./public/dist/css/"));
});

gulp.task("style-custom", function() {
  return gulp
    .src(["./public/css/style.css"])
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(autoprefixer("last 2 version", "safari 5", "ie 8", "ie 9"))
    .pipe(gp_concat("style.min.css"))
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest("./public/dist/css/"));
});

gulp.task(
  "style",
  ["style-bootstrap", "style-bootstrap-slider", "style-fonts", "style-main", "style-custom"],
  function() {}
);

gulp.task("js-jquery", function() {
  return gulp
    .src(["./public/js/jquery.js", "./public/js/preloader.js"])
    .pipe(sourcemaps.init())
    .pipe(gp_concat("gulp-concat.js"))
    .pipe(gulp.dest("./public/min/"))
    .pipe(gp_uglify())
    .pipe(gp_rename("jquery.min.js"))
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest("./public/dist/js/"));
});

gulp.task("js-app", function() {
    return gulp
      .src(["./public/js/app.js"])
      .pipe(sourcemaps.init())
      .pipe(gp_uglify())
      .pipe(gp_rename("app.min.js"))
      .pipe(sourcemaps.write(""))
      .pipe(gulp.dest("./public/dist/js/"));
});

gulp.task("js-moment", function() {
  return gulp
    .src(["./public/js/moment.js"])
    .pipe(sourcemaps.init())
    .pipe(gp_uglify())
    .pipe(gp_rename("moment.min.js"))
    .pipe(sourcemaps.write(""))
    .pipe(gulp.dest("./public/dist/js/"));
});

gulp.task("js-bootstrap", function() {
  return gulp
    .src(["./public/js/bootstrap.js"])
    .pipe(sourcemaps.init())
    .pipe(gp_uglify())
    .pipe(gp_rename("bootstrap.min.js"))
    .pipe(sourcemaps.write(""))
    .pipe(gulp.dest("./public/dist/js/"));
});

gulp.task("js-bootstrap-slider", function() {
  return gulp
    .src(["./public/js/bootstrap-slider.js"])
    .pipe(sourcemaps.init())
    .pipe(gp_uglify())
    .pipe(gp_rename("bootstrap-slider.min.js"))
    .pipe(sourcemaps.write(""))
    .pipe(gulp.dest("./public/dist/js/"));
});

gulp.task(
  "jsfiles",
  [
    "js-jquery",
    "js-app",
    "js-moment",
    "js-bootstrap",
    "js-bootstrap-slider"
  ],
  function() {}
);

gulp.task("copy-images", function() {
  return gulp
    .src(["./public/images/**"])
    .pipe(gulp.dest("./public/dist/images/"));
});

gulp.task("copy-fonts", function() {
  return gulp
    .src(["./public/fonts/**"])
    .pipe(gulp.dest("./public/dist/fonts/"));
});

gulp.task("copy-readme", function() {
  return gulp.src(["README.md"]).pipe(gulp.dest("./public/dist/"));
});

gulp.task("copy", ["copy-images", "copy-fonts", "copy-readme"], function() {});

// specify watch files here:
gulp.task("watch", function() {
  gulp.watch(
    [
      "./public/js/**.js",
      "./public/css/**",
      "./public/less/**",
      "./public/images/**"
    ],
    ["prod"]
  );
});

gulp.task("prod", ["style", "copy", "jsfiles"], function() {});
gulp.task("default", ["style", "copy", "jsfiles", "watch"], function() {});
