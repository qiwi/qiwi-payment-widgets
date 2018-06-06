const path = require('path');
const gulp = require('gulp');
const del = require('del');
const gls = require('gulp-live-server');
const plumber = require('gulp-plumber');
const webpack = require('webpack-stream');
const merge = require('merge-stream');
const webpackConfig = require('./webpack.config.js');

const getFolders = require('./utils/getFolders.js');

const scriptsPath = '../src/widgets';

const ENV = process.env.NODE_ENV || 'production';

gulp.task('default', () => {
    let specs = {};

    const folders = getFolders(scriptsPath);

    const buildTasks = folders.map((folder) => {
        const config = webpackConfig(folder, ENV);

        const pathToFolder = path.join('../widgets/widgets', folder);

        return gulp
            .src(path.join(scriptsPath, folder, '/main.js'))
            .pipe(plumber())
            .pipe(webpack(config))
            .pipe(gulp.dest(pathToFolder));
    });

    return merge(buildTasks);
});

gulp.task('watch', () => {
    const server = gls.new('../server.js');

    gulp.watch('../src/**/**/**/*.*', gulp.parallel('clean', 'default'));

    server.start();
});

gulp.task('clean', function () {
    return del([
        '../widgets'
    ], { force: true });
});
