import React, { useState, useEffect } from 'react';
import { Phone, Search, User, Heart, ShoppingBag, X, Star, Sparkles, Send, CheckCircle, RefreshCw } from 'lucide-react';
import { CATEGORIES } from './database';
import Router from './Router';

// Live support numbers
const PHONES = [
  { label: 'USA', number: '+1-631-201-1254' },
  { label: 'UK', number: '+44 20 3769 9131' },
  { label: 'IND', number: '+91 11 4084 4599' }
];

// static exchange rates mapping USD default to others
const CURRENCIES = {
  USD: 1.0,
  INR: 83.45,
  GBP: 0.78,
  EUR: 0.92,
  AED: 3.67,
  AUD: 1.51
};

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Shrink header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('pushstate-changed'));
    setIsMobileMenuOpen(false);
  };

  // Cart operations
  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQty = (id, newQty) => {
    if (newQty <= 0) return removeFromCart(id);
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  // Wishlist operations
  const addToWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id); // Toggle
      return [...prev, product];
    });
    setIsWishlistOpen(true);
  };

  // Safe pricing
  const convertPrice = (usdPrice) => {
    const rate = CURRENCIES[currency] || 1;
    const symbol = currency === 'INR' ? '₹' : currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$';
    return `${symbol}${Math.round(usdPrice * rate).toLocaleString()}`;
  };

  const getCartTotal = () => {
    const totalUsd = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    return convertPrice(totalUsd);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. TOP SUPPORT BAR */}
      <div className="bg-primary-dark/80 text-[10px] text-gray uppercase tracking-widest border-b border-white/5 py-2">
        <div className="container flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="flex items-center gap-1.5"><Phone size={10} className="text-gold" /> Expert Hotline:</span>
            {PHONES.map(p => (
              <a key={p.label} href={`tel:${p.number}`} className="hover:text-gold transition-colors">{p.label}: {p.number}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href="https://api.whatsapp.com/send?phone=919319175600" target="_blank" className="hover:text-gold transition-colors text-emerald-500 font-semibold">WhatsApp Astro Support</a>
            
            {/* Currency selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent text-gray outline-none cursor-pointer border-none text-[10px] uppercase font-bold"
            >
              {Object.keys(CURRENCIES).map(cur => (
                <option key={cur} value={cur} className="bg-primary-dark text-white">{cur}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Sticky & Shrinking) */}
      <header className={`sticky-header ${isSticky ? 'shrink' : 'py-5'}`}>
        <div className="container flex justify-between items-center">
          {/* Brand Logo */}
          <div onClick={() => navigateTo('/')} className="cursor-pointer flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center bg-gold/10">
              <span className="text-gold font-serif italic font-bold text-sm">J</span>
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider text-[#2c2c2c]">JAIPUR <span className="text-gold">RASHI</span> GEMS</span>
              <span className="text-[8px] uppercase tracking-widest text-gray block -mt-1 font-sans">Pure Astrological Sanctuary</span>
            </div>
          </div>

          {/* Desktop Mega Navigation */}
          <nav className="desktop-only flex gap-8 text-[11px] uppercase tracking-widest font-bold font-sans">
            {/* Mega Menu 1: Gemstones */}
            <div className="relative group py-2">
              <span onClick={() => navigateTo('/gemstones')} className="hover:text-gold cursor-pointer py-2 flex items-center gap-1 transition-colors">Gemstones</span>
              <div className="mega-dropdown-panel text-[10px]">
                <div>
                  <h5 className="text-gold font-serif italic text-xs mb-3 border-b border-white/5 pb-1">Zodiac Stones</h5>
                  <div className="flex flex-col gap-2 font-medium">
                    {CATEGORIES.zodiac.map(cat => (
                      <span key={cat.id} onClick={() => navigateTo(`/gemstones/${cat.id}`)} className="cursor-pointer hover:text-gold transition-colors">{cat.name.split(' (')[0]}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-gold font-serif italic text-xs mb-3 border-b border-white/5 pb-1">Vedic Gems</h5>
                  <div className="flex flex-col gap-2 font-medium">
                    {CATEGORIES.vedic.slice(0, 7).map(cat => (
                      <span key={cat.id} onClick={() => navigateTo(`/gemstones/${cat.id}`)} className="cursor-pointer hover:text-gold transition-colors">{cat.name}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-gold font-serif italic text-xs mb-3 border-b border-white/5 pb-1">Exclusive Collection</h5>
                  <div className="flex flex-col gap-2 font-medium">
                    {CATEGORIES.exclusive.slice(0, 7).map(cat => (
                      <span key={cat.id} onClick={() => navigateTo(`/gemstones/${cat.id}`)} className="cursor-pointer hover:text-gold transition-colors">{cat.name}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between border-l border-white/5 pl-4">
                  <div>
                    <h5 className="text-gold font-serif italic text-xs mb-3 border-b border-white/5 pb-1">Astrological Tools</h5>
                    <div className="flex flex-col gap-2 font-medium text-gray">
                      <span onClick={() => navigateTo('/gemstone-recommendation')} className="cursor-pointer hover:text-gold transition-colors">Astro Recommendation</span>
                      <span onClick={() => navigateTo('/carat-to-ratti-converter')} className="cursor-pointer hover:text-gold transition-colors">Carat-Ratti Converter</span>
                      <span onClick={() => navigateTo('/gold-rate')} className="cursor-pointer hover:text-gold transition-colors">Live Gold Rates</span>
                      <span onClick={() => navigateTo('/gemstones-wholesaler')} className="cursor-pointer hover:text-gold transition-colors">Wholesaler Inquiry</span>
                    </div>
                  </div>
                  <button onClick={() => navigateTo('/gemstones')} className="gold-btn py-2 text-[9px] w-full mt-4">View All Gems</button>
                </div>
              </div>
            </div>

            {/* Mega Menu 2: Jewelry */}
            <div className="relative group py-2">
              <span onClick={() => navigateTo('/jewellery')} className="hover:text-gold cursor-pointer py-2 transition-colors">Jewellery</span>
              <div className="jewelry-dropdown-panel text-[10px]">
                <div>
                  <h5 className="text-gold font-serif italic text-xs mb-3 border-b border-white/5 pb-1">Shop By Type</h5>
                  <div className="flex flex-col gap-2 font-medium">
                    <span onClick={() => navigateTo('/jewellery/rings')} className="cursor-pointer hover:text-gold transition-colors">Rings</span>
                    <span onClick={() => navigateTo('/jewellery/pendants')} className="cursor-pointer hover:text-gold transition-colors">Pendants</span>
                    <span onClick={() => navigateTo('/jewellery/bracelets')} className="cursor-pointer hover:text-gold transition-colors">Bracelets</span>
                    <span onClick={() => navigateTo('/engagement-rings')} className="cursor-pointer hover:text-gold transition-colors">Engagement Rings</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between border-l border-white/5 pl-4">
                  <div>
                    <h5 className="text-gold font-serif italic text-xs mb-3 border-b border-white/5 pb-1">Custom Boutique</h5>
                    <p className="text-[9px] text-gray leading-relaxed mb-3">Vedic design mounting in hallmark metal to channel astral frequencies.</p>
                  </div>
                  <button onClick={() => navigateTo('/custom-jewelry')} className="gold-btn py-2 text-[9px] w-full">Start Custom Order</button>
                </div>
              </div>
            </div>

            <span onClick={() => navigateTo('/engagement-rings')} className="hover:text-gold cursor-pointer py-2 transition-colors">Engagement Rings</span>
            <span onClick={() => navigateTo('/gemstone-recommendation')} className="hover:text-gold cursor-pointer py-2 text-gold transition-colors flex items-center gap-1"><Sparkles size={12} /> Astro Recommendation</span>
            <span onClick={() => navigateTo('/vault')} className="hover:text-gold cursor-pointer py-2 transition-colors">Vault</span>
            <span onClick={() => navigateTo('/blog')} className="hover:text-gold cursor-pointer py-2 transition-colors">Blog</span>
          </nav>

          {/* Action Header Icons */}
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-[#2c2c2c] hover:text-[#f46b55] transition-colors">
              <Search size={18} />
            </button>
            <button onClick={() => setIsWishlistOpen(true)} className="text-[#2c2c2c] hover:text-[#f46b55] transition-colors relative">
              <Heart size={18} />
              {wishlist.length > 0 && <span className="absolute -top-1.5 -right-1.5 bg-gold text-primary-dark font-sans font-bold text-[8px] h-3.5 w-3.5 rounded-full flex items-center justify-center">{wishlist.length}</span>}
            </button>
            <button onClick={() => setIsCartOpen(true)} className="text-[#2c2c2c] hover:text-[#f46b55] transition-colors relative">
              <ShoppingBag size={18} />
              {cart.length > 0 && <span className="absolute -top-1.5 -right-1.5 bg-gold text-primary-dark font-sans font-bold text-[8px] h-3.5 w-3.5 rounded-full flex items-center justify-center">{cart.length}</span>}
            </button>
            
            {/* Mobile Hamburger */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="mobile-only text-[#2c2c2c] hover:text-[#f46b55]">
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. SEARCH BAR DRAWER (MODAL OVERLAY) */}
      <div className={`search-modal ${isSearchOpen ? 'active' : ''}`}>
        <div className="container flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search natural gemstones, birthstones, astrological jewelry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-xl font-serif text-white placeholder-gray/40 border-none outline-none"
          />
          <div className="flex items-center gap-3">
            <button onClick={() => { navigateTo('/gemstones'); setIsSearchOpen(false); }} className="gold-btn py-2 text-xs">Search</button>
            <button onClick={() => setIsSearchOpen(false)} className="text-gray hover:text-white"><X size={20} /></button>
          </div>
        </div>
      </div>

      {/* 4. MOBILE DRAWER NAVIGATION */}
      {isMobileMenuOpen && (
        <div className="mobile-only fixed inset-0 z-[1000] bg-black/95 flex flex-col p-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
            <span className="font-serif text-lg font-bold text-gold">Jaipur Rashi Gems</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white"><X size={24} /></button>
          </div>
          <div className="flex flex-col gap-6 text-sm uppercase tracking-widest font-bold">
            <span onClick={() => navigateTo('/')} className="hover:text-gold">Home</span>
            <span onClick={() => navigateTo('/gemstones')} className="hover:text-gold">Gemstones</span>
            <span onClick={() => navigateTo('/jewellery')} className="hover:text-gold">Jewelry</span>
            <span onClick={() => navigateTo('/engagement-rings')} className="hover:text-gold">Engagement Rings</span>
            <span onClick={() => navigateTo('/gemstone-recommendation')} className="text-gold flex items-center gap-1"><Sparkles size={14} /> Astro Recommendation</span>
            <span onClick={() => navigateTo('/vault')} className="hover:text-gold">Vault</span>
            <span onClick={() => navigateTo('/blog')} className="hover:text-gold">Blog</span>
          </div>
        </div>
      )}

      {/* 5. WISHLIST SIDE DRAWER */}
      <div className={`drawer-overlay ${isWishlistOpen ? 'active' : ''}`} onClick={() => setIsWishlistOpen(false)}></div>
      <div className={`drawer-panel ${isWishlistOpen ? 'active' : ''}`}>
        <div className="drawer-header">
          <h3 className="text-lg font-serif text-gold italic">Your Wishlist</h3>
          <button onClick={() => setIsWishlistOpen(false)} className="text-gray hover:text-white"><X size={20} /></button>
        </div>
        <div className="drawer-content space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-12 text-gray text-xs">You have no items in your wishlist.</div>
          ) : (
            wishlist.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b border-white/5 pb-3">
                <div onClick={() => { navigateTo(`/product/${item.id}`); setIsWishlistOpen(false); }} className="cursor-pointer">
                  <h4 className="font-semibold text-xs text-white leading-snug line-clamp-2 hover:text-gold">{item.name}</h4>
                  <span className="text-gold text-[10px] block mt-0.5">{convertPrice(item.price)}</span>
                </div>
                <button onClick={() => addToWishlist(item)} className="text-xs text-red-500 hover:underline">Remove</button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 6. CART SIDE DRAWER */}
      <div className={`drawer-overlay ${isCartOpen ? 'active' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`drawer-panel ${isCartOpen ? 'active' : ''}`}>
        <div className="drawer-header">
          <h3 className="text-lg font-serif text-gold italic">Your Bag ({cart.reduce((s, i) => s + i.qty, 0)} items)</h3>
          <button onClick={() => setIsCartOpen(false)} className="text-gray hover:text-white"><X size={20} /></button>
        </div>
        <div className="drawer-content space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-4 flex-1 overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray text-xs">Your shopping cart is empty.</div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex items-start justify-between border-b border-white/5 pb-4">
                  <div className="flex-1 pr-4">
                    <h4 onClick={() => { navigateTo(`/product/${item.id}`); setIsCartOpen(false); }} className="font-semibold text-xs text-white leading-snug hover:text-gold cursor-pointer line-clamp-2">{item.name}</h4>
                    <span className="text-gold text-xs block mt-1 font-bold">{convertPrice(item.price)}</span>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateCartQty(item.id, item.qty - 1)} className="bg-white/5 border border-white/10 rounded h-5 w-5 flex items-center justify-center text-xs hover:bg-white/10">-</button>
                      <span className="text-xs font-bold text-white px-1">{item.qty}</span>
                      <button onClick={() => updateCartQty(item.id, item.qty + 1)} className="bg-white/5 border border-white/10 rounded h-5 w-5 flex items-center justify-center text-xs hover:bg-white/10">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-red-400 hover:text-white font-bold">REMOVE</button>
                </div>
              ))
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="border-t border-white/5 pt-4 space-y-4">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-gray">Subtotal:</span>
                <span className="text-gold text-lg font-serif">{getCartTotal()}</span>
              </div>
              <button onClick={() => alert('Order Placed! Thank you for choosing Jaipur Rashi Gems.')} className="w-full gold-btn flex justify-center items-center gap-2">Secure Checkout <Star size={14} /></button>
            </div>
          )}
        </div>
      </div>

      {/* 7. ROUTED VIEWS CONTAINER */}
      <Router
        cart={cart}
        toggleCart={setIsCartOpen}
        addToCart={addToCart}
        wishlist={wishlist}
        toggleWishlist={setIsWishlistOpen}
        addToWishlist={addToWishlist}
        currency={currency}
        setCurrency={setCurrency}
        exchangeRate={CURRENCIES}
      />

      {/* 8. MOBILE FLOATING FOOTER */}
      <div className="mobile-only mobile-bottom-bar text-gray text-[10px] font-bold uppercase tracking-widest">
        <button onClick={() => navigateTo('/')} className="flex flex-col items-center gap-1 hover:text-gold">Home</button>
        <button onClick={() => navigateTo('/gemstone-recommendation')} className="flex flex-col items-center gap-1 text-gold"><Sparkles size={14} /> Astro</button>
        <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center gap-1 hover:text-gold">Bag ({cart.reduce((s, i) => s + i.qty, 0)})</button>
        <button onClick={() => navigateTo('/contact-us')} className="flex flex-col items-center gap-1 hover:text-gold">Contact</button>
      </div>

      {/* 9. GLOBAL PREMIUM FOOTER */}
      <footer className="bg-secondary-dark border-t border-white/5 pt-16 pb-8 text-xs text-gray">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand profile */}
          <div className="space-y-4">
            <span className="font-serif text-base font-bold text-white tracking-wider block">JAIPUR <span className="text-gold">RASHI</span> GEMS</span>
            <p className="text-[11px] text-gray/80 leading-relaxed">Pioneers of unheated, chemically untampered natural Loose Rashi Ratnas matching planetary frequencies under absolute Vedic compliance.</p>
          </div>
          
          {/* Brand links */}
          <div className="space-y-3 flex flex-col">
            <span className="text-white font-serif italic text-sm block mb-1">Company Profile</span>
            <span onClick={() => navigateTo('/about-us')} className="hover:text-gold cursor-pointer">About Us</span>
            <span onClick={() => navigateTo('/blog')} className="hover:text-gold cursor-pointer">GemPundit Blog</span>
            <span onClick={() => navigateTo('/custom-jewelry')} className="hover:text-gold cursor-pointer">Custom Jewelry</span>
            <span onClick={() => navigateTo('/vault')} className="hover:text-gold cursor-pointer">Private Vault</span>
          </div>

          {/* Quick Tools */}
          <div className="space-y-3 flex flex-col">
            <span className="text-white font-serif italic text-sm block mb-1">Astrological Tools</span>
            <span onClick={() => navigateTo('/gemstone-recommendation')} className="hover:text-gold cursor-pointer">Gem Recommendation</span>
            <span onClick={() => navigateTo('/carat-to-ratti-converter')} className="hover:text-gold cursor-pointer">Carat to Ratti Converter</span>
            <span onClick={() => navigateTo('/gold-rate')} className="hover:text-gold cursor-pointer">Live Gold Rates</span>
            <span onClick={() => navigateTo('/gemstones-wholesaler')} className="hover:text-gold cursor-pointer">Wholesaler Inquiry</span>
          </div>

          {/* Policy guides */}
          <div className="space-y-3 flex flex-col">
            <span className="text-white font-serif italic text-sm block mb-1">Policies</span>
            <span onClick={() => navigateTo('/faqs')} className="hover:text-gold cursor-pointer">FAQs</span>
            <span onClick={() => navigateTo('/shipping-policy')} className="hover:text-gold cursor-pointer">Shipping Policy</span>
            <span onClick={() => navigateTo('/privacy-policy')} className="hover:text-gold cursor-pointer">Privacy Policy</span>
            <span onClick={() => navigateTo('/return-exchange')} className="hover:text-gold cursor-pointer">Returns & Exchange</span>
            <span onClick={() => navigateTo('/payment-methods')} className="hover:text-gold cursor-pointer">Payment Options</span>
          </div>
        </div>

        {/* copyright and payments */}
        <div className="container border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-gray/60 font-bold">
          <span>© 2026 JAIPUR RASHI GEMS. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-4">
            <span>Verified GIA / IGI Sourcing</span>
            <span>Secure 256-bit SSL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
