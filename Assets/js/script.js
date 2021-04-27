var highscoreButton = document.querySelector("#view-highscore");
var mainHeader = document.querySelector("#main-title");
var textArea = document.querySelector("#text-fill");
var startButton = document.querySelector("#start-button");
var buttonArea = document.querySelector(".button-area");
var quizArea = document.querySelector(".quiz-area");
var answerArea = document.querySelector(".answer-area");
var highscoreArea = document.querySelector(".highscore-area");

var questionButtons;
//key value pair list for the highscores
//Remidner, highscoreList[newName] = score will add new item to object
var highscoreList = {
  SB: 15,
  ML: 22,
  NC: 17,
};

var questionNum = 0;
var correctAnswers = 0;
var inccorectAnswers = 0;

var q1 = [
  "What does parentElement.appendChild(childElement) do?",
  "removes child element from its parent",
  "adds child element to the parent",
  "removes the text content from the child element",
  "nothing - this is not a function",
  "B",
];
var q2 = [
  "What does HTML stand for?",
  "Holistic Technical Malleable Language",
  "Hyper-Text Markup Language",
  "Hindering Telegraphed Marked List",
  "Heated Timed Modification Language",
  "B",
];
var q3 = [
  "What is the difference between margin and padding by default?",
  "Padding is inside the element while margin is outside",
  "Margin is inside the element while padding is outside",
  "Margin and padding are both outside the element",
  "Margin and padding are both inside the element",
  "A",
];

var questionArray = [q1, q2, q3];

//Changes elements on the page to display the highscores and their scores
//Includes buttons to go back and clear the highscores
function viewHighscores() {
  var clearButton;
  var backButton;
  var docHS;

  if (highscoreButton.id == "view-highscore") {
    mainHeader.textContent = "Highscores:";
    textArea.setAttribute("style", "display: none");
    mainHeader.setAttribute("style", "text-align: left");
    startButton.setAttribute("style", "display: none");
    docHS = addScores();
    [clearButton, backButton] = addButtons();
    backButton.addEventListener("click", function () {
      reset(buttonArea, clearButton, backButton);
    });
    clearButton.addEventListener("click", function () {
      clearHighscores();
    });
  }
  highscoreButton.setAttribute("id", "disabled");
}

//Function which adds the new buttons to the screen
function addButtons() {
  var clearButton = document.createElement("BUTTON");
  clearButton.innerHTML = "Clear Highscores";
  clearButton.setAttribute(
    "style",
    "font-size: 17px; margin-left: 1vw; margin-right: 1vw",
    "id",
    "clear-button"
  );
  var backButton = document.createElement("BUTTON");
  backButton.innerHTML = "Go Back";
  backButton.setAttribute(
    "style",
    "margin-left: 1vw; margin-right: 1vw",
    "id",
    "back-button"
  );

  buttonArea.appendChild(clearButton);
  buttonArea.appendChild(backButton);
  return [clearButton, backButton];
}

//Populates the Highscore page with current highscores saved
function addScores() {
  var docHS = document.createElement("ol");
  docHS.setAttribute("id", "highscore-list");
  sortScores();
  for (entry in highscoreList) {
    var newElement = document.createElement("li");
    newElement.innerHTML = entry + ": " + highscoreList[entry];
    docHS.appendChild(newElement);
  }
  quizArea.insertBefore(docHS, highscoreArea);
  return docHS;
}

function sortScores() {
  //Code snippet from stack overflow
  //https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
  var sortedScores = Object.fromEntries(
    Object.entries(highscoreList).sort(([, a], [, b]) => b - a)
  );

  highscoreList = sortedScores;
}

//Returns the page back to its original appearance
function reset(area, clear, back) {
  highscoreButton.setAttribute("id", "view-highscore");
  mainHeader.textContent = "Coding Quiz Challenge!";
  mainHeader.setAttribute("style", "text-align: center");
  //brings back text area
  textArea.setAttribute("style", "display: block");
  textArea.textContent =
    "Answer as many of the following questions as you can in the next 60 seconds! Every wrong answer takes away 10 seconds. Compete against the high scores and see who is the greatest coder!";
  startButton.setAttribute("style", "display: inline");
  area.removeChild(clear);
  area.removeChild(back);
  quizArea.removeChild(document.querySelector("#highscore-list"));
}

//Resets the highscore array and updates page
function clearHighscores() {
  highscoreList = { No: "", One: "", Has: "", Won: "", Yet: "" };
  quizArea.removeChild(document.querySelector("#highscore-list"));
  addScores();
}

function showQuestion(text, answers, answer) {
  highscoreButton.setAttribute("id", "disabled");
  buttonArea.setAttribute("style", "Flex-direction: column");

  questionNum++;
  mainHeader.textContent = "Question " + questionNum;
  textArea.textContent = text;
  var answerChoice = ["A.", "B.", "C.", "D."];
  for (i = 0; i < answerChoice.length; i++) {
    var newOption = document.createElement("button");
    newOption.textContent = answerChoice[i] + " " + answers[i];
    newOption.setAttribute("class", "question-option");
    buttonArea.appendChild(newOption);
  }

  var allButtons = buttonArea.querySelectorAll(".question-option");
  questionButtons = allButtons;
  for (i = 0; i < allButtons.length; i++) {
    allButtons[i].setAttribute("style", "width: 70%");
    allButtons[i].addEventListener("click", function (event) {
      checkAnswer(event, answer, allButtons);
    });
  }
}

function pickQuestion(allQuestions) {
  //Selects a random question from the array index
  var randomQuestion = Math.floor(Math.random() * allQuestions.length);
  var questionStruct = allQuestions[randomQuestion];
  allQuestions.splice(randomQuestion, 1);

  var question = questionStruct[0];
  var options = [
    questionStruct[1],
    questionStruct[2],
    questionStruct[3],
    questionStruct[4],
  ];
  var answer = questionStruct[5];

  return [question, options, answer];
}

function genQuestion() {
  var question;
  var options;
  var answer;
  [question, options, answer] = pickQuestion(questionArray);
  showQuestion(question, options, answer);
}

function checkAnswer(event, correctAnswer, currentButtons) {
  event.stopPropagation();
  var selection = event.target.innerText;
  selection = selection.split(".")[0];
  console.log(correctAnswer);
  console.log(selection);
  if (selection == correctAnswer) {
    console.log("correct!");
    correctAnswers++;
    document.querySelector("#number-correct").textContent =
      "Correct: " + correctAnswers;
  } else {
    console.log("incorrect!");
    inccorectAnswers++;
  }
  for (i = 0; i < currentButtons.length; i++) {
    buttonArea.removeChild(currentButtons[i]);
  }
  if (questionArray.length !== 0) {
    genQuestion();
  } else {
    addHighscores();
  }
}

function addHighscores() {
  buttonArea.setAttribute("style", "flex-direction: row");
  viewHighscores();
  highscoreArea.setAttribute("style", "display: flex");
  submitButton = highscoreArea.querySelector("#submit-highscore");
  submitButton.addEventListener("click", function () {
    var initials = highscoreArea.querySelector("input").value;
    if (initials.value !== "") {
      highscoreList[initials] = correctAnswers;
      highscoreButton.setAttribute("id", "view-highscore");
      viewHighscores();
    }
  });
}

highscoreButton.addEventListener("click", viewHighscores);
startButton.addEventListener("click", function () {
  answerArea.setAttribute("style", "display: flex");
  buttonArea.removeChild(startButton);
  genQuestion();
});
