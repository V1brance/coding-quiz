var highscoreButton = document.querySelector("#view-highscore");
var mainHeader = document.querySelector("#main-title");
var textArea = document.querySelector("#text-fill");
var startButton = document.querySelector("#start-button");
var buttonArea = document.querySelector(".button-area");

//key value pair list for the highscores
//Remidner, highscoreList[newName] = score will add new item to object
var highscoreList = {};

//Changes elements on the page to display the highscores and their scores
//Includes buttons to go back and clear the highscores
function viewHighscores(event) {
  var clearButton;
  var backButton;

  //prevent default behavior of refreshing page on click
  event.preventDefault();
  //Change the title to read Highscore
  mainHeader.textContent = "Highscores:";
  //Clear the text out of the intro text
  textArea.textContent = "";
  //Move the title off to the left side of the page
  mainHeader.setAttribute("style", "text-align: left");
  //removes the start quiz button
  startButton.setAttribute("style", "display: none");

  [clearButton, backButton] = addButtons();
  backButton.addEventListener("click", function () {
    reset(buttonArea, clearButton, backButton);
  });
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

//Returns the page back to its original appearance
function reset(area, clear, back) {
  mainHeader.textContent = "Coding Quiz Challenge!";
  mainHeader.setAttribute("style", "text-align: center");
  textArea.textContent =
    "Answer as many of the following questions as you can in the next 60 seconds! Every wrong answer takes away 10 seconds. Compete against the high scores and see who is the greatest coder!";
  startButton.setAttribute("style", "display: inline");
  area.removeChild(clear);
  area.removeChild(back);
}

highscoreButton.addEventListener("click", viewHighscores);
