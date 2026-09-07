import { useEffect, useState } from "react";
import {
  Clock,
  LoaderCircle,
  FlaskConical,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function ProcurementStatus() {
  const navigate = useNavigate();

  const [status, setStatus] = useState(
    localStorage.getItem("argi_procurement_status") ||
      "Processing"
  );

  const stages = [
    {
      name: "Waiting",
      icon: Clock,
    },
    {
      name: "Processing",
      icon: LoaderCircle,
    },
    {
      name: "Quality Testing",
      icon: FlaskConical,
    },
    {
      name: "Accepted",
      icon: CheckCircle,
    },
    {
      name: "Completed",
      icon: CheckCircle,
    },
  ];

  useEffect(() => {
    const sync = () => {
      setStatus(
        localStorage.getItem(
          "argi_procurement_status"
        ) || "Processing"
      );
    };

    window.addEventListener("storage", sync);
    window.addEventListener("procurementUpdate", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(
        "procurementUpdate",
        sync
      );
    };
  }, []);

  const currentIndex = stages.findIndex(
    (item) => item.name === status
  );

  return (
    <div className="status-page">
      <div className="status-container">
        <div className="status-heading">
          <span className="live-badge">● LIVE STATUS</span>
          <h1>Procurement Status</h1>
          <p>Track your crop procurement progress</p>
        </div>

        <div className="status-card">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const completed =
              index <= currentIndex;

            return (
              <div
                className={`status-step ${
                  completed ? "completed" : ""
                } ${
                  index === currentIndex ? "active" : ""
                }`}
                key={stage.name}
              >
                <div className="status-icon">
                  <Icon size={23} />
                </div>

                <div>
                  <strong>{stage.name}</strong>

                  {index === currentIndex && (
                    <span>Current stage</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {status === "Completed" && (
          <button
            className="continue-button"
            onClick={() =>
              navigate("/payment-status")
            }
          >
            View Payment Status
            <ArrowRight size={19} />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProcurementStatus;