async function login_rocketScience() {
    var Username = document.getElementById("rocket-user_login").value.trim();
    var Password = document.getElementById("rocket-passwd_login").value;

    try {
        var token = await CtfApi.post("/LoggingPuzzle7", { Username: Username, Password: Password });
            sessionStorage.setItem("token_puzzle7", token.result);
            sessionStorage.setItem("frenchfries", "fYV0pJT6Qp90iA55vCAwYoUasA90gYiyfTH4lV==");
            window.location.href = 'nigol.html';
    } catch {
        $('#error-text3').show();
    }
}

function logout_rocketScience() {
    sessionStorage.removeItem("token_puzzle7");
    sessionStorage.removeItem("username");
    window.location.href = 'nigol.html';
}

async function register_rocketScience() {
    var Username = document.getElementById("rocket-user").value.trim();
    var Password = document.getElementById("rocket-passwd").value;
    try {
        await CtfApi.post("/RegisteringPuzzle7", { Username: Username, Password: Password });
        window.location.href = 'nigol.html';
    } catch {
        $('#username-error').show();
    }
}

async function checkRegister_rocketScience() {
    var Username = document.getElementById("rocket-user").value.trim();
    if (!Username || Username.toLowerCase() === "admin") {
        $('#username-error').show();
        return;
    }
    try {
            var validation = await CtfApi.get("/Puzzle7/" + encodeURIComponent(Username));
            if (validation.length == 0) {
                await register_rocketScience();
            } else {
                $('#username-error').show();
            }
    } catch {
        $('#username-error').show();
    }
}


//similar to gologin() function but checks for md5 hex string username and password collision before granting access
function login_puzzle7() {
    var login_username = document.getElementById("login_username").value;
    var login_password = document.getElementById("login_password").value;
    var hexs1 = CryptoJS.MD5(CryptoJS.enc.Hex.parse(login_username)).toString();
    var hexs2 = CryptoJS.MD5(CryptoJS.enc.Hex.parse(login_password)).toString();
    console.log(hexs1+"first");
    console.log(hexs2);

    if (login_username != login_password && hexs1 == hexs2) {

        window.location.href = 'nigol.html';
        var intTable = document.getElementById("interesting-table");
        intTable.remove();
    }
    else {
        $('#error-text2').show();
    }

}

async function getUserData() {
    var token = sessionStorage.getItem('token_puzzle7')
    try {
        var token2 = await CtfApi.get("/puzzle7_checkusername/" + encodeURIComponent(token));
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

    } catch {
        sessionStorage.removeItem("token_puzzle7");
        window.location.href = "nigol.html";
    }
}



// REMEMBER TO SHARE With ZX
async function getUserData_updateProfile() {
    
    var username = sessionStorage.getItem("token_puzzle7")
    
    if (username == null) {
        window.location.href = 'nigol.html';
    }
    
    var token = sessionStorage.getItem('token_puzzle7')
    try {
        var token2 = await CtfApi.get("/puzzle7_checkusername/" + encodeURIComponent(token));
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

    } catch {
        window.location.href = "nigol.html";
    }
}

async function goUpdate() {
    var U = sessionStorage.getItem("token_puzzle7") + "1";
    var Password = document.getElementById("exampleInputPassword1").value;
    try {
        await CtfApi.post("/SwappingPuzzle7", { Username: U, Password: Password });
        $('#update-password').show();
        setTimeout(function () { $('#update-password').hide(); }, 3000);
    } catch {
        $('#update-password').text("Update failed").show();
    }
}
