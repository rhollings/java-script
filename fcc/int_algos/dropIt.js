/*

Given the array arr, iterate through and remove each element starting from 
the first element (the 0 index) until the function func returns true when the iterated element is passed through it.

Then return the rest of the array once the condition is satisfied, otherwise, arr should be returned as an empty array.

*/

function dropElements(arr, func) {
  while (arr.length > 0 && !func(arr[0])) {
    arr.shift();
  }
  return arr;
}

/*

Use a while loop with Array.prototype.shift() to continue checking and dropping 
the first elementof the array until the function returns true. It also makes sure the array is not empty first to avoid infinite loops.

Return the filtered array.

*/

function dropElements(arr, func) {
  let sliceIndex = arr.findIndex(func);
  return arr.slice(sliceIndex >= 0 ? sliceIndex : arr.length);
}

/*

Use ES6 findIndex() function to find the index of the element that passes the condition
Slice the array from the found index until the end
There is one edge case! if the condition is not met against any of the elements ‘findIndex’ 
will return -1 which messes up the input to slice(). In this case use a simple conditional operator 
to return false instead of -1. And the ternary operator returns the found index of required elements
when the condition is true, and the length of the array otherwise so that the return value is an empty array as is instructed.

*/
