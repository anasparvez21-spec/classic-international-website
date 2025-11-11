import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_5ikmd7h',     // Your EmailJS service ID
  templateId: 'template_8r7dtue',   // Primary template (Contact forms)
  publicKey: '3kbNyMMrsEjxS_enC',   // Your EmailJS public key
};

// Different templates for different form types
const EMAIL_TEMPLATES = {
  contact: 'template_8r7dtue',           // Contact form template
  customerReq: 'template_ri1pyrs',       // Customer requirement template
  quickInquiry: 'template_8r7dtue',      // Quick inquiry uses contact template
  newsletter: 'template_ri1pyrs',        // Newsletter uses customer req template
};

// Initialize EmailJS (call this in your main App component)
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  inquiryType: string;
  message: string;
  preferredContact: string;
}

interface CustomerRequirementData {
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
    address: string;
  };
  productType: string;
  specifications: any;
  customization: any;
  budget: string;
  timeline: string;
  additionalNotes?: string;
}

interface QuickInquiryData {
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
  productId?: string;
  productName?: string;
}

interface NewsletterData {
  email: string;
  firstName?: string;
  interests?: string[];
}

// Send Contact Form Email
export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: 'classicinternationalknp@gmail.com',  // Your business email
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      phone: formData.phone,
      company: formData.company || 'Not specified',
      inquiry_type: formData.inquiryType,
      message: formData.message,
      preferred_contact: formData.preferredContact,
      reply_to: formData.email,
      subject: `New Contact Form Inquiry - ${formData.inquiryType}`,
    };

    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAIL_TEMPLATES.contact,
      templateParams
    );

    console.log('Contact email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return false;
  }
};

// Send Customer Requirement Email
export const sendCustomerRequirementEmail = async (data: CustomerRequirementData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: 'classicinternationalknp@gmail.com',
      from_name: `${data.personalDetails.firstName} ${data.personalDetails.lastName}`,
      from_email: data.personalDetails.email,
      phone: data.personalDetails.phone,
      company: data.personalDetails.company || 'Not specified',
      address: data.personalDetails.address,
      product_type: data.productType,
      specifications: JSON.stringify(data.specifications, null, 2),
      customization: JSON.stringify(data.customization, null, 2),
      budget: data.budget,
      timeline: data.timeline,
      additional_notes: data.additionalNotes || 'None',
      reply_to: data.personalDetails.email,
      subject: `New Custom Product Requirement - ${data.productType}`,
    };

    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAIL_TEMPLATES.customerReq,
      templateParams
    );

    console.log('Customer requirement email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Failed to send customer requirement email:', error);
    return false;
  }
};

// Send Quick Inquiry Email
export const sendQuickInquiryEmail = async (data: QuickInquiryData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: 'classicinternationalknp@gmail.com',
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || 'Not provided',
      company: 'Not specified',
      inquiry_type: `Quick Inquiry - ${data.inquiryType}`,
      message: `${data.message}\n\nThis inquiry came from the website popup form.`,
      preferred_contact: 'Email',
      reply_to: data.email,
      subject: `Quick Inquiry - ${data.inquiryType}`,
    };

    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAIL_TEMPLATES.quickInquiry,
      templateParams
    );

    console.log('Quick inquiry email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Failed to send quick inquiry email:', error);
    return false;
  }
};

// Send Newsletter Subscription Email
export const sendNewsletterEmail = async (data: NewsletterData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: 'classicinternationalknp@gmail.com',
      customer_name: data.firstName || 'New Subscriber',
      customer_email: data.email,
      customer_phone: 'Not provided',
      customer_company: 'Not provided',
      customer_address: 'Not provided',
      product_type: 'Newsletter Subscription',
      budget: 'N/A',
      timeline: 'Immediate',
      specifications: 'Newsletter subscription request',
      customization: data.interests?.join(', ') || 'General interest',
      additional_notes: `Newsletter subscription from website. Subscriber email: ${data.email}`,
      reply_to: data.email,
      subject: 'New Newsletter Subscription',
    };

    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAIL_TEMPLATES.newsletter,
      templateParams
    );

    console.log('Newsletter subscription email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Failed to send newsletter email:', error);
    return false;
  }
};

// Send Auto-reply Email to Customer
export const sendAutoReplyEmail = async (customerEmail: string, customerName: string, inquiryType: string): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: customerEmail,
      customer_name: customerName,
      inquiry_type: inquiryType,
      company_name: 'Classic International',
      company_email: 'classicinternationalknp@gmail.com',
      company_phone: '+919721457228',
      company_whatsapp: '+919721457228',
      subject: 'Thank you for contacting Classic International',
    };

    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'auto_reply_template', // Separate template for auto-replies
      templateParams
    );

    console.log('Auto-reply email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Failed to send auto-reply email:', error);
    return false;
  }
};