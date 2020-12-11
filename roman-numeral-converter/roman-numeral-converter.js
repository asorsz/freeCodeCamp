const M = "M";
const C = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
const X = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
const I = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

const inputBox = document.getElementById('inputNum');
const outputH1 = document.getElementById('output');

function toRoman() {

  let num = inputBox.value;

  let thousands;
  let hundreds;
  let tens;
  let ones;

  let rem;

  rem = num % 1000;
  thousands = num - rem;
  num = num - thousands;
  thousands = thousands / 1000;
  let strThou = M.repeat(thousands);

  rem = num % 100;
  hundreds = num - rem;
  num = num - hundreds;
  hundreds = hundreds / 100;
  let strHun = C[hundreds];

  rem = num % 10;
  tens = num - rem;
  num = num - tens;
  tens = tens / 10;
  let strTen = X[tens]

  ones = rem;
  let strOne = I[ones];

  let roman = strThou + strHun + strTen + strOne;
  outputH1.innerHTML = roman;
}

function convert() {
  inputBox.addEventListener('input', toRoman);
}

convert();
