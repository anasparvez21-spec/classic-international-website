import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductVariant, CartSummary } from '../types/product';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (product: Product, quantity?: number, selectedVariant?: ProductVariant, customizations?: Record<string, string>) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Computed values
  getTotalItems: () => number;
  getCartSummary: () => CartSummary;
  getItemCount: (productId: string, variantId?: string) => number;
  isProductInCart: (productId: string, variantId?: string) => boolean;
}

const TAX_RATE = 0.08; // 8% tax rate
const FREE_SHIPPING_THRESHOLD = 200;
const STANDARD_SHIPPING = 15;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, selectedVariant, customizations) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => 
              item.productId === product.id && 
              item.selectedVariant?.id === selectedVariant?.id
          );

          if (existingItemIndex >= 0) {
            // Item exists, update quantity
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            return { items: updatedItems };
          } else {
            // New item, add to cart
            const newItem: CartItem = {
              productId: product.id,
              product,
              quantity,
              selectedVariant,
              customizations,
              addedAt: new Date()
            };
            return { items: [...state.items, newItem] };
          }
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.selectedVariant?.id === variantId)
          )
        }));
      },

      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId && item.selectedVariant?.id === variantId
              ? { ...item, quantity }
              : item
          )
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getCartSummary: (): CartSummary => {
        const items = get().items;
        
        const subtotal = items.reduce((total, item) => {
          const price = item.selectedVariant?.price || item.product.price;
          const customizationPrice = item.customizations 
            ? Object.entries(item.customizations).reduce((sum, [key, value]) => {
                const option = item.product.customizationOptions?.find(opt => opt.id === key);
                return sum + (option?.additionalPrice || 0);
              }, 0)
            : 0;
          return total + (price + customizationPrice) * item.quantity;
        }, 0);

        const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
        const tax = subtotal * TAX_RATE;
        const total = subtotal + shipping + tax;

        return {
          subtotal: Math.round(subtotal * 100) / 100,
          tax: Math.round(tax * 100) / 100,
          shipping,
          discount: 0,
          total: Math.round(total * 100) / 100
        };
      },

      getItemCount: (productId, variantId) => {
        const item = get().items.find(
          (item) => item.productId === productId && item.selectedVariant?.id === variantId
        );
        return item?.quantity || 0;
      },

      isProductInCart: (productId, variantId) => {
        return get().items.some(
          (item) => item.productId === productId && item.selectedVariant?.id === variantId
        );
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
);

// Hook for cart summary calculations
export const useCartSummary = () => {
  const getCartSummary = useCartStore((state) => state.getCartSummary);
  return getCartSummary();
};

// Hook for total items count
export const useCartCount = () => {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  return getTotalItems();
};