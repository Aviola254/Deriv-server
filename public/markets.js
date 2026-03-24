function changeMarket()
{

if(!ws) return;


let select =
document.getElementById(
"marketSelect"
);


symbol = select.value;


prices = [];


if(chart)
{

chart.data.labels = [];

chart.data.datasets[0].data = [];

chart.update();

}


ws.send(JSON.stringify({

forget_all: "ticks"

}));


ws.send(JSON.stringify({

ticks: symbol

}));

  }
