import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, CreditCard, Lock, Truck } from 'lucide-react';
import { useCartStore, useCartSummary } from '@/store/cartStore';
import { ShippingOption } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

// Form validation schemas
const addressSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  company: z.string().optional(),
  addressLine1: z.string().min(1, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  phone: z.string().optional(),
});

const checkoutSchema = z.object({
  email: z.string().email('Invalid email address'),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  sameAsShipping: z.boolean().default(false),
  shippingOption: z.string().min(1, 'Please select a shipping option'),
  paymentMethod: z.string().min(1, 'Please select a payment method'),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  cardholderName: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const shippingOptions: ShippingOption[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    price: 15,
    estimatedDays: '5-7 days'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    price: 25,
    estimatedDays: '2-3 days'
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day',
    price: 45,
    estimatedDays: '1 day'
  }
];

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, clearCart } = useCartStore();
  const cartSummary = useCartSummary();
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      sameAsShipping: true,
      shippingAddress: {
        country: 'United States'
      },
      billingAddress: {
        country: 'United States'
      }
    }
  });

  const { watch, handleSubmit, setValue } = form;
  const sameAsShipping = watch('sameAsShipping');

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some items to your cart before checkout.</p>
          <Button onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    const shipping = selectedShipping?.price || cartSummary.shipping;
    return cartSummary.subtotal + cartSummary.tax + shipping;
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate order ID
      const orderId = `CI-${Date.now()}`;
      
      // Clear cart and redirect to success
      clearCart();
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order ${orderId} has been confirmed.`,
      });
      
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShippingNext = () => {
    form.trigger(['email', 'shippingAddress']).then(isValid => {
      if (isValid) {
        setCurrentStep('payment');
      }
    });
  };

  const handlePaymentNext = () => {
    form.trigger(['paymentMethod', 'cardNumber', 'expiryDate', 'cvv', 'cardholderName']).then(isValid => {
      if (isValid) {
        setCurrentStep('review');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate('/cart')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { key: 'shipping', label: 'Shipping', icon: Truck },
              { key: 'payment', label: 'Payment', icon: CreditCard },
              { key: 'review', label: 'Review', icon: Lock }
            ].map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.key;
              const isCompleted = ['shipping', 'payment'].slice(0, ['shipping', 'payment', 'review'].indexOf(currentStep)).includes(step.key as any);
              
              return (
                <div key={step.key} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive ? 'border-blue-600 bg-blue-600 text-white' :
                    isCompleted ? 'border-green-600 bg-green-600 text-white' :
                    'border-gray-300 text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-blue-600' :
                    isCompleted ? 'text-green-600' :
                    'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                  {index < 2 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Shipping Step */}
                {currentStep === 'shipping' && (
                  <>
                    {/* Customer Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    {/* Shipping Address */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Shipping Address</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="shippingAddress.firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="shippingAddress.lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="shippingAddress.company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company (Optional)</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="shippingAddress.addressLine1"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="shippingAddress.addressLine2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Apartment, suite, etc. (Optional)</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="shippingAddress.city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="shippingAddress.state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="shippingAddress.postalCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="shippingAddress.phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone (Optional)</FormLabel>
                              <FormControl>
                                <Input type="tel" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    {/* Shipping Options */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Shipping Method</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <FormField
                          control={form.control}
                          name="shippingOption"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <RadioGroup
                                  value={field.value}
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    const option = shippingOptions.find(opt => opt.id === value);
                                    setSelectedShipping(option || null);
                                  }}
                                  className="space-y-3"
                                >
                                  {shippingOptions.map((option) => (
                                    <div key={option.id} className="flex items-center space-x-3 border rounded-lg p-4">
                                      <RadioGroupItem value={option.id} id={option.id} />
                                      <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                                        <div className="flex justify-between items-center">
                                          <div>
                                            <div className="font-medium">{option.name}</div>
                                            <div className="text-sm text-gray-600">{option.description}</div>
                                          </div>
                                          <div className="text-lg font-semibold">
                                            ${option.price.toFixed(2)}
                                          </div>
                                        </div>
                                      </Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    <div className="flex justify-end">
                      <Button onClick={handleShippingNext} size="lg">
                        Continue to Payment
                      </Button>
                    </div>
                  </>
                )}

                {/* Payment Step */}
                {currentStep === 'payment' && (
                  <>
                    {/* Billing Address */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Billing Address</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="sameAsShipping"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Same as shipping address</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        {!sameAsShipping && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="billingAddress.firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="billingAddress.lastName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            {/* Add similar fields as shipping address */}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Payment Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="paymentMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Payment Method</FormLabel>
                              <FormControl>
                                <RadioGroup value={field.value} onValueChange={field.onChange}>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="card" id="card" />
                                    <Label htmlFor="card">Credit/Debit Card</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="paypal" id="paypal" />
                                    <Label htmlFor="paypal">PayPal</Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {watch('paymentMethod') === 'card' && (
                          <>
                            <FormField
                              control={form.control}
                              name="cardholderName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Cardholder Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="cardNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Card Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="1234 5678 9012 3456" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="expiryDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Expiry Date</FormLabel>
                                    <FormControl>
                                      <Input placeholder="MM/YY" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="cvv"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>CVV</FormLabel>
                                    <FormControl>
                                      <Input placeholder="123" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setCurrentStep('shipping')}>
                        Back to Shipping
                      </Button>
                      <Button onClick={handlePaymentNext} size="lg">
                        Review Order
                      </Button>
                    </div>
                  </>
                )}

                {/* Review Step */}
                {currentStep === 'review' && (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle>Order Review</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-sm text-gray-600">
                          Please review your order details before placing your order.
                        </div>
                        
                        {/* Order Items */}
                        <div className="space-y-4">
                          {items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4 py-4 border-b">
                              <img
                                src={item.product.featuredImage}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium">{item.product.name}</h4>
                                {item.selectedVariant && (
                                  <p className="text-sm text-gray-600">{item.selectedVariant.name}</p>
                                )}
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                              </div>
                              <div className="text-lg font-semibold">
                                ${((item.selectedVariant?.price || item.product.price) * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setCurrentStep('payment')}>
                        Back to Payment
                      </Button>
                      <Button 
                        type="submit" 
                        size="lg" 
                        disabled={isProcessing}
                        className="min-w-[150px]"
                      >
                        {isProcessing ? 'Processing...' : 'Place Order'}
                      </Button>
                    </div>
                  </>
                )}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${cartSummary.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>
                          {selectedShipping ? `$${selectedShipping.price.toFixed(2)}` : 
                           cartSummary.shipping === 0 ? 'Free' : `$${cartSummary.shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>${cartSummary.tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div className="flex items-center space-x-2 text-xs text-gray-600 bg-gray-50 p-3 rounded">
                      <Lock className="w-4 h-4" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;