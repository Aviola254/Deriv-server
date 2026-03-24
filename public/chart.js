let ws;

let chart;
let priceData = [];
let timeData = [];

let currentSymbol = "R_10";


function initChart(){

const ctx = document.getElementById("chart");

chart = new Chart(ctx,{

type:"line",

data:{

labels: timeData,

datasets:[{

label:"Price",

data: priceData,

borderColor:"#00ffd5",

borderWidth:2,

pointRadius:0,

tension:0.3

}]

},

options:{

responsive:true,

animation:false,

plugins:{
legend:{
display:true
}
},

scales:{

x:{
display:false
},

y:{
ticks:{
color:"#00ffd5"
}
}

}

}

});

}


function connectWS(){

const token =
document.getElementById("tokenInput").value;

ws = new WebSocket(
"wss://ws.derivws.com/websockets/v3?app_id=1089"
);


ws.onopen = () => {

ws.send(
JSON.stringify({
authorize: token
})
);

};


ws.onmessage = (msg)=>{

const data = JSON.parse(msg.data);


if(data.authorize){

document.getElementById("account").innerText =
data.authorize.loginid;

document.getElementById("balance").innerText =
data.authorize.balance + " USD";

subscribeTicks();

}


if(data.tick){

updateChart(data.tick.quote);

}

};


initChart();

}


function subscribeTicks(){

ws.send(

JSON.stringify({

ticks: currentSymbol,

subscribe: 1

})

);

}


function updateChart(price){

document.getElementById("price").innerText =
price;

priceData.push(price);

timeData.push("");

if(priceData.length > 60){

priceData.shift();
timeData.shift();

}

chart.update();

}


function changeMarket(){

currentSymbol =
document.getElementById("marketSelect").value;

priceData = [];
timeData = [];

subscribeTicks();

}
