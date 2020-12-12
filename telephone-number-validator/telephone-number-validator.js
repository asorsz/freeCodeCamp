const inputText = document.getElementById("phoneNumber");
const button = document.getElementById("validate");
const outputP = document.getElementById("validationText");

function getTextClass(str) {
  let regexHasLetters = /[^0-9\(\)\- ]/g;
    
  if (str.match(regexHasLetters) !== null) {
    return ["Contains invalid character(s)", "text-danger"];
    }

  let regexDigits = /[0-9]/g;
  let noDigits = str.match(regexDigits).length;
  console.log(noDigits)
  
  if (noDigits < 10) {
    console.log("Not Enough Digits");
    return ["Not enough digits", "text-danger"];
  }

  if (noDigits > 11) {
    console.log("Too Many Digits");
    return ["Too many digits", "text-danger"];
  }
  
  if (noDigits == 11 && str.charAt(0) !== "1") {
    console.log("Incorrect Country Code")
    return ["Incorrect country code", "text-danger"];
  }

  let regexFormat = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/g;
  if (regexFormat.test(str)) {
    console.log("Valid");
    return ["Valid", "text-success"];
  } else {
    console.log("Invalid format");
    return ["Invalid format", "text-danger"];
  }
}

function clearText() {
  outputP.innerHTML = "";
  outputP.classList.remove("text-danger", "text-success");
}

function telephoneCheck() {
  let status = getTextClass(inputText.value);
  outputP.innerHTML = status[0];
  outputP.classList.add(status[1]);
}

function listen() {
  inputText.addEventListener("input", clearText)
  button.addEventListener("click", telephoneCheck)
}

listen();
