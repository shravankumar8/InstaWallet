import React from "react";
import { useState } from "react";
import {Heading} from '../components/Heading'
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/ButtonWarning";
import axios from 'axios'
function Signup() {
  const [firstname, setFirstName] =useState("");
  const [lastname, setLastName] =useState("");
  const [email, setEmail] =useState("");
  const [password, setPassword] =useState("");

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Deo"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="johndeo@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="*****"
            label={"password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                console.log(
                   firstname,
                    lastname,
                    email,
                    password

                )
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                alert(response.data.msg)
              }}
              label={"Sign Up"}
            />
          </div>
          <ButtonWarning
            label={"Already have an account "}
            to={"/signin"}
            buttonText={"Sign in"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
