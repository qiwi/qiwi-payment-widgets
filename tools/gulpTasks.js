const path = require('path');
const gulp = require('gulp');
const clean = require('gulp-clean');
const gls = require('gulp-live-server');
const webpack = require('webpack-stream');
const merge = require('merge-stream');
const webpackConfig = require('./webpack.config.js');

const getFolders = require('./utils/getFolders.js');

const scriptsPath = '../src/widgets';



const ENV = process.env.NODE_ENV || 'production';

gulp.task('default', () => {

    let specs = {};

    const folders = getFolders(scriptsPath);

    const buildTasks = folders.map(folder => {

        const config = webpackConfig(scriptsPath, folder, ENV);

        const pathToFolder = path.join('../widgets', folder);

        return gulp.src(path.join(scriptsPath, folder, '/main.js'))
            .pipe(webpack(config))
            .pipe(gulp.dest(pathToFolder));
    });

    return merge(buildTasks);

});

gulp.task('watch', () => {

    const server = gls.new('../server.js');

    gulp.watch('../src/**/**/**/*.*', ['clean','default']);

    server.start();


});

gulp.task('clean', function () {
  return gulp.src('../widgets')
    .pipe(clean({force: true}));
});