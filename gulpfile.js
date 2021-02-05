const gulp = require('gulp'); // gulp呼び出し
const sass = require('gulp-sass'); // sass
const cache = require('gulp-cached');
const progeny = require('gulp-progeny');
const plumber = require('gulp-plumber'); // エラー発生時の強制終了防止
const notify = require('gulp-notify'); // エラーがでた時にデスクトップに通知
const sassGlob = require('gulp-sass-glob'); //@importの統合
const browserSync = require( 'browser-sync' ); // 自動でブラウザをリロード
const postcss = require('gulp-postcss');  // autoprefixerと一緒に使う
const autoprefixer = require('autoprefixer');  // ベンダープレフィックス付与

sass.compiler = require('sass'); // dart-sassの設定
const fiber = require('fibers');

// コンパイル
gulp.task('sass', function() {
    return gulp
    .src('./sass/**/*.scss')
    .pipe( sass({
        fiber: fiber,
        outputStyle: 'expanded'
    }))
    .pipe(cache('style'))
    .pipe(progeny())
    .pipe( postcss([ autoprefixer(
        {
            "overrideBrowserslist": ["last 2 versions", "ie >= 11", "Android >= 5"],
            cascade: false    
        }
    )]))
    .pipe( plumber(
        {
            errorHandler: notify.onError('Error: <%= error.message %>')
        }
    ))
    .pipe( sassGlob())
    .pipe(gulp.dest('./css'));
});

// リロード
gulp.task( 'browser-sync', function(done) {
    browserSync.init({
    
        //ローカル開発
        server: {
        baseDir: "./",
        index: "index.html"
        }
    });
    done();
});
    
gulp.task( 'bs-reload', function(done) {
    browserSync.reload();
    done();
});

// 監視
gulp.task( 'watch', function(done) {
    gulp.watch( './sass/**/*.scss', gulp.task('sass') ); 
    gulp.watch('./sass/**/*.scss', gulp.task('bs-reload')); 
    gulp.watch( './js/*.js', gulp.task('bs-reload') ); 
});

// default
gulp.task('default', gulp.series(gulp.parallel('browser-sync', 'watch')));
