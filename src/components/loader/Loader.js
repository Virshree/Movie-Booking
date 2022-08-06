import React from "react";
import loadImg from "../../assest/load.gif";
function Loader() {
  return (
    <img
      src={loadImg}
      alt="page loader"
      width="100px"
      height="100px"
      style={{ borderRadius: "50%" }}
    />
  );
}

export default Loader;
