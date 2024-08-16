import React from 'react';
import { FaLock } from 'react-icons/fa';
import OTPInput, { ResendOTP } from "otp-input-react";
import { useState } from 'react';

const App = () => {
  const [otp, setOtp] = useState("");
  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
    <div>
      <div className='w-full flex-col gap-4 rounded-lg p-4'>
            <h1 className='text-center leading normal text-white font medium text-3xl mb-6'>Welcome to <br/>CODE A PROGRAMME</h1>
            <>
            <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
               <FaLock size={30}/>
            </div>
            <label htmlFor='ph' 
            className='font-bold text-2xl text-white flex justify-center'
            >
              Enter your OTP
            </label>
            <OTPInput value={otp} onChange={setOtp} OTPLength={6} otpType='number' disabled={false} autoFocus className="otp-container" secure></OTPInput>
              </>
      </div>
    </div>
    </section>
  );
};

export default App;
