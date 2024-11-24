$(document).ready(function () {
    let gamePattern = [];
    let userClickedPattern = [];
    let buttonColors = ["red", "blue", "green", "yellow"];
    let level = 0;
    let started = false;

    $(document).on("keypress", function () {
        if (!started) {
            $("#level-title").text(`Poziom ${level}`);
            nextSequence();
            started = true;
        }
    });

    $(".button").on("click", function () {
        let userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    });

    function nextSequence() {
        userClickedPattern = [];
        level++;
        $("#level-title").text(`Poziom ${level}`);

        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);

        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
    }

    function playSound(name) {
        let audio = new Audio(`dzwieki/${name}.mp3`);
        audio.play();
    }

    function animatePress(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function () {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    }

    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(nextSequence, 1000);
            }
        } else {
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Koniec gry, naciśnij dowolny klawisz, aby rozpocząć od nowa");

            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            startOver();
        }
    }

    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }
});
