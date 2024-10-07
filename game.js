var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function(){
    if(!started)
    {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});
function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.random()*4;

    var n=Math.floor(randomNumber);
   
    var randomChosenColour=buttonColours[n];
    gamePattern.push(randomChosenColour);
    

$("#"+ randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });

 playSound(randomChosenColour);
}
$(".btn").on("click",function(){

    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
    var soundsName=name +".mp3";
var audio = new Audio("sounds/"+ soundsName);
audio.play();
}
function animatePress(currentColour)
{
 $("#"+currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
 
}

function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
       
      console.log("wrong");

      //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
      playSound("wrong");

      //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
      
  

}
function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
  }
  


