function trackMarket(){

if(prices.length<10){

trackResult.innerText="No data";

return;

}


let last=prices[prices.length-1];

let prev=prices[prices.length-2];

let prev5=prices[prices.length-5];

let prev10=prices[prices.length-10];


let change=last-prev;


let direction="FLAT";

if(last>prev){

direction="UP";

}

if(last<prev){

direction="DOWN";

}


let speed=Math.abs(last-prev5);

let speedText="SLOW";

if(speed>0.3){

speedText="MED";

}

if(speed>0.7){

speedText="FAST";

}


let sum=0;

for(let i=prices.length-10;i<prices.length;i++){

sum+=prices[i];

}

let avg=sum/10;


let strength=Math.abs(last-avg);

let strengthText="LOW";

if(strength>0.5){

strengthText="MED";

}

if(strength>1){

strengthText="HIGH";

}


trackResult.innerText=

"Price: "+last.toFixed(2)+" | "+
direction+" | "+
"Change: "+change.toFixed(2)+" | "+
speedText+" | "+
"Avg: "+avg.toFixed(2)+" | "+
strengthText;

  }
