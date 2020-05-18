/*
* constructor prototype
* */
function Person3(fullName, favColor) {
    this.name = fullName;
    this.favoriteColor = favColor;
    /* define and initialize the method greet */
    this.greet = function () {          /*"this" will be replaced by the inststance variable name*/
        console.log("Hello, my name is " + this.name + " and my favorite color is " + this.favoriteColor + ".");
    }
}

/*
* What this file will export, if another file tries to import this file.
* */
export default Person3