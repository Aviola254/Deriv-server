function requestAccount()
{

if(!ws) return;

ws.send(JSON.stringify({

authorize: token

}));

}


ws.addEventListener(
"message",
(msg)=>
{

let data=JSON.parse(msg.data);


if(data.authorize)
{

document.getElementById(
"account"
).innerText =
data.authorize.loginid;

}

}
);
