/*

Return true if the given string is a palindrome. Otherwise, return false.

A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.

Note: You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) and turn everything into the same case (lower or upper case) in order to check for palindromes.

We'll pass strings with varying formats, such as racecar, RaceCar, and race CAR among others.

We'll also pass strings with special symbols, such as 2A3*3a2, 2A3 3a2, and 2_A3*3#A2.

*/

function palindrome(str) {
  var string = str.toLowerCase().split(/[^A-Za-z0-9]/gi).join(''); // transform all to lower case, then split by all non alpha-numeric chars
  var alp = string.split(''); 
  if (alp.join('') === alp.reverse().join('')) { //checks if the first char equals last 
    return true;
  }
  return false;
}



palindrome("eye");

/*

[^A-Za-z0-9]/gi 
g - global search/ i - case insensitive 
^ - matches beginging of input

*/
