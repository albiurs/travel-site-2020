// == constants ==
const path = require('path')    // import/require-in the node.js 'path' module/package in ./node_modules/@types/node/path.d.ts, which is part of the node library

//post-css plugin array
const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')
]


// == modules ==
/**
 * module.exports = {javascript object}
 * set up webpack:
 * -> properties will be exported and used by webpack
 *
 * @type {{output: {path: string, filename: string}, mode: string, entry: string, watch: boolean, module: {rules: [{test: RegExp, use: [string, string, {loader: string, options: {plugins: [((arg: simpleVars.ISimpleVarsCallableArgument) => any) | ((arg: simpleVars.ISimpleVarsArgument) => any) | simpleVars, Plugin<nested.Options> | nested, *]}}]}]}}}
 */
module.exports = {
    entry: './app/assets/scripts/App.js',       // property: js file to be bundled with the object
    output: {                                   // property: create js object, which controls the webpack output file
        /*
        create output of bundled.js file to be imported in index.html:
        <script src="bundled.js"></script>
         */
        filename: 'bundled.js',                 // property: define name of bundled js file
        path: path.resolve(__dirname, 'app')    // property: define abs. path for bundled js file. path.resolve(__dirname=from/current/dir/, 'to/relative/folder')
    },
    /*
    setup dev server object @localhost:portNumber
     */
    devServer: {
        before: function(app, server) {
            server._watch('./app/**/*.html')    // watch for file changes
        },
        contentBase: path.join(__dirname, 'app'),   // property: abs. path to point the dev server
        hot: true,                                  // property: hot module replacement: inject css into javascript into the browsers memory on the fly without the need of reloading the page.
        port: 3000,                                 // property: web-server port
        host: '0.0.0.0'                             // property: make dev server available for all hosts in the local network
    },
    mode: 'development', // current project mode (development or production)
    watch: true,    // Only needed for webpack(npm run build), but not for webpack-dev-server(npm run dev) with devServer.
                    // Watch the entry file declared above and automatically rebuild on change (App.js and also all its import files)
    module: {
        rules: [
            /*
            CSS SUPPORT CONFIG
            "css-loader": "^3.2.0",              // css-import-support for webpack (which only understands js)
            "style-loader": "^1.0.0",            // css-style-support for webpack (which only understands js)
            "postcss-loader": "^3.0.0",          // post-css support for webpack
             */
            {
                test: /\.css$/i,        // only if a file ends in ".css" (regex term)...
                // ...only then use:
                // style-loader module
                // css-loader module
                //      -> 'css-loader' vs 'css-loader?url=false'
                //      -> disable url support of post-css to manage image files manually.
                // post-css-loader module with the plugins (listed in postCSSPlugins const array)
                use: ['style-loader', 'css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
            }
        ]
    }
}