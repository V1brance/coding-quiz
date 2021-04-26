var highscoreButton = document.querySelector("#view-highscore");
var mainHeader = document.querySelector("#main-title");
var textArea = document.querySelector("#text-fill");

//key value pair list for the highscores
//Remidner, highscoreList[newName] = score will add new item to object
var highscoreList = {};

//Changes elements on the page to display the highscores and their scores
//Includes buttons to go back and clear the highscores
function viewHighscores(event) {
  //prevent default behavior of refreshing page on click
  event.preventDefault();
  //Change the title to read Highscore
  mainHeader.textContent = "Highscores:";
  //Clear the text out of the intro text
  textArea.textContent = "";
  //Move the title off to the left side of the page
  mainHeader.setAttribute("style", "text-align: left");
  //removes the start quiz button
  document
    .querySelector("#start-button")
    .setAttribute("style", "display: none");
  addButtons();
}

function addButtons() {
  var clearButton = document.createElement("BUTTON");
  clearButton.innerHTML = "Clear Highscores";
  clearButton.setAttribute(
    "style",
    "font-size: 17px; margin-left: 1vw; margin-right: 1vw"
  );
  var backButton = document.createElement("BUTTON");
  backButton.innerHTML = "Go Back";
  backButton.setAttribute("style", "margin-left: 1vw; margin-right: 1vw");

  var buttonArea = document.querySelector(".button-area");

  console.log(buttonArea);

  buttonArea.appendChild(clearButton);
  buttonArea.appendChild(backButton);
}

highscoreButton.addEventListener("click", viewHighscores);
