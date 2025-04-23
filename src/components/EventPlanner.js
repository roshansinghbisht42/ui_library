import React, { useState } from "react";
import "./EventPlanner.css"; // Assuming you have the CSS for styling

const EventPlanner = () => {
  const [eventDate, setEventDate] = useState("");
  const [vehicle, setVehicle] = useState("car");
  const [trafficPrediction, setTrafficPrediction] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

  // Simulated traffic data for different vehicles and days
  const trafficData = {
    car: {
      weekday: "Heavy traffic expected.",
      weekend: "Heavy traffic expected.",
    },
    van: {
      weekday: "Moderate traffic expected.",
      weekend: "Heavy traffic expected.",
    },
    bus: {
      weekday: "Heavy traffic expected, use public transport.",
      weekend: "Heavy traffic expected, use public transport.",
    },
    bike: {
      weekday: "Light traffic expected, ideal for bikes.",
      weekend: "Heavy traffic expected, bikes not recommended.",
    },
  };

  // List of festival dates (example format: 'YYYY-MM-DD')
  const festivalDates = [
    "2025-12-25", // Christmas
    "2025-11-04", // Diwali
    "2025-08-15", // Independence Day
    "2025-10-02",
    "2025-06-15",
    // Add more festival dates as needed
  ];

  // Predict traffic based on event date, vehicle, and festivals
  const predictTraffic = () => {
    if (!eventDate) return;

    const selectedDate = new Date(eventDate);
    const dayOfWeek = selectedDate.getDay(); // 0 for Sunday, 6 for Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Check if weekend

    // Check if selected date is a festival day
    const isFestival = festivalDates.includes(eventDate);

    let prediction;

    if (isFestival) {
      prediction = "Heavy traffic expected due to the festival.";
    } else if (isWeekend) {
      prediction = "Heavy traffic expected on weekends.";
    } else {
      prediction = trafficData[vehicle].weekday;
    }

    // Check if traffic is heavy, and if so, suggest arriving early and staying at a homestay
    if (prediction.includes("Heavy traffic expected")) {
      prediction += " We recommend arriving 1-2 days before the event and staying at a homestay to take a break from your busy life.";
      setShowPopup(true); // Show the popup if heavy traffic is predicted
    }

    setTrafficPrediction(prediction);
  };

  // Show precise route info based on selected route
  const showRouteInfo = (route) => {
    let routeSuggestion = "";

    const selectedDate = new Date(eventDate);
    const dayOfWeek = selectedDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isFestival = festivalDates.includes(eventDate);

    if (route === "Almora") {
      if (isFestival || isWeekend) {
        routeSuggestion = "Take Almora Route: It has less traffic on weekends and festivals.";
        setTrafficPrediction("Traffic prediction for Almora Route: Less traffic expected.");
      } else {
        routeSuggestion = "Take Almora Route: Traffic is moderate, but more manageable.";
        setTrafficPrediction("Traffic prediction for Almora Route: Moderate traffic expected.");
      }
    } else if (route === "Bhowali") {
      if (isFestival || isWeekend) {
        routeSuggestion = "Take Bhowali Route: It's better during weekdays due to less traffic.";
        setTrafficPrediction("Traffic prediction for Bhowali Route: Less traffic expected.");
      } else {
        routeSuggestion = "Take Bhowali Route: Expect moderate to heavy traffic during weekdays.";
        setTrafficPrediction("Traffic prediction for Bhowali Route: Moderate to heavy traffic expected.");
      }
    }

    setSuggestions(routeSuggestion);
  };

  // Close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container">
      {/* Event Date Card */}
      <div className="card">
        <div className="card-icon">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/calendar.png"
            alt="Calendar Icon"
          />
        </div>
        <div className="card-content">
          <h3>Event Date</h3>
          <p>Select and manage dates for your upcoming events.</p>
          <input
            type="date"
            id="eventDate"
            className="input-date"
            value={eventDate}
            onChange={(e) => {
              setEventDate(e.target.value);
              predictTraffic();
            }}
          />
          <div id="trafficPrediction" className="suggestion-text">
            {trafficPrediction}
          </div>
        </div>
      </div>

      {/* Vehicle Selection Card */}
      <div className="card">
        <div className="card-icon">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/car.png"
            alt="Car Icon"
          />
        </div>
        <div className="card-content">
          <h3>Vehicle</h3>
          <p>Choose transportation options for your guests.</p>
          <select
            id="vehicleSelect"
            className="input-select"
            value={vehicle}
            onChange={(e) => {
              setVehicle(e.target.value);
              predictTraffic();
            }}
          >
            <option value="car">Car</option>
            <option value="van">Van</option>
            <option value="bus">Bus</option>
            <option value="bike">Two Wheeler</option>
          </select>
        </div>
      </div>

      {/* Route Info */}
      <div className="card route-info-card">
        <div className="card-content">
          <h3>Route Info</h3>
          <p>{suggestions}</p>
        </div>
      </div>

      {/* Route Selection Buttons */}
      <div className="card route-selection">
        <h3>Choose a Route</h3>
        <button
          className="route-btn"
          onClick={() => showRouteInfo("Almora")}
        >
          Take Almora Route
        </button>
        <button
          className="route-btn"
          onClick={() => showRouteInfo("Bhowali")}
        >
          Take Bhowali Route
        </button>
      </div>

      {/* Map iframe */}
      <div className="map-container">
        <iframe
          src="map.html"
          width="100%"
          height="500px"
          style={{ border: "none" }}
          title="Event Map"
        ></iframe>
      </div>

      {/* Traffic Prediction Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-btn" onClick={closePopup}>
              &times;
            </span>
            <h2>Traffic is heavy right now!</h2>
            <p>We recommend arriving 1-2 days before the event and staying at a homestay. You can book your room below:</p>
            <a
              href="https://go.onelink.me/Xm2V?af_ios_url=https%3A%2F%2Fwww.makemytrip.com%2Fhotels%2Fhotel-details%3FhotelId%3D202503031811132656%26checkin%3D03152025%26checkout%3D03162025%26country%3DIN%26city%3DCTKOSY%26openDetail%3Dtrue%26currency%3DINR%26roomStayQualifier%3D2e0e%26locusId%3DCTKOSY%26locusType%3Dcity%26region%3Din%26funnelName%3DHOTELS%26rsc%3D1e2e%26mpn%3Dfalse&af_web_dp=https%3A%2F%2Fwww.makemytrip.com%2Fhotels%2Fhotel-details%3FhotelId%3D202503031811132656%26checkin%3D03152025%26checkout%3D03162025%26country%3DIN%26city%3DCTKOSY%26openDetail%3Dtrue%26currency%3DINR%26roomStayQualifier%3D2e0e%26locusId%3DCTKOSY%26locusType%3Dcity%26region%3Din%26funnelName%3DHOTELS%26rsc%3D1e2e%26mpn%3Dfalse&c=hotel_detail&af_android_url=https%3A%2F%2Fwww.makemytrip.com"
              target="_blank"
              className="book-now-btn"
            >
              Book a Room Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPlanner;
