/*
* <- CHANGE SERVER(:34) BEFORE START ->
* npm init
* npm install --save-dev gulp gulp-sass browser-sync gulp-autoprefixer gulp-cache gulp-clean-css gulp-rimraf gulp-rename gulp-rigger gulp-uglify gulp-rename gulp-image
* */

const path = {
    build: {
        html: './build/',
        js: './build/js/',
        css: './build/css/',
        img: './build/img/',
        fonts: './build/fonts/'
    },
    src: {
        html: './src/*.html',
        php: './src/*.php',
        js: './src/js/*.js',
        style: './src/style/*.scss',
        img: './src/img/**/*.*',
        fonts: './src/fonts/**/*.*'
    },
    watch: {
        html: './src/**/*.html',
        php: './src/**/*.php',
        js: './src/js/**/*.js',
        css: './src/style/**/*.scss',
        img: './src/img/**/*.*',
        fonts: './srs/fonts/**/*.*'
    },
    clean: './build/*'
};

const config = {
    // server: {
    //     baseDir: './build'
    // },
    proxy: "catEnergy.local/build/", // для лок сервера
    notify: false
};

const gulp = require('gulp'),  // подключаем Gulp
    browserSync = require('browser-sync'), // сервер для работы и автоматического обновления страниц
    rigger = require('gulp-rigger'), // модуль для импорта содержимого одного файла в другой
    sass = require('gulp-sass')(require('sass')), // модуль для компиляции SASS (SCSS) в CSS
    autoprefixer = require('gulp-autoprefixer'), // модуль для автоматической установки автопрефиксов
    cleanCSS = require('gulp-clean-css'), // плагин для минимизации CSS
    uglify = require('gulp-uglify'), // модуль для минимизации JavaScript
    cache = require('gulp-cache'), // модуль для кэширования
    rimraf = require('gulp-rimraf'), // плагин для удаления файлов и каталогов
    image = require('gulp-image'), // компрес img
    rename = require('gulp-rename');

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('html:build', function () {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('php:build', function () {
    return gulp.src(path.src.php)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({ stream: true }));
});


gulp.task('css:build', function () {
    return gulp.src(path.src.style)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(path.build.css))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('fonts:build', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('image:build', function () {
    return gulp.src(path.src.img)
        .pipe(cache(
            image({
                optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
                pngquant: ['--speed=1', '--force', 256],
                zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
                jpegRecompress: ['--strip', '--quality', 'medium', '--min', 80, '--max', 100],
                mozjpeg: ['-optimize', '-progressive'],
                gifsicle: ['--optimize'],
                svgo: true // ломает свг из-за чего ломается весь конфиг, решение не нашел :/
            })
        ))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('clean:build', function () {
    return gulp.src(path.clean, { read: false })
        .pipe(rimraf());
});

gulp.task('cache:clear', function () {
    cache.clearAll();
});

gulp.task('build',
    gulp.series('clean:build',
        gulp.parallel(
            'html:build',
            'php:build',
            'css:build',
            'js:build',
            'fonts:build',
            'image:build'
        )
    )
);

gulp.task('watch', function () {
    gulp.watch(path.watch.html, gulp.series('html:build'));
    gulp.watch(path.watch.php, gulp.series('php:build'));
    gulp.watch(path.watch.css, gulp.series('css:build'));
    gulp.watch(path.watch.js, gulp.series('js:build'));
    gulp.watch(path.watch.img, gulp.series('image:build'));
    gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
    // gulp.watch('./*.html').on('change', browserSync.reload);
    // gulp.watch('./*.php').on('change', browserSync.reload);
});

gulp.task('default', gulp.series(
    'build',
    gulp.parallel('webserver','watch')
));