import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  removeProduct: (id: number) => void;
  updateProduct: (id: number, product: Partial<Omit<Product, 'id'>>) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Product[] = [
  { 
    id: 1, 
    name: 'Éclat Solitaire', 
    price: 'Rs 12,400', 
    category: 'Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 2, 
    name: 'Nari Heritage Necklace', 
    price: 'Rs 28,000', 
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 3, 
    name: 'Aura Pearl Earrings', 
    price: 'Rs 8,200', 
    category: 'Earrings',
    image: 'https://images.unsplash.com/photo-1535633302723-9993d577456e?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 4, 
    name: 'Celestial Diamond Band', 
    price: 'Rs 15,600', 
    category: 'Rings',
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800'
  },
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts((prev) => [...prev, newProduct]);
  };

  const removeProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (id: number, updatedFields: Partial<Omit<Product, 'id'>>) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, ...updatedFields } : p));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
