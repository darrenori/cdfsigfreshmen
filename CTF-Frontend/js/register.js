const salt = "j1n23s9xcx";
function goRegister(){

    var registerUser = new XMLHttpRequest();

    registerUser.open("POST","http://localhost:8081/TPusers/",true)
    registerUser.setRequestHeader("Content-Type","application/json")
    


    registerUser.onload=function(){
        putToken(Username, Password);
    }

    
    //unencrypted  but with salt
    var Username = document.getElementById("team_name").value;
    var Password = document.getElementById("password").value +salt;

    //encrypted
    Password = CryptoJS.MD5(CryptoJS.enc.Hex.parse(Password)).toString();

    var payload = {Username:Username, Password:Password};
    console.log(payload)
    registerUser.send(JSON.stringify(payload));
}

function checkRegister(){

    var checkRegister = new XMLHttpRequest();

    var Username = document.getElementById("team_name").value;

    url = "http://localhost:8081/TPuser/" + Username;

    checkRegister.open('GET', url , true);
    checkRegister.onload = function () {
        var validation = JSON.parse(checkRegister.responseText);
        if(validation.length == 0){
            goRegister()
        }else{
            $('#username-error').show();
        }
    };
    
    checkRegister.send()
}

function putToken(Username, Password){

    var putToken = new XMLHttpRequest();

    putToken.open("POST","http://localhost:8081/LoginTPusers",true)
    putToken.setRequestHeader("Content-Type","application/json")
    putToken.onload=function(){
        token = JSON.parse(putToken.responseText);
        if(token != 0){
            window.location.href='instructions.html';
            sessionStorage.setItem("token", token.result);
            $('#Login').hide();
            $('#Register').hide();
            $('#Puzzle').show();
            $('#Logout').show();
        }else{
            $('#error-text').show();
        }
    }
    var payload = {Username:Username, Password:Password};
    console.log(payload)
    putToken.send(JSON.stringify(payload));
}