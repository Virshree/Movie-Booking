import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { ROLES } from "../../constants/userRoles";

function Signup(props) {
  const { onSignupSubmit, gotoLogin, errorSignupMessage } = props;
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setemail] = useState("");
  const [userType, setUserTypes] = useState(ROLES.CUSTOMER);

  function handleSubmit(e) {
    const data = { userId, password, name: userName, email, userType };
    console.log(data);
    onSignupSubmit(data);
    e.preventDefault();
  }
  function handleSelect(e) {
    setUserTypes(e);
  }
  return (
    <div>
      <div className="bg-danger vh-100 d-flex justify-content-center align-items-center ">
        <div className="card m-5 p-5">
          <h1>Signup</h1>
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
            <div className="input-group m-2">
              <input
                type="text"
                placeholder="Enter Username"
                value={userName}
                className="form-control"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="input-group m-2">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                className="form-control"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="input-group m-2 ">
              <span className="text-muted">User Type</span>

              <DropdownButton
                align="end"
                title={userType}
                variant="secondary"
                className="mx-1"
                onSelect={handleSelect}
              >
                <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                <Dropdown.Item eventKey="CLIENT">CLIENT</Dropdown.Item>
              </DropdownButton>
            </div>

            <div>
              <input
                type="submit"
                value="Signup"
                className="btn btn-danger form-control m-2"
              />
            </div>
            <div>
              <span>
                Already have an account ?{" "}
                <a href="#" onClick={gotoLogin}>
                  Login
                </a>
              </span>
            </div>
          </form>
          <div>
            <span className="text-danger text-center">
              {errorSignupMessage}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
