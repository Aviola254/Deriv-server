let chart;
let prices = [];

function initChart(){

const ctx = document.getElementById("chart");

chart = new Chart(ctx,{
type:"line",
data:{
labels:[],
datasets:[{
data:[],
borderColor:"#00ffd5",
pointRadius:0
}]
},
options:{animation:false}
});

}

function addPrice(p){

prices.push(p);

chart.data.labels.push("");
chart.data.datasets[0].data.push(p);

if(prices.length > 50){
prices.shift();
chart.data.labels.shift();
chart.data.datasets[0].data.shift();
}

chart.update();
}

function updateChart(p){
document.getElementById("price").innerText = p;
}

initChart();
