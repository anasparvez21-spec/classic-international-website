import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { sendContactEmail, sendAutoReplyEmail } from '@/utils/emailService';
import { sendContactFormToWhatsApp } from '@/utils/whatsappService';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  inquiryType: string;
  message: string;
  preferredContact: string;
  company?: string;
  country: string;
}

const ContactUs: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    inquiryType: '',
    message: '',
    preferredContact: 'email',
    company: '',
    country: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      const emailSent = await sendContactEmail(formData);
      
      // Send to WhatsApp (opens both numbers)
      const whatsappSent = await sendContactFormToWhatsApp(formData);
      
      if (emailSent) {
        // Send auto-reply to customer
        await sendAutoReplyEmail(
          formData.email, 
          `${formData.firstName} ${formData.lastName}`, 
          formData.inquiryType
        );

        // Save to localStorage for backup/dashboard
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        const newSubmission = {
          id: Date.now(),
          ...formData,
          timestamp: new Date().toISOString(),
          status: 'new'
        };

        localStorage.setItem('contactSubmissions', JSON.stringify([...submissions, newSubmission]));

        const notificationMethods = [emailSent && 'email', whatsappSent && 'WhatsApp'].filter(Boolean).join(' and ');

        toast({
          title: "Message Sent Successfully!",
          description: `We've received your inquiry via ${notificationMethods} and will respond within 24 hours. Check your email for confirmation.`,
        });

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          inquiryType: '',
          message: '',
          preferredContact: 'email',
          company: '',
          country: ''
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error Sending Message",
        description: "There was a problem sending your message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get in touch with us for any inquiries about our premium leather products, custom orders, or general questions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-gray-600">+91 9721457228</p>
                      <p className="text-sm text-gray-500">WhatsApp available</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600">classicinternationalknp@gmail.com</p>
                      <p className="text-sm text-gray-500">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-gray-600">Classic International Leather</p>
                      <p className="text-gray-600">India</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Business Hours</h3>
                      <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM IST</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Quick WhatsApp Contact</h3>
                    <p className="text-sm text-gray-600 mb-4">Get instant responses for urgent inquiries</p>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => window.open('https://wa.me/919721457228', '_blank')}
                    >
                      Start WhatsApp Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
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
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Inquiry Details */}
                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type *</Label>
                      <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product-inquiry">Product Inquiry</SelectItem>
                          <SelectItem value="custom-order">Custom Order</SelectItem>
                          <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                          <SelectItem value="shipping">Shipping & Delivery</SelectItem>
                          <SelectItem value="return">Returns & Exchanges</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Please provide details about your inquiry, including any specific product requirements, quantities, or deadlines..."
                        required
                      />
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <Label>Preferred Contact Method</Label>
                      <Select value={formData.preferredContact} onValueChange={(value) => handleInputChange('preferredContact', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred contact method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;