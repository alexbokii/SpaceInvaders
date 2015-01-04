$(function() {

    // 1
    var aliens = [[{'class':'c1r1'},{'class':'c1r2'},{'class':'c1r3'}],
                [{'class':'c2r1'},{'class':'c2r2'},{'class':'c2r3'}],
                [{'class':'c3r1'},{'class':'c3r2'},{'class':'c3r3'}],
                [{'class':'c4r1'},{'class':'c4r2'},{'class':'c4r3'}],
                [{'class':'c5r1'},{'class':'c5r2'},{'class':'c5r3'}],
                [{'class':'c6r1'},{'class':'c6r2'},{'class':'c6r3'}],
                [{'class':'c7r1'},{'class':'c7r2'},{'class':'c7r3'}]];

    // var aliens = [[{'class':'c1r1'},{'class':'c2r1'},{'class':'c3r1'}, {'class':'c4r1'},{'class':'c5r1'},{'class':'c6r1'}, {'class':'c7r1'}],
    //             [{'class':'c1r2'},{'class':'c2r2'},{'class':'c3r2'}, {'class':'c4r2'},{'class':'c5r2'},{'class':'c6r2'}, {'class':'c7r2'}],
    //             [{'class':'c1r3'},{'class':'c2r3'},{'class':'c3r3'}, {'class':'c4r3'},{'class':'c5r3'},{'class':'c6r3'}, {'class':'c7r3'}]];


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
                    var domEl = $('.' + array[i][j].class + '');
                    var position = $(domEl).offset();
                    array[i][j].position = position;
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
            createDefenderShot();
        }
    });

    // 5
    function createDefenderShot() {
        $('.defender').append("<div class='gunfire'></div>");
        var timerMoveDEfenderBullet = setInterval(function() {
            $('.gunfire').css({'top': "-=1"});
            if(checkIfAlienIsHit()) {
                console.log("Alien is killed");
                clearInterval(timerMoveDEfenderBullet);
                $('.gunfire').remove();
            }
        }, 1);
        
    }

    function checkIfAlienIsHit() {
        var bulletPosition = $('.gunfire').offset();
        var bulletTop = bulletPosition.top;
        var bulletLeft = bulletPosition.left;

        calculateAlienCurrentPosition(aliens);

        for(var i = 0; i < aliens.length; i++) {
            var lastAlienTop = parseInt(aliens[i][aliens[i].length - 1].position.top);
            var lastAlienLeft = parseInt(aliens[i][aliens[i].length - 1].position.left);
        }
        if(bulletTop == lastAlienTop + 50) {
            for(var i = 0; i < aliens.length; i++) {
                var lastAlien = aliens[i].length - 1;
                if(bulletLeft == aliens[i][lastAlien].position.left || bulletLeft > aliens[i][lastAlien].position.left && bulletLeft < aliens[i][lastAlien].position.left + 50) {
                    $('.' + aliens[i][lastAlien].class + '').html('');
                    return true;
                }
            }
        }

    }
        

});