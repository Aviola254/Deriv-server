function log(text)
{

console.log(text);

}



function showScan(text)
{

let box =
document.getElementById(
"scanResult"
);

if(box)
box.innerText = text;

}



function showTrack(text)
{

let box =
document.getElementById(
"trackResult"
);

if(box)
box.innerText = text;

}



function addContract(text)
{

let box =
document.getElementById(
"contracts"
);

if(!box) return;

let d =
document.createElement(
"div"
);

d.innerText = text;

box.prepend(d);

}



function addHistory(text)
{

let box =
document.getElementById(
"history"
);

if(!box) return;

let d =
document.createElement(
"div"
);

d.innerText = text;

box.prepend(d);

  }
