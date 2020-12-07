let gameCursor = document.getElementById('cursor');
let cmd = document.getElementById('command-line');
let cursorSymbol = "<span id='cursor' class='cursor-shown'>█</span>";
let rooms = [];

class Room{
    constructor(name, desc, exits, enemies, items){
        this.name = name,
        this.desc = desc,
        this.exits = exits,
        this.enemies = enemies,
        this.items = items
    }
}

let hero = {
    currRoom: 1
}

let gameModel = {                                       //gamemodel object
    commandLine : ''                                    // current text in the command line
}


// function to add the current keypress to the command line and add the span which contains the cursor back to the innerHTML
function addtoCommandLine(key){
    gameModel.commandLine += key;
    cmd.innerHTML = gameModel.commandLine + cursorSymbol;
    
}

// function to reset the command line and variables
function clearCommandLine(){
    gameModel.commandLine = ''
    cmd.innerHTML = cursorSymbol;
}

function useCommand(){
    let action = gameModel.commandLine.slice(0,gameModel.commandLine.indexOf(" "));
    let object = gameModel.commandLine.slice(gameModel.commandLine.indexOf(" ")+1, gameModel.commandLine.length);
    let wrongCommand = '';
    if(action == 'walk'){
        if(object == rooms[hero.currRoom].exits[0]){
            hero.currRoom += 1;
        }else if(object == rooms[hero.currRoom].exits[1]){
            if(hero.currRoom > 0){
                hero.currRoom -= 1;
            }
        }else{
            wrongCommand = "You cannot go this direction";
        }
    }
    update(wrongCommand);
}

// function to handle keydown events
function handleKeys(event){
    let key = event.key;                                // uses a variable to hold the actual key pressed
    console.log(/[A-Za-z0-9]/g.test(key))
    if(key.length == 1){                                // tests to make it is an actualy letter or number
        if(/[A-Za-z0-9]/g.test(key) || key == " "){     //test to see if is alphanumeric
            addtoCommandLine(key);                      //adds it to the command line
        }
    }else if(key == 'Backspace'){                       //checks to see if the backspace key was press
        gameModel.commandLine = gameModel.commandLine.slice(0,gameModel.commandLine.length - 1);   //takes the current command and deletes one space
        addtoCommandLine('');                           //updates the command line
    }else if(key == 'Enter'){
        useCommand();                                   //sends the command to the game model
        clearCommandLine();                             //clears the command line
    }
    
}

// creating rooms/areas
function createRooms(){
    rooms.push(new Room("Path Home", "It is getting late and you decide to head home.  Maybe you will get home in time for dinner.",[],[],[]))
    rooms.push(new Room("Clearing","You have been walking for a few hours when you come across a clearing.  In the middle of the clearing NORTH of you is the ruins of a house.  It's broken soot covered chimney easily visible from this distance and even further SOUTH from the direction you came.",['north','south'],[],[]));
    rooms.push(new Room("Ruined House", "You walk up to the ruined house the clearing seems unnaturally quiet.  You walk around the ruins looking for a good entry point when one of the bushes near you starts to shake.  As you walk up to the shaking bush a furry animal leaps out startling you and hops away.  Only a rabbit.  It looks like a perfect place for you to enter the house is to the NORTH of you.",["north", "south"],[],[]));

}

function update(message){
    let theVoice = document.getElementById('narrator');
    if(message == undefined){
        message = "";
    }
    theVoice.innerHTML = rooms[hero.currRoom].desc + "<br>=======================<br>"+ message;
    
    
}

createRooms();

function game(){
    update();
}

game();
document.addEventListener('keydown', handleKeys);       //event listener to accept keydown events




