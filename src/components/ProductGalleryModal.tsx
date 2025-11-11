import React from "react";

interface ProductGalleryModalProps {
  open: boolean;
  onClose: () => void;
  images: string[];
}

const ProductGalleryModal: React.FC<ProductGalleryModalProps> = ({ open, onClose, images }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="text-xl font-cormorant mb-4 text-center">Luxury Leather Carpets - Gallery</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Luxury Leather Carpet ${idx + 1}`}
              className="w-full h-48 object-cover rounded border"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGalleryModal;
