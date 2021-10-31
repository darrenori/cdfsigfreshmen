function login_rocketScience() {

    var loginUser = new XMLHttpRequest();

    loginUser.open("POST", "http://localhost:8081/LoggingPuzzle7", true)
    loginUser.setRequestHeader("Content-Type", "application/json")
    loginUser.onload = function () {
        token = JSON.parse(loginUser.responseText);

        if (token != 0) {
            sessionStorage.setItem("token_puzzle7", token.result);
            window.location.href = 'nigol.html';
            // $('#Login').hide();
            // $('#Register').hide();
            // $('#Puzzle').show();
            // $('#Logout').show();
        } else {
            $('#error-text3').show();
        }
        sessionStorage.setItem("frenchfries","fYV0pJT6Qp90iA55vCAwYoUasA90gYiyfTH4lV==")
    }

    var Username = document.getElementById("rocket-user_login").value;
    var Password = document.getElementById("rocket-passwd_login").value;
    var payload = { Username: Username, Password: Password };

    // getUserInfo(Username);//Loads hint into session storage
    loginUser.send(JSON.stringify(payload));
}

function logout_rocketScience() {
    sessionStorage.removeItem("token_puzzle7");
    sessionStorage.removeItem("username");
    window.location.href = 'nigol.html';
}

function register_rocketScience() {

    var registerUser = new XMLHttpRequest();
    registerUser.open("POST", "http://localhost:8081/RegisteringPuzzle7", true)
    registerUser.setRequestHeader("Content-Type", "application/json")
    registerUser.onload = function () {
        window.location.href = 'nigol.html';
    }
    var Username = document.getElementById("rocket-user").value;
    var Password = document.getElementById("rocket-passwd").value;
    var payload = { Username: Username, Password: Password };
    registerUser.send(JSON.stringify(payload));
}

function checkRegister_rocketScience() {

    var checkRegister_rocketScience = new XMLHttpRequest();

    var Username = document.getElementById("rocket-user").value;

    url = "http://localhost:8081/Puzzle7/" + Username;

    checkRegister_rocketScience.open('GET', url, true);
    checkRegister_rocketScience.onload = function () {
        if (Username.toLowerCase() != "admin") {
            var validation = JSON.parse(checkRegister_rocketScience.responseText);
            if (validation.length == 0) {

                register_rocketScience()
            } else {
                $('#username-error').show();
            }
        }
        else {
            $('#username-error').show();
        }

    };

    checkRegister_rocketScience.send()
}


//similar to gologin() function but checks for md5 hex string username and password collision before granting access
function login_puzzle7() {
    var login_username = document.getElementById("login_username").value;
    var login_password = document.getElementById("login_password").value;
    var hexs1 = CryptoJS.MD5(CryptoJS.enc.Hex.parse(login_username)).toString();
    var hexs2 = CryptoJS.MD5(CryptoJS.enc.Hex.parse(login_password)).toString();
    console.log(hexs1+"first");
    console.log(hexs2);

    var loginUser_puzzle7 = new XMLHttpRequest();
    
    if (login_username != login_password && hexs1 == hexs2) {

        window.location.href = 'nigol.html';
        var intTable = document.getElementById("interesting-table");
        intTable.remove();
    }
    else {
        $('#error-text2').show();
    }

    //Hardcode the username and password here
    var Username = "Default_User";
    var Password = "Abc123";
    var payload = { Username: Username, Password: Password };
    loginUser_puzzle7.send(JSON.stringify(payload));
}

function getUserData() {
    var token = sessionStorage.getItem('token_puzzle7')
    var checkusername = new XMLHttpRequest();
    checkusername.open('GET', "http://localhost:8081/puzzle7_checkusername/" + token, true);
    checkusername.onload = function () {
        var token2 = JSON.parse(checkusername.responseText);
        var token3 = token2.result; // this is the current logged in user
        var intTable = document.getElementById("interesting-table");
        if (token3 != false) {
            document.getElementById("puzzle7_username").textContent = token3;
            document.getElementById("puzzle7_welcome_username").textContent = token3;
            if (token3 == null || token3.toLowerCase() != "admin") {
                intTable.remove();
                document.getElementById("linkToNextRoom").href = "#"
                document.getElementById("linkToNextRoom").textContent = ".."
            }
            else {
                document.getElementById("linkToNextRoom").textContent = "www.detect.com";
            }
        } else {
            intTable.remove();
        }

    }
    checkusername.send();
}



// REMEMBER TO SHARE With ZX
function getUserData_updateProfile() {
    
    var username = sessionStorage.getItem("token_puzzle7")
    
    if (username == null) {
        window.location.href = 'nigol.html';
    }
    
    var token = sessionStorage.getItem('token_puzzle7')
    var checkusername = new XMLHttpRequest();
    checkusername.open('GET', "http://localhost:8081/puzzle7_checkusername/" + token, true);
    checkusername.onload = function () {
        var token2 = JSON.parse(checkusername.responseText);
        var token3 = token2.result; // this is the current logged in user
        var intTable = document.getElementById("interesting-table");
        if (token3 != false) {
            document.getElementById("puzzle7_welcome_username").textContent = token3;
            if (token3 == null || token3.toLowerCase() != "admin") {
                intTable.remove();
                document.getElementById("linkToNextRoom").href = "#"
                document.getElementById("linkToNextRoom").textContent = ".."
            }
            else {
                document.getElementById("linkToNextRoom").textContent = "www.detect.com";
            }
        } else {
            intTable.remove();
        }

    }
    checkusername.send();
}

function goUpdate() {

    var updateUser = new XMLHttpRequest();

    updateUser.open("POST", "http://localhost:8081/SwappingPuzzle7", true)
    updateUser.setRequestHeader("Content-Type", "application/json")
    updateUser.onload = function () {
        $('#update-password').show();
        setTimeout(function () { $('#update-password').hide(); }, 3000);
    }

    var U = sessionStorage.getItem("token_puzzle7")+"1";
    var Password = document.getElementById("exampleInputPassword1").value;
    var payload = { Username: U, Password: Password };
    // getUserInfo(U);//Loads hint into session storage
    updateUser.send(JSON.stringify(payload));
}