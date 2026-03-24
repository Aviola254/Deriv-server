let historyList=[];

ws.addEventListener("message",(msg)=>{

let data=JSON.parse(msg.data);


if(data.buy){

historyList.push(
"Trade started"
);

updateHistory();

}


if(data.proposal_open_contract){

if(data.proposal_open_contract.is_sold){

historyList.push(
"Closed: "+
data.proposal_open_contract.profit
);

updateHistory();

}

}


});


function updateHistory(){

let box=document.getElementById(
"history"
);

box.innerHTML="";

for(let i=historyList.length-1;i>=0;i--){

let d=document.createElement("div");

d.innerText=historyList[i];

box.appendChild(d);

}

}
