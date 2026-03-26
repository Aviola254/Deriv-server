let ws;

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

subscribeTicks();
}

if(data.tick){
updateChart(data.tick.quote);
addPrice(data.tick.quote);
}

};

}
