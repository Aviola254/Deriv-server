setInterval(()=>{

if(prices.length < 3) return;

let a = prices[prices.length-1];
let b = prices[prices.length-2];
let c = prices[prices.length-3];

let trend = a>b && b>c ? "UP" : a<b && b<c ? "DOWN" : "SIDE";

let move = (a-b).toFixed(3);

document.getElementById("trend").innerText = "Trend: " + trend;
document.getElementById("move").innerText = "Move: " + move;

},1500);
