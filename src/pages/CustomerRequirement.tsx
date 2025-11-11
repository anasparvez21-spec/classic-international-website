import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Package, User, Palette, DollarSign, Clock, CheckCircle, Send } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { sendCustomerRequirementEmail, sendAutoReplyEmail } from '@/utils/emailService';
import { sendCustomerRequirementToWhatsApp } from '@/utils/whatsappService';

interface CustomerRequirementData {
  // Personal Information
  name: string;
  email: string;
  phone: string;
  company?: string;
  country: string;
  
  // Product Requirements
  productType: string;
  leatherType: string;
  color: string;
  size: string;
  quantity: number;
  budget: string;
  
  // Detailed Requirements
  description: string;
  customizations: string[];
  urgency: string;
  
  // Additional Info
  referenceImages?: FileList;
  additionalNotes?: string;
}

const CustomerRequirement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<CustomerRequirementData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    productType: '',
    leatherType: '',
    color: '',
    size: '',
    quantity: 1,
    budget: '',
    description: '',
    customizations: [],
    urgency: '',
    additionalNotes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const productTypes = [
    'Leather Bags', 'Wallets', 'Shoes', 'Coats & Jackets', 'Belts', 
    'Luxury Carpets', 'Janamaz (Prayer Mats)', 'Custom Design', 'Other'
  ];

  const leatherTypes = [
    'Genuine Leather', 'Full Grain Leather', 'Top Grain Leather', 
    'Nubuck Leather', 'Suede', 'Patent Leather', 'Exotic Leather', 'Synthetic Leather'
  ];

  const customizationOptions = [
    'Embossing/Engraving', 'Color Customization', 'Size Modification', 
    'Logo Addition', 'Monogramming', 'Hardware Changes', 'Lining Options'
  ];

  const handleInputChange = (field: keyof CustomerRequirementData, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomizationToggle = (option: string) => {
    setFormData(prev => ({
      ...prev,
      customizations: prev.customizations.includes(option)
        ? prev.customizations.filter(c => c !== option)
        : [...prev.customizations, option]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare data for EmailJS
      const customerReqData = {
        personalDetails: {
          firstName: formData.name.split(' ')[0],
          lastName: formData.name.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          address: formData.country // Using country as address for now
        },
        productType: formData.productType,
        specifications: {
          leatherType: formData.leatherType,
          quantity: formData.quantity,
          description: formData.description
        },
        customization: {
          options: formData.customizations,
          additionalNotes: formData.additionalNotes
        },
        budget: formData.budget,
        timeline: formData.urgency
      };

      // Send email using EmailJS
      const emailSent = await sendCustomerRequirementEmail(customerReqData);
      
      // Send to WhatsApp (opens both numbers)
      const whatsappSent = await sendCustomerRequirementToWhatsApp(customerReqData);
      
      if (emailSent) {
        // Send auto-reply to customer
        await sendAutoReplyEmail(
          formData.email, 
          formData.name, 
          `Custom Product Requirement - ${formData.productType}`
        );

        // Save requirement to localStorage for backup/dashboard
        const requirements = JSON.parse(localStorage.getItem('customerRequirements') || '[]');
        const newRequirement = {
          id: Date.now(),
          ...formData,
          submittedAt: new Date().toISOString(),
          status: 'pending'
        };
        
        localStorage.setItem('customerRequirements', JSON.stringify([...requirements, newRequirement]));

        // Also add to contact submissions for unified dashboard
        const contacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        const contactEntry = {
          id: Date.now() + 1,
          firstName: formData.name.split(' ')[0],
          lastName: formData.name.split(' ').slice(1).join(' '),
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          country: formData.country,
          subject: `Custom Requirement: ${formData.productType}`,
          inquiryType: 'custom-order',
          message: `Product: ${formData.productType}\nLeather: ${formData.leatherType}\nQuantity: ${formData.quantity}\nBudget: ${formData.budget}\n\nDescription:\n${formData.description}\n\nCustomizations: ${formData.customizations.join(', ')}\n\nUrgency: ${formData.urgency}${formData.additionalNotes ? `\n\nAdditional Notes:\n${formData.additionalNotes}` : ''}`,
          preferredContact: 'email',
          submittedAt: new Date().toISOString(),
          status: 'new'
        };
        
        localStorage.setItem('contactSubmissions', JSON.stringify([...contacts, contactEntry]));

        setIsSubmitted(true);
        const notificationMethods = [emailSent && 'email', whatsappSent && 'WhatsApp'].filter(Boolean).join(' and ');
        
        toast({
          title: "Requirement Submitted Successfully!",
          description: `We've received your custom product requirements via ${notificationMethods}. Check your email for confirmation and we'll contact you within 24 hours.`,
        });
      } else {
        throw new Error('Failed to send requirement email');
      }
    } catch (error) {
      console.error('Error submitting requirement:', error);
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your requirements. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white px-4">
          <div className="text-center max-w-2xl">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Thank You for Your Requirement!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We have received your custom product requirement and our team will review it carefully. 
              You can expect to hear from us within 24 hours with a detailed quote and timeline.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <Button
                onClick={() => navigate('/')}
                className="w-full"
              >
                Return to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsSubmitted(false)}
                className="w-full"
              >
                Submit Another Requirement
              </Button>
            </div>
            <div className="text-sm text-gray-500 space-y-2">
              <p>Reference ID: CR-{Date.now()}</p>
              <p>For urgent inquiries, contact us directly:</p>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => window.open('https://wa.me/919721457228', '_blank')}
                >
                  WhatsApp: +91 9721457228
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => window.open('mailto:classicinternationalknp@gmail.com')}
                >
                  Email: classicinternationalknp@gmail.com
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800 font-cormorant">
              Custom Product Requirement
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-lato">
              Tell us about your specific requirements and we'll create a custom quote tailored to your needs.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Product Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Product Type *</Label>
                    <Select 
                      value={formData.productType} 
                      onValueChange={(value) => handleInputChange('productType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product type" />
                      </SelectTrigger>
                      <SelectContent>
                        {productTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Leather Type *</Label>
                    <Select 
                      value={formData.leatherType} 
                      onValueChange={(value) => handleInputChange('leatherType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select leather type" />
                      </SelectTrigger>
                      <SelectContent>
                        {leatherTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="color">Preferred Color *</Label>
                    <Input
                      id="color"
                      value={formData.color}
                      onChange={(e) => handleInputChange('color', e.target.value)}
                      required
                      placeholder="e.g., Black, Brown, Tan"
                    />
                  </div>
                  <div>
                    <Label htmlFor="size">Size/Dimensions *</Label>
                    <Input
                      id="size"
                      value={formData.size}
                      onChange={(e) => handleInputChange('size', e.target.value)}
                      required
                      placeholder="e.g., Large, 42, 30x20 cm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label>Budget Range</Label>
                  <Select 
                    value={formData.budget} 
                    onValueChange={(value) => handleInputChange('budget', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-100">Under $100</SelectItem>
                      <SelectItem value="100-500">$100 - $500</SelectItem>
                      <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                      <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                      <SelectItem value="over-5000">Over $5,000</SelectItem>
                      <SelectItem value="flexible">Flexible - Quote me</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="description">Product Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                    rows={5}
                    placeholder="Describe your product requirements in detail. Include any specific features, design elements, or functionality you need..."
                  />
                </div>

                <div>
                  <Label>Customization Options (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {customizationOptions.map((option) => (
                      <label key={option} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={formData.customizations.includes(option)}
                          onCheckedChange={() => handleCustomizationToggle(option)}
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Timeline/Urgency</Label>
                  <Select 
                    value={formData.urgency} 
                    onValueChange={(value) => handleInputChange('urgency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="When do you need this?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">As soon as possible</SelectItem>
                      <SelectItem value="1-2weeks">Within 1-2 weeks</SelectItem>
                      <SelectItem value="1month">Within 1 month</SelectItem>
                      <SelectItem value="2-3months">Within 2-3 months</SelectItem>
                      <SelectItem value="flexible">Flexible timeline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    rows={3}
                    placeholder="Any additional requirements, preferences, or questions..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
                    <ul className="space-y-1 text-blue-800">
                      <li>• We'll review your requirements within 24 hours</li>
                      <li>• Our team will prepare a detailed quote and timeline</li>
                      <li>• We'll contact you via your preferred method to discuss details</li>
                      <li>• Upon approval, we'll begin crafting your custom product</li>
                    </ul>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Submitting Requirement...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Requirement
                      </>
                    )}
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    <p>Need immediate assistance?</p>
                    <div className="flex justify-center space-x-4 mt-2">
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        onClick={() => window.open('https://wa.me/919721457228', '_blank')}
                      >
                        WhatsApp: +91 9721457228
                      </Button>
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        onClick={() => window.open('mailto:classicinternationalknp@gmail.com')}
                      >
                        Email: classicinternationalknp@gmail.com
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CustomerRequirement;
