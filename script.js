// REFERENCE ELEMENTS
const numButtons = document.querySelectorAll(".num-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const allClearButton = document.querySelector(".all-clear-button");

const numbersDisplay = document.querySelector(".display .numbers");
const previousEntryDisplay = document.querySelector(".display .previous-entry");

allClearButton.addEventListener("click", () => {
  entrys.first = "";
  entrys.second = "";
  entrys.operator = "";
  numbersDisplay.textContent = "";
  previousEntryDisplay.textContent = "";
});

operatorButtons.forEach((element) => {
  element.addEventListener("click", insertOperator);
});

numButtons.forEach((element) => {
  element.addEventListener("click", insertNum);
});

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
