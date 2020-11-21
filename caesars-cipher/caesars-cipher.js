function rot13(str) {

  function toUniCode(x) {
    return x;
  }

  var arr = str.split("");
  console.log(arr);

  var codes = arr.map(x => x.charCodeAt())
  console.log(codes);

  var newCodes = codes.map(x => {
      if (x < 65 || x > 90) {return x;};
      if (x <= 77) {return x+13;}
      else {return x+13-90+64}
    })
  
  console.log(newCodes)  

  var newArr = newCodes.map(x => String.fromCharCode(x))
  console.log(newArr)
  
  var newStr = newArr.join("")
  console.log(newStr)

  return newStr;
}

rot13("SERR PBQR PNZC");
