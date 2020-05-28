class RevealOnScroll {
    constructor() {
        console.log("RevealOnScroll constructor() called") // debug log message
        /*querySelector: only selects the first element matching the class*/
        /*querySelectorAll: Returns all element descendants of node that match selectors*/
        this.itemsToReveal = document.querySelectorAll(".feature-item");
        this.hideInitially();   // call function on page load
        this.events();          // call events() on page load
    }

    events() {
        console.log("events() called"); // debug log message
        window.addEventListener("scroll", () => {
            this.itemsToReveal.forEach(el => {
               this.calculateIfScrolledTo(el);
            })
        })
    }

    calculateIfScrolledTo(el) {
        console.log("calculateIfScrolledTo() called");  // debug log message
        // measure vertical distance of the element form the top of the browsers view port
        /*console.log(el.getBoundingClientRect().y);*/

        /*calculate how far the element is scrolled into the browser window in %*/
        let scrollPercent = (el.getBoundingClientRect().y / window.innerHeight) * 100;

        /*add class to the element "el", if the element is scrolled to 75% of viewport height*/
        if (scrollPercent < 75) {
            el.classList.add("reveal-item--is-visible");
        }
    }

    hideInitially() {
        console.log("hideInitially() called");     // debug log message
        /*target the whole set of elements within .feature-item*/

        /*traditional anonymous function*/
        /*"el" = short variable name for "element"*/
        /*this.itemsToReveal.forEach(function (el) {
            element.classList.add("reveal-item");
        })*/

        /*arrow function*/
        /*-> transform the traditional anonymous function above*/
        /*this.itemsToReveal.forEach((el) => {el.classList.add("reveal-item")});*/
        this.itemsToReveal.forEach(el => el.classList.add("reveal-item"));  // add class .reveal-item to all elements
    }
}

export default RevealOnScroll;