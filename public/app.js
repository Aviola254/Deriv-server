const token = "PUT_TOKEN";
let symbol = "R_75";

const ws = new WebSocket(
  "wss://ws.derivws.com/websockets/v3?app_id=1089"
);

ws.onopen = () => {

  ws.send(JSON.stringify({
    authorize: token
  }));

  subscribe();

};

function subscribe() {

  ws.send(JSON.stringify({
    ticks: symbol,
    subscribe: 1
  }));

}

ws.onmessage = (msg) => {

  const data = JSON.parse(msg.data);

  if (data.tick) {

    document.getElementById("chart").innerText =
      symbol + " : " + data.tick.quote;

  }

};

document.getElementById("market").onchange = (e) => {

  symbol = e.target.value;
  subscribe();

};
