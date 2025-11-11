import React from 'react';
import { Button } from '@/components/ui/button';
import { X, MessageSquare, ExternalLink } from 'lucide-react';

interface WhatsAppLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  title: string;
}

const WHATSAPP_NUMBERS = [
  { number: '919721457228', label: 'WhatsApp Team 1' },
  { number: '919415537228', label: 'WhatsApp Team 2' }
];

const WhatsAppLinksModal: React.FC<WhatsAppLinksModalProps> = ({ 
  isOpen, 
  onClose, 
  message, 
  title 
}) => {
  if (!isOpen) return null;

  const encodedMessage = encodeURIComponent(message);

  const handleWhatsAppClick = (number: string) => {
    const url = `https://wa.me/${number}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  const handleSendToAll = () => {
    // Send to all numbers with small delay
    WHATSAPP_NUMBERS.forEach((contact, index) => {
      setTimeout(() => {
        const url = `https://wa.me/${contact.number}?text=${encodedMessage}`;
        window.open(url, '_blank');
      }, index * 500);
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <MessageSquare className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Send your inquiry to our WhatsApp support team:
          </p>

          {/* Send to All Button */}
          <Button 
            onClick={handleSendToAll}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Send to Both WhatsApp Numbers
          </Button>

          <div className="text-center text-sm text-gray-500 my-2">
            or choose individually:
          </div>

          {/* Individual WhatsApp Links */}
          <div className="space-y-2">
            {WHATSAPP_NUMBERS.map((contact, index) => (
              <Button
                key={contact.number}
                onClick={() => handleWhatsAppClick(contact.number)}
                variant="outline"
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2 text-green-600" />
                  <span>{contact.label}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <span>+{contact.number}</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </div>
              </Button>
            ))}
          </div>

          {/* Message Preview */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Message Preview:</p>
            <div className="text-sm text-gray-800 max-h-32 overflow-y-auto">
              {message.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppLinksModal;