let gameCursor = document.getElementById('cursor');
let cmd = document.getElementById('command-line');

let gameModel = {
    commandLine : '',
    cursorPOS: 0
}

function moveCursor(direction){
    gameModel.cursorPOS += (direction) ? 7 : -7;
    gameCursor.style.left = gameModel.cursorPOS + "px";
}

function blinkCursor(){
    if(gameCursor.classList.contains('cursor-shown')){
        gameCursor.classList.remove('cursor-shown');
        gameCursor.classList.add('cursor-hidden');
    }else{
        gameCursor.classList.remove('cursor-hidden');
        gameCursor.classList.add('cursor-shown'); 
    }
}

function addtoCommandLine(key, direction){
    let prevHTML = cmd.innerHTML;
    gameModel.commandLine += key;
    cmd.innerHTML = gameModel.commandLine;
    moveCursor(direction);
}

function clearCommandLine(){
    gameModel.commandLine = ''
    gameModel.cursorPOS = 8;
    gameCursor.style.left = gameModel.cursorPOS + "px";
    cmd.innerHTML = '';
}

function handleKeys(event){
    let key = event.key;
    console.log(/[A-Za-z0-9]/g.test(key))
    if(key.length == 1){
        if(/[A-Za-z0-9]/g.test(key) || key == " "){
            addtoCommandLine(key, true);
        }
    }else if(key == 'Backspace'){
        gameModel.commandLine = gameModel.commandLine.slice(0,gameModel.commandLine.length - 1);
        addtoCommandLine('', false);
    }else if(key == 'Enter'){
        alert(gameModel.commandLine)
        clearCommandLine();   
    }
    
}



function resetBlinking(){
    setInterval(blinkCursor,500);
}

document.addEventListener('keydown', handleKeys);
resetBlinking();
