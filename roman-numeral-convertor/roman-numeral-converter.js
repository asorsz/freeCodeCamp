function convertToRoman(num) {

const M = "M"
const C = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
const X = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
const I = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

let thousands;
let fiveHundreds;
let hundreds;
let fifties;
let tens;
let fives;
let ones;

let rem;

rem = num % 1000;
thousands = num - rem;
num = num - thousands;
thousands = thousands / 1000;
let strThou = M.repeat(thousands)

rem = num % 100
hundreds = num - rem;
num = num - hundreds;
hundreds = hundreds / 100;
let strHun = C[hundreds]

rem = num % 10
tens = num - rem;
num = num - tens;
tens = tens / 10;
let strTen = X[tens]

ones = rem
let strOne = I[ones]

let roman = strThou + strHun + strTen + strOne


return roman;
}

convertToRoman(3999);
