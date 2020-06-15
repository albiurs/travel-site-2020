'use strict';

import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector(".site-header");
        this.pageSections = document.querySelectorAll(".page-section");
        this.browserHeight = window.innerHeight;
        this.previousScrollY = window.scrollY;
        this.CurrenScrollDirection = 'down';
        this.events();
    }


    /**
     * events()
     * Events to run with the constructor
     */
    events() {
        /*console.log("events() called"); // debug log message*/
        // While scrolling, call this.runOnScroll() throtteled every 200ms using loadash/throttle
        window.addEventListener("scroll", throttle(() => this.runOnScroll(), 200));

        /*debounced browser height re-calculation, only every 300ms*/
        /*using loadash/debounce*/
        window.addEventListener("resize", debounce(() => {
            /*console.log("debounce() called");*/
            this.browserHeight = window.innerHeight;
        }, 300));   // wait 300ms
    }

    /**
     * runOnScroll()
     */
    runOnScroll() {
        /*console.log("events() called"); // debug log message*/
        this.determineScrollDirection();

        // change bg-col dependent on scroll pos -> _site-header.css
        if (window.scrollY > 60) {
            this.siteHeader.classList.add("site-header--dark");
        } else {
            this.siteHeader.classList.remove("site-header--dark");
        }

        // continuoussly call this.calcSection(for-each-.page-section) while scrolling
        this.pageSections.forEach(el => this.calcSection(el));
    }


    /**
     * determineScrollDirection()
     * Determines the scroll direction up/down and updates the according variable
     */
    determineScrollDirection() {
        if (window.scrollY > this.previousScrollY) {
            this.CurrenScrollDirection = 'down';
        } else {
            this.CurrenScrollDirection = 'up';
        }

        // update var of previous windwos.scrollY to current value before the next scroll direction re-calculation
        this.previousScrollY = window.scrollY;
    }


    /**
     * calcSection()
     * Updates the css class .is-current-link according to the current visible area in the viewport.
     * @param {*} el    page section (div's) with .page-section class
     */
    calcSection(el) {
        // if(the visible area is between the element's top edge and the element's bottom edge) {...}
        // if(the element's top edge is at least scrolled into the viewport && the bottom edge of the element did not scrolled past the viewport yet) {...}
        if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
            // Calculate the percentage, the element is scrolled into the viewport.
            // The getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
            let scrollPercent = el.getBoundingClientRect().y / this.browserHeight * 100;
            
            // If (the mathching page section gets visible) {...}
            if ((scrollPercent < 18 && scrollPercent > -0.1 && this.CurrenScrollDirection == 'down') ||
                (scrollPercent < 33 && this.CurrenScrollDirection == 'up')) {
                    // get the matching navigation link, referenced by the .page-section's 'data-matching-link="#our-sectiionName-link"' attribute
                    let matchingLink = el.getAttribute("data-matching-link");
                    
                    // select any .primary-nav-descendant-link-element that is NOT a matching link -> and remove the class "is-current-link" form each of the elements.
                    document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove("is-current-link"));
                    
                    // add .is-current-link to the according matching link
                    document.querySelector(matchingLink).classList.add("is-current-link");
            }
        }
    }
}

export default StickyHeader;