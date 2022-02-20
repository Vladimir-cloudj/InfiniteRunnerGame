const field = document.getElementById('field');
const cell = document.getElementsByClassName('cell');
let currentPlayer = document.getElementById('currentPlayer');
let statresult1 = document.getElementById('statresult1')

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
        results[player] += 1;
        restart("Win: " + player);
        locStorStats(res);
        statresult1.innerHTML = "Win: " + player;
        // localStorage.setItem('1', player);
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
            restart("Tie");
            res++
            // --------------
            player = 'x';
            currentPlayer.innerHTML = player.toUpperCase();
            // ----------------
        }
    }
    
    if(!checkWin(data)) {
        player = player == "x" ? "o" : "x";
    }
    

    currentPlayer.innerHTML = player.toUpperCase();
}

function locStorStats(res) { 
    localStorage.user = JSON.stringify({
        
        [res]: player
    })
    statresult1.innerHTML = JSON.parse(localStorage.user)
    localStorage.setItem([res], player);
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
    
    alert(text);
    
    for(let i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
    }
    // ------------------
    player = 'x';
    currentPlayer.innerHTML = player.toUpperCase();
    // ------------------- 
    updateresults();
    
}
// player = "x";


function updateresults() {
    document.getElementById('sX').innerHTML = results.x;
    document.getElementById('sO').innerHTML = results.o;
    document.getElementById('sD').innerHTML = results.d;
    
}