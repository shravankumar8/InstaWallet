import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
const LandingPage = () => {
  const navigate=useNavigate()
  return (
    <div>
      <Button  onClick={()=>{
        navigate("/signup")
      }} label={"signup "}/>
      <br/>
      <Button  onClick={()=>{
        navigate("/signin")
      }} label={"signin "}/>
you are shit
      
    </div>
  )
}

export default LandingPage
