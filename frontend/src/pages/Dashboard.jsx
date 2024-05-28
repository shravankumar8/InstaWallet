import React from 'react'
import Appbar from '../components/Appbar';
import Balance from '../components/Balance';
import Users from '../components/Users';

const Dashboard = () => {
  return <div>
    <Appbar/>
    <Balance value={"20000"}/>
    <Users/>
  </div>;
}

export default Dashboard
