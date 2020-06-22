// == constants ==
const currentTask = process.env.npm_lifecycle_event;     // = dev or build, depending on the according npm script, currently being executed
const path = require('path');    // import/require-in the node.js 'path' module/package in ./node_modules/@types/node/path.d.ts, which is part of the node library
const {CleanWebpackPlugin} = require('clean-webpack-plugin');   // Plugin to clean dist folder on re-build
const MiniCssExtractPlugin = require('mini-css-extract-plugin');    // Plugin to extract a css file out of the bunled.js
const HtmlWebpackPlugin = require('html-webpack-plugin');           // Plugin to inject hashed filenames into the html code
const fse = require('fs-extra');    // file system extra: adds file system methods that aren't included in the native fs module and adds promise support to the fs methods

//post-css plugin array
const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer')
];


/**
 * RunAfterCompile {}
 * Actions to run after compilation
 */
class RunAfterCompile {
    apply(compiler) {
        compiler.hooks.done.tap('Copy images', function() {
            fse.copySync('./app/assets/images', './docs/assets/images') // one-way-sync: fse.copySync('source', 'dest')
        })
    }
}


// == variables ==

/*
CSS SUPPORT CONFIG
"css-loader": "^3.2.0",              // css-import-support for webpack (which only understands js)
"style-loader": "^1.0.0",            // css-style-support for webpack (which only understands js)
"postcss-loader": "^3.0.0",          // post-css support for webpack
 */
let cssConfig = {
    test: /\.css$/i,        // only if a file ends in ".css" (regex term)...
    // ...only then use:
    // style-loader module
    // css-loader module
    //      -> 'css-loader' vs 'css-loader?url=false'
    //      -> disable url support of post-css to manage image files manually.
    // post-css-loader module with the plugins (listed in postCSSPlugins const array)
    use: ['css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
}

// edit several pages in a loop using the fs-extra plugin
let pages = fse.readdirSync('./app').filter(function(file) {
    return file.endsWith('.html');  // return array with all files ending to .html
}).map(function(page) {             // generate new array based on the previous
    return new HtmlWebpackPlugin({  // array of multiple HtmlWebpackPlugins -> use the plugin once for each template
        filename: page,
        template: `./app/${page}`
    })
})

let config = {
    entry: './app/assets/scripts/App.js',
    // leverage plugins: []
    // HtmlWebpackPlugin({filename: 'index.html', template: './app/index.html'}) -> filename: 'to-be-created', template: 'template-file'
    //plugins: [new HtmlWebpackPlugin({filename: 'index.html', template: './app/index.html'})],
    plugins: pages,
    module: {
        rules: [
            cssConfig
        ]
    }
};


if (currentTask == 'dev') {

    cssConfig.use.unshift('style-loader');      // unshift/add an additional item to the begining of the array cssConfig.use: [xxx] above

    config.output = {                           // property: create js object, which controls the webpack output file
        /*
        create output of bundled.js file to be imported in index.html:
        <script src="bundled.js"></script>
         */
        filename: 'bundled.js',                 // property: define name of bundled js file
        path: path.resolve(__dirname, 'app')    // property: define abs. path for bundled js file. path.resolve(__dirname=from/current/dir/, 'to/relative/folder')
    };

    /*
    setup dev server object @localhost:portNumber
     */
    config.devServer = {
        before: function(app, server) {
            server._watch('./app/**/*.html')    // watch for file changes
        },
        contentBase: path.join(__dirname, 'app'),   // property: abs. path to point the dev server
        hot: true,                                  // property: hot module replacement: inject css into javascript into the browsers memory on the fly without the need of reloading the page.
        port: 3000,                                 // property: web-server port
        host: '0.0.0.0'                             // property: make dev server available for all hosts in the local network
    };

    config.mode = 'development'; // current project mode (development or production)
}

if (currentTask == 'build') {

    // apply backward compatibility of new js code to older web browsers
    config.module.rules.push({  // push/add rules to the end of the config.module.rules[] array
        test: /\.js$/,  // only .js files
        exclude: /(node_modules)/,  // exclude node modules
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    })

    cssConfig.use.unshift(MiniCssExtractPlugin.loader);      // unshift/add an additional item to the beginning of the array cssConfig.use: [xxx] above

    postCSSPlugins.push(require('cssnano'));                 // push/add an additional plugin to the end of the postCssPlugins array above

    config.output = {                           // property: create js object, which controls the webpack output file
        
        filename: '[name].[chunkhash].js',      // automatically create build file name 'main.*.js' with junk hashes for re-caching by browser on re-build
        chunkFilename: '[name].[chunkhash].js', // automatically create build file names 'modal.*.js' and vendors-main.*.js with junk hashes for re-caching by browser on re-build
        path: path.resolve(__dirname, 'docs')   // property: define abs. path for bundled js files. path.resolve(__dirname=from/current/dir/, 'to/relative/folder')
    };

    config.mode = 'production';

    // splitt bundled.js file into chunks (main.js, modal.js and vendor-main.js)
    config.optimization = {
        splitChunks: {chunks: 'all'}
    };

    // leverage plugins within the build process -> push/add items to the end of the config.plugins[] array    
    config.plugins.push(
        new CleanWebpackPlugin(),   // new CleanWebpackPlugin() -> new instance of the plugin to clean the dist folder
        new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}), // new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}) -> new instance of the MiniCssExtractPlugin to create the css file
        new RunAfterCompile()   //
    );
}


module.exports = config;