/*function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
}

module.exports = {
    expressionCalculator
}*/

function calculate (arr) {
    const [a,operation,b] = arr;
    console.log(a, operation ,b);

    switch (operation) {
        case "*":
            return +a * +b + "";
        case "/":
            return +a / +b + "";
        case "+":
            return +a + +b + "";
        case "-":
            return +a - +b + "";
    }
}

function eval (exp) {
    exp = exp.split(" ");
    let operationIndex;

    while (exp.includes("*") || exp.includes("/")) {
        operationIndex = exp.findIndex((v,i) => v == "*" || v == "/" ? i : false);
        exp.splice(operationIndex-1, 3, calculate([exp[operationIndex - 1], exp[operationIndex], exp[operationIndex + 1]]));
        console.log(exp);
    }

    while (exp.includes("+") || exp.includes("-")) {
        operationIndex = exp.findIndex((v,i) => v == "+" || v == "-" ? i : false);
        exp.splice(operationIndex-1, 3, calculate([exp[operationIndex - 1], exp[operationIndex], exp[operationIndex + 1]]));
        console.log(exp);
    }
}

const exp = "2 + 2 / 2 * 2"
eval(exp)