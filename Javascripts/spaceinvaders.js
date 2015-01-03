$(function() {
    var aliens = {};
    var bulletOffset;
    var enemyPositionTop = [];
    var enemyPositionLeft = [];
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

    $(".alien").html('<img src="../alien1.png">');

    function receiveNumberFromString(string) {
        var number = string.replace(/[^0-9]/g, '');
        return number;
    }

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

    // moveAlien
    var moveAlien = function () {
        console.log("calling moveAlien");
        $('.alien').animate({ left: "+=380" }, 15000)
                    .animate({ top: "+=20" }, 5000)
                    .animate({left: "-=380"}, 15000);
    };
    moveAlien();
    var moveAliensID = setInterval(moveAlien,35000);

    // create big object of aliens
    $('.aliens-container div.alien').each(function() {
        var parent = $(this).parent().attr('class');
        var attr = $(this).attr('class').split(' ')[1];
        var position = $(this).offset();
        var newAlien = parent+attr;
        aliens[parent+"-"+attr] = position;
    });

    console.log(Object.keys(aliens).length);

    function renewPositionOfAlien() {
        for(var alien in aliens) {
            var el = alien.split("-");
            var domEl = $("."+ el[0] + " " + "." + el[1]);
            var domElPosition = $(domEl).offset();
            aliens[alien] = domElPosition;
        }
    }

    function outlineAlienArea() {
        for(var alien in aliens) {
            var enemyOffset = aliens[alien];

            enemyPositionTop = [];
            for(var i = parseInt(enemyOffset.top); i <= enemyOffset.top+ 54; i++) {
                enemyPositionTop.push(i);
            }

            enemyPositionLeft = [];
            for(var i = parseInt(enemyOffset.left); i <= enemyOffset.left+ 54; i++) {
                enemyPositionLeft.push(i);
            }
        }
    }

    // gun
    function makeDefenderShot() {
        var gunfire = "<div class='gunfire'></div>";
        $('.me').append(gunfire);
        moveBulletOfDefender($('.gunfire'));
    }

    function moveBulletOfDefender(el) {
        var bulletMoving = setInterval(function() {
            renewPositionOfAlien();
            outlineAlienArea();
            bulletOffset = $('.gunfire').offset();
            if(!checkIfHitAlien()) {
                $('.gunfire').animate({top: "-=20"}, 10);
                renewPositionOfAlien();
                outlineAlienArea();
                bulletOffset = $('.gunfire').offset();
                console.log(bulletOffset);
            }
            else {
                // renewPositionOfAlien();
                // outlineAlienArea();
                clearInterval(bulletMoving);
            }
        }, 500);
    }

    function checkIfHitAlien() {
        // console.log(Object.keys(aliens).length, bulletOffset.top, enemyPositionTop);
        console.log(aliens, enemyPositionTop[3]);
        for(var i = 0; i < Object.keys(aliens).length; i++) {
            console.log(enemyPositionTop[i]);
            if(bulletOffset.top == enemyPositionTop[i]) {
                console.log("Enemy is -");
                for (var i = 0; i < Object.keys(aliens).length; i++) {
                    if(bulletOffset.left == enemyPositionLeft[i]) {
                        console.log("WIN");
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }
    }
});