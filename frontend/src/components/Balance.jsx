import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Balance = ({value}) => {
  const [amount, setAmount] = useState();
  const token = localStorage.getItem("token")
  useEffect(()=>{
axios.get("http://localhost:3000/api/v1/account/balance",{headers:{"Authorization":"bearer " +token}})
.then((response)=>{
  const amounts=response.data.balance.toFixed(2);
  setAmount(amounts)
  console.log(response.data.balance)
})
  },[])
  return (
    <div className="flex">
      <div className="font-bold text-lg">your Balance</div>
      <div className="font-semibold ml-4 text-lg">{amount}</div>
    </div>
  );
}

export default Balance
