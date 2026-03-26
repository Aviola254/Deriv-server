let botRunning = false;

function startBot(){
botRunning = true;
runBot();
}

function stopBot(){
botRunning = false;
}

function runBot(){

if(!botRunning) return;

let last = prices[prices.length-1];
let prev = prices[prices.length-2];

let type = last > prev ? "CALL" : "PUT";

ws.send(JSON.stringify({
proposal:1,
amount:1,
basis:"stake",
contract_type:type,
currency:"USD",
duration:1,
duration_unit:"t",
symbol:"R_25"
}));

setTimeout(runBot,3000);

}
