import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, BarChart3 } from 'lucide-react';
import { getAllCustomerData, getCustomerStats } from '@/utils/customerDataUtils';

const QuickCustomerStats: React.FC = () => {
  const handleViewDashboard = () => {
    // Open dashboard in new tab or navigate
    window.open('/admin/customers', '_blank');
  };

  const handleQuickStats = () => {
    const data = getAllCustomerData();
    const stats = getCustomerStats(data);
    
    alert(`Customer Overview:
    
📧 Contact Submissions: ${stats.total.contacts}
📋 Newsletter Subscribers: ${stats.total.newsletter} 
🛍️ Custom Requirements: ${stats.total.requirements}
💬 Quick Inquiries: ${stats.total.inquiries}

📊 This Week: ${stats.thisWeek.contacts + stats.thisWeek.newsletter + stats.thisWeek.requirements + stats.thisWeek.inquiries} new
⏳ Pending Responses: ${stats.pending.contacts + stats.pending.requirements}
    `);
  };

  return (
    <div className="flex space-x-2">
      <Button 
        onClick={handleQuickStats}
        variant="outline" 
        size="sm"
        className="bg-blue-50 hover:bg-blue-100"
      >
        <BarChart3 className="w-4 h-4 mr-2" />
        Quick Stats
      </Button>
      
      <Button 
        onClick={handleViewDashboard}
        variant="default" 
        size="sm"
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Users className="w-4 h-4 mr-2" />
        View All Customers
      </Button>
    </div>
  );
};

export default QuickCustomerStats;