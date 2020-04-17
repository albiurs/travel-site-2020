const path = require('path')    // create absolute path to the current project folder

/*
post-css plugin array
 */
const postCSSPlugins = [
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')
]

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
            "style-loader": "^1.0.0",            // css-style-support for webpack (which only understands js)
            "css-loader": "^3.2.0",              // css-import-support for webpack (which only understands js)
            "postcss-loader": "^3.0.0",          // post-css support for webpack
             */
            {
                test: /\.css$/i,        // only if a file ends in ".css" (regex term)...
                // ...only then use:
                // style-loader module
                // css-loader module
                //      -> 'css-loader' vs 'css-loader?url=false'
                //      -> disable url support of post-css to manage image files manually.
                // post-css-loader module with the plugins (listed in postCSSPlugins const)
                use: ['style-loader', 'css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
            }
        ]
    }
}