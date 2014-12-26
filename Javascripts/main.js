$(function() {
    // GENERAL FUNCTIONS AND VARIABLES
    var defender = {
        lives: 3,
        score: 0
    }

    var aliens = {};


    var bulletOffset;

    function receiveNumberFromString(string) {
        var number = string.replace(/[^0-9]/g, '');
        return number;
    }

    var map = [[1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1]];

    function showAliens(map) {
        for(var i = 0; i < map.length; i++) {
            $('.aliens-container').append('<div class="row' + i +'"></div>');
            $.each(map[i], function(index, value) {
                if(value != 0) {
                    $('.row' + i).append('<div class="alien column' + index +'"></div>');
                }
            });
        } 
    }

    showAliens(map);

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
    $(".alien").html('<img src="../alien1.png">');

    //2. Add moving of alliens
    var moveAllien = function () {
        console.log("calling moveAlien");
        $('.alien').animate({ left: "+=30" }, 3000)
                    .animate({ top: "+=10" }, 2000)
                    .animate({left: "-=20", top: "-=10"}, 2000);
    };

    var moveAliensID = setInterval(moveAllien,7000);

    //3. Create shooting function for defender
    function makeDefenderShot() {
        var gunfire = "<div class='gunfire'></div>";
        $('.me').append(gunfire);
        moveBulletOfDefender($('.gunfire'));
    }

    var checkIfHitAlien = function() {
        var position = parseInt($('.gunfire').css('top'), 10);
        // console.log(position);
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
                bulletOffset = $('.gunfire').offset();
                console.log(bulletOffset);
            }
            else {
                renewPositionOfAlien();
                compareBulletsAndAliensPosition();
                clearInterval(bulletMoving);
            }
        }, 500);
    }

    //4. Check if bullet has the same position as alian
    (function checkAlienPosition() {
        $('.alien').each(function(index) {
            var alienOffset = $(this).offset();
        });
    })();

    //5. Create object for every alien and check their positions on the page
    $('.aliens-container div.alien').each(function() {
        var parent = $(this).parent().attr('class');
        var attr = $(this).attr('class').split(' ')[1];
        var position = $(this).offset();
        var newAlien = parent+attr;
        aliens[parent+"-"+attr] = position;
    });

    function renewPositionOfAlien() {
        for(var alien in aliens) {
            var el = alien.split("-");
            var domEl = $("."+ el[0] + " " + "." + el[1]);
            var domElPosition = $(domEl).offset();
            aliens[alien] = domElPosition;
        }
    }

    //6. Compare bullet position and alien position
    function compareBulletsAndAliensPosition() {
        for(var alien in aliens) {
            var enemyOffset = aliens[alien];

            enemyPositionTop = [];
            for(var i = enemyOffset.top; i <= enemyOffset.top+ 54; i++) {
                enemyPositionTop.push(i);
            }

            enemyPositionLeft = [];
            for(var i = enemyOffset.left; i <= enemyOffset.left+ 54; i++) {
                enemyPositionLeft.push(i);
            }

            console.log(enemyOffset, bulletOffset, enemyPositionTop, enemyPositionLeft);
            if(enemyOffset == bulletOffset) {
                console.log("ENEMY IS KILLED!");
            }
        }
    }
  
});


// Questions:
// 1. Why browser gets picture from home folder