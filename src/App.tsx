import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { initEmailJS } from "@/utils/emailService";

// Initialize EmailJS on app start
initEmailJS();

import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Customize = lazy(() => import("./pages/Customize"));
const Discover = lazy(() => import("./pages/Discover"));
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AllProducts = lazy(() => import("./pages/AllProducts"));
const LuxuryLeatherCarpets = lazy(() => import("./pages/LuxuryLeatherCarpets"));
const PremiumLeatherBags = lazy(() => import("./pages/PremiumLeatherBags"));
const LeatherHides = lazy(() => import("./pages/LeatherHides"));
const Wallets = lazy(() => import("./pages/Wallets"));
const Shoes = lazy(() => import("./pages/Shoes"));
const Janamaz = lazy(() => import("./pages/Janamaz"));
const Accessories = lazy(() => import("./pages/Accessories"));
const Coats = lazy(() => import("./pages/Coats"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const CustomerRequirement = lazy(() => import("./pages/CustomerRequirement"));
const CustomerDataDashboard = lazy(() => import("./pages/CustomerDataDashboard"));
import { CartPage, CartSidebar } from "./components/Cart";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Logo at the top center */}

      <BrowserRouter>
        <Suspense fallback={<div className="p-6 text-center">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/luxury-leather-carpets" element={<LuxuryLeatherCarpets />} />
            <Route path="/premium-leather-bags" element={<PremiumLeatherBags />} />
            <Route path="/bags" element={<PremiumLeatherBags />} />
            <Route path="/leather-hides" element={<LeatherHides />} />
            <Route path="/wallets" element={<Wallets />} />
            <Route path="/shoes" element={<Shoes />} />
            <Route path="/janamaz" element={<Janamaz />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/coats" element={<Coats />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/customer-requirement" element={<CustomerRequirement />} />
            <Route path="/admin/customers" element={<CustomerDataDashboard />} />
            <Route path="/customization" element={<Customize />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <CartSidebar />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
