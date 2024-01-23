//variable for the questions in the quiz. Its an array of questions and each question is an object with an array for choices
var questions = [
    {
        question: "Inside which HTML element do we put the Javascript?",
        choices: ["<js>", "<javascript>", "<script>", "<scripting>"],
        answer: "<script>"
    },
    {
        question: "What is the correct way to write a comment in Javascript?",
        choices: ["// my comment", "# my comment", "\\ my comment", "<! my comment"],
        answer: "// my comment"
    },
    {
        question: "What is an array?",
        choices: ["A true false value", "A structure that allows you to store multiple values in a single reference", "a sequence of text in quotation marks", "None of the above"],
        answer: "A structure that allows you to store multiple values in a single reference" 
    },
    {
        question: "Which of the following is a javascript data type?",
        choices: ["A string", "A number", "A Boolean", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "What is a boolean?",
        choices: ["A number", "A comment", "A true/false value", "An operator"],
        answer: "A true/false value"
    },
    {
        question: "How do you write a function?",
        choices: ["function myFunction()", "function = myFunction()", "function: myFunction()", "None of the above"],
        answer: "function myFunction()"
    },
    {
        question: "What is the correct syntax for referring to an external script?",
        choices: ["<script src=....>", "<script name=...>", "<script href=...>", "None of the above"],
        answer: "<script src=....>"
    },
    {
        question: "How do you write an alert box?",
        choices: ["msg(...);", "alert(...)", "alertBox(...)", "msgBox(...)"],
        answer: "alert(...)"
    },
    {
        question: "How do you declare a Javascript variable?",
        choices: ["variable myVariable", "v myVariable", "var myVariable", "vars myVariable"],
        answer: "var myVariable"
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        choices: ["+", "-", "*", "="],
        answer: "="
    }

  ];

//uses the get.ElementById to be able to interact with the button, timer, scores, and initials that corresponds to HTML ID's
var startButton = document.getElementById("start-button");
var timerDisplay = document.getElementById("timer");
var finalScore = document.getElementById("final-score");
var initialsInput = document.getElementById("initials");
var submitButton = document.getElementById("submit-score");
var quizContainer = document.getElementById("quiz-container");

//sets the timer at 60 seconds
var timer;
var timeLeft = 60;

//adds event when you click the start button and starts the timer
startButton.addEventListener("click", startQuiz);

//function that starts the timer when you start the quiz
function startQuiz() {
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    timer = setInterval(updateTimer, 1000)
    displayQuestion();
    };

//function that tells timer to keep going if there is time left and displays it on screen
function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }
//This function is what happens at the end of the quiz and will stop the timer. Also hides quiz container and shows high scores.
function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = "none";
    results.style.display = "block";
    finalScore.textContent = score;
    displayHighScores();
  }

//creates variable using getElementById to make questions, choices, and final score interact with HTML
var questionText = document.getElementById("question-text");
var choicesList = document.getElementById("choices");
var results = document.getElementById("end");

//keeps track of the index of the current questions and starts score at 0
var currentQuestionIndex = 0;
var score = 0;

//function to display the actual questions one at a time. use .length to check the current question to the number of questions in the question arrays
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        var currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        //content inside choicesList is removed so that new choices appear with each question. Also creates list item for each choice, adds event listener when user clicks, and appends list item
        choicesList.innerHTML = "";
        currentQuestion.choices.forEach((choice) => {
        var li = document.createElement("li");
        li.textContent = choice;
        li.addEventListener("click", () => checkAnswer(choice));
        choicesList.appendChild(li);
      });
    } else {
      endQuiz();
    }
  }
//function checks to see if the answer is correct and adds a point to the score if it is. If it is incorrect, it subtracts 10 seconds from the time
function checkAnswer(selectedChoice) {
    var currentQuestion = questions[currentQuestionIndex];
  
    if (selectedChoice === currentQuestion.answer) {
      score++;
    } else {
      timeLeft -= 10;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
    }
    //displays the next question in the index of questions
    currentQuestionIndex++;
    displayQuestion();
  }

var highScoresList = document.getElementById("high-scores");

submitButton.addEventListener("click", saveScore);

//saves intials entered and assigns to initials variable. trim deleted white space
function saveScore() {
  var initials = initialsInput.value.trim();
  if (initials !== "") {
    // Saves the initials and score to local storage using getHighScores function. Stores and sorts the high scores in order 
    var highScores = getHighScores();
    highScores.push({ initials, score });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayHighScores();
  }
}

//stores high scores data from local storage as string
function getHighScores() {
  var highScoresString = localStorage.getItem("highScores");
  return highScoresString ? JSON.parse(highScoresString) : [];
}

//saves high scores and deletes existing data. 
function displayHighScores() {
  var highScores = getHighScores();
  highScoresList.innerHTML = "";
  //Iterate over the high score array and display each score as new list item
  highScores.forEach((entry) => {
    var li = document.createElement("li");
    li.textContent = `${entry.initials}: ${entry.score}`;
    highScoresList.appendChild(li);
  });
}

