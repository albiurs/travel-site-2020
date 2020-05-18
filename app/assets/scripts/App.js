import '../styles/styles.css'
import './JavaScriptIntro'

/*
webpack-dev-server config - hot module replacement
 */
if (module.hot) {           // if it makes sense to accept (= module is hot == true)...
    module.hot.accept()     // ...accept the hot updates (browser reload on-the-fly)
}