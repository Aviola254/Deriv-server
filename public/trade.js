let totalTrades = 0;
let wins = 0;
let losses = 0;
let profit = 0;



function subscribeTicks(){
ws.send(JSON.stringify({ticks:"R_25"}));
}



function updateStats(){

document.getElementById("total").innerText =
"Trades: " + totalTrades;

document.getElementById("wins").innerText =
"Wins: " + wins;

document.getElementById("losses").innerText =
"Losses: " + losses;

document.getElementById("profit").innerText =
"Profit: " + profit.toFixed(2);

let rate =
totalTrades > 0 ?
((wins/totalTrades)*100).toFixed(1) : 0;

document.getElementById("rate").innerText =
"Win Rate: " + rate + "%";

}



function buy(){

let stake =
Number(document.getElementById("stake").value);

let duration =
Number(document.getElementById("duration").value);

let type =
document.getElementById("type").value;


ws.send(JSON.stringify({

proposal:1,
amount:stake,
basis:"stake",
contract_type:type,
currency:"USD",
duration:duration,
duration_unit:"t",
symbol:"R_25"

}));

}



ws.addEventListener("message",(msg)=>{

let data =
JSON.parse(msg.data);


if(data.proposal){

ws.send(JSON.stringify({

buy:data.proposal.id,
price:1

}));

}


if(data.proposal_open_contract){

let c =
data.proposal_open_contract;


if(c.is_sold){

totalTrades++;

profit += c.profit;

if(c.profit > 0){
wins++;
}else{
losses++;
}

updateStats();

}

}

});
