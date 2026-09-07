import { useEffect, useState } from "react";
import {
  Users,
  Clock,
  Bell,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function LiveQueue() {
  const navigate = useNavigate();

  const booking =
    JSON.parse(localStorage.getItem("argi_booking")) || {};

  const [currentToken, setCurrentToken] = useState(20);
  const [seconds, setSeconds] = useState(25 * 60);

  const tokenNumber = parseInt(
    String(booking.token || "AGQ-025").replace(/\D/g, ""),
    10
  ) || 25;

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          return 25 * 60;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const queueTimer = setInterval(() => {
      setCurrentToken((prev) =>
        prev < tokenNumber ? prev + 1 : prev
      );
    }, 15000);

    return () => clearInterval(queueTimer);
  }, [tokenNumber]);

  const minutes = String(
    Math.floor(seconds / 60)
  ).padStart(2, "0");

  const secs = String(seconds % 60).padStart(2, "0");

  const peopleAhead = Math.max(
    tokenNumber - currentToken - 1,
    0
  );

  return (
    <div className="queue-page">
      <div className="queue-container">
        <div className="queue-header">
          <div>
            <span className="live-badge">
              ● LIVE
            </span>

            <h1>Live Queue Status</h1>

            <p>
              {booking.centre?.name ||
                "Ambattur Procurement Centre"}
            </p>
          </div>
        </div>

        <div className="queue-grid">
          <div className="queue-main-card">
            <span>Your Queue Token</span>

            <strong className="big-token">
              {booking.token || "AGQ-025"}
            </strong>

            <div className="queue-line">
              <div>
                <small>Currently Serving</small>
                <strong>
                  AGQ-{String(currentToken).padStart(3, "0")}
                </strong>
              </div>

              <div>
                <small>People Ahead</small>
                <strong>{peopleAhead}</strong>
              </div>
            </div>
          </div>

          <div className="wait-card">
            <Clock size={28} />

            <span>Estimated Waiting Time</span>

            <strong>
              {minutes}:{secs}
            </strong>

            <small>
              Updates automatically as tokens are served
            </small>
          </div>
        </div>

        <div className="queue-progress-card">
          <div className="progress-title">
            <h2>Queue Progress</h2>

            <span>
              {peopleAhead} people before you
            </span>
          </div>

          <div className="progress-bar">
            <div
              style={{
                width: `${Math.min(
                  (currentToken / tokenNumber) * 100,
                  100
                )}%`,
              }}
            />
          </div>

          <div className="queue-status-row">
            <span>Now Serving</span>
            <span>Your Turn</span>
          </div>
        </div>

        {peopleAhead <= 2 && (
          <div className="notification-card">
            <Bell size={24} />

            <div>
              <strong>Your turn is approaching!</strong>
              <p>
                Please be ready at the procurement centre.
              </p>
            </div>
          </div>
        )}

        <button
          className="continue-button"
          onClick={() =>
            navigate("/procurement-status")
          }
        >
          View Procurement Status
          <CheckCircle size={19} />
        </button>
      </div>
    </div>
  );
}

export default LiveQueue;