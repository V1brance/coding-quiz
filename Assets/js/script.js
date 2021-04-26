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

highscoreButton.addEventListener("click", viewHighscores);
