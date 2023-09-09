
var buttonColours = ["red", "blue", "green", "yellow"];
var started=false
var gamePattern = [];
var userClickedPattern = [];
var level_c=0;


$(document).keypress(function() {
  if(!started){
    $("#level-title").text("Level"+level_c);
    started=true;
    nextSequence();
   
  }
  
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
  
  if (userClickedPattern.length === gamePattern.length){
  setTimeout(nextSequence(), 1000);
  }
}
else{
  
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}

}

function startOver(){
  level_c=0;
  gamePattern=[];
  started=false;
}
function nextSequence() {
  level_c=level_c+1
  $("#level-title").text("Level"+level_c);
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
