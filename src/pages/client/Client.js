import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MovieList from "../../components/movielist/MovieList";
import TheatreLists from "../../components/theatrelist/TheatreLists";
import "./client.css";
function Client() {
  return (
    <div>
      <Header hideSearch={true} />
      <div className="client-main bg-light text-dark">
        <h2>Welcome ,{localStorage.getItem("name")} </h2>

        <p>Please check the products below</p>
        <TheatreLists />
        <MovieList />
      </div>
      <Footer />
    </div>
  );
}

export default Client;
