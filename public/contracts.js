let contractsList=[];

ws.addEventListener("message",(msg)=>{

let data=JSON.parse(msg.data);


if(data.proposal_open_contract){

let c=data.proposal_open_contract;

if(c.is_sold){

contractsList.push(
"Result: "+
c.profit
);

updateContracts();

}

}

});


function updateContracts(){

let box=document.getElementById(
"contracts"
);

box.innerHTML="";

for(let i=contractsList.length-1;i>=0;i--){

let d=document.createElement("div");

d.innerText=contractsList[i];

box.appendChild(d);

}

  }
