import React from "react";

function SelectSeats(props) {
  const { selectedSeatsCount, price } = props;
  return (
    <>
      {selectedSeatsCount > 0 && (
        <h4>
          You have selected{" "}
          <span className="text-info">{selectedSeatsCount}</span> and Total Rs
          is <span className="text-info">{price * selectedSeatsCount}</span>
        </h4>
      )}
    </>
  );
}

export default SelectSeats;
