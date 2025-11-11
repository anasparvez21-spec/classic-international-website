// Utility functions for managing customer data

export interface CustomerData {
  contacts: any[];
  newsletter: any[];
  requirements: any[];
  inquiries: any[];
}

// Get all customer data from localStorage
export const getAllCustomerData = (): CustomerData => {
  return {
    contacts: JSON.parse(localStorage.getItem('contactSubmissions') || '[]'),
    newsletter: JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]'),
    requirements: JSON.parse(localStorage.getItem('customerRequirements') || '[]'),
    inquiries: JSON.parse(localStorage.getItem('quickInquiries') || '[]')
  };
};

// Export data to JSON file
export const exportDataToJSON = (data: any, filename: string) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Export data to CSV file
export const exportDataToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;
  
  // Get all unique keys from all objects
  const keys = Array.from(new Set(data.flatMap(Object.keys)));
  
  // Create CSV content
  const csvContent = [
    keys.join(','), // Header row
    ...data.map(row => 
      keys.map(key => {
        const value = row[key];
        // Handle arrays and objects
        if (Array.isArray(value)) {
          return `"${value.join('; ')}"`;
        }
        if (typeof value === 'object' && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        // Escape commas and quotes in strings
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Send data to email (opens default email client)
export const emailCustomerData = (data: CustomerData) => {
  const subject = 'Customer Data Export - Classic International';
  const body = `
Customer Data Summary (${new Date().toLocaleDateString()}):

Contact Submissions: ${data.contacts.length}
Newsletter Subscribers: ${data.newsletter.length}
Custom Requirements: ${data.requirements.length}
Quick Inquiries: ${data.inquiries.length}

Recent Contacts:
${data.contacts.slice(0, 5).map(c => 
  `- ${c.firstName} ${c.lastName} (${c.email}) - ${c.subject}`
).join('\n')}

Please find the detailed data in the attached files.
  `.trim();
  
  const mailtoLink = `mailto:classicinternationalknp@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoLink);
};

// Get customer statistics
export const getCustomerStats = (data: CustomerData) => {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return {
    total: {
      contacts: data.contacts.length,
      newsletter: data.newsletter.length,
      requirements: data.requirements.length,
      inquiries: data.inquiries.length
    },
    thisMonth: {
      contacts: data.contacts.filter(c => new Date(c.submittedAt) > lastMonth).length,
      newsletter: data.newsletter.filter(n => new Date(n.subscribedAt) > lastMonth).length,
      requirements: data.requirements.filter(r => new Date(r.submittedAt) > lastMonth).length,
      inquiries: data.inquiries.filter(i => new Date(i.submittedAt) > lastMonth).length
    },
    thisWeek: {
      contacts: data.contacts.filter(c => new Date(c.submittedAt) > lastWeek).length,
      newsletter: data.newsletter.filter(n => new Date(n.subscribedAt) > lastWeek).length,
      requirements: data.requirements.filter(r => new Date(r.submittedAt) > lastWeek).length,
      inquiries: data.inquiries.filter(i => new Date(i.submittedAt) > lastWeek).length
    },
    pending: {
      contacts: data.contacts.filter(c => c.status === 'new' || c.status === 'reviewed').length,
      requirements: data.requirements.filter(r => r.status === 'pending').length
    }
  };
};

// Clean/anonymize customer data for privacy
export const anonymizeCustomerData = (data: CustomerData): CustomerData => {
  const anonymize = (obj: any) => ({
    ...obj,
    firstName: 'Anonymous',
    lastName: '',
    name: 'Anonymous Customer',
    email: 'customer@example.com',
    phone: '***-***-****',
    // Keep non-personal data
    submittedAt: obj.submittedAt,
    status: obj.status,
    inquiryType: obj.inquiryType,
    productType: obj.productType,
    message: '[Message content anonymized]',
    description: '[Description content anonymized]'
  });

  return {
    contacts: data.contacts.map(anonymize),
    newsletter: data.newsletter.map(anonymize),
    requirements: data.requirements.map(anonymize),
    inquiries: data.inquiries.map(anonymize)
  };
};