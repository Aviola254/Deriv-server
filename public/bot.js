let botRunning=false;

let lastTradeTime=0;

let botDelay=4000;


function startBot(){

botRunning=true;

}


function stopBot(){

botRunning=false;

}


setInterval(()=>{

if(!botRunning) return;

if(prices.length<10) return;

let now=Date.now();

if(now-lastTradeTime<botDelay) return;


let last=prices[prices.length-1];

let prev=prices[prices.length-5];


if(last>prev){

buy();

}else{

sell();

}


lastTradeTime=now;


},1000);
