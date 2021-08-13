/*

The variable watchList holds an array of objects with information
on several movies. Use a combination of filter and map on watchList
to assign a new array of objects with only title and rating keys. 
The new array should only include objects where imdbRating is greater 
than or equal to 8.0. Note that the rating values are saved as strings
in the object and you may need to convert them into numbers to perform
mathematical operations on them.

*/

var filteredList = watchList
  .map(movie => {
    return {
      title: movie.Title,
      rating: movie.imdbRating
    };
  })
  .filter(movie => {
    return parseFloat(movie.rating) >= 8.0;
  });


/*

Write your own Array.prototype.myFilter(), 
which should behave exactly like Array.prototype.filter(). 
You should not use the built-in filter method.
The Array instance can be accessed in the myFilter method using this.

*/

  let newArray = [];
  this.forEach(function(x) {
    if (callback(x) == true) {
      newArray.push(x);
    }
  });
