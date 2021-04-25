var highscoreButton = document.querySelector("#view-highscore");
var mainHeader = document.querySelector("#main-title");
var textArea = document.querySelector("#text-fill");

function viewHighscores(event) {
  event.preventDefault();
  mainHeader.textContent = "Highscores:";
  textArea.textContent = "";
  mainHeader.setAttribute("style", "text-align: left");
}

highscoreButton.addEventListener("click", viewHighscores);
