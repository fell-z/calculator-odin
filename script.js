// REFERENCE ELEMENTS
const numButtons = document.querySelectorAll(".num-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const allClearButton = document.querySelector(".all-clear-button");
const clearEntryButton = document.querySelector(".clear-entry-button");
const decimalButton = document.querySelector(".decimal-button");
const minusPlusButton = document.querySelector(".minus-plus-button");

const numbersDisplay = document.querySelector(".display .numbers");
const previousEntryDisplay = document.querySelector(".display .previous-entry");

// EVENT LISTENERS
allClearButton.addEventListener("click", () => {
  entrys.first = "";
  entrys.second = "";
  entrys.operator = "";
  numbersDisplay.textContent = "";
  previousEntryDisplay.textContent = "";
});

clearEntryButton.addEventListener("click", () => {
  if (!entrys.operator) {
    entrys.first = "";
  } else {
    entrys.second = "";
  }
  numbersDisplay.textContent = "";
});

decimalButton.addEventListener("click", () => {
  if (!entrys.operator && !entrys.first.includes(".")) {
    entrys.first += ".";
    numbersDisplay.textContent += ".";
  } else if (entrys.operator && !entrys.second.includes(".")) {
    entrys.second += ".";
    numbersDisplay.textContent += ".";
  }
});

minusPlusButton.addEventListener("click", switchSign);

operatorButtons.forEach((element) => {
  element.addEventListener("click", insertOperator);
});

numButtons.forEach((element) => {
  element.addEventListener("click", insertNum);
});

// FUNCTIONS AND VARIABLES
function switchSign() {
  if (!entrys.operator) {
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
};
function insertOperator(event) {
  if (!entrys.operator) {
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
  }
}

function insertNum(event) {
  if (numbersDisplay.textContent.length >= 12) return;
  numbersDisplay.textContent += event.target.dataset.number;
  if (!entrys.operator) {
    entrys.first += event.target.dataset.number;
  } else {
    entrys.second += event.target.dataset.number;
  }
}

function operate(x, y, operator) {
  switch (operator) {
    case "+":
      return x + y;
    case "-":
      return x - y;
    case "*":
      return x * y;
    case "/":
      return x / y;
  }
}
