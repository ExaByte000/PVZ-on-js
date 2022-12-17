function BackgroundSound() {
    let audio = new Audio();
    audio.src = 'assets/music/dvor.mp3';
    audio.autoplay = true;
    audio.loop = true;
    audio.volume = 0.3;
}
function ShootSound() {
    let strelbamp3 = new Audio();
    strelbamp3.src = 'assets/music/peeShot.mp3';
    strelbamp3.autoplay = true;
}
function EatingSound() {
    let poedaniemp3 = new Audio();
    poedaniemp3.src = 'assets/music/poedanie.mp3';
    poedaniemp3.autoplay = true;
    poedaniemp3.volume = 0.05;
}
function PlantSound() {
    let posadka = new Audio();
    posadka.src = 'assets/music/posadka.mp3';
    posadka.autoplay = true;
    posadka.volume = 0.5;
}
function EatenSound() {
    let glotanie = new Audio();
    glotanie.src = 'assets/music/sieliRastenie.mp3';
    glotanie.autoplay = true;
    glotanie.volume = 0.5;
}
function ChooseSeed() {
    let vibor = new Audio();
    vibor.src = 'assets/music/choose.mp3';
    vibor.autoplay = true;
    vibor.volume = 0.5;
}
function GameOverSound() {
    let porazhenie = new Audio();
    porazhenie.src = 'assets/music/losemusic.mp3';
    porazhenie.autoplay = true;
    porazhenie.volume = 1.0;
}
function ShovelSound() {
    let lopata = new Audio();
    lopata.src = 'assets/music/shovel.mp3';
    lopata.autoplay = true;
    lopata.volume = 1.0;
}
function shotSound() {
    let popadaniemp3 = new Audio();
    popadaniemp3.src = 'assets/music/popadanie3.mp3';
    popadaniemp3.autoplay = true;
    popadaniemp3.volume = 0.2;
}
function collectSun() {
    let sobiranie = new Audio();
    sobiranie.src = 'assets/music/collectsun.mp3';
    sobiranie.autoplay = true;
    sobiranie.volume = 0.5;
}
let mainmenumusic = new Audio();
mainmenumusic.src = 'assets/music/menu.mp3';
function MainMenuMusicPlay() {
    mainmenumusic.loop = true;
    mainmenumusic.autoplay = true;
    mainmenumusic.volume = 0.5;
}
let chooseseeds = new Audio();
chooseseeds.autoplay = true;
function ChooseSeedsAudioPlay() {
    chooseseeds.volume = 0.5;
    chooseseeds.src = 'assets/music/choseseeds.mp3';
}
function buzzer() {
    let buzzermp3 = new Audio();
    buzzermp3.autoplay = true;
    buzzermp3.src = 'assets/music/buzzer.mp3';
    buzzermp3.volume = 0.8;
}
function winSound() {
    let win = new Audio();
    win.autoplay = true;
    win.src = 'assets/music/winmusic.mp3';
}
