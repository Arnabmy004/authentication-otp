
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaLock } from 'react-icons/fa';
import {BsTelephoneFill} from 'react-icons/bs';
import { CgSpinner } from "react-icons/cg";
import OTPInput, { ResendOTP } from "otp-input-react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebase.config";
import toast, { Toaster } from 'react-hot-toast';

const App = () => { 
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading,setLoading]=useState(false);
  const[showOTP,setShowOTP]=useState(false);
  const [user,setUser]=useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);

  function onCapchaVerify(){
    if(!window.recaptchaVerifier)
    {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container', {

        'size': 'invisible',
        'callback': (response) => {
           onSignup()
        },
          "expired-callback": () => {
            toast.error('Recaptcha expired. Please try again.');
          },
        },
        
       auth 
      );
      window.recaptchaVerifier.render().catch((error) => {
        console.error("Recaptcha rendering failed:", error);
        toast.error('recapcha expired...please try again later');
      });
    }
  }


  function onSignup(){
    setLoading(true);
    onCapchaVerify();
    const appVerifier=window.recaptchaVerifier
    const formpatph='+91'+ph;

    signInWithPhoneNumber(auth, formpatph, appVerifier)
    .then((confirmationResult) => {
     
      window.confirmationResult = confirmationResult;
      setLoading(false);
      setShowOTP(true);
      toast.success('OTP sent successfully..');
    }).catch((error) => {
       console.log(error);
       setLoading(false);
       toast.error('Failed to send OTP'); 
    });
  };

  

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{duration:4000}}/>
        <div id="recaptcha-container"></div>
        { user ?(
        <h2 className='text-center text-white font medium text-3xl mb-6'>
        Login Success
    </h2>
         ):(
        <div className='w-full flex-col gap-4 rounded-lg p-4'>
          <h1 className='text-center leading normal text-white font medium text-3xl mb-6'>
            Welcome to <br />CODE A PROGRAMME</h1>

          {
                showOTP ?(

          <>
            <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
              <FaLock size={30} />
            </div>
            <label htmlFor='otp'
              className='font-bold text-xl text-white flex justify-center mb-4'
            >
              Enter your OTP
            </label>
            <OTPInput value={otp} onChange={setOtp} OTPLength={6} otpType='number' disabled={false} autoFocus className="otp-container"></OTPInput>
            <button className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2 text-white rounded'>
              {
                loading &&  <CgSpinner size={20}  className='mt-1 animate-spin'/>
              }
             
              <span>Verify OTP</span>

            </button>
          </> ):(
          <>
            <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
              <BsTelephoneFill size={30} />
            </div>
            <label htmlFor=''
              className='font-bold text-xl text-white flex justify-center mb-2'
            >
              Verify your phone number
            </label>
            <PhoneInput  country={"in"} value={ph} onChange={setPh} className='mb-4'/>
            <button onClick={onSignup} 
            className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2 text-white rounded'>
              {
                loading &&  <CgSpinner size={20}  className='mt-1 animate-spin'/>
              }
             
              <span>Send code via SMS</span>

            </button>
          </>
         )}
    
        </div>
        )} 
       
      </div>
    </section>
  );
};

export default App;
