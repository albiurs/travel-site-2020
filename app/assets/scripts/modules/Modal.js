'use strict';

class Modal {

    constructor() {
        console.log('Modal.constructor called');

        this.injectHTML();
        this.modal = document.querySelector(".modal");
        this.openModalButtons = document.querySelectorAll(".open-modal");
        this.closeIcon = document.querySelector(".modal__close");
        this.events();
    }


    /**
     * evetnts()
     * Events triggered after calling the constructor.
     */
    events() {
        // listen for open click
        this.openModalButtons.forEach(el => el.addEventListener("click", e => this.openTheModal(e)));
        
        // listen for close "X" click, calling the function to close the modal / lightbox overlay
        this.closeIcon.addEventListener("click", () => this.closeTheModal());

        // listen for release of any key ("keyup")
        document.addEventListener("keyup",  e => this.keyPressHandler(e));
    }


    /**
     * openTheModal()
     * Triggers the class to make the modal / ligthtbox overlay visible.
     * @param {*} e     Event = Button pressed
     */
    openTheModal(e) {
        console.log('openTheModal called');
        e.preventDefault(); // prevent the default behviour of clicking on a #-link <a href="#">xyz</a>, which scrolles up the page
        this.modal.classList.add("modal--is-visible"); // trigger the class to make the modal / ligthtbox overlay visible
    }


    /**
     * closeTheModal()
     * Closes the modal / lightbox overlay by the removal of the .modal--is-visible class.
     */
    closeTheModal() {
        this.modal.classList.remove("modal--is-visible");
    }


    /**
     * keyPressHandler()
     * Removes the modal / lightbox overlay by pressing the "Esc" key (=27  --> calling the function to close the modal / lightbox overlay.
     * @param {*} e     Event = Key released.
     */
    keyPressHandler(e) {
        if(e.keyCode == 27) {
            this.closeTheModal();
        }
    }


    /**
     * injectHTML()
     * Dynamically injects the modal / lightbox overlay HTML code into the index.html file.
     */
    injectHTML() {
        console.log('injectHTML called');

        // backtick/backquotes = `xxx` -> template literal in backticks/backquotes
        document.body.insertAdjacentHTML('beforeend', `
        <!-- modal / lightbox overlay, hidden by default, activated by event -->
        <div class="modal">
            <div class="modal__inner">
                <h2 class="section-title section-title--blue section-title--less-margin"><img src="assets/images/icons/mail.svg" class="section-title__icon"> Get in <strong>Touch</strong></h2>
                <div class="wrapper wrapper--narrow">
                    <p class="modal__description">We will have an online order system in place soon. Until then, connect with us on any of the platforms below!</p>
                </div>

                <div class="social-icons">
                    <a href="#" class="social-icons__icon"><img src="assets/images/icons/facebook.svg" alt="Facebook"></a>
                    <a href="#" class="social-icons__icon"><img src="assets/images/icons/twitter.svg" alt="Twitter"></a>
                    <a href="#" class="social-icons__icon"><img src="assets/images/icons/instagram.svg" alt="Instagram"></a>
                    <a href="#" class="social-icons__icon"><img src="assets/images/icons/youtube.svg" alt="YouTube"></a>
                </div>
            </div>
            <div class="modal__close">X</div>
        </div>
        <!-- This is the end of the modal / lightbx overlay -->
        `);
    }
}

export default Modal