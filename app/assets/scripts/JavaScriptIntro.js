/***************************************************************/
/* Example JavaScript code below for educational purposes only */
/***************************************************************/

/*
* Simple console log
* */
console.log("Hello from App.js");
console.log("Hello, my name is John Doe and my favorite color is blue");
console.log("Hello, my name is Jane Smith and my favorite color is green");



/*
* Funciotn calls
* */
function person(name, favColor) {
    console.log("Hello, my name is " + name + " and my favorite color is " + favColor + ".");
}

console.log("call person function by String:");
person("John Doe", "blue");                 // call function with strings
person("Jane Smith", "green");              // call function with strings


/* define and initialize individual variables */
let johnName = "John Doe";
let johnFavColor = "blue";
let janeName = "Jane Smith";
let janeFavColor = "green";

console.log("call person function by variable:");
person(johnName, johnFavColor);                 // call function with strings
person(janeName, janeFavColor);              // call function with strings



/*
* objects, properties, function as a property
* */

/* define and initialize object 'john' and store it within a variable */
let john = {
    name: "John Doe",           // property of the object
    favouriteColor: "blue",     // property of the object
    /*john.greet() - method (=function that belongs to an object)*/
    greet: function () {
        console.log("Hello, my name is " + john.name + " and my favorite color is " + john.favouriteColor + ".");
    }
}

console.log("call person function with object:");
person(john.name, john.favouriteColor);     // call function

/* function calls */
console.log("call john.greet() directly:");
john.greet();



/*
* Person2()
* Blueprint object (= class in other programming languages like Java or C++)
* */

/* constructor */
function Person2(fullName, favColor) {
    this.name = fullName;
    this.favoriteColor = favColor;
    /* define and initialize the method greet */
    this.greet = function () {          /*"this" will be replaced by the inststance variable name*/
        console.log("Hello, my name is " + this.name + " and my favorite color is " + this.favoriteColor + ".");
    }
}

var john2 = new Person2("John Doe", "blue");     // create new instance of the Person object type
console.log("call john2.greet():");
john2.greet();

console.log("call jane2.greet():");
var jane2 = new Person2("Jane Smith", "green");  // create new instance of the Person object type
jane2.greet();



/*
* Person3()
* Import object form File.js
* */
import Person3 from './modules_edu/Person3';     // import Person3 from Person.js file

var john3 = new Person3("John Doe", "black");     // create new instance of the Person object type
console.log("call john3.greet():");
john3.greet();

console.log("call jane3.greet():");
var jane3 = new Person3("Jane Smith", "green");  // create new instance of the Person object type
jane3.greet();



/*
* Person4()
* Class Syntax
* */
import Person4 from './modules_edu/Person4';     // import Person4 from Person.js file

let john4 = new Person4("John Doe", "purple");     // create new instance of the Person object type
console.log("call john4.greet():");
john4.greet();

console.log("call jane4.greet():");
let jane4 = new Person4("Jane Smith", "green");  // create new instance of the Person object type
jane4.greet();



/*
* Person5()
* Class Syntax - Inheritance
* */
import Person5 from './modules_edu/Person5';     // import Person5 from Person.js file

class Adult extends Person5 {
    payTaxes() {
        console.log(this.name + " just paid the taxes.");
    }
}

let john5 = new Person5("John Doe", "purple");     // create new instance of the Person object type
console.log("call john5.greet():");
john5.greet();

console.log("call Adult.greet() (inherited from Person5()):");
let jane5 = new Adult("Jane Smith", "green");  // create new instance of the Person object type
jane5.greet();
console.log("call Adult.payTaxes():");
jane5.payTaxes();
