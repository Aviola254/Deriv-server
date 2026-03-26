let ws;
let prices = [];

let chart;
let currentMarket = "R_25";

let lastTradeTime = 0;


/* CONNECT */

function connectWS(){

let token = document.getElementById("tokenInput").value;

ws = new WebSocket("wss://ws.derivws.com/websockets/v3?app_id=1089");

ws.onopen = ()=>{
ws.send(JSON.stringify({authorize:token}));
};

ws.onmessage = (msg)=>{

let data = JSON.parse(msg.data);

if(data.authorize){

document.getElementById("account").innerText = data.authorize.loginid;
document.getElementById("balance").innerText = data.authorize.balance;

subscribeMarket();

}

if(data.tick){

let price = data.tick.quote;

prices.push(price);

updateChart(price);
runAI();

}

if(data.proposal){
ws.send(JSON.stringify({buy:data.proposal.id, price:1}));
}

};

}



/* MARKET */

function subscribeMarket(){

currentMarket = document.getElementById("market").value;

prices = [];

ws.send(JSON.stringify({
ticks: currentMarket,
subscribe:1
}));

}



/* CHART */

function initChart(){

const ctx = document.getElementById("chart");

chart = new Chart(ctx,{
type:"line",
data:{
labels:[],
datasets:[{
data:[],
borderColor:"#00ffd5",
pointRadius:0
}]
},
options:{animation:false}
});

}

function updateChart(p){

document.getElementById("price").innerText = p;

chart.data.labels.push("");
chart.data.datasets[0].data.push(p);

if(chart.data.labels.length > 50){
chart.data.labels.shift();
chart.data.datasets[0].data.shift();
}

chart.update();

}



/* AI ENGINE */

function analyzeMarket(){

if(prices.length < 5) return null;

let last = prices.slice(-5);

let up = 0;
let down = 0;

for(let i=1;i<last.length;i++){
if(last[i] > last[i-1]) up++;
else down++;
}

let confidence = 0;
let type = null;

if(up >= 4){
confidence = 85;
type = "CALL";
}
else if(down >= 4){
confidence = 85;
type = "PUT";
}
else if(up > down){
confidence = 60;
type = "CALL";
}
else if(down > up){
confidence = 60;
type = "PUT";
}

return {confidence, type};

}



/* AUTO AI */

function runAI(){

let aiMode = document.getElementById("aiToggle").value;
let minConf = Number(document.getElementById("minConfidence").value);

if(aiMode === "OFF"){
document.getElementById("aiStatus").innerText = "AI: OFF";
return;
}

let now = Date.now();

if(now - lastTradeTime < 4000) return;

let result = analyzeMarket();

if(!result) return;

document.getElementById("aiStatus").innerText =
"AI: " + result.type + " (" + result.confidence + "%)";

if(result.confidence >= minConf){

buy(result.type);
lastTradeTime = now;

}

}



/* TRADE */

function buy(typeOverride){

let type = typeOverride || document.getElementById("type").value;

ws.send(JSON.stringify({
proposal:1,
amount:1,
basis:"stake",
contract_type:type,
currency:"USD",
duration:1,
duration_unit:"t",
symbol: currentMarket
}));

}



/* INIT */

window.onload = initChart;
