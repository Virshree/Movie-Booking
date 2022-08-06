import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CButton } from "@coreui/react";
function Header(props) {
  const { filterMovieText, hideSearch } = props;
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  function logoutFn() {
    localStorage.clear();
    navigate("/login?referrer=home"); //after ? is query paramter before ? it actual url.
  }
  function loginFn() {
    navigate("/login");
  }
  function handleSearch(e) {
    // console.log(searchText);

    filterMovieText(searchText);
    e.preventDefault();
  }
  const isUserLoggedIn = localStorage.getItem("accessToken");

  return (
    <div className="bg-black  text-danger  d-flex justify-content-between ">
      <div className="d-flex">
        <i className="bi bi-film mx-1 p-2"></i>
        <a
          href="#"
          className="text-decoration-none  text-danger"
          onClick={() => navigate("/")}
        >
          <h4 className="m-2">MY TICKETS</h4>
        </a>
      </div>
      {!hideSearch && (
        <form className="d-flex mt-2" onClick={handleSearch}>
          <input
            type="text"
            placeholder="Search for Movies"
            value={searchText}
            style={{ height: "45px", width: "280px" }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <CButton
            className="btn btn-danger  px-3  text-white"
            style={{ height: "45px" }}
          >
            Search
          </CButton>
        </form>
      )}

      {/**if a user is login it show logout button  otherwise login button */}
      {isUserLoggedIn ? (
        <button
          className="btn btn-danger text-white m-2 fs-5 "
          onClick={logoutFn}
        >
          Logout
        </button>
      ) : (
        <button
          className="btn btn-danger text-white m-2 fs-5 "
          onClick={loginFn}
        >
          Login
        </button>
      )}
    </div>
  );
}

export default Header;
