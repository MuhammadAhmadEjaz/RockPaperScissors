// variables
var userSelection;
var userScore = 0;

//elements
var rockButton = document.getElementById("rock-button");
var paperButton = document.getElementById("paper-button");
var scissorsButton = document.getElementById("scissors-button");
var score = document.getElementById("score");
var drawScreen = document.getElementById("draw-screen");
var winScreen = document.getElementById("win-screen");
var loseScreen = document.getElementById("lose-screen");
var playArea = document.getElementById("play-area");
var nextRound = document.getElementById("next-round");
var playAgain = document.getElementById("play-again");
var computerChoiceElement = document.getElementById("computer-choice");

//event listeners

rockButton.addEventListener("click", () => setUserSelection("rock"));
paperButton.addEventListener("click", () => setUserSelection("paper"));
scissorsButton.addEventListener("click", () => setUserSelection("scissors"));

//initial adjustments
drawScreen.style.display = "none";
winScreen.style.display = "none";
loseScreen.style.display = "none";
nextRound.style.display = "none";
playAgain.style.display = "none";

// available choices in order of advantage over one another
const availableChoices = ["rock", "paper", "scissors"];

// computer generates a random choice here
function computerPlay() {
  let choice =
    availableChoices[Math.floor(Math.random() * availableChoices.length)];
  return choice;
}

//creating computer selection element
function showComputerChoice(choice) {

  var image = computerChoiceElement.children[0]
  image.setAttribute('src',`./Assets/${choice}.png`)
  // image.src = `../Assets/${choice}.png`
  // computerChoiceElement.style.cursor='pointer';

  if (choice === "rock") {
    computerChoiceElement.style.border = "20px solid #4b63f3";
  } else if (choice === "paper") {
    computerChoiceElement.style.border = "20px solid #e79819";
  } else {
    computerChoiceElement.style.border = "20px solid #d33450";
  }

  computerChoiceElement.style.display='block'
}

// setting the user selection
function setUserSelection(selection) {
  userSelection = selection;
  hideChoices(userSelection);
  if (playGame(userSelection, computerPlay()) === 1) {
    userScore++;
    score.innerHTML = userScore;
  }
  if (userScore < 5) {
    nextRound.style.display = "block";
  } else {
    playAgain.style.display = "block";
  }
}

// hiding unselected choices
function hideChoices(selection) {
  //showing only the selected for animation
  if (selection === "rock") {
    paperButton.style.display = "none";
    scissorsButton.style.display = "none";
  } else if (selection === "paper") {
    rockButton.style.display = "none";
    scissorsButton.style.display = "none";
  } else {
    rockButton.style.display = "none";
    paperButton.style.display = "none";
  }
}

//showing choices
function showChoices(params) {
  rockButton.style.display = "block";
  paperButton.style.display = "block";
  scissorsButton.style.display = "block";
}

//showing & hiding divs
function showNextButton() {
  nextRound.style.display = "block";
}
function showAgainButton() {
  playAgain.style.display = "block";
}
function hideButtons() {
  nextRound.style.display = "none";
  playAgain.style.display = "none";
}
function hideResults() {
  drawScreen.style.display = "none";
  winScreen.style.display = "none";
  loseScreen.style.display = "none";
}
function hideComputerChoice(){
  computerChoiceElement.style.display='none'
}

//button onclick functions
function onNextClick() {
  hideResults();
  hideButtons();
  showChoices();
  hideComputerChoice();
}
function onAgainClick() {
  hideResults();
  hideButtons();
  showChoices();
  hideComputerChoice();
  userScore=0;
  score.innerHTML = userScore;
}

//function that plays the game
function playGame(userSelection, computerSelection) {
  if (
    (userSelection === "rock" && computerSelection === "paper") ||
    (userSelection === "paper" && computerSelection === "scissors") ||
    (userSelection === "scissors" && computerSelection === "rock")
  ) {
    loseScreen.style.display = "block";
    showComputerChoice(computerSelection);
    return -1;
  } else if (
    (userSelection === "rock" && computerSelection === "scissors") ||
    (userSelection === "paper" && computerSelection === "rock") ||
    (userSelection === "scissors" && computerSelection === "paper")
  ) {
    winScreen.style.display = "block";
    showComputerChoice(computerSelection);
    return 1;
  } else {
    drawScreen.style.display = "block";
    showComputerChoice(computerSelection);
    return 0;
  }
}

//main function that let the game loop
function main() {
  //event listeners
  if (
    nextRound.style.display === "none" &&
    playAgain.style.display === "none"
  ) {
    rockButton.addEventListener("click", () => setUserSelection("rock"));
    paperButton.addEventListener("click", () => setUserSelection("paper"));
    scissorsButton.addEventListener("click", () =>
      setUserSelection("scissors")
    );
  }
}
