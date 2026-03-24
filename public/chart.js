const ctx=document.getElementById("chart");

const chart=new Chart(ctx,{

type:"line",

data:{

labels:[],

datasets:[{

data:[],

borderColor:"#00ffd5",

pointRadius:0,

borderWidth:2,

tension:0.3

}]

},

options:{

animation:false,

responsive:true,

scales:{

x:{display:false},

y:{
display:true,
ticks:{
color:"#00ffd5"
}
}

}

}

});


function addPrice(p){

chart.data.labels.push("");

chart.data.datasets[0].data.push(p);


if(chart.data.labels.length>80){

chart.data.labels.shift();

chart.data.datasets[0].data.shift();

}


chart.update();

}
