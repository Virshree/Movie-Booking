import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import img1 from "../../assest/img1.jpg";
import img2 from "../../assest/img2.jpg";
import img3 from "../../assest/img3.gif";
import img4 from "../../assest/img4.jpg";
import ImageCarousel from "../../components/slider/ImageCarousel/ImageCarousel";
import Footer from "../../components/footer/Footer";
import "./home.css";
import { getAllMovies } from "../../api/movie";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
function Home() {
  //state for movie data
  const [movies, setMovies] = useState([]);
  //state for filtering movie data
  const [movieall, setMovieAll] = useState([]);
  const [showloader, setShowLoader] = useState(false);

  //we are calling in useeffect i.e getallMovies() bcoz it its renders when component is mounted
  //and has empty dependency.

  useEffect(() => {
    setShowLoader(true);
    getAllMovies()
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          console.log(data);
          setMovies(data);
          setMovieAll(data);
          setShowLoader(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowLoader(false);
      });
  }, []);

  //search movie logic
  const filterMovieText = (searchText) => {
    const filteredMovie = movieall.filter((movie) => {
      return movies.name.toLowerCase().includes(searchText);
    });
    setMovies(filteredMovie); //return array
  };
  const navigate = useNavigate();

  const handleGotoMovieDetails = (movieId) => {
    navigate(`/movie-detail/${movieId}`);
  };
  return (
    <div>
      <Header filterMovieText={filterMovieText} />
      <ImageCarousel images={[img1, img2, img3, img4]} />
      <div className="container main-section">
        {showloader ? (
          <Loader />
        ) : (
          <div className="row">
            {movies.map((movie) => {
              return (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 section-movie  m-3"
                  onClick={() => handleGotoMovieDetails(movie._id)}
                >
                  <img
                    src={movie.posterUrl}
                    alt="poster movie"
                    width="250px"
                    className="card-img-top"
                    height="300px"
                  />

                  <h4 className="bg-black text-white">{movie.name}</h4>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
