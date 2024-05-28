import React from "react";
import { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/ButtonWarning";
import axios from "axios";
function Signin() {
  const [email, setEmail] = useState("kumashravan5@gmail.com");
  const [password, setPassword] = useState("Cbdadmin@123");

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign In"} />
          <SubHeading label={"Welcome back enter you details!!"} />
          
          <InputBox
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="johndeo@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="*****"
            label={"password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    email: email,
                    password: password,
                  }
                );
                
                localStorage.setItem("token", response.data.token);
              }}
              label={"Sign In"}
            />
          </div>
          <ButtonWarning
            label={"dont have an account "}
            to={"/signup"}
            buttonText={"Sign Up "}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
