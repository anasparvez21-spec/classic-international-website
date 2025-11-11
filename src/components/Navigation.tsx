import { Search, User, HelpCircle, ShoppingBag, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CartIcon } from "@/components/Cart";
import { useState, useRef, useEffect } from "react";

const Navigation = () => {
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const navLinks = [
    "WALLETS",
    "SHOES", 
    "BAGS",
    "COATS",
    "BELTS",
    "Prayer mats",
    "CARPETS",
    "DISCOVER",
  ];

  const discoverItems = [
    { label: "Custom Orders", route: "/customer-requirement" },
    { label: "Leather Customization", route: "/customization" },
    { label: "Leather Upholstery", route: "/leather-hides" },
    { label: "Contact Us", route: "/contact" },
    { label: "About Us", route: "/about-us" },
    { label: "All Products", route: "/all-products" },
  ];
 
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDiscoverOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Top bar removed as requested

  // Logo and main navigation
  return (
    <div className="max-w-screen-2xl mx-auto">
  {/* Removed flex flex-col items-center gap-6 wrapper */}
          {/* Logo with Cart inline */}
          <div className="w-full flex items-center justify-between relative">
            {/* Back button on the top-left */}
            <div className="flex-1 flex items-center">
              <button
                className="p-2 rounded hover:bg-gray-100 transition"
                aria-label="Back to Home"
                onClick={() => navigate("/")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center select-none cursor-pointer" style={{ minWidth: 0, flex: '0 1 auto' }} onClick={() => navigate("/")}> 
              <img src="/Logo-removebg-preview.png" alt="Classic International Logo" style={{ maxWidth: '100px', height: 'auto', marginBottom: '0.5rem' }} />
              <h1 className="text-3xl font-serif font-bold tracking-wider text-center">
                CLASSIC INTERNATIONAL<br />
                <span className="text-xs tracking-[0.2em] opacity-70 block text-center">ESTD. 1998</span>
              </h1>
            </div>
            <div className="flex-1 flex justify-end">
              <CartIcon />
            </div>
          </div>

          {/* Navigation links */}
  <div className="flex flex-wrap items-center justify-center gap-8 mt-8 mb-8">
            {navLinks.map((link) => {
              if (link === "DISCOVER") {
                return (
                  <div 
                    key={link} 
                    className="relative" 
                    ref={dropdownRef}
                    onMouseEnter={() => setIsDiscoverOpen(true)}
                    onMouseLeave={() => setIsDiscoverOpen(false)}
                  >
                    <div className="flex items-center">
                      <button
                        onClick={() => setIsDiscoverOpen(!isDiscoverOpen)}
                        className="font-normal tracking-wide hover:opacity-60 transition-opacity bg-transparent border-none p-0 cursor-pointer"
                        style={{ background: "none", fontSize: "inherit" }}
                      >
                        DISCOVER
                      </button>
                      <button
                        onClick={() => setIsDiscoverOpen(!isDiscoverOpen)}
                        className="ml-1 p-0 bg-transparent border-none cursor-pointer hover:opacity-60 transition-opacity"
                        style={{ background: "none" }}
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                    
                    {isDiscoverOpen && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 z-50">
                        {discoverItems.map((item) => (
                          <button
                            key={item.route}
                            onClick={() => {
                              navigate(item.route);
                              setIsDiscoverOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              
              let route = null;
              if (link === "WALLETS") route = "/wallets";
              if (link === "SHOES") route = "/shoes";
              if (link === "BAGS") route = "/bags";
              if (link === "COATS") route = "/coats";
              if (link === "BELTS") route = "/accessories";
              if (link === "Prayer mats") route = "/janamaz";
              if (link === "CARPETS") route = "/luxury-leather-carpets";
              
              return route ? (
                <button
                  key={link}
                  onClick={() => navigate(route)}
                  className="text-xs font-normal tracking-wide hover:opacity-60 transition-opacity bg-transparent border-none p-0 cursor-pointer"
                  style={{ background: "none" }}
                >
                  {link}
                </button>
              ) : (
                <a
                  key={link}
                  href="#"
                  className="text-xs font-normal tracking-wide hover:opacity-60 transition-opacity"
                >
                  {link}
                </a>
              );
            })}
          </div>
  {/* End removed wrapper */}
    </div>
  );
};

export default Navigation;
