import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Package, Truck, CreditCard, Download, ArrowRight } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  // In a real app, you would fetch order details from your backend
  const order = {
    id: orderId || 'CI-' + Date.now(),
    orderNumber: orderId || 'CI-' + Date.now(),
    status: 'confirmed',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    items: [
      {
        id: 'wallet-001',
        name: 'Classic Leather Wallet',
        price: 89.99,
        quantity: 1,
        image: '/wallets/1.jpg'
      }
    ],
    summary: {
      subtotal: 89.99,
      shipping: 15.00,
      tax: 8.39,
      total: 113.38
    },
    shippingAddress: {
      name: 'John Doe',
      addressLine1: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States'
    },
    paymentMethod: 'Credit Card ending in 4242'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-4">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>Order #{order.orderNumber}</span>
            <span>•</span>
            <span>{order.date}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Order Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Order Confirmed</p>
                      <p className="text-sm text-gray-600">We've received your order and will process it shortly</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Processing</Badge>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4" />
                    <span>Estimated delivery: {order.estimatedDelivery}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-lg font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p className="text-gray-600">{order.shippingAddress.addressLine1}</p>
                  <p className="text-gray-600">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  </p>
                  <p className="text-gray-600">{order.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{order.paymentMethod}</span>
                  <Badge variant="secondary">Paid</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${order.summary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>${order.summary.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${order.summary.tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${order.summary.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4">
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Receipt
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    Track Your Order
                  </Button>
                  
                  <Button onClick={() => navigate('/')} className="w-full">
                    Continue Shopping
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Help */}
                <div className="pt-4 border-t text-center">
                  <p className="text-sm text-gray-600 mb-2">Need help with your order?</p>
                  <Button variant="link" size="sm">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What's Next */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What happens next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">Order Processing</h4>
                <p className="text-sm text-gray-600">
                  We'll prepare your items with care and attention to detail.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-6 h-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold mb-2">Shipping</h4>
                <p className="text-sm text-gray-600">
                  Your order will be shipped and you'll receive tracking information.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">Delivery</h4>
                <p className="text-sm text-gray-600">
                  Enjoy your premium leather goods from Classic International.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderConfirmation;