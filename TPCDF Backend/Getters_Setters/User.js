"use strict";

class User{
    constructor(idUserProfile, username, password, puzzle1, puzzle2, puzzle3, puzzle4, puzzle5, puzzle6, puzzle7, puzzle8, hint){
        this.idUserProfile = idUserProfile;
        this.username = username;
        this.password = password;
        this.puzzle1 = puzzle1;
        this.puzzle2 = puzzle2;
        this.puzzle3 = puzzle3;
        this.puzzle4 = puzzle4;
        this.puzzle5 = puzzle5;
        this.puzzle6 = puzzle6;
        this.puzzle7 = puzzle7;
        this.puzzle8 = puzzle8;
        this.hint = hint;
    }

    getidUserProfile() {
        return this.idUserProfile;
    }

    getpassword(){
        return this.password;
    }

    getusername(){
        return this.username;
    }

    getpuzzle1(){
        return this.puzzle1;
    }

    getpuzzle2(){
        return this.puzzle2;
    }
    
    getpuzzle3(){
        return this.puzzle3;
    }
    
    getpuzzle4(){
        return this.puzzle4;
    }
    
    getpuzzle5(){
        return this.puzzle5;
    }
    
    getpuzzle6(){
        return this.puzzle6;
    }
    
    getpuzzle7(){
        return this.puzzle7;
    }
    
    getpuzzle8(){
        return this.puzzle8;
    }

    gethint(){
        return this.hint;
    }

    setusername(username){
        this.username = username;
    }

    setpassword(password){
        this.password = password;
    }

    setpuzzle1(puzzle1){
        this.puzzle1 = puzzle1;
    }
    
    setpuzzle2(puzzle2){
        this.puzzle2 = puzzle2;
    }

    setpuzzle3(puzzle3){
        this.puzzle3 = puzzle3;
    }

    setpuzzle4(puzzle4){
        this.puzzle4 = puzzle4;
    }
    
    setpuzzle5(puzzle5){
        this.puzzle5 = puzzle5;
    }

    setpuzzle6(puzzle6){
        this.puzzle6 = puzzle6;
    }

    setpuzzle7(puzzle7){
        this.puzzle7 = puzzle7;
    }

    setpuzzle8(puzzle8){
        this.puzzle8= puzzle8;
    }

    sethint(hint){
        this.hint= hint;
    }
}

module.exports = User;