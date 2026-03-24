function fixLayout()
{

let h = window.innerHeight;

let top =
document.querySelector(
".topbar"
);

let main =
document.querySelector(
".main"
);


if(!top || !main) return;


let topH =
top.offsetHeight;


main.style.height =
(h - topH) + "px";

}


window.addEventListener(
"resize",
fixLayout
);


window.addEventListener(
"load",
fixLayout
);


setTimeout(
fixLayout,
500
);
