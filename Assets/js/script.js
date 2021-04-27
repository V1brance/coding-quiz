var highscoreButton = document.querySelector("#view-highscore");
var mainHeader = document.querySelector("#main-title");
var textArea = document.querySelector("#text-fill");
var startButton = document.querySelector("#start-button");
var buttonArea = document.querySelector(".button-area");
var quizArea = document.querySelector(".quiz-area");
//key value pair list for the highscores
//Remidner, highscoreList[newName] = score will add new item to object
var highscoreList = {
  SB: 21,
  ML: 19,
  NC: 17,
};

q1 = [
  "What does parentElement.appendChild(childElement) do?",
  "removes child element from its parent",
  "adds child element to the parent",
  "removes the text content from the child element",
  "nothing - this is not a function",
];
q2 = [
  "What does HTML stand for?",
  "Holistic Technical Malleable Language",
  "Hyper-Text Markup Language",
  "Hindering Telegraphed Marked List",
  "Heated Timed Modification Language",
];
q3 = [
  "What is the difference between margin and padding by default?",
  "Padding is inside the element while margin is outside",
  "Margin is inside the element while padding is outside",
  "Margin and padding are both outside the element",
  "Margin and padding are both inside the element",
];

questionArray = [q1, q2, q3];

//Changes elements on the page to display the highscores and their scores
//Includes buttons to go back and clear the highscores
function viewHighscores(event) {
  var clearButton;
  var backButton;
  var docHS;

  event.preventDefault();
  mainHeader.textContent = "Highscores:";
  textArea.setAttribute("style", "display: none");
  mainHeader.setAttribute("style", "text-align: left");
  startButton.setAttribute("style", "display: none");
  if (highscoreButton.id == "view-highscore") {
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
  for (entry in highscoreList) {
    var newElement = document.createElement("li");
    newElement.innerHTML = entry + ": " + highscoreList[entry];
    docHS.appendChild(newElement);
  }
  quizArea.insertBefore(docHS, buttonArea);
  return docHS;
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

function showQuestion(text, answers, questionNum) {
  buttonArea.setAttribute("style", "Flex-direction: column");
  mainHeader.textContent = "Question " + questionNum;
  textArea.textContent = text;
  var answerChoice = ["A.", "B.", "C.", "D."];
  buttonArea.removeChild(startButton);
  for (i = 0; i < answerChoice.length; i++) {
    var newOption = document.createElement("button");
    newOption.textContent = answerChoice[i] + " " + answers[i];
    newOption.setAttribute("class", "question-option");
    buttonArea.appendChild(newOption);
  }
}

highscoreButton.addEventListener("click", viewHighscores);
startButton.addEventListener("click", function () {
  showQuestion(question, answers, 1);
});
