function eval() {
    // Do not use eval!!!
    return;
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

function bracketsValidation (exp) {
    let brackets = exp.map(v => v != "(" && v != ")" ? "" : v).join('');
    let result = brackets;
    let replacedBrackets;
  
    while(replacedBrackets != result) {
        result = brackets;
        brackets = brackets.replace(/\(\)/g, '');
        replacedBrackets = brackets;
    }
    return !replacedBrackets.length;
}

function operationSearching (exp){
    let result;

    try {
        for(let i = 0; i < exp.length; i++) {
            if(exp[i] == "*" || exp[i] == "/") {
                if(isNaN(+exp[i + 1]) || isNaN(+exp[i - 1])) continue;
                result = calculate([exp[i - 1], exp[i], exp[i + 1]]);

                if(result == "error") throw new Error();
                exp.splice(i-1, 3, result);
                i -= 2;
                console.log(exp);
            }
        }
    } catch(error){
        throw new Error();
    }

    for(let i = 0; i < exp.length; i++) {
        if(exp[i] == "+" || exp[i] == "-") {
            if(isNaN(+exp[i + 1]) || isNaN(+exp[i - 1])) continue;
            exp.splice(i-1, 3, calculate([exp[i - 1], exp[i], exp[i + 1]]));
            i -= 2;
            console.log(exp);
        }
    }

    return exp;
}

function expressionCalculator(exprStr) {
    //Приводим строку к массиву цифр и операций
    exp = exprStr.replace(/[\(\)*/+-]/g, " $& ").split(" ").reduce((res,v) => v != "" ? res.concat(v) : res , []);

    //Проверяем корректность поставленных скобок
    if(!bracketsValidation(exp)) throw new Error("ExpressionError: Brackets must be paired");

    //Выполняем все возможные операции, не раскрывая скобок
    try {
        exp = operationSearching(exp);
    } catch(e) {
        throw new Error("TypeError: Division by zero.");
    }

    //Повторяем 3ий шаг, убрав из массива скобки
    try {
        exp = operationSearching(exp.filter(item => item != "(" && item != ")"));
    } catch(e) {
        throw new Error("TypeError: Division by zero.");
    }

    return exp[0];
}

console.log(expressionCalculator(" 77 + 79 / 25 * (  64 * 63 - 89 * 14  ) * 49 "));

module.exports = {
    expressionCalculator
}