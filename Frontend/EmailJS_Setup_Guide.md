# EmailJS Setup Guide for AfricaConstruct

## Overview
This guide will help you set up EmailJS to enable email notifications when users submit the "Get Started" form.

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## Step 3: Create Email Templates

### Admin Notification Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Template Name: "Admin Notification - New Lead"
4. Use this template:

```
Subject: New Lead from AfricaConstruct Website - {{from_name}}

Hello,

You have received a new inquiry from the AfricaConstruct website:

CONTACT INFORMATION:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Company: {{company}}

PROJECT DETAILS:
- Project Type: {{project_type}}
- Budget Range: {{budget_range}}
- Timeline: {{timeline}}
- Location: {{location}}

MESSAGE:
{{message}}

Newsletter Subscription: {{newsletter}}
Submission Date: {{submission_date}}

Best regards,
AfricaConstruct Website
```

5. Note down your **Admin Template ID**

### Customer Thank You Template
1. Create another template
2. Template Name: "Thank You - AfricaConstruct"
3. Use this template:

```
Subject: Thank you for your interest in AfricaConstruct!

Dear {{to_name}},

Thank you for expressing your interest in AfricaConstruct! We're excited to help you transform your construction projects with our cutting-edge management platform.

We have received your inquiry and our team will review your requirements carefully. We look forward to making your construction dreams come true!

What happens next:
✓ Our team will review your project details
✓ We'll prepare a customized solution for your needs
✓ You'll hear from us within 24-48 hours
✓ We'll schedule a consultation to discuss your project

In the meantime, feel free to explore our website to learn more about our comprehensive construction management solutions designed specifically for the African market.

If you have any immediate questions, don't hesitate to contact us:
📧 Email: qmary85@gmail.com
📞 Phone: +254 781358926
🌍 USSD: *184*6790#

Thank you for choosing AfricaConstruct - Your Future Construction Manager!

Best regards,
The AfricaConstruct Team

---
This email was sent because you submitted a form on our website. If you didn't request this, please ignore this email.
```

4. Note down your **Customer Template ID**

## Step 4: Get Your Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (User ID)
3. Copy this key

## Step 5: Update the JavaScript Code
In your `scripts.js` file, replace the placeholder values:

```javascript
// Replace these values with your actual EmailJS credentials
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your Public Key

// In the sendEmailNotifications function, replace:
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_ADMIN_TEMPLATE_ID', adminEmailParams);
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_CUSTOMER_TEMPLATE_ID', customerEmailParams);

// With your actual IDs:
await emailjs.send('service_xxxxxxx', 'template_xxxxxxx', adminEmailParams);
await emailjs.send('service_xxxxxxx', 'template_xxxxxxx', customerEmailParams);
```

## Step 6: Test the Setup
1. Fill out the form on your website
2. Submit the form
3. Check if you receive the admin notification email
4. Check if the customer receives the thank you email

## Troubleshooting
- Make sure your email service is properly configured
- Check that template IDs are correct
- Verify your public key is correct
- Check browser console for any JavaScript errors
- Ensure your email provider allows EmailJS to send emails

## Security Notes
- The public key is safe to use in client-side code
- Never expose your private key in client-side code
- Consider setting up email filters to organize incoming leads
- Monitor your EmailJS usage to stay within free tier limits

## Free Tier Limits
- 200 emails per month
- Upgrade to paid plan for higher limits if needed

## Support
If you need help with EmailJS setup, visit their documentation at [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
