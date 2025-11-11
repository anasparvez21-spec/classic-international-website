import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Eye } from "lucide-react";
import { getProductsByCategory } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";

const PremiumLeatherBags: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem, openCart } = useCartStore();
  const products = getProductsByCategory('bags');
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
      <button onClick={() => navigate(-1)} aria-label="Close" className="absolute top-6 right-6 z-20 bg-white rounded-full shadow p-2 hover:bg-gray-200 transition">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h1 className="text-3xl font-bold mb-8 text-center">Premium Leather Bags</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product: any) => (
          <Card key={product.id} className="group cursor-pointer transition-all duration-300 hover:shadow-lg">
            <div 
              className="relative overflow-hidden rounded-t-lg aspect-square"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={product.featuredImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onMouseEnter={() => setHoverImg(product.featuredImage)}
                onMouseLeave={() => setHoverImg(null)}
              />
              {/* Quick View Button */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product.id);
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Quick View
                </Button>
              </div>
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.featured && (
                  <Badge variant="default" className="text-xs">Featured</Badge>
                )}
                {product.originalPrice && (
                  <Badge variant="secondary" className="text-xs">Sale</Badge>
                )}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.shortDescription}
                </p>
                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-green-600">
                    ${(product.price ? (product.price * 0.7).toFixed(2) : '')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice?.toFixed(2)}
                    </span>
                  )}
                </div>
                {/* Specifications Preview */}
                <div className="text-xs text-gray-500 space-y-1">
                  {product.specifications?.slice(0, 2).map((spec: any, index: number) => (
                    <div key={index} className="flex justify-between">
                      <span>{spec.name}:</span>
                      <span>{spec.value}</span>
                    </div>
                  ))}
                </div>
                {/* Materials */}
                <div className="flex flex-wrap gap-1">
                  {product.materials?.slice(0, 2).map((material: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 space-y-2">
              <Button
                onClick={(e) => handleAddToCart(product, e)}
                className="w-full"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              {product.customizable && (
                <p className="text-xs text-center text-blue-600">
                  ✨ Customization available
                </p>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* Image Preview Modal */}
      {hoverImg && (
        <div className="fixed left-1/2 top-24 z-50 flex flex-col items-center" style={{transform: 'translateX(-50%)'}}>
          <div className="bg-white rounded-lg shadow-2xl border-4 border-gray-200 p-2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] scale-95 opacity-0 animate-enlarge-fade-in">
            <img src={hoverImg} alt="Preview Bag" className="max-h-[60vh] max-w-[80vw] rounded-lg transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumLeatherBags;
