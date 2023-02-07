// ||||||||||||JUEGO DE SNAKE|||||||||||
// ||||||||||BY: EMANUEL BOFFADOSSI|||||
// |||||||||||||||||||||||||||||||||||||
// ||||||  ||||||||||||||||||  |||||||||
// |||||||||||||||||||||||||||||||||||||
// ||||||  ||||||||||||||||||  |||||||||
// ||||||||                  |||||||||||
//||||||||||||||||||||||||||||||||||||||

//||||||||||||||||||||||||||VARIABLES GLOBALES|||||||||||||||||||//
const gameBoard = document.getElementById("game-board");
const display = document.querySelector(".display");
const menu = document.getElementById("menu");
const button = document.querySelector(".start")
const buttonSound = document.querySelector(".button-sound");
const buttonAudio = new Audio("sounds/button.mp3");
const music = new Audio("sounds/music.mp3");
const musicMenu = new Audio(`sounds/menuMusic1.mp3`);
let canMove;
let musicSelect = 1;
let ultimPuntuacion = 0;
let startGame = false;
let movement = "rigth";
let snake = []; //Serpiente
let difficulty;
let puntuacion = 0;
let soundSwich = 0;

//|||||||||||||||||||||||||||| CODIGO PRINCIPAL JUEGO ||||||||||||||||||||||||||//
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
        game = setInterval(moverSerpiente,95);
        return 4;
    }
    if (puntuacion >= 40 && puntuacion < 50) {
        clearInterval(game);
        game = setInterval(moverSerpiente,86);
        return 5;
    }
    if (puntuacion >= 50) {
        clearInterval(game);
        game = setInterval(moverSerpiente,80);
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
const removerSerpiente = (divSelector,lugar) =>{     
    let remove = divSelector.querySelectorAll(".snake-unit");
    for (let index = 0; index < remove.length; index++) {
        divSelector.removeChild(remove[index]); 
    }    
    
    if (lugar == "Tablero") {
        
        snake = [];
    }
}
const removerComida = () => {
    remove = gameBoard.querySelectorAll(".food");
    gameBoard.removeChild(remove[0]);  
}
const desaparecerTablero = (bool) => {
    if (bool == true) {
        gameBoard.style.zIndex = "0";
        menu.style.display = "";
    }else{
        gameBoard.style.zIndex = "1";
        menu.style.display = "none";
    }
    
}
const musicMenuPlay = () => {
    musicSelect = Math.trunc(Math.random()*3 + 1);
    musicMenu.src = "sounds/menuMusic"+musicSelect+".mp3";
    musicMenu.currentTime = 0;
    musicMenu.play();
    musicMenu.volume = soundSwich;
}
const gameOver = () => {
    console.log("game over");
    startGame = false;
    movement = "rigth";
    if (ultimPuntuacion < puntuacion) {
        ultimPuntuacion = puntuacion;
    }
    music.pause();
    music.currentTime = 0;
    puntuacion = 0;
    removerSerpiente(gameBoard,"Tablero");   
    removerComida();      
    desaparecerTablero(true);
    clearInterval(game);
    musicMenuPlay();
    startMenu();
    puntuacionDiv = document.getElementById("puntuacion");
    puntuacionDiv.innerHTML = "Puntuacion: " + puntuacion + "<br> Dificultad: " + difficulty ;
}
let time = 700;
const animacion = (index) =>{
    
    if (index >= snake.length){
        gameOver();
    }else{
    const dead1= new Audio(`sounds/dead.mp3`);
    const dead2= new Audio(`sounds/dead2.mp3`);
    const dead3= new Audio(`sounds/dead3.mp3`);
    const dead4= new Audio(`sounds/dead4.mp3`);
    const dead5= new Audio(`sounds/dead5.mp3`);
    switch (index) {
        case 0:
            // particle = document.createElement("div")
            // particle.classList.add("particle");
            // particle.style.left = snake[0].offsetLeft + "px";
            // particle.style.top = snake[0].offsetTop + 2 + "px";
            // gameBoard.appendChild(particle);
            
            dead1.play(); 
            break;
        case 1:
            dead2.play(); 
        break;
        case 2:
            dead3.play(); 
        break;
        case 3:
            dead4.play(); 
        break;
        case 5:
            dead5.play(); 
        break;
    
        default:
            dead5.play();
            break;
    }
    
      
    snake[(snake.length-1)-index].style.display = "none";

    if (time > 200){
        time = time-100
    }

    setTimeout(() => {
        animacion(index + 1)
    }, time);
    }
    
    
}
const moverSerpiente = () => {
    if (choque(snake,400) == true){
        music.pause();
        clearInterval(game);
        animacion(0);
    }else{
    tecla();
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
    eating();
    canMove = true;
}
}
const eating = () =>{
    let food = document.querySelector(".food");
    if (snake[0].offsetLeft == food.offsetLeft && snake[0].offsetTop == food.offsetTop) { //Para cuando come :3
        aumentarPuntuacion();//Aumenta Puntuacion
        removerComida();//Remueve la comida

        const comer = new Audio("sounds/eat.mp3");//Reproduce audio eat
        comer.volume = 0.4;
        comer.play();

        let snakeUnit = document.createElement("div");//Aumenta el tamaño de la serpiente
        snakeUnit.classList.add("snake-unit");
        snakeUnit.style.left = snake[snake.length - 1].offsetLeft + "px";
        snakeUnit.style.top = snake[snake.length - 1].offsetTop + "px";
        snake.push(snakeUnit);
        gameBoard.appendChild(snakeUnit);

        comida(); //Crea una nueva comida
    }
}
const aumentarPuntuacion = () =>{
    difficulty = dificultad(puntuacion);
    puntuacion += 1;
    let puntuacionDiv = document.getElementById("puntuacion");
    puntuacionDiv.innerHTML = `Puntuacion: ${puntuacion}<br> Dificultad: ${difficulty}` ;
    
}
function start(){
    difficulty = dificultad(puntuacion);
    let puntuacionDiv = document.getElementById("puntuacion");
    puntuacionDiv.innerHTML = "Puntuacion: " + puntuacion + "<br> Dificultad: " + difficulty;
    game = setInterval(moverSerpiente,170);
    iniciarSerpiente();
    comida();
}
const tecla = () =>{
    document.addEventListener("keydown",function(event){
        if (canMove == true){
            switch (event.keyCode) {
                case 38:
                    if (movement != "down"){
                        movement = "up"
                    }
                    break;
                case 37:
                    if (movement != "rigth") {
                        movement = "left"
                    }
                    break;
                case 39:
                    if (movement != "left") {
                        movement = "rigth"
                    }
                    break;
                case 40:
                    if (movement != "up") {
                        movement = "down"
                    }
                    break;  
                default:
                    break;
                
            }
        }   
        canMove = false;
        });
}




// ||||||||||||||||||| MENU DEL JUEGO |||||||||||||||||||||||||||//

let movementBot = "rigth";
let snakeMenu = [];
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
buttonSound.style.backgroundImage = "url('imagen/sin-sonido.png')";
buttonSound.style.backgroundSize = "contain";
function startMenu(){
    let ultPuntuacion = menu.querySelector(".lastPuntuacion");
    ultPuntuacion.innerHTML = "Mejor Puntuacion: " + ultimPuntuacion;
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
    desaparecerTablero(false); 
    removerSerpiente(display,"Menu");
    canMove = false;
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


//||||||||||||| CONTROLES MOVILES |||||||||||||||||||||||||//



let up = document.querySelector(".up");
let down = document.querySelector(".down");
let left = document.querySelector(".left");
let rigth = document.querySelector(".rigth");

up.onclick = function(){
    console.log("up");
    if (movement != "down"){
        movement = "up"
    }
}
down.onclick = function(){
    if (movement != "up"){
        movement = "down"
    }
}
left.onclick = function(){
    if (movement != "rigth"){
        movement = "left"
    }
}
rigth.onclick = function(){
    if (movement != "left"){
        movement = "rigth"
    }
}
document.addEventListener("blur", function() {
    musicMenu.pause();
  });
window.addEventListener("focus", function() {
    if(startGame == false){
        musicMenu.play();
    }
    
});

startMenu();


















