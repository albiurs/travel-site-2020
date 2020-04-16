const path = require('path')    // create abslolute path to the current project folder

module.exports = {
    entry: './app/assets/scripts/App.js',
    output: {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    },
    mode: 'development', // current project mode (development or production)
    watch: true    // watch and automatically rebuild on change
}