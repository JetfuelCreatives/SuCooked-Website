
import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2, Calendar, CreditCard } from 'lucide-react';
import { CartItem } from '../types.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const [step, setStep] = React.useState<'cart' | 'checkout'>('cart');
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-cream shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 flex justify-between items-center border-b border-dark/10">
          <h2 className="text-2xl font-serif">
            {step === 'cart' ? 'Your Selection' : 'Secure Checkout'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-dark/5 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag size={64} className="text-dark/20" />
              <p className="text-gray-500 italic">Your culinary journey begins with a selection.</p>
              <button 
                onClick={onClose}
                className="bg-accent text-white px-8 py-3 rounded-sm hover:bg-accent-hover transition-colors uppercase text-sm font-bold tracking-widest"
              >
                Explore Menu
              </button>
            </div>
          ) : step === 'cart' ? (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 animate-in fade-in duration-300">
                  <div className="w-20 h-20 bg-dark/5 rounded overflow-hidden flex-shrink-0">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h4 className="font-serif text-lg leading-tight">{item.title}</h4>
                      <button onClick={() => onRemove(item.id)} className="text-dark/40 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{item.currency} {item.price}</p>
                    <div className="flex items-center gap-3">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 border rounded hover:bg-white transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 border rounded hover:bg-white transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-bold text-xs uppercase tracking-widest text-dark/60">Delivery Details</h3>
                <input type="text" placeholder="Full Name" className="w-full p-3 border-b bg-transparent border-dark/20 focus:outline-none focus:border-accent" />
                <input type="email" placeholder="Email Address" className="w-full p-3 border-b bg-transparent border-dark/20 focus:outline-none focus:border-accent" />
                <input type="text" placeholder="Delivery Address" className="w-full p-3 border-b bg-transparent border-dark/20 focus:outline-none focus:border-accent" />
                <div className="flex items-center gap-3 p-3 border rounded bg-white">
                  <Calendar size={18} className="text-accent" />
                  <input type="date" className="flex-grow bg-transparent focus:outline-none" />
                </div>
                <textarea placeholder="Delivery instructions (Gate code, reception, etc.)" className="w-full p-3 border rounded bg-white min-h-[100px] focus:outline-none focus:border-accent" />
              </div>
              <div className="pt-4 space-y-4">
                <h3 className="font-bold text-xs uppercase tracking-widest text-dark/60">Payment</h3>
                <div className="flex items-center gap-3 p-4 border rounded bg-white border-accent">
                   <CreditCard className="text-accent" />
                   <span className="font-medium">Secure Card Payment via PayStack</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-dark/10 bg-white">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-2xl font-serif">R {total.toFixed(2)}</span>
            </div>
            
            {step === 'cart' ? (
              <button 
                onClick={() => setStep('checkout')}
                className="w-full bg-accent text-white py-4 rounded-sm hover:bg-accent-hover transition-colors uppercase font-bold tracking-widest flex items-center justify-center gap-2"
              >
                Proceed to Checkout
              </button>
            ) : (
              <div className="space-y-3">
                <button 
                  className="w-full bg-dark text-white py-4 rounded-sm hover:bg-dark/90 transition-colors uppercase font-bold tracking-widest"
                >
                  Pay & Place Order
                </button>
                <button 
                  onClick={() => setStep('cart')}
                  className="w-full text-gray-500 text-sm font-bold uppercase tracking-widest py-2"
                >
                  Back to Cart
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
