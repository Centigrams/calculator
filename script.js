const operatorButtons = document.querySelectorAll('[data-operator]');
const numberButtons = document.querySelectorAll('[data-number]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const pointButton = document.querySelector('[data-point]');
const output = document.querySelector('[data-output]');

let canResetOutput = false;
let currentOperation = null;
let firstOperand = '';
let nextOperand = '';

equalsButton.addEventListener('click', evaluate);
deleteButton.addEventListener('click', deleteNumber);
allClearButton.addEventListener('click', allClear);
pointButton.addEventListener('click', addPoint);

numberButtons.forEach((button) => {
    button.addEventListener('click', () => appendNumber(button.textContent))
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => setOperation(button.textContent))
});

function appendNumber(number) {
    if (output.textContent === '0' || canResetOutput) resetOutput();
    output.textContent += number;
}

function resetOutput() {
    output.textContent = '';
    canResetOutput = false;
}

function deleteNumber() {
    output.textContent = output.textContent.toString().slice(0, -1);
}

function allClear() {
    output.textContent = '0';
    currentOperation = null;
    firstOperand = '';
    nextOperand = '';
}

function addPoint() {
    if (canResetOutput) resetOutput();
    if (output.textContent === '') output.textContent = '0';
    if (output.textContent.includes('.')) return
    if (output.textContent === '') {
        output.textContent = '0.'
    } else {
        output.textContent += '.';
    }
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = output.textContent;
    currentOperation = operator;
    canResetOutput = true;
}

function evaluate() {
    if (currentOperation === null || canResetOutput) return;
    if (currentOperation === "÷" && output.textContent === "0") {
        alert("You can't divide by 0!");
        allClear();
        return;
    }
    nextOperand = output.textContent;
    output.textContent = roundOff(operate(currentOperation, firstOperand, nextOperand));
    currentOperation = null;
}

function roundOff(number) {
    return Math.round(number * 1000) / 1000;
}

//* Calculator Logic

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    /* parseInt() only returns an integer value whereas  
    Number() returns all the digits including floating points. */
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            if (b === 0) return null;
            else return divide(a, b);
        default:
            return null;
    }
}