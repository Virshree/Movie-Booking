import { ROWS_SEAT, COLS_SEAT } from "../constants/seating";

export const getSeatNumber = (rowIndex, colIndex) => {
  return rowIndex * ROWS_SEAT + colIndex + 1;
};
export const getTheatre2DRepresentation = (
  selectedSeats = [],
  occupiedSeats = []
) => {
  const seats = [];
  for (let row = 0; row < ROWS_SEAT; row++) {
    const rowArr = [];
    for (let col = 0; col < COLS_SEAT; col++) {
      const seatNumber = getSeatNumber(row, col);
      if (occupiedSeats.includes(seatNumber)) {
        rowArr.push("occupied");
      } else if (selectedSeats.includes(seatNumber)) {
        rowArr.push("selected");
      } else {
        rowArr.push("available");
      }
    }
    seats.push(rowArr);
  }
  return seats;
};
