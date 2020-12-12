  var currency = [
    {name: "ONE HUNDRED", val: 100},
    {name: "TWENTY", val: 20},
    {name: "TEN", val: 10},
    {name: "FIVE", val: 5},
    {name: "ONE", val: 1},
    {name: "QUARTER", val: 0.25},
    {name: "DIME", val: 0.1},
    {name: "NICKEL", val: 0.05},
    {name: "PENNY", val: 0.01}
  ]

function checkCashRegister(price, cash, cid) {

  var change = {status: "", change: []}
  var totalChange = cash - price;
  
  var till = cid.reduce(
    function(acc, curr) {
      acc.total += curr[1];
      acc.[curr[0]] = curr[1];
      acc.total = Math.round(acc.total * 100) / 100
      return acc;
    },
    {total: 0}
  )

 console.log(till)

  if (totalChange > till.total) {
    change.status = "INSUFFICIENT_FUNDS";
    console.log(change);
    return change;
  }

  if (totalChange == till.total) {
    change.status = "CLOSED";
    change.change = cid;
    console.log(change)
    return change;
  }

  var change_arr = currency.reduce(function(acc, curr) {
    var value = 0;
    while (till[curr.name] > 0 && totalChange >= curr.val) {
      totalChange -= curr.val;
      till[curr.name] -= curr.val;
      value += curr.val;

      // Round change to the nearest hundreth deals with precision errors
      totalChange = Math.round(totalChange * 100) / 100;
      value = Math.round(value * 100) / 100;
    }
    // Add this denomination to the output only if any was used.
    if (value > 0) {
      acc.push([curr.name, value]);
    }
    return acc; // Return the current change_arr
  }, []); // Initial value of empty array for reduce

  console.log(change_arr)

  // If there are no elements in change_arr or we have leftover change, return
  // the string "Insufficient Funds"
  if (change_arr.length < 1 || totalChange > 0) {
    change.status = "INSUFFICIENT_FUNDS";
    console.log(change)
    return change;
  }


  change.status = "OPEN";
  change.change = change_arr;
  console.log(change)
  return change;
}

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);