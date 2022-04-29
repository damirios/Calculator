
function operate(a, b, operator) {
    return operator(a, b);
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return Math.round((a - b) * 10**13) / 10**13;
}

function multiply(a, b) {
    return Math.round((a * b) * 10**13) / 10**13;
}

function divide(a, b) {
    return Math.round((a / b) * 10**13) / 10**13;
}

// =====================================================
let clearTheDisplay = true;
let firstValue = null;
let currentValue = null;
let operation;
let shownValue;
let decimalCheck = true; // if true - decimal point is allowed to put
let operBlock = false; // if true operators are blocked

const digitareaButtons = document.querySelectorAll('.digit');
const digitsButtons = Array.from(digitareaButtons).filter(digit => (!digit.classList.contains('decimal') && !digit.classList.contains('equals')));

const operationButtons = Array.from(document.querySelectorAll('.simple-oper'));
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear-btn');
const decimalButton = document.querySelector('.decimal');

const display = document.querySelector('.display__main');
const displaySecondary = document.querySelector('.display__secondary');


digitsButtons.forEach(digitButton => {
    digitButton.addEventListener('click', (e) => {
        if (clearTheDisplay) {
            display.textContent = '';
            clearTheDisplay = false;
            decimalCheck = true;
            operBlock = false;
        }
        if (display.textContent.length <= 13) {
            const clickedDigit = document.createTextNode(e.target.textContent);
            display.appendChild(clickedDigit);
            shownValue = display.textContent;
        }
    });
});

operationButtons.forEach(operator => {
    operator.addEventListener('click', showResult);
    if (operator.classList.contains('add')) {
        operator.addEventListener('click', () => operation = add);
    } else if (operator.classList.contains('subtract')) {
        operator.addEventListener('click', () => operation = subtract);
    } else if (operator.classList.contains('multiply')) {
        operator.addEventListener('click', () => operation = multiply);
    } else if (operator.classList.contains('divide')) {
        operator.addEventListener('click', () => operation = divide);
    } else {
        console.log("OOPS! Something went wrong!");
    }
});

function showResult(operator) {
    if (operBlock == false) {
        if (firstValue == null) {
            firstValue = +display.textContent;    
            // console.log(typeof(firstTerm));
            // currentValue = display.textContent;
            displaySecondary.textContent = firstValue + ' ' + operator.target.textContent;
        } else {
            currentValue = +display.textContent;
            currentValue = operate(firstValue, currentValue, operation);
            displaySecondary.textContent = currentValue + ' ' + operator.target.textContent;
            display.textContent = currentValue;
            firstValue = currentValue;
            currentValue = null;
        }
        clearTheDisplay = true;
        operBlock = true;
        decimalCheck = false;
    }
}


equalsButton.addEventListener('click', clearAndResult);

function clearAndResult() {
    if (operation && firstValue != null) {
        currentValue = +display.textContent; 
        const operName = getOperationSymbol(operation);
        displaySecondary.textContent = firstValue + ' ' + operName + ' ' + currentValue + ' ' + '=';
        display.textContent = operate(firstValue, currentValue, operation);
        firstValue = null;
        currentValue = null;
        decimalCheck = false;
        operBlock = false;
        clearTheDisplay = true;
    }
}

function getOperationSymbol(operation) {
    if (operation.name == 'add') {
        return '+';
    } else if (operation.name == 'subtract') {
        return '-';
    } else if (operation.name == 'multiply') {
        return '×';
    } else if (operation.name == 'divide') {
        return '/';
    }
}

clearButton.addEventListener('click', clearAll);

function clearAll() {
    display.textContent = 0;
    displaySecondary.textContent = '';
    clearTheDisplay = true;
    firstValue = null;
    currentValue = null;
    operation = undefined;
    decimalCheck = false;
}

decimalButton.addEventListener('click', putDecimalPoint);

function putDecimalPoint() {
    if (decimalCheck == true) {
        display.textContent += '.';
        decimalCheck = false;
        clearTheDisplay = false;
    }
}

