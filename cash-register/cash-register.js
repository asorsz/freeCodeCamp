const REGISTER_STATUS = {"closed": "CLOSED",
  "open": "OPEN",
  "shortfall": "INSUFFICIENT FUNDS"
};
const CURRENCY_VALUES = {
  "ONE HUNDRED": 100,
  "TWENTY": 20,
  "TEN": 10,
  "FIVE": 5,
  "ONE": 1,
  "QUARTER": 0.25,
  "DIME": 0.1,
  "NICKEL": 0.05,
  "PENNY": 0.01
};

const cashRegisterIDs = {
  "ONE HUNDRED": "Hundreds",
  "TWENTY": "Twenties",
  "TEN": "Tens",
  "FIVE": "Fives",
  "ONE": "Ones",
  "QUARTER": "Quarters",
  "DIME": "Dimes",
  "NICKEL": "Nickels",
  "PENNY": "Cents"
}

const changeIDs = {
  "ONE HUNDRED": "changeHundreds",
  "TWENTY": "changeTwenties",
  "TEN": "changeTens",
  "FIVE": "changeFives",
  "ONE": "changeOnes",
  "QUARTER": "changeQuarters",
  "DIME": "changeDimes",
  "NICKEL": "changeNickels",
  "PENNY": "changeVents"
}

const button = document.getElementById("calculateChange");
const statusArea = document.getElementById("status");

function getChangeAvailable(cashInDrawer) {
  return cashInDrawer
  .reduce((acc, curr) => acc += curr[1], 0)
  .toFixed(2);
}

function getRegisterStatus(changeNeeded, changeAvailable) {
  if (Number(changeNeeded) > Number(changeAvailable)) {
    return REGISTER_STATUS.shortfall;
  } else if (Number(changeNeeded) < Number(changeAvailable)) {
    return REGISTER_STATUS.open;
  } else {
    return REGISTER_STATUS.closed;
  }
}

function getChange(changeNeeded, cashInDrawer) {
  let change = [];
  for (let i = cashInDrawer.length - 1; i >= 0; i--) {
    const currName = cashInDrawer[i][0];
    const currTotal = cashInDrawer[i][1];
    const currValue = CURRENCY_VALUES[currName];

    let currAmount = (currTotal / currValue).toFixed(2);
    let currToReturn = 0;

    while (changeNeeded >= currValue && currAmount > 0) {
      changeNeeded = (changeNeeded - currValue).toFixed(2);
      currAmount--;
      currToReturn++;
    }

    if (currToReturn > 0) {
      change.push([currName, currToReturn * currValue])
    }

  }
  return change;
}

function checkCashRegister(price, cash, cid) {
  let cashRegister = { "status": "", "change": cid };
  const changeNeeded = parseFloat(cash - price).toFixed(2);
  const changeAvailable = getChangeAvailable(cid);

  cashRegister.status = getRegisterStatus(changeNeeded, changeAvailable);

  if (cashRegister.status === REGISTER_STATUS.shortfall) {
    cashRegister.change = [];
    statusArea.classList.add("text-danger");    
  } else if (cashRegister.status === REGISTER_STATUS.closed) { 
    cashRegister.change = [...cid];
    statusArea.classList.add("text-warning")
  } else {
    cashRegister.change = getChange(changeNeeded, cid);
    statusArea.classList.add("text-success")  
  }
  statusArea.innerHTML = cashRegister.status
  
  pushChangeOutputs(cashRegister);
  return cashRegister;
}

function pushChangeOutputs(cashRegister) {
  cashRegister.change.forEach((denom, x) => {
    let outputID = "change" + cashRegisterIDs[denom[0]];
    document.getElementById(outputID).value = denom[1];
  });
}

function getCRInputs() {
  var inputs = [["PENNY", 0], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0],
  ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]

  for (let i = 0; i < inputs.length; i++) {
    inputID = cashRegisterIDs[inputs[i][0]].toLowerCase();
    inputs[i][1] = Number(document.getElementById(inputID).value);
  }
return inputs
}

function getPPInput() {
  return document.getElementById("purchasePrice").value;
}

function getATInput() {
  return document.getElementById("amountTendered").value
}

function runProgram() {
  checkCashRegister(getPPInput(), getATInput(), getCRInputs());
}

function listeners() {
  button.addEventListener("click", runProgram);
}

listeners();


