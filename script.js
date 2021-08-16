const operatorButtons = document.querySelectorAll('[data-operator]');
const numberButtons = document.querySelectorAll('[data-number]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const pointButton = document.querySelector('[data-point]');
const output = document.querySelector('[data-output]');
const percentButton = document.querySelector('[data-percent]');

let canResetOutput = false;
let currentOperation = null;
let firstOperand = '';
let nextOperand = '';

const resetOutput = () => {
  output.textContent = '';
  canResetOutput = false;
};

const appendNumber = (number) => {
  if (output.textContent === '0' || canResetOutput) resetOutput();
  output.textContent += number;
};

numberButtons.forEach((button) => {
  button.addEventListener('click', () => appendNumber(button.textContent));
});

const deleteNumber = () => {
  output.textContent = output.textContent.toString().slice(0, -1);
};

const allClear = () => {
  output.textContent = '0';
  currentOperation = null;
  firstOperand = '';
  nextOperand = '';
};

const addPoint = () => {
  if (canResetOutput) resetOutput();
  if (output.textContent === '') output.textContent = '0';
  if (output.textContent.includes('.')) return;
  if (output.textContent === '') {
    output.textContent = '0.';
  } else {
    output.textContent += '.';
  }
};

const percentToDecimal = () => {
  output.textContent /= 100;
};

const roundOff = (number) => Math.round(number * 100000) / 100000;

// eslint-disable-next-line consistent-return
const keyboardOperatorConvert = (operator) => {
  if (operator === 'x' || operator === '*') return '×';
  if (operator === '/') return '÷';
  if (operator === '+') return '+';
  if (operator === '-') return '-';
};

//* Calculator Logic

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const operate = (operator, a, b) => {
  let firstNum = a;
  let secondNum = b;
  firstNum = Number(firstNum);
  secondNum = Number(secondNum);
  switch (operator) {
    case '+':
      return add(firstNum, secondNum);
    case '-':
      return subtract(firstNum, secondNum);
    case '×':
      return multiply(firstNum, secondNum);
    case '÷':
      if (b === 0) return null;
      return divide(firstNum, secondNum);
    default:
      return null;
  }
};

const evaluate = () => {
  if (currentOperation === null || canResetOutput) return;
  if (currentOperation === '÷' && output.textContent === '0') {
    allClear();
    return;
  }
  nextOperand = output.textContent;
  output.textContent = roundOff(operate(currentOperation, firstOperand, nextOperand));
  currentOperation = null;
};

const setOperation = (operator) => {
  if (currentOperation !== null) evaluate();
  firstOperand = output.textContent;
  currentOperation = operator;
  canResetOutput = true;
};

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => setOperation(button.textContent));
});

const keyboardInput = (e) => {
  if (e.shiftKey) {
    if (e.key === '+') setOperation(keyboardOperatorConvert('+'));
    else if (e.key === '*') setOperation(keyboardOperatorConvert(e.key));
    else if (e.key === '%') percentToDecimal();
  } else if (e.key === 'Escape') allClear();
  else if (e.key === 'Backspace') deleteNumber();
  else if (e.key >= 0 || e.key <= 9) appendNumber(e.key);
  else if (e.key === '=' || e.key === 'Enter') evaluate();
  else if (e.key === '.' || e.code === 'NumpadDecimal') addPoint();
  else if (e.key === 'x' || e.key === '*' || e.key === '+' || e.key === '/' || e.key === '-') setOperation(keyboardOperatorConvert(e.key));

  //! Placing this above <if (e.shiftKey) {}> will repeat percent conversion.
  else if (e.key === '%') percentToDecimal();
};

equalsButton.addEventListener('click', evaluate);
deleteButton.addEventListener('click', deleteNumber);
allClearButton.addEventListener('click', allClear);
pointButton.addEventListener('click', addPoint);
percentButton.addEventListener('click', percentToDecimal);
window.addEventListener('keydown', keyboardInput);

// Light and Dark Mode feature

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

document.documentElement.setAttribute('data-theme', 'light');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}

const switchTheme = (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
};
toggleSwitch.addEventListener('change', switchTheme, false);
