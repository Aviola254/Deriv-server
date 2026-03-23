let botRunning = false;

function startBot(){

botRunning = true;

log("bot started");

}

function stopBot(){

botRunning = false;

log("bot stopped");

}

function log(t){

document.getElementById("logs").innerText = t;

}
