$(document).ready(function (){

    var token = sessionStorage.getItem("token");
    if (token != null){
        $('#Login').hide();
        $('#Register').hide();
        $('#Home').hide();
        $('#Puzzle').show();
        $('#Logout').show();
    }
    
    var params = window.location.href
    var url = params.split("/")
    switch(url[url.length - 1]){
        case "index.html":
            highlight = "Home"
            break;
        case "about.html":
            highlight = "About"
            break;
        case "hackerboard.html":
            highlight = "Hackerboard"
            break;
        case "login.html":
            highlight = "Login"
            break;       
        case "register.html":
            highlight = "Register"
            break;    
        case "quests.html":
            highlight = "Puzzle"  
            break;     
        default:
            highlight = "none"
    }
    console.log(highlight)
    if(highlight != "none"){        
        document.getElementById(highlight).style.color = '#FFFFFF';
    }
})  
