# Classic International - Premium Leather Products Website

A modern, responsive e-commerce website for Classic International, featuring premium leather products with comprehensive customer contact system and WhatsApp integration.

![Classic International](https://via.placeholder.com/800x400/2c3e50/ffffff?text=Classic+International+Premium+Leather+Products)

## 🌟 Features

### 🛍️ Product Showcase
- **Product Categories**: Wallets, Shoes, Bags, Coats, Belts, Prayer Mats, Carpets
- **Custom Orders**: Complete customer requirement form for bespoke products
- **Product Details**: Individual product pages with detailed specifications
- **Responsive Design**: Optimized for all devices and screen sizes

### 📧 Advanced Contact System
- **EmailJS Integration**: Real email sending with professional templates
- **Auto-Reply System**: Automatic confirmation emails to customers
- **Multiple Contact Forms**: Quick inquiry popup, contact page, customer requirements
- **Newsletter Subscription**: Email collection with interest-based segmentation

### 📱 WhatsApp Integration
- **Dual Number Support**: Sends inquiries to both WhatsApp numbers
- **Smart Modal System**: User-controlled WhatsApp sending to avoid browser blocking
- **Formatted Messages**: Professional inquiry formatting with customer details
- **Real-time Notifications**: Instant WhatsApp alerts for new inquiries

### 💼 Customer Management
- **Data Dashboard**: Comprehensive customer inquiry management
- **Local Storage**: Backup system for all customer data
- **CSV Export**: Download customer data for external processing
- **Status Tracking**: Track inquiry status and follow-up requirements

### 🎨 User Experience
- **Hover Navigation**: Discover dropdown opens on hover
- **Professional Design**: Clean, modern interface with Classic International branding
- **Fast Loading**: Optimized performance with Vite build system
- **Accessibility**: WCAG compliant design and keyboard navigation

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Email Service**: EmailJS for real email sending
- **WhatsApp Integration**: wa.me links with modal system
- **Icons**: Lucide React icons
- **Routing**: React Router DOM
- **State Management**: React hooks and context

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/classic-international-website.git
cd classic-international-website
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:
```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_5ikmd7h
VITE_EMAILJS_PUBLIC_KEY=3kbNyMMrsEjxS_enC
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_8r7dtue
VITE_EMAILJS_REQUIREMENT_TEMPLATE_ID=template_ri1pyrs
VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID=template_newsletter
VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID=template_autoreply

# Business Configuration
VITE_BUSINESS_EMAIL=classicinternationalknp@gmail.com
VITE_WHATSAPP_NUMBER_1=919721457228
VITE_WHATSAPP_NUMBER_2=919415537228
```

### 4. EmailJS Setup
1. Create account at [EmailJS.com](https://www.emailjs.com/)
2. Set up email templates for:
   - Contact forms
   - Customer requirements  
   - Newsletter subscriptions
   - Auto-reply confirmations
3. Update template IDs in environment variables

### 5. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173` to see the website.

## 🏗️ Build & Deploy

### Production Build
```bash
npm run build
# or  
yarn build
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 📁 Project Structure

```
classic-international-website/
├── public/                    # Static assets
│   ├── images/               # Product images
│   └── icons/                # Favicons and app icons
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # shadcn/ui base components
│   │   ├── Navigation.tsx    # Main navigation with hover dropdown
│   │   ├── Footer.tsx        # Footer with newsletter signup
│   │   ├── QuickInquiryPopup.tsx
│   │   ├── WhatsAppLinksModal.tsx
│   │   └── ...
│   ├── pages/               # Route components
│   │   ├── Index.tsx        # Homepage
│   │   ├── ContactUs.tsx    # Contact form page
│   │   ├── CustomerRequirement.tsx
│   │   └── ...
│   ├── utils/               # Utility functions
│   │   ├── emailService.ts  # EmailJS integration
│   │   ├── whatsappService.ts # WhatsApp functionality
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Shared utilities
│   └── types/               # TypeScript type definitions
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

## 🔧 Configuration

### EmailJS Templates

The system uses 4 EmailJS templates:

1. **Contact Form Template** (`template_8r7dtue`)
   - Variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
   - Sends customer inquiries to business email

2. **Customer Requirements** (`template_ri1pyrs`)
   - Variables: `{{customer_name}}`, `{{product_type}}`, `{{specifications}}`
   - Detailed custom order submissions

3. **Newsletter Template** 
   - Variables: `{{subscriber_email}}`, `{{interests}}`
   - New newsletter subscriptions

4. **Auto-Reply Template**
   - Variables: `{{customer_name}}`, `{{inquiry_type}}`
   - Confirmation emails to customers

### WhatsApp Integration

- **Numbers**: +919721457228, +919415537228
- **Format**: Professional inquiry messages with customer details
- **Delivery**: Modal-based user-controlled sending
- **Fallback**: Direct links if modal fails

## 📱 Contact Channels

### Customer Inquiries Flow:
1. **Customer submits form** → EmailJS sends email to business
2. **WhatsApp modal appears** → User can send to both WhatsApp numbers  
3. **Auto-reply sent** → Customer receives confirmation
4. **Data saved locally** → Backup in localStorage for dashboard

## 🎯 Key Components

### Navigation (Navigation.tsx)
- Responsive navigation with logo and cart
- Hover-activated DISCOVER dropdown
- Product category links
- Mobile-friendly design

### Contact System (QuickInquiryPopup.tsx)
- Timed popup (10 seconds after page load)
- Product-specific inquiry forms
- Dual-channel sending (Email + WhatsApp)
- Form validation and error handling

### Customer Dashboard (CustomerDataDashboard.tsx)
- View all customer inquiries
- Export data to CSV
- Manage contact submissions
- Track newsletter subscribers

### WhatsApp Integration (WhatsAppLinksModal.tsx)
- Professional message formatting
- Dual number support
- User-controlled sending
- Browser popup blocking prevention

## 🛠️ Development

### Adding New Product Categories
1. Update `navLinks` array in `Navigation.tsx`
2. Create new page component in `src/pages/`
3. Add route in `App.tsx`
4. Update EmailJS templates if needed

### Customizing Email Templates
1. Edit templates in EmailJS dashboard
2. Update variable names in `emailService.ts`
3. Test email delivery
4. Update auto-reply messages

### WhatsApp Number Management
1. Update `WHATSAPP_CONFIG` in `whatsappService.ts`
2. Modify message formatting as needed
3. Test modal functionality
4. Update environment variables

## 🔒 Security & Privacy

- **Email Security**: EmailJS handles secure email delivery
- **Data Privacy**: Customer data stored locally only
- **Form Validation**: Client-side validation with server-side verification
- **HTTPS Required**: SSL certificate required for production

## 📊 Analytics & Tracking

- **Customer Inquiries**: Track via localStorage dashboard
- **Email Delivery**: Monitor via EmailJS dashboard
- **WhatsApp Engagement**: Manual tracking through business numbers
- **Newsletter Growth**: Subscriber count and interest tracking

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

**Classic International**
- **Email**: classicinternationalknp@gmail.com
- **WhatsApp**: +919721457228, +919415537228
- **Website**: [Your Domain]

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful UI components
- **EmailJS** for reliable email service
- **Tailwind CSS** for responsive styling
- **Vite** for fast development experience
- **React** for robust frontend framework

---

**Built with ❤️ for Classic International - Est. 1998**

*Premium leather products with modern digital experience*