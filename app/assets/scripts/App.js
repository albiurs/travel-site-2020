import '../styles/styles.css'

/*
webpack-dev-server config
 */
if (module.hot) {           // if it makes sense to accept (= module is hot == true)...
    module.hot.accept()     // ...accept the hot updates (browser reload on-the-fly)
}