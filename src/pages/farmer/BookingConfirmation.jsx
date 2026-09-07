import { useEffect, useState } from "react";
import {
  CheckCircle,
  MapPin,
  Clock,
  Ticket,
  ArrowRight,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../App.css";

function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const centre = location.state?.centre || {
    code: "TN-CHN-001",
    name: "Ambattur Procurement Centre",
    district: "Chennai",
  };

  const slot =
    location.state?.slot || "10:00 AM – 11:00 AM";

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("argi_booking")
    );

    if (saved) {
      setBooking(saved);
      return;
    }

    const token =
      "AGQ-" + Math.floor(100 + Math.random() * 900);

    const newBooking = {
      token,
      bookingId:
        "BK-" + Math.floor(100000 + Math.random() * 900000),
      centre,
      slot,
      date: new Date().toLocaleDateString("en-IN"),
      status: "Waiting",
    };

    localStorage.setItem(
      "argi_booking",
      JSON.stringify(newBooking)
    );

    setBooking(newBooking);
  }, []);

  if (!booking) {
    return <div className="loading-page">Creating booking...</div>;
  }

  return (
    <div className="booking-page">
      <div className="booking-card">
        <div className="success-icon">
          <CheckCircle size={55} />
        </div>

        <h1>Booking Confirmed!</h1>

        <p className="booking-subtitle">
          Your procurement slot has been successfully booked.
        </p>

        <div className="token-box">
          <Ticket size={30} />
          <span>Your Queue Token</span>
          <strong>{booking.token}</strong>
        </div>

        <div className="booking-details">
          <div className="booking-detail">
            <MapPin size={21} />
            <div>
              <span>Procurement Centre</span>
              <strong>{centre.name}</strong>
            </div>
          </div>

          <div className="booking-detail">
            <Ticket size={21} />
            <div>
              <span>Booking ID</span>
              <strong>{booking.bookingId}</strong>
            </div>
          </div>

          <div className="booking-detail">
            <Clock size={21} />
            <div>
              <span>Selected Slot</span>
              <strong>{slot}</strong>
            </div>
          </div>
        </div>

        <div className="booking-note">
          <strong>📱 Keep your token safe</strong>
          <p>
            You can track your live queue status from the next page.
          </p>
        </div>

        <button
          className="continue-button"
          onClick={() =>
            navigate("/queue", {
              state: {
                token: booking.token,
                centre,
                slot,
              },
            })
          }
        >
          View Live Queue
          <ArrowRight size={19} />
        </button>
      </div>
    </div>
  );
}

export default BookingConfirmation;