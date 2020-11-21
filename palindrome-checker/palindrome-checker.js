function palindrome(str) {
  
  var regex = /[A-Za-z0-9]/g;

  var arr = str.toLowerCase().match(regex);
  console.log(arr)

  let i = 0;
  let j = arr.length - 1;
  let lastI;

  if (arr.length % 2 === 0) {
    lastI = (arr.length / 2) - 1;
   } else {
     lastI = (arr.length / 2) - 1.5;
   }
  
  console.log(i, j, lastI)

  for (i ; i <= lastI ; i++) {
    if (arr[i] !== arr[j]) {
      return false
    }
    j--;
  }
  return true;
}



palindrome("_eye");
