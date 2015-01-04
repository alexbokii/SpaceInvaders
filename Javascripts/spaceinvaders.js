$(function() {
    var aliens = {};
    var bulletOffset;
    // var enemyPositionTop = [];
    // var enemyPositionLeft = [];
    // var aliens = [[1,6,11,16,21,26,31,36,41,46,51],
    //             [2,7,12,17,22,27,32,37,42,47,52],
    //             [3,8,13,18,23,28,33,38,43,48,53],
    //             [4,9,14,19,24,29,34,39,44,49,54],
    //             [5,10,15,20,25,30,35,45,50,55]];


    var aliens = [[{top: '0px', left: '0px'},{top: '0px', left: '50px'},{top: '0px', left: '100px'},{top: '0px', left: '150px'},{top: '0px', left: '200px'}],
                [{top: '50px', left: '0px'},{top: '50px', left: '100px'},{top: '50px', left: '150px'},{top: '50px', left: '200px'},{top: '50px', left: '250px'}],
                [{top: '100px', left: '0px'},{top: '100px', left: '50px'},{top: '100px', left: '150px'},{top: '100px', left: '150px'},{top: '100px', left: '200px'}],
                [{top: '150px', left: '0px'},{top: '150px', left: '50px'},{top: '150px', left: '100px'},{top: '150px', left: '150px'},{top: '150px', left: '200px'}],
                [{top: '200px', left: '0px'},{top: '200px', left: '50px'},{top: '200px', left: '100px'},{top: '200px', left: '150px'},{top: '200px', left: '200px'}]];

    console.log(aliens);
    console.log(aliens[1].length);

    function showAliens(aliens) {
        for(var i = 0; i < aliens.length; i++) {
            console.log(i);
            $('.aliens-container').append('<div class="row' + i +'"></div>');
            for(var j = 0; j < aliens[i].length; j++) {
                console.log(j);
                $('.row' + i + '').append('<div class="alien column-'+ j +'"></div>');   
            }
        }
    }
    showAliens(aliens);

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

            var enemyPositionTop = [];
            for(var i = parseInt(enemyOffset.top); i <= enemyOffset.top+ 54; i++) {
                enemyPositionTop.push(i);
            }
            enemyOffset.outlineTop = enemyPositionTop;

            var enemyPositionLeft = [];
            for(var i = parseInt(enemyOffset.left); i <= enemyOffset.left+ 54; i++) {
                enemyPositionLeft.push(i);
            }
            enemyOffset.outlineLeft = enemyPositionLeft;
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
            console.log(aliens);
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
        console.log(aliens(outlineLeft).length);
        for(var i = 0; i < Object.keys(aliens).length; i++) {
            // console.log(enemyPositionTop[i]);
            if(bulletOffset.top ) {
                console.log("Enemy is -");
                for (var i = 0; i < Object.keys(aliens).length; i++) {
                    if(bulletOffset.left) {
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