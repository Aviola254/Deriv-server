function scanMarket(){

if(prices.length<10){

scanResult.innerText="Not enough data";

return;

}


let last=prices[prices.length-1];

let prev5=prices[prices.length-5];

let prev10=prices[prices.length-10];


let move5=last-prev5;

let move10=last-prev10;


let trend="";

if(move10>0){

trend="UPTREND";

}else{

trend="DOWNTREND";

}


let speed=Math.abs(move5);

let speedText="SLOW";

if(speed>0.5){

speedText="FAST";

}


let spike="NO";

if(Math.abs(last-prev5)>1){

spike="SPIKE";

}


let flat="NO";

if(Math.abs(move5)<0.1){

flat="FLAT";

}


scanResult.innerText=

trend+
" | "+
speedText+
" | "+
spike+
" | "+
flat;

  }
