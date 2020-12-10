const inputText = document.getElementById("testText");
const body = document.querySelector('.main');
const regex = /[A-Za-z0-9]/g;

function removeClass(x) {
  inputText.classList.remove(x);
  body.classList.remove(x);
}

function addClass(x) {
  inputText.classList.add(x);
  body.classList.add(x);
};

function getArr() {
  return inputText.value.toLowerCase().match(regex);
};

function checkLength() {
  if (inputText.value.length === 0) {
    removeClass('red');
    removeClass('green');
  } else if (inputText.value.length === 1) {
    removeClass('red');
    addClass('green');
  } else {
    checkPalindrome();
  }
};

function numChecks(x) {
  if (x % 2 === 0) {
    return (x / 2) - 1;
   } else {
    return (x / 2) - 1.5;
   }
}

function checkPalindrome() {
  let arr = getArr();
  let i = 0;
  let j = arr.length - 1;
  let k = numChecks(arr.length);
  
  for (i ; i <= k ; i++) {
    console.log(arr[i], arr[j]);
    if (arr[i] !== arr[j]) {
      removeClass('green')
      addClass('red')
      return;
    } else {
      removeClass('red')
      addClass('green')
    }
    j--;
  }
}

function palindrome() {
  inputText.addEventListener('input', checkLength);
}

palindrome();
