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


if(ws)
{
ws.close();
}


ws = new WebSocket(
"wss://ws.derivws.com/websockets/v3?app_id=1089"
);


ws.onopen = () =>
{

connected = true;

console.log("OPEN");

ws.send(JSON.stringify({
authorize: token
}));

};


ws.onmessage = (msg) =>
{

let data =
JSON.parse(msg.data);


console.log(data);


if(data.error)
{
alert(data.error.message);
}


if(data.authorize)
{

document.getElementById(
"account"
).innerText =
data.authorize.loginid;


ws.send(JSON.stringify({
balance:1,
subscribe:1
}));

subscribeTicks();

}


if(data.balance)
{

document.getElementById(
"balance"
).innerText =
data.balance.balance +
" " +
data.balance.currency;

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

};


ws.onerror = () =>
{

connected = false;

console.log("error");

};

}



function subscribeTicks()
{

if(!connected) return;

ws.send(JSON.stringify({

ticks: symbol

}));

}
