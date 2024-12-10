import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import { CartProvider } from './Components/Cart/CartContext';
import LoginSignup from './Components/Account/LoginSignup';
import Contact from './Components/Contact/Contact';
import SearchResults from "./Components/Pages/SearchResults";
import WomenPage from "./Components/Pages/WomenPage";
import MenPage from "./Components/Pages/MenPage";
import KidsPage from "./Components/Pages/KidsPage";
import BeautyPage from "./Components/Pages/BeautyPage";
import AccessoriesPage from "./Components/Pages/AccessoriesPage";
import ProductPage from "./Components/Pages/ProductPage";
import CartPage from "./Components/Cart/CartPage";
import Bestseller from "./Components/Pages/Bestseller";
import CheckoutPage from "./Components/Cart/CheckoutPage";
import OrderConfirmation from "./Components/Cart/OrderConfirmation";
import AboutUs from "./Components/Footer/AboutUs";
import TermsConditions from "./Components/Footer/TermsConditions";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import UserProfile from "./Components/Account/UserProfile";
import ConfirmSubscription from "./Components/Footer/confirmSubscription";
import PrivacyPolicy from "./Components/Footer/PrivacyPolicy";
import PastOrders from "./Components/Orders/PastOrders";
import TrackOrder from "./Components/Orders/TrackOrder";

// Define the routes using createBrowserRouter
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <LoginSignup /> },
  { path: "/contact", element: <Contact /> },
  { path: "/searchresults", element: <SearchResults /> },
  { path: "/women", element: <WomenPage /> },
  { path: "/men", element: <MenPage /> },
  { path: "/kids", element: <KidsPage /> },
  { path: "/beauty", element: <BeautyPage /> },
  { path: "/accessories", element: <AccessoriesPage /> },
  { path: "/product/:productId", element: <ProductPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/bestseller", element: <Bestseller /> },
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/order-confirmation", element: <OrderConfirmation /> },
  { path: "/about-us", element: <AboutUs /> },
  { path: "/terms-conditions", element: <TermsConditions /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/admin", element: <AdminDashboard /> },
  { path: "/userprofile", element: <UserProfile /> },
  { path: "/past-orders", element:<PastOrders /> },
  { path: "/track-order/:orderId", element: <TrackOrder /> },
  { path: "/reset-password/:token", element: <LoginSignup /> },
  { path: "/confirm-subscription/:token", element: <ConfirmSubscription /> },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;

