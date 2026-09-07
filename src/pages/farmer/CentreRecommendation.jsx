import { useState } from "react";
import {
  MapPin,
  Navigation,
  Clock,
  Users,
  ChevronRight,
  Search,
  LocateFixed,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function CentreRecommendation() {
  const navigate = useNavigate();

  const [locationDetected, setLocationDetected] = useState(false);
  const [locationText, setLocationText] = useState("Location not detected");
  const [userLocation, setUserLocation] = useState(null);
  const [search, setSearch] = useState("");

  const centres = [
    {
      code: "TN-CHN-001",
      name: "Ambattur Procurement Centre",
      latitude: 13.1143,
      longitude: 80.1548,
      distance: 2.8,
      demand: "High Demand",
      demandClass: "high",
      farmers: 18,
      wait: 75,
    },
    {
      code: "TN-CHN-002",
      name: "Avadi Procurement Centre",
      latitude: 13.1067,
      longitude: 80.0967,
      distance: 5.2,
      demand: "Low Demand",
      demandClass: "low",
      farmers: 5,
      wait: 20,
      recommended: true,
    },
    {
      code: "TN-CHN-003",
      name: "Pattabiram Procurement Centre",
      latitude: 13.1216,
      longitude: 80.0546,
      distance: 7.1,
      demand: "Medium Demand",
      demandClass: "medium",
      farmers: 9,
      wait: 35,
    },
    {
      code: "TN-CHN-004",
      name: "Poonamallee Procurement Centre",
      latitude: 13.0475,
      longitude: 80.0948,
      distance: 8.4,
      demand: "Low Demand",
      demandClass: "low",
      farmers: 6,
      wait: 25,
    },
    {
      code: "TN-CHN-005",
      name: "Thiruvallur Procurement Centre",
      latitude: 13.1439,
      longitude: 79.9081,
      distance: 14.2,
      demand: "Medium Demand",
      demandClass: "medium",
      farmers: 11,
      wait: 40,
    },
  ];

  // Calculate distance between two GPS coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // GPS FUNCTION
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert("GPS is not supported by your browser.");
      return;
    }

    setLocationText("Detecting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const location = {
          latitude,
          longitude,
        };

        setUserLocation(location);
        setLocationDetected(true);

        localStorage.setItem(
          "argi_location",
          JSON.stringify(location)
        );

        setLocationText(
          `Location detected • ${latitude.toFixed(
            4
          )}, ${longitude.toFixed(4)}`
        );

        alert("Your location has been detected successfully!");
      },

      (error) => {
        console.log("GPS Error:", error);

        if (error.code === 1) {
          alert(
            "Location permission denied. Please allow location access."
          );
        } else if (error.code === 2) {
          alert("Your location could not be determined.");
        } else {
          alert("Location request timed out. Please try again.");
        }

        setLocationText("Location not detected");
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Calculate distances when GPS is available
  const centresWithDistance = centres.map((centre) => {
    if (!userLocation) {
      return centre;
    }

    const gpsDistance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      centre.latitude,
      centre.longitude
    );

    return {
      ...centre,
      distance: Number(gpsDistance.toFixed(1)),
    };
  });

  // Sort nearest centres first
  const sortedCentres = [...centresWithDistance].sort(
    (a, b) => a.distance - b.distance
  );

  // Search filter
  const filteredCentres = sortedCentres.filter((centre) =>
    centre.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewSlots = (centre) => {
    navigate("/slots", {
      state: {
        centre: {
          code: centre.code,
          name: centre.name,
          district: "Chennai",
        },
      },
    });
  };

  return (
    <div className="centre-page">

      {/* HEADER */}
      <div className="centre-header">
        <div>
          <span className="live-badge">● SMART RECOMMENDATION</span>

          <h1>Find a Procurement Centre</h1>

          <p>
            Choose the nearest centre with the shortest waiting time
          </p>
        </div>
      </div>

      <div className="centre-container">

        {/* LOCATION SECTION */}
        <div className="location-section">

          <div className="location-main">

            <div className="location-icon">
              <LocateFixed size={25} />
            </div>

            <div>
              <h2>Find Centres Near You</h2>

              <p>{locationText}</p>
            </div>

          </div>

          <button
            className="location-button"
            onClick={handleUseLocation}
          >
            <Navigation size={18} />
            {locationDetected
              ? "Update Location"
              : "Use My Location"}
          </button>

        </div>

        {/* SEARCH */}
        <div className="centre-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search procurement centre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* RECOMMENDATION HEADING */}
        <div className="recommendation-heading">

          <div>
            <h2>
              {locationDetected
                ? "Nearest Procurement Centres"
                : "Recommended Procurement Centres"}
            </h2>

            <p>
              {locationDetected
                ? "Centres are sorted according to your GPS location"
                : "Based on distance, demand and current queue"}
            </p>
          </div>

          <span className="centre-count">
            {filteredCentres.length} Centres
          </span>

        </div>

        {/* CENTRE CARDS */}
        <div className="centre-list">

          {filteredCentres.map((centre, index) => (

            <div
              className={`centre-card ${
                index === 0 && locationDetected
                  ? "recommended-centre"
                  : ""
              }`}
              key={centre.code}
            >

              {/* TOP */}
              <div className="centre-card-top">

                <div className="centre-icon">
                  <MapPin size={24} />
                </div>

                <div className="centre-title">

                  <div className="centre-name-row">

                    <h3>{centre.name}</h3>

                    {((index === 0 && locationDetected) ||
                      centre.recommended) && (
                      <span className="recommended-badge">
                        Recommended
                      </span>
                    )}

                  </div>

                  <span className="centre-code">
                    {centre.code}
                  </span>

                </div>

              </div>

              {/* DETAILS */}
              <div className="centre-details">

                <div className="centre-detail">

                  <Navigation size={17} />

                  <div>
                    <small>Distance</small>
                    <strong>{centre.distance} km</strong>
                  </div>

                </div>

                <div className="centre-detail">

                  <Users size={17} />

                  <div>
                    <small>Queue</small>
                    <strong>{centre.farmers} farmers</strong>
                  </div>

                </div>

                <div className="centre-detail">

                  <Clock size={17} />

                  <div>
                    <small>Wait Time</small>
                    <strong>~{centre.wait} min</strong>
                  </div>

                </div>

                <div className="centre-detail">

                  <span
                    className={`demand-dot ${centre.demandClass}`}
                  ></span>

                  <div>
                    <small>Demand</small>

                    <strong
                      className={`demand-text ${centre.demandClass}`}
                    >
                      {centre.demand}
                    </strong>

                  </div>

                </div>

              </div>

              {/* BUTTON */}
              <button
                className="view-slots-button"
                onClick={() => handleViewSlots(centre)}
              >
                View Available Slots
                <ChevronRight size={18} />
              </button>

            </div>

          ))}

        </div>

        {/* NO RESULT */}
        {filteredCentres.length === 0 && (
          <div className="no-centres">
            <Search size={35} />
            <h3>No centres found</h3>
            <p>Try searching with another centre name.</p>
          </div>
        )}

        {/* INFO */}
        <div className="centre-info-box">

          <MapPin size={20} />

          <div>
            <strong>Smart Centre Recommendation</strong>

            <p>
              We consider distance, current queue and waiting
              time to help you choose a convenient procurement centre.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default CentreRecommendation;