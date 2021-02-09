var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0; //start level

$(document).keydown(function(){ //Press down on A
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
    
});

$(".btn").click(function(){
    var userChosenColors = this.id; //get the user's chosen colors
    userClickedPattern.push(userChosenColors); //add it to the User pattern

    playSound(userChosenColors);
    animatePress(userChosenColors);

    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");

        $("body").addClass("game-over");
    
        setTimeout(function(){
            $("body").removeClass("game-over");
        },500);

        $("h1").text('Game Over, Press Any Key to Restart');

        startOver();
    }

}

function nextSequence(){
    userClickedPattern = [];

    randomNumber = Math.floor(Math.random()* 4); //returns a random number between 0 - 3  
    var randomChosenColor = buttonColors[randomNumber]; //picking random Colors
    gamePattern.push(randomChosenColor); //Having a sequence for users to match

    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //animation for buttons
    playSound(randomChosenColor); //play button sound

    level++;
    $("h1").text("Level " + level);
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}

function playSound(name){
    var gameSounds = new Audio("sounds/"+name+".mp3");
    gameSounds.play();
}

function animatePress(currentColor){
    var delay = 200;
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },delay)
}

