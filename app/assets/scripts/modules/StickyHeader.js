//'use strict';

import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector(".site-header");
        this.pageSections = document.querySelectorAll(".page-section");
        this.browserHeight = window.innerHeight;
        this.previousScrollY = window.scrollY;
        this.events();
    }

    /**
     * events()
     * Events to run with the constructor
     */
    events() {
        /*console.log("events() called"); // debug log message*/
        // run this.runOnScroll() after waiting 200ms
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

        if (window.scrollY > 60) {
            this.siteHeader.classList.add("site-header--dark");
        } else {
            this.siteHeader.classList.remove("site-header--dark");
        }

        this.pageSections.forEach(el => this.calcSection(el));
    }


    determineScrollDirection() {
        if (window.scrollY > this.previousScrollY) {
            this.scrollDirection = 'down';
        } else {
            this.scrollDirection = 'up';
        }
        this.previousScrollY = window.scrollY;
    }


    calcSection(el) {
        // if(the visible area is between the element's top edge && the element's bottom edge) {...}
        if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
            // Calculate the percentage, the element is scrolled into the viewport.
            // The getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
            let scrollPercent = el.getBoundingClientRect().y / this.browserHeight * 100;
            // If (the mathching page section gets visible) {...}
            if ((scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == 'down') ||
                (scrollPercent < 33 && this.scrollDirection == 'up')) {
                let matchingLink = el.getAttribute("data-matching-link");
                // select any .primary-nav-element that is NOT a matching link -> and remove the class "is-current-link" form each element.
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove("is-current-link"));
                // add .is-current-link to the according matching link
                document.querySelector(matchingLink).classList.add("is-current-link");
            }
        }
    }
}

export default StickyHeader;