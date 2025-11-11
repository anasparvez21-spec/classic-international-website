import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  Search, 
  Filter, 
  Download,
  Eye,
  Trash2,
  Archive,
  ExternalLink
} from 'lucide-react';

interface ContactSubmission {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  inquiryType: string;
  message: string;
  preferredContact: string;
  company?: string;
  country: string;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'responded' | 'closed';
}

interface NewsletterSubscriber {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  interests: string[];
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}

interface CheckoutData {
  id: string;
  customerInfo: {
    email: string;
    name: string;
    phone?: string;
    company?: string;
  };
  shippingAddress: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  orderDate: string;
  total: number;
  status: string;
}

const CustomerDataDashboard: React.FC = () => {
  const { toast } = useToast();
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [checkoutData, setCheckoutData] = useState<CheckoutData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Load data from localStorage
  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
    const orders = JSON.parse(localStorage.getItem('orderData') || '[]');
    
    setContactSubmissions(contacts);
    setNewsletterSubscribers(subscribers);
    setCheckoutData(orders);
  }, []);

  // Filter contact submissions
  const filteredContacts = contactSubmissions.filter(contact => {
    const matchesSearch = searchTerm === '' || 
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Update contact status
  const updateContactStatus = (id: number, newStatus: ContactSubmission['status']) => {
    const updatedContacts = contactSubmissions.map(contact =>
      contact.id === id ? { ...contact, status: newStatus } : contact
    );
    setContactSubmissions(updatedContacts);
    localStorage.setItem('contactSubmissions', JSON.stringify(updatedContacts));
    
    toast({
      title: "Status Updated",
      description: `Contact status updated to ${newStatus}.`,
    });
  };

  // Export data to CSV
  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]).join(',');
    const csvContent = [
      headers,
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Delete contact submission
  const deleteContact = (id: number) => {
    const updatedContacts = contactSubmissions.filter(contact => contact.id !== id);
    setContactSubmissions(updatedContacts);
    localStorage.setItem('contactSubmissions', JSON.stringify(updatedContacts));
    
    toast({
      title: "Contact Deleted",
      description: "Contact submission has been deleted.",
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'reviewed':
        return 'bg-yellow-100 text-yellow-800';
      case 'responded':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Data Dashboard</h1>
          <p className="text-gray-600">Manage customer inquiries, newsletter subscribers, and order data.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Mail className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-600">Contact Submissions</h3>
                  <p className="text-2xl font-bold text-gray-900">{contactSubmissions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-600">Newsletter Subscribers</h3>
                  <p className="text-2xl font-bold text-gray-900">{newsletterSubscribers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-600">New This Month</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {contactSubmissions.filter(c => 
                      new Date(c.submittedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    ).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Phone className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-600">Pending Responses</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {contactSubmissions.filter(c => c.status === 'new' || c.status === 'reviewed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tabs */}
        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter Subscribers</TabsTrigger>
            <TabsTrigger value="orders">Order Data</TabsTrigger>
          </TabsList>

          {/* Contact Submissions Tab */}
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Contact Submissions</span>
                  <Button 
                    onClick={() => exportToCSV(contactSubmissions, 'contact-submissions')}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </CardTitle>
                
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search contacts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="responded">Responded</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>

              <CardContent>
                {filteredContacts.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold mb-2">No contact submissions found</h3>
                    <p>Contact submissions will appear here when customers reach out.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredContacts.map((contact) => (
                      <div key={contact.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                {contact.firstName} {contact.lastName}
                              </h3>
                              <Badge className={getStatusBadgeColor(contact.status)}>
                                {contact.status}
                              </Badge>
                            </div>
                            
                            <div className="text-sm text-gray-600 space-y-1">
                              <p><strong>Email:</strong> {contact.email}</p>
                              {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
                              {contact.company && <p><strong>Company:</strong> {contact.company}</p>}
                              {contact.country && <p><strong>Country:</strong> {contact.country}</p>}
                              <p><strong>Inquiry Type:</strong> {contact.inquiryType}</p>
                              <p><strong>Subject:</strong> {contact.subject}</p>
                              <p><strong>Preferred Contact:</strong> {contact.preferredContact}</p>
                              <p><strong>Date:</strong> {new Date(contact.submittedAt).toLocaleDateString()}</p>
                            </div>
                            
                            <div className="mt-3">
                              <p className="text-sm text-gray-600"><strong>Message:</strong></p>
                              <p className="text-sm text-gray-800 mt-1 bg-gray-50 p-2 rounded">
                                {contact.message}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-2 ml-4">
                            <Select 
                              value={contact.status} 
                              onValueChange={(value: ContactSubmission['status']) => updateContactStatus(contact.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="reviewed">Reviewed</SelectItem>
                                <SelectItem value="responded">Responded</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`mailto:${contact.email}?subject=Re: ${contact.subject}`)}
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Email
                            </Button>
                            
                            {contact.phone && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(`https://wa.me/${contact.phone.replace(/\D/g, '')}`)}
                              >
                                <Phone className="w-4 h-4 mr-1" />
                                WhatsApp
                              </Button>
                            )}
                            
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteContact(contact.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Newsletter Subscribers Tab */}
          <TabsContent value="newsletter">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Newsletter Subscribers</span>
                  <Button 
                    onClick={() => exportToCSV(newsletterSubscribers, 'newsletter-subscribers')}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </CardTitle>
              </CardHeader>

              <CardContent>
                {newsletterSubscribers.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold mb-2">No newsletter subscribers yet</h3>
                    <p>Newsletter subscribers will appear here when users sign up.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {newsletterSubscribers.map((subscriber) => (
                      <div key={subscriber.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {subscriber.firstName || 'Anonymous'} {subscriber.lastName || ''}
                            </h3>
                            <p className="text-sm text-gray-600">{subscriber.email}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Subscribed: {new Date(subscriber.subscribedAt).toLocaleDateString()}
                            </p>
                            {subscriber.interests.length > 0 && (
                              <div className="mt-2">
                                <p className="text-xs text-gray-600 mb-1">Interests:</p>
                                <div className="flex flex-wrap gap-1">
                                  {subscriber.interests.map((interest, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {interest}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge className={subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {subscriber.status}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`mailto:${subscriber.email}`)}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Order Data Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Data</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Archive className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">Order data integration coming soon</h3>
                  <p>This section will display customer order information from your checkout process.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDataDashboard;