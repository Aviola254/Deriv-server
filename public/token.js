let ws;

let token = "";

let symbol = "R_25";

let connected = false;



function connectWS()
{

token =
document.getElementById(
"tokenInput"
).value;


ws = new WebSocket(
"wss://ws.derivws.com/websockets/v3?app_id=1089"
);


ws.onopen = () =>
{

connected = true;

ws.send(JSON.stringify({
authorize: token
}));

subscribeTicks();

};


ws.onmessage = (msg) =>
{

let data =
JSON.parse(msg.data);


if(data.error)
{
console.log(data.error);
}


if(data.tick)
{

let price =
data.tick.quote;

document.getElementById(
"price"
).innerText = price;

addPrice(price);

}

};


ws.onclose = () =>
{

connected = false;

console.log("closed");

setTimeout(
connectWS,
2000
);

};


ws.onerror = () =>
{

connected = false;

};

}



function subscribeTicks()
{

if(!connected) return;

ws.send(JSON.stringify({

ticks: symbol

}));

  }
