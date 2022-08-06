import React, { useEffect, useState } from "react";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";
import "./authentication.css";
import { useNavigate } from "react-router-dom";
import { userSignin, userSignup } from "../../api/auth";
import { storeUserData } from "../../utils/userData";
import { ROLES } from "../../constants/userRoles";

function Authentication() {
  const [showSignup, setShowSignup] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [errorLoginMessage, setErrorLoginMessage] = useState("");
  const [errorSignupMessage, setErrorSignupMessage] = useState("");

  function gotoSignup() {
    setShowSignup(true);
  }

  function gotoLogin() {
    setShowSignup(false);
  }
  const navigate = useNavigate();

  //redirect logic based on userTypes
  function redirectToPage(userType) {
    if (userType === ROLES.CUSTOMER) {
      navigate("/customer");
    } else if (userType === ROLES.CLIENT) {
      navigate("/client");
    } else {
      navigate("/admin");
    }
  }

  //useEffect

  useEffect(() => {
    //if there is query parameter that referrer=home
    //navigate to home.
    // if(){

    // }

    //if a user is login successfully then it will check in localStorage
    //that accessToken is valid  i.e user entered correct creditenals,
    // then it will be redirect to desired page (customer/admin/client).
    if (localStorage.getItem("accessToken")) {
      const userType = localStorage.getItem("userTypes");
      redirectToPage(userType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //login function
  function handleLogin(data) {
    userSignin(data)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res;
        if (status === 200) {
          if (message) {
            //user entered incorrect creditenals show error.
            setErrorLoginMessage(message);
          } else {
            //correct creditanls entered by user and api hits successfully
            //then store data in localstorage.
            storeUserData(data);
            //navigate to correct page based on usertypes.

            const userType = data.userTypes;
            redirectToPage(userType);
          }
        }
      })
      //api is failure /network issue
      .catch((err) => {
        setErrorLoginMessage(err?.response?.data?.message || err?.message);
      });
  }
  //signup function
  function handleSignup(data) {
    console.log(data);

    userSignup(data)
      .then((res) => {
        console.log(res);
        //we destructing status,message into res .
        const { status, message } = res;
        if (status === 201) {
          //201 is created
          setShowSignup(false);
          setLoginMessage("Signup successfully ! Please Login");
        } else if (message) {
          setErrorSignupMessage(message);
        }
      })
      .catch((err) => {
        setErrorSignupMessage(err?.response?.data?.message || err?.message);
      });
    //1.make an api call and post data to signup
    //2 if api call is success then redirect to login page.
    //3.show message to user that is login is success.
  }
  return (
    <div className="main">
      {!showSignup ? (
        <Login
          onLoginSubmit={handleLogin}
          gotoSignup={gotoSignup}
          loginMessage={loginMessage}
          errorLoginMessage={errorLoginMessage}
        />
      ) : (
        <Signup
          onSignupSubmit={handleSignup}
          gotoLogin={gotoLogin}
          errorSignupMessage={errorSignupMessage}
        />
      )}
    </div>
  );
}

export default Authentication;
