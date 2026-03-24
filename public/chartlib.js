const canvas = document.getElementById("chart")

const ctx = canvas.getContext("2d")

canvas.width = 800
canvas.height = 400

function drawChart(){

ctx.clearRect(0,0,800,400)

ctx.beginPath()

for(let i=0;i<prices.length;i++){

let x = i * 4
let y = 400 - prices[i] / 100

if(i===0){

ctx.moveTo(x,y)

}else{

ctx.lineTo(x,y)

}

}

ctx.strokeStyle = "#00ffd5"
ctx.stroke()

  }
