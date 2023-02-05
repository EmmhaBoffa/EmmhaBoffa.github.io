const gameBoard = document.getElementById("game-board");
const display = document.querySelector(".display");
const menu = document.getElementById("menu");
const button = document.querySelector(".start")
const buttonSound = document.querySelector(".button-sound");
const buttonAudio = new Audio("sounds/button.mp3");
const music = new Audio("sounds/music.mp3");
const musicMenu = new Audio(`sounds/menuMusic1.mp3`);
let musicSelect = 1;
let ultimPuntuacion = 0;
let startGame = false;
let movement = "rigth";
let movementBot = "rigth";
let snake = []; //Serpiente
let snakeMenu = [];
let difficulty;
let puntuacion = 0;
let soundSwich = 0;


const dificultad = (puntuacion) => {
    if (puntuacion < 4) {
        return 1;
    }
    if (puntuacion < 20 && puntuacion >= 4) {
        clearInterval(game);
        game = setInterval(moverSerpiente,150);
        return 2;
    }
    if (puntuacion < 30 && puntuacion >= 20) {
        clearInterval(game);
        game = setInterval(moverSerpiente,100);
        return 3;
    }
    if (puntuacion < 40 && puntuacion >= 30) {
        clearInterval(game);
        game = setInterval(moverSerpiente,75);
        return 4;
    }
    if (puntuacion >= 40 && puntuacion < 50) {
        clearInterval(game);
        game = setInterval(moverSerpiente,69);
        return 5;
    }
    if (puntuacion >= 50) {
        clearInterval(game);
        game = setInterval(moverSerpiente,55);
        return 6;
    }
}
const comida = () =>{
    let x = Math.trunc(Math.random() * 10) * 40;
    let y = Math.trunc(Math.random() * 10) * 40;
    let food = document.createElement("div");
    food.style.left = x + "px";
    food.style.top = y + "px";
    food.classList.add("food");
    gameBoard.appendChild(food);
}
//Funcion para inicializar la serpiente
const iniciarSerpiente = () => { 
    for (let i = 0; i < 5; i++) {
        let snakeUnit = document.createElement("div");
        if (i == 0) {
            snakeUnit.classList.add("head");
        }
            snakeUnit.style.left = 50 - i * 10 + "px";
            snakeUnit.style.top = 0 + "px";
            snakeUnit.classList.add("snake-unit");
            snake[i] = snakeUnit;
            gameBoard.appendChild(snakeUnit);
            
        
        
    }
}
//Funcion si detecta colision con las paredes o ella misma
const choque = (snake,medida) =>{
    if (snake[0].offsetLeft == medida || snake[0].offsetTop == medida || snake[0].offsetLeft < 0 || snake[0].offsetTop < 0){ //deteccion de paredes
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].offsetLeft == snake[i].offsetLeft && snake[0].offsetTop == snake[i].offsetTop){
            return true;
        }
    }
    return false;
}
//Funcion para mover la serpiente
const moverSerpiente = () => {
    if (choque(snake,400) == true){
        musicSelect = Math.trunc(Math.random()*3 + 1)
        console.log(musicSelect);
        musicMenu.src = "sounds/menuMusic"+musicSelect+".mp3";
        musicMenu.currentTime = 0;
        musicMenu.play();
        musicMenu.volume = soundSwich;
        ultimPuntuacion = puntuacion;
        music.pause();
        music.currentTime = 0;
        puntuacion = 0;
        let remove = gameBoard.querySelectorAll(".snake-unit");
        for (let i = 0; i < remove.length; i++) {
            gameBoard.removeChild(remove[i]);
        }
        remove = gameBoard.querySelectorAll(".food");
        gameBoard.removeChild(remove[0]);           
        gameBoard.style.zIndex = "0";
        menu.style.display = "";
        clearInterval(game);
        startGame = false;
        puntuacionDiv = document.getElementById("puntuacion");
        puntuacionDiv.innerHTML = "Puntuacion: " + puntuacion + "<br> Dificultad: " + difficulty ;
        snake = [];
        startMenu();

    }else{
    let food = document.querySelector(".food");
    let HeadX = snake[0].offsetLeft;
    let HeadY = snake[0].offsetTop;
    let newX;
    let newY;
    if (movement == "rigth") {
        snake[0].style.left = HeadX + 10 + "px";
    }
    if (movement == "down") {
        snake[0].style.top = HeadY + 10 + "px";
    }
    if (movement == "up") {
        snake[0].style.top = HeadY - 10 + "px";
    }
    if (movement == "left") {
        snake[0].style.left = HeadX - 10 + "px";
    }
    
    for (let i = 1; i < snake.length; i++){
        newX = snake[i].offsetLeft;
        newY = snake[i].offsetTop;
        snake[i].style.left = HeadX + "px";
        snake[i].style.top =  HeadY + "px";
        HeadX = newX;
        HeadY = newY;
    }
    if (snake[0].offsetLeft == food.offsetLeft && snake[0].offsetTop == food.offsetTop) { //Para cuando come :3
        aumentarPuntuacion();
        gameBoard.removeChild(food);
        const comer = new Audio("sounds/eat.mp3");
         comer.volume = 0.2;
        comer.play();
        let snakeUnit = document.createElement("div");
        snakeUnit.classList.add("snake-unit");
        snakeUnit.style.left = snake[snake.length - 1].offsetLeft + "px";
        snakeUnit.style.top = snake[snake.length - 1].offsetTop + "px";
        snake.push(snakeUnit);
        gameBoard.appendChild(snakeUnit);
        comida();
    }
}
}

const aumentarPuntuacion = () =>{
    difficulty = dificultad(puntuacion);
    puntuacion += 1;
    let puntuacionDiv = document.getElementById("puntuacion");
    puntuacionDiv.innerHTML = `Puntuacion: ${puntuacion}<br> Dificultad: ${difficulty}` ;
    
}
//Funcion para empezar el juego
function start(){
    difficulty = dificultad(puntuacion);
    let puntuacionDiv = document.getElementById("puntuacion");
    puntuacionDiv.innerHTML = "Puntuacion: " + puntuacion + "<br> Dificultad: " + difficulty;
    game = setInterval(moverSerpiente,170);
    iniciarSerpiente();
    comida();
}
document.addEventListener("keydown",function(event){
    if (event.keyCode == 38) {
        if (movement != "down"){
            movement = "up"
        }
    }
    if (event.keyCode == 37) {
        if (movement != "rigth") {
            movement = "left"
        }
    }
    if (event.keyCode == 39) {
        if (movement != "left") {
            movement = "rigth"
        }
    }
    if (event.keyCode == 40) {
        if (movement != "up") {
            movement = "down"
        }
    }
    });

const iniciarSerpienteMenu = () => { 
    for (let i = 0; i < 5; i++) {
        let snakeUnit = document.createElement("div");
        if (i == 0) {
            snakeUnit.classList.add("head");
        }
            snakeUnit.style.left = 50 - i * 10 + "px";
            snakeUnit.style.top = 10 + "px";
            snakeUnit.classList.add("snake-unit");
            snakeMenu[i] = snakeUnit;
            display.appendChild(snakeUnit);   
    }
}
movimientosRamdoms = () => {
    let mover = Math.trunc(Math.random() * 3);
    if (mover == 3) {
        if (movementBot != "down"){
            movementBot = "up"
        }
    }
    if (mover == 0) {
        if (movementBot != "rigth") {
            movementBot = "left"
        }
    }
    if (mover == 1) {
        if (movementBot != "left") {
            movementBot = "rigth"
        }
    }
    if (mover == 2) {
        if (movementBot != "up") {
            movementBot = "down"
        }
    }  
}
const serpienteRandom = () => {
    movimientosRamdoms();
    let newX;
    let newY;
    let HeadX = snakeMenu[0].offsetLeft;
    let HeadY = snakeMenu[0].offsetTop;
    if (movementBot == "rigth") {
        snakeMenu[0].style.left = HeadX + 10 + "px";
    }
    if (movementBot == "down") {
        snakeMenu[0].style.top = HeadY + 10 + "px";
    }
    if (movementBot == "up") {
        snakeMenu[0].style.top = HeadY - 10 + "px";
    }
    if (movementBot == "left") {
        snakeMenu[0].style.left = HeadX - 10 + "px";
    }
    for (let i = 1; i < snakeMenu.length; i++){
        newX = snakeMenu[i].offsetLeft;
        newY = snakeMenu[i].offsetTop;
        snakeMenu[i].style.left = HeadX + "px";
        snakeMenu[i].style.top =  HeadY + "px";
        HeadX = newX;
        HeadY = newY;
    }
    
    
    if(choque(snakeMenu,200)==true){
        let remove = display.querySelectorAll(".snake-unit");
        for (let i = 0; i < remove.length; i++) {
            display.removeChild(remove[i]);
        }   
        clearInterval(gameMenu);
        startMenu();  
    }
    

    
    
}
function startMenu(){
    let ultPuntuacion = menu.querySelector(".lastPuntuacion");
    ultPuntuacion.innerHTML = "Ultima Puntuacion: " + ultimPuntuacion;
    if (startGame==false) {
        iniciarSerpienteMenu();
        gameMenu = setInterval(serpienteRandom,300);
    }
    
}
musicMenu.addEventListener("ended",function(){
    musicMenu.currentTime = 0;
    musicMenu.play();
})

button.onclick = function(){
    console.log(soundSwich);
    musicMenu.pause();
    musicMenu.currentTime = 0;
    if (soundSwich == 0){
        music.volume = soundSwich;
    }else{
        music.volume = soundSwich + 0.1;
    }
    buttonAudio.play();
    music.play();
    clearInterval(gameMenu);
    startGame = true;
    gameBoard.style.zIndex = "2";
    menu.style.display = "none";
    movement = "rigth"; 
    let remove = display.querySelectorAll(".snake-unit");
    for (let i = 0; i < remove.length; i++) {
        display.removeChild(remove[i]);
    }   
    start();
};

buttonSound.onclick = function(){
    if (soundSwich == 0){
        soundSwich = 0.03;
        musicMenu.play();
        musicMenu.volume = 0.03;
        buttonSound.style.backgroundImage = "url('imagen/sonido.png')";
        buttonSound.style.backgroundSize = "contain";
        
    }else{
        musicMenu.volume = 0;
        buttonSound.style.backgroundImage = "url('imagen/sin-sonido.png')";
        buttonSound.style.backgroundSize = "contain";
        soundSwich = 0;
    }

    
};


buttonSound.style.backgroundImage = "url('imagen/sin-sonido.png')";
buttonSound.style.backgroundSize = "contain";
startMenu();


















