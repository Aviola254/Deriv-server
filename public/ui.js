function log(msg){

console.log(msg);

}


function showScan(text){

document.getElementById(
"scanResult"
).innerText=text;

}


function showTrack(text){

document.getElementById(
"trackResult"
).innerText=text;

}


function disableButtons(){

let btns=document.querySelectorAll(
"button"
);

btns.forEach(b=>{
b.disabled=true;
});

}


function enableButtons(){

let btns=document.querySelectorAll(
"button"
);

btns.forEach(b=>{
b.disabled=false;
});

  }
