'use strict';   /* use strict JavaScript mode */


// == imports ==
import '../styles/styles.css'
// import the npm lazysyzes module for lazy-loading images functionality:
// images with the class ".lazyload" and source sets with the attribute "data-srcset" (instead of "srcset") will be loadad on scroll only
import 'lazysizes'                                      
import './JavaScriptIntro'
import MobileMenu from './modules/MobileMenu'           // import MobileMenu class
import RevealOnScroll from './modules/RevealOnScroll'   // import RevealOnScroll class
import StickyHeader from './modules/StickyHeader'       // import StickyHeader class


// == variables ==
// define variables
// let varName;
// let varName = new importClassName();
// let mobileMenu = new MobileMenu();
// let sytickyHeader = new StickyHeader();
let modal;


// == object instance calls ==
new MobileMenu();
new StickyHeader();
/*Reveal-on-scroll by querySelector & thresholdPercentage*/
/*querySelector: only selects the first element matching the class*/
/*querySelectorAll: Returns all element descendants of node that match selectors*/
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75); // creat an Object, which is a new instance of the class RevealOnScroll
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60); // creat an Object, which is a new instance of the class RevealOnScroll

/**
 * lazy-load JavaScript object instance show-case
 */
document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", e => {
        e.preventDefault(); // prevent the default behviour of clicking on a #-link <a href="#">xyz</a>, which scrolles up the page
        if(typeof modal == "undefined") {   // only if the variable has not been initialized yet...
            //import(/* webpackChunkName: "alias" -> alias.bundled.js */ './path/Class').then(execute-after-loading-class).catch(throw-exception)
            // import('./modules/Modal').then(importedFile => {
            import(/* webpackChunkName: "modal" */ './modules/Modal').then(importedFile => {

                modal = new importedFile.default();             // initialize global variable with new instance of the imported Modal class
                setTimeout(() => modal.openTheModal(), 20);     // call the modal.openTheModal() function after a delay of 20ms
            }).catch(() => console.log("There was a problem.")); // throw exception if exectution fails
        } else {
            modal.openTheModal();                               // call method
        }
    });
});


/**
 * webpack-dev-server config - hot module replacement
 */
if (module.hot) {           // if it makes sense to accept (= module is hot == true)...
    module.hot.accept();     // ...accept the hot updates (browser reload on-the-fly)
}