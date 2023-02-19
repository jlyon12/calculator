const calcScreen = document.getElementById("output");
const calcBtns = document.querySelectorAll("button");
const decimalBtn = document.getElementById("decimal-btn");
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
		if (
			e.target.className.includes("number-btn") &&
			e.target.id !== "clear-btn" &&
			numberA === null
		) {
			inputSelection.push(e.target.value);
			calcScreen.textContent = inputSelection.join("");
			calcScreen.textContent.includes(".")
				? (decimalBtn.disabled = true)
				: (decimalBtn.disabled = false);
		} else if (
			e.target.className === "operator-btn" &&
			e.target.id !== "enter-btn" &&
			activeOperator === null
		) {
			inputSelection.push(e.target.value);
			activeOperator = inputSelection.pop();
			numberA = Number(
				inputSelection.splice(0, inputSelection.length).join("")
			);
			calcScreen.textContent = numberA;
			calcScreen.textContent.includes(".")
				? (decimalBtn.disabled = true)
				: (decimalBtn.disabled = false);
		} else if (
			e.target.className.includes("number-btn") &&
			e.target.id !== "clear-btn" &&
			numberA !== null
		) {
			inputSelection.push(e.target.value);
			calcScreen.textContent = inputSelection.join("");
			numberB = Number(inputSelection.join(""));
			calcScreen.textContent.includes(".")
				? (decimalBtn.disabled = true)
				: (decimalBtn.disabled = false);
		} else if (
			e.target.className === "operator-btn" &&
			e.target.id !== "enter-btn" &&
			numberA !== null &&
			numberB !== null &&
			activeOperator !== null
		) {
			inputSelection = [];
			numberA = operate(numberA, activeOperator, numberB);
			numberB = Number(inputSelection.join(""));
			activeOperator = e.target.value;
			calcScreen.textContent = numberA;
			calcScreen.textContent.includes(".")
				? (decimalBtn.disabled = true)
				: (decimalBtn.disabled = false);
		} else if (e.target.id === "clear-btn" && numberA === null) {
			inputSelection.pop();
			calcScreen.textContent = Number(inputSelection.join(""));
			calcScreen.textContent.includes(".")
				? (decimalBtn.disabled = true)
				: (decimalBtn.disabled = false);
		} else if (e.target.id === "clear-btn" && numberA !== null) {
			calcScreen.textContent = numberA;
			calcScreen.textContent.includes(".")
				? (decimalBtn.disabled = true)
				: (decimalBtn.disabled = false);
		} else if (
			e.target.id === "enter-btn" &&
			numberA === null &&
			numberB === null
		) {
			if (inputSelection.length === 0) inputSelection.push(0);
			calcScreen.textContent = Number(inputSelection.join(""));
			calcScreen.textContent.includes(".")
				? (decimalBtn.disabled = true)
				: (decimalBtn.disabled = false);
		} else if (e.target.id === "enter-btn") {
			result = operate(numberA, activeOperator, numberB);
			calcScreen.textContent = result;
			inputSelection = [];
			calcScreen.textContent.includes(".")
				? (decimalBtn.disabled = true)
				: (decimalBtn.disabled = false);
		} else if (e.target.id === "ac-btn") {
			inputSelection = [];
			numberA = null;
			numberB = null;
			activeOperator = null;
			calcScreen.textContent = inputSelection;
			calcScreen.textContent.includes(".")
				? (decimalBtn.disabled = true)
				: (decimalBtn.disabled = false);
		} else if (e.target.id === "polarity-btn" && numberA === null) {
			inputSelection[0] = inputSelection[0] * -1;
			calcScreen.textContent = inputSelection.join("");
			calcScreen.textContent.includes(".")
				? (decimalBtn.disabled = true)
				: (decimalBtn.disabled = false);
		} else if (e.target.id === "polarity-btn" && numberA !== null) {
			numberA = numberA * -1;
			calcScreen.textContent = numberA;
			calcScreen.textContent.includes(".")
				? (decimalBtn.disabled = true)
				: (decimalBtn.disabled = false);
		}
	});
});
