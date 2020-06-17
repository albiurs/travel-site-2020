'use strict';   /* use strict JavaScript mode */


// == imports ==
import '../styles/styles.css'
import './JavaScriptIntro'
import MobileMenu from './modules/MobileMenu'           // import MobileMenu class
import RevealOnScroll from './modules/RevealOnScroll'   // import RevealOnScroll class
import StickyHeader from './modules/StickyHeader'       // import StickyHeader class
import Modal from './modules/Modal'                     // import Modal class


// == variables ==
// define variables and initialize by importing a class
let mobileMenu = new MobileMenu();
let sytickyHeader = new StickyHeader();


// == objects ==
new Modal();

/*Reveal-on-scroll by querySelector & thresholdPercentage*/
/*querySelector: only selects the first element matching the class*/
/*querySelectorAll: Returns all element descendants of node that match selectors*/
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75); // creat an Object, which is a new instance of the class RevealOnScroll
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60); // creat an Object, which is a new instance of the class RevealOnScroll


/**
 * webpack-dev-server config - hot module replacement
 */
if (module.hot) {           // if it makes sense to accept (= module is hot == true)...
    module.hot.accept();     // ...accept the hot updates (browser reload on-the-fly)
}