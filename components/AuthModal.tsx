
import React, { useState } from 'react';
import { X, Mail, Lock, User, ChevronRight, Github } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(`${mode === 'signin' ? 'Signed in' : 'Account created'} successfully! (Simulation)`);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-dark/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-4xl min-h-[500px] flex flex-col md:flex-row rounded-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Left Side: Brand Imagery/Message */}
        <div className="hidden md:flex md:w-5/12 bg-dark relative p-12 flex-col justify-between text-white">
          <div className="absolute inset-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80" 
              className="w-full h-full object-cover"
              alt="Luxury Dining"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-serif mb-4">Welcome Back to the Table</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Join our community of culinary enthusiasts and unlock exclusive access to seasonal menus and chef journals.
            </p>
          </div>
          <div className="relative z-10">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-2">Member Perks</div>
            <ul className="text-xs space-y-2 text-gray-400">
              <li>• Priority delivery scheduling</li>
              <li>• Personalized nutritional tracking</li>
              <li>• Early access to seasonal drops</li>
            </ul>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-grow p-8 md:p-12 bg-cream flex flex-col justify-center">
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 text-dark/40 hover:text-dark transition-colors"
          >
            <X size={20} />
          </button>

          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-serif mb-2">
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                Experience SuCooked Excellence
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'signup' && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={18} />
                  <input 
                    required
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full pl-12 pr-4 py-4 bg-white border border-transparent focus:border-accent outline-none rounded-sm transition-all text-sm"
                  />
                </div>
              )}
              
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={18} />
                <input 
                  required
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full pl-12 pr-4 py-4 bg-white border border-transparent focus:border-accent outline-none rounded-sm transition-all text-sm"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={18} />
                <input 
                  required
                  type="password" 
                  placeholder="Password" 
                  className="w-full pl-12 pr-4 py-4 bg-white border border-transparent focus:border-accent outline-none rounded-sm transition-all text-sm"
                />
              </div>

              {mode === 'signin' && (
                <div className="text-right">
                  <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-dark/40 hover:text-accent transition-colors">
                    Forgot Password?
                  </button>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-dark text-white py-4 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {mode === 'signin' ? 'Sign In' : 'Create Account'}
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-dark/5 text-center">
              <p className="text-sm text-gray-500 mb-4">
                {mode === 'signin' ? "New to SuCooked?" : "Already have an account?"}
              </p>
              <button 
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                className="text-xs font-bold uppercase tracking-widest text-accent hover:text-accent-hover transition-colors"
              >
                {mode === 'signin' ? 'Register Now' : 'Sign In Instead'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
