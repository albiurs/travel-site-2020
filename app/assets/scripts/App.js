'use strict';   /* use strict JavaScript mode */

import '../styles/styles.css'
import './JavaScriptIntro'
import MobileMenu from './modules/MobileMenu' // import MobileMenu.js into the variable MobileMenu

let mobileMenu = new MobileMenu();  // define variable mobileMenu and initialize with an instance of MobileMenu

/*
webpack-dev-server config - hot module replacement
 */
if (module.hot) {           // if it makes sense to accept (= module is hot == true)...
    module.hot.accept()     // ...accept the hot updates (browser reload on-the-fly)
}