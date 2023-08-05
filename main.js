let firstOperand = null;
let secondOperand = null;
let currentOperator = null;

const digitList = document.querySelectorAll('.digit');
const operatorList = document.querySelectorAll('.operator');
const clearAll = document.querySelector('#clear-all');
const clear = document.querySelector('#clear');
const equal = document.querySelector('#equal');
const resultDisplay = document.querySelector('#result-display');
const divToScroll = document.querySelector('#div-scroll')
const point = document.querySelector('#point')

digitList.forEach((digit) => {
  digit.addEventListener('click', addDigit);
});

function addDigit() {
  resultDisplay.innerText += this.innerText;
  divToScroll.scrollTop = divToScroll.scrollHeight;
}

operatorList.forEach((op) => {
  op.addEventListener('click', addOperator);
});

function addOperator() {
  if (currentOperator === null) {
    resultDisplay.innerText += ` ${this.innerText} `;
    currentOperator = this.innerText;
    divToScroll.scrollTop = divToScroll.scrollHeight;
  } else {
    equalResult();
    resultDisplay.innerText += ` ${this.innerText} `;
    currentOperator = this.innerText;
    divToScroll.scrollTop = divToScroll.scrollHeight;
  }
}

clearAll.addEventListener('click', deleteAll);
function deleteAll() {
  resultDisplay.innerText = '';
  currentOperator = null; // Reset the current operator
}

clear.addEventListener('click', deleteLast);
function deleteLast() {
  const text = resultDisplay.innerText;
  resultDisplay.innerText = text.slice(0, -1);
}

point.addEventListener('click', addPoint);
function addPoint() {
  const text = resultDisplay.innerText;
  const arr = text.split(' ');

  // Check if the last element is a valid operand
  if (!isNaN(arr[arr.length - 1])) {
    // Check if the last operand already contains a decimal point
    if (arr[arr.length - 1].indexOf('.') === -1) {
      resultDisplay.innerText += '.';
    }
  }
}

equal.addEventListener('click', equalResult);

function equalResult() {
  const arr = resultDisplay.innerText.split(' ');

  const operand1 = Number(arr[0]);
  const operand2 = Number(arr[2]);

  if (Number.isFinite(operand1) && Number.isFinite(operand2)) {
    let result;

    switch (currentOperator) {
      case '^':
        result = operand1 ** operand2;
        break;
      case '/':
        if (operand2 === 0) {
          resultDisplay.innerText = '0';
          return;
        }
        result = operand1 / operand2;
        break;
      case '*':
        result = operand1 * operand2;
        break;
      case '-':
        result = operand1 - operand2;
        break;
      case '+':
        result = operand1 + operand2;
        break;
      default:
        return;
    }

    resultDisplay.innerText = result;
    currentOperator = null;
  }
}

