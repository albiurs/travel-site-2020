'use strict';   /* use strict JavaScript mode */

import '../styles/styles.css'
import './JavaScriptIntro'
import MobileMenu from './modules/MobileMenu'           // import MobileMenu class
import RevealOnScroll from './modules/RevealOnScroll'   // import RevealOnScroll class

let mobileMenu = new MobileMenu();  // define variable mobileMenu and initialize with an instance of MobileMenu
let revealOnScroll  = new RevealOnScroll(); // creat an Object, which is a new instance of the class RevealOnScroll

/*
webpack-dev-server config - hot module replacement
 */
if (module.hot) {           // if it makes sense to accept (= module is hot == true)...
    module.hot.accept()     // ...accept the hot updates (browser reload on-the-fly)
}