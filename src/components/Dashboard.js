import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import ShortPathMap from "./ShortPathMap";
import EventPlanner from "./EventPlanner";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [almoraTraffic, setAlmoraTraffic] = useState("");
  const [bhowaliTraffic, setBhowaliTraffic] = useState("");
  const [routes, setRoutes] = useState([
    { name: "Bhowali Route", status: "Active" },
    { name: "Almora Route", status: "Inactive" }
  ]);
  const [newRoute, setNewRoute] = useState({ name: "", status: "" });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const setConstantTrafficPrediction = () => {
    const storedAlmoraTraffic = localStorage.getItem("almoraTraffic");
    const storedBhowaliTraffic = localStorage.getItem("bhowaliTraffic");

    if (storedAlmoraTraffic && storedBhowaliTraffic) {
      setAlmoraTraffic(storedAlmoraTraffic);
      setBhowaliTraffic(storedBhowaliTraffic);
    } else {
      const routes = ['Normal', 'Heavy'];
      const almoraTrafficPrediction = routes[Math.floor(Math.random() * routes.length)];
      const bhowaliTrafficPrediction = routes[Math.floor(Math.random() * routes.length)];

      localStorage.setItem("almoraTraffic", almoraTrafficPrediction);
      localStorage.setItem("bhowaliTraffic", bhowaliTrafficPrediction);

      setAlmoraTraffic(almoraTrafficPrediction);
      setBhowaliTraffic(bhowaliTrafficPrediction);
    }
  };

  const handleAddRoute = () => {
    if (newRoute.name && newRoute.status) {
      setRoutes([...routes, newRoute]);
      setNewRoute({ name: "", status: "" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoute({ ...newRoute, [name]: value });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-o9N1jJAH0pD++H5iKj8b+YVZpKRLpHgEnxE3F2wZ8bM=";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);

    setConstantTrafficPrediction();

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
      <header className="dashboard-header">
        <h1>Kainchi Dham Traffic Dashboard</h1>
        <button id="darkModeToggle" title="Toggle Dark Mode" onClick={toggleDarkMode}>
          🌙 {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <main className="dashboard-content">
        <section className="traffic-status">
          <h2>Traffic Status</h2>
          <p id="almora-traffic">
            Current congestion for Almora route: <span>{almoraTraffic}</span>
          </p>
          <p id="bhowali-traffic">
            Current congestion for Bhowali route: <span>{bhowaliTraffic}</span>
          </p>
        </section>

        <section className="upcoming-events">
          <Link to="/ShortPathMap" className="clickable-card">
            <h2>Upcoming Events</h2>
          </Link>
        </section>

        <section className="upcoming-events">
          <Link to="/EventPlanner" className="clickable-card">
            <h2>Map</h2>
          </Link>
        </section>
      </main>

      <section className="routes-page">
        <h2>Manage Routes</h2>
        <table>
          <tbody>
            {routes.map((route, index) => (
              <tr key={index}>
                <td>{route.name}</td>
                <td>{route.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        

        {/* Form for adding a new route */}
        <div className="add-route-form">
          <h3>Add New Route</h3>
          <label htmlFor="route-name">Route Name:</label>
          <input
            type="text"
            id="route-name"
            name="name"
            value={newRoute.name}
            onChange={handleInputChange}
            placeholder="Enter route name"
          />
          <label htmlFor="route-status">Status:</label>
          <select
            id="route-status"
            name="status"
            value={newRoute.status}
            onChange={handleInputChange}
          >
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button onClick={handleAddRoute}>Add Route</button>
        </div>

        <div className="route-predictor">
          <h3>Plan Your Visit</h3>
          <label htmlFor="route-date">Select a Date:</label>
          <input type="date" id="route-date" />
          <div id="suggested-route" className="route-result"></div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
