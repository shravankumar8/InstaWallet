import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import succesImg from '../assets/check.png'
import { Button } from "../components/Button";
const Transaction = () => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transactionId");

  const to = searchParams.get("to");
  const [transactionDetails,setTransactionDetails] = useState({});
  const [amount, setAmount] = useState();
const navigate=useNavigate()

  useEffect(() => {
    axios
      .post(
        "http://localhost:3000/api/v1/account/transactions",
        {
          transactionId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {

        const myArr = JSON.stringify(response.data);
        // console.log(myArr)
        console.log(response.data)
        setAmount(response.data.amount)
setTransactionDetails(response.data._id)
        
    });
  },[]);
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-xl">
          <div className="flex flex-col space-y-1.5 p-6 ">
            <div className="justify-center w-full flex">
              <h1 className="text-lg font-bold">Transaction Succesfull </h1>
            </div>
            <div className="justify-center w-full flex">
              <img className="w-20" src={succesImg} alt="" />
            </div>
           <ul className="font-bold">
            <li>TransactionId :{transactionId}</li>
            <li>to :{to}</li>
            <li>amount :{amount}</li>
           </ul>
          </div>
          <Button onClick={()=>{
            navigate("/dashboard")
          }} label={"dashboard"} />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
