// REFERENCE ELEMENTS
const numButtons = document.querySelectorAll(".num-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const allClearButton = document.querySelector(".all-clear-button");
const clearEntryButton = document.querySelector(".clear-entry-button");
const decimalButton = document.querySelector(".decimal-button");
const minusPlusButton = document.querySelector(".minus-plus-button");
const equalButton = document.querySelector(".equal-button");

const numbersDisplay = document.querySelector(".display .numbers");
const previousEntryDisplay = document.querySelector(".display .previous-entry");

// EVENT LISTENERS
allClearButton.addEventListener("click", clearAllEntry);

clearEntryButton.addEventListener("click", clearEntry);

decimalButton.addEventListener("click", insertDecimal);

minusPlusButton.addEventListener("click", switchSign);

equalButton.addEventListener("click", () => {
  if (!checkOperatorExistance()) {
    evaluateEquation();
    numbersDisplay.textContent = `${entrys.result}`;
    previousEntryDisplay.textContent = "";
  }
});

operatorButtons.forEach((element) => {
  element.addEventListener("click", insertOperator);
});

numButtons.forEach((element) => {
  element.addEventListener("click", insertNum);
});

// FUNCTIONS AND VARIABLES
function checkOperatorExistance() {
  return !entrys.operator;
}

function clearAllEntry() {
  entrys.first = "";
  entrys.second = "";
  entrys.operator = "";
  entrys.result = "";
  numbersDisplay.textContent = "";
  previousEntryDisplay.textContent = "";
}

function clearEntry() {
  if (entrys.result && entrys.first && entrys.second) clearAllEntry();

  if (checkOperatorExistance()) {
    entrys.first = "";
  } else {
    entrys.second = "";
  }
  numbersDisplay.textContent = "";
}

function switchSign() {
  if (entrys.result) {
    entrys.first = entrys.result;
    entrys.second = "";
    entrys.operator = "";
  }

  if (checkOperatorExistance()) {
    if (entrys.first.includes("-")) {
      entrys.first = entrys.first.slice(1);
      numbersDisplay.textContent = numbersDisplay.textContent.slice(1);
    } else {
      entrys.first = `-${entrys.first}`;
      numbersDisplay.textContent = `-${numbersDisplay.textContent}`;
    }
  } else {
    if (entrys.second.includes("-")) {
      entrys.second = entrys.second.slice(1);
      numbersDisplay.textContent = numbersDisplay.textContent.slice(1);
    } else {
      entrys.second = `-${entrys.second}`;
      numbersDisplay.textContent = `-${numbersDisplay.textContent}`;
    }
  }
}

const entrys = {
  first: "",
  operator: "",
  second: "",
  result: "",
};

function insertDecimal() {
  if (entrys.result) return;

  if (checkOperatorExistance() && entrys.first && !entrys.first.includes(".")) {
    entrys.first += ".";
    numbersDisplay.textContent += ".";
  } else if (!checkOperatorExistance() && entrys.second && !entrys.second.includes(".")) {
    entrys.second += ".";
    numbersDisplay.textContent += ".";
  }
}

function insertOperator(event) {
  const getOperator = function () {
    entrys.operator = event.target.dataset.operator;
    numbersDisplay.textContent = "";
    switch (entrys.operator) {
      case "/":
        previousEntryDisplay.innerHTML = `${entrys.first} &divide;`;
        break;
      case "*":
        previousEntryDisplay.innerHTML = `${entrys.first} &times;`;
        break;
      default:
        previousEntryDisplay.innerHTML = `${entrys.first} ${entrys.operator}`;
    }
  };

  if (entrys.first && entrys.second && entrys.operator) {
    evaluateEquation();
    entrys.first = entrys.result;
    entrys.second = "";
    entrys.result = "";
    getOperator();
  }

  if (checkOperatorExistance() && entrys.first) {
    getOperator();
  }
}

function insertNum(event) {
  /* because of switchSign(), i have to make a condition like this, but
  this is nasty code, hope to find a solution for both of problems,
  switching sign of result and clearing if user tries to change the result
  by adding a num for example */
  if (entrys.result && !entrys.second && entrys.operator) {
    entrys.result = "";
  } else if (entrys.result) {
    clearAllEntry();
  }

  if (numbersDisplay.textContent.length >= 12) return;
  numbersDisplay.textContent += event.target.dataset.number;
  if (checkOperatorExistance()) {
    entrys.first += event.target.dataset.number;
  } else {
    entrys.second += event.target.dataset.number;
  }
}

function evaluateEquation() {
  entrys.result = String(operate(entrys.first, entrys.second, entrys.operator));
  // just to make things shorter, this calc has limits
  if (entrys.result.length > 10 && entrys.result.includes(".")) {
    // if result has more than 8 zeros, just reduce the decimal places to 1.
    if (Array.from(entrys.result).filter((num) => num === "0").length > 8) {
      entrys.result = Number(entrys.result).toFixed(1);
    } else {
      entrys.result = Number(entrys.result).toFixed(3);
    }
  }
}

function operate(x, y, operator) {
  x = +x;
  y = +y;
  switch (operator) {
    case "+":
      return x + y;
    case "-":
      return x - y;
    case "*":
      return x * y;
    case "/":
      if (y === 0) return "Error";
      return x / y;
  }
}
