/*
Repeat a given string str (first argument) for num times (second argument).
Return an empty string if num is not a positive number
*/

function repeatStringNumTimes(str, num) {
  var accumulatedStr = "";

  while (num > 0) {
    accumulatedStr += str;
    num--;
  }

  return accumulatedStr;
}

// wondering why `return str * num;` does't work like in Python 

/*
Code Explanation

Create an empty string variable to store the repeated word.
Use a while loop or for loop to repeat code as many times as needed according to num
Then we just have to add the string to the variable created on step one, and increase or decrease num depending on how you set the loop.
At the end of the loop, return the variable for the repeated word.
*/
