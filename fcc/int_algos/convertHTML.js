/*

Convert the characters &, <, >, " (double quote), and ' (apostrophe), in a string to their corresponding HTML entities.

*/


function convertHTML(str) {
  // Split by character to avoid problems.

  var temp = str.split("");

  // Since we are only checking for a few HTML elements, use a switch

  for (var i = 0; i < temp.length; i++) {
    switch (temp[i]) {
      case "<":
        temp[i] = "&lt;";
        break;
      case "&":
        temp[i] = "&amp;";
        break;
      case ">":
        temp[i] = "&gt;";
        break;
      case '"':
        temp[i] = "&quot;";
        break;
      case "'":
        temp[i] = "&apos;";
        break;
    }
  }

  temp = temp.join("");
  return temp;
}

//test here
convertHTML("Dolce & Gabbana");

/*

Assign temp to str.split(''), which creates an array containing each individual character in the passed in string.
Pass each character in the newly created array into a switch() statement.
Replace the HTML entities with their corresponding HTML entity string (i.e. '&' becomes '&amp;' in line 51)
temp.join('') converts the array of characters into a string to be returned.

*/
