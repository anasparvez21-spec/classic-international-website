import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, ShoppingCart, Truck, Shield, RotateCcw, Star, Plus, Minus, ArrowLeft } from 'lucide-react';
import { getProductById } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { ProductVariant } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const product = id ? getProductById(id) : null;
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [customizations, setCustomizations] = useState<Record<string, string>>({});
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { addItem, openCart } = useCartStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  const currentPrice = selectedVariant?.price || product.price;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant, customizations);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
    openCart();
  };

  const handleCustomizationChange = (optionId: string, value: string) => {
    setCustomizations(prev => ({ ...prev, [optionId]: value }));
  };

  const calculateCustomizationPrice = () => {
    return Object.entries(customizations).reduce((total, [optionId, value]) => {
      const option = product.customizationOptions?.find(opt => opt.id === optionId);
      return total + (option?.additionalPrice || 0);
    }, 0);
  };

  const totalPrice = currentPrice + calculateCustomizationPrice();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === index ? 'border-black' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{product.category}</Badge>
                {product.featured && <Badge variant="default">Featured</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600">{product.shortDescription}</p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-green-600">
                  ${totalPrice.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {calculateCustomizationPrice() > 0 && (
                <p className="text-sm text-gray-600">
                  Includes ${calculateCustomizationPrice().toFixed(2)} for customizations
                </p>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <Label>Select Option</Label>
                <Select value={selectedVariant?.id} onValueChange={(value) => {
                  const variant = product.variants?.find(v => v.id === value);
                  setSelectedVariant(variant);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.variants.map((variant) => (
                      <SelectItem key={variant.id} value={variant.id}>
                        {variant.name} - ${variant.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Customizations */}
            {product.customizable && product.customizationOptions && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Customization Options</h3>
                {product.customizationOptions.map((option) => (
                  <div key={option.id} className="space-y-2">
                    <Label>
                      {option.name}
                      {option.required && <span className="text-red-500 ml-1">*</span>}
                      {option.additionalPrice && (
                        <span className="text-green-600 ml-2">
                          +${option.additionalPrice.toFixed(2)}
                        </span>
                      )}
                    </Label>
                    {option.type === 'text' && (
                      <Input
                        placeholder={`Enter ${option.name.toLowerCase()}`}
                        value={customizations[option.id] || ''}
                        onChange={(e) => handleCustomizationChange(option.id, e.target.value)}
                      />
                    )}
                    {option.type === 'select' && option.options && (
                      <Select 
                        value={customizations[option.id] || ''} 
                        onValueChange={(value) => handleCustomizationChange(option.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Choose ${option.name.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {option.options.map((optionValue) => (
                            <SelectItem key={optionValue} value={optionValue}>
                              {optionValue}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-2">
              <Label>Quantity</Label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleAddToCart}
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                size="lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm">1 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-5 h-5 text-purple-600" />
                <span className="text-sm">30 Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                  {product.materials.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Materials:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.materials.map((material, index) => (
                          <Badge key={index} variant="secondary">{material}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between border-b pb-2">
                        <span className="font-medium">{spec.name}:</span>
                        <span className="text-gray-600">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="care" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  {product.careInstructions && product.careInstructions.length > 0 ? (
                    <ul className="space-y-2">
                      {product.careInstructions.map((instruction, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No specific care instructions provided.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;