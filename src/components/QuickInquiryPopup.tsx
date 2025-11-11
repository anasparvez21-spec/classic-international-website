import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { X, MessageSquare, Send, Phone, Mail } from 'lucide-react';
import { sendQuickInquiryEmail, sendAutoReplyEmail } from '@/utils/emailService';
import { sendQuickInquiryToWhatsApp } from '@/utils/whatsappService';

interface QuickInquiryData {
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
  productId?: string;
  productName?: string;
}

interface QuickInquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
  productName?: string;
}

const QuickInquiryPopup: React.FC<QuickInquiryPopupProps> = ({ 
  isOpen, 
  onClose, 
  productId, 
  productName 
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<QuickInquiryData>({
    name: '',
    email: '',
    phone: '',
    inquiryType: productId ? 'product-inquiry' : '',
    message: productName ? `I'm interested in ${productName}. ` : '',
    productId,
    productName
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when popup opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: productId ? 'product-inquiry' : '',
        message: productName ? `I'm interested in ${productName}. ` : '',
        productId,
        productName
      });
    }
  }, [isOpen, productId, productName]);

  // Prevent background scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (field: keyof QuickInquiryData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      const emailSent = await sendQuickInquiryEmail(formData);
      
      // Send to WhatsApp (opens both numbers)
      const whatsappSent = await sendQuickInquiryToWhatsApp(formData);
      
      if (emailSent) {
        // Send auto-reply to customer
        await sendAutoReplyEmail(
          formData.email, 
          formData.name, 
          formData.inquiryType
        );

        // Save to localStorage for backup/dashboard
        const inquiries = JSON.parse(localStorage.getItem('quickInquiries') || '[]');
        const newInquiry = {
          id: Date.now(),
          ...formData,
          submittedAt: new Date().toISOString(),
          status: 'new',
          source: 'quick-inquiry-popup',
          emailSent,
          whatsappSent
        };
        localStorage.setItem('quickInquiries', JSON.stringify([...inquiries, newInquiry]));

        const notificationMethods = [emailSent && 'email', whatsappSent && 'WhatsApp'].filter(Boolean).join(' and ');
        
        toast({
          title: "Inquiry Sent Successfully!",
          description: `We've received your inquiry via ${notificationMethods} and will respond within 24 hours. Check your email for confirmation.`,
        });

        onClose();
      } else {
        throw new Error('Failed to send inquiry email');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your inquiry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup Content */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Quick Inquiry</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {productName && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>Product:</strong> {productName}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone (Optional)
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inquiry Type *
            </label>
            <Select 
              value={formData.inquiryType} 
              onValueChange={(value) => handleInputChange('inquiryType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product-inquiry">Product Inquiry</SelectItem>
                <SelectItem value="custom-order">Custom Order</SelectItem>
                <SelectItem value="pricing">Pricing Information</SelectItem>
                <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                <SelectItem value="shipping">Shipping Question</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <Textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              required
              rows={4}
              placeholder="Please describe your inquiry or requirements..."
            />
          </div>

          <div className="flex space-x-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Inquiry
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>

          {/* Quick Contact Options */}
          <div className="pt-4 border-t">
            <p className="text-xs text-gray-600 mb-3">Or contact us directly:</p>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => window.open('https://wa.me/919721457228', '_blank')}
                className="flex-1"
              >
                <Phone className="w-4 h-4 mr-1" />
                WhatsApp
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => window.open('mailto:classicinternationalknp@gmail.com', '_blank')}
                className="flex-1"
              >
                <Mail className="w-4 h-4 mr-1" />
                Email
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Hook to manage popup state
export const useQuickInquiry = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productContext, setProductContext] = useState<{ id?: string; name?: string }>({});

  const openInquiry = (productId?: string, productName?: string) => {
    setProductContext({ id: productId, name: productName });
    setIsOpen(true);
  };

  const closeInquiry = () => {
    setIsOpen(false);
    setProductContext({});
  };

  return {
    isOpen,
    openInquiry,
    closeInquiry,
    productContext
  };
};

export default QuickInquiryPopup;