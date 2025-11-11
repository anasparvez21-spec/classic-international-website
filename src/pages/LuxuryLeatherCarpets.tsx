
const carpetNames = [
  'Royal Chevron',
  'Leopard Luxe',
  'Golden Mosaic',
  'Ebony Stripe',
  'Ivory Patchwork',
  'Sahara Sands',
  'Midnight Mirage',
  'Vintage Weave',
  'Opulent Grid',
  'Regal Crest',
  'Majestic Lines',
  'Premium Squares',
];
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import { getProductsByCategory } from "@/data/products";

const carpetImages = [
  '/luxury-leather-carpets/11.jpg',
  '/luxury-leather-carpets/13.jpg',
  '/luxury-leather-carpets/12.jpg',
  '/luxury-leather-carpets/14.jpg',
  '/luxury-leather-carpets/15.jpg',
  '/luxury-leather-carpets/16.jpg',
  '/luxury-leather-carpets/17.jpg',
  '/luxury-leather-carpets/18.jpg',
  '/luxury-leather-carpets/19.jpg',
  '/luxury-leather-carpets/20.jpg',
  '/luxury-leather-carpets/21.jpg',
  '/luxury-leather-carpets/22.jpg',
];


const LuxuryLeatherCarpets: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem, openCart } = useCartStore();
  const products = getProductsByCategory('luxury-carpets');
  const [hoverImg, setHoverImg] = React.useState<string | null>(null);
  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
    openCart();
  };
  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 relative">
      {/* X Close Icon */}
      <button
        onClick={() => navigate(-1)}
        aria-label="Close"
        className="absolute top-6 right-6 z-20 bg-white rounded-full shadow p-2 hover:bg-gray-200 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h1 className="text-3xl font-bold mb-8 text-center">Luxury Leather Carpets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {products.map((product, idx) => (
          <div key={product.id} className="rounded-lg overflow-hidden shadow-lg bg-white flex flex-col">
            <img
              src={product.featuredImage}
              alt={product.name}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
              onMouseEnter={() => setHoverImg(product.featuredImage)}
              onMouseLeave={() => setHoverImg(null)}
              onClick={() => handleProductClick(product.id)}
            />
            <div className="text-center text-lg font-semibold mt-2">{product.name}</div>
            <div className="text-center text-gray-600 text-sm mb-2">{product.shortDescription}</div>
            <div className="flex-1 flex flex-col justify-end">
              <div className="text-center font-bold text-xl mb-2">${product.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
              <Button
                onClick={(e) => handleAddToCart(product, e)}
                className="w-11/12 mx-auto mb-4"
                disabled={!product.inStock || product.stockQuantity === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.inStock && product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              {product.customizable && (
                <p className="text-xs text-center text-blue-600 mb-2">✨ Customization available</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {hoverImg && (
        <div className="fixed left-1/2 top-24 z-50 flex flex-col items-center" style={{transform: 'translateX(-50%)'}}>
          <div className="bg-white rounded-lg shadow-2xl border-4 border-gray-200 p-2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] scale-95 opacity-0 animate-enlarge-fade-in">
            <img src={hoverImg} alt="Preview Carpet" className="max-h-[60vh] max-w-[80vw] rounded-lg transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
          </div>
        </div>
      )}
/* Add keyframes for smooth enlarge and fade-in */
// ...existing code...
import "../index.css";
    </div>
  );
};

export default LuxuryLeatherCarpets;
