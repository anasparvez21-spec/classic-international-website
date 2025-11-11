import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import HeroGrid from "@/components/HeroGrid";
import Footer from "@/components/Footer";
import QuickInquiryPopup from "@/components/QuickInquiryPopup";
import WhatsAppLinksModal from "@/components/WhatsAppLinksModal";
import { setWhatsAppModalCallback } from "@/utils/whatsappService";

const Index = () => {
  const [showInquiryPopup, setShowInquiryPopup] = useState(false);
  const [whatsAppModal, setWhatsAppModal] = useState({
    isOpen: false,
    message: '',
    title: ''
  });

  useEffect(() => {
    // Register WhatsApp modal callback
    setWhatsAppModalCallback((message: string, title: string) => {
      setWhatsAppModal({
        isOpen: true,
        message,
        title
      });
    });

    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      setShowInquiryPopup(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const closeWhatsAppModal = () => {
    setWhatsAppModal({
      isOpen: false,
      message: '',
      title: ''
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <AnnouncementBar />
      <HeroGrid />
      <Footer />
      
      <QuickInquiryPopup 
        isOpen={showInquiryPopup} 
        onClose={() => setShowInquiryPopup(false)} 
      />
      
      <WhatsAppLinksModal
        isOpen={whatsAppModal.isOpen}
        onClose={closeWhatsAppModal}
        message={whatsAppModal.message}
        title={whatsAppModal.title}
      />
    </div>
  );
};

export default Index;
