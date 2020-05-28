'use strict';  /* use strict JavaScript mode */

class MobileMenu {
   constructor() {
      /*alert("MobileMenu constructor() called") // test alert message*/
      console.log("MobileMenu constructor() called") // debug log message

       /*spaghetti code example*/
      /*document.querySelector(".site-header__menu-icon").addEventListener("click", function () {
         console.log("The top right icon was clicked.")
      })*/
      // define and initialize fild with DOM querySelector()
      this.menuIcon = document.querySelector(".site-header__menu-icon");
      this.menuContent = document.querySelector(".site-header__menu-content");
      this.siteHeader = document.querySelector(".site-header");
      this.events();    // call the events() method
   }

   /*
   * events()
   * create new method, to list any and all events to watch for
   * */
   events() {
      console.log("events() called");     // debug log message
      /*click on menu icon
      * The toggleTheMenu() function wont be directly called within the addEventListener(), as it would modify the
      * value of the "this" keyword, which is pointing to the current object, the blue-print is creating.
      * addEventListener() wants to modify the "this" keyword to point towards the DOM element that was just clicked on.
      *
      * Arrow function:
      * () => this.toggleTheMenu()
      * The arrow function does not matipulate the value of the "this" keyword, as it's not receiving a direct reference
      * to the called method. An arrow function is called, which is going to execute and toggle the menu. Hence, the
      * "this" keyword is still pinting towards the original object.
      * the arrow function is the equivalent in JavaScript of Lambda in other programming languages */
      this.menuIcon.addEventListener("click", () => this.toggleTheMenu());
   }

   /*
   * toggleTheMenu()
   * */
   toggleTheMenu() {
      console.log("toggleTheMenu() called");    // debug log message

      // classList.toggle()
      // add an additional class to the element if it does not already havde it and
      // remove it, if it alread has the class.
      this.menuContent.classList.toggle("site-header__menu-content--is-visible");
      this.siteHeader.classList.toggle("site-header--is-expanded");
      this.menuIcon.classList.toggle("site-header__menu-icon--close-x");
   }
}

export default MobileMenu;