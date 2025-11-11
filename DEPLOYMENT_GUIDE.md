# 🚀 Classic International - GitHub Repository Setup Guide

## Step 1: Create GitHub Repository

### Option A: Using GitHub Website (Recommended)
1. **Go to**: https://github.com
2. **Click**: "New Repository" (green button)
3. **Repository Details**:
   - **Name**: `classic-international-website`
   - **Description**: `Premium leather products website with EmailJS and WhatsApp integration`
   - **Visibility**: Choose Public or Private
   - **Initialize**: ❌ Do NOT initialize (we already have files)
4. **Click**: "Create Repository"

### Option B: Using GitHub CLI (if installed)
```bash
gh repo create classic-international-website --description "Premium leather products website with EmailJS and WhatsApp integration" --public
```

## Step 2: Connect Local Repository to GitHub

After creating the repository, run these commands in your terminal:

```bash
# Navigate to project directory
cd /Users/anasparvez/Downloads/classic_international-main

# Add GitHub remote origin
git remote add origin https://github.com/YOUR_USERNAME/classic-international-website.git

# Rename main branch (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

## Step 3: Set Up Environment Variables

### For Local Development:
```bash
# Copy environment example
cp .env.example .env.local

# Edit with your actual values
nano .env.local
```

### For Production (Vercel/Netlify):
Add these environment variables in your deployment platform:

```env
VITE_EMAILJS_SERVICE_ID=service_5ikmd7h
VITE_EMAILJS_PUBLIC_KEY=3kbNyMMrsEjxS_enC
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_8r7dtue
VITE_EMAILJS_REQUIREMENT_TEMPLATE_ID=template_ri1pyrs
VITE_BUSINESS_EMAIL=classicinternationalknp@gmail.com
VITE_WHATSAPP_NUMBER_1=919721457228
VITE_WHATSAPP_NUMBER_2=919415537228
```

## Step 4: Deploy to Vercel (Recommended)

### Quick Deploy:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/classic-international-website)

### Manual Deploy:
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Vercel Configuration:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node.js Version**: 18.x

## Step 5: Deploy to Netlify (Alternative)

### Option A: Drag & Drop
1. Run `npm run build`
2. Drag `dist` folder to https://app.netlify.com/drop

### Option B: Git Integration
1. Connect your GitHub repository
2. **Build Settings**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: 18

### Option C: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

## Step 6: Update Repository Information

### Update README.md
Replace the project URL in your README.md:
```markdown
🌐 **Live Demo**: [https://your-deployed-site.vercel.app](https://your-deployed-site.vercel.app)
```

### Add Repository Topics
On GitHub, add these topics to your repository:
- `react`
- `typescript`
- `vite`
- `tailwind-css`
- `emailjs`
- `whatsapp`
- `e-commerce`
- `leather`
- `responsive`
- `website`

## Step 7: Set Up Custom Domain (Optional)

### For Vercel:
1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" → "Domains"
4. Add your custom domain
5. Update DNS records as instructed

### For Netlify:
1. Go to your Netlify dashboard
2. Select your site
3. Go to "Domain settings"
4. Add custom domain
5. Update DNS records as instructed

## Step 8: Email Service Setup

### EmailJS Configuration:
1. **Visit**: https://www.emailjs.com/
2. **Create Account** and verify email
3. **Create Email Service** (Gmail, Outlook, etc.)
4. **Create Email Templates**:
   - Contact Form Template
   - Customer Requirements Template
   - Auto-Reply Template
   - Newsletter Template
5. **Update Environment Variables** with your IDs

### Template Variables:
```javascript
// Contact Form Template
{{from_name}}, {{from_email}}, {{message}}, {{phone}}

// Customer Requirements Template  
{{customer_name}}, {{product_type}}, {{specifications}}, {{budget}}

// Auto-Reply Template
{{customer_name}}, {{inquiry_type}}

// Newsletter Template
{{subscriber_email}}, {{interests}}
```

## Step 9: Testing & Validation

### Local Testing:
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test production build
npm run build
npm run preview
```

### Production Testing:
1. ✅ Test all contact forms
2. ✅ Verify email delivery 
3. ✅ Test WhatsApp integration
4. ✅ Check responsive design
5. ✅ Validate all navigation links
6. ✅ Test newsletter signup

## Step 10: Repository Management

### Create Issues Templates:
```bash
# Create .github/ISSUE_TEMPLATE/bug_report.md
# Create .github/ISSUE_TEMPLATE/feature_request.md
```

### Set Up GitHub Actions (Optional):
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test # if you add tests
```

## 🎉 Repository Structure

```
classic-international-website/
├── 📁 .github/              # GitHub templates
├── 📁 public/               # Static assets
├── 📁 src/                  # Source code
├── 📄 .env.example          # Environment variables template
├── 📄 .gitignore           # Git ignore rules
├── 📄 PROJECT_README.md     # Comprehensive project documentation
├── 📄 DEPLOYMENT_GUIDE.md   # This file
├── 📄 package.json         # Dependencies and scripts
└── 📄 README.md            # Quick start guide
```

## 🔗 Useful Links

- **GitHub Repository**: `https://github.com/YOUR_USERNAME/classic-international-website`
- **Live Website**: `https://your-site.vercel.app`
- **EmailJS Dashboard**: `https://dashboard.emailjs.com`
- **Vercel Dashboard**: `https://vercel.com/dashboard`
- **Netlify Dashboard**: `https://app.netlify.com`

## 📞 Support

If you need help with setup:
1. Check the comprehensive README.md
2. Review EmailJS setup guide
3. Check deployment platform documentation
4. Contact Classic International support

---

**🎯 Next Steps:**
1. Push code to GitHub ✅
2. Deploy to production ⏳
3. Configure custom domain ⏳
4. Test all functionality ⏳
5. Launch website! 🚀