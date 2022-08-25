import React, { useState } from "react";
import { useEffect } from "react";
import { TICKET_PRICE } from "../../constants/seating";
import {
  getSeatNumber,
  getTheatre2DRepresentation,
} from "../../utils/makeTheatre";
import Seat from "../seat/Seat";
import SelectSeats from "../selectSeatsMessage/SelectSeats";
import "./cinema.css";
function Cinema(props) {
  const { createBooking, selectSeats, setSelectSeats, occupiedSeats } = props;
  const [cinemaState, setCinemaState] = useState(
    getTheatre2DRepresentation(selectSeats, occupiedSeats)
  );

  const handleSelectSeats = (rowIndex, colIndex) => {
    const currentStatus = cinemaState[rowIndex][colIndex];

    const tempSelectSeats = [...selectSeats];

    const seatNo = getSeatNumber(rowIndex, colIndex);

    let finalStatus = "";
    if (currentStatus === "available") {
      finalStatus = "selected";
      tempSelectSeats.push(seatNo);
    } else if (currentStatus === "selected") {
      finalStatus = "available";
      const seatIndex = selectSeats.indexOf(seatNo);
      tempSelectSeats.splice(seatIndex, 1);
    } else {
      finalStatus = "occupied";
    }
    const tempStatus = [...cinemaState];
    tempStatus[rowIndex][colIndex] = finalStatus;
    setCinemaState(tempStatus);
    setSelectSeats(tempSelectSeats);
  };

  const handleProceedtoPayment = () => {
    createBooking();
  };

  useEffect(() => {
     getTheatre2DRepresentation();
    
  }, [selectSeats, occupiedSeats]);
  return (
    <>
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
                    <div
                      className={seatLayout}
                      onClick={() => handleSelectSeats(rowIndex, colIndex)}
                    >
                      <Seat seatStatus={cinemaCol} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="m-2 p-2">
        <SelectSeats
          selectedSeatsCount={selectSeats.length}
          price={TICKET_PRICE}
        />
        <button
          className="btn btn-danger"
          onClick={() => handleProceedtoPayment()}
          disabled={selectSeats.length === 0}
        >
          Proceed to Payment
        </button>
      </div>
    </>
  );
}

export default Cinema;
