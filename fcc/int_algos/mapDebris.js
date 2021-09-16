/*

Return a new array that transforms the elements' average altitude into their orbital periods (in seconds).

The array will contain objects in the format {name: 'name', avgAlt: avgAlt}.

You can read about orbital periods on Wikipedia.

The values should be rounded to the nearest whole number. The body being orbited is Earth.

The radius of the earth is 6367.4447 kilometers, and the GM value of earth is 398600.4418 km3s-2.

The formula needed is:

T = 2pie sqrt a3/u (u y shape looking charatcer)

*/

function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  var a = 2 * Math.PI;
  var newArr = [];

  var getOrbPeriod = function(obj) {
    var c = Math.pow(earthRadius + obj.avgAlt, 3);
    var b = Math.sqrt(c / GM);
    var orbPeriod = Math.round(a * b);
    // create new object
    return {name: obj.name, orbitalPeriod: orbPeriod};
  };

  for (var elem in arr) {
    newArr.push(getOrbPeriod(arr[elem]));
  }

  return newArr;
}

// test here
orbitalPeriod([{ name: "sputnik", avgAlt: 35873.5553 }]);

/*

GM and earthRadius are both given to us.
To make the code easier to edit and read, each part of the equation is written separately.
Create newArr to store the orbPeriod's.
a is 2 times pi. The part that is a constant is on the global scope while the rest is part of a function.
Create a function, gerOrbPeriod() that will do the required work for any amount of objects.
c is (earthRadius + avgAlt) to the cube.
b is the square root of c divided by GM.
Create orbPeriod to store the product of a and b, with the Math.round() function applied to round up to the next whole number.
Then we delete the key avgAlt, and add the new key and its value.

*/
