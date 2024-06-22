/* --------------------------------------------------
● Fecha y Hora de publicación: [19/06/2024]
● Versión de su código: [1.0]
● Autores: Angel Burbano - Jefferson Ospina 
● Nombre del lenguaje utilizado: [JavaScript]
● Versión del lenguaje utilizado: [ECMAScript 6]
● Universidad Tecnológica de Pereira
● Programa de Ingeniería de Sistemas y Computación
-------------------------------------------------- */

/* --------------------------------------------------
● Descripción del programa: Este programa permite jugar al juego de piedra, papel o tijera en dos modalidades:
    - Un jugador contra la maquina
    - Un jugador contra otro jugador 
    
● Salvedad: Se deben ingresar numeros enteros positivos en el campo que pide el numero de partidas, de lo
contrario no se garantizan los resultados.
-------------------------------------------------- */

const options = ["rock", "paper", "scissors"]


document.addEventListener("DOMContentLoaded", function(){
    // Initialize variables
    let nGames = 0;
    let nGamesPlayed = 0;
    // let history = [];

    // Select elements from the DOM
    let playerImg = document.querySelectorAll("#playerImg img");
    let computerImg = document.querySelector("#computerImg img");
    let singlePlayerButton = document.querySelector("#singlePlayer");
    let multiPlayerButton = document.querySelector("#multiPlayer");
    let buttonGo = document.querySelector("#buttonGo");
    let gamesInput = document.querySelector("input[name='nGames']");
    let historyUl = document.querySelector("#history")
    let playButton = document.querySelectorAll(".playButtons");
    let winner = document.querySelector("#winner")
    let counter = document.querySelector("#counter")
    let nPartidas = document.querySelector("#partidas")
    let pointsPlayer1 = 0;
    let pointsPlayer2 = 0;
    let optionPlayer1 = 0;
    let optionPlayer2 = 0;
    let turn = 1;

    function updateHistory(result) {
        var li = document.createElement("li");
        li.textContent = result;
        historyUl.appendChild(li);
    }


    // Function to play against the computer
    function PlayComputer(){

        let result;
        let optionPlayer;
        for (let i = 0; i < playerImg.length; i++) {
            if (playerImg[i].classList.contains("selected")) {
                optionPlayer = options[i];
            }
        }
        let optionComputer = options[Math.floor(Math.random() * 3)];

        if (optionPlayer === optionComputer){
            result = "Empate"
        } else if(((options.indexOf(optionPlayer) - options.indexOf(optionComputer) + 3) % 3) === 1 ){
            result = "Ganaste"
            pointsPlayer1 += 1;
        }else{
            result = "Gana la Maquina"
            pointsPlayer2 += 1;
        }

        updateHistory(result);
        let games = gamesInput.value.trim();

        if (parseInt(games - nGamesPlayed) > 0){
            nGamesPlayed++;
        }
        
        nPartidas.textContent = nGamesPlayed ;

        let winningPlayer;
        if(pointsPlayer1 > pointsPlayer2){ 
            winningPlayer = "Jugador"
        }else if(pointsPlayer2 > pointsPlayer1){
            winningPlayer = "Computador"
        }else{
            winningPlayer = "Empate"
        }
        winner.textContent = winningPlayer

        for (let i = 0; i < playerImg.length; i++) {
            playerImg[i].classList.remove("selected");
            playerImg[i].classList.add("unselected");
        }

        // Show computer selection
        computerImg.src = "assets/" + optionComputer + ".png";


        // Check for end of the game
        if (nGamesPlayed >= nGames) {
            buttonGo.disabled = true;
            // singlePlayerButton.textContent = "Nueva partida";
        }
    }




    function PlayPlayers(){
        let optionPlayer;
        for (let i = 0; i < playerImg.length; i++) {
            if (playerImg[i].classList.contains("selected")) {
                optionPlayer = options[i];
            }
        }
        return optionPlayer;


    }

    singlePlayerButton.addEventListener("click", function() {


        let games = gamesInput.value.trim();

        if (parseInt(games) > 0){
            computerImg.style.display = "block"
            multiPlayerButton.classList.remove("selected");
            multiPlayerButton.classList.add("unselected");
            singlePlayerButton.classList.remove("unselected");
            singlePlayerButton.classList.add("selected");
            nGames = parseInt(games);
            gamesInput.disabled = true;
            buttonGo.disabled = false;
            playerImg.forEach(function(img, index) {

                img.addEventListener("click", function() {   

                    // Remove the "selected" class from all images
                    playerImg.forEach(function(img2) {  
                        img2.classList.remove("selected");
                        img2.classList.add("unselected");

                    });  
                    // Add the "selected" class to the clicked image
                    img.classList.remove("unselected");
                    img.classList.add("selected");
                });
            });
        }   
    })

    multiPlayerButton.addEventListener("click", function() {
        let games = gamesInput.value.trim();

        if (parseInt(games) > 0){
            computerImg.style.display = "none"
            multiPlayerButton.classList.remove("unselected");
            multiPlayerButton.classList.add("selected");
            singlePlayerButton.classList.remove("selected");
            singlePlayerButton.classList.add("unselected");
            nGames = parseInt(games);
            gamesInput.disabled = true;
            buttonGo.disabled = false;


            playerImg.forEach(function(img, index) {

                img.addEventListener("click", function() {   

                    // Remove the "selected" class from all images
                    playerImg.forEach(function(img2) {  
                        img2.classList.remove("selected");
                        img2.classList.add("unselected");

                    });  
                    // Add the "selected" class to the clicked image
                    img.classList.remove("unselected");
                    img.classList.add("selected");
                });
            });
        }   
    })

    function Play(){
        let games = gamesInput.value.trim();

        if (parseInt(games) > 0){
            multiPlayerButton.disabled = true;
            singlePlayerButton.disabled = true;
            let result;
            if (multiPlayerButton.classList.contains("selected")){
                if (turn === 1){
                    optionPlayer1 = PlayPlayers();
                    for (let i = 0; i < playerImg.length; i++) {
                        playerImg[i].classList.remove("selected");
                        playerImg[i].classList.add("unselected");
                    }
                    turn = 2;
                }else if(turn === 2){
                    optionPlayer2 = PlayPlayers();
                    for (let i = 0; i < playerImg.length; i++) {
                        playerImg[i].classList.remove("selected");
                        playerImg[i].classList.add("unselected");
                    }
                    turn = 1;

                    nGamesPlayed++;


                    if (optionPlayer1 === optionPlayer2){
                        result = "Empate"
                    } else if(((options.indexOf(optionPlayer1) - options.indexOf(optionPlayer2) + 3) % 3) === 1 ){
                        result = "Gana el jugador 1"
                        pointsPlayer1 += 1;
                    }else{
                        result = "Gana el jugador 2"
                        pointsPlayer2 += 1;
                    }

                    updateHistory(result);
                
                    let games = gamesInput.value.trim();



                    nPartidas.textContent = nGamesPlayed + 1;

                    let winningPlayer;
                    if(pointsPlayer1 > pointsPlayer2){ 
                        winningPlayer = "Jugador 1"
                    }else if(pointsPlayer2 > pointsPlayer1){
                        winningPlayer = "Jugador 2"
                    }else{
                        winningPlayer = "Empate"
                    }
                    winner.textContent = winningPlayer;

                    for (let i = 0; i < playerImg.length; i++) {
                        playerImg[i].classList.remove("selected");
                        playerImg[i].classList.add("unselected");
                    }

                    // Check for end of the game
                    if (nGamesPlayed >= nGames) {
                        buttonGo.disabled = true;
                    }   
                }



            }else if(singlePlayerButton.classList.contains("selected")){
                PlayComputer();
            }
        }
    }

    buttonGo.addEventListener("click", Play);
    document.getElementById('buttonGo').addEventListener('click', function() {
        let games = gamesInput.value.trim();

        if (parseInt(games) > 0){
        var resultDiv = document.getElementById('resultDiv');
        
        // Mostrar el div y ejecutar la animación
        resultDiv.style.display = 'block';
        resultDiv.classList.add('shake');
    
        // Después de la animación, ocultar el div de nuevo
        setTimeout(function() {
            resultDiv.classList.remove('shake');
            resultDiv.style.display = 'none';
        }, 500); // Duración de la animación en milisegundos
    }
    });
    
})