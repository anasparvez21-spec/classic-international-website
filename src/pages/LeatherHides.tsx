import React from "react";
import { useNavigate } from "react-router-dom";

const hideImages = [
  "/leather-hides/hide-1.jpg",
  "/leather-hides/hide-2.jpg",
  "/leather-hides/hide-4.jpg",
  "/leather-hides/hide-3.jpeg",
  "/leather-hides/WhatsApp Image 2025-10-10 at 21.59.23 (1).jpeg",
  "/leather-hides/WhatsApp Image 2025-10-10 at 21.59.23 (2).jpeg",
  "/leather-hides/WhatsApp Image 2025-10-10 at 23.31.52 (8).jpeg",
  "/leather-hides/WhatsApp Image 2025-10-10 at 23.49.27 (1).jpeg",
  "/leather-hides/WhatsApp Image 2025-10-10 at 23.49.27.jpeg"
];

const hideNames = [
  'Classic Hide',
  'Vintage Hide',
  'Premium Hide',
  'Exotic Hide',
  'Natural Grain',
  'Tanned Hide',
  'Luxury Hide',
  'Heritage Hide',
  'Signature Hide',
];

const LeatherHides: React.FC = () => {
  const navigate = useNavigate();
  const [hoverImg, setHoverImg] = React.useState<string | null>(null);
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 relative">
      <button onClick={() => navigate(-1)} aria-label="Close" className="absolute top-6 right-6 z-20 bg-white rounded-full shadow p-2 hover:bg-gray-200 transition">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h1 className="text-3xl font-bold mb-8 text-center">Leather Hides</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {hideImages.map((src, idx) => (
          <div key={idx} className="rounded-lg overflow-hidden shadow-lg bg-white">
            <img
              src={src}
              alt={hideNames[idx] || `Leather Hide ${idx + 1}`}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
              loading="lazy"
              decoding="async"
              onMouseEnter={() => setHoverImg(src)}
              onMouseLeave={() => setHoverImg(null)}
            />
            <div className="text-center text-lg font-semibold mt-2">{hideNames[idx] || ''}</div>
          </div>
        ))}
      </div>
      {hoverImg && (
        <div className="fixed left-1/2 top-24 z-50 flex flex-col items-center" style={{transform: 'translateX(-50%)'}}>
          <div className="bg-white rounded-lg shadow-2xl border-4 border-gray-200 p-2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] scale-95 opacity-0 animate-enlarge-fade-in">
            <img src={hoverImg} alt="Preview Hide" loading="lazy" decoding="async" className="max-h-[60vh] max-w-[80vw] rounded-lg transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
          </div>
        </div>
      )}
    </div>
  );
};




export default LeatherHides;