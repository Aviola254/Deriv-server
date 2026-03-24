let ws;

let token = "";

let symbol = "R_75";

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


ws.onclose = () =>
{

connected = false;

setTimeout(
connectWS,
2000
);

};


ws.onerror = () =>
{

connected = false;

};


ws.onmessage = (msg) =>
{

let data = JSON.parse(
msg.data
);


if(data.tick)
{

let price =
data.tick.quote;


document.getElementById(
"price"
).innerText = price;


addPrice(price);

savePrice(price);

}

};


}



function subscribeTicks()
{

if(!connected) return;


ws.send(JSON.stringify({

ticks: symbol

}));

}
