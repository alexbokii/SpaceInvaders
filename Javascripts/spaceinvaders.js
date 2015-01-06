$(function() {
    var activeDefenderShot = false;  // variable to check is there is existing bullet of defender
    // var ifHit = false;

    // 1
    var aliens = [[{'class':'c1r1'},{'class':'c1r2'},{'class':'c1r3'}],
                [{'class':'c2r1'},{'class':'c2r2'},{'class':'c2r3'}],
                [{'class':'c3r1'},{'class':'c3r2'},{'class':'c3r3'}],
                [{'class':'c4r1'},{'class':'c4r2'},{'class':'c4r3'}],
                [{'class':'c5r1'},{'class':'c5r2'},{'class':'c5r3'}],
                [{'class':'c6r1'},{'class':'c6r2'},{'class':'c6r3'}],
                [{'class':'c7r1'},{'class':'c7r2'},{'class':'c7r3'}]];


    function showAliens(aliens) {
        for(var i = 0; i < aliens.length; i++) {
            $('.aliens-container').append('<div class="row' + i + '"></div>');
            for(var j = 0; j < aliens[i].length; j++) {
                $('.row' + i + '').append('<div class="' + aliens[i][j].class + '"><img src="../alien1.png"></div>');
            }
        }
    }
    showAliens(aliens);
    calculateAlienCurrentPosition(aliens);

    // 2
    function calculateAlienCurrentPosition(array) {
        for(var i = 0; i < array.length; i++) {
            if(Array.isArray(array[i])) {
                for(var j = 0; j < array[i].length; j++) {
                    if(array[i][j] != undefined) {
                        var domEl = $('.' + array[i][j].class + '');
                        var position = $(domEl).offset();
                        array[i][j].position = position;
                    }
                }
            }
        }
    }

    // 3
    var moveAlien = function () {
        console.log("calling moveAlien");
        $('.aliens-container').animate({ left: "+=380" }, 15000)
                    .animate({ top: "+=20" }, 5000)
                    .animate({left: "-=380"}, 15000);
    };
    moveAlien();
    var moveAliensID = setInterval(moveAlien,35000);

    // 4
    // move defender
    function receiveNumberFromString(string) {
        var number = string.replace(/[^0-9]/g, '');
        return number;
    }

    $(document).keydown(function(e) {
        var position = $('.defender').css('left');
        myPosition = receiveNumberFromString(position);
        if(e.which == 37 && myPosition > 19) {
            $('.defender').animate({left: "-=20"}, 10);
        }
    });

    $(document).keydown(function(e) {
        var position = $('.defender').css('left');
        myPosition = receiveNumberFromString(position);
        if(e.which == 39 && myPosition < 581) {
            $('.defender').animate({left: "+=20"}, 10);
        }
    });

    //make a shot
    $(document).keypress(function(e) {
        if(e.which == 32) {
            if(!activeDefenderShot) {
                createDefenderShot();
            }
        }
    });

    //5
    function createDefenderShot() {
        activeDefenderShot = true;
        $('.defender').append("<div class='gunfire'></div>");
        var timerMoveDEfenderBullet = setInterval(function() {
            $('.gunfire').css({'top': "-=1"});

            if(parseInt($('.gunfire').css('top')) < -400) {
                clearInterval(timerMoveDEfenderBullet);
                $('.gunfire').remove();
                activeDefenderShot = false;
            }
            checkDefenderShot();
        }, 0);
    }

    function checkDefenderShot() {
        var bulletPosition = $('.gunfire').offset();
        calculateAlienCurrentPosition(aliens);

        for(var i = 0; i < aliens.length; i++) {
            for(var j = 0; j < aliens[i].length; j++) {
                if(bulletPosition.top == aliens[i][j].position.top + 50) {
                    if(bulletPosition.left === aliens[i][j].position.left || 
                    bulletPosition.left > aliens[i][j].position.left && bulletPosition.left < aliens[i][j].position.left + 50) {
                        removeKilledAlien(aliens[i][j]);
                        break;
                    }
                }
            }
        }
    }

    function removeKilledAlien(alien) {
        $("." + alien.class + "").html('');

        var killedAlien = findKeyByValue(aliens, 'class', alien.class);
        delete aliens[killedAlien[0]][killedAlien[1]];
    }

    function findKeyByValue(array, key, value) {
        for(var i = 0; i < array.length; i++) {
            for(var j = 0; j < array[i].length; j++)
                if(array[i][j].hasOwnProperty(key) && array[i][j][key] === value) {
                    return [i, j];
                }
        }
    }
});