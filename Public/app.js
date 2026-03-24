let prices=[];

function savePrice(p){

prices.push(p);

if(prices.length>100){

prices.shift();

}

}
