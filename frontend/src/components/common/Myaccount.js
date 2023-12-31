import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Myaccount.css';
import { useSelector } from 'react-redux';


const Myaccount = () => {
  const money = useSelector((state) => state.auth.user.money)

    return (
      <div className='myaccount-container'>
        <div className='myaccount-textarea' >
            <div className='myaccount-total'>내 자산</div>
        </div>
        <div className='myaccount-balance'>
        {money}P
        </div>
        <></>


        </div>
    );
  };
  
  export default Myaccount;
  