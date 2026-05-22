import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Story from './components/Story';
import Cart from './components/Cart';
import AllPieces from './components/AllPieces';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = () => {
      const hoveredElement = document.querySelectorAll('button, a, .group');
      hoveredElement.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', moveCursor);
    handleHover();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div
      className={`custom-cursor hidden md:block ${isHovering ? 'custom-cursor-grow' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px`, transform: `translate(-50%, -50%) ${isHovering ? 'scale(3)' : 'scale(1)'}` }}
    />
  );
};

function App() {
  const [view, setView] = useState<'client' | 'all-pieces' | 'admin-login' | 'admin-dashboard'>('client');

  return (
    <ThemeProvider>
      <ProductProvider>
        <OrderProvider>
          <CartProvider>
            <div className="relative min-h-screen">
              <CustomCursor />

              {view === 'client' && (
                <>
                  <Navbar onAdminClick={() => setView('admin-login')} />
                  <Cart />
                  <main>
                    <Hero />
                    <ProductGrid onViewAll={() => setView('all-pieces')} />
                    <Story />

                    <footer className="py-20 bg-pearl dark:bg-emerald-deep border-t border-gold/10 text-center">
                      <h2 className="text-3xl font-display font-bold tracking-widest text-obsidian dark:text-pearl mb-8">
                        NARI
                      </h2>
                      <p className="text-xs tracking-[0.5em] uppercase text-gold/60 mb-12">
                        Butwal • Kathmandu • Pokhara • Biratnagar
                      </p>
                      <div className="flex justify-center gap-12 text-[10px] tracking-[0.2em] uppercase text-obsidian/40 dark:text-pearl/40">
                        <span className="cursor-pointer hover:text-gold transition-colors">Instagram</span>
                        <span className="cursor-pointer hover:text-gold transition-colors">Boutiques</span>
                        <span className="cursor-pointer hover:text-gold transition-colors">Contact</span>
                        <span onClick={() => setView('admin-login')} className="cursor-pointer hover:text-gold transition-colors border-b border-gold/20 pb-1">Admin Access</span>
                      </div>
                      <p className="mt-20 text-[8px] tracking-widest uppercase text-obsidian/20 dark:text-pearl/20">
                        © 2026 NARI Joaillerie. All Rights Reserved.
                      </p>
                    </footer>
                  </main>
                </>
              )}

              {view === 'all-pieces' && (
                <>
                  <Navbar onAdminClick={() => setView('admin-login')} />
                  <Cart />
                  <AllPieces onBack={() => setView('client')} />
                </>
              )}

              {view === 'admin-login' && (
                <AdminLogin
                  onLogin={() => setView('admin-dashboard')}
                  onBack={() => setView('client')}
                />
              )}

              {view === 'admin-dashboard' && (
                <AdminPanel onBack={() => setView('client')} />
              )}
            </div>
          </CartProvider>
        </OrderProvider>
      </ProductProvider>
    </ThemeProvider>
  );
}

export default App;
