import { useState } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../App.css";

function SlotBooking() {
  const navigate = useNavigate();
  const location = useLocation();

  const centre = location.state?.centre || {
    code: "TN-CHN-002",
    name: "Avadi Procurement Centre",
    district: "Chennai",
  };

  const [selectedSlot, setSelectedSlot] = useState("");

  const slots = [
    { time: "09:00 AM – 10:00 AM", available: 12 },
    { time: "10:00 AM – 11:00 AM", available: 8 },
    { time: "11:00 AM – 12:00 PM", available: 0 },
    { time: "12:00 PM – 01:00 PM", available: 15 },
    { time: "02:00 PM – 03:00 PM", available: 10 },
    { time: "03:00 PM – 04:00 PM", available: 6 },
  ];

  const handleContinue = () => {
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }

    navigate("/booking-confirmation", {
      state: {
        centre,
        slot: selectedSlot,
      },
    });
  };

  return (
    <div className="slot-page">

      {/* Header */}
      <div className="slot-header">
        <button
          className="back-button"
          onClick={() => navigate("/centres")}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="slot-heading">
          <div className="slot-title-icon">
            <CalendarDays size={30} />
          </div>

          <div>
            <h1>Choose Time Slot</h1>
            <p>Select a convenient time for crop procurement</p>
          </div>
        </div>
      </div>

      <div className="slot-container">

        {/* Centre information */}
        <div className="selected-centre-card">
          <div className="centre-location-icon">
            <MapPin size={24} />
          </div>

          <div>
            <span>Selected Procurement Centre</span>
            <h2>{centre.name}</h2>
            <p>{centre.district} • {centre.code}</p>
          </div>

          <div className="date-box">
            <CalendarDays size={18} />
            <div>
              <small>Booking Date</small>
              <strong>
                {new Date().toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </strong>
            </div>
          </div>
        </div>

        {/* Section heading */}
        <div className="slot-section-heading">
          <div>
            <h2>Available Time Slots</h2>
            <p>Choose one slot to continue your booking</p>
          </div>

          <div className="slot-legend">
            <span>
              <i className="legend-dot available-dot"></i>
              Available
            </span>
            <span>
              <i className="legend-dot full-dot"></i>
              Full
            </span>
          </div>
        </div>

        {/* Slot cards */}
        <div className="slot-grid">
          {slots.map((slot) => {
            const isFull = slot.available === 0;
            const isSelected = selectedSlot === slot.time;

            return (
              <button
                key={slot.time}
                disabled={isFull}
                onClick={() => setSelectedSlot(slot.time)}
                className={`slot-card ${
                  isSelected ? "slot-selected" : ""
                } ${isFull ? "slot-full" : ""}`}
              >
                <div className="slot-icon">
                  <Clock size={23} />
                </div>

                <div className="slot-info">
                  <strong>{slot.time}</strong>

                  {isFull ? (
                    <span className="full-text">
                      Fully Booked
                    </span>
                  ) : (
                    <span className="available-text">
                      {slot.available} slots available
                    </span>
                  )}
                </div>

                <div className="slot-check">
                  {isSelected && (
                    <CheckCircle2 size={25} />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected slot */}
        {selectedSlot && (
          <div className="selected-slot-banner">
            <CheckCircle2 size={22} />
            <div>
              <span>Selected Time Slot</span>
              <strong>{selectedSlot}</strong>
            </div>
          </div>
        )}

        {/* Continue */}
        <div className="slot-footer">
          <button
            className="continue-button slot-continue"
            onClick={handleContinue}
          >
            Continue to Booking
            <ArrowRight size={19} />
          </button>
        </div>

      </div>
    </div>
  );
}

export default SlotBooking;