export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: ProductCategory;
  subcategory?: string;
  price: number;
  originalPrice?: number; // For sale items
  currency: string;
  images: string[];
  featuredImage: string;
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  specifications: ProductSpecification[];
  variants?: ProductVariant[];
  dimensions?: {
    length: number;
    width: number;
    height: number;
    weight: number;
    unit: 'cm' | 'in' | 'mm';
    weightUnit: 'kg' | 'lbs' | 'g';
  };
  materials: string[];
  careInstructions?: string[];
  customizable: boolean;
  customizationOptions?: CustomizationOption[];
  featured: boolean;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductCategory = 
  | 'wallets'
  | 'shoes' 
  | 'bags'
  | 'coats'
  | 'belts'
  | 'leather-hides'
  | 'luxury-carpets'
  | 'janamaz'
  | 'accessories'
  | 'customization';

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  inStock: boolean;
  stockQuantity: number;
  attributes: VariantAttribute[];
}

export interface VariantAttribute {
  name: string;
  value: string;
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: 'text' | 'select' | 'color' | 'size';
  required: boolean;
  options?: string[];
  additionalPrice?: number;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
  customizations?: Record<string, string>;
  addedAt: Date;
}

export interface CartSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerEmail: string;
  items: CartItem[];
  summary: CartSummary;
  shippingAddress: Address;
  billingAddress: Address;
  shippingOption: ShippingOption;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
  orders: string[]; // Order IDs
  createdAt: Date;
  updatedAt: Date;
}