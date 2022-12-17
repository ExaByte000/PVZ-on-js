// Параметры холста
let canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1040;
canvas.height = 650;

// Переменные
const cellSize = 100;
const cellGap = 3;
let numberOfResources = 50; //50
let enemiesInterval = 600;
let frame = 0;
let gameOver = false;
let score = 0;
const winningScore = 1500;
let chosenDefender = 1;

// Массивы
const gameGrid = [];
const sunflowers = [];
const peshooters = [];
const wallnuts = [];
const enemies = [];
const enemyPositions = [];
const projectiles = [];
const resources = [];

// Параметры мыши
const mouse = {
    x: 10,
    y: 10,
    width: 0.1,
    height: 0.1,
    click: false
}

canvas.addEventListener('mousedown', function() {
    mouse.click = true;
})

canvas.addEventListener('mouseup', function() {
    mouse.click = false;
})

// Сброс положения мыши
canvas.addEventListener('mouseleave', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});

// Перемещение мыши
let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
});
////////////////////////////Игровое поле////////////////////////////

// Параметры строки статуса
const controlsBar = {
    width: 0,
    height: cellSize,
}

// Ячейка
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
    }

    // Выделение при наведении
    draw() {
        if (mouse.x && mouse.y && collision(this, mouse)) {
            if (chosenDefender === 1) {
                ctx.drawImage(transparentSunflover,0,0,36,36, this.x, this.y, 75, 80);
            }
            if (chosenDefender === 2) {
                ctx.drawImage(transparentPeshooter,0,0,36,36, this.x, this.y, 75, 80);
            }
            if (chosenDefender === 3) {
                ctx.drawImage(transparentWallnut,0,0,36,36, this.x, this.y, 75, 80);
            }
            if (chosenDefender === 4) {
                ctx.drawImage(shovel,this.x, this.y, 75, 80);
            }
        }
    }
}



// Проверка ячеек на наличие мыши над ними
function handleGameGrid() {
    for (let i = 0; i < gameGrid.length; i++) {
        gameGrid[i].draw();
    }
}

// Рисование игрового поля
function createGrid() {
    for (let y = cellSize; y < canvas.height - cellSize; y += cellSize) {
        for (let x = cellSize; x < canvas.width - cellSize; x += cellSize) {
            gameGrid.push(new Cell(x, y));
        }
    }
}
createGrid();

// Выбор растения
let plants = {
    id: 0,
    sunflower: {
        x: 197,
        y: 10,
        width: 50,
        height: 60
    },
    peshooter: {
        x: 257,
        y: 10,
        width: 50,
        height: 60
    },

    wallnut: {
        x: 317,
        y: 10,
        width: 50,
        height: 60,
    }
}

// Инструмент
let tools = {
    shovel: {
        x: 502,
        y: 0,
        width: 80,
        height: 80,
    }
}

let plant1stroke = 'black';
let plant2stroke = 'black';
let plant3stroke = 'black';
let shovelStroke = 'black';
function chooseDefender() {
    if (collision(mouse, plants.sunflower) && mouse.click) {
        chosenDefender = 1;
        if (frame % 5 === 0) {ChooseSeed();}
    }
    else if (collision(mouse, plants.peshooter) && mouse.click) {
        chosenDefender = 2;
        if (frame % 5 === 0) {ChooseSeed();}
    }
    else if (collision(mouse, plants.wallnut) && mouse.click) {
        chosenDefender = 3;
        if (frame % 5 === 0) {ChooseSeed();}
    }
    else if (collision(mouse, tools.shovel) && mouse.click) {
        chosenDefender = 4;
        if (frame % 5 === 0) {ShovelSound();}
    }
    switch (chosenDefender) {
        case 1:
        plant1stroke = 'gold';
        plant2stroke = 'black';
        plant3stroke = 'black';
        shovelStroke = 'black';
        break;
        case 2:
        plant1stroke = 'black';
        plant2stroke = 'gold';
        plant3stroke = 'black';
        shovelStroke = 'black';
        break;
        case 3:
        plant1stroke = 'black';
        plant2stroke = 'black';
        plant3stroke = 'gold';
        shovelStroke = 'black';
        break;
        case 4:
        plant1stroke = 'black';
        plant2stroke = 'black';
        plant3stroke = 'black';
        shovelStroke = 'red';
        break;
        default:
        plant1stroke = 'black';
        plant2stroke = 'black';
        plant3stroke = 'black';
        shovelStroke = 'black';
    }
    ctx.drawImage(chooseUI, 0,0,580,143, 100, 0, 403,94)
    ctx.lineWidth = 3;
    ctx.fillStyle = 'rgba(0,0,0,0.5)'

    ctx.drawImage(sunflower, 2, 0, 38, 38, plants.sunflower.x, plants.sunflower.y, plants.sunflower.width, plants.sunflower.height);
    ctx.strokeStyle = plant1stroke;
    ctx.strokeRect(plants.sunflower.x-5, plants.sunflower.y, plants.sunflower.width+3, plants.sunflower.height + 10);

    ctx.strokeStyle = plant2stroke;
    ctx.strokeRect(plants.peshooter.x-6, plants.peshooter.y,  plants.peshooter.width+4, plants.peshooter.height+10);
    ctx.drawImage(peshooter, 0, 0, 38, 38, plants.peshooter.x-4, plants.peshooter.y,  plants.peshooter.width, plants.peshooter.height);

    ctx.drawImage(wallnut, 0, 0, 38, 38, plants.wallnut.x-5, plants.wallnut.y, plants.wallnut.width, plants.wallnut.height);
    ctx.strokeStyle = plant3stroke;
    ctx.strokeRect(plants.wallnut.x-6, plants.wallnut.y, plants.wallnut.width+4, plants.wallnut.height+10);

    ctx.drawImage(shovelIcon, 0, 0, 139, 141, tools.shovel.x, tools.shovel.y, tools.shovel.width, tools.shovel.height);
    ctx.strokeStyle = shovelStroke;
    ctx.strokeRect(tools.shovel.x, tools.shovel.y, tools.shovel.width, tools.shovel.height);
}
// Описание пуль
class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y - 45;
        this.width = 35;
        this.height = 50;
        this.power = 20;
        this.speed = 5;
        this.bulletWidth = 10;
        this.bulletHeight = 20;
        this.frameX = 0;
        this.minFrame = 0;
        this.maxFrame = 2;
    }

    update() {
        this.x += this.speed;
    }

    draw() {
        ctx.drawImage(bullet, this.frameX * this.bulletWidth, 0, this.bulletWidth, this.bulletHeight, this.x, this.y, this.width, this.height);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
    }

}

// Пули
function handleProjectiles() {
    for (let i = 0; i < projectiles.length; i++) {
        projectiles[i].update();
        projectiles[i].draw();

        for (let j = 0; j < enemies.length; j++) {
            if (enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])) {
                enemies[j].health -= projectiles[i].power;
                projectiles.splice(i, 1);
                i--;
                shotSound();

                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            }
        }
        if (projectiles[i] && projectiles[i].x > canvas.width - cellSize) {
            projectiles.splice(i, 1);
            i--;
        }
    }
}

/////////////////Растения/////////////////

// Описание подсолнуха
class SunFlower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = cellSize - cellGap * 2.5;
        this.height = cellSize - cellGap * 2.5;
        this.health = 2000;
        this.timer = 0;
        this.frameX = 0;
        this.sunflowerSize = {
            Width: 38,
            Height: 38
        }
        this.defenderID = 'sunflower';
        this.minFrame = 0;
        this.maxFrame = 7;
        this.spawnsun = true;
    }
    draw() {
        plants.id = 1;
        ctx.drawImage(sunflower, this.frameX * this.sunflowerSize.Width, 0, this.sunflowerSize.Height, this.sunflowerSize.Width, this.x, this.y, this.width, this.height);
    }

    update() {
        if (frame % 10 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
        if (this.spawnsun) {
            this.timer++;
            if (this.timer % 650 === 0) {
                handleResourcesSun(this.x, this.y);
            }
        }
        else {
            this.timer = 0;
        }

    }
}

// Подсолнух
function handleSunflower() {
    for (let i = 0; i < sunflowers.length; i++) {
        sunflowers[i].draw();
        sunflowers[i].update();
        for (let j = 0; j < enemies.length; j++) {
            if (sunflowers[i] && collision(sunflowers[i], enemies[j])) {
                enemies[j].movement = 0;
                sunflowers[i].health -= 1;
                if (frame % 43 === 0) {
                    // EatingSound();
                }
            }
            if (sunflowers[i] && sunflowers[i].health <= 0) {
                for (let l = 0; l < enemies.length; l++) {
                    for (let k = 0; k < sunflowers.length; k++) {
                        if (enemies[l].x - (enemies[l].x % cellSize) + cellGap  === sunflowers[k].x) {
                            enemies[l].movement = enemies[j].speed;
                        }
                    }
                }
                sunflowers.splice(i, 1);
                i--;
                EatenSound();
            }
        }
    }

}

// Опиание горохострела
class Peshooter {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = cellSize - cellGap * 2.5;
        this.height = cellSize - cellGap * 2.5;
        this.shooting = false;
        this.shootNow = false;
        this.health = 2000;
        this.timer = 0;
        this.frameX = 0;
        this.peshooterSize = {
            Width: 38,
            Height: 38
        }
        this.minFrame = 0;
        this.maxFrame = 10;
    }

    draw() {
        plants.id = 2;
        ctx.drawImage(peshooter, this.frameX * this.peshooterSize.Height, 0, this.peshooterSize.Width, this.peshooterSize.Height, this.x, this.y, this.width, this.height);
    }

    update() {
        if (frame % 10 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
            if(this.frameX === 8) {
                this.maxFrame = 8;
                this.shootNow = true;
            }
        }
        if (this.shooting && this.shootNow) {
                this.maxFrame = 10
                projectiles.push(new Projectile(this.x + 70, this.y + 50));
                ShootSound();
                this.shootNow = false;
            }
        }

}

// Горохострел
function handlePeshooter() {
    for (let i = 0; i < peshooters.length; i++) {
        peshooters[i].draw();
        peshooters[i].update();
        peshooters[i].shooting = enemyPositions.indexOf(peshooters[i].y) !== -1;
        for (let j = 0; j < enemies.length; j++) {
            if (peshooters[i] && collision(peshooters[i], enemies[j])) {
                enemies[j].movement = 0;
                peshooters[i].health -= 1;
                if (frame % 43 === 0) {
                    // EatingSound();
                }
            }
            if (peshooters[i] && peshooters[i].health <= 0) {
                for (let l = 0; l < enemies.length; l++) {
                    for (let k = 0; k < peshooters.length; k++) {
                        if (enemies[l].x - (enemies[l].x % cellSize) + cellGap  === peshooters[k].x) {
                            enemies[l].movement = enemies[j].speed;
                        }
                    }
                }
                peshooters.splice(i, 1);
                i--;
                EatenSound();
            }
        }
    }
}

// Описание ореха
class Wallnut {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = cellSize - cellGap * 2.5;
        this.height = cellSize - cellGap * 2.5;
        this.health = 10000;
        this.timer = 0;
        this.frameX = 0;
        this.wallnutSize = {
            Width: 38,
            Height: 38
        }
        this.minFrame = 0;
        this.maxFrame = 4;
    }
    draw() {
        plants.id = 3;
        if (this.health >= 5000) {
            ctx.drawImage(wallnut, this.frameX * this.wallnutSize.Height, 0, this.wallnutSize.Width, this.wallnutSize.Height, this.x, this.y, this.width, this.height);
        }
        else if (this.health >= 2500 && this.health <= 5000) {
            ctx.drawImage(wallnut, this.frameX * this.wallnutSize.Height, 40, this.wallnutSize.Width, this.wallnutSize.Height, this.x, this.y, this.width, this.height);
        }
        else if(this.health <= 2500){
            ctx.drawImage(wallnut, this.frameX * this.wallnutSize.Height, 80, this.wallnutSize.Width, this.wallnutSize.Height, this.x, this.y, this.width, this.height);
        }
    }
    update() {
        if (frame % 10 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
    }
}
// Орех
function handleWallnut() {
    for (let i = 0; i < wallnuts.length; i++) {
        wallnuts[i].draw();
        wallnuts[i].update();
        for (let j = 0; j < enemies.length; j++) {
            if (wallnuts[i]) {
                if (collision(wallnuts[i], enemies[j])) {
                    enemies[j].movement = 0;
                    wallnuts[i].health -= 1;
                    if (frame % 43 === 0) {
                        // EatingSound();
                    }
                }
                if (wallnuts[i].health <= 0) {
                    for (let l = 0; l < enemies.length; l++) {
                        for (let k = 0; k < wallnuts.length; k++) {
                            if (enemies[l].x - (enemies[l].x % cellSize) + cellGap  === wallnuts[k].x) {
                                enemies[l].movement = enemies[j].speed;
                            }
                        }
                    }
                    wallnuts.splice(i, 1);
                    i--;
                }
            }
        }
    }
}

//Выполнение функций обработки растений
function handleDefenders() {
    handlePeshooter();
    handleSunflower();
    handleWallnut();
}

//////////////////////////////////////////////

let cost = {
    sunflowerCost: 50,
    peshoterCost: 100,
    wallnutCost: 50,
}
// Всё что пероисходит на клик
canvas.addEventListener('click', function() {
    const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
    const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
    // Ограничение активной зоны
    if (gridPositionY < cellSize) return;
    if (gridPositionX < cellSize) return;
    if (gridPositionY > cellSize * 6) return;
    if (gridPositionX > cellSize * 10) return;
    for (let i = 0; i < sunflowers.length; i++) {
        if (sunflowers[i].x === gridPositionX && sunflowers[i].y === gridPositionY) return;
    }
    for (let i = 0; i < peshooters.length; i++) {
        if (peshooters[i].x === gridPositionX && peshooters[i].y === gridPositionY) return;
    }
    for (let i = 0; i < wallnuts.length; i++) {
        if (wallnuts[i].x === gridPositionX && wallnuts[i].y === gridPositionY) return;
    }
    if (numberOfResources < (cost.sunflowerCost || cost.peshoterCost || cost.wallnutCost)) {
        buzzer();
    }
    // Распределение стоймости растений
    switch (chosenDefender) {
        case 1:
        if (numberOfResources >= cost.sunflowerCost) {
            sunflowers.push(new SunFlower(gridPositionX, gridPositionY));
            numberOfResources -= cost.sunflowerCost;
            PlantSound();
        }

        break;
        case 2:
        if (numberOfResources >= cost.peshoterCost) {
            peshooters.push(new Peshooter(gridPositionX, gridPositionY));
            numberOfResources -= cost.peshoterCost;
            PlantSound();
        }

        break;
        case 3:
        if (numberOfResources >= cost.wallnutCost) {
            wallnuts.push(new Wallnut(gridPositionX, gridPositionY));
            numberOfResources -= cost.wallnutCost;
            PlantSound();
        }

        break;
    }
});

// Лопата
function Shovel() {
    const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
    const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
    if (chosenDefender === 4 && mouse.click) {
        for (let i = 0; i < sunflowers.length; i++) {
            // Для подсолнуха
            if (gridPositionX === sunflowers[i].x && gridPositionY === sunflowers[i].y) {
                for (let l = 0; l < enemies.length; l++) {
                    for (let k = 0; k < sunflowers.length; k++) {
                        if (enemies[l].x - (enemies[l].x % cellSize) + cellGap  === sunflowers[k].x) {
                            enemies[l].movement = enemies[l].speed;
                        }
                    }
                }
                sunflowers.splice(i, 1);
                i--;
                PlantSound();
            }
        }
        for (let i = 0; i < peshooters.length; i++) {
            // Для горохострела
            if (gridPositionX === peshooters[i].x && gridPositionY === peshooters[i].y) {
                for (let l = 0; l < enemies.length; l++) {
                    for (let k = 0; k < peshooters.length; k++) {
                        if (enemies[l].x - (enemies[l].x % cellSize) + cellGap  === peshooters[k].x) {
                            enemies[l].movement = enemies[l].speed;
                        }
                    }
                }
                peshooters.splice(i, 1);
                i--;
                PlantSound();
            }
        }
        for (let i = 0; i < wallnuts.length; i++) {
            // Для ореха
            if (gridPositionX === wallnuts[i].x && gridPositionY === wallnuts[i].y) {
                for (let l = 0; l < enemies.length; l++) {
                    for (let k = 0; k < wallnuts.length; k++) {
                        if (enemies[l].x - (enemies[l].x % cellSize) + cellGap  === wallnuts[k].x) {
                            enemies[l].movement = enemies[l].speed;
                        }
                    }
                }
                wallnuts.splice(i, 1);
                i--;
                PlantSound();
            }
        }
    }
}


// Описание зомби растений
const enemyTypes = [];
enemyTypes.push(enemy1);
class Enemy {
    constructor(verticalPosition) {
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.speed = Math.random() * 0.2 + 0.4;
        this.movement = this.speed;
        this.health = 100;
        this.maxHealth = this.health;
        this.enemyType = enemyTypes[0];
        this.frameX = 0;
        this.minFrame = 0;
        this.maxFrame = 4;
        this.spriteWidth = 38;
        this.spriteHeight = 38;
    }
    update() {
        this.x -= this.movement;
        if (frame % 30 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
    }
    draw() {
        ctx.drawImage(this.enemyType, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

// Враги
function handleEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update();
        enemies[i].draw();
        if (enemies[i].x < 0) {
            gameOver = true;
        }
        if (enemies[i].health <= 0) {
            let gainedResources = enemies[i].maxHealth/10;
            score += gainedResources;
            const findThisIndex = enemyPositions.indexOf(enemies[i].y);
            enemyPositions.splice(findThisIndex, 1);
            enemies.splice(i, 1);
            i--;
        }
    }
    if (frame % enemiesInterval === 0 && score < winningScore) {
        let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;
        setTimeout(function (){enemies.push(new Enemy(verticalPosition));}, 20000) //20000
        enemyPositions.push(verticalPosition);
        if (enemiesInterval > 120) enemiesInterval -= 50;
    }
}
const amounts = [25, 25, 25, 25];
// Описание солнышек подолнуха
class ResourceSun {
    constructor(suncordx, suncordy) {
        this.x = suncordx;
        this.y = suncordy;
        this.width = cellSize * 0.6;
        this.height = cellSize * 0.6;
        this.amount = amounts[3];
        this.frameX = 0;
        this.minFrame = 0;
        this.maxFrame = 1;
        this.spriteWidth = 25.2;
        this.spriteHeight = 29;
    }

    draw() {
        ctx.drawImage(chlorophyll, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    update() {
        if (frame % 15 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
    }
}

// Выпадение солнышек подсолнуха
let suncordx;
let suncordy;
function handleResourcesSun(suncordx, suncordy) {
    resources.push(new ResourceSun(suncordx, suncordy));
}

// Описание солнышек

class Resource {
    constructor() {
        this.x = Math.random() * (canvas.width - cellSize);
        this.y = (Math.floor(Math.random() * 5) + 1) * cellSize + 25;
        this.width = cellSize * 0.6;
        this.height = cellSize * 0.6;
        this.amount = amounts[Math.floor(Math.random() * (amounts.length - 1))];
        this.frameX = 0;
        this.minFrame = 0;
        this.maxFrame = 1;
        this.spriteWidth = 25.2;
        this.spriteHeight = 29;
    }
    draw() {
        ctx.drawImage(chlorophyll, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    update() {
        if (frame % 15 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
    }
}


// Выпадение солнышек
function handleResources() {
    if (frame % 500 === 0 && score < winningScore) {
        resources.push(new Resource());
    }
    for (let i = 0; i < resources.length; i++) {
        resources[i].draw();
        resources[i].update();
        if (resources[i] && mouse.x && mouse.y && collision(resources[i], mouse)) {
            numberOfResources += resources[i].amount;
            collectSun();
            resources.splice(i, 1);
            i--;
        }
    }
}

// Инофрмация
function handleGameStatus() {
    ctx.fillStyle = 'black';
    ctx.font = '25px Orbitron';
    if(numberOfResources <= 99){
        ctx.fillText(numberOfResources, 130, 83);
    }
    else if(numberOfResources >= 1000){
        ctx.fillText(numberOfResources, 120, 83);
    }
    else{
        ctx.fillText(numberOfResources, 125, 83);
    }
    ctx.font = '16px Orbitron';
    ctx.fillText(cost.sunflowerCost, plants.sunflower.x+5, 77)
    ctx.fillText(cost.peshoterCost, plants.peshooter.x, 77)
    ctx.fillText(cost.wallnutCost, plants.wallnut.x+5, 77)
    if (gameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '90px Orbitron';
        ctx.fillText('GAME OVER', 135, 330);
        GameOverSound();
    }
    if (score >= winningScore && enemies.length === 0) {
        ctx.fillStyle = 'black';
        ctx.font = '60px Orbitron';
        ctx.fillText('ТЫ ПОБЕДИЛ!', 300, 300);
    }
}
if (score >= winningScore) {
    winSound();
}
// Начальная анимация движения фона
function ShowEnemyes() {
    let positionA = 0;
    let positionB = 175;
    ChooseSeedsAudioPlay();
    setTimeout(TimeWait, 2500);
    ctx.drawImage(background_full, positionA, 0, 270, 192, 0, 0, 1040, 650);
    function TimeWait() {
        setTimeout(AnimateBackgroundRight, 0);
        function AnimateBackgroundRight() {
            ctx.drawImage(background_full, positionA, 0, 270, 192, 0, 0, 1040, 650);
            let animateA = setTimeout(AnimateBackgroundRight, 10)
            positionA++;
            if (positionA === 175) {
                clearTimeout(animateA);
                setTimeout(function() {
                    setTimeout(function AnimateBackgroundLeft() {
                        ctx.drawImage(background_full, positionB, 0, 270, 192, 0, 0, 1040, 650);
                        let animateB = setTimeout(AnimateBackgroundLeft, 10)
                        positionB--;
                        if (positionB === 55) {
                            clearTimeout(animateB);
                            animate();
                            BackgroundSound();
                            ChooseSeedsAudioStop();
                        }
                    }, 0);
                }, 3500);
            }
        }
    }

}

// Основная функция игры
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background_full, 55, 0, 270, 192, 0, 0, 1040, 650);
    ctx.drawImage(grass5, -70, -60, 990, 725, 0, 0, 1020, 630);
    ctx.fillRect(0,0,controlsBar.width, controlsBar.height);
    handleGameGrid();
    handleDefenders();
    handleResources();
    handleProjectiles();
    handleEnemies();
    chooseDefender();
    handleGameStatus();
    Shovel();
    frame++;
    if (!gameOver) requestAnimationFrame(animate);
    if (gameOver) {
        GameMusicStop();
    }

}

// Функция просчета коллизии
function collision(first, second) {
    return  !(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y);
    }

    window.addEventListener('resize', function() {
        canvasPosition = canvas.getBoundingClientRect();
    })
function MainMenuMusicStop() {
    mainmenumusic.pause();
}
function GameMusicStop() {
    audio.pause();
}
function ChooseSeedsAudioStop() {
    chooseseeds.pause();
}
let userName = document.getElementById('userName').value;
