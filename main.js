const screenPrevious = document.getElementById("previous-output");
const screenCurrent = document.getElementById("current-output");
const calcBtns = document.querySelectorAll("button");
const decimalBtn = document.getElementById("decimal-btn");
const acBtn = document.getElementById("ac-btn");

let inputSelection = [];
let numberA = null;
let numberB = null;
let activeOperator = null;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
	if (a === 0 || b === 0) {
		return "LOL, no.";
	} else if (a > 0 && b > 0) {
		return a / b;
	}
};

const operate = (numA, operator, numB) => {
	if (operator === "+") {
		return add(numA, numB);
	} else if (operator === "-") {
		return subtract(numA, numB);
	} else if (operator === "*") {
		return multiply(numA, numB);
	} else if (operator === "÷") {
		return divide(numA, numB);
	}
};

calcBtns.forEach((button) => {
	button.addEventListener("click", (e) => {
		let btnClass = e.target.className;
		let btnId = e.target.id;
		let btnValue = e.target.value;
		function disableDecimal() {
			screenCurrent.textContent.includes(".")
				? (decimalBtn.disabled = true)
				: (decimalBtn.disabled = false);
		}
		function blinkAcBtn() {
			if (screenCurrent.textContent.includes("LOL, no.")) {
				calcBtns.forEach((button) => {
					button.disabled = true;
				});
				acBtn.disabled = false;
				acBtn.classList.add("blink");
				if (screenPrevious.textContent.includes("LOL, no.")) {
					screenPrevious.textContent = "ERROR";
				}
			}
		}
		if (
			btnClass.includes("number-btn") &&
			btnId !== "clear-btn" &&
			numberA === null
		) {
			inputSelection.push(btnValue);
			screenCurrent.textContent = inputSelection.join("");
			disableDecimal();
		} else if (
			btnClass.includes("operator-btn") &&
			btnId !== "enter-btn" &&
			activeOperator === null
		) {
			inputSelection.push(btnValue);
			activeOperator = inputSelection.pop();
			numberA = Number(
				inputSelection.splice(0, inputSelection.length).join("")
			);
			screenPrevious.textContent = `${numberA} ${activeOperator}`;
			screenCurrent.textContent = null;
			disableDecimal();
			blinkAcBtn();
		} else if (
			btnClass.includes("number-btn") &&
			btnId !== "clear-btn" &&
			numberA !== null
		) {
			inputSelection.push(btnValue);
			numberB = Number(inputSelection.join(""));
			screenCurrent.textContent = inputSelection.join("");
			disableDecimal();
		} else if (
			btnClass.includes("operator-btn") &&
			btnId !== "enter-btn" &&
			numberA !== null &&
			numberB !== null &&
			activeOperator !== null
		) {
			inputSelection = [];
			numberA = operate(numberA, activeOperator, numberB);
			if (inputSelection.length > 0) {
				numberB = Number(inputSelection.join(""));
			} else if (inputSelection.length === 0) {
				numberB = numberA;
			}
			activeOperator = btnValue;
			screenPrevious.textContent = `${numberA} ${activeOperator}`;
			screenCurrent.textContent = numberB;
			disableDecimal();
			blinkAcBtn();
		} else if (btnId === "clear-btn" && numberA === null) {
			inputSelection.pop();
			screenCurrent.textContent = Number(inputSelection.join(""));
			disableDecimal();
		} else if (btnId === "clear-btn" && numberA !== null) {
			inputSelection.pop();
			numberB = Number(inputSelection.join(""));
			screenPrevious.textContent = `${numberA} ${activeOperator}`;
			screenCurrent.textContent = inputSelection.join("");
			disableDecimal();
		} else if (btnId === "enter-btn" && numberA === null && numberB === null) {
			if (inputSelection.length === 0) inputSelection.push(0);
			screenPrevious.textContent = Number(inputSelection.join(""));
			disableDecimal();
		} else if (btnId === "enter-btn") {
			if (numberB === null) {
				numberB = numberA;
			}
			result = operate(numberA, activeOperator, numberB);
			screenPrevious.innerText =
				` ${numberA} ${activeOperator} ${numberB}` + " =";
			screenCurrent.textContent = result;
			inputSelection = [];
			numberA = result;
			disableDecimal();
			blinkAcBtn();
		} else if (btnId === "ac-btn") {
			acBtn.classList.remove("blink");
			calcBtns.forEach((button) => {
				button.disabled = false;
			});
			inputSelection = [];
			numberA = null;
			numberB = null;
			activeOperator = null;
			screenPrevious.textContent = null;
			screenCurrent.textContent = null;
			disableDecimal();
		}
		console.log(numberA, numberB);
		console.log(inputSelection);
	});
});
