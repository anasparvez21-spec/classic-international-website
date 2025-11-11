// WhatsApp notification service for sending inquiries to multiple WhatsApp numbers

interface WhatsAppConfig {
  numbers: string[];
}

const WHATSAPP_CONFIG: WhatsAppConfig = {
  numbers: [
    '919721457228',  // First WhatsApp number
    '919415537228'   // Second WhatsApp number
  ]
};

interface InquiryData {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  inquiryType: string;
  message: string;
  source?: string;
}

// Global modal state (simple approach for demo)
let whatsappModalCallback: ((message: string, title: string) => void) | null = null;

// Register modal callback
export const setWhatsAppModalCallback = (callback: (message: string, title: string) => void) => {
  whatsappModalCallback = callback;
};

// Format WhatsApp message for inquiries
const formatWhatsAppMessage = (data: InquiryData): string => {
  const { customerName, customerEmail, customerPhone, inquiryType, message, source } = data;
  
  return `🔔 *NEW INQUIRY - Classic International*

👤 *Customer:* ${customerName}
📧 *Email:* ${customerEmail}
${customerPhone ? `📱 *Phone:* ${customerPhone}` : ''}
🏷️ *Type:* ${inquiryType}
${source ? `📍 *Source:* ${source}` : ''}

💬 *Message:*
${message}

---
⏰ *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
🌐 *From:* Classic International Website`;
};

// Send inquiry to all WhatsApp numbers
export const sendToWhatsApp = async (data: InquiryData): Promise<boolean> => {
  try {
    const message = formatWhatsAppMessage(data);
    
    console.log('Preparing WhatsApp message for:', WHATSAPP_CONFIG.numbers);
    
    if (whatsappModalCallback) {
      // Use modal approach for better user control
      whatsappModalCallback(message, `WhatsApp Inquiry - ${data.inquiryType}`);
    } else {
      // Fallback to direct links (might be blocked by browser)
      const encodedMessage = encodeURIComponent(message);
      WHATSAPP_CONFIG.numbers.forEach((number, index) => {
        const whatsappUrl = `https://wa.me/${number}?text=${encodedMessage}`;
        console.log(`Opening WhatsApp for number ${index + 1}:`, whatsappUrl);
        
        if (index === 0) {
          // Open first number immediately
          window.open(whatsappUrl, '_blank');
        } else {
          // Delay subsequent numbers by 2 seconds to avoid browser blocking
          setTimeout(() => {
            console.log(`Opening delayed WhatsApp for number ${index + 1}`);
            window.open(whatsappUrl, '_blank');
          }, index * 2000);
        }
      });
    }
    
    console.log(`WhatsApp notifications prepared for ${WHATSAPP_CONFIG.numbers.length} numbers`);
    return true;
  } catch (error) {
    console.error('Failed to send WhatsApp notifications:', error);
    return false;
  }
};

// Send contact form inquiry to WhatsApp
export const sendContactFormToWhatsApp = (formData: any) => {
  return sendToWhatsApp({
    customerName: `${formData.firstName} ${formData.lastName}`,
    customerEmail: formData.email,
    customerPhone: formData.phone,
    inquiryType: formData.inquiryType,
    message: formData.message,
    source: 'Contact Form'
  });
};

// Send quick inquiry to WhatsApp
export const sendQuickInquiryToWhatsApp = (formData: any) => {
  return sendToWhatsApp({
    customerName: formData.name,
    customerEmail: formData.email,
    customerPhone: formData.phone,
    inquiryType: formData.inquiryType,
    message: formData.message,
    source: 'Quick Inquiry Popup'
  });
};

// Send customer requirement to WhatsApp
export const sendCustomerRequirementToWhatsApp = (data: any) => {
  const specifications = typeof data.specifications === 'string' 
    ? data.specifications 
    : JSON.stringify(data.specifications, null, 2);
    
  const customization = typeof data.customization === 'string'
    ? data.customization
    : JSON.stringify(data.customization, null, 2);

  return sendToWhatsApp({
    customerName: `${data.personalDetails.firstName} ${data.personalDetails.lastName}`,
    customerEmail: data.personalDetails.email,
    customerPhone: data.personalDetails.phone,
    inquiryType: `Custom Order - ${data.productType}`,
    message: `Budget: ${data.budget}
Timeline: ${data.timeline}

Specifications:
${specifications}

Customization:
${customization}

Additional Notes:
${data.additionalNotes || 'None'}`,
    source: 'Customer Requirement Form'
  });
};

// Send newsletter subscription to WhatsApp
export const sendNewsletterToWhatsApp = (data: any) => {
  return sendToWhatsApp({
    customerName: data.firstName || 'New Subscriber',
    customerEmail: data.email,
    inquiryType: 'Newsletter Subscription',
    message: `New subscriber joined the newsletter.
Interests: ${data.interests?.join(', ') || 'General'}`,
    source: 'Newsletter Footer'
  });
};

export default {
  sendToWhatsApp,
  sendContactFormToWhatsApp,
  sendQuickInquiryToWhatsApp, 
  sendCustomerRequirementToWhatsApp,
  sendNewsletterToWhatsApp
};