/*
The hasOwnProperty method is defined in Object.prototype,
which can be accessed by Bird.prototype, which can then be accessed by duck. 
This is an example of the prototype chain. In this prototype chain, 
Bird is the supertype for duck, while duck is the subtype.
Object is a supertype for both Bird and duck. 
Object is a supertype for all objects in JavaScript. 
Therefore, any object can use the hasOwnProperty method.
*/



function Dog(name) {
  this.name = name;
}

let beagle = new Dog("Snoopy");

Dog.prototype.isPrototypeOf(beagle);  // yields true

// Fix the code below so that it evaluates to true
beagle.isPrototypeOf(Dog.prototype);
