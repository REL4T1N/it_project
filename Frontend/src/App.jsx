import { useContext, useEffect, useState } from "react";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Register from "./pages/Register";
import User from "./pages/User";
import Settings from "./pages/Setting";
import FilmPage from "./pages/FilmPage";
import ErrorBoundary from "./components/ErrorBoundary";
import Actors from "./pages/Actors";
import Recommendations from "./pages/Recomendations";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { fetchUser } from "./API/userAPI";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchUserData() {
      try {
        await fetchUser(setUser, setError);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchUserData();
  }, []);
  return (
    <ErrorBoundary>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/settings" element={<Settings />} />
            <Route path="/movies/:movie_id" element={<FilmPage />} />
            <Route path="/movies/:movie_id/cast" element={<Actors />} />
            <Route path="/choose_rec" element={<Recommendations />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </ErrorBoundary>
  );
}
export default App;
