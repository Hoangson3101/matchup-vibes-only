
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import ViewProfile from "./pages/ViewProfile";
import Likes from "./pages/Likes";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import DiamondRecharge from "./pages/DiamondRecharge";
import Payment from "./pages/Payment";
import BlockedUsers from "./pages/BlockedUsers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import SupportFeedback from "./pages/SupportFeedback";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import CreateProfile from "./pages/CreateProfile";
import LikeDetail from "./pages/LikeDetail";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAccounts from "./pages/AdminAccounts";
import AdminUserProfile from "./pages/AdminUserProfile";
import AdminReports from "./pages/AdminReports";
import AdminNotifications from "./pages/AdminNotifications";
import AdminDiscountCodes from "./pages/AdminDiscountCodes";
import AdminPackages from "./pages/AdminPackages";
import AdminInvoices from "./pages/AdminInvoices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/accounts" element={<AdminAccounts />} />
          <Route path="/admin/user-profile/:userId" element={<AdminUserProfile />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/discount-codes" element={<AdminDiscountCodes />} />
          <Route path="/admin/packages" element={<AdminPackages />} />
          <Route path="/admin/invoices" element={<AdminInvoices />} />
          
          {/* Protected routes */}
          <Route path="/" element={<AuthenticatedRoute><Index /></AuthenticatedRoute>} />
          <Route path="/profile" element={<AuthenticatedRoute><Profile /></AuthenticatedRoute>} />
          <Route path="/edit-profile" element={<AuthenticatedRoute><EditProfile /></AuthenticatedRoute>} />
          <Route path="/messages" element={<AuthenticatedRoute><Messages /></AuthenticatedRoute>} />
          <Route path="/messages/:matchId" element={<AuthenticatedRoute><Messages /></AuthenticatedRoute>} />
          <Route path="/settings" element={<AuthenticatedRoute><Settings /></AuthenticatedRoute>} />
          <Route path="/change-password" element={<AuthenticatedRoute><ChangePassword /></AuthenticatedRoute>} />
          <Route path="/diamond-recharge" element={<AuthenticatedRoute><DiamondRecharge /></AuthenticatedRoute>} />
          <Route path="/payment" element={<AuthenticatedRoute><Payment /></AuthenticatedRoute>} />
          <Route path="/blocked-users" element={<AuthenticatedRoute><BlockedUsers /></AuthenticatedRoute>} />
          <Route path="/privacy-policy" element={<AuthenticatedRoute><PrivacyPolicy /></AuthenticatedRoute>} />
          <Route path="/about-us" element={<AuthenticatedRoute><AboutUs /></AuthenticatedRoute>} />
          <Route path="/support-feedback" element={<AuthenticatedRoute><SupportFeedback /></AuthenticatedRoute>} />
          <Route path="/view-profile/:profileId" element={<AuthenticatedRoute><ViewProfile /></AuthenticatedRoute>} />
          <Route path="/likes" element={<AuthenticatedRoute><Likes /></AuthenticatedRoute>} />
          <Route path="/like-detail/:profileId" element={<AuthenticatedRoute><LikeDetail /></AuthenticatedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
