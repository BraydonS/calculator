// Get all buttons with class "num" or "op" and the paragraph element which acts as the display
const buttons = document.querySelectorAll('button.num, button.op');
const display = document.querySelector('p#displayText');
//Defines what operations can be done for clarity sake
var Operation;
(function (Operation) {
    Operation["NONE"] = "none";
    Operation["ADD"] = "add";
    Operation["SUBTRACT"] = "sub";
    Operation["MULTIPLY"] = "mul";
    Operation["DIVIDE"] = "div";
})(Operation || (Operation = {}));
;
//TODO Compute this value based off the width of the calculator
const display_num_max_length = 13;
let current_operation = Operation.NONE;
//TODO make a display class to group data and methods related to the display together
let display_value = 0;
let cached_value = 0;
let pending_input = true;
updateDisplay();
// Assign the appropriate callback to each button on the calculator
buttons.forEach((button) => {
    if (button.classList.contains("num")) {
        button.addEventListener('click', handleNumberClick);
    }
    else if (button.classList.contains("op")) {
        button.addEventListener('click', handleOperationClick);
    }
});
/**
 * Handles a number being clicked. If the pending_input flag is set, it means the calculator has just started or
 * an operation was just initiated. If so, the display value is
 * briefly set to zero before appending the clicked number.
 * @param event - The click event object
 */
function handleNumberClick(event) {
    if (pending_input) {
        display_value = 0;
        pending_input = false;
    }
    let num = parseInt(event.target.textContent);
    if (!Number.isNaN(num)) {
        appendToDisplayValue(num);
    }
    updateDisplay();
}
/**
* Handles an operation button being clicked. Clicking an operation button besides the "(c)lear" button will attempt to compute the result of the previously
* selected operation using the value currently displayed and the value cached by said operation. The equals button will obviously do nothing past this point,
* but any other mathematical operation will set the current_operation to that operation.
* @param event - The click event object
*/
function handleOperationClick(event) {
    let button_id = event.target.id;
    if (button_id === "clr") {
        clearAll();
    }
    else {
        //If the user has input the second operand for an operation, and the current operation isn't "none"
        if (pending_input == false && current_operation != Operation.NONE) {
            display_value = performOperation(current_operation, cached_value, display_value);
            current_operation = Operation.NONE;
        }
        // Cache the result of an operation for use once the second operand is entered
        cached_value = display_value;
        switch (button_id) {
            case "add":
                current_operation = Operation.ADD;
                break;
            case "sub":
                current_operation = Operation.SUBTRACT;
                break;
            case "mul":
                current_operation = Operation.MULTIPLY;
                break;
            case "div":
                current_operation = Operation.DIVIDE;
                break;
        }
        //Sets the pending input flag to true, so when the user starts to enter the second operand, the display clears
        pending_input = true;
        updateDisplay();
    }
}
/**
 * Performs the specified operation on two numbers (the calculator part)
 * @param op - The operation to perform.
 * @param val1 - The first value.
 * @param val2 - The second value.
 * @returns The result of the operation.
 */
function performOperation(op, val1, val2) {
    if (op === Operation.ADD) {
        return val1 + val2;
    }
    else if (op === Operation.SUBTRACT) {
        return val1 - val2;
    }
    else if (op === Operation.MULTIPLY) {
        return val1 * val2;
    }
    else if (op === Operation.DIVIDE) {
        return val1 / val2;
    }
}
// Updates the user's display.
// TODO: make this function more generic, and create a seperate function for formatting the numerical result
function updateDisplay() {
    if (display != null) {
        if (display_value.toString().length < display_num_max_length) {
            display.textContent = display_value.toString().slice(0, display_num_max_length);
        }
        else {
            display.textContent = display_value.toExponential(display_num_max_length - 6).toString();
        }
    }
}
/**
 * Appends a number to the display value
 *
 * @param num - The number to append
 */
function appendToDisplayValue(num) {
    if (Math.abs(num) < 10) {
        display_value = (display_value * 10) + num;
    }
}
// Resets the calculator
function clearAll() {
    display_value = 0;
    cached_value = 0;
    current_operation = Operation.NONE;
    pending_input = true;
    updateDisplay();
}
//# sourceMappingURL=script.js.map