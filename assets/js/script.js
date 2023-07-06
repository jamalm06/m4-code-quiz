

// Quiz elements
const startButton = document.querySelector(".quiz-start-button");
const quizContainer = document.querySelector("#quiz-container");
const questionElement = document.querySelector(".question");
const optionsContainer = document.querySelector(".options-div");
const answerResultElement = document.querySelector(".ans");

// Score elements
const scoreContainer = document.querySelector(".score-container");
const finalScoreElement = document.querySelector(".score");
const initialsInput = document.querySelector("#initials");
const submitButton = document.querySelector("#score");

// High scores elements
const highScoresContainer = document.querySelector(".high-scores-container");
const highScoresList = document.querySelector(".high-scores-list");
const viewScoresButton = document.querySelector(".view-scores-button");

// Timer element
const timerElement = document.querySelector(".timer");

// Quiz state
let currentQuestionIndex;
let score;
let timeLeft;

// Questions array
const questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["A. strings", "B. booleans", "C. alerts", "D. numbers"],
    answer: "C. alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["A. quotes", "B. curly brackets", "C. parentheses", "D. square brackets"],
    answer: "C. parentheses"
  },
  {
    title: "Arrays in Javascript can be used to store ____.",
    choices: ["A. numbers and strings", "B. other arrays", "C. booleans", "D. all of the above"],
    answer: "D. all of the above"
  },
  {
    title: "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["A. commas", "B. curly brackets", "C. quotes", "D. parenthesis"],
    answer: "C. quotes"
  },
  {
    title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choices: ["A. Javascript", "B. terminal / bash", "C. for loops", "D. console log"],
    answer: "D. console log"
  },
  {
    title: "What is the correct syntax to declare a variable in JavaScript?",
    choices: ["A. var", "B. int", "C. string", "D. bool"],
    answer: "A. var"
  },
  {
    title: "Which symbol is used to access properties and methods of an object in JavaScript?",
    choices: ["A. .", "B. ,", "C. :", "D. ;"],
    answer: "A. ."
  },
  {
    title: "Which operator is used for strict equality comparison in JavaScript?",
    choices: ["A. ==", "B. ===", "C. =", "D. !=="],
    answer: "B. ==="
  },
  {
    title: "What is the result of the expression '5' + 2 in JavaScript?",
    choices: ["A. 7", "B. 52", "C. 5", "D. 52"],
    answer: "D. 52"
  },
  {
    title: "How do you write a single-line comment in JavaScript?",
    choices: ["A. //", "B. /* */", "C. #", "D. <!-- -->"],
    answer: "A. //"
  }
];

// Function to start the quiz
function startQuiz() {
  startButton.style.display = "none";
  quizContainer.classList.remove("hidden");
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  timerElement.textContent = timeLeft;
  setNextQuestion();
  startTimer();
}

// Function to set the next question
function setNextQuestion() {
  resetQuestion();
  showQuestion(questions[currentQuestionIndex]);
}

// Function to reset the question
function resetQuestion() {
  while (optionsContainer.firstChild) {
    optionsContainer.removeChild(optionsContainer.firstChild);
  }
  answerResultElement.textContent = "";
}

// Function to show the question
function showQuestion(question) {
  questionElement.textContent = question.title;
  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.classList.add("option");
    button.id = "option-" + (index + 1);
    button.textContent = choice;
    optionsContainer.appendChild(button);
  });
}

// Function to check the selected answer
function checkAnswer(event) {
  if (event.target.classList.contains("option")) {
    const selectedAnswer = event.target.textContent;
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedAnswer === correctAnswer) {
      answerResultElement.textContent = "Correct!";
      score++;
    } else {
      answerResultElement.textContent = "Incorrect!";
      timeLeft -= 10;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      timerElement.textContent = timeLeft;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  }
}

// Function to end the quiz
function endQuiz() {
  quizContainer.classList.add("hidden");
  scoreContainer.style.display = "block";
  finalScoreElement.textContent = score;
  stopTimer();
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    if (timeLeft >= 0) {
      timerElement.textContent = timeLeft;
    } else {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// Function to stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}

// Function to save high score
function saveHighScore() {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const newHighScore = {
      initials: initials,
      score: score
    };
    highScores.push(newHighScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    initialsInput.value = "";
    showHighScores();
  }
}

// Function to show high scores
function showHighScores() {
  quizContainer.style.display = "none";
  scoreContainer.style.display = "none";
  highScoresContainer.style.display = "block";
  viewScoresButton.style.display = "none";

  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  highScoresList.innerHTML = "";

  if (highScores.length === 0) {
    const noHighScores = document.createElement("li");
    noHighScores.textContent = "No high scores available";
    highScoresList.appendChild(noHighScores);
  } else {
    highScores.sort((a, b) => b.score - a.score);
    for (let i = 0; i < highScores.length; i++) {
      const highScore = highScores[i];
      const li = document.createElement("li");
      li.textContent = `${highScore.initials} - ${highScore.score}`;
      highScoresList.appendChild(li);
    }
  }
}

// Function to initialize the quiz
function initializeQuiz() {
  startButton.addEventListener("click", startQuiz);
  optionsContainer.addEventListener("click", checkAnswer);
  submitButton.addEventListener("click", saveHighScore);
  viewScoresButton.addEventListener("click", showHighScores);
}

// Initialize the quiz
initializeQuiz();