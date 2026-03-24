ws.addEventListener(
"message",
(msg)=>
{

let data =
JSON.parse(
msg.data
);


if(
data.proposal_open_contract
)
{

let c =
data.proposal_open_contract;


if(
c.is_sold
)
{

let result =
"Result: " +
c.profit;


addContract(
result
);

}

}

}
);
