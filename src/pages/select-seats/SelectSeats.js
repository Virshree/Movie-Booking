import React from "react";
import { useParams } from "react-router-dom";

function SelectSeats() {
  const param = useParams();
  const { movieId, _id } = param;
  console.log(param);

  return <div>SelectSeats</div>;
}

export default SelectSeats;
