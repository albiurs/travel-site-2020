const path = require('path')    // create abslolute path to the current project folder

module.exports = {
    entry: './app/assets/scripts/App.js',
    output: {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    },
    mode: 'development', // current project mode (development or production)
    watch: true,    // watch and automatically rebuild on change
    module: {
        rules: [
            /*
            style-loader: css-style-support for webpack (which only understands js)
            css-loader: css-import-support for webpack (which only understands js)
             */
            {
                test: /\.css$/i,        // only if a file ends in ".css"...
                use: ['style-loader', 'css-loader']     // ...only then use style-loader and also css-loader module.
            }
        ]
    }
}