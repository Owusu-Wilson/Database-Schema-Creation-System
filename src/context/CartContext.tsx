import { createContext, useContext, useState, ReactNode } from 'react';
import { Book } from '../types';

interface CartContextType {
  items: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Book[]>([]);

  const addToCart = (book: Book) => {
    setItems((prevItems) => [...prevItems, book]);
  };

  const removeFromCart = (bookId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== bookId));
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.isFree ? 0 : item.price), 0);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 