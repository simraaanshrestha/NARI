import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useProducts, type Product } from '../context/ProductContext';
import { X, ShoppingBag } from 'lucide-react';

const ProductGrid: React.FC<{ onViewAll: () => void }> = ({ onViewAll }) => {
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section id="collection" className="py-24 md:py-40 bg-white dark:bg-emerald-deep transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-obsidian dark:text-pearl">
              The Signature <span className="italic font-normal text-gold">Collection</span>
            </h2>
            <p className="text-obsidian/60 dark:text-pearl/60 text-lg">
              A curation of our most iconic pieces, where traditional craftsmanship meets avant-garde design.
            </p>
          </div>
          <button 
            onClick={onViewAll}
            className="mt-8 md:mt-0 text-xs tracking-[0.3em] uppercase border-b border-gold pb-2 text-obsidian dark:text-pearl hover:text-gold transition-colors"
          >
            View All Pieces
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-black/5 dark:bg-pearl/5 mb-6">
                {/* Product Image */}
                <motion.img 
                  initial={{ opacity: 0, scale: 1.1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gold/10 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4"
                >
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="px-6 py-2 bg-gold text-white text-[10px] tracking-widest uppercase hover:bg-gold-dark transition-colors shadow-xl"
                  >
                    Add to Collection
                  </button>
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="text-pearl text-[8px] tracking-[0.3em] uppercase opacity-80 hover:opacity-100 hover:text-gold transition-all"
                  >
                    Quick View
                  </button>
                </motion.div>
              </div>
              
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest uppercase text-gold">{product.category}</span>
                <h3 className="text-xl font-display font-bold text-obsidian dark:text-pearl italic">{product.name}</h3>
                <p className="text-sm text-obsidian/50 dark:text-pearl/50">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick View Lightbox */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-emerald-deep/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-white dark:bg-emerald-deep/50 border border-gold/20 shadow-2xl flex flex-col md:flex-row overflow-hidden"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-20 text-gold/60 hover:text-gold transition-colors p-2"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-3/5 aspect-square md:aspect-auto overflow-hidden bg-white/5">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-transparent">
                <span className="text-xs tracking-[0.5em] uppercase text-gold mb-6 block">Signature Series</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-obsidian dark:text-pearl mb-4 leading-tight italic">
                  {selectedProduct.name}
                </h2>
                <p className="text-gold text-2xl font-display mb-8">{selectedProduct.price}</p>
                
                <div className="space-y-6 mb-12">
                  <p className="text-obsidian/60 dark:text-pearl/60 font-light leading-relaxed">
                    A masterpiece of modern curation, this piece from the {selectedProduct.category} collection embodies the timeless elegance and sophisticated artistry of NARI.
                  </p>
                  <div className="flex gap-4 items-center text-[10px] uppercase tracking-widest text-obsidian/40 dark:text-pearl/40">
                    <span className="px-3 py-1 border border-obsidian/10 dark:border-pearl/10 rounded-full">Ethically Sourced</span>
                    <span className="px-3 py-1 border border-obsidian/10 dark:border-pearl/10 rounded-full">Handcrafted</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="btn-gold flex items-center justify-center gap-3 group"
                >
                  <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                  <span>Acquire Piece</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductGrid;
