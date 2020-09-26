function eval() {
    // Do not use eval!!!
    return;
}

function bracketsValidation (exp) {
    let brackets = exp.map(v => v != "(" && v != ")" ? "" : v).join('');
    let result = brackets;
    let replacedBrackets;
    console.log(replacedBrackets, brackets)
  
    while(replacedBrackets != result) {
        result = brackets;
        brackets = brackets.replace(/\(\)/g, '');
        replacedBrackets = brackets;
    }
    return !replacedBrackets.length ? true : false;
}

function expressionCalculator(exp) {
    exp = exp.replace(/[\(\)*/+-]/g, " $& ").split(" ").reduce((res,v) => v != "" ? res.concat(v) : res , []);

    if(!bracketsValidation(exp)) {
        console.log("GOTCHA!")
        throw new Error("ExpressionError: Brackets must be paired");
    }

    let operationIndex;
    
    while (exp.includes("*") || exp.includes("/")) {
        operationIndex = exp.findIndex((v,i) => v == "*" || v == "/" ? i : false);
        exp.splice(operationIndex-1, 3, calculate([exp[operationIndex - 1], exp[operationIndex], exp[operationIndex + 1]]));
    }
    
    if(exp.includes("error")) throw new Error("TypeError: Division by zero.");

    while (exp.includes("+") || exp.includes("-")) {
        operationIndex = exp.findIndex((v,i) => v == "+" || v == "-" ? i : false);
        exp.splice(operationIndex-1, 3, calculate([exp[operationIndex - 1], exp[operationIndex], exp[operationIndex + 1]]));
    }
    return exp[0];
}

module.exports = {
    expressionCalculator
}

function calculate (arr) {
    const [a,operation,b] = arr;

    switch (operation) {
        case "*":
            return parseFloat(a) * parseFloat(b);
        case "/":
            if(b === "0") return "error";
            return parseFloat(a) / parseFloat(b);
        case "+":
            return parseFloat(a) + parseFloat(b);
        case "-":
            return parseFloat(a) - parseFloat(b);
    }
}

//function eval (exp) {
//    exp = exp.split(" ");
//    let operationIndex;
//
//    while (exp.includes("*") || exp.includes("/")) {
//        operationIndex = exp.findIndex((v,i) => v == "*" || v == "/" ? i : false);
//        exp.splice(operationIndex-1, 3, calculate([exp[operationIndex - 1], exp[operationIndex], exp[operationIndex + 1]]));
//        console.log(exp);
//    }
//
//    while (exp.includes("+") || exp.includes("-")) {
//        operationIndex = exp.findIndex((v,i) => v == "+" || v == "-" ? i : false);
//        exp.splice(operationIndex-1, 3, calculate([exp[operationIndex - 1], exp[operationIndex], exp[operationIndex + 1]]));
//        console.log(exp);
//    }
//
//    return exp;
//}
//
//const exp = "2 + 2 / 2 * 2";
//eval(exp)

console.log("2+2 / 2*2".replace(/[*/+-]/g, " $& ").split(" ").reduce((res,v) => v != "" ? res.concat(v) : res , []))