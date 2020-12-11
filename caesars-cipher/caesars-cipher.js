const inputText = document.getElementById("inputText");
const outputP = document.getElementById("outputText");
const button = document.getElementById("button");

function shiftCodes(arr) {
  return arr.map(x => {
    if (x < 65 || x > 90) { return x; }
    if (x <= 77) { return x + 13; }
    else { return x + 13 - 90 + 64; }
  });
}

function capitalise() {
  inputText.value = inputText.value.toUpperCase();
}

function rot13() {
  var message = inputText.value;
  var codes = message.split("").map(x => x.charCodeAt());
  var newCodes = shiftCodes(codes);
  var newArray = newCodes.map(x => String.fromCharCode(x));
  var newString = newArray.join("");
  outputP.innerHTML = newString;
}

function decipher() {
  inputText.addEventListener("input", capitalise);
  button.addEventListener("click", rot13);
}

decipher();
// rot13("SERR PBQR PNZC")
