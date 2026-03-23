const token = "fCS24qkOpJQCM7p";

const app_id = 1089;

const ws = new WebSocket(
  "wss://ws.derivws.com/websockets/v3?app_id=" + app_id
);

ws.onopen = function () {

  ws.send(JSON.stringify({
    authorize: token
  }));

  ws.send(JSON.stringify({
    ticks: "R_75",
    subscribe: 1
  }));

};

ws.onmessage = function (msg) {

  const data = JSON.parse(msg.data);

  if (data.tick) {

    const price = data.tick.quote;

    document.getElementById("chart").innerText =
      "Vol75 Price: " + price;

  }

};
