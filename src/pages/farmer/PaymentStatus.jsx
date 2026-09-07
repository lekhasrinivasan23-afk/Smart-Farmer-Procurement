import { useEffect, useState } from "react";
import {
  WalletCards,
  CheckCircle,
  Clock,
} from "lucide-react";
import "../../App.css";

function PaymentStatus() {
  const [payment, setPayment] = useState({
    status:
      localStorage.getItem("argi_payment_status") ||
      "Processing",
    amount:
      localStorage.getItem("argi_payment_amount") ||
      "22500",
    transactionId:
      localStorage.getItem("argi_transaction_id") ||
      "TXN20260910025",
  });

  useEffect(() => {
    const sync = () => {
      setPayment({
        status:
          localStorage.getItem("argi_payment_status") ||
          "Processing",
        amount:
          localStorage.getItem("argi_payment_amount") ||
          "22500",
        transactionId:
          localStorage.getItem("argi_transaction_id") ||
          "TXN20260910025",
      });
    };

    window.addEventListener("storage", sync);
    window.addEventListener("paymentUpdate", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(
        "paymentUpdate",
        sync
      );
    };
  }, []);

  const successful = payment.status === "Successful";

  return (
    <div className="payment-page">
      <div className="payment-card">
        <div className="payment-icon">
          {successful ? (
            <CheckCircle size={48} />
          ) : (
            <WalletCards size={48} />
          )}
        </div>

        <h1>Payment Status</h1>

        <p>
          {successful
            ? "Your procurement payment has been completed."
            : "Your payment is being processed."}
        </p>

        <div className="amount">
          ₹{Number(payment.amount).toLocaleString("en-IN")}
        </div>

        <div
          className={`payment-status ${
            successful ? "success" : "processing"
          }`}
        >
          {successful ? (
            <>
              <CheckCircle size={19} />
              Payment Successful
            </>
          ) : (
            <>
              <Clock size={19} />
              Payment Processing
            </>
          )}
        </div>

        <div className="payment-details">
          <div>
            <span>Transaction ID</span>
            <strong>{payment.transactionId}</strong>
          </div>

          <div>
            <span>Payment Date</span>
            <strong>
              {new Date().toLocaleDateString("en-IN")}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentStatus;