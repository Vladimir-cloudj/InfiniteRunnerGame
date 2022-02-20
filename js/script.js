const field = document.getElementById('field');
const cell = document.getElementsByClassName('cell');
let currentPlayer = document.getElementById('currentPlayer');
// let statresult1 = document.getElementById('statresult1')

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
        locStorStats(res, player);
        
        results[player] += 1;
        restart("Win: " + player);
        



        
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
            // localStorage.removeItem("tie", results.d);
            // localStorage.setItem("tie", results.d);
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

window.addEventListener('load', getresultTieLocalStorage);
function getresultTieLocalStorage() {
    if (results.d + results.x + results.o <= 10) {
        results.d = localStorage.getItem("tie")
        // console.log(results.d);
        
    
        results.x = localStorage.getItem("x")
        console.log(results.x);
    
        results.o = localStorage.getItem("o")
        console.log(results.o);
    } else {
        results.x = 0
        results.o = 0
        results.d = 0
    }

    updateresults();
}
let statresult1 = document.querySelectorAll('.statresult1');
// let itemsArray = []
function locStorStats(res,player) {
    if (res <= 5) {
        localStorage.setItem(res, player);
        // console.log("less" + res);
        statresult1[res-1].innerHTML = player;        
    } else {
        window.res = 1;
        localStorage.removeItem(res-1, player);
        // localStorage.setItem(res, player);
        // statresult1[res-1].innerHTML = player;
        // console.log("more" + res);
        return locStorStats(res-1,player);
    }
    // res++
    
    // localStorage.setItem(JSON.stringify(itemsArray)) 
    // --------------------------------
    // statresult1.innerHTML = JSON.parse(localStorage.user)
    // localStorage.setItem([res], player);
    // ------------------------------
    
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
    


    if (results.player = 'x') {
        localStorage.setItem(player, results.x);
    }
    // if (results.player = 'o') {
        localStorage.setItem(player, results.o);
    // }    

}





function updateresults() {
    
    document.getElementById('sX').innerHTML = results.x;
    document.getElementById('sO').innerHTML = results.o;
    document.getElementById('sD').innerHTML = results.d;
    
}






console.log("Визуал сильно не старался сделать т к долго ломал голову над основным алгоритмом. Часть пунктов не выполненно т к не хватило времени для их выполнения");