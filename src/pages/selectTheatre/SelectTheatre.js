import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./selectTheatre.css";
function SelectTheatre() {

  const [selectTheatre,setSelectTheate]=useState({});
  return (
    <div>
      <Header hideSearch={true} />

      <div className="select-main">

        <div>
          <h3></h3>
        </div>










      </div>
      <Footer />
    </div>
  );
}

export default SelectTheatre;
