class Person {
	constructor(name) {
		this.name = name;
	}

	greet(name) {
		setTimeout(() => {
			console.log("Hello", name, "!");
			console.log("My name is", this.name);
		}, 5000);
	}

	getName() {
		return this.name;
	}
}

const person = new Person("Jesus");

console.log(person.getName()); // Jesus

const getName = person.getName;

// console.log(getName()); // Error

const person2 = { name: "Joaquin", getName };

console.log(person2.getName()); // Joaquin

// el valor de "this" es el Objeto que se encuentra a la izquierda de la
// llamada/invocación de la función.

person.greet("Julian");
