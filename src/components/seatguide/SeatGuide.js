import React from "react";
import Seat from "../seat/Seat";
import "./seatguide.css";
function SeatGuide() {
  return (
    <div className="d-flex justify-content-center ">
      <div className="bg-black d-flex justify-content-between align-items-center my-3 p-3 seat-guide">
        <div className="d-flex align-items-end ">
          <Seat seatStatus="available" />
          <span className="m-1">Available</span>
        </div>

        <div className="d-flex  align-items-end">
          <Seat seatStatus="selected" />
          <span className="m-1">Selected</span>
        </div>

        <div className="d-flex align-items-end ">
          <Seat seatStatus="occupied" />
          <span className="m-1">Occupied</span>
        </div>
      </div>
    </div>
  );
}

export default SeatGuide;
