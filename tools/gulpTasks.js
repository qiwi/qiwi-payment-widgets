const path = require('path');
const gulp = require('gulp');
const webpack = require('webpack-stream');
const merge = require('merge-stream');
const mergeJSON = require('gulp-merge-json');
const webpackProdConfig = require('./webpack.prod.config.js');

const getFolders = require('./utils/getFolders.js');

const scriptsPath = '../src/widgets';


gulp.task('default', () => {

    const folders = getFolders(scriptsPath);

    const tasks = folders.map(folder => {

        const config = webpackProdConfig(scriptsPath, folder, 'production');

        return gulp.src(path.join(scriptsPath, folder, '/main.js'))
            .pipe(webpack(config))
            .pipe(gulp.dest(path.join('../widgets', folder)));
    });

    const specs = folders.map(folder => {

        return gulp.src(path.join(scriptsPath, folder, '/metadata.json'))
            .pipe(mergeJSON({
                fileName:'specs.json'
                edit: (parsedJson, file) => {
                    return {
                        [folder]:parsedJson
                    };
                }
            }))
            .pipe(gulp.dest('../widgets'));
    });

    return merge(tasks,specs);

});

gulp.task('watch', () => {
    gulp.watch('../src/**/**/**/*.*', ['default']);
});