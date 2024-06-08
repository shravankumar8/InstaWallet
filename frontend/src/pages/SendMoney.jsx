import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { Button } from "../components/Button";
import axios from 'axios';
const SendMoney = () => {

    const [searchParams]=useSearchParams();
    const id=searchParams.get("id");
    const name=searchParams.get("name");
    const [amount,setAmount]=useState(0)
    console.log(id,name)
  const navigate=useNavigate()
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
      <Button onClick={()=>{
navigate("/dashboard");
      }} label={"<- go to Dashboard"} />
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-xl">
          <div className="flex flex-col space-y-1.5 p-6 ">
            <h1 className="font-semibold text-2xl">Send money </h1>
          </div>
          <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-xl    text-black">
              {name[0].toUpperCase()}
            </span>
          </div>
          <h3 class=" text 2xl font-semibold">{name}</h3>
          <div class className="space-y-10">
            <div>
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="amount"
              >
                Amount (in Rs)
              </label>
              <input
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="number"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            < Button onClick={async()=>{
              axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount
              },{
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }).then((response) => {console.log(response.data)
                if(response.data.status="success" ){
                  alert (response.data.msg)
                  navigate("/transaction?transactionId="+response.data.transaction._id+"&to="+name)
                }
                
  // navigate

                ;}).catch((err) => {console.log(err)});
            }} label={"send money"}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendMoney
