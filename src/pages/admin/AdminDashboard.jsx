import { useEffect, useState } from "react";
import {
  Users,
  Clock,
  CheckCircle,
  FlaskConical,
  ArrowRight,
  IndianRupee,
} from "lucide-react";
import "../../App.css";

function AdminDashboard() {
  const [status, setStatus] = useState(
    localStorage.getItem("argi_procurement_status") ||
      "Processing"
  );

  const [paymentStatus, setPaymentStatus] =
    useState(
      localStorage.getItem("argi_payment_status") ||
        "Processing"
    );

  const [amount, setAmount] = useState(
    localStorage.getItem("argi_payment_amount") ||
      "22500"
  );

  const booking =
    JSON.parse(localStorage.getItem("argi_booking")) || {};

  const farmer =
    JSON.parse(localStorage.getItem("argi_farmer")) || {};

  const updateProcurement = (newStatus) => {
    localStorage.setItem(
      "argi_procurement_status",
      newStatus
    );

    setStatus(newStatus);

    window.dispatchEvent(
      new Event("procurementUpdate")
    );
  };

  const updatePayment = () => {
    localStorage.setItem(
      "argi_payment_status",
      paymentStatus
    );

    localStorage.setItem(
      "argi_payment_amount",
      amount
    );

    localStorage.setItem(
      "argi_transaction_id",
      "TXN" +
        Date.now().toString().slice(-8)
    );

    window.dispatchEvent(
      new Event("paymentUpdate")
    );

    alert("Payment updated successfully.");
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <div>
            <span className="admin-label">
              ARGIQUEUE ADMIN
            </span>

            <h1>Procurement Centre Dashboard</h1>

            <p>
              Manage farmers, queue and procurement
            </p>
          </div>

          <div className="admin-live">
            ● System Live
          </div>
        </div>

        <div className="admin-stats">
          <div>
            <Users />
            <span>Total Farmers</span>
            <strong>42</strong>
          </div>

          <div>
            <Clock />
            <span>Waiting</span>
            <strong>12</strong>
          </div>

          <div>
            <FlaskConical />
            <span>Processing</span>
            <strong>5</strong>
          </div>

          <div>
            <CheckCircle />
            <span>Completed</span>
            <strong>25</strong>
          </div>
        </div>

        <div className="admin-grid">
          <section className="admin-card">
            <div className="admin-card-title">
              <div>
                <h2>Current Booking</h2>
                <p>Latest farmer booking</p>
              </div>
            </div>

            <div className="farmer-info">
              <div>
                <span>Farmer</span>
                <strong>
                  {farmer.name || "Demo Farmer"}
                </strong>
              </div>

              <div>
                <span>Token</span>
                <strong>
                  {booking.token || "AGQ-025"}
                </strong>
              </div>

              <div>
                <span>Centre</span>
                <strong>
                  {booking.centre?.name ||
                    "Ambattur Procurement Centre"}
                </strong>
              </div>
            </div>
          </section>

          <section className="admin-card">
            <h2>Queue Control</h2>

            <div className="admin-token">
              <span>Currently Serving</span>
              <strong>AGQ-020</strong>
            </div>

            <button
              className="admin-primary-button"
              onClick={() =>
                alert("Next token AGQ-021 called")
              }
            >
              CALL NEXT TOKEN
              <ArrowRight size={18} />
            </button>
          </section>
        </div>

        <section className="admin-card">
          <h2>Update Procurement Status</h2>

          <div className="status-buttons">
            {[
              "Waiting",
              "Processing",
              "Quality Testing",
              "Accepted",
              "Completed",
            ].map((item) => (
              <button
                key={item}
                className={
                  status === item
                    ? "status-selected"
                    : ""
                }
                onClick={() =>
                  updateProcurement(item)
                }
              >
                {item}
              </button>
            ))}
          </div>

          <div className="admin-current-status">
            Current status:
            <strong>{status}</strong>
          </div>
        </section>

        <section className="admin-card">
          <h2>Payment Management</h2>

          <div className="payment-admin-grid">
            <div>
              <label>Amount</label>

              <div className="admin-input">
                <IndianRupee size={17} />

                <input
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                />
              </div>
            </div>

            <div>
              <label>Payment Status</label>

              <select
                value={paymentStatus}
                onChange={(e) =>
                  setPaymentStatus(e.target.value)
                }
              >
                <option value="Processing">
                  Processing
                </option>

                <option value="Successful">
                  Successful
                </option>
              </select>
            </div>

            <button
              className="admin-primary-button"
              onClick={updatePayment}
            >
              Update Payment
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;