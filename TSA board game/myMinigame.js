function start(ctx){
    createPlayer();
    score = 0;
    ctx = ctx;
}

function update(){
    updatePlayer();
    updateEnemies();
    if(score == 1000){
        end();
    }
    ctx.fillRect(0, 0, 10, 10); // drawing
}

function end(){
    destroyPlayer();
    return false // if you lose
    return true // you won
}
