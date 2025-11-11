import React from "react";

const customizationProducts = [
  {
    name: "Custom Leather Jacket",
    description: "Design your own premium leather jacket.",
    image: "/public/custom-jacket.jpg",
    price: "$299"
  },
  {
    name: "Personalized Wallet",
    description: "Add your initials or logo to a wallet.",
    image: "/public/custom-wallet.jpg",
    price: "$59"
  },
  // Add more customization products as needed
];

const Customization: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Customization Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {customizationProducts.map((product, idx) => (
          <div key={idx} className="border rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition-shadow">
            <img src={product.image} alt={product.name} className="h-40 w-auto object-contain mb-4" />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2 text-center">{product.description}</p>
            <span className="font-bold text-primary mb-2">{product.price}</span>
            <button className="mt-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">Customize</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customization;
