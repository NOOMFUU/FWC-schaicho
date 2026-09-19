setInterval(function () {
    alert("Please, use me...");
}, 30000);

function isPositiveInteger(str) {
    return /^\d+$/.test(str);
}

function calculate() {
    const leftValue = $('#left').val();
    const rightValue = $('#right').val();
    const operator = $('#operator').val();

    if (!isPositiveInteger(leftValue) || !isPositiveInteger(rightValue)) {
        alert("Error :(");
        console.log("Error :(");
        return;
    }

    const leftNum = parseInt(leftValue, 10);
    const rightNum = parseInt(rightValue, 10);

    if ((operator === '/' || operator === '%') && rightNum === 0) {
        alert("It’s over 9000!");
        console.log("It’s over 9000!");
        return;
    }

    let result = 0;

    switch (operator) {
        case '+':
            result = leftNum + rightNum;
            break;
        case '-':
            result = leftNum - rightNum;
            break;
        case '*':
            result = leftNum * rightNum;
            break;
        case '/':
            result = leftNum / rightNum;
            break;
        case '%':
            result = leftNum % rightNum;
            break;
    }

    alert(result);
    console.log(result);
}

$('#submit-btn').click(function () {
    calculate();
});
