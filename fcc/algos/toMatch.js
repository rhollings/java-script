/*
Return true if the string in the first element of the array contains 
all of the letters of the string in the second element of the array.

For example, ["hello", "Hello"], should return true because all of 
the letters in the second string are present in the first, ignoring case.

The arguments ["hello", "hey"] should return false because the string 
hello does not contain a y.

Lastly, ["Alien", "line"], should return true because all of the 
letters in line are present in Alien.
*/

// why my solution failed 

function mutation(arr) {
  let arr1 = arr[0];
  let arr2 = arr[1];
  arr1.split('');
  arr2.split('');
  let res1 = arr1.toLowerCase();
  let res2 = arr2.toLowerCase();
  for (let i = 0; i < res1.length; i++) {
    for (let j = 0; j < res2.length; j++) {
      if (res1.indexOf(res1[i]) !== res2.indexOf(res2[j])) {
        return false;
      }
      return true;
    }
  }
}

mutation(["hello", "hey"]);


// why their solution worked

function mutation(arr) {
  let test = arr[1].toLowerCase();
  let target = arr[0].toLowerCase();
  for (let i = 0; i < test.length; i++) {
    if (target.indexOf(test[i]) < 0) return false;
  }
  return true;
}

/*
Code Explanation
First we make the two strings in the array lowercase. 
test will hold what we are looking for in target.

Then we loop through our test characters and if any of 
them is not found we return false.

If they are all found, the loop will finish without
returning anything and we get to return true.
*/
