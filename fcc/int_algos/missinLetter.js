/*

Find the missing letter in the passed letter range and return it.

If all letters are present in the range, return undefined.

*/

function fearNotLetter(str) {
  for (var i = 0; i < str.length; i++) {
    /* code of current character */
    var code = str.charCodeAt(i);

    /* if code of current character is not equal to first character + no of iteration
        hence character has been escaped */
    if (code !== str.charCodeAt(0) + i) {
      /* if current character has escaped one character find previous char and return */
      return String.fromCharCode(code - 1);
    }
  }
  return undefined;
}

// test here
fearNotLetter("abce");

/*

This solutions makes use of a for loop.
Code of encountered character is stored in code.
It is checked if code of current character is the expected one 
(no characters are skipped) by using the logic - code of current character = code of first character + number of iterations.
If a character is missing, the missing character is found and the final string is returned.
undefined is returned if there is no missing character in the string.

The charCodeAt() method returns the Unicode of the character at the specified index in a string.

The index of the first character is 0, the second character 1, and so on.

*/
