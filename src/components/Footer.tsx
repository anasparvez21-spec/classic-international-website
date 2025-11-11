import React from "react";
import { useNavigate } from "react-router-dom";
import NewsletterSignup from "./NewsletterSignup";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="w-full bg-gray-900 text-gray-200 py-8 mt-16">
      {/* Newsletter Signup */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <NewsletterSignup />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Company Info */}
        <div className="text-center md:text-left">
              <p className="text-sm font-lato text-gray-400">Jajmau, Kanpur (U.P), India</p>
          <p className="text-sm font-lato text-gray-400">Phone: <a href="https://wa.me/919721457228" className="hover:text-white" target="_blank" rel="noopener noreferrer">+919721457228</a> | <a href="https://wa.me/919415537228" className="hover:text-white" target="_blank" rel="noopener noreferrer">+919415537228</a></p>
          <p className="text-sm font-lato text-gray-400">Email: <a href="mailto:classicinternationalknp@gmail.com" className="hover:text-white" style={{ 
            textTransform: 'none', 
            fontVariant: 'normal', 
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            fontSize: 'inherit'
          }}>
            {'classicinternationalknp@gmail.com'}
          </a></p>
        </div>
        {/* Quick Links */}
        <div className="text-center">
          <h4 className="font-semibold mb-2 text-white">Quick Links</h4>
          <ul className="space-y-1 text-sm font-lato">
            <li><button onClick={() => navigate("/")} className="hover:text-white transition bg-transparent border-none p-0 cursor-pointer text-inherit font-inherit">Home</button></li>
            <li><button onClick={() => navigate("/contact")} className="hover:text-white transition bg-transparent border-none p-0 cursor-pointer text-inherit font-inherit">Contact</button></li>
            <li><button onClick={() => navigate("/customer-requirement")} className="hover:text-white transition bg-transparent border-none p-0 cursor-pointer text-inherit font-inherit">Custom Orders</button></li>
          </ul>
        </div>
        {/* Social Media */}
        <div className="text-center">
          <h4 className="font-semibold mb-2 text-white">Follow Us</h4>
          <div className="flex justify-center gap-4">
            <a href="https://instagram.com/classic_international98" aria-label="Instagram" className="hover:text-white transition" target="_blank" rel="noopener noreferrer">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.13 1.12a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/></svg>
            </a>
            <a href="https://www.facebook.com/share/1NVzpv8BUy/?mibextid=wwXIfr" aria-label="Facebook" className="hover:text-white transition" target="_blank" rel="noopener noreferrer">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89c1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/classic-international-1998/" aria-label="LinkedIn" className="hover:text-white transition" target="_blank" rel="noopener noreferrer"><svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75s1.75.784 1.75 1.75s-.784 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47c-1.5 0-1.73 1.17-1.73 2.38v4.59h-3v-9h2.89v1.23h.04c.4-.76 1.38-1.56 2.84-1.56c3.04 0 3.6 2 3.6 4.59v4.74z"/></svg></a>
          </div>
          {/* About Us Button */}
          <div className="mt-4">
            <button 
              onClick={() => navigate("/about-us")}
              className="bg-transparent border border-gray-400 text-gray-300 hover:text-white hover:border-white transition px-4 py-2 rounded text-sm font-lato"
            >
              About Us
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-500 font-lato">
  &copy; {new Date().getFullYear()} Classic International. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
