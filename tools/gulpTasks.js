const path = require('path');
const gulp = require('gulp');
const webpack = require('webpack-stream');
const merge = require('merge-stream');
const mergeJSON = require('gulp-merge-json-2');
const webpackProdConfig = require('./webpack.prod.config.js');

const getFolders = require('./utils/getFolders.js');

const scriptsPath = '../src/widgets';


gulp.task('default', () => {

    let specs = {};

    const folders = getFolders(scriptsPath);

    const buildTasks = folders.map(folder => {

        const config = webpackProdConfig(scriptsPath, folder);

        return gulp.src(path.join(scriptsPath, folder, '/main.js'))
            .pipe(webpack(config))
            .pipe(gulp.dest(path.join('../widgets', folder)));
    });

    const specTasks = folders.map(folder => {

        return gulp.src(path.join(scriptsPath, folder, '/spec.json'))
            .pipe(mergeJSON('specs.json', (parsedJson) => {

                    specs[folder] = parsedJson;
                    return specs;
                }
            ))
            .pipe(gulp.dest('../widgets'));
    });

    return merge(buildTasks,specTasks);

});

gulp.task('watch', () => {
    gulp.watch('../src/**/**/**/*.*', ['default']);
});