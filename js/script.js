const field = document.getElementById('field');
const cell = document.getElementsByClassName('cell');
let currentPlayer = document.getElementById('currentPlayer');
let statresult1 = document.querySelectorAll('.statresult1');

let score_audio = new Audio();
score_audio.src = 'audio/score.mp3'

var player = "x";
var results = {
    'x': 0,
    'o': 0,
    'd': 0
}
var winIndex = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

let final = {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
    10: '',
};

for(let i = 1; i <= 9; i++) {
    field.innerHTML += "<div class='cell' pos=" + i + "></div>";
}

for (let i = 0; i< cell.length; i++) {
    cell[i].addEventListener('click', cellClick, false);
}
let res = 1;
function cellClick() {
    
    let data = [];
    
    if(!this.innerHTML) {
        this.innerHTML = player;
    }else {
        alert("Cell full, please try another cell");
        return;
    }

    for(let i in cell){
        if(cell[i].innerHTML == player){
            data.push(parseInt(cell[i].getAttribute('pos')));
        }
    }
    
    if(checkWin(data)) {
        locStorStats(res, player);
        
        results[player] += 1;
        restart("Win: " + player);               
        // localStorage.setItem(`${player}`, player);
        // localStorage.setItem(`${player}`, results.`${player}`);
        
        res++
        // -------------------
        player = 'x';
        currentPlayer.innerHTML = player.toUpperCase();
        // -------------------
    }else {
        let draw = true;
        for(var i in cell) {
            if(cell[i].innerHTML == '') draw = false;
        }
        if(draw) {
            results.d += 1;
            // localStorage.setItem('d', results.d);
            // --------------
            player = 'x';
            currentPlayer.innerHTML = player.toUpperCase();
            // ----------------
            restart("Tie");
            res++
            
        }
    }
    
    if(!checkWin(data)) {
        player = player == "x" ? "o" : "x";
    }
    

    currentPlayer.innerHTML = player.toUpperCase();
}

window.addEventListener('load', getresultTieLocalStorage);
function getresultTieLocalStorage() {
    if (+results.d + +results.x + +results.o <= 10) {        
        results.d = localStorage.getItem("tie")                
        results.x = localStorage.getItem("x")       
        results.o = localStorage.getItem("o")
        // localStorage.getItem("tie")
    } else {
        // results.d = localStorage.removeItem("tie")
        // results.x = localStorage.removeItem("x")
        // results.o = localStorage.removeItem("o")
        // localStorage.removeItem("tie")
        // localStorage.removeItem("x")
        // localStorage.removeItem("o")
        // results.x = 0
        // results.o = 0
        // results.d = 0
    }
    updateresults();
}



// let itemsArray = []
function locStorStats(res,player) {
    if (res <= 10) {
        localStorage.removeItem(res, player);
        localStorage.setItem(res, player);
        statresult1[res-1].innerHTML = player;
    } else {
        window.res = 1;
        res = 1;
        localStorage.removeItem(res-1, player);
        return locStorStats(res,player);
    }
    res++
}


function checkWin(data) {
    for(let i in winIndex) {
        let win = true;
        for(var j in winIndex[i]) {
            var id = winIndex[i][j];
            var ind = data.indexOf(id);

            if(ind == -1) {
                win = false
            }
        }

        if(win) {
            
            return true;
        }
    }
    return false;
}


function restart(text) {
    score_audio.play();
    alert(text);
    
    for(let i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
    }
    if (results.player = 'x') {
        localStorage.setItem(player, results.x);
    } else
    if (results.player = 'o') {
        localStorage.setItem(player, results.o);
    } else   
    if (results.player = 'tie') {
        localStorage.setItem(player, results.d);
    }
    // ------------------
    player = 'x';
    currentPlayer.innerHTML = player.toUpperCase();
    // ------------------- 
    updateresults();
    

    
}





function updateresults() {

    for(let i = 1; i <= 10; i++) {
        final[i] = localStorage.getItem(`${i}`, player);
        statresult1[i-1].innerHTML = final[i];
        // console.log(final[i]);
        // console.log(statresult1[i-1]);
    }

    document.getElementById('sX').innerHTML = results.x;
    document.getElementById('sO').innerHTML = results.o;
    document.getElementById('sD').innerHTML = results.d;
    
}

console.log("Визуально проект слабый т к долго ломал голову над основным алгоритмом. Часть пунктов не выполненно т к не хватило времени для их выполнения");