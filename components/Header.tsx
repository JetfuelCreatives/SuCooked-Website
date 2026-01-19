
import React from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { View } from '../types';

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  onLoginOpen: () => void;
  currentView: View;
  onNavigate: (view: View) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  onCartOpen, 
  onLoginOpen,
  currentView, 
  onNavigate 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks: { name: string; view: View }[] = [
    { name: 'Meals', view: 'meals' },
    { name: 'Recipes', view: 'recipes' },
    { name: 'Catering', view: 'catering' },
    { name: 'Our Story', view: 'about' },
    { name: 'Blog', view: 'blog' },
  ];

  const handleLinkClick = (view: View) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-dark/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={() => onNavigate('home')} 
              className="flex items-center group focus:outline-none"
            >
              <h1 className="text-3xl font-bold tracking-tighter text-dark">
                Su<span className="text-accent group-hover:text-dark transition-colors duration-300">Cooked</span>
              </h1>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 text-[11px] font-bold tracking-[0.2em] uppercase text-dark/70">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => onNavigate(link.view)}
                className={`transition-colors py-2 border-b-2 focus:outline-none ${
                  currentView === link.view 
                  ? 'text-dark border-dark' 
                  : 'border-transparent hover:border-dark hover:text-dark'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={onCartOpen}
              className="relative p-2 text-dark hover:text-accent transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-dark text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={onLoginOpen}
              className="hidden md:flex items-center gap-2 border border-dark px-4 py-1.5 rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-dark hover:text-white transition-all"
            >
              Login
            </button>

            <button 
              className="md:hidden p-2 text-dark"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-dark/5 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <button 
                key={link.name}
                onClick={() => handleLinkClick(link.view)} 
                className={`w-full text-left px-3 py-4 text-sm font-bold tracking-widest uppercase border-b border-dark/5 transition-all ${
                  currentView === link.view ? 'text-accent' : 'text-dark hover:text-accent'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => { setIsMobileMenuOpen(false); onLoginOpen(); }}
              className="w-full text-left px-3 py-4 text-sm font-bold tracking-widest uppercase text-accent"
            >
              Login / Account
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
