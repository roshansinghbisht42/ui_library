  import React, { useState, useEffect } from "react";
  import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
  // import SignIn from "./components/SignIn";
  // import SignUp from "./components/SignUp";
  import SignIn from "./components/signIn";
  import SignUp from "./components/signUp";
  import Dashboard from "./components/Dashboard";
  import MapPage from "./components/MAppage";
  import ShortPathMap from "./components/ShortPathMap";
  import EventPlanner from "./components/EventPlanner";
  // import ShortestRouteMap from './components/ShortestRouteMap'; // Make sure the path is correct

  import 'leaflet/dist/leaflet.css';

  function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const user = localStorage.getItem("loggedInUserId");
      setIsLoggedIn(!!user);
    }, []);

    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignIn />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route path="/map" element={<MapPage />} />
          <Route path="/ShortPathMap" element={<ShortPathMap />} />
          <Route path="/EventPlanner" element={<EventPlanner />} />
        </Routes>
      </Router>
    );
  }

  export default App;
