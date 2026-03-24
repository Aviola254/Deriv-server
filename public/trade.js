let proposalId=null;

function requestBuy(type){

if(!ws) return;

ws.send(JSON.stringify({

proposal:1,

amount:1,
basis:"stake",
contract_type:type,
currency:"USD",
duration:1,
duration_unit:"t",
symbol:symbol

}));

}


function buy(){

requestBuy("CALL");

}


function sell(){

requestBuy("PUT");

}


ws.addEventListener("message",(msg)=>{

let data=JSON.parse(msg.data);


if(data.proposal){

proposalId=data.proposal.id;

ws.send(JSON.stringify({

buy:proposalId,
price:1

}));

}


if(data.buy){

console.log("Contract started");

}


if(data.proposal_open_contract){

if(data.proposal_open_contract.is_sold){

let profit=data.proposal_open_contract.profit;

console.log("Result:",profit);

}

}

});
