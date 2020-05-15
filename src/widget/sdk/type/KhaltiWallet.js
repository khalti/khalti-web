import React, { useState } from "react";
import axios from "axios";
import { initiation_api, confirmation_api } from "../api/APIS";
const KhaltiWallet = ({
  public_key,
  product_identity,
  product_name,
  amount,
  product_url,
  hideSDK,
}) => {
  const [otp_code, setOTPCode] = useState(false);
  const [mobile, setMobileNumber] = useState(null);
  const [errMobile, setErrMobile] = useState(false);
  const [token, setToken] = useState(null);
  const [transaction_pin, setPin] = useState(null);
  const [errTranPin, setErrTranPin] = useState(false);

  const [confirmation_code, setCode] = useState(null);
  const [errConCode, setErrConCode] = useState(false);

  const changeMobile = () => {
    setMobileNumber(event.target.value);
  };

  const changePin = () => {
    setPin(event.target.value);
  };

  const changeCode = () => {
    setCode(event.target.value);
  };

  const sendOTPCode = async () => {
    event.preventDefault();
    if (mobile && mobile.toString().length == 10 && transaction_pin) {
      setErrTranPin(false);
      setErrMobile(false);
      try {
        const { data } = await axios.post(initiation_api, {
          public_key,
          product_identity,
          product_name,
          amount,
          transaction_pin,
          mobile,
          product_url,
        });
        if (data && data.token) {
          setToken(data.token);
          setOTPCode(true);
        }
      } catch (err) {
        console.log(err, "--err");
      }
    } else {
      if (!transaction_pin) {
        setErrTranPin(true);
      } else {
        setErrTranPin(false);
      }
      if (!mobile) {
        setErrMobile(true);
      } else {
        if (mobile && mobile.toString().length != 10) {
          setErrMobile(true);
        } else {
          setErrMobile(false);
        }
      }
    }
  };
  const confirmPayment = async () => {
    event.preventDefault();
    if (confirmation_code) {
      setErrConCode(false);
      try {
        const { data } = await axios.post(confirmation_api, {
          public_key,
          transaction_pin,
          token,
          confirmation_code,
        });
        if (data && data.idx) {
          setToken(null);
          setOTPCode(false);
          hideSDK();
        }
        console.log(data, "--------------- final payment data details");
      } catch (err) {
        console.log(err, "--err");
      }
    } else {
      setErrConCode(true);
    }
  };
  return (
    <div className="ui grid padded segment pd-top-30">
      <div className="eight wide computer sixteen wide mobile column">
        <div
          style={{
            backgroundImage:
              "url(https://d7vw40z4bofef.cloudfront.net/static/sdk_logo/khalti.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            height: "160px",
          }}
        ></div>
        <form className="ui form">
          {(!otp_code || token) && (
            <React.Fragment>
              <div className="field">
                <input
                  type="number"
                  name="mobile"
                  placeholder="Khalti Mobile Number"
                  onChange={changeMobile}
                />
                {errMobile && (
                  <div class="ui negative message">
                    <p>Please enter a valid mobile number.</p>
                  </div>
                )}
              </div>
              <div className="field">
                <input
                  type="text"
                  name="transaction_pin"
                  placeholder="Khalti Pin"
                  onChange={changePin}
                />
                {errTranPin && (
                  <div class="ui negative message">
                    <p>Please enter your transaction pin.</p>
                  </div>
                )}
              </div>
            </React.Fragment>
          )}
          {otp_code && (
            <div className="ui icon message">
              <i className="attention icon"></i>
              <div className="content">
                <p>
                  Khalti has sent a confirmation code in your Khalti registered
                  number.Enter the confirmation code below.
                </p>
              </div>
            </div>
          )}
          {otp_code && (
            <div className="field">
              <input
                type="text"
                name="confirmation_code"
                placeholder="Confirmation Code"
                onChange={changeCode}
              />
              {errConCode && (
                <div class="ui negative message">
                  <p>Please enter your confirmation code.</p>
                </div>
              )}
            </div>
          )}
          {!otp_code && (
            <button
              className="ui button primary"
              type="submit"
              onClick={sendOTPCode}
            >
              Next
            </button>
          )}
          {otp_code && amount && (
            <button
              className="ui button primary"
              type="submit"
              onClick={confirmPayment}
            >
              Pay Rs. {amount / 100}/-
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default KhaltiWallet;