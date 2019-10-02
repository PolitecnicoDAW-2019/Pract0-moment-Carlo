/* 
Clase en ES6
class AnimalClass {
  constructor(name) {
    this.name = name;
  }
}

const dog = new AnimalClass('siete');
console.log(dog); */

/* */

/* 
Opción 2 - Package con variable global

const zoo = {};
(function(pkg) {
  //console.log(name);
  pkg.Animal = function Animal(name) {
    this.name = name;

    this.getName = function() {
      return this.name;
    };
  };
  pkg.Food = function Food() {};
})(zoo);

function main() {
  const cat = new zoo.Animal('ocho');
  console.log(cat.getName());
}
main(); */

/* 
Opcion 3 - Objeto
const zoo = (function() {
  //console.log(name);
  const myVariablePrivate = 3;

  return {
    Animal: function Animal(name) {
      this.name = name;

      this.getName = function() {
        return this.name;
      };
    },
    Food: function Food() {}
  };
})();

function main() {
  const cat = new zoo.Animal('ocho');
  console.log(cat.getName());
}
main(); */

//  Opción 4 - Patrón revelado
const zoo = (function() {
  //console.log(name);
  const myVariablePrivate = 3;

  function Animal(name) {
    this.name = name;

    this.getName = function() {
      return this.name;
    };
  }
  function Food() {}

  return {
    Animal,
    Food
  };
})();

function main() {
  const cat = new zoo.Animal('ocho');
  console.log(cat.getName());
}
main();
