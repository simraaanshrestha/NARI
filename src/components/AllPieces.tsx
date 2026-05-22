import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts, type Product } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, ArrowLeft, Search } from 'lucide-react';

const AllPieces: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-emerald-deep text-obsidian dark:text-pearl font-sans selection:bg-gold/30 transition-colors duration-500">
      {/* Header */}
      <header className="border-b border-gold/10 px-6 py-8 md:px-12 sticky top-0 bg-white/80 dark:bg-emerald-deep/80 backdrop-blur-xl z-40 transition-colors duration-500">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8 pt-12 md:pt-16">
          <button
            onClick={onBack}
            className="flex items-center gap-3 text-gold hover:text-obsidian dark:hover:text-pearl transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs uppercase tracking-[0.3em]">Return to Boutique</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-display font-bold italic text-gold">Our Collection</h1>

          <div className="w-[180px] hidden md:block" /> {/* Spacer for symmetry */}
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-[10px] uppercase tracking-widest transition-all border ${filter === cat ? 'border-gold bg-gold text-white' : 'border-gold/20 text-obsidian/40 dark:text-pearl/40 hover:border-gold/60'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" size={16} />
            <input
              type="text"
              placeholder="Search the collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/5 dark:bg-white/5 border border-gold/20 p-4 pl-12 text-obsidian dark:text-pearl focus:border-gold outline-none transition-colors text-xs"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group relative"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-black/5 dark:bg-white/5 border border-gold/5 group-hover:border-gold/20 transition-colors">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-emerald-deep/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6"
                  >
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-3 bg-gold text-white text-[10px] tracking-widest uppercase hover:bg-gold-dark transition-all transform translate-y-4 group-hover:translate-y-0 duration-500"
                    >
                      Acquire Piece
                    </button>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-pearl text-[8px] tracking-[0.3em] uppercase hover:text-gold transition-colors"
                    >
                      Detailed View
                    </button>
                  </motion.div>
                </div>

                <div className="mt-6 text-center space-y-2">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-gold/60">{product.category}</span>
                  <h3 className="text-xl font-display font-bold italic">{product.name}</h3>
                  <p className="text-sm text-obsidian/40 dark:text-pearl/40 font-light">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-obsidian/20 dark:text-pearl/20 text-xl font-display italic">No pieces found in this category.</p>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-emerald-deep/95 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl bg-white dark:bg-emerald-deep/50 border border-gold/20 shadow-2xl flex flex-col md:flex-row overflow-hidden"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-20 text-gold/60 hover:text-gold transition-colors p-2"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-3/5 aspect-square md:aspect-auto overflow-hidden">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>

              <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-transparent">
                <span className="text-xs tracking-[0.5em] uppercase text-gold mb-6 block">NARI'S Collection</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-obsidian dark:text-pearl mb-4 leading-tight italic">
                  {selectedProduct.name}
                </h2>
                <p className="text-gold text-2xl font-display mb-8">{selectedProduct.price}</p>

                <p className="text-obsidian/60 dark:text-pearl/60 font-light leading-relaxed mb-12">
                  Part of our comprehensive {selectedProduct.category} collection, this piece represents the pinnacle of NARI's design philosophy.
                </p>

                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="btn-gold flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={18} />
                  <span>Acquire Piece</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllPieces;
