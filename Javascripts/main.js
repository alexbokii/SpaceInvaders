$(function() {
    // GENERAL FUNCTIONS
    function receiveNumberFromString(string) {
        var number = string.replace(/[^0-9]/g, '');
        return number;
    }


    // KEY EVENTS
    //load game from landing page
    $('.landing').keypress(function(){
        location.href='file:///Users/alexbokii/Documents/coding/SpaceInvaders/game.html';
    });

    // move defender
    $(document).keydown(function(e) {
        var position = $('.me').css('left');
        myPosition = receiveNumberFromString(position);
        if(e.which == 37 && myPosition > 19) {
            console.log("left pressed");
            $('.me').animate({left: "-=20"}, 10);
        }
    });

    $(document).keydown(function(e) {
        var position = $('.me').css('left');
        myPosition = receiveNumberFromString(position);
        if(e.which == 39 && myPosition < 581) {
            console.log("right pressed");
            $('.me').animate({left: "+=20"}, 10);
        }
    });
    //make a shot
    $(document).keypress(function(e) {
        if(e.which == 32) {
            console.log("makeDefenderShot runs"); 
            makeDefenderShot();
        }
    });


    //1. Add alien to every cell
    $('td').html('<img src="../alien1.png">');

    //2. Add moving of alliens
    (function moveAllien() {
        $('td img').animate({ left: "+=30" }, 3000)
                    .animate({ top: "+=10" }, 2000)
                    .animate({left: "-=20", top: "-=10"}, 2000);
    })();

    setInterval(moveAllien, 7000);

    //3. Create shooting function for defender
    function makeDefenderShot() {
        var gunfire = "<div class='gunfire'></div>";
        $('.me').append(gunfire);
        moveBulletOfDefender($('.gunfire'));
    }

    var checkIfHitAlien = function() {
        var position = parseInt($('.gunfire').css('top'), 10);
        console.log(position);
        if(position > -100) {
            return true;
        }
        else {
            return false;
        }
    };

    function moveBulletOfDefender(el) {
        var bulletMoving = setInterval(function() {
            console.log(checkIfHitAlien());
            if(checkIfHitAlien()) {
                $('.gunfire').animate({top: "-=10"}, 10);
            }
            else {
                clearInterval(bulletMoving);
            }
        }, 500);
    }
 
});
