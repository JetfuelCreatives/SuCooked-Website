
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChefAI } from './components/ChefAI';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { MENU_ITEMS, TESTIMONIALS, BLOG_POSTS, RECIPE_ITEMS } from './constants';
import { Category, MenuItem, CartItem, View } from './types';
import { ChevronRight, Play, Star, Instagram, Twitter, Facebook, ChevronDown, Clock, BarChart } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredMenu = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <div className="animate-in fade-in duration-700">
            {/* Hero Section */}
            <header className="relative h-[85vh] flex items-center justify-center text-center text-white overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1950&q=80" 
                  className="w-full h-full object-cover brightness-[0.45]"
                  alt="Gourmet Hero"
                />
              </div>
              <div className="relative z-10 px-4 max-w-4xl">
                <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">Gourmet Meals Delivered</h1>
                <p className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase mb-12 opacity-90">Crafted with Passion • Served with Love</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button onClick={() => setView('meals')} className="w-full sm:w-auto bg-accent text-white px-10 py-4 rounded-sm hover:bg-accent-hover transition-all transform hover:-translate-y-1 font-bold uppercase tracking-widest text-sm">
                    Order Now
                  </button>
                  <button onClick={() => setView('about')} className="w-full sm:w-auto border-2 border-white text-white px-10 py-4 rounded-sm hover:bg-white hover:text-dark transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-sm">
                    <Play size={16} fill="currentColor" />
                    How it works
                  </button>
                </div>
              </div>
            </header>

            {/* How It Works Section */}
            <section className="py-24 bg-white px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-serif mb-4">Effortless Dining</h2>
                  <p className="text-gray-500 max-w-2xl mx-auto">Fine dining quality in the comfort of your home. We handle the complexity, you enjoy the experience.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-12 text-center">
                  {[
                    { icon: '🖱️', title: '1. Choose', desc: 'Select from our rotating weekly menu of chef-curated dishes.' },
                    { icon: '📦', title: '2. We Cook & Deliver', desc: 'Our chefs prep fresh meals and deliver them chilled to your door.' },
                    { icon: '🍽️', title: '3. Heat & Enjoy', desc: 'Ready in minutes. Plating instructions included for the full experience.' }
                  ].map((step, idx) => (
                    <div key={idx} className="group p-8 border border-transparent hover:border-accent/10 hover:bg-cream transition-all duration-300 rounded-lg">
                      <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">{step.icon}</div>
                      <h3 className="text-xl font-serif mb-4">{step.title}</h3>
                      <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Teaser Menu */}
            <section className="py-24 bg-cream">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-serif mb-12">Taste of the Week</h2>
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                   {MENU_ITEMS.slice(0, 3).map(item => (
                     <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm">
                       <img src={item.img} className="w-full h-48 object-cover rounded-md mb-4" />
                       <h4 className="font-serif text-xl">{item.title}</h4>
                     </div>
                   ))}
                </div>
                <button onClick={() => setView('meals')} className="text-accent font-bold uppercase tracking-[0.2em] border-b-2 border-accent pb-2 hover:text-dark hover:border-dark transition-all">
                  View Full Menu
                </button>
              </div>
            </section>
          </div>
        );

      case 'meals':
        return (
          <div className="animate-in fade-in duration-700 bg-cream min-h-screen py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs">Curated Selection</span>
                <h2 className="text-5xl font-serif mt-2 mb-4">Our Weekly Menu</h2>
                <p className="text-gray-500 max-w-xl mx-auto">Sourced from the finest local purveyors, prepared with Michelin-standard techniques.</p>
              </div>

              {/* Filters */}
              <div className="flex justify-center flex-wrap gap-4 mb-16">
                {(['All', 'Mains', 'Vegetarian', 'Keto'] as Category[]).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
                      activeCategory === cat 
                        ? 'bg-dark text-white shadow-lg' 
                        : 'bg-white text-dark hover:bg-dark hover:text-white border border-dark/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredMenu.map((item) => (
                  <div key={item.id} className="bg-white group rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col">
                    <div className="relative h-80 overflow-hidden bg-dark/5">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                      <h3 className="text-2xl font-serif mb-3 group-hover:text-accent transition-colors">{item.title}</h3>
                      <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">{item.desc}</p>
                      <div className="flex justify-between items-center pt-6 border-t border-dark/5">
                        <span className="text-xl font-bold">{item.currency} {item.price}</span>
                        <button onClick={() => addToCart(item)} className="text-accent font-bold uppercase tracking-tighter hover:text-accent-hover transition-colors flex items-center gap-1 group/btn">
                          Add to Selection <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'recipes':
        return (
          <div className="animate-in fade-in duration-700 bg-white min-h-screen py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 mb-24 items-center">
                <div>
                  <h2 className="text-6xl font-serif mb-6">Chef's Journal</h2>
                  <p className="text-gray-500 text-lg mb-8">We believe transparency is the ultimate luxury. Explore the techniques and ingredients that make SuCooked unique.</p>
                  <ChefAI />
                </div>
                <div className="relative aspect-square">
                   <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover rounded-lg shadow-2xl" />
                </div>
              </div>

              <div className="pt-24 border-t border-dark/5">
                <h3 className="text-3xl font-serif mb-12">Secrets from the Kitchen</h3>
                <div className="grid md:grid-cols-3 gap-10">
                   {RECIPE_ITEMS.map(recipe => (
                     <div key={recipe.id} className="group cursor-pointer">
                        <div className="relative h-64 overflow-hidden rounded-lg mb-6">
                           <img src={recipe.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                           <div className="absolute top-4 left-4 flex gap-2">
                             <span className="bg-white/90 px-3 py-1 text-[10px] font-bold uppercase rounded flex items-center gap-1"><Clock size={12}/> {recipe.time}</span>
                             <span className="bg-white/90 px-3 py-1 text-[10px] font-bold uppercase rounded flex items-center gap-1"><BarChart size={12}/> {recipe.difficulty}</span>
                           </div>
                        </div>
                        <h4 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors uppercase tracking-tight">{recipe.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{recipe.description}</p>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'catering':
        return (
          <div className="animate-in slide-in-from-bottom duration-700 bg-cream">
            <section className="scroll-mt-20 bg-white">
              <div className="flex flex-col lg:flex-row min-h-screen">
                <div className="lg:w-1/2 p-8 lg:p-24 flex flex-col justify-center bg-dark text-white">
                  <span className="text-accent font-bold text-xs uppercase tracking-[0.3em] mb-4">Exclusive Events</span>
                  <h2 className="text-6xl md:text-8xl font-serif leading-none mb-12">Catering <br/><span className="italic font-normal">Services</span></h2>
                  <div className="max-w-md space-y-8 opacity-70">
                    <p className="text-lg">Exceptional food for exceptional moments. We bring our full culinary arsenal to your venue of choice.</p>
                    <div className="space-y-4">
                       <p className="font-bold border-l-2 border-accent pl-4 uppercase tracking-widest text-xs">Corporate • Private • Weddings</p>
                       <p className="font-bold border-l-2 border-accent pl-4 uppercase tracking-widest text-xs">Bespoke Menu Creation</p>
                       <p className="font-bold border-l-2 border-accent pl-4 uppercase tracking-widest text-xs">Professional Service Staff</p>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 bg-[#F3F4F6] p-8 lg:p-24 flex items-center justify-center">
                  <div className="bg-white p-8 md:p-12 w-full max-w-2xl shadow-xl rounded-sm">
                    <h3 className="text-2xl font-bold mb-10 tracking-tight">Request a Quote</h3>
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                      <div className="grid md:grid-cols-2 gap-6">
                        <input type="text" placeholder="Full Name" className="w-full p-4 bg-[#F9FAFB] border border-transparent focus:border-dark/10 focus:bg-white outline-none rounded-sm" />
                        <input type="email" placeholder="Email" className="w-full p-4 bg-[#F9FAFB] border border-transparent focus:border-dark/10 focus:bg-white outline-none rounded-sm" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                         <select className="w-full p-4 bg-[#F9FAFB] outline-none rounded-sm appearance-none">
                            <option>Event Type</option>
                            <option>Wedding</option>
                            <option>Corporate</option>
                            <option>Private Party</option>
                         </select>
                         <input type="date" className="w-full p-4 bg-[#F9FAFB] outline-none rounded-sm" />
                      </div>
                      <textarea placeholder="Tell us about your event..." className="w-full p-4 bg-[#F9FAFB] border border-transparent outline-none rounded-sm min-h-[120px]" />
                      <button className="w-full bg-black text-white py-5 rounded-sm text-sm font-bold uppercase tracking-[0.2em] hover:bg-dark/90 transition-all">Submit Request</button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );

      case 'about':
        return (
          <div className="animate-in fade-in duration-700 bg-dark text-white min-h-screen py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div>
                  <h2 className="text-6xl font-serif mb-12">A Legacy of <span className="text-accent">Taste.</span></h2>
                  <div className="space-y-8 text-gray-400 text-lg leading-relaxed">
                    <p>SuCooked began with a singular mission: to eliminate the compromise between convenience and culinary excellence.</p>
                    <p>We work with small-scale farmers who prioritize soil health as much as flavor. Our beef is aged for 28 days, our poultry is truly free-range, and our vegetables are harvested specifically for your order.</p>
                    <p>Every dish that leaves our kitchen is a testament to the belief that real luxury is found in the quality of ingredients and the time taken to prepare them.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <img src="https://images.unsplash.com/photo-1541614101331-1a5a3a194e90?auto=format&fit=crop&w=800&q=80" className="rounded-lg h-80 w-full object-cover" />
                   <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" className="rounded-lg h-80 w-full object-cover mt-12" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'blog':
        return (
          <div className="animate-in fade-in duration-700 bg-cream min-h-screen py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-serif mb-4">Culinary Journals</h2>
                <p className="text-gray-500">Insights, philosophy, and stories from our kitchen to your home.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-12">
                {BLOG_POSTS.map(post => (
                  <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                    <div className="relative h-64 overflow-hidden">
                       <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                          {post.category}
                       </div>
                    </div>
                    <div className="p-8">
                       <div className="flex justify-between items-center mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                          <span>{post.date}</span>
                          <span>By {post.author}</span>
                       </div>
                       <h3 className="text-2xl font-serif mb-4 group-hover:text-accent transition-colors">{post.title}</h3>
                       <p className="text-gray-500 text-sm mb-6 leading-relaxed">{post.excerpt}</p>
                       <button className="text-dark font-bold uppercase text-xs tracking-widest border-b border-dark/20 pb-1 hover:border-accent hover:text-accent transition-all">Read Story</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-cream">
      <Header 
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} 
        onCartOpen={() => setIsCartOpen(true)}
        onLoginOpen={() => setIsLoginOpen(true)}
        currentView={view}
        onNavigate={setView}
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />

      <AuthModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />

      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <button onClick={() => setView('home')}>
                <h1 className="text-3xl font-bold tracking-tighter mb-6">Su<span className="text-accent">Cooked</span></h1>
              </button>
              <p className="text-gray-500 leading-relaxed mb-6">Redefining the dining table through luxury meal delivery and ethical sourcing.</p>
              <div className="flex gap-4">
                 <div className="p-2 border border-white/10 rounded hover:border-accent transition-colors cursor-pointer"><Instagram size={18} /></div>
                 <div className="p-2 border border-white/10 rounded hover:border-accent transition-colors cursor-pointer"><Twitter size={18} /></div>
                 <div className="p-2 border border-white/10 rounded hover:border-accent transition-colors cursor-pointer"><Facebook size={18} /></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-widest text-accent text-xs mb-8">Explore</h4>
              <ul className="space-y-4 text-gray-400">
                <li><button onClick={() => setView('meals')} className="hover:text-white transition-colors">Weekly Menu</button></li>
                <li><button onClick={() => setView('catering')} className="hover:text-white transition-colors">Catering</button></li>
                <li><button onClick={() => setView('about')} className="hover:text-white transition-colors">Our Story</button></li>
                <li><button onClick={() => setView('blog')} className="hover:text-white transition-colors">Blog</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest text-accent text-xs mb-8">Support</h4>
              <ul className="space-y-4 text-gray-400">
                <li><button className="hover:text-white transition-colors">Delivery Areas</button></li>
                <li><button className="hover:text-white transition-colors">Heating Guide</button></li>
                <li><button className="hover:text-white transition-colors">Sustainability</button></li>
                <li><button className="hover:text-white transition-colors">FAQs</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest text-accent text-xs mb-8">Newsletter</h4>
              <p className="text-sm text-gray-500 mb-6 italic">Join the table for exclusive chef recipes and early menu access.</p>
              <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your Email" className="bg-white/5 border border-white/10 p-3 rounded text-sm focus:outline-none focus:border-accent transition-colors" />
                <button className="bg-accent text-white py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-accent-hover transition-colors">Subscribe</button>
              </form>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10 text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] gap-6">
            <p>&copy; 2024 SuCooked Delivery Services. All rights reserved.</p>
            <div className="flex gap-8">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
              <button className="hover:text-white transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
