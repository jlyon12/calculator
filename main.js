const calcScreen = document.getElementById('output');
const calcBtns = document.querySelectorAll('button');
const numberBtns = document.querySelectorAll('.number-btn');
const operatorBtns= document.querySelectorAll('.operator-btn');
const clearBtn = document.getElementById('clear-btn');
const enterBtn = document.getElementById('enter-btn');


let inputSelection = [];

let numberA = null;
let numberB = null;
let activeOperator = null;
let lastResult = null;

const add = (a,b) => a+b ;
const subtract = (a,b) => a-b ;
const multiply = (a,b) => a*b ;
const divide = (a,b) => {
    if (a === 0 || b === 0 ) {
        return 'ERROR';
    }
    else if (a > 0 && b > 0) {
        return a / b ;
    }
}

const operate = (numA,operator,numB) => {
    if (operator === '+') {
        return add(numA,numB); 
    }
    else if (operator === '-') {
        return subtract(numA,numB);
    }
    else if (operator === '*') {
        return multiply(numA,numB);
    }
    else if (operator === '/') {
        return divide(numA,numB);
    }
}


calcBtns.forEach(button => {
    button.addEventListener('click', (e) => {
    if (e.target.className === 'number-btn' && e.target.id !== 'clear-btn' && numberA === null) {
        inputSelection.push(e.target.value);
        calcScreen.innerText = inputSelection.join('');
    }  
    else if (e.target.className === 'operator-btn' && e.target.id !== 'enter-btn' && activeOperator === null) {
        inputSelection.push(e.target.value);
        calcScreen.innerText = e.target.value;
        activeOperator = inputSelection.pop();
        numberA = Number(inputSelection.splice(0,inputSelection.length).join(''));
    }
    else if (e.target.className === 'number-btn' && e.target.id !== 'clear-btn' && numberA !== null) {
        inputSelection.push(e.target.value);
        calcScreen.innerText = inputSelection.join('');
        numberB = Number(inputSelection.join(''));  
    }
    else if (e.target.className === 'operator-btn' && e.target.id !== 'enter-btn' && numberA !== null && numberB !== null && activeOperator !== null) {
        inputSelection = [];
        calcScreen.innerText = e.target.value;
        numberA = operate(numberA,activeOperator,numberB);
        numberB = Number(inputSelection.join(''));
        activeOperator = e.target.value;
    }
    else if (e.target.id === 'enter-btn' && numberA === null && numberB === null) {
        console.log(numberA);
        console.log(numberB);
        console.log(activeOperator);
        if (inputSelection.length === 0) inputSelection.push(0);

        calcScreen.innerText = inputSelection;
    }
    else if (e.target.id === 'enter-btn') {
        numberA = operate(numberA,activeOperator,numberB);
        calcScreen.innerText = numberA;
        inputSelection = [];
        numberB = 0;     
    }
    else if (e.target.id === "ac-btn") {
        inputSelection = [];
        numberA = null;
        numberB = null;
        activeOperator = null;
        calcScreen.innerText = inputSelection;
    } 
    })
})

