import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Phone, Send } from 'lucide-react';
import { 
  sendToWhatsApp,
  sendContactFormToWhatsApp,
  sendQuickInquiryToWhatsApp,
  sendCustomerRequirementToWhatsApp,
  sendNewsletterToWhatsApp 
} from '@/utils/whatsappService';

const WhatsAppTestDemo: React.FC = () => {
  const { toast } = useToast();
  const [testData, setTestData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    message: 'Testing WhatsApp integration for Classic International!'
  });

  const handleTestWhatsApp = async (testType: string) => {
    try {
      let success = false;
      
      switch (testType) {
        case 'basic':
          success = await sendToWhatsApp({
            customerName: testData.name,
            customerEmail: testData.email,
            customerPhone: testData.phone,
            inquiryType: 'WhatsApp Integration Test',
            message: testData.message,
            source: 'WhatsApp Test Demo'
          });
          break;
          
        case 'contact':
          success = await sendContactFormToWhatsApp({
            firstName: testData.name.split(' ')[0],
            lastName: testData.name.split(' ')[1] || '',
            email: testData.email,
            phone: testData.phone,
            inquiryType: 'Contact Form Test',
            message: testData.message
          });
          break;
          
        case 'inquiry':
          success = await sendQuickInquiryToWhatsApp({
            name: testData.name,
            email: testData.email,
            phone: testData.phone,
            inquiryType: 'Quick Inquiry Test',
            message: testData.message
          });
          break;
          
        case 'newsletter':
          success = await sendNewsletterToWhatsApp({
            firstName: testData.name.split(' ')[0],
            email: testData.email,
            interests: ['New Product Launches', 'Custom Orders']
          });
          break;
      }

      if (success) {
        toast({
          title: "WhatsApp Test Successful! 📱",
          description: `${testType} WhatsApp message sent to both numbers (+919721457228, +919415537228)`,
        });
      }
    } catch (error) {
      toast({
        title: "WhatsApp Test Failed",
        description: "Check console for error details",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <MessageSquare className="w-6 h-6 text-green-600" />
          <span>WhatsApp Integration Test Demo</span>
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          Test sending messages to both WhatsApp numbers:
          <br />
          <strong>+919721457228</strong> and <strong>+919415537228</strong>
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Test Data Form */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Test Data</h3>
          
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input 
              value={testData.name}
              onChange={(e) => setTestData({...testData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input 
              value={testData.email}
              onChange={(e) => setTestData({...testData, email: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input 
              value={testData.phone}
              onChange={(e) => setTestData({...testData, phone: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <Textarea 
              value={testData.message}
              onChange={(e) => setTestData({...testData, message: e.target.value})}
              rows={3}
            />
          </div>
        </div>

        {/* Test Buttons */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">WhatsApp Integration Tests</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button 
              onClick={() => handleTestWhatsApp('basic')}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Basic WhatsApp</span>
            </Button>
            
            <Button 
              onClick={() => handleTestWhatsApp('contact')}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Form</span>
            </Button>
            
            <Button 
              onClick={() => handleTestWhatsApp('inquiry')}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Quick Inquiry</span>
            </Button>
            
            <Button 
              onClick={() => handleTestWhatsApp('newsletter')}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Newsletter</span>
            </Button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">How it works now:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Click any test button above</li>
            <li>• A modal will appear with WhatsApp options for both numbers</li>
            <li>• Click "Send to Both WhatsApp Numbers" to open both at once</li>
            <li>• Or choose individual numbers: +919721457228, +919415537228</li>
            <li>• Messages will be pre-filled with formatted inquiry data</li>
            <li>• This avoids browser popup blocking issues</li>
          </ul>
        </div>

        {/* Current Integration Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">✅ Updated Integration Status:</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• ✅ WhatsApp modal service with dual-number support</li>
            <li>• ✅ Browser popup blocking prevention with user-controlled modal</li>
            <li>• ✅ QuickInquiryPopup updated with modal-based WhatsApp integration</li>
            <li>• ✅ ContactUs form updated with modal-based WhatsApp integration</li>
            <li>• ✅ CustomerRequirement form updated with modal-based WhatsApp integration</li>
            <li>• ✅ Newsletter signup updated with modal-based WhatsApp integration</li>
            <li>• ✅ All forms now send to both email and WhatsApp (via modal)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsAppTestDemo;