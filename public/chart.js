const canvas = document.getElementById("chart");

const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

let prices = [];

function drawChart() {

ctx.clearRect(0,0,600,400);

ctx.beginPath();

for(let i=0;i<prices.length;i++){

let x = i*5;
let y = 400 - prices[i]/100;

if(i===0) ctx.moveTo(x,y);
else ctx.lineTo(x,y);

}

ctx.strokeStyle="#00ffcc";
ctx.stroke();

}

function addPrice(p){

prices.push(p);

if(prices.length>100){

prices.shift();

}

drawChart();

}
