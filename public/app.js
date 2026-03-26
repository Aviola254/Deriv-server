const API = "https://your-render-url.onrender.com";

let ws = null;
let prices = [];
let isConnected = false;

let currentMarket = "R_25";

/* =========================
   CONNECT TO DERIV
========================= */
function connectWS(){

let token = document.getElementById("tokenInput").value;

if(!token){
alert("Enter token first");
return;
}

if(ws){
ws.close();
}

ws = new WebSocket("wss://ws.derivws.com/websockets/v3?app_id=1089");

ws.onopen = ()=>{
console.log("Connected");

ws.send(JSON.stringify({
authorize: token
}));
};

ws.onmessage = (msg)=>{

let data = JSON.parse(msg.data);

/* AUTH SUCCESS */
if(data.authorize){
console.log("Authorized");
isConnected = true;
subscribeMarket();
}

/* TICKS */
if(data.tick){
handleTick(data.tick.quote);
}

};

ws.onerror = (err)=>{
console.log("Error:", err);
};

ws.onclose = ()=>{
console.log("Disconnected");
isConnected = false;
};

}

/* =========================
   SUBSCRIBE MARKET
========================= */
function subscribeMarket(){

currentMarket = document.getElementById("market").value;

ws.send(JSON.stringify({
ticks: currentMarket,
subscribe: 1
}));

}

/* =========================
   HANDLE PRICE
========================= */
function handleTick(price){

document.getElementById("price").innerText = "Price: " + price;

prices.push(price);

if(prices.length > 100){
prices.shift();
}

updateAI();

}

/* =========================
   FINAL FORM AI
========================= */
function updateAI(){

if(prices.length < 30) return;

let last = prices.slice(-30);

/* TREND */
let up = 0;
let down = 0;

for(let i=1;i<last.length;i++){
if(last[i] > last[i-1]) up++;
else if(last[i] < last[i-1]) down++;
}

/* MOMENTUM */
let momentum = last[last.length-1] - last[0];

/* RSI */
let gains = 0;
let losses = 0;

for(let i=1;i<last.length;i++){
let diff = last[i] - last[i-1];
if(diff > 0) gains += diff;
else losses += Math.abs(diff);
}

let rs = gains / (losses || 1);
let rsi = 100 - (100 / (1 + rs));

/* VOLATILITY */
let volatility = 0;
for(let i=1;i<last.length;i++){
volatility += Math.abs(last[i] - last[i-1]);
}
volatility = volatility / last.length;

/* DECISION */
let direction = "WAIT";
let confidence = 0;

if(up > down && momentum > 0 && rsi < 65){
direction = "CALL";
confidence = 80;
}
else if(down > up && momentum < 0 && rsi > 35){
direction = "PUT";
confidence = 80;
}
else if(rsi > 80){
direction = "PUT";
confidence = 70;
}
else if(rsi < 20){
direction = "CALL";
confidence = 70;
}
else{
direction = "WAIT";
confidence = 50;
}

/* LOW VOLATILITY → NO TRADE */
if(volatility < 0.2){
direction = "WAIT";
}

/* DISPLAY */
let signal = direction === "CALL" ? "↑ CALL" :
             direction === "PUT" ? "↓ PUT" : "WAIT";

let strengthText =
confidence > 80 ? "STRONG" :
confidence > 65 ? "GOOD" : "WEAK";

let actionText =
direction === "WAIT" ? "NO TRADE" : "READY";

document.getElementById("trend").innerText =
"Trend: " + signal;

document.getElementById("strength").innerText =
"Confidence: " + confidence + "% (" + strengthText + ")";

document.getElementById("suggestion").innerText =
"AI Action: " + actionText;

autoTrade(direction, confidence);

}

/* =========================
   AUTO TRADE
========================= */
function autoTrade(direction, confidence){

let aiMode = document.getElementById("aiToggle")?.value || "OFF";
let minConf = parseFloat(document.getElementById("minConfidence")?.value || 70);

if(aiMode === "ON" && confidence >= minConf && direction !== "WAIT"){
buy(direction);
}

}

/* =========================
   BUY FUNCTION
========================= */
function buy(type){

if(!ws || !isConnected){
alert("Not connected");
return;
}

let stake = document.getElementById("stake").value || 1;
let duration = document.getElementById("duration").value || 1;

ws.send(JSON.stringify({
proposal: 1,
amount: parseFloat(stake),
basis: "stake",
contract_type: type,
currency: "USD",
duration: parseInt(duration),
duration_unit: "t",
symbol: currentMarket
}));

console.log("Trade sent:", type);

}
