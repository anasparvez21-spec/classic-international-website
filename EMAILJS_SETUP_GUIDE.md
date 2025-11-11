# EmailJS Setup Guide for Classic International

## 🚀 **EmailJS Integration Complete!**

Your website now has **real email integration** using EmailJS. All forms will send actual emails to your business email (`classicinternationalknp@gmail.com`) and auto-reply confirmations to customers.

---

## ⚡ **Quick Setup Required (5 minutes)**

### **Step 1: Create EmailJS Account**
1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Sign up for a **FREE** account
3. EmailJS offers **200 emails/month for FREE** (perfect for getting started)

### **Step 2: Get Your Service ID**
1. In EmailJS dashboard, go to **Email Services**
2. Click **"Add New Service"**
3. Choose **Gmail** (recommended) or **Outlook**
4. Follow the connection wizard
5. Copy your **Service ID** (something like `service_abc123`)

### **Step 3: Create Email Templates**
You need to create 4 templates in EmailJS dashboard:

#### **Template 1: Contact Form** (`contact_template`)
```html
Subject: New Contact Inquiry - {{inquiry_type}}

From: {{from_name}} ({{from_email}})
Phone: {{phone}}
Company: {{company}}
Preferred Contact: {{preferred_contact}}

Message:
{{message}}

---
Reply directly to: {{reply_to}}
```

#### **Template 2: Customer Requirements** (`customer_req_template`)
```html
Subject: New Custom Product Requirement - {{product_type}}

Customer: {{from_name}} ({{from_email}})
Phone: {{phone}}
Company: {{company}}
Address: {{address}}

Product Type: {{product_type}}
Budget: {{budget}}
Timeline: {{timeline}}

Specifications:
{{specifications}}

Customization:
{{customization}}

Additional Notes:
{{additional_notes}}

---
Reply to: {{reply_to}}
```

#### **Template 3: Quick Inquiry** (`quick_inquiry_template`)
```html
Subject: Quick Inquiry - {{inquiry_type}}

From: {{from_name}} ({{from_email}})
Phone: {{phone}}
Inquiry Type: {{inquiry_type}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

#### **Template 4: Newsletter Subscription** (`newsletter_template`)
```html
Subject: New Newsletter Subscription

New subscriber: {{subscriber_name}}
Email: {{from_email}}
Interests: {{interests}}

---
This is an automated notification.
```

#### **Template 5: Auto-Reply to Customers** (`auto_reply_template`)
```html
Subject: Thank you for contacting {{company_name}}

Dear {{customer_name}},

Thank you for your {{inquiry_type}} inquiry. We have received your message and will respond within 24 hours.

Our team will review your requirements and get back to you with:
- Product recommendations
- Pricing details  
- Customization options
- Delivery timeline

Contact Information:
📧 Email: {{company_email}}
📱 Phone: {{company_phone}}
💬 WhatsApp: {{company_whatsapp}}

Best regards,
Classic International Team

---
This is an automated confirmation. Please do not reply to this email.
```

### **Step 4: Get Your Public Key**
1. Go to **Account** → **General**
2. Copy your **Public Key** (something like `abc123xyz`)

### **Step 5: Update Configuration**
Edit `/src/utils/emailService.ts` and replace these values:

```typescript
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',        // Replace with your Service ID
  templateId: 'YOUR_TEMPLATE_ID',      // Not used directly
  publicKey: 'YOUR_PUBLIC_KEY',        // Replace with your Public Key
};

const EMAIL_TEMPLATES = {
  contact: 'contact_template',           // Replace with your template IDs
  customerReq: 'customer_req_template',
  quickInquiry: 'quick_inquiry_template',
  newsletter: 'newsletter_template',
};
```

---

## 🔧 **Configuration Example**

After setup, your `emailService.ts` should look like this:

```typescript
const EMAILJS_CONFIG = {
  serviceId: 'service_gmail123',         // Your Gmail service ID
  templateId: 'contact_template',        // Not used directly
  publicKey: 'abc123xyz789',             // Your public key
};

const EMAIL_TEMPLATES = {
  contact: 'template_contact_abc123',           // Your contact template ID
  customerReq: 'template_customer_def456',     // Your customer req template ID
  quickInquiry: 'template_inquiry_ghi789',     // Your quick inquiry template ID
  newsletter: 'template_newsletter_jkl012',    // Your newsletter template ID
};
```

---

## ✅ **Testing Your Email Integration**

### **1. Start Development Server**
```bash
npm run dev
```

### **2. Test Each Form**
1. **Contact Form**: Go to `/contact` and submit a test inquiry
2. **Customer Requirements**: Go to `/customer-requirement` and fill out custom order form
3. **Quick Inquiry**: Wait 10 seconds on homepage for popup, or trigger manually
4. **Newsletter**: Scroll to footer and subscribe with email

### **3. Check Your Email**
- You should receive emails at `classicinternationalknp@gmail.com`
- Customers will receive auto-reply confirmations
- Check spam folder if emails don't appear immediately

### **4. Monitor EmailJS Dashboard**
- Go to EmailJS dashboard → **Logs**
- See real-time email sending status
- Track delivery success/failure

---

## 📊 **Email Flow Overview**

### **What Happens When Customer Submits Form:**
1. **Form Validation** → Data is validated on frontend
2. **EmailJS Sending** → Email sent to your business email
3. **Auto-Reply** → Confirmation email sent to customer
4. **Local Storage** → Data saved for dashboard backup
5. **Success Message** → Customer sees confirmation

### **Email Recipients:**
- **Business Notifications**: Get email alerts for every inquiry at `classicinternationalknp@gmail.com`
- **Customer Auto-Replies** → Customer's email address
- **Template Variables** → Automatically filled from form data

---

## 🔒 **Security & Best Practices**

### **EmailJS Security:**
- ✅ Public key is safe to expose in frontend
- ✅ Rate limiting prevents spam
- ✅ Domain restrictions can be added
- ✅ Template-based sending prevents abuse

### **Recommended Settings:**
1. **Domain Restrictions**: Add your domain to EmailJS settings
2. **Rate Limiting**: Enable in EmailJS dashboard
3. **Email Filtering**: Set up Gmail filters for organization
4. **Backup Storage**: Keep localStorage as backup (already implemented)

---

## 📈 **Monitoring & Analytics**

### **EmailJS Dashboard Provides:**
- Real-time email sending status
- Monthly usage statistics
- Error logs and debugging info
- Template performance metrics

### **Your Admin Dashboard:**
- Access at `/admin/customers`
- View all customer data
- Export to CSV/JSON
- Track inquiry status

---

## 🚨 **Troubleshooting**

### **Common Issues:**

#### **Emails Not Sending:**
- Check EmailJS service connection
- Verify template IDs match exactly
- Check browser console for errors
- Ensure internet connection

#### **Auto-Replies Not Working:**
- Verify auto-reply template exists
- Check customer email addresses are valid
- Confirm template variables are correct

#### **Spam Folder Issues:**
- Add EmailJS domain to safe senders
- Use professional email templates
- Include company information in emails

### **Debug Steps:**
1. Open browser console (F12)
2. Submit a form and watch for errors
3. Check EmailJS dashboard logs
4. Verify all template IDs are correct

---

## 💰 **Pricing Information**

### **EmailJS Free Tier:**
- ✅ **200 emails/month FREE**
- ✅ All features included
- ✅ Multiple services
- ✅ Unlimited templates

### **Paid Plans** (if you exceed 200 emails):
- **$15/month** - 1,000 emails
- **$30/month** - 5,000 emails
- **$50/month** - 15,000 emails

---

## 🎯 **Next Steps After Setup**

### **Immediate Actions:**
1. Set up EmailJS account and templates
2. Update configuration in `emailService.ts`
3. Test all forms with real email addresses
4. Configure Gmail filters for organization

### **Marketing Enhancements:**
1. Set up automated email sequences
2. Create customer segmentation
3. Add email marketing campaigns
4. Implement lead scoring

### **Business Integration:**
1. Connect with CRM systems
2. Set up sales pipeline automation
3. Create follow-up workflows
4. Add analytics tracking

---

## 📞 **Support**

Your email integration is now **production-ready**! For any issues:

1. **EmailJS Support**: [https://www.emailjs.com/docs](https://www.emailjs.com/docs)
2. **Test Forms**: Use your actual email addresses for testing
3. **Monitor Dashboard**: Check `/admin/customers` for all inquiries

**🎉 Congratulations! Your website now has professional email integration with customer auto-replies and admin notifications!**