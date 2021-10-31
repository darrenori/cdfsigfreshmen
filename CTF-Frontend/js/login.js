const salt = "j1n23s9xcx";
function goLogin(){

    var loginUser = new XMLHttpRequest();

    loginUser.open("POST","http://localhost:8081/LoginTPusers",true)
    loginUser.setRequestHeader("Content-Type","application/json")
    loginUser.onload=function(){
        token = JSON.parse(loginUser.responseText);
        if(token != 0){
            window.location.href='quests.html';
            sessionStorage.setItem("token", token.result);
            $('#Login').hide();
            $('#Register').hide();
            $('#Puzzle').show();
            $('#Logout').show();
        }else{
            $('#error-text').show();
        }
    }
    
    var Username = document.getElementById("username").value;
    var Password = document.getElementById("password").value + salt;
    Password = CryptoJS.MD5(CryptoJS.enc.Hex.parse(Password)).toString();
    var payload = {Username:Username, Password:Password};
    console.log(payload)
    loginUser.send(JSON.stringify(payload));
}