const glob = require('glob');
const winston = require('winston');

module.exports = (app, base) => {
    var path = require('path');
    path = path.join(__dirname, '../');
    let routePath = path + '/controllers/**/*.routes.js';
    glob.sync(routePath).forEach(function (file) {
        require(file)(app, base);
    });
};