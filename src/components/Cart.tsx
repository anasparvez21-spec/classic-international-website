import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingBag, Plus, Minus, X, ShoppingCart } from 'lucide-react';
import { useCartStore, useCartSummary, useCartCount } from '@/store/cartStore';
import { useNavigate } from 'react-router-dom';

// Cart Icon Component
export const CartIcon: React.FC = () => {
  const itemCount = useCartCount();
  const { toggleCart } = useCartStore();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleCart}
      className="relative p-2"
    >
      <ShoppingBag className="w-6 h-6" />
      {itemCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </Badge>
      )}
    </Button>
  );
};

// Cart Item Component
const CartItem: React.FC<{ item: any }> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();
  const navigate = useNavigate();

  const currentPrice = item.selectedVariant?.price || item.product.price;
  const customizationPrice = item.customizations 
    ? Object.entries(item.customizations).reduce((sum: number, [key, value]) => {
        const option = item.product.customizationOptions?.find((opt: any) => opt.id === key);
        return sum + (option?.additionalPrice || 0);
      }, 0)
    : 0;

  const totalItemPrice = (currentPrice + customizationPrice) * item.quantity;

  const handleProductClick = () => {
    navigate(`/product/${item.product.id}`);
  };

  return (
    <div className="flex items-start space-x-4 py-4">
      <div 
        className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
        onClick={handleProductClick}
      >
        <img
          src={item.product.featuredImage}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 
          className="font-medium text-sm cursor-pointer hover:text-blue-600"
          onClick={handleProductClick}
        >
          {item.product.name}
        </h3>
        
        {item.selectedVariant && (
          <p className="text-xs text-gray-500 mt-1">
            {item.selectedVariant.name}
          </p>
        )}
        
        {item.customizations && Object.keys(item.customizations).length > 0 && (
          <div className="text-xs text-gray-500 mt-1">
            {Object.entries(item.customizations).map(([key, value]) => (
              <div key={key}>{key}: {String(value)}</div>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(item.productId, item.quantity - 1, item.selectedVariant?.id)}
              className="w-6 h-6 p-0"
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(item.productId, item.quantity + 1, item.selectedVariant?.id)}
              className="w-6 h-6 p-0"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          
          <div className="text-right">
            <p className="text-sm font-medium">${totalItemPrice.toFixed(2)}</p>
            {customizationPrice > 0 && (
              <p className="text-xs text-gray-500">
                +${customizationPrice.toFixed(2)} custom
              </p>
            )}
          </div>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => removeItem(item.productId, item.selectedVariant?.id)}
        className="p-1 h-8 w-8"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

// Cart Sidebar Component
export const CartSidebar: React.FC = () => {
  const { items, isOpen, closeCart, clearCart } = useCartStore();
  const cartSummary = useCartSummary();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    closeCart();
    navigate('/');
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0 bg-white border-l border-gray-200 shadow-xl">
        <div className="absolute inset-0 bg-white"></div>
        <div className="relative z-10">
          <SheetHeader className="p-6 pb-4 bg-white border-b border-gray-100">
            <SheetTitle className="flex items-center space-x-2 text-gray-900">
              <ShoppingCart className="w-5 h-5" />
              <span>Shopping Cart ({items.length})</span>
            </SheetTitle>
          </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-6 bg-white">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-4">Add some products to get started</p>
            <Button onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 bg-white">
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={`${item.productId}-${item.selectedVariant?.id || 'default'}-${index}`}>
                    <CartItem item={item} />
                    {index < items.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t bg-white p-6 space-y-4">
              {/* Cart Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${cartSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>
                    {cartSummary.shipping === 0 ? 'Free' : `$${cartSummary.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${cartSummary.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total:</span>
                  <span>${cartSummary.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button onClick={handleCheckout} className="w-full" size="lg">
                  Checkout
                </Button>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={handleContinueShopping}
                    className="flex-1"
                  >
                    Continue Shopping
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={clearCart}
                    className="flex-1"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {cartSummary.subtotal < 200 && (
                <div className="text-xs text-center text-gray-600 bg-gray-50 p-2 rounded">
                  Add ${(200 - cartSummary.subtotal).toFixed(2)} more for free shipping!
                </div>
              )}
            </div>
          </>
        )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Cart Page Component
export const CartPage: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const cartSummary = useCartSummary();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-8" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Button onClick={() => navigate('/')} size="lg">
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <div className="space-y-6">
                  {items.map((item, index) => (
                    <div key={`${item.productId}-${item.selectedVariant?.id || 'default'}-${index}`}>
                      <CartItem item={item} />
                      {index < items.length - 1 && <Separator className="my-6" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items):</span>
                  <span>${cartSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>
                    {cartSummary.shipping === 0 ? 'Free' : `$${cartSummary.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${cartSummary.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${cartSummary.total.toFixed(2)}</span>
                </div>
              </div>

              <Button onClick={handleCheckout} className="w-full mt-6" size="lg">
                Proceed to Checkout
              </Button>

              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="w-full mt-3"
              >
                Continue Shopping
              </Button>

              {cartSummary.subtotal < 200 && (
                <div className="text-xs text-center text-gray-600 bg-gray-50 p-3 rounded mt-4">
                  Add ${(200 - cartSummary.subtotal).toFixed(2)} more for free shipping!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};