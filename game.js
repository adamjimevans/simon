var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})

$(document).keydown (function(){
  if(!started){
    $("h1").text("level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence(){
  userClickedPattern=[];
  $("h1").text("level " + level);
  level++;
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor)

}

function playSound(name){
  var audio = new Audio(name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");

  }, 100);
}

function checkAnswer(currentLevel){
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
  console.log("success");
  if (userClickedPattern.length===gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
  }

}
else{
  console.log("wrong");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, press any key to restart");
  startOver()
}
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
