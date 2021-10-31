/* Use of jquery events .ready to start the following only when the webpage is ready */
$(document).ready(function(){

    if (token != null) 
    {
        // var nav =document.getElementsByClassName("nav_registerAccount");
        // $('.nav_registerAccount').hide();
        $('#nav_registerAccount').hide();
        $('#nav_login').hide();
        $('#nav_logout').show();
        $('#hmuhmu').show();
        $('#meh_message').hide();
        $('#special_message').show();
        $('#nav_updateProfile').show();
        $('#nav_helloUser').show();
        $('#nav_form').hide();
        $('#warning_message').hide();
        //$('#profile_photo').attr("src",profileImage);
    }
})