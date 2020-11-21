function telephoneCheck(str) {
  


  let regexHasLetters = /[^0-9\(\)\- ]/g;
  console.log(str.match(regexHasLetters))
  
  if (str.match(regexHasLetters) !== null) {
    console.log("Contains Invalid Character");
    return false;
    }

  let regexDigits = /[0-9]/g;
  let noDigits = str.match(regexDigits).length;
  console.log(noDigits)
  
  if (noDigits < 10) {
    console.log("Not Enough Digits");
    return false;
  }

  if (noDigits > 11) {
    console.log("Too Many Digits");
    return false;
  }
  
  if (noDigits == 11 && str.charAt(0) !== "1") {
    console.log("Incorrect Country Code")
    return false;
  }

  let regexFormat = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/g;
  if (regexFormat.test(str)) {
    console.log("Valid");
    return true;
  } else {
    console.log("Invalid format");
    return false;
  }

  return true;
}

telephoneCheck("1 555)555-5555");
