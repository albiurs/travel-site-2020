'use strict';

import throttle from 'lodash/throttle'  // only import the throttle package from the loadash library
import debounce from 'lodash/debounce'  // only import the debounce package from the loadash library

class RevealOnScroll {
    constructor(elements, thresholdPercent) {
        /*console.log("RevealOnScroll constructor() called"); // debug log message*/
        this.thresholdPercent = thresholdPercent;
        this.itemsToReveal = elements;    // collection of all items to be revealed
        this.browserHeight = window.innerHeight;
        this.hideInitially();   // call function on page load
        /*define scrollThrottle function: throttle(function, throtte-to-time-in-ms).bind(point-to-the-over-all-object-"this")*/
        /*using loadash/debounce*/
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);    // call calcCaller() only every 200ms
        this.events();          // call events() on page load
    }

    /*
    * events()
    * create a method, to list events to watch for
    * */
    events() {
        /*console.log("events() called"); // debug log message*/
        /*trigger reveal-on-scroll */
        /*using lodash/throttle*/
        window.addEventListener("scroll", this.scrollThrottle); // call function

        /*debounced browser height re-calculation, only every 300ms*/
        /*using loadash/debounce*/
        window.addEventListener("resize", debounce(() => {
            /*console.log("debounce() called");*/
            this.browserHeight = window.innerHeight;
        }, 300));   // wait 300ms
    }

    /*
    * calcCaller()
    * call this.calculateIfScrolledTo() for each element
    * */
    calcCaller() {
        /*console.log("calcCaller() called");*/
        this.itemsToReveal.forEach(el => {
            if(el.isRevealed == false) {
                this.calculateIfScrolledTo(el);
            }
        })
    }

    /*
    * callcualteIfScrolledTo()
    * reveal-on-scroll 75%
    * */
    calculateIfScrolledTo(element) {
        /* if scrolled page + window-inner-heigt > current elment's top edge...*/
       if(window.scrollY + this.browserHeight > element.offsetTop) {
           /*console.log("calculateIfScrolledTo(el) called");  // debug log message*/
           // measure vertical distance of the element form the top of the browsers view port
           /*console.log(el.getBoundingClientRect().y);*/

           /*calculate how far the element is scrolled into the browser window in %*/
           /*let scrollPercent = (el.getBoundingClientRect().y / window.innerHeight) * 100; /!*not compatible with Edge*!/*/
           let scrollPercent = (element.getBoundingClientRect().top / this.browserHeight) * 100;    /*change to .top for Edge*/

           /*add class to the element "el", if the element is scrolled to 75% of viewport height*/
           if (scrollPercent < this.thresholdPercent) {
               element.classList.add("reveal-item--is-visible");
               element.isRevealed = true;                           // set flag to true after the element is visible

               /*remove event listener after the last item is revealed*/
               if(element.isLastItem) {
                   window.removeEventListener("scroll", this.scrollThrottle);
               }
           }
       }
    }

    /*
    * hideInitially()
    * Hide the elements by default css rules within .reveal-item
    * */
    hideInitially() {
        /*console.log("hideInitially() called");     // debug log message*/
        /*target the whole set of elements within .feature-item*/

        /*traditional anonymous function*/
        /*"el" = short variable name for "element"*/
        /*this.itemsToReveal.forEach(function (el) {
            element.classList.add("reveal-item");
        })*/

        /*arrow function*/
        /*-> transform the traditional anonymous function above*/
        /*this.itemsToReveal.forEach((el) => {el.classList.add("reveal-item")});*/
        this.itemsToReveal.forEach(el => {
            el.classList.add("reveal-item");    // add class .reveal-item to all elements
            el.isRevealed = false;              // set flag if the element is already visible
        });
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;    // select the last element from the collection
    }
}

export default RevealOnScroll;