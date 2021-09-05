const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve('resources/js'),
            '@Components': path.resolve('resources/js/Components'),
            '@Layouts': path.resolve('resources/js/Layouts'),
            '@Pages': path.resolve('resources/js/Pages'),
            '@Menu': path.resolve('resources/js/Menu'),
            '@Middleware': path.resolve('resources/js/Middleware'),
        },
    },
};
