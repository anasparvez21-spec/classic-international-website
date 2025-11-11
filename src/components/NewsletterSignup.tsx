import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { sendNewsletterEmail } from '@/utils/emailService';
import { sendNewsletterToWhatsApp } from '@/utils/whatsappService';

interface NewsletterData {
  email: string;
  firstName?: string;
  lastName?: string;
  interests: string[];
}

const NewsletterSignup: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const availableInterests = [
    'New Product Launches',
    'Custom Orders',
    'Exclusive Offers',
    'Leather Care Tips',
    'Behind the Scenes',
    'Seasonal Collections'
  ];

  const handleInterestToggle = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const newsletterData: NewsletterData = {
        email,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        interests
      };

      // Check if already subscribed
      const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
      const existingSubscriber = subscribers.find((sub: NewsletterData) => sub.email === email);
      
      if (existingSubscriber) {
        toast({
          title: "Already Subscribed",
          description: "This email is already subscribed to our newsletter.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Send email using EmailJS
      const emailSent = await sendNewsletterEmail(newsletterData);
      
      // Send to WhatsApp (opens both numbers)
      const whatsappSent = await sendNewsletterToWhatsApp(newsletterData);
      
      if (emailSent) {
        const newSubscriber = {
          id: Date.now(),
          ...newsletterData,
          subscribedAt: new Date().toISOString(),
          status: 'active'
        };

        localStorage.setItem('newsletterSubscribers', JSON.stringify([...subscribers, newSubscriber]));

        setIsSubscribed(true);
        const notificationMethods = [emailSent && 'email', whatsappSent && 'WhatsApp'].filter(Boolean).join(' and ');
        
        toast({
          title: "Successfully Subscribed!",
          description: `Welcome to our newsletter! We've notified our team via ${notificationMethods}. You'll receive exclusive updates and offers.`,
        });
      } else {
        throw new Error('Failed to send newsletter subscription email');
      }

    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-300" />
        <h3 className="text-2xl font-bold mb-2">Welcome to Our Newsletter!</h3>
        <p className="text-blue-100">
          Thank you for subscribing. You'll receive our latest updates and exclusive offers.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <Mail className="w-12 h-12 mx-auto mb-4 text-blue-200" />
          <h3 className="text-2xl font-bold mb-2">Stay Updated with Classic International</h3>
          <p className="text-blue-100">
            Get exclusive access to new products, special offers, and leather care tips.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="First Name (Optional)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
            />
            <Input
              type="text"
              placeholder="Last Name (Optional)"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
            />
          </div>
          
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
          />

          {/* Interest Selection */}
          <div>
            <label className="block text-sm font-medium mb-3 text-blue-200">
              What interests you? (Optional)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableInterests.map((interest) => (
                <label
                  key={interest}
                  className="flex items-center space-x-2 cursor-pointer text-sm"
                >
                  <input
                    type="checkbox"
                    checked={interests.includes(interest)}
                    onChange={() => handleInterestToggle(interest)}
                    className="rounded border-white/20 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-blue-100">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3"
          >
            {isSubmitting ? (
              'Subscribing...'
            ) : (
              <>
                Subscribe Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <p className="text-xs text-blue-200 mt-4 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;