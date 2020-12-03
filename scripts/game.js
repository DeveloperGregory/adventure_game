let gameCursor = document.getElementById('cursor');

function blinkCursor(){
    if(gameCursor.classList.contains('cursor-shown')){
        gameCursor.classList.remove('cursor-shown');
        gameCursor.classList.add('cursor-hidden');
    }else{
        gameCursor.classList.remove('cursor-hidden');
        gameCursor.classList.add('cursor-shown'); 
    }
}

setInterval(blinkCursor,500);