
function myEval(expression) {
    let expressionAsAST = constructAST(parseExp(expression));
    return typeof expressionAsAST === 'string' ? parseFloat(expressionAsAST) : evalAST(expressionAsAST);
}

/*
Receive an expression as string a return the expression expressed as array. Each entry of the array is an operator or a term.
Example: parseExp("10 * (2+5) * 10") -> ['10', '*', '(2+5)', '*', 10]
*/
function parseExp(expression) {
    expression = expression.replaceAll(" ", "");
    let actualDigit = '';
    let actualExpression = '';
    let expressionAsArray = [];
    let parentheses = 0;
    for (let index = 0; index < expression.length; index++) {
        actualChar = expression[index];
        if (actualChar == ')') {
            actualExpression += actualChar;
            parentheses -= 1;
            if (parentheses == 0) {
                expressionAsArray.push(actualExpression);
                actualExpression = '';
            }
        } else if (actualChar == '(') {
            actualExpression += actualChar;
            parentheses += 1;
        } else if (parentheses > 0) {
            actualExpression += actualChar;
        } else if (/[\/*+-]/.test(actualChar)) {
            expressionAsArray.push(actualChar);
        } else if (/\d|\./.test(actualChar)) {
            actualDigit += actualChar;
            if (index == expression.length - 1 || !(/\d|\./.test(expression[index + 1]))) {
                expressionAsArray.push(actualDigit);
                actualDigit = '';
            }
        }
    }
    return expressionAsArray;
}

// Precedence of operators.
const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2
};

/* Receive an expression expressed as array and build an Abstract Sintax Tree (AST).
Example: constructAST(['10', '*', '(2+5)', '*', 10]) ->
{
  operator: '*',
  left: {
    operator: '*',
    left: '10',
    right: { operator: '+', left: '2', right: '5' }
  },
  right: '10'
}
*/
function constructAST(expressionAsArray) {
    if (expressionAsArray.Length == 1 && expressionAsArray[0][0] != '(') {
        return expressionAsArray[0];
    }
    let stackTerms = [];
    let stackOperators = [];
    let actualExpression = '';
    for (let index = 0; index < expressionAsArray.length; index++) {
        actualExpression = expressionAsArray[index];
        if (/^[\/*+-]/.test(actualExpression)) {
            while (
                stackOperators.length &&
                precedence[stackOperators[stackOperators.length - 1]] >= precedence[actualExpression]
            ) {
                rightTerm = stackTerms.pop();
                leftTerm = stackTerms.pop();
                stackTerms.push(createNode(stackOperators.pop(), leftTerm, rightTerm));
            }
            stackOperators.push(actualExpression);
        } else if (actualExpression[0] == '(') {
            stackTerms.push(constructAST(parseExp(actualExpression.substring(1, actualExpression.length - 1))));
        } else { //(/\d+\.?\d+|\d+/.test(actualExpression))
            stackTerms.push(actualExpression);
        }
    }
    while (stackOperators.length) {
        operator = stackOperators.pop();
        rightTerm = stackTerms.pop();
        leftTerm = stackTerms.pop();
        stackTerms.push(createNode(operator, leftTerm, rightTerm));
    }

    return stackTerms[0];
}


function createNode(operator, leftTerm, rightTerm) {
    return { operator: operator, left: leftTerm, right: rightTerm };
}

/*
Receive an expression as AST and return the result of the equation.
Example: evalAST(
    {
      operator: '*',
      left: {
        operator: '*',
        left: '10',
        right: { operator: '+', left: '2', right: '5' }
      },
      right: '10'
    }) -> 700
*/
function evalAST(ast) {
    let evalLeft = /\d+\.?\d+|\d+/.test(ast.left) ? parseFloat(ast.left) : evalAST(ast.left);
    let evalRight = /\d+\.?\d+|\d+/.test(ast.right) ? parseFloat(ast.right) : evalAST(ast.right);
    switch (ast.operator) {
        case '+':
            res = evalLeft + evalRight;
            break;
        case '-':
            res = evalLeft - evalRight;
            break;
        case '*':
            res = evalLeft * evalRight;
            break;
        case '/':
            res = evalLeft / evalRight;
    }
    return res;
}

module.exports = myEval;
