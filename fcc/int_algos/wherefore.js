/*

Make a function that looks through an array of objects (first argument)
and returns an array of all objects that have matching name and value pairs 
(second argument). Each name and value pair of the source object has to be present
in the object from the collection if it is to be included in the returned array.

For example, if the first argument is [{ first: "Romeo", last: "Montague" },
{ first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }],
and the second argument is { last: "Capulet" }, then you must return the third
object from the array (the first argument), because it contains the name and its value,
that was passed on as the second argument.

*/

function whatIsInAName(collection, source) {
  // "What's in a name? that which we call a rose
  // By any other name would smell as sweet.”
  // -- by William Shakespeare, Romeo and Juliet
  var srcKeys = Object.keys(source);

  // filter the collection
  return collection.filter(function(obj) {
    for (var i = 0; i < srcKeys.length; i++) {
      if (
        !obj.hasOwnProperty(srcKeys[i]) ||
        obj[srcKeys[i]] !== source[srcKeys[i]]
      ) {
        return false;
      }
    }
    return true;
  });
}

// test here
whatIsInAName(
  [
    { first: "Romeo", last: "Montague" },
    { first: "Mercutio", last: null },
    { first: "Tybalt", last: "Capulet" }
  ],
  { last: "Capulet" }
);

/*

We filter through the array using .filter().
Using a for loop we loop through each item in the object.
We use a if statement to check if the object in the collection doesn’t
have the key and the property value doesn’t match the value in source.
We return false if the above if statement is correct. Otherwise, we return true;

*/
