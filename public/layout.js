function resizeLayout(){

let h=window.innerHeight;

let main=document.querySelector(".main");

if(main){

main.style.height=(h-60)+"px";

}

}


window.addEventListener("resize",resizeLayout);

window.addEventListener("load",resizeLayout);
