import React, { useState } from "react";
import { getTheatre2DRepresentation } from "../../utils/makeTheatre";
import Seat from "../seat/Seat";
import "./cinema.css";
function Cinema() {
  const [cinemaState, setCinemaState] = useState(getTheatre2DRepresentation());

  return (
    <div className="m-2 p-2 ">
      {cinemaState.map((cinemaRow, rowIndex) => {
        return (
          <div className="d-flex justify-content-center">
            <div className="row  cinema-row">
              {cinemaRow.map((cinemaCol, colIndex) => {
                const seatLayout =
                  colIndex === 2 || colIndex === 6
                    ? "col-sm-1 offset-sm-2"
                    : "col-sm-1";
                return (
                  <div className={seatLayout}>
                    <Seat seatStatus={cinemaCol} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cinema;
