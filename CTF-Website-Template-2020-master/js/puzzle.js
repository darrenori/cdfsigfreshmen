function loading(){

    //Step 1 is to know who is the User from the session token

    var token = sessionStorage.getItem("token");

    var getUser = new XMLHttpRequest();

    url = "http://localhost:8081/Getuser/" + token;

    getUser.open('POST', url , true);
    getUser.onload = function () {
        var result = JSON.parse(getUser.responseText); //This is the User
        getUserInfo(result.result); //Now we can proceed to retrieving the User's info
    };
    
    getUser.send()
}

function getUserInfo(user){
    var userInfo = new XMLHttpRequest();
    url = "http://localhost:8081/TPuser/" + user;

    userInfo.open('GET', url , true);
    userInfo.onload = function() {
        var information = JSON.parse(userInfo.responseText);
        //console.log(information)
        sessionStorage.setItem('user_hint', information[0].Hint)
        var user_puzzle_status = []

        user_puzzle_status[0] = information[0].puzzle1
        user_puzzle_status[1] = information[0].puzzle2
        user_puzzle_status[2] = information[0].puzzle3
        user_puzzle_status[3] = information[0].puzzle4
        user_puzzle_status[4] = information[0].puzzle5
        user_puzzle_status[5] = information[0].puzzle6
        user_puzzle_status[6] = information[0].puzzle7
        user_puzzle_status[7] = information[0].puzzle8
        
        sessionStorage.setItem('all_puzzle_status', user_puzzle_status)
        total_points();
        check_progress(information);
    };
    
    userInfo.send()
}

function puzzle_6_search(){
    var puzzle_information = {
    "Darren" : "Darren is Russell's best friend since primary school, but after Russell stole his girlfriend in poly, they have been enemies ever since. However, unlike Husaini, Darren is a much more calmer person and has a big heart personality, he cherishes friends and would on most occasions prefer not to quarrel with them if there is any argument. This is what makes him friends with Russell since primary school given of all the poor conduct Russell has committed.", 
    "darren" : "Darren is Russell's best friend since primary school, but after Russell stole his girlfriend in poly, they have been enemies ever since. However, unlike Husaini, Darren is a much more calmer person and has a big heart personality, he cherishes friends and would on most occasions prefer not to quarrel with them if there is any argument. This is what makes him friends with Russell since primary school given of all the poor conduct Russell has committed.", 
    "Husaini" : "Russell and Husaini are part of the Student Council CCA, both Russell and Husaini wanted the position of President. However, Husaini suspects that Russell might be given the position unfairly. To his personality, it is very likely that Husaini might take some action on Russell as he has past traces of records where he had beaten up his peers as they made him unhappy on some occasions.",
    "husaini" : "Russell and Husaini are part of the Student Council CCA, both Russell and Husaini wanted the position of President. However, Husaini suspects that Russell might be given the position unfairly. To his personality, it is very likely that Husaini might take some action on Russell as he has past traces of records where he had beaten up his peers as they made him unhappy on some occasions.", 
    "Zeph" : "Zeph and Russell were classmates, and they were in the same project group. However, on the project presentation day, Russell implies that he had not contributed a single to the project work and made a request to invoke peer evaluation and rated Zeph poorly, and this caused Zeph to be very angry as his GPA grade is affected on a large margin due to this. The other members, afraid that Russell might sabotage their GPA as well chose to kept silent as Russell was the group leader, this made Zeph even more angry. He has been silent ever since this happened and when spotted in class.",
    "zeph" : "Zeph and Russell were classmates, and they were in the same project group. However, on the project presentation day, Russell implies that he had not contributed a single to the project work and made a request to invoke peer evaluation and rated Zeph poorly, and this caused Zeph to be very angry as his GPA grade is affected on a large margin due to this. The other members, afraid that Russell might sabotage their GPA as well chose to kept silent as Russell was the group leader, this made Zeph even more angry. He has been silent ever since this happened and when spotted in class.",
    "Investiture" : "A ceremony for swearing of new leaders in the CCA.",
    "investiture" : "A ceremony for swearing of new leaders in the CCA.",
    "Shane" : "Shane was Russell's right hand man in the CCA, he would help him to plan out events and stuff for the CCA.",
    "shane" : "Shane was Russell's right hand man in the CCA, he would help him to plan out events and stuff for the CCA.",
    "Malcolm" : "Malcolm was the strongest competitor to Russell when competing for the president position as he is just as capable as Russell and had outstanding leadership abilities, it's no secret that Husaini was rooting for him for the position of president.",
    "malcolm" : "Malcolm was the strongest competitor to Russell when competing for the president position as he is just as capable as Russell and had outstanding leadership abilities, it's no secret that Husaini was rooting for him for the position of president.",
    "Jaslene" : "Jaslene is the most neutral of all management members in this CCA, she is often a bystander to any sort of trend/power in the CCA. She mostly observes how situation changes and adapts to them, but she is the most knowledgeable of what had happen.",
    "jaslene" : "Jaslene is the most neutral of all management members in this CCA, she is often a bystander to any sort of trend/power in the CCA. She mostly observes how situation changes and adapts to them, but she is the most knowledgeable of what had happen.",
    "Winnie" : "Winnie is Russell's girlfriend, she chose Russell over Darren was simply for the fact that Darren was a scary person to be with, as she does not know when is Darren angry.",
    "winnie" : "Winnie is Russell's girlfriend, she chose Russell over Darren was simply for the fact that Darren was a scary person to be with, as she does not know when is Darren angry."
}

    var input_value = document.getElementById("search_value").value
    //console.log(Object.keys(puzzle_information))
    //console.log(Object.values(puzzle_information))
    var value = 0;
    for (i = 0; i <= Object.keys(puzzle_information).length; i++){
        if(input_value == Object.keys(puzzle_information)[i]){
            document.getElementById("search_output_indication").innerHTML = "Output:"
            document.getElementById("search_output").innerHTML = Object.values(puzzle_information)[i]
            value = value + 1
            break
        }
        else if(input_value == "Russell" || input_value == "russell" || input_value == "Kidnap" || input_value == "kidnap" || input_value == "Kidnapper" || input_value == "kidnapper" || input_value == "Kill" || input_value == "kill"){
            $("#search_popup").modal('show')
        }
        else{
            continue
        }
    }
    if(value != 1){
        document.getElementById("search_output").innerHTML = "Nothing"
    }
    
}

function convertTime(){

    var date2 = new Date(); 
    console.log(date2)
    var date1 = new Date(2021, 9, 29, 7, 0);
    //console.log("Date of the competition: " + date2)
    //console.log("Current date: " + date1) 

    if (date2 < date1) {
        date2.setDate(date2.getDate() + 1);
    }

    var diff = date2 - date1;
   
    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    var time = hh + ":" + mm + ":" + ss;
    if(time.split(":")[0].length == 1){
        time = "0" + time.split(":")[0] + ":" + time.split(":")[1] + ":" + time.split(":")[2]
    } else if (time.split(":")[1].length == 1){
        time = time.split(":")[0] + ":0" + time.split(":")[1] + ":" + time.split(":")[2]
    } else if (time.split(":")[2].length == 1){
        time = time.split(":")[0] + ":" + time.split(":")[1] + ":0" + time.split(":")[2]
    }
     
    var result = "2021-10-29"+ " " + time;
    //console.log("Time between the 2 dates: " + result);

    return result;
}

//add timing function to record puzzle completion timing. Remember to add puzzle number into parameter (number)
function addTime(number)
{
    var time = new Object();
    var newTime = convertTime();
    var token = sessionStorage.getItem("token");

    if(number==1)
    {
        time.puzzleNum = "puzzle1"
    }
    else if (number==2)
    {
        time.puzzleNum = "puzzle2"
    }
    else if (number==3)
    {
        time.puzzleNum = "puzzle3"
    }
    else if (number==4)
    {
        time.puzzleNum = "puzzle4"
    }
    else if (number==5)
    {
        time.puzzleNum = "puzzle5"
    }
    else if (number==6)
    {
        time.puzzleNum = "puzzle6"
    }
    else if (number==7)
    {
        time.puzzleNum = "puzzle7"
    }
    else
    {
        time.puzzleNum = "puzzle8"
    }
    
    time.puzzleTime = newTime;
    time.token = token; // for validating and retrieving username
    
    var postTime = new XMLHttpRequest(); // 

    // console.log(newTime);
    // console.log(token);
    // console.log(time.puzzleNum);

    postTime.open("POST", "http://localhost:8081/addTime", true); //
    postTime.setRequestHeader("Content-Type", "application/json");
    postTime.send(JSON.stringify(time)); // 
}

// this function returns the price of a given hint
function getHintPrice(hintID){
    var hintPrice=0; //default value of hint cost
    hintID=parseInt(hintID.slice(6,7)); //slices ID to get just the number of the puzzle

    if (hintID<3) {
        console.log("This is the price of the hing:", hintPrice);
        return hintPrice; //hint cost of puzzle 1 and 2 is 0
    }
    else if (hintID<5&&hintID>2) {
        hintPrice=10;
        console.log("This is the price of the hing:", hintPrice);
        return hintPrice; //hint cost of puzzle 3 and 4 is 10
    }
    else if (hintID<7&&hintID>4) {
        hintPrice=20;
        console.log("This is the price of the hing:", hintPrice);
        return hintPrice; //hint cost of puzzle 5 and 6 is 20
    }
    else if (hintID<9&&hintID>6) {
        hintPrice=100;
        console.log("This is the price of the hing:", hintPrice);
        return hintPrice; //hint cost of puzzle 7 and 8 is 100
    }   
    
}

//input the hints in the respective locations
var puzzle1hint="I wonder if there is something in the description box..?";
var puzzle2hint="Find out Russell's actual acount. Maybe https://www.instagram.com/tp_cyber/ would provide some help?";
var puzzle3hint="SQL injection could work here...? NOTE: DO NOT ATTEMPT TO INJECT OTHER INFORMATION AS UNAUTHORIZED ACCESS WILL BE TRACKED. IF FOUND, THIS CAN LEAD TO A CRIMINAL OFFENCE.";
var puzzle4hint="I love commenting on my Instagram!";
var puzzle5hint="hint 5";
var puzzle6hint="hint 6";
var puzzle7hint="The audio sounds like morse code...! Also, make sure to have your lunch! I ate too much so I'm burping too much :(";
var puzzle8hint="hint 8";

function purchaseHint(pID){
    var hintsArray=[puzzle1hint,puzzle2hint,puzzle3hint,puzzle4hint,puzzle5hint,puzzle6hint,puzzle7hint,puzzle8hint];
    var hintsCost=["0","0","10",'10','20','20','100','100'];
    var payload = new Object();
    var token = sessionStorage.getItem("token");

    //slice the pID to get an integer
    pID=parseInt(pID.slice(6,7)); //slices ID to get just the number of the puzzle
    console.log("this is puzzle number: ", pID);

    //we need to know which hint to show the user
    //we know that pID is the question number
    for (let i = 0; i < hintsArray.length; i++) {
        if (i==pID-1) {
            document.getElementById("hint_text").textContent=hintsArray[i];
            break
        }

    }


    //Get user hints
    var userHints =sessionStorage.getItem("user_hint");
    if (userHints ==0 || userHints==null) {
        userHints="00000000";
    }
    console.log("this is user account hints: ", userHints);

    //Converting hints to array separated by commas
    hintArray=[];
    for (let i = 0; i < userHints.length; i++) {
hintArray.push(userHints[i]);
    }

    //Update the hints
    for (let h = 1; h <= hintArray.length; h++) {
        if (h ==pID){
             //set hint status to used(1)
             hintArray[h-1]=1;
            break;
        }
    }

    //Converts array back to string
    userHints=hintArray.join('');
    // console.log(userHints);


    payload.Hint=userHints;
    payload.token=token;


    var useAHint = new XMLHttpRequest();//

    url = "http://localhost:8081/useHint";
    useAHint.open('POST', url , true);
    useAHint.setRequestHeader("Content-Type", "application/json");
    useAHint.onload = function () {
        loading(); //refresh the page so hints get updated (alternatively we can just manually change the session 
        //storage to the correct value, since the database will have been updated already)
    };
    useAHint.send(JSON.stringify(payload));
}

function answer(puzzle_number){
    var answer_object = {"puzzle_1" : "TP_CDFSIG{1et_t5e_Hun7_5eg!n}", "puzzle_2" : "TP_CDFSIG{my_5es1_fr13nd}", "puzzle_3" : "TP_CDFSIG{b3t_y0u_c4n1_gu355_m3}", "puzzle_4" : "TP_CDFSIG{30092021}", "puzzle_5" : "TP_CDFSIG{There1sM0reTh4nWhatIt1s}",
    "puzzle_6" : "make sure to protect your gf because i'm really tempted to get her", "puzzle_7" : "TP_CDFSIG{colli5ion_is_h1st0ry}", "puzzle_8" : "TP_CDFSIG{558d3469}"}


    //console.log(document.getElementById("answer_box").value);
    var answer_submitted = document.getElementById("answer_box_" + puzzle_number).value

    if ((answer_submitted == answer_object["puzzle_" + puzzle_number])){
        console.log("well done for puzzle " + puzzle_number + '!')
        document.getElementById("answer_status_" + puzzle_number).style.color = "#6DED22"
        document.getElementById("answer_status_" + puzzle_number).innerHTML = "Correct Answer, wait for reload"
        addTime(puzzle_number)
        setTimeout(reload, 2000)
    }
    else if ((answer_submitted != answer_object["puzzle_" + puzzle_number])){
        console.log("wrong answer!");
        //var status_indication = document.getElementById("answer_status_" + i);
        document.getElementById("answer_box_" + puzzle_number).value = null;
        document.getElementById("answer_status_" + puzzle_number).style.color = "#FF0000"
        document.getElementById("answer_status_" + puzzle_number).innerHTML = "Wrong Answer"
    }
}

function reload(){
    location.reload();
}

function check_progress(information){
    var token_array = information[0]
    for (i = 1; i <= 7; i++){
        var next_puzzle = i+1;
        puzzle_status = token_array["puzzle" + i];
        if((puzzle_status != 0) && (token_array["puzzle" + next_puzzle] != 0)){
            //solve badge is given to current solved puzzle in the loop
            var solved_badge = document.getElementById("solved_badge_" + i)
            solved_badge.innerHTML = "solved";
            var puzzle_container = document.getElementById("puzzle_" + i + "_container")
            puzzle_container.classList.add("solved");

            var lock_icon = document.getElementById("padlock_" + next_puzzle);
            lock_icon.remove();
            var solved_badge = document.getElementById("solved_badge_" + next_puzzle)
            solved_badge.innerHTML = "solved";
            var puzzle_container = document.getElementById("puzzle_" + next_puzzle + "_container")
            puzzle_container.classList.add("solved");
        }
        else if((puzzle_status != 0) && (token_array["puzzle" + next_puzzle] == 0)){
            var container = document.getElementById("puzzle_" + next_puzzle + "_container");
            container.dataset.target = "#problem_id_" + next_puzzle;
            var lock_icon = document.getElementById("padlock_" + next_puzzle);
            lock_icon.remove();

            var solved_badge = document.getElementById("solved_badge_" + i)
            solved_badge.innerHTML = "solved";
            var puzzle_container = document.getElementById("puzzle_" + i + "_container")
            puzzle_container.classList.add("solved");
        }
        else if((puzzle_status == 0) && (i == 1)){
            var container = document.getElementById("puzzle_" + i + "_container");
            container.dataset.target = "#problem_id_" + i;
        }
        else{
            continue
        }
    }
    if(token_array["puzzle8"] != 0){
        var message_display = document.getElementById("completed_message");
        message_display.insertAdjacentHTML("beforeend", '<br><br><h4><b>Well done on completing the Puzzle! We hope you have enjoyed it!</b></h4>')
    }
    return
}

function total_points(){
    var current_puzzle_status = sessionStorage.getItem("all_puzzle_status");
    var puzzle_status_array = current_puzzle_status.split(",")
    var current_hint_points = sessionStorage.getItem("user_hint")
    var current_hint_array = current_hint_points.split("")
    var total_points = 0;
    var scores = [10,20,30,50,100,200,250,300];
    var hint_points = [0,0,10,10,20,20,100,100];
    for (i = 0; i < puzzle_status_array.length; i++){
        if(puzzle_status_array[i] != 0 && current_hint_array[i] == 1){
            total_points = total_points + scores[i] - hint_points[i]
        }
        else if(puzzle_status_array[i] != 0 && current_hint_array[i] == 0){
            total_points = total_points + scores[i]
        }
        else if((i == 0) && (puzzle_status_array[i] == 0)){
            total_points = 0;
            break
        }
        else if(current_hint_array[i] == 1 && current_hint_array[i + 1] != 1){
            total_points = total_points - hint_points[i]
        }
        else{
            break
        }
    }
    var point_element = document.getElementById("points")
    point_element.innerHTML = ('Points Accumulated: ' + total_points)
    sessionStorage.setItem("user_total_points", total_points)
    //console.log(total_points)
}