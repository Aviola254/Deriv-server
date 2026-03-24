function initDashboard(){

requestAccount();

getBalance();

}


ws.addEventListener("open",()=>{

initDashboard();

});


ws.addEventListener("message",(msg)=>{

let data=JSON.parse(msg.data);


if(data.authorize){

initDashboard();

}

});
