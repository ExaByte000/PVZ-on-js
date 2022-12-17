$(document).ready(function() {
    MainMenuMusicPlay();
    let start = $(".button_start");
    let mainmenu = $(".mainmenu");
    let game = $("game");
    $('#canvas1').width(0);
    $("#canvas1").height(0);
    start.click(function () {
        MainMenuMusicStop();
        mainmenu.fadeOut();
        game.fadeIn();
        $('#canvas1').width(1040);
        $("#canvas1").height(650);
        ShowEnemyes();
    });

});
