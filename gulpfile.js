var gulp = require('gulp');
// 控制文件版本号
var rev = require('gulp-rev');
// 更新文件引用（因版本号发生变化而需要重新引用文件）
var revRe = require('gulp-rev-replace');
// 分离器、筛选、返回执行
var filter = require('gulp-filter');
// 合并多个同类型文件
var useref = require('gulp-useref');
// 压缩js文件
var uglify = require('gulp-uglify');
// 压缩css文件
var csso = require('gulp-csso');
// 图片压缩
var imagemin = require('gulp-imagemin');

gulp.task('filterIMG', function () {
  return gulp.src('./src/img/*.{png,jpg,gif,ico}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/src/img'));
});

gulp.task('default', ['filterIMG'], function () {
  var jsFilter = filter('**/*.js', {restore: true});
  var cssFilter = filter('**/*.css', {restore: true});
  // '!**/index.html'排除index.html文件
  var indexHtmlFilter = filter(['**/*', '!**/index.html'], {restore: true});
  // gulp.src()src方法是指定需要处理的源文件的路径
  return gulp.src('./index.html')
  // 将同类型引用文件合并
    .pipe(useref())
    // 分离出文件
    .pipe(jsFilter)
    // 压缩js文件
    .pipe(uglify())
    // 将压缩后的文件返回到文档中
    .pipe(jsFilter.restore)
    // 分离CSS文件
    .pipe(cssFilter)
    // 压缩CSS文件
    .pipe(csso())
    // 将压缩后的CSS文件返回
    .pipe(cssFilter.restore)
    // 分离HTML文件
    .pipe(indexHtmlFilter)
    // 将所有文件边上版本号
    .pipe(rev())
    // 返回到文档中
    .pipe(indexHtmlFilter.restore)
    // 替换HTML中的文件引用
    .pipe(revRe())
    // 输出操作后的文件到dis文件夹中
    .pipe(gulp.dest('dist'));
});