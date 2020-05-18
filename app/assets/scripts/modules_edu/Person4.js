/*
* JavaScript Class Syntax
* Note: Technically, bihind the scenes, JavaScript does not use classes and classical inheritance.
* JavaScript is still running based on prototypes.
* */
class Person4 {
    constructor(name, favoriteColor) {
        this.name = name;
        this.favoriteColor = favoriteColor;
    }

    greet() {
        console.log("Hello, my name is " + this.name + " and my favorite color is " + this.favoriteColor + ".");
    }
}

/*
* What this file will export, if another file tries to import this file.
* */
export default Person4