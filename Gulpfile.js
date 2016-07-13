const gulp = require('gulp');
const webserver = require('gulp-webserver');
const webpack = require('gulp-webpack');
const babel = require('gulp-babel');
const HtmlWebpackPlugin = require('html-webpack-plugin');
gulp.task('webserver', function () {
    gulp.src('./dist')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});
gulp.task('default', function () {
    "use strict";
    gulp.run('webserver');
    gulp.watch('./src/**/*', ['webpack']);
});

gulp.task('webpack', function () {
    "use strict";
    gulp.src('./src')
        .pipe(webpack({
            entry: './src',
            output: {
                filename: 'index.js'
            },
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel', // 'babel-loader' is also a legal name to reference
                        query: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: './src/index.html'
                })
            ]
        }))
        .pipe(gulp.dest('./dist'));
});