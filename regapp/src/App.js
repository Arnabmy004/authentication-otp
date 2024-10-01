import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaLock } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OTPInput, { ResendOTP } from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "./firebase.js";

import toast, { Toaster } from "react-hot-toast";
import { parsePhoneNumber } from 'libphonenumber-js';

const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  //const [confirmationResult, setConfirmationResult] = useState(null);
  const [recaptchaInitialized, setRecaptchaInitialized] = useState(false);


  useEffect(() => {
    initializeRecaptcha();
  }, []);

  const  initializeRecaptcha=()=> {
    if (!window.recaptchaVerifier) {
      try {
        console.log("Recaptch intilize...");
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth ,
          'recaptcha-container',
          {
            size: 'invisible',
            //appVerificationDisabledForTesting: false,    
            callback: (response) => {
              //setRecaptchaInitialized(true);
              console.log("reCAPTCHA solved, proceeding to signup...");
            
            },
            'expired-callback': () => {
              toast.error('Recaptcha expired. Please try again.');
            },
          },
        );



        window.recaptchaVerifier.render().then((widgetId) => {
          window.recaptchaWidgetId = widgetId;
          setRecaptchaInitialized(true);
          console.log('reCAPTCHA rendered with widget ID:', widgetId);
         // onSignup();
         const recaptchaContainer = document.getElementById('recaptcha-container');
         if (recaptchaContainer) {
           recaptchaContainer.style.display = 'block';
         } else {
           console.error('recaptcha-container element not found');
         }
        });
      } 
      catch (error) {
        console.error("Error initializing RecaptchaVerifier:", error);
        toast.error("Error setting up Recaptcha.");
      }
    }
  } 
  
  function validatePhoneNumber(phoneNumber) {
    try {
      console.log(phoneNumber);

      const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
      console.log(parsedPhoneNumber);
      
      if (!parsedPhoneNumber) {
        throw new Error('Invalid phone number format.');
      }
      return parsedPhoneNumber.formatInternational();
    } catch (error) {
      return null;
    }
  }

  function onSignup() {
    if (!recaptchaInitialized) {
      toast.error('Recaptcha not initialized. Please refresh and try again.');

      return;
    }
    setLoading(true);
    const appVerifier = window.recaptchaVerifier;
    const formpatph ="+"+  ph;
    const formattedPhoneNumber = validatePhoneNumber(formpatph);
    if (!formattedPhoneNumber) {
      setLoading(false);
      toast.error('Invalid phone number format. Please enter a valid phone number.');
      return;
    }
    //const Number = formattedPhoneNumber.replace(/[^0-9+]/g, '');
  
    signInWithPhoneNumber(auth,Number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully..");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error("Failed to send OTP");
        toast.error("Failed to send OTP: " + error.message);
      });
  }
  
  


  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font medium text-3xl mb-6">
            Login Success
          </h2>
        ) : (
          <div className="w-full flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading normal text-white font medium text-3xl mb-6">
              Welcome to <br />
              CODE A PROGRAMME
            </h1>

            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <FaLock size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white flex justify-center mb-4"
                >
                  Enter your OTP
                </label>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="otp-container"
                ></OTPInput>
                <button className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2 text-white rounded">
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}

                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white flex justify-center mb-2"
                >
                  Verify your phone number
                </label>
                <PhoneInput
                  country={"in"}
                  value={ph}
                  onChange={setPh}
                  className="mb-4"
                />
                <button
                  onClick={onSignup}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}

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
