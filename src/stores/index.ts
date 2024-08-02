import { create } from 'zustand';

interface QuantityState {
  quantities: { [key: string]: { quantity: number; price: number } };
  setQuantity: (productId: string, quantity: number, price: number) => void;
}

export const useQuantityStore = create<QuantityState>((set) => ({
  quantities: {},
  setQuantity: (productId: string, quantity: number, price: number) =>
    set((state) => ({
      quantities: {
        ...state.quantities,
        [productId]: { quantity, price },
      },
    })),
}));
