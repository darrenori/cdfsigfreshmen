function generateTable(){

    var usersInfo = new XMLHttpRequest();

    url = "http://localhost:8081/GetAllUsers/";

    usersInfo.open('GET', url , true);
    usersInfo.onload = function () {
        var information = JSON.parse(usersInfo.responseText);
        table(information);
    };
    
    usersInfo.send()

}

//For Now, the puzzle scores are 10,20,30,50,100,200,250,300
function getMinutes(time){
    var hours,minutes,seconds,total_counter;
    if(time.includes("hr")){
        hours = time.slice(0,2)
        time = time.slice(5,time.length)
    } 

    if(time.includes("min")){
        minutes = time.slice(0,2)
        time = time.slice(6, time.length)
    }

    seconds = time.slice(0,2)

    hours = parseInt(hours);
    minutes = parseInt(minutes);
    seconds = parseInt(seconds);

    

    if(isNaN(hours) == true){
        hours = 0;
    } 
    
    if(isNaN(minutes) == true){
        minutes = 0;
    }

    if(isNaN(seconds) == true){
        seconds = 0;
    }

    total_counter = hours * 60 * 60 + minutes * 60 + seconds;    

    return total_counter;
}

function table(information){

    var table = document.getElementById("hackerboard")
    var final_list = [];
    var total_users = information.length;

    for (var count = 1; count < total_users+1; count++){
        var name = information[count-1].username;                                             //Name

        var no_puzzles = 0;
        var total_time = "";
        var time = "";
        var total_score = 0;

        var puzzles = [information[count-1].puzzle1,information[count-1].puzzle2,information[count-1].puzzle3,information[count-1].puzzle4,information[count-1].puzzle5,information[count-1].puzzle6,information[count-1].puzzle7,information[count-1].puzzle8]

        for(var counter =0; counter < 8; counter++){
            if(puzzles[counter] == 0){  //Stop the if loop when it detects a puzzle is not solved yet
                break;
            }else{ 
                no_puzzles += 1                                                               //Total Puzzles             
            }
        }
        
        if(puzzles[0] == null){   //Check if first puzzle is null
            no_puzzles = 0;
        }

        switch(no_puzzles) {
            case 1:
                time = information[count-1].puzzle1
                time = time.split(" ")[1]
                break;
            case 2:
                time = information[count-1].puzzle2
                time = time.split(" ")[1]
                break;
            case 3:
                time = information[count-1].puzzle3
                time = time.split(" ")[1]
                break;
            case 4:
                time = information[count-1].puzzle4
                time = time.split(" ")[1]
                break;
            case 5:
                time = information[count-1].puzzle5
                time = time.split(" ")[1]
                break;
            case 6:
                time = information[count-1].puzzle6
                time = time.split(" ")[1]
                break;
            case 7:
                time = information[count-1].puzzle7
                time = time.split(" ")[1]
                break;
            case 8:
                time = information[count-1].puzzle8
                time = time.split(" ")[1]
                break;
          } 
        
        
        if(time.slice(0,5) == "00:00"){
            time = time.slice(6,time.length);
        } else if (time.slice(0,2) == "00"){ 
            time = time.slice(3,time.length);
        }
       
        if(time.length == 2){
            total_time= time + " seconds"
        } else if (time.length == 5){
            total_time = time.slice(0,2) + "min " + time.slice(3,5) + "sec"
        } else if (time.length == 8) {
            total_time = time.slice(0,2) + "hr " + time.slice(3,5) + "min " + time.slice(6,8) + "sec"
        } else {
            total_time = "none"
        }

        var scores = [10,20,30,50,100,200,250,300];
        var hint_scores = [0,0,10,10,20,20,100,100];
        var hint = information[count-1].hint;
        var hints = 0;
        for(let h = 0; h < hint.length; h++){
            if(hint[h] == "1"){
                hints += hint_scores[h];
            }
        }

        var user_scores = []; 
        user_scores = scores.slice(0,no_puzzles);
        total_score = user_scores.reduce((a, b) => a + b, 0) - hints;     //total score

        var timings = getMinutes(total_time);

        var user_list = [];
        user_list = [count,name,no_puzzles,total_time,total_score,puzzles,information[count-1].hint,timings];
        final_list.push(user_list);
    }

    var n = final_list.length;
    var temp = 0;    
    for (let i = 0; i < n; i++) {
        for (let v = 1; v < (n - i); v++) {
            if (final_list[v - 1][4] < final_list[v][4]) {
                temp = final_list[v - 1];
                final_list[v - 1] = final_list[v];
                final_list[v] = temp;
            } 
        }
    }  

    var n = final_list.length;
    var temp = 0;    
    for (let i = 0; i < n; i++) {
        for (let v = 1; v < (n - i); v++) {
            if(final_list[v-1][4] == final_list[v][4]){
                if (final_list[v - 1][7] > final_list[v][7]) {
                    temp = final_list[v - 1];
                    final_list[v - 1] = final_list[v];
                    final_list[v] = temp;
                }
            }
        }
    }  
    
    for (var counter = 0; counter < total_users; counter++){
        
        count = counter+1;
        name = final_list[counter][1];
        no_puzzles = final_list[counter][2];
        total_time = final_list[counter][3];
        total_score = final_list[counter][4];

        var cell = '<tr>                                                  \
                <th scope="row">' + count + '</th>               \
                <td>' + name + '</td>                            \
                <td>' + no_puzzles + '</td>                      \
                <td>' + total_time + '</td>                      \
                <td>' + total_score + '</td>                     \
            </tr>'        
        
        table.insertAdjacentHTML('beforeend', cell);
    }

    chart(final_list, information)
}   

function timeConvert(time){  //Expected input of time is "2017-01-06 01:52:29"
    
    var date = time.slice(0,11)

    var start = 1900; //This event will start at 7pm

    time = time.slice(11,16) //obtain the HH:MM
    
    var hours,minutes;

    if(time.slice(0,2) != "00"){  //Check if HH = 00
        hours = parseInt(time.slice(0,2)) 
        
        hours = hours * 100 //Make hours 4 digits so we can just add it together with start 

        minutes = parseInt(time.slice(3,5))
    } else {
        hours = 0; 
        minutes = parseInt(time.slice(3,5))
    } 

    if(hours == 0){
        start += minutes;
        start = String(start);
        start = date + "00:" + start.slice(0,2) + ":" + start.slice(2,4);
    } else {
        start += hours;
        start += minutes;
        start = String(start);
        start = date + "00:" + start.slice(0,2) + ":" + start.slice(2,4);
    }

    var tempHours = parseInt(start.slice(start.length-5, start.length-3))
    var tempMins = start.slice(17, start.length)

    while(tempHours > 24){
        tempHours = String(tempHours - 24);
        if(tempHours.length == 1){
            tempHours = "0" + tempHours
        }
        
        var tempDay = date.slice(9,11);
        tempDay = String(parseInt(tempDay) + 1)

        if(tempDay.length == 1){
            tempDay = "0" + tempDay;
        }

        date = date.slice(0,8) + tempDay + " ";

        start = date + "00:" + String(tempHours) + ":" + String(tempMins);
        
    }
    return(start)
    
}

function chart(final_list, information){ 

    var s1,s2,s3,s4,s5,s6,s7,s8,s9,s10 = {};
    var dataset = [s1,s2,s3,s4,s5,s6,s7,s8,s9,s10]
    var colors = ['blue','green','red','pink','orange','grey','purple','teal','indigo','white']
    
    if(final_list.length > 10){          //Putting only the top 10 people
        final_list = final_list.slice(0,11);
        information = information.slice(0,11);
    } 
    
    for(var count = 0; count < final_list.length; count ++){

        if(final_list[count][2] == 0){        //skip those who have not solved any puzzles
            break;

        }else{

            var scores = [10,20,30,50,100,200,250,300];
            var hint_scores = [0,0,10,10,20,20,100,100];
            var coords = [];
            var puzzles = final_list[count][5];
            var x_coords = ["2017-01-06 00:00:00"];
            var y_coords =[0];
            var hints = final_list[count][6];
            var sam; 

            for(var counter = 0; counter < final_list[count][2]; counter++){  //loop for the number of puzzles they have solved
                sam = timeConvert(puzzles[counter])
                //console.log("The original is " + puzzles[counter] + " after conversion is : " + sam)
                x_coords.push(sam)
            }
            for(let hint_count = 0; hint_count < 8; hint_count ++){
                if(hints[hint_count] == "1"){

                    scores[hint_count] = scores[hint_count] - hint_scores[hint_count];
                    var temp_score = scores.slice(0,hint_count+1);
                    temp_score = temp_score.reduce((a, b) => a + b, 0);     //total score

                    y_coords.push(temp_score)

                }else{  

                    var temp_score = scores.slice(0,hint_count+1);
                    temp_score = temp_score.reduce((a, b) => a + b, 0);     //total score

                    y_coords.push(temp_score)
                }
            }

            
            for(let data_count = 0; data_count < x_coords.length; data_count++){
                var temp = {x: x_coords[data_count], y: y_coords[data_count]}
                coords.push(temp)
            }
                
            dataset[count] = {
                label: final_list[count][1],
                borderColor: colors[count],
                steppedLine: true,
                data: coords,
            }
     
        }
    }   

    var temp_dataset = [];
    for(let slice_counter = 0; slice_counter < dataset.length; slice_counter++){
        if(typeof(dataset[slice_counter]) != "undefined"){
            temp_dataset.push(dataset[slice_counter])
        }
    }

    dataset = temp_dataset;
    dataset = dataset.slice(0,dataset.length-1)

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: dataset
        },
        options: {
            scales: {
                yAxes: [{
                    type: 'linear'
                }],
                xAxes: [{
                    type: 'time',
                    distribution: 'series', // or linear
                    time: {
                        unit: 'minute',
                        displayFormats: {
                            minute: 'mm:ss'
                        },
                        tooltipFormat: 'mm:ss'
                    }
                }]
            }
        }
    });
    
}
 