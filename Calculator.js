let numbers = document.querySelectorAll("#numbers");
let percentage = document.querySelector("#percentage");
let display = document.querySelector(".expression");
let operators = ['+','-','*','/','%'];
let resultDisplayed = false;


numbers.forEach(val => {
    val.addEventListener("click", () => {
        const str = val.innerText;
        if(resultDisplayed) {
            resultDisplayed = false;
            if(str>='0' && str<='9' || display.innerText=='Infinity')
                display.innerText = "";
        }
        const exp = display.innerText + str;
        if(exp.length>15) {
            alert("Input Limit Reached!");
        } else {
        display.innerText = exp;
        }

        if(display.innerText.length>11) {
            display.style.fontSize = "35px";
        }
        
        check(display.innerText);
    });
});


const check = (str) => {
    if(operators.includes(str[str.length-1]) && operators.includes(str[str.length-2])) {
        setTimeout(function() {
            alert("Invalid Input! You cannot take 2 operator consecutively");
        }, 100);
        setTimeout(function() { 
           display.innerText = "";
        }, 100);
    }
    if(str.length>1 && str[str.length-1]=='.') {
        try {
            let result = math.evaluate(str);
        } catch (e) {
            setTimeout(function() {
                alert("Invalid Input! Try Again");
            }, 100);
            setTimeout(function() { 
                display.innerText = "";
             }, 100);
        }
    }
};


const clear = document.getElementById("delete");
clear.addEventListener("click", () => {
    display.style.fontSize = "48px";
    display.innerText = "";
});


const remove = document.getElementById("remove");
remove.addEventListener("click", () => {
    let str = display.innerText;
    str = str.slice(0,str.length-1);
    display.innerText = str;
    if(display.innerText.length<=11) {
        display.style.fontSize = "48px";
    }
});


const answer = document.querySelector("#equal")
answer.addEventListener("click", () => {
    if(display.innerText=="") alert("No input is taken");
    try {
        let expression = display.innerText;
        let result = math.evaluate(expression)
        if (!Number.isInteger(result)) {    //check the float value and limit it to 10 decimal point only and convered the tofixed string back to number
            result = Number(result.toFixed(10));
        }
    resultDisplayed = true;
    display.innerText = result;
    console.log(result)
    } catch (e) {
        alert("Invalid Input! Try Again");
        display.innerText = "";
    }
});



percentage.addEventListener("click", () => {
    const exp = display.innerText;
    const val = math.evaluate(exp)/100;
    display.innerText = val;
});
