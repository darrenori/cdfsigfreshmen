function logout(){
    console.log("LOGGING OUT")
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_hint");
    sessionStorage.removeItem("all_puzzle_status")
    window.location.href='login.html';
}