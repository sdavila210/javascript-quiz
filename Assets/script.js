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
        questions: "What is a boolean?",
        choices: ["A number", "A comment", "A true/false value", "An operator"],
        answer: "A true/false value"
    }
  ];

//uses the get.ElementById to be able to interact with the button, timer, scores, and initials that corresponds to HTML ID's
var startButton = document.getElementById("start-button");
var timerDisplay = document.getElementById("timer");
var finalScore = document.getElementById("final-score");
var initialsInput = document.getElementById("initials");
var submitButton = document.getElementById("submit-score");

//sets the timer at 60 seconds
var timer;
var timeLeft = 60;

//adds event when you click the start button and starts the timer
startButton.addEventListener("click", startQuiz);

//function that starts the timer when you start the quiz
function startQuiz() {
    timer = setInterval(updateTimer, 1000)
    };

//function that tells timer to keep going if there is time left and displays it on screen
function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }
//This function is what happens at the end of the quiz and will stop the timer
function endQuiz() {
    clearInterval(timer);
  }