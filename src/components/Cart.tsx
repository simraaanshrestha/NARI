import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Checkout from './Checkout';

const Cart: React.FC = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[80] overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-emerald-deep/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-emerald-deep border-l border-gold/10 shadow-2xl flex flex-col"
            >
              <div className="p-8 flex justify-between items-center border-b border-gold/10">
                <h2 className="text-2xl font-display font-bold text-pearl italic">Your Collection</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-gold/60 hover:text-gold transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-8">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <ShoppingBag size={48} className="text-gold/20" />
                    <p className="text-pearl/40 font-light tracking-wide italic">The collection is empty.</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-6 pb-8 border-b border-gold/5"
                    >
                      <div className="w-24 h-32 bg-pearl/5 border border-gold/10 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-grow space-y-2">
                        <div className="flex justify-between">
                          <h3 className="text-pearl font-display text-lg">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-pearl/20 hover:text-gold">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-gold/60 text-[10px] uppercase tracking-widest">{item.category}</p>
                        <p className="text-pearl/60 font-light">{item.price}</p>
                        
                        <div className="flex items-center gap-4 pt-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 border border-gold/20 text-gold hover:bg-gold/10">
                            <Minus size={12} />
                          </button>
                          <span className="text-pearl text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 border border-gold/20 text-gold hover:bg-gold/10">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-8 border-t border-gold/10 space-y-6">
                  <div className="flex justify-between items-end">
                    <span className="text-pearl/40 uppercase tracking-[0.2em] text-[10px]">Total Estimation</span>
                    <span className="text-2xl font-display font-bold text-gold">Rs {totalPrice.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full btn-gold"
                  >
                    Proceed to Pay
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Checkout isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
};

export default Cart;
