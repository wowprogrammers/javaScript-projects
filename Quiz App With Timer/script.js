// Global Variables

let quizStartBtn = document.querySelector('.quizStartBtn button');
let infoContainer = document.querySelector('.infoContainer');
let exitBtn = document.querySelector('.infoButtons .exitQuiz');
let continueQuizBtn = document.querySelector('.infoButtons .continueQuiz');
let quizContainer = document.querySelector('.quizContainer');
let optionList = document.querySelector('.optionList');
let timeLine = document.querySelector('.timeLine');
let timeLeftTxt = document.querySelector('.timer .timeLeftContent');
let timeCount = document.querySelector('.timer .timerSecond');
let nextQuestionBtn = document.querySelector('.nextQuestion');
let bottomQuestionCount = document.querySelector('.totalQuestions');
let resultContainer = document.querySelector(".resultContainer");
let quitQuizBtn = document.querySelector('.infoButtons .quitBtn');
let restartQuizBtn = document.querySelector('.restartBtn')

let timeValue = 20;
let questionCount = 0;
let questionNumber = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue;



// When user clicked on start Quiz Button

quizStartBtn.addEventListener('click', () => {
    infoContainer.classList.add("activeInfo");
})

// When User Clicked On exit quiz Button

exitBtn.addEventListener('click', () => {
    infoContainer.classList.remove("activeInfo");
});


// When User clicked on Continue Quiz Button

continueQuizBtn.addEventListener('click', () => {
    // Hide Info Container
    infoContainer.classList.remove("activeInfo");
    // Show Quiz Container
    quizContainer.classList.add("activeQuiz");
    // Functions to show questions
    showAllQuestions(0);
    // Question Counter Function

    questionCounter(1);

    // start timer function
  
    timerStart(20);

    // start timer line function

    startTimerLine(0);


})

function showAllQuestions(index){
    let questionTxt = document.querySelector('.questionContent');

    // Creating html tag for new span and div tag for question and
    // option and passing the value using array index

    let questionTag = `<span> ${questions[index].numb} . ${questions[index].question} </span>`;
    let optionTag = `<div class = "option"> <span> ${questions[index].options[0]} </span></div>
    <div class = "option"> <span> ${questions[index].options[1]} </span></div>
    <div class = "option"> <span> ${questions[index].options[2]}  </span></div>
    <div class = "option"> <span> ${questions[index].options[3]}  </span> </div>
    `;

    questionTxt.innerHTML = questionTag;

    optionList.innerHTML = optionTag;

    let allOptions = optionList.querySelectorAll('.option');

    // Setting functionality when user click on any option

    for(let i = 0;i<allOptions.length;i++){
        // we will look into this later
        allOptions[i].setAttribute("onClick","selectedOptions(this)");   
    }
}
let correctIconTag = `<div class = "icon tick"><i class = "fas fa-check"></i></div>`;
let crossIconTag = `<div class = "icon cross"><i class = "fas fa-times"></i></div>`;

// When User clicked on any option
function selectedOptions(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let options = optionList.children.length;
    if(userAnswer.trim() == correctAnswer.trim()){
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML('beforeend',correctIconTag);

    }
    else{
        answer.classList.add('incorrect');
        answer.insertAdjacentHTML("beforeend",crossIconTag);

        for(let i = 0;i<options;i++){
            // Showing the correct answer
            if(optionList.children[i].textContent.trim() === correctAnswer.trim()){
                optionList.children[i].setAttribute("class","option correct");
                optionList.children[i].insertAdjacentHTML('beforeend',correctIconTag)
            }
        }

    }

    for(let i = 0;i<options;i++){
        optionList.children[i].classList.add("disabled");
    }

    nextQuestionBtn.classList.add("show");
}



// Timer Start Function

function timerStart(time){
    counter = setInterval(timerFunc, 1000);
    function timerFunc(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let zeroAdd = timeCount.textContent;
            timeCount.textContent = "0" + zeroAdd;

        }
        // After time Finished This block of code will run
        if(time < 0){

            clearInterval(counter);
            timeLeftTxt.textContent = "Your Time is Finished";
            let options = optionList.children.length;

            let correctAnswer =  questions[questionCount].answer;


            for(let i = 0;i<options;i++){
                if(optionList.children[i].textContent.trim() == correctAnswer.trim()){
                    
                    optionList.children[i].setAttribute("class","option correct");
                    optionList.children[i].insertAdjacentHTML('beforeend',correctIconTag)
                }else{
                    optionList.children[i].setAttribute("class","option incorrect");
                    optionList.children[i].insertAdjacentHTML('beforeend',crossIconTag)
                }
            }

            for(let i = 0;i<options;i++){
                optionList.children[i].classList.add('disabled');
            }

            nextQuestionBtn.classList.add('show')

        }

    }
}

function startTimerLine(time){
    counterLine = setInterval(timer,37);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 550){
            clearInterval(counterLine)
        }

    }
}

function questionCounter(index){
    let totalQuesTag = `<span><p> ${index} </p> of <p> ${questions.length} </p> Questions </span>`;
    bottomQuestionCount.innerHTML = totalQuesTag;
}


// When User Clicked on Next question

nextQuestionBtn.addEventListener('click', () => {
    if(questionCount < questions.length - 1){

        questionCount++;
        questionNumber++;
        showAllQuestions(questionCount);
        questionCounter(questionNumber);
        clearInterval(counter);
        clearInterval(counterLine);
        timerStart(timeValue);
        startTimerLine(0);
        timeLeftTxt.textContent = "Your Times Left";
        nextQuestionBtn.classList.remove("show");
    }else{
        clearInterval(counter);
        clearInterval(counterLine);

        // It means all question left in the quiz so show the result(next part)

        showResult()

    }
})


function showResult(){

    infoContainer.classList.remove("activeInfo");
    quizContainer.classList.remove("activeQuiz");
    resultContainer.classList.add('activeResult');
    const scoreText = resultContainer.querySelector(".scoreContent");
    if(userScore > 3){
        let scoreTag = `<span> Congratulations! , You got <p> ${userScore} out of </p> ${questions.length} </p></span>`;
        scoreText.innerHTML = scoreTag;


    }else if(userScore > 1){
        let scoreTag = `<span> Nice! , You got <p> ${userScore} out of </p> ${questions.length} </p></span>`;
        scoreText.innerHTML = scoreTag;

    }else{
        // If less than 1
        let scoreTag = `<span> Sorry! , You got Only <p> ${userScore} out of </p> ${questions.length} </p></span>`;
        scoreText.innerHTML = scoreTag;
    }

}

quitQuizBtn.addEventListener('click', () =>{
    window.location.reload();
    console.log("Quit")
})

restartQuizBtn.addEventListener('click', () =>{
    quizContainer.classList.add('activeQuiz');
    resultContainer.classList.remove('activeResult');
    timeValue = 20;
    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    widthValue = 0;
    showAllQuestions(questionCount);
    questionCounter(questionNumber);
    clearInterval(counter);
    clearInterval(counterLine);
    timerStart(timeValue);
    startTimerLine(widthValue);
    timeLeftTxt.textContent = "Time Left";
    nextQuestionBtn.classList.remove("show");


})