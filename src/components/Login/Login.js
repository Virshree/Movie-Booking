import React, { useState } from "react";

function Login(props) {
  const { onLoginSubmit, gotoSignup, errorLoginMessage, loginMessage } = props;
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    const data = { userId, password };
    console.log(data);
    onLoginSubmit(data);
    e.preventDefault();
  }

  return (
    <div>
      <div className="bg-danger vh-100 d-flex justify-content-center align-items-center ">
        <div className="card m-5 p-5">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group m-2">
              <input
                type="text"
                placeholder="Enter UserId"
                value={userId}
                className="form-control"
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="input-group m-2">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="submit"
                value="Login"
                className="btn btn-danger form-control m-2"
              />
            </div>
            <div>
              <span>
                Don't have an account ?{" "}
                <a href="#" onClick={gotoSignup}>
                  Signup
                </a>
              </span>
            </div>
          </form>
          <div>
            <span className="text-danger text-center">{errorLoginMessage}</span>
          </div>
          <div className="text-success m-1">{loginMessage}</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
