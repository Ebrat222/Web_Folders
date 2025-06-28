let display = document.getElementById("display");

function appendToDisplay(input) {
    display.value += input;
}

function undo() {
    if (display.value.length === 0) return;
    display.value = display.value.slice(0, -1);
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    if (display.value.trim() === '') return;

    let lastChar = display.value.slice(-1);
    if (['+', '-', '×', '÷', '.', '%'].includes(lastChar)) return;

    try {
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/%/g, '/100');

        let result = eval(expression);

        if (result === undefined) return;

        display.value = result;
    } catch {
        display.value = '';
    }
}

function percentage() {
    let lastChar = display.value.slice(-1);
    if (/\d/.test(lastChar)) {
        display.value += '%';
    }
}
