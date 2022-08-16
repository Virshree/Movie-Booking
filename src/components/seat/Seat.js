import React from "react";
import "./seat.css";
function Seat(props) {
  const { seatStatus } = props;
  return <div className={`seat ${seatStatus}`} />;
}

export default Seat;
