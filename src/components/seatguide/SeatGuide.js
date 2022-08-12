import React from "react";
import "./seatguide.css";
function SeatGuide() {
  return (
    <div className="d-flex justify-content-center ">
      <div className="bg-dark  d-flex justify-content-center align-items-center  p-3">
        <div className="seat m-2">
          <span>Available</span>
        </div>
        <div className="seat m-2 ">
          <span>Selected</span>
        </div>
        <div className="seat m-2">
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );
}

export default SeatGuide;
