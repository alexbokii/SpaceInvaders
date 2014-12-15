$(function() {
    console.log("Hello");

    //1. Load game on press any button from landing page
    $('.landing').keypress(function(){
        location.href='file:///Users/alexbokii/Documents/coding/SpaceInvaders/game.html';
    });

    //2. Add alien to every cell
    $('td').html('<img src="../alien1.png">');

    //3. Add moving of alliens
    function moveAllien() {
        $('td img').animate({ left: "+=20" }, 2000)
                    .animate({ top: "+=10" }, 2000)
                    .animate({left: "-=20", top: "-=10"}, 2000);
    }

    moveAllien(); //first call before setInterval
    setInterval(moveAllien, 7000);

    //4. Move our main hero (me)
    $(document).keydown(function(e) {
        var myPosition = $('.me').css('left');
        myPosition = myPosition.replace(/[^0-9]/g, '');
        console.log(myPosition);
        if(e.which == 37 && myPosition > 19) {
            console.log("left pressed");
            $('.me').animate({left: "-=20"}, 10);
        }
    });

    $(document).keydown(function(e) {
        var myPosition = $('.me').css('left');
        myPosition = myPosition.replace(/[^0-9]/g, '');
        console.log(myPosition);
        if(e.which == 39 && myPosition < 581) {
            console.log("right pressed");
            $('.me').animate({left: "+=20"}, 10);
        }
    });
});





// Questions:
// 1. Why browser gets picture from home folder