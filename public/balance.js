ws.addEventListener("message",(msg)=>{

let data=JSON.parse(msg.data);


if(data.balance){

document.getElementById(
"balance"
).innerText=

data.balance.balance+
" "+
data.balance.currency;

}

});


function getBalance(){

if(!ws) return;

ws.send(JSON.stringify({

balance:1,
subscribe:1

}));

}
