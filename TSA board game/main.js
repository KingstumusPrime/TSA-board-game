// PALETTE
// I think they all need to be more vibrant
// red :  #FF272A (9/10)
// blue : #272AFF (5/10)
// green : #2AFF27 (5/10)
// orange : #FF9027 (8/10)
const red = "#EE272A";
const blue = "#272AFF";
const green = "#2AFF27";
const orange = "#FF9027";

const black = "#000000";

// get canvas
const canvas = document.querySelector("#game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let dot_one = document.querySelector("#dot_red");
let dot_two = document.querySelector("#dot_blue");
let dot_three = document.querySelector("#dot_green");
let dot_four = document.querySelector("#dot_orange");

let dots = [dot_one, dot_two, dot_three, dot_four];

// number of players
let players = 4;


function player_create(player){
    player.blue = false;
    // center the player
    player.pos.x = canvas.width/2 - player.scale.x;
    player.pos.y = canvas.height/2 - player.scale.y;
    player_quote.innerHTML = '“he is red!”';
}

// puts player into the ring and sets player to a new value
function lock_player(pNum, endfunc=null){

    let rect = dots[pNum].getBoundingClientRect();


    playersArr[pNum] = player;
    let targetScale = (rect.width * 0.6)/player.sprite.scale.x;
    game.addTween(playersArr[pNum].pos.x, rect.x - ((rect.width * 0.3) * targetScale) , (v, t) => {
        playersArr[pNum].pos.x = v;
        let scale = lerp(1, (rect.width * 0.6)/player.sprite.scale.x, t);
        playersArr[pNum].sprSz.x = scale;
        playersArr[pNum].sprSz.y = scale;
    }, constantSpeed, null, 0.02);


    game.addTween(playersArr[pNum].pos.y, rect.y - ((rect.height * 0.3) * targetScale), (v, t) => {
        playersArr[pNum].pos.y = v;

    }, constantSpeed, endfunc, 0.02);

    player = game.addActor("player" + pNum, player_sprite);
    player.onCreate = player_create(player);
   
}

// get all html elements used for UI
const player_num = document.querySelector("#player_num");
const player_quote = document.querySelector("#piece_quote");
const help_text = document.querySelector("#help_text");
const next_text = document.querySelector("#next_text");

// create an input controller
// has the functions
// onKeyPressed (one time)
// onKeyPressedRepeat (called every time key is down good for movement)
const i = new InputController();



// create the game
// takes in the canvas and context for drawing
// the input controller for input
const game = new Game(canvas, ctx, i);
game.backgroundColor = red;


let p = 1;
let player_sprite = new CircleGeometry(120, "red");
let player_sprite_blue = new RectGeometry(120 ,120 );
player_sprite_blue.color = "aqua";

// current player being selected
let player = game.addActor("player", player_sprite);

let playersArr = []; 

player.onCreate = player_create(player);
player_num.style.color = red;

// update player quote
function update_quote(){
    player_quote.style.left = (player.pos.x + player.scale.x/2 - player_quote.clientWidth/2)+'px';
    player_quote.style.top = (player.pos.y + player.scale.y + player_quote.clientHeight/2)+'px';
}

i.onKeyPressed("ArrowRight", ()=>{
    if(!player.blue){
        player.sprite = player_sprite_blue;
        player_quote.innerHTML = '“he is blue!”';
    }else{
        player.sprite = player_sprite;
        player_quote.innerHTML = '“he is red!”';
    }
    player.blue = !player.blue;
    update_quote();
})

i.onKeyPressed("space", ()=>{
    p++;
    if(p ==2){
        game.backgroundColor = blue;
        player_num.innerHTML = "P2";
        player_num.style.color = blue;


        lock_player(0);
    }else if(p == 3){
        game.backgroundColor = orange;
        player_num.innerHTML = "P3";
        player_num.style.color = orange;
    
        
        lock_player(1);
        next_text.style.display = "block";
    }else if(p == 4){
        game.backgroundColor = green;
        player_num.innerHTML = "P4";
        player_num.style.color = green;

        lock_player(2);
    }else if(p == 5){
        // use the end func parameter
        lock_player(3, () => {
            blackWipe(0.01, () => {
                board_init();
            });
        });
        //delete player
        // all we want is in the playersArr
        game.destroy(player);
        player_num.innerHTML = "";
        player_quote.innerHTML = "";
        next_text.innerHTML = "";
        help_text.innerHTML = "";
    }
    
})


// main game logic, ran every frame
function update(){
    // update everything

    game.update();
    // call update every frame
    window.requestAnimationFrame(update);

}



function init(){
    // position player text over the piece
    player_num.style.left = (player.pos.x + player.scale.x/2 - player_num.clientWidth/2)+'px';
    player_num.style.top = (player.pos.y - player_num.clientHeight)+'px';
    //player_num.style.color = red;

    player_quote.style.left = (player.pos.x + player.scale.x/2 - player_quote.clientWidth/2)+'px';
    player_quote.style.top = (player.pos.y + player.scale.y + player_quote.clientHeight/2)+'px';

    next_text.style.left = (player.pos.x + player.scale.x/2 - next_text.clientWidth/2)+'px';
    next_text.style.top =  (parseInt(player_quote.style.top, 10) + next_text.clientHeight * 2)+'px';
    // next text wont appear till two players are selected
    next_text.style.display = "none";


    help_text.style.left =  (player.pos.x + player.scale.x/2 - help_text.clientWidth/2)+'px';
    help_text.style.top = help_text.clientHeight + 'px';

}

// start running the game
init();
update();