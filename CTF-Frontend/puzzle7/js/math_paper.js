function checkAns() {
    // here are the correct answers for the math questions
    var math1Ans = "0.637";
    var math2Ans = "x^3/3+x^2/2";
    var math3Ans = "6x^(2/5)-7/2x^(5/2)+16x^(5/3)";
    var math4Ans = "y=-2x+4";
    var math5Ans = "1/(xlnx)";
    // ---------------------------------------------------

    // Create an array for the correct answers and the answers given by a user
    var mathAns = [math1Ans, math2Ans, math3Ans, math4Ans, math5Ans];
    var givenAnswers = [];
    var questionsAnsweredCorrectly = "";

    // this function feeds the inputs into an array
    for (let i = 0; i < 5; i++) {
        var givenAnswer = document.getElementById("m" + (i + 1).toString()).value;
        givenAnswers.push(givenAnswer.split(' ').join(''));
    }

    // this function checks if the inputs are exactly correct
    for (let qtnID = 0; qtnID < mathAns.length; qtnID++) {
        if (givenAnswers[qtnID] == mathAns[qtnID]) {
            questionsAnsweredCorrectly = questionsAnsweredCorrectly + '"' + (qtnID + 1).toString() + '" ';
        }
    }

    // this function sets the value below so users know which answers they have answered correctly
    document.getElementById("math-qtns-correct").textContent = questionsAnsweredCorrectly;

    console.log(givenAnswers);
    console.log(mathAns);
    console.log(questionsAnsweredCorrectly);

}

function showMath() {

    var givenAnswers = [];

    // this function feeds the inputs into an array
    for (let i = 0; i < 5; i++) {
        var givenAnswer = document.getElementById("m" + (i + 1).toString()).value;
        givenAnswers.push(givenAnswer.split(' ').join(''));
        document.getElementById('mathjax').textContent=givenAnswer;
    }
}