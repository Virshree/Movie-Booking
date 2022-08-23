import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@coreui/coreui/dist/css/coreui.min.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Client from "./pages/client/Client";
import Authentication from "./pages/authentication/Authentication";
import Admin from "./pages/admin/Admin";
import MovieDetail from "./pages/movie-detail/MovieDetail";
import SelectTheatre from "./pages/selectTheatre/SelectTheatre";
import SelectSeats from "./pages/select-seats/SelectSeats";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authentication />} />

        <Route path="/client" element={<Client />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/movie-detail/:movieId" element={<MovieDetail />} />
        <Route
          path="/buy-tickets/:movieName/:movieId"
          element={<SelectTheatre />}
        />
        <Route
          path="/select-seats/:movieId/:theatreId"
          element={<SelectSeats />}
        />
      </Routes>
    </div>
  );
}

export default App;
