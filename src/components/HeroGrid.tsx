import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  onClick?: () => void;
}

const CategoryCard = ({ title, subtitle, imageUrl, onClick }: CategoryCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative overflow-hidden aspect-[3/4] block focus:outline-none"
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {(title === "Luxury Leather Carpets" || title === "Premium Leather Bags" || title === "Leather Hides") && (
        <video
          src={
            title === "Luxury Leather Carpets"
              ? "/luxury-leather-carpets/carpet-thumb.mp4"
              : title === "Premium Leather Bags"
                ? "/premium-leather-bags/bags-thumb.mp4"
                : "/leather-hides/hides-thumb.mp4"
          }
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className={`absolute inset-x-0 bottom-0 p-8 text-white ${title === 'Leather Hides' ? 'mb-8' : ''}`}> 
        <h3
          className={`text-2xl font-bold mb-1 ${title === 'Luxury Leather Carpets' ? 'text-white drop-shadow-lg' : ''}`}
          style={title === 'Luxury Leather Carpets' ? { textShadow: '0 2px 8px #000, 0 0 2px #000' } : {}}
        >
          {title}
        </h3>
        <p className="text-sm opacity-90">{subtitle}</p>
      </div>
    </button>
  );
};

const HeroGrid = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem, openCart } = useCartStore();
  const featuredProducts = getFeaturedProducts();

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    message: ''
  });

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
    openCart();
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create message for WhatsApp and Email
    const inquiryMessage = `New Inquiry from Classic International Website:
    
Name & Company: ${formData.name}
Email: ${formData.email}
Contact Number: ${formData.contactNo}
Message: ${formData.message}`;

    // WhatsApp URLs for both numbers
    const whatsappMessage = encodeURIComponent(inquiryMessage);
    const whatsappUrl1 = `https://wa.me/919721457228?text=${whatsappMessage}`;
    const whatsappUrl2 = `https://wa.me/919415537228?text=${whatsappMessage}`;
    
    // Email URL
    const emailSubject = encodeURIComponent("New Inquiry from Classic International Website");
    const emailBody = encodeURIComponent(inquiryMessage);
    const emailUrl = `mailto:classicinternationalknp@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    // Open WhatsApp for first number
    window.open(whatsappUrl1, '_blank');
    
    // Small delay then open WhatsApp for second number
    setTimeout(() => {
      window.open(whatsappUrl2, '_blank');
    }, 1000);
    
    // Small delay then open email
    setTimeout(() => {
      window.open(emailUrl, '_blank');
    }, 2000);

    // Show success message
    toast({
      title: "Inquiry Sent!",
      description: "Your inquiry has been sent via WhatsApp and Email. We'll get back to you soon!",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      contactNo: '',
      message: ''
    });
  };

  const categories = [
    {
      title: "Luxury Leather Carpets",
      subtitle: "Premium authentic fur to add grace in your space",
      imageUrl: "/hero-1.jpg"
    },
    {
      title: "Premium Leather Bags",
      subtitle: "White label bags for men and women",
      imageUrl: "/hero-2.jpg"
    },
    {
      title: "Leather Hides",
      subtitle: "All kind of leather for all your needs",
      imageUrl: "/hero-3.jpg"
    }
  ];
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            subtitle={category.subtitle}
            imageUrl={category.imageUrl}
            onClick={
              category.title === "Luxury Leather Carpets"
                ? () => navigate("/luxury-leather-carpets")
                : category.title === "Premium Leather Bags"
                ? () => navigate("/premium-leather-bags")
                : category.title === "Leather Hides"
                ? () => navigate("/leather-hides")
                : undefined
            }
          />
        ))}
      </div>

      <section className="max-w-2xl mx-auto mt-12 px-4 text-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 font-cormorant">A Legacy in Leather: Quality, Integrity, and Craftsmanship</h2>
        <p className="mb-2 text-sm md:text-base font-lato text-gray-500">We are a premier, one-stop source for bulk leather orders, catering to a diverse range of needs. Our extensive portfolio includes:</p>
        <ul className="mb-2 text-sm md:text-base font-lato text-gray-500 text-left inline-block">
          <li><b>Premium Leather Hides:</b> The finest raw materials for your creations.</li>
          <li><b>Fashion & Accessories:</b> Expertly crafted belts, shoes, bags, and wallets.</li>
          <li><b>Industrial & Safety Footwear:</b> Durable and reliable safety shoes built to last.</li>
          <li><b>Interior Furnishings:</b> Luxurious upholstery and unique hairon leather carpets.</li>
        </ul>
        <p className="text-sm md:text-base font-lato text-gray-500">Partner with us and experience the difference that a true legacy in leather can make.</p>
      </section>

      {/* Shop by Collection Section */}
      <section className="w-full flex flex-col items-center my-16">
        <h2 className="text-3xl font-cormorant font-medium mb-10 text-gray-800">Shop by Collection</h2>
        <div className="w-full flex flex-wrap justify-center items-center gap-12">
          {/* Wallets */}
          <button onClick={() => navigate("/wallets")}
            className="flex flex-col items-center group focus:outline-none">
            <div className="rounded-full overflow-hidden w-56 h-56 mb-4 border border-gray-200 group-hover:shadow-lg transition">
              <img src="/collection-wallets.jpg" alt="Wallets" className="object-cover w-full h-full" />
            </div>
            <span className="font-cormorant text-2xl text-gray-800 group-hover:text-black transition">Wallets</span>
          </button>
          {/* Shoes */}
          <button onClick={() => navigate("/shoes")}
            className="flex flex-col items-center group focus:outline-none">
            <div className="rounded-full overflow-hidden w-56 h-56 mb-4 border border-gray-200 group-hover:shadow-lg transition">
              <img src="/collection-shoes.jpg" alt="Shoes" className="object-cover w-full h-full scale-110" />
            </div>
            <span className="font-cormorant text-2xl text-gray-800 transition">Shoes</span>
          </button>
          {/* Janamaz */}
          <button onClick={() => navigate("/janamaz")}
            className="flex flex-col items-center group focus:outline-none">
            <div className="rounded-full overflow-hidden w-56 h-56 mb-4 border border-gray-200 group-hover:shadow-lg transition">
              <img src="/collection-bags.jpg" alt="Bags" className="object-cover w-full h-full" />
            </div>
            <span className="font-cormorant text-2xl text-gray-800 group-hover:text-black transition">Janamaz</span>
          </button>
          {/* Accessories */}
          <button onClick={() => navigate("/accessories")}
            className="flex flex-col items-center group focus:outline-none">
            <div className="rounded-full overflow-hidden w-56 h-56 mb-4 border border-gray-200 group-hover:shadow-lg transition">
              <img src="/collection-accessories.jpg" alt="Accessories" className="object-cover w-full h-full" />
            </div>
            <span className="font-cormorant text-2xl text-gray-800 group-hover:text-black transition">Belts</span>
          </button>
          {/* Coats */}
          <button onClick={() => navigate("/coats")}
            className="flex flex-col items-center group focus:outline-none">
            <div className="rounded-full overflow-hidden w-56 h-56 mb-4 border border-gray-200 group-hover:shadow-lg transition">
              <img src="/collection-coats.jpg" alt="Coats" className="object-cover w-full h-full" />
            </div>
            <span className="font-cormorant text-2xl text-gray-800 transition">Coats</span>
          </button>
        </div>
      </section>

      {/* Trusted Clients Bar */}
      <div className="w-full bg-gray-100 py-3 flex justify-center items-center mb-8">
        <span className="font-lato text-gray-700 text-base md:text-lg font-semibold tracking-wide">Trusted by our clients worldwide</span>
      </div>

      {/* Brands Section */}
      <div className="w-full flex flex-wrap justify-center items-center gap-8 mb-10">
        {/* Hidesign */}
        <div className="flex flex-col items-center">
          <span className="font-cormorant text-2xl text-gray-800 transition">Puff</span>
          <span className="font-lato text-gray-600 text-sm">Hidesign</span>
        </div>
        {/* Tata */}
        <div className="flex flex-col items-center">
          <img src="/tata.png" alt="Tata Logo" className="h-8 w-auto mb-2" />
          <span className="font-lato text-gray-600 text-sm">Tata</span>
        </div>
        {/* Harber London */}
        <div className="flex flex-col items-center">
          <img src="/harberlondon.png" alt="Harber London Logo" className="h-8 w-auto mb-2" />
          <span className="font-lato text-gray-600 text-sm">Harber London</span>
        </div>
        {/* Red Tape */}
        <div className="flex flex-col items-center">
          <img src="/redtape.png" alt="Red Tape Logo" className="h-8 w-auto mb-2" />
          <span className="font-lato text-gray-600 text-sm">Red Tape</span>
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="max-w-6xl mx-auto mt-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="relative overflow-hidden aspect-square"
                >
                  <img
                    src={product.featuredImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <Badge variant="default" className="text-xs">Featured</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.shortDescription}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full"
                  size="sm"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-2xl mx-auto mt-16 px-4 text-center" id="contact">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 font-cormorant">Contact Us</h2>
        <div className="mb-6 text-sm md:text-base font-lato text-gray-500">
          <p className="font-bold">Classic International</p>
          <p>Jajmau, Kanpur (U.P), India</p>
          <p>Mobile: <a href="https://wa.me/919721457228" className="underline hover:text-gray-700" target="_blank" rel="noopener noreferrer">+919721457228</a> | <a href="https://wa.me/919415537228" className="underline hover:text-gray-700" target="_blank" rel="noopener noreferrer">+919415537228</a></p>
          <p>Email: <a href="mailto:classicinternationalknp@gmail.com" className="underline hover:text-gray-700">classicinternationalknp@gmail.com</a></p>
        </div>
        <form className="space-y-4 text-left mx-auto max-w-md" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name" className="block mb-1 font-medium font-lato text-gray-700">Name & Company Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleInputChange}
              required 
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 font-lato text-sm" 
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium font-lato text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleInputChange}
              required 
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 font-lato text-sm" 
            />
          </div>
          <div>
            <label htmlFor="contactNo" className="block mb-1 font-medium font-lato text-gray-700">Contact No.</label>
            <input 
              type="tel" 
              id="contactNo" 
              name="contactNo" 
              value={formData.contactNo}
              onChange={handleInputChange}
              required 
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 font-lato text-sm" 
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1 font-medium font-lato text-gray-700">Message</label>
            <textarea 
              id="message" 
              name="message" 
              rows={4} 
              value={formData.message}
              onChange={handleInputChange}
              required 
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 font-lato text-sm" 
            />
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded font-lato text-sm hover:bg-gray-800 transition">Send Inquiry</button>
        </form>
      </section>
    </>
  );
};

export default HeroGrid;