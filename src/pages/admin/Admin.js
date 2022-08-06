import React from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  function logout() {
    navigate("/");
  }
  return (
    <div>
      <h2>Welcome ,{localStorage.getItem("name")}</h2>
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Admin;
