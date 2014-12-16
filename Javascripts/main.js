$(function() {
    // GENERAL FUNCTIONS
    function receiveNumberFromString(string) {
        var number = string.replace(/[^0-9]/g, '');
        return number;
    }



    //1. Load game on press any button from landing page
    $('.landing').keypress(function(){
        location.href='file:///Users/alexbokii/Documents/coding/SpaceInvaders/game.html';
    });

    //2. Add alien to every cell
    $('td').html('<img src="../alien1.png">');

    //3. Add moving of alliens
    function moveAllien() {
        $('td img').animate({ left: "+=30" }, 3000)
                    .animate({ top: "+=10" }, 2000)
                    .animate({left: "-=20", top: "-=10"}, 2000);
    }

    moveAllien(); //first call before setInterval
    setInterval(moveAllien, 7000);

    //4. Move defender
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

    //5. Create shooting function for defender
    function makeDefenderShot() {
        console.log("Defender make a shot!");
        var gunfire = "<div class='gunfire'></div>";
        $('.me').append(gunfire);
        moveBulletOfDefender($('.gunfire'));
    }

    function checkIfHitAlien() {

    }

    function moveBulletOfDefender(el) {
        setInterval(function() {
            el.animate({top: "-=10px"},100);
            var position = $('.gunfire').css('top');
            console.log(position);
        }, 100);
    }
 
    $(document).keypress(function(e) {
        if(e.which == 32) {
            console.log("makeDefenderShot runs"); 
            makeDefenderShot();
        }
});
});





// Questions:
// 1. Why browser gets picture from home folder