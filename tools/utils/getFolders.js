const fs = require('fs');
const path = require('path');

module.exports = function (dir) {
    return fs.readdirSync(dir)
      .filter(file => {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
};