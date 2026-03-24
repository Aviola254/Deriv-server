function initDashboard()
{

requestAccount();

getBalance();

}


function autoLoadAccount(data)
{

if(data.authorize)
{

document.getElementById(
"account"
).innerText=data.authorize.loginid;

}

}


function autoLoadBalance(data)
{

if(data.balance)
{

document.getElementById(
"balance"
).innerText=
data.balance.balance+
" "+
data.balance.currency;

}

}


ws.addEventListener(
"message",
(msg)=>
{

let data=JSON.parse(msg.data);


autoLoadAccount(data);

autoLoadBalance(data);

}
);


ws.addEventListener(
"open",
()=>
{

initDashboard();

}
);
