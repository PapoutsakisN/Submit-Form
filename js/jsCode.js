"use strict";
var passwordcheckin = false;

function verify(e, flag) {
    if ((document.getElementById("Password").value ==
        document.getElementById("CPassword").value && e.keyCode === 13) || (document.getElementById("Password").value ==
            document.getElementById("CPassword").value && flag === 0)) {
        setTimeout(function () {
            document.getElementById("message2").innerHTML = "";
        }, 3000);
        document.getElementById("errorPass").style.color = "green";
        document.getElementById("errorPass").innerHTML = "Correct";
        passwordcheckin = true;
    } else if (e.keyCode === 13 || flag === 0) {
        document.getElementById("errorPass").style.color = "red";
        document.getElementById("errorPass").innerHTML = "Wrong Password";
        setTimeout(function () {
            document.getElementById("message2").innerHTML = "";
        }, 3000);
    }
};

function ShowPassFunction() {
    var pass = document.getElementById("Password");
    if (pass.type === "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
};

function ShowCPassFunction() {
    var pass = document.getElementById("CPassword");
    if (pass.type === "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
};

function askPass() {
    var error = document.getElementById("errorPass");
    var pas1 = document.getElementById("Password");
    var pas2 = document.getElementById("CPassword");
    if (!passwordcheckin) {
        if (pas1.value != pas2.value) {
            error.style.display = "block";
            error.textContent = "Please enter the same password";
            error.style.color = "red";
        } else {
            error.style.display = "none";
        }
    }
};



function PassStrength() {
    var myPass = document.getElementById("Password");
    var message = document.getElementById("StrengthPass")
    var num_array = [];
    //var char_array = [];
    var i;
    var numbers = /[0-9]/g;;
    //var char = /[A-Za-z]/g;
    for (i = 0; i < myPass.length; i++) {
        if (myPass[i].value.match(numbers)) {
            num_array.push(myPass[i]);
        }
        /*if(myPass[i].value.match(char)){
            char_array.push(myPass[i]);
        }*/
    }
    if (num_array.length >= myPass.length / 2) {
        message.textContent = "Weak Password"
        message.style.color = "red"
    } else {
        message.textContent = "Good Password"
        message.style.color = "green"
    }

}
function HideDoc() {
    document.getElementById("Doc").style.display = "none";
    document.getElementById("Road").textContent = "Address";
}

function ShowDoc() {
    document.getElementById("Doc").style.display = "block";
    document.getElementById("Road").textContent = "Clinic's Address";
}

function checkBox() {

    if (document.getElementById("checkbox").checked === true) {
        document.getElementById("checkBoxMessage").style.display = "none";
    } else {
        document.getElementById("checkBoxMessage").style.display = "block"
        document.getElementById("checkBoxMessage").style.color = "red";
    }
}

function AMKAcheck() {
    var AMKA = document.getElementById("AMKA");
    var Date = document.getElementById("Date");
    var error = document.getElementById("errorDate")
    var check = 0;
    for (var i = 0; i < 4; i++) {
        if (AMKA[i] == Date[i]) {
            check = 1;
        }
    }
    if (AMKA[4] == Date[6]) {
        check = 1;
    }
    if (AMKA[5] == Date[7]) {
        check = 1;
    }
    if (check == 0) {
        error.textContent = "Please check your AMKA or Date of birth"
        error.style.color = "red";
    }
}

