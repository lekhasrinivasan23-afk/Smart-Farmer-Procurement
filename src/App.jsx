import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { LanguageProvider } from "./context/LanguageContext";
import TopBar from "./components/TopBar";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import OTPVerification from "./pages/auth/OTPVerification";
import Register from "./pages/auth/Register";

import CropDetails from "./pages/farmer/CropDetails";
import CentreRecommendation from "./pages/farmer/CentreRecommendation";
import SlotBooking from "./pages/farmer/SlotBooking";
import BookingConfirmation from "./pages/farmer/BookingConfirmation";
import LiveQueue from "./pages/farmer/LiveQueue";
import ProcurementStatus from "./pages/farmer/ProcurementStatus";
import PaymentStatus from "./pages/farmer/PaymentStatus";

import AdminDashboard from "./pages/admin/AdminDashboard";

function AppLayout() {
  const location = useLocation();

  // Home already has its own language selector
  const hideTopBar = location.pathname === "/";

  return (
    <>
      {!hideTopBar && <TopBar />}

      <Routes>
        {/* First page */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTPVerification />} />
        <Route path="/register" element={<Register />} />

        {/* Farmer flow */}
        <Route path="/crop-details" element={<CropDetails />} />
        <Route path="/centres" element={<CentreRecommendation />} />
        <Route path="/slots" element={<SlotBooking />} />
        <Route
          path="/booking-confirmation"
          element={<BookingConfirmation />}
        />
        <Route path="/queue" element={<LiveQueue />} />
        <Route
          path="/procurement-status"
          element={<ProcurementStatus />}
        />
        <Route path="/payment-status" element={<PaymentStatus />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Unknown URL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename="/Smart-Farmer-Procurement">
        <AppLayout />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;