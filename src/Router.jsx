import React, { useState, useEffect } from 'react';
import { CATEGORIES, PRODUCTS, BLOGS, GOLD_RATES } from './database';
import GemRenderer from './components/GemRenderer';
import AstroWizard from './components/AstroWizard';
import { Sparkles, ArrowRight, ShieldCheck, Heart, ShoppingBag, Search, HelpCircle, Star, Phone, Award, Compass, RefreshCw, Send, Check } from 'lucide-react';

// Custom lightweight URL router watching history state
export default function Router({ cart, toggleCart, addToCart, wishlist, toggleWishlist, addToWishlist, currency, setCurrency, exchangeRate }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);
    // Listen to custom pushState events
    window.addEventListener('pushstate-changed', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate-changed', handleLocationChange);
    };
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('pushstate-changed'));
  };

  // Dynamically set HTML Meta details for SEO
  useEffect(() => {
    let title = "Jaipur Rashi Gems | Natural Loose Gemstones & Jewelry";
    let desc = "Buy 100% Natural and original loose gemstones and jewelry online at the best prices. Sourced from origins.";

    if (currentPath === '/') {
      title = "Jaipur Rashi Gems | Natural Gemstones Online & Astrological jewelry";
    } else if (currentPath.startsWith('/gemstones/')) {
      const categoryId = currentPath.split('/')[2];
      const cat = [...CATEGORIES.zodiac, ...CATEGORIES.vedic, ...CATEGORIES.exclusive, ...CATEGORIES.other].find(c => c.id === categoryId);
      if (cat) {
        title = `${cat.name} Stone - Buy Online 100% Natural | Jaipur Rashi Gems`;
        desc = `Buy premium ${cat.name} loose gemstone certified by top international laboratories. Free astrological recommendation available.`;
      }
    } else if (currentPath === '/gemstones') {
      title = "Loose Gemstones Shop - 100% Certified Natural Gemstones | JRG";
    } else if (currentPath.startsWith('/jewellery')) {
      title = "Premium Gemstone Jewelry Designs - Rings, Pendants & Bracelets | JRG";
    } else if (currentPath === '/gemstone-recommendation') {
      title = "Free Astrological Gemstone Recommendation Tool | Vedic Astro";
    }

    document.title = title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
  }, [currentPath]);

  // Convert prices safely
  const formatPrice = (usdPrice) => {
    const rate = exchangeRate[currency] || 1;
    const symbol = currency === 'INR' ? '₹' : currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$';
    return `${symbol}${Math.round(usdPrice * rate).toLocaleString()}`;
  };

  // Helper variables for routing parameters
  const segments = currentPath.split('/');
  const subPage = segments[1];
  const param = segments[2];

  // Route Dispatcher
  return (
    <main className="flex-1 pb-16">
      {/* Dynamic breadcrumb header for inner pages */}
      {currentPath !== '/' && (
        <div className="bg-secondary-dark/60 border-b border-white/5 py-4">
          <div className="container flex gap-2 text-xs text-gray uppercase tracking-widest">
            <span className="cursor-pointer hover:text-gold" onClick={() => navigateTo('/')}>Home</span>
            <span>/</span>
            {subPage && <span className={`cursor-pointer hover:text-gold ${!param ? 'text-gold font-medium' : ''}`} onClick={() => navigateTo(`/${subPage}`)}>{subPage}</span>}
            {param && <span>/</span>}
            {param && <span className="text-gold font-medium">{param.replace(/-/g, ' ')}</span>}
          </div>
        </div>
      )}

      {/* RENDER VIEWS */}

      {/* 1. HOMEPAGE */}
      {currentPath === '/' && (
        <HomeView navigateTo={navigateTo} addToCart={addToCart} addToWishlist={addToWishlist} formatPrice={formatPrice} />
      )}

      {/* 2. ALL GEMSTONES / FILTERS LISTING */}
      {currentPath === '/gemstones' && (
        <GemstonesListingView navigateTo={navigateTo} categoryId="" addToCart={addToCart} addToWishlist={addToWishlist} formatPrice={formatPrice} />
      )}

      {/* 3. SPECIFIC GEMSTONE CATEGORY */}
      {subPage === 'gemstones' && param && (
        <GemstonesListingView navigateTo={navigateTo} categoryId={param} addToCart={addToCart} addToWishlist={addToWishlist} formatPrice={formatPrice} />
      )}

      {/* 4. DYNAMIC GEMSTONE / JEWELRY DETAILS */}
      {subPage === 'product' && param && (
        <ProductDetailsView productId={param} addToCart={addToCart} addToWishlist={addToWishlist} formatPrice={formatPrice} />
      )}

      {/* 5. JEWELRY MAIN LISTING */}
      {currentPath === '/jewellery' && (
        <JewelryListingView navigateTo={navigateTo} type="" addToCart={addToCart} addToWishlist={addToWishlist} formatPrice={formatPrice} />
      )}

      {/* 6. SPECIFIC JEWELRY TYPE */}
      {subPage === 'jewellery' && param && (
        <JewelryListingView navigateTo={navigateTo} type={param} addToCart={addToCart} addToWishlist={addToWishlist} formatPrice={formatPrice} />
      )}

      {/* 7. ENGAGEMENT RINGS */}
      {currentPath === '/engagement-rings' && (
        <EngagementRingsView navigateTo={navigateTo} addToCart={addToCart} addToWishlist={addToWishlist} formatPrice={formatPrice} />
      )}

      {/* 8. ASTROLOGY RECOMMENDATION */}
      {currentPath === '/gemstone-recommendation' && (
        <div className="container py-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-4xl font-serif mb-4"><span className="text-gold">Astrological</span> Gem Recommendation</h2>
            <p className="text-gray text-sm">Discover your correct birthstone (Rashi Ratna) based on deep astronomical mappings of planetary transits and Vedic Lagna calculations.</p>
          </div>
          <AstroWizard />
        </div>
      )}

      {/* 9. PREMIUM VAULT */}
      {currentPath === '/vault' && (
        <VaultView navigateTo={navigateTo} formatPrice={formatPrice} />
      )}

      {/* 10. CUSTOM JEWELRY STEPS */}
      {currentPath === '/custom-jewelry' && (
        <CustomJewelryView />
      )}

      {/* 11. GOLD RATE CHECKER */}
      {currentPath === '/gold-rate' && (
        <GoldRateView />
      )}

      {/* 12. WHOLSALER INQUIRY */}
      {currentPath === '/gemstones-wholesaler' && (
        <WholesalerView />
      )}

      {/* 13. RATTI TO CARAT CONVERTER */}
      {currentPath === '/carat-to-ratti-converter' && (
        <RattiConverterView />
      )}

      {/* 14. BLOG ARTICLES */}
      {currentPath === '/blog' && (
        <BlogListView navigateTo={navigateTo} />
      )}
      {subPage === 'blog' && param && (
        <BlogDetailView slug={param} />
      )}

      {currentPath === '/admin' && (
        <AdminDashboardView formatPrice={formatPrice} />
      )}
      {/* 15. INFORMATIONAL & STATIC PAGES */}
      {currentPath === '/about-us' && <StaticPage title="About Us" content="Jaipur Rashi Gems is an elite, premium luxury boutique gemstone collection house carrying deep expertise in sourcing unheated, natural rashi ratnas directly from historic mineral mines (Ceylon, Burma, Zambia). Sincerity, scientific testing, and astrological sanctity define our brand trust." />}
      {currentPath === '/contact-us' && <ContactView />}
      {currentPath === '/faqs' && <FaqView />}
      {currentPath === '/shipping-policy' && <StaticPage title="Shipping Policy" content="Jaipur Rashi Gems offers insured, signature-required global express shipping via FedEx, DHL, and UPS. All orders include full insurance coverage during transit to protect your luxury purchases." />}
      {currentPath === '/privacy-policy' && <StaticPage title="Privacy Policy" content="Your privacy is extremely guarded. All details collected (dates of birth, shipping data) are highly encrypted and processed under security compliance guidelines." />}
      {currentPath === '/terms-and-conditions' && <StaticPage title="Terms & Conditions" content="By placing orders on Jaipur Rashi Gems, you agree to planetary authenticity standards and secure invoice policies. All gemstone dimensions are audited by government-certified gemstone testing laboratories." />}
      {currentPath === '/return-exchange' && <StaticPage title="Returns & Exchange" content="To maintain luxury transparency, we support a hassle-free 10-day exchange window with absolute refunds. Note: Custom ring settings or metal mounting might sustain minor labor deductions during returns." />}
      {currentPath === '/ring-size-guide' && <StaticPage title="Ring Size Guide" content="Use our premium virtual millimeter chart to evaluate your correct wearing diameter. Ensure you check sizes in calm atmospheric temperatures for accurate fits." />}
      {currentPath === '/payment-methods' && <StaticPage title="Payment Methods" content="We support major global payment gateways including Stripe, PayPal, Razorpay (for local INR transfers), and direct bank wire setups. Fully PCI-DSS certified processing." />}
    </main>
  );
}

// -------------------------------------------------------------
// CHILD ROUTE VIEWS (All modularized below for speed)
// -------------------------------------------------------------

// [A] Home Page View
function HomeView({ navigateTo, addToCart, addToWishlist, formatPrice }) {
  const [heroTab, setHeroTab] = useState('gemstone');
  const featuredList = PRODUCTS.filter(p => p.tagline);
  const bestSellers = PRODUCTS.slice(0, 4);

  return (
    <div>
      {/* 1. HERO BANNER */}
      <section className="relative py-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black border-b border-white/5">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-gold uppercase tracking-widest font-semibold text-sm block">Vedic Astrological Gemstones</span>
            <h1 className="text-5xl font-serif leading-tight">Find Your Right <br /><span className="text-gold italic">Destiny Gemstone</span></h1>
            <p className="text-gray text-base max-w-lg">Unlock prosperity, mental harmony, and health. Source 100% natural, certified, unheated loose precious gemstones mounted in expert astrological rings.</p>
            <div className="flex gap-4">
              <button onClick={() => navigateTo('/gemstone-recommendation')} className="gold-btn flex items-center gap-2">Free Recommendation <Sparkles size={16} /></button>
              <button onClick={() => navigateTo('/gemstones')} className="outline-btn">Browse Shop</button>
            </div>
          </div>
          
          {/* Quick Search Widget */}
          <div className="glass-panel p-6 border-gold/40 relative">
            {/* Interactive Tabs */}
            <div className="flex border-b border-white/5 mb-4 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setHeroTab('gemstone')}
                className={`flex-1 pb-2 text-center border-b-2 transition-all ${heroTab === 'gemstone' ? 'border-gold text-gold' : 'border-transparent text-gray'}`}
              >
                By Gemstone
              </button>
              <button
                onClick={() => setHeroTab('purpose')}
                className={`flex-1 pb-2 text-center border-b-2 transition-all ${heroTab === 'purpose' ? 'border-gold text-gold' : 'border-transparent text-gray'}`}
              >
                By Purpose
              </button>
            </div>

            {heroTab === 'gemstone' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray mb-1">Select Stone</label>
                  <select onChange={(e) => navigateTo(`/gemstones/${e.target.value}`)} className="w-full bg-primary-dark border border-white/10 rounded p-3 text-white outline-none focus:border-gold">
                    <option value="">-- Choose Gemstone --</option>
                    {CATEGORIES.zodiac.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray mb-1">Purpose</label>
                    <select onChange={(e) => navigateTo('/gemstone-recommendation')} className="w-full bg-primary-dark border border-white/10 rounded p-3 text-white outline-none focus:border-gold">
                      <option>Any Purpose</option>
                      <option>Career</option>
                      <option>Wealth</option>
                      <option>Health</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray mb-1">Carat Weight</label>
                    <select className="w-full bg-primary-dark border border-white/10 rounded p-3 text-white outline-none focus:border-gold">
                      <option>Any Weight</option>
                      <option>Below 3 Carat</option>
                      <option>3 - 5 Carat</option>
                      <option>5 - 7 Carat</option>
                    </select>
                  </div>
                </div>
                <button onClick={() => navigateTo('/gemstones')} className="w-full gold-btn flex justify-center items-center gap-2 mt-2">Search Gems <Search size={16} /></button>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                <label className="block text-xs text-gray mb-2">What is your primary astrological life goal?</label>
                <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold uppercase tracking-wider">
                  {['General', 'Health', 'Career', 'Wealth', 'Education', 'Relationships'].map(goal => (
                    <button
                      key={goal}
                      onClick={() => navigateTo('/gemstone-recommendation')}
                      className="p-3 bg-primary-dark border border-white/5 rounded text-white hover:border-gold hover:text-gold transition-colors"
                    >
                      {goal}
                    </button>
                  ))}
                </div>
                <button onClick={() => navigateTo('/gemstone-recommendation')} className="w-full gold-btn flex justify-center items-center gap-2 mt-4">Astrologer Recommendation <Sparkles size={14} /></button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. FEATURED GEMSTONES GRID */}
      <section className="py-20 container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-serif mb-4">Products of <span className="text-gold">Trusted Excellence</span></h2>
          <p className="text-gray text-sm">Every gem we offer carries strict laboratory certifications and possesses pristine unheated natural state matching elite rashi requirements.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredList.map(gem => (
            <div key={gem.id} className="glass-panel p-6 border-gold/10 hover:border-gold/40 text-center flex flex-col items-center group transition-all duration-300">
              <GemRenderer category={gem.category} size="md" className="mb-4" />
              <h4 className="font-serif text-lg font-semibold text-white group-hover:text-gold transition-colors">{gem.name.split(' (')[0]}</h4>
              <p className="text-xs text-gray/80 italic mt-1 font-serif">"{gem.tagline}"</p>
              <button onClick={() => navigateTo(`/gemstones/${gem.category}`)} className="text-xs text-gold flex items-center gap-1 mt-4 border-b border-gold pb-0.5 hover:gap-2">Explore <ArrowRight size={10} /></button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. GEMSTONE JEWELLERY BANNER */}
      <section className="bg-secondary-dark border-y border-white/5 py-16">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-gold uppercase tracking-widest font-semibold text-xs block mb-2">Exquisite Craftsmanship</span>
            <h2 className="text-3xl font-serif mb-4">Vedic Energized Custom Jewelry</h2>
            <p className="text-gray text-sm mb-6">Create customizable Rings, Pendants, and Bracelets in Hallmarked Gold or authentic Panchdhatu. Sized accurately to touch your skin to conduct raw planetary frequencies.</p>
            <button onClick={() => navigateTo('/custom-jewelry')} className="gold-btn">Design Custom Jewelry</button>
          </div>
          <div className="relative h-64 bg-gradient-to-tr from-neutral-900 to-neutral-950 border border-gold/20 rounded-lg flex items-center justify-center overflow-hidden">
            <span className="text-neutral-800 text-7xl font-serif italic absolute opacity-20">Luxury Gold</span>
            <div className="z-10 text-center">
              <h4 className="text-xl font-serif text-gold italic">Hallmark Gold & Silver</h4>
              <p className="text-xs text-gray mt-2">100% Skin Friendly Astrological Mountings</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BESTSELLERS */}
      <section className="py-20 container">
        <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-serif">Our Astrological <span className="text-gold">Bestsellers</span></h2>
          <button onClick={() => navigateTo('/gemstones')} className="text-gold text-xs flex items-center gap-1 hover:gap-2">View All Products <ArrowRight size={12} /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {bestSellers.map(prod => (
            <ProductCard key={prod.id} product={prod} navigateTo={navigateTo} addToCart={addToCart} addToWishlist={addToWishlist} formatPrice={formatPrice} />
          ))}
        </div>
      </section>
    </div>
  );
}

// [B] Product Card Component
function ProductCard({ product, navigateTo, addToCart, addToWishlist, formatPrice }) {
  return (
    <div className="glass-panel overflow-hidden border-gold/10 hover:border-gold/30 group flex flex-col justify-between h-full bg-secondary-dark/40 hover:translate-y-[-4px] transition-all duration-300">
      <div className="relative p-6 flex flex-col items-center bg-primary-dark/30">
        <GemRenderer category={product.category} size="md" className="my-4" />
        <button onClick={(e) => { e.stopPropagation(); addToWishlist(product); }} className="absolute top-4 right-4 text-gray hover:text-gold p-1 bg-white/5 rounded-full transition-colors">
          <Heart size={16} />
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-gold">{product.sku}</div>
          <h4 onClick={() => navigateTo(`/product/${product.id}`)} className="font-serif text-base font-semibold mt-1 mb-2 hover:text-gold cursor-pointer transition-colors leading-tight line-clamp-2">{product.name}</h4>
          
          <div className="flex justify-between text-xs text-gray border-y border-white/5 py-2 my-2">
            <span>Wt: {product.carat} Cts ({product.ratti} Ratti)</span>
            <span>{product.origin.split(' (')[0]}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-serif text-lg font-bold text-white">{formatPrice(product.price)}</span>
          <button onClick={() => addToCart(product)} className="gold-btn px-3 py-2 text-xs flex items-center gap-1.5"><ShoppingBag size={12} /> Add</button>
        </div>
      </div>
    </div>
  );
}

// [C] Gemstone Listing View with Filtering
function GemstonesListingView({ navigateTo, categoryId, addToCart, addToWishlist, formatPrice }) {
  const [originFilter, setOriginFilter] = useState('');
  const [treatmentFilter, setTreatmentFilter] = useState('');

  // Filter dynamic list
  const filteredProducts = PRODUCTS.filter(p => {
    if (categoryId && p.category !== categoryId) return false;
    if (p.type !== 'gemstone') return false;
    if (originFilter && !p.origin.toLowerCase().includes(originFilter.toLowerCase())) return false;
    if (treatmentFilter && !p.treatment.toLowerCase().includes(treatmentFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="container py-12">
      <div className="mb-10 text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-serif mb-2 capitalize">{categoryId ? categoryId.replace(/-/g, ' ') : 'Certified Loose Gemstones'}</h2>
        <p className="text-gray text-xs">Buy unheated and untreated loose precious and semi-precious gemstones. Fully certified with dynamic global delivery options.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <div className="glass-panel p-6 border-gold/10 h-fit space-y-6">
          <h3 className="text-lg font-serif text-gold italic border-b border-white/5 pb-2">Filter Gemstones</h3>
          
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray mb-2">Origin</label>
            <select onChange={(e) => setOriginFilter(e.target.value)} className="w-full bg-primary-dark border border-white/10 rounded p-2.5 text-xs text-white outline-none focus:border-gold">
              <option value="">All Origins</option>
              <option value="Ceylon">Ceylon (Sri Lanka)</option>
              <option value="Burma">Burma (Myanmar)</option>
              <option value="Zambia">Zambia</option>
              <option value="Italy">Italy</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray mb-2">Treatment</label>
            <select onChange={(e) => setTreatmentFilter(e.target.value)} className="w-full bg-primary-dark border border-white/10 rounded p-2.5 text-xs text-white outline-none focus:border-gold">
              <option value="">All Treatments</option>
              <option value="Unheated">Unheated & Untreated</option>
              <option value="Oil">Insignificant Oil</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 glass-panel border-gold/10">
              <HelpCircle size={48} className="text-gold mx-auto mb-4" />
              <h4 className="text-lg font-serif">No Matching Gemstones Found</h4>
              <p className="text-xs text-gray mt-1">Try resetting your origin or treatment filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} navigateTo={navigateTo} addToCart={addToCart} addToWishlist={addToWishlist} formatPrice={formatPrice} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// [D] Jewelry Listing View
function JewelryListingView({ navigateTo, type, addToCart, addToWishlist, formatPrice }) {
  const filteredJewelry = PRODUCTS.filter(p => {
    if (p.type !== 'jewellery') return false;
    if (type && p.subType !== type) return false;
    return true;
  });

  return (
    <div className="container py-12">
      <div className="mb-10 text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-serif mb-2 capitalize">{type ? `${type} collection` : 'Exquisite Gemstone Jewelry'}</h2>
        <p className="text-gray text-xs">Vedic energized astrological jewelry hand-made in pure 18k Hallmark Gold or solid 925 Silver.</p>
      </div>

      {filteredJewelry.length === 0 ? (
        <div className="text-center py-16 glass-panel border-gold/10">
          <HelpCircle size={48} className="text-gold mx-auto mb-4" />
          <h4 className="text-lg font-serif">No Jewelry Items Found</h4>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredJewelry.map(prod => (
            <ProductCard key={prod.id} product={prod} navigateTo={navigateTo} addToCart={addToCart} addToWishlist={addToWishlist} formatPrice={formatPrice} />
          ))}
        </div>
      )}
    </div>
  );
}

// [E] Product Details View
function ProductDetailsView({ productId, addToCart, addToWishlist, formatPrice }) {
  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-2xl font-serif">Product Not Found</h2>
      </div>
    );
  }

  return (
    <div className="container py-12 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Gemstone Visualizer showcase */}
        <div className="glass-panel p-12 border-gold/10 bg-secondary-dark/30 flex items-center justify-center min-h-[380px]">
          <GemRenderer category={product.category} size="xl" />
        </div>

        {/* Right: Product summary */}
        <div className="space-y-6">
          <div className="text-xs uppercase font-bold tracking-widest text-gold bg-gold/10 p-2 rounded w-fit border border-gold/20">{product.sku}</div>
          <h2 className="text-3xl font-serif">{product.name}</h2>
          <p className="text-2xl text-gold font-bold">{formatPrice(product.price)}</p>
          
          <div className="text-sm text-gray/90 border-t border-white/5 pt-4">
            {product.description}
          </div>

          <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-4 my-4 text-xs">
            <div><span className="text-gray">Weight:</span> {product.carat} Cts ({product.ratti} Ratti)</div>
            <div><span className="text-gray">Origin:</span> {product.origin}</div>
            <div><span className="text-gray">Treatment:</span> {product.treatment}</div>
            <div><span className="text-gray">Shape:</span> {product.shape}</div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => addToCart(product)} className="flex-1 gold-btn flex justify-center items-center gap-2"><ShoppingBag size={18} /> Buy Now</button>
            <button onClick={() => addToWishlist(product)} className="outline-btn flex items-center justify-center"><Heart size={18} /></button>
          </div>
        </div>
      </div>

      {/* Specifications & Laboratory report detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
        <div className="glass-panel p-6 border-gold/10 space-y-4">
          <h4 className="text-lg font-serif text-gold italic border-b border-white/5 pb-2">Technical Specifications</h4>
          <table className="w-full text-xs text-left space-y-2">
            <tbody>
              {Object.entries(product.specs || {}).map(([k, v]) => (
                <tr key={k} className="border-b border-white/5 py-2">
                  <td className="text-gray py-2.5 font-medium">{k}</td>
                  <td className="text-white py-2.5">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-panel p-6 border-gold/10 space-y-4 flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-serif text-gold italic border-b border-white/5 pb-2">Planetary Amulet Alignment</h4>
            <p className="text-xs text-gray mt-3 leading-relaxed">This loose natural stone complies accurately with traditional Astrological parameters. It is completely untreated by chemicals, glass fillings, or intense heat cycles, rendering it chemically pure to transmit the stellar rays of its ruling celestial planet directly into the wearer\'s energy field.</p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded border border-white/5 mt-4">
            <ShieldCheck className="text-gold shrink-0" size={28} />
            <div>
              <span className="text-xs font-bold text-white block">Government Approved Laboratory Certificate Included</span>
              <span className="text-[10px] text-gray">Verifiable reports accompanying every shipment.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// [F] Engagement Rings View
function EngagementRingsView({ navigateTo, addToCart, addToWishlist, formatPrice }) {
  const list = PRODUCTS.filter(p => p.category.includes('engagement-ring'));

  return (
    <div className="container py-12">
      <div className="mb-10 text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-serif mb-2">Luxury Engagement Rings</h2>
        <p className="text-gray text-xs">Commit a lifetime of pure stellar romance. Solid 18k White Gold, Diamond accents, and unheated Natural Sapphires.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {list.map(prod => (
          <ProductCard key={prod.id} product={prod} navigateTo={navigateTo} addToCart={addToCart} addToWishlist={addToWishlist} formatPrice={formatPrice} />
        ))}
      </div>
    </div>
  );
}

// [G] Premium Vault View
function VaultView({ navigateTo, formatPrice }) {
  const vaultItems = PRODUCTS.filter(p => p.price > 1200);

  return (
    <div className="container py-12">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-serif mb-2 text-gold">The Luxury Astrological Vault</h2>
        <p className="text-gray text-xs">A collection of rare, high-carat Ceylon sapphires and Burmese Rubies certified by global elite houses (GIA, GRS, Gübelin) for collectors and premium seekers.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {vaultItems.map(item => (
          <div key={item.id} className="glass-panel p-6 border-gold/40 text-center flex flex-col justify-between items-center bg-gradient-to-b from-neutral-900 to-black hover:scale-105 transition-transform duration-300">
            <Award size={36} className="text-gold mb-4" />
            <GemRenderer category={item.category} size="lg" className="mb-4" />
            <h4 className="font-serif text-lg text-white font-semibold">{item.name}</h4>
            <div className="text-xs text-gold/80 italic my-2">Weight: {item.carat} Carats</div>
            <div className="text-lg font-bold text-white mt-2">{formatPrice(item.price)}</div>
            <button onClick={() => navigateTo(`/product/${item.id}`)} className="gold-btn mt-6 w-full">Request Private Viewing</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// [H] Custom Jewelry Step Builder View
function CustomJewelryView() {
  const [step, setStep] = useState(1);

  return (
    <div className="container py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif mb-2"><span className="text-gold">Custom Jewelry</span> Creation</h2>
        <p className="text-gray text-xs">Transform your specific design sketches into high-fidelity astronomical rings and pendants. Clean 4-step process.</p>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-10 text-center text-xs uppercase tracking-widest text-gray font-bold">
        {['1. Idea', '2. Sketch', '3. 3D Model', '4. Mesmerize'].map((s, idx) => (
          <div key={s} className={`pb-2 border-b-2 ${step === idx + 1 ? 'border-gold text-gold' : 'border-white/5'}`}>{s}</div>
        ))}
      </div>

      <div className="glass-panel p-8 border-gold/20 bg-secondary-dark/30 text-center space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-gold">Step 1: Share Your Artistic Idea</h3>
            <p className="text-gray text-sm max-w-md mx-auto">Upload reference models, suggest the specific planetary stone size, and designate metal compositions (Panchdhatu, Gold, or Silver).</p>
            <div className="p-12 border-2 border-dashed border-white/10 rounded-lg hover:border-gold cursor-pointer">
              <span className="text-gray text-xs block mb-2">Drag and drop file or reference image here</span>
              <button className="outline-btn py-2 text-xs">Browse files</button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-gold">Step 2: Get a Professional Cad Sketch</h3>
            <p className="text-gray text-sm max-w-md mx-auto">Our jewelry architects generate detailed vector renders displaying exact facet placements and contact nodes.</p>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-gold">Step 3: View Interactive 3D Model</h3>
            <p className="text-gray text-sm max-w-md mx-auto">Inspect custom 3D model with rotatable configurations before mounting the physical metal structures.</p>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-gold">Step 4: Astrologically Cleansed & Shipped</h3>
            <p className="text-gray text-sm max-w-md mx-auto">Your ring is purified in temple energization ceremonies and dispatched with verified laboratory reports.</p>
          </div>
        )}

        <div className="flex gap-4 pt-6 border-t border-white/5 justify-between">
          <button disabled={step === 1} onClick={() => setStep(prev => prev - 1)} className="outline-btn py-2 text-xs disabled:opacity-30">Previous Step</button>
          <button disabled={step === 4} onClick={() => setStep(prev => prev + 1)} className="gold-btn py-2 text-xs disabled:opacity-30">Next Step</button>
        </div>
      </div>
    </div>
  );
}

// [I] Gold Rate Live Checker
function GoldRateView() {
  const [rates, setRates] = useState(GOLD_RATES.rates);

  return (
    <div className="container py-12 max-w-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif mb-2"><span className="text-gold">Live Gold Rates</span> Dashboard</h2>
        <p className="text-gray text-xs">Live Hallmark Gold and Silver pricing updated to ensure luxury metal transparency.</p>
      </div>

      <div className="glass-panel p-6 border-gold/20 bg-secondary-dark/30 space-y-6">
        <div className="flex justify-between items-center text-xs text-gray border-b border-white/5 pb-2">
          <span>Purity Matrix</span>
          <span>Price Per Gram (USD)</span>
        </div>
        <div className="space-y-4">
          {rates.map(r => (
            <div key={r.purity} className="flex justify-between items-center text-sm font-semibold">
              <span className="text-white">{r.purity}</span>
              <span className="text-gold">${r.ratePerGram.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// [J] Wholesaler Inquiry Form
function WholesalerView() {
  const [sent, setSent] = useState(false);

  return (
    <div className="container py-12 max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif mb-2">Wholesale <span className="text-gold">Gemstones</span></h2>
        <p className="text-gray text-xs">Access massive parcel lots and competitive wholesale discounts for jewelers and astro-houses.</p>
      </div>

      {sent ? (
        <div className="glass-panel p-8 text-center border-gold/30 space-y-4">
          <Check className="text-gold h-12 w-12 mx-auto" />
          <h3 className="text-xl font-serif">Inquiry Transmitted</h3>
          <p className="text-xs text-gray">Our bulk sales director will communicate within 12 working hours.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="glass-panel p-6 border-gold/20 bg-secondary-dark/30 space-y-4">
          <div>
            <label className="block text-xs text-gray mb-1">Company Name</label>
            <input required type="text" className="w-full bg-primary-dark border border-white/10 rounded p-2.5 text-xs focus:border-gold outline-none" />
          </div>
          <div>
            <label className="block text-xs text-gray mb-1">Business Email</label>
            <input required type="email" className="w-full bg-primary-dark border border-white/10 rounded p-2.5 text-xs focus:border-gold outline-none" />
          </div>
          <div>
            <label className="block text-xs text-gray mb-1">Target Gemstones (e.g., Zambian Emerald, Ceylon Sapphire)</label>
            <textarea required rows={3} className="w-full bg-primary-dark border border-white/10 rounded p-2.5 text-xs focus:border-gold outline-none"></textarea>
          </div>
          <button type="submit" className="w-full gold-btn py-2 text-xs flex justify-center items-center gap-2">Submit Wholesaler Form <Send size={12} /></button>
        </form>
      )}
    </div>
  );
}

// [K] Carat to Ratti Converter
function RattiConverterView() {
  const [carat, setCarat] = useState('');
  const [ratti, setRatti] = useState('');

  const calculate = (val, type) => {
    if (type === 'carat') {
      setCarat(val);
      setRatti(val ? (val * 1.096).toFixed(3) : '');
    } else {
      setRatti(val);
      setCarat(val ? (val / 1.096).toFixed(3) : '');
    }
  };

  return (
    <div className="container py-12 max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif mb-2"><span className="text-gold">Carat to Ratti</span> Calculator</h2>
        <p className="text-gray text-xs">Vedic Astrology weights gemstones in Ratti, whereas scientific labs check weights in Carats. Use this calculator for safe alignment.</p>
      </div>

      <div className="glass-panel p-6 border-gold/20 bg-secondary-dark/30 space-y-6">
        <div>
          <label className="block text-xs text-gray mb-2">Weight in Carat (Ct)</label>
          <input
            type="number"
            value={carat}
            onChange={(e) => calculate(e.target.value, 'carat')}
            className="w-full bg-primary-dark border border-white/10 rounded p-3 text-white focus:border-gold outline-none"
            placeholder="e.g. 5.50"
          />
        </div>
        <div className="flex justify-center items-center">
          <RefreshCw className="text-gold rotate-90" />
        </div>
        <div>
          <label className="block text-xs text-gray mb-2">Weight in Ratti</label>
          <input
            type="number"
            value={ratti}
            onChange={(e) => calculate(e.target.value, 'ratti')}
            className="w-full bg-primary-dark border border-white/10 rounded p-3 text-white focus:border-gold outline-none"
            placeholder="e.g. 6.02"
          />
        </div>
      </div>
    </div>
  );
}

// [L] Blog List View
function BlogListView({ navigateTo }) {
  return (
    <div className="container py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif mb-2"><span className="text-gold">Jaipur Rashi Gems</span> Blog</h2>
        <p className="text-gray text-xs">Read historic Vedic gemstone research, energization guides, and astrological finger mappings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOGS.map(blog => (
          <div key={blog.slug} className="glass-panel overflow-hidden border-gold/10 hover:border-gold/30 flex flex-col justify-between">
            <div className="h-48 bg-neutral-900 border-b border-white/5 flex items-center justify-center text-gold font-serif italic text-3xl">Astrology Guide</div>
            <div className="p-6 space-y-4">
              <span className="text-[10px] text-gold uppercase tracking-widest block">{blog.date}</span>
              <h3 onClick={() => navigateTo(`/blog/${blog.slug}`)} className="text-lg font-serif font-semibold hover:text-gold cursor-pointer transition-colors leading-tight">{blog.title}</h3>
              <p className="text-xs text-gray/80 line-clamp-3">{blog.summary}</p>
              <button onClick={() => navigateTo(`/blog/${blog.slug}`)} className="text-xs text-gold flex items-center gap-1 hover:gap-2">Read Post <ArrowRight size={12} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// [M] Blog Detail View
function BlogDetailView({ slug }) {
  const blog = BLOGS.find(b => b.slug === slug);

  if (!blog) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-2xl font-serif">Article Not Found</h2>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-2xl space-y-6">
      <div className="space-y-2 border-b border-white/5 pb-6">
        <span className="text-xs text-gold font-semibold uppercase tracking-widest">{blog.date} • Written by {blog.author}</span>
        <h2 className="text-3xl font-serif leading-tight">{blog.title}</h2>
      </div>

      <div className="prose prose-invert max-w-none text-sm text-gray/90 space-y-6 whitespace-pre-line">
        {blog.content}
      </div>
    </div>
  );
}

// [N] Static Generic View
function StaticPage({ title, content }) {
  return (
    <div className="container py-12 max-w-2xl">
      <h2 className="text-3xl font-serif text-gold border-b border-white/5 pb-4 mb-6">{title}</h2>
      <p className="text-sm text-gray/90 leading-relaxed">{content}</p>
    </div>
  );
}

// [O] Contact Us View
function ContactView() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container py-12 max-w-xl">
      <h2 className="text-3xl font-serif text-gold text-center border-b border-white/5 pb-4 mb-8">Contact Our Experts</h2>
      
      {submitted ? (
        <div className="glass-panel p-8 text-center border-gold/30 space-y-4">
          <Check className="text-gold h-12 w-12 mx-auto" />
          <h3 className="text-xl font-serif">Message Dispatched</h3>
          <p className="text-xs text-gray">Thank you. An expert gemologist will get in touch with you shortly.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="glass-panel p-6 border-gold/20 bg-secondary-dark/30 space-y-4">
          <div>
            <label className="block text-xs text-gray mb-1">Your Name</label>
            <input required type="text" className="w-full bg-primary-dark border border-white/10 rounded p-2.5 text-xs text-white focus:border-gold outline-none" />
          </div>
          <div>
            <label className="block text-xs text-gray mb-1">Email Address</label>
            <input required type="email" className="w-full bg-primary-dark border border-white/10 rounded p-2.5 text-xs text-white focus:border-gold outline-none" />
          </div>
          <div>
            <label className="block text-xs text-gray mb-1">Your Message</label>
            <textarea required rows={4} className="w-full bg-primary-dark border border-white/10 rounded p-2.5 text-xs text-white focus:border-gold outline-none"></textarea>
          </div>
          <button type="submit" className="w-full gold-btn py-2.5 text-xs flex justify-center items-center gap-2">Send Message <Send size={12} /></button>
        </form>
      )}
    </div>
  );
}

// [P] FAQ View
function FaqView() {
  const faqs = [
    { q: "What are Astrological Gemstones?", a: "Astrological gemstones are unheated, highly transparent, natural stones representing the nine core Vedic planets. Worn on specific fingers to balance cosmic frequencies." },
    { q: "Why choose unheated gemstones?", a: "Heat treatments or chemical fillers satisfy jewelry visual aesthetics but destroy the molecular lattice charges, neutralizing all raw healing properties." },
    { q: "Are Jaipur Rashi Gems certified?", a: "Yes, every single stone carries comprehensive lab reports verifiable online from international and government gemstone testing authorities." }
  ];

  return (
    <div className="container py-12 max-w-2xl">
      <h2 className="text-3xl font-serif text-gold text-center border-b border-white/5 pb-4 mb-8">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {faqs.map((f, idx) => (
          <details key={idx} className="group glass-panel p-4 border-gold/10 hover:border-gold/30">
            <summary className="font-serif text-base font-medium text-white cursor-pointer select-none list-none flex justify-between items-center">
              <span>{f.q}</span>
              <span className="text-gold text-xs transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p className="text-xs text-gray mt-3 leading-relaxed border-t border-white/5 pt-3">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

// [Q] ADMIN DASHBOARD VIEW
function AdminDashboardView({ formatPrice }) {
  const [activeTab, setActiveTab] = useState('metrics');
  const [products, setProducts] = useState(PRODUCTS);
  const [orders, setOrders] = useState([
    { id: 'ORD-8409', customer: 'Amit Kesarwani', date: '30th May 2026', total: 980, status: 'Shipped' },
    { id: 'ORD-5192', customer: 'David Jenkins', date: '29th May 2026', total: 1480, status: 'Processing' },
    { id: 'ORD-2041', customer: 'Vikram Mehta', date: '28th May 2026', total: 640, status: 'Delivered' }
  ]);
  const [inquiries, setInquiries] = useState([
    { id: 'INQ-104', company: 'Royal Jewelers Inc.', email: 'sourcing@royaljewels.com', stone: 'Ceylon Blue Sapphires, Zambian Emeralds', status: 'Pending Review' }
  ]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    price: '',
    carat: '',
    category: 'blue-sapphire',
    treatment: 'Unheated & Untreated',
    origin: 'Ceylon (Sri Lanka)'
  });

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.sku || !newProduct.price) {
      alert('Please fill out the name, SKU and price fields!');
      return;
    }
    const item = {
      id: `gem-admin-${Date.now()}`,
      sku: newProduct.sku,
      name: newProduct.name,
      category: newProduct.category,
      type: 'gemstone',
      price: parseFloat(newProduct.price),
      carat: parseFloat(newProduct.carat || 4.5),
      ratti: parseFloat((newProduct.carat || 4.5) * 1.096).toFixed(2),
      origin: newProduct.origin,
      treatment: newProduct.treatment,
      shape: 'Oval Cut'
    };
    setProducts(prev => [item, ...prev]);
    setNewProduct({
      name: '',
      sku: '',
      price: '',
      carat: '',
      category: 'blue-sapphire',
      treatment: 'Unheated & Untreated',
      origin: 'Ceylon (Sri Lanka)'
    });
    alert('Dynamic Product Added to Active Inventory Database!');
  };

  const handleDeleteProduct = (id) => {
    if (confirm('Are you sure you want to remove this item from active inventory?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6 mb-8">
        <div>
          <h2 className="text-3xl font-serif text-gold">Admin Command Center</h2>
          <p className="text-xs text-gray mt-1">Jaipur Rashi Gems Centralized Control Panel</p>
        </div>
        <div className="flex gap-2">
          {['metrics', 'inventory', 'orders', 'inquiries'].map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === t ? 'bg-gold text-primary-dark' : 'bg-white/5 text-white hover:bg-white/10'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* METRICS VIEW */}
      {activeTab === 'metrics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-panel p-6 border-gold/10">
              <span className="text-[10px] text-gray uppercase tracking-widest block font-bold mb-1">Total Sales Revenue</span>
              <span className="text-3xl font-serif text-gold font-bold">{formatPrice(orders.reduce((sum, o) => sum + o.total, 0))}</span>
            </div>
            <div className="glass-panel p-6 border-gold/10">
              <span className="text-[10px] text-gray uppercase tracking-widest block font-bold mb-1">Active Client Orders</span>
              <span className="text-3xl font-serif text-white font-bold">{orders.length}</span>
            </div>
            <div className="glass-panel p-6 border-gold/10">
              <span className="text-[10px] text-gray uppercase tracking-widest block font-bold mb-1">Products in Stock</span>
              <span className="text-3xl font-serif text-white font-bold">{products.length}</span>
            </div>
            <div className="glass-panel p-6 border-gold/10">
              <span className="text-[10px] text-gray uppercase tracking-widest block font-bold mb-1">Wholesale Inquiries</span>
              <span className="text-3xl font-serif text-gold font-bold">{inquiries.length}</span>
            </div>
          </div>

          <div className="glass-panel p-6 border-gold/10">
            <h3 className="text-lg font-serif text-gold italic border-b border-white/5 pb-2 mb-4">Command Center Logs</h3>
            <div className="space-y-2 text-xs text-gray font-mono">
              <p className="text-emerald-400">[00:36:34 GMT] Admin console initialized cleanly.</p>
              <p className="text-emerald-400">[00:36:34 GMT] Production assets verified: index-D3LKSjxd.js loaded.</p>
              <p className="text-white">[00:35:12 GMT] Order ORD-8409 status altered to SHIPPED.</p>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT INVENTORY VIEWS */}
      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add product form */}
          <div className="glass-panel p-6 border-gold/20 h-fit bg-secondary-dark/30">
            <h3 className="text-lg font-serif text-gold italic border-b border-white/5 pb-2 mb-4">Add Gemstone</h3>
            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray mb-1">Product Name</label>
                <input
                  required
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Ceylon Royal Sapphire"
                  className="w-full bg-primary-dark border border-white/10 rounded p-2 text-white outline-none focus:border-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray mb-1">SKU Code</label>
                  <input
                    required
                    type="text"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    placeholder="e.g. JRG-BS-902"
                    className="w-full bg-primary-dark border border-white/10 rounded p-2 text-white outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-gray mb-1">Carat weight</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.carat}
                    onChange={(e) => setNewProduct({ ...newProduct, carat: e.target.value })}
                    placeholder="e.g. 5.2"
                    className="w-full bg-primary-dark border border-white/10 rounded p-2 text-white outline-none focus:border-gold"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray mb-1">Price (USD)</label>
                  <input
                    required
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="e.g. 950"
                    className="w-full bg-primary-dark border border-white/10 rounded p-2 text-white outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-gray mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-primary-dark border border-white/10 rounded p-2 text-white outline-none focus:border-gold"
                  >
                    <option value="blue-sapphire">Blue Sapphire</option>
                    <option value="emerald">Emerald</option>
                    <option value="ruby">Ruby</option>
                    <option value="yellow-sapphire-pukhraj">Yellow Sapphire</option>
                    <option value="opal">Opal</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full gold-btn py-2 text-xs">Publish to Inventory</button>
            </form>
          </div>

          {/* Active list */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-serif text-gold italic border-b border-white/5 pb-2">Active Inventory List</h3>
            <div className="space-y-3">
              {products.map(p => (
                <div key={p.id} className="glass-panel p-4 border-white/5 bg-secondary-dark/20 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-gold uppercase tracking-wider block font-bold">{p.sku}</span>
                    <h4 className="font-semibold text-white mt-0.5">{p.name}</h4>
                    <span className="text-gray text-[10px] block mt-0.5">Weight: {p.carat} Cts • {p.origin} • {p.treatment}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-white text-sm">{formatPrice(p.price)}</span>
                    <button onClick={() => handleDeleteProduct(p.id)} className="text-red-400 hover:text-white font-bold">DELETE</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ORDERS VIEW */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h3 className="text-lg font-serif text-gold italic border-b border-white/5 pb-2">Order Management</h3>
          <div className="space-y-3">
            {orders.map(o => (
              <div key={o.id} className="glass-panel p-4 border-white/5 bg-secondary-dark/20 flex justify-between items-center text-xs">
                <div>
                  <span className="text-gold font-bold block">{o.id}</span>
                  <h4 className="font-semibold text-white mt-0.5">{o.customer}</h4>
                  <span className="text-gray text-[10px] block mt-0.5">Date: {o.date}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-bold text-white text-sm">{formatPrice(o.total)}</span>
                  <select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    className="bg-primary-dark border border-white/10 rounded p-1.5 text-[10px] font-bold uppercase tracking-wider text-gold focus:border-gold outline-none"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WHOLESALE INQUIRIES VIEW */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          <h3 className="text-lg font-serif text-gold italic border-b border-white/5 pb-2">Corporate Wholesale Requests</h3>
          <div className="space-y-3">
            {inquiries.map(inq => (
              <div key={inq.id} className="glass-panel p-4 border-white/5 bg-secondary-dark/20 text-xs space-y-2">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gold font-bold">{inq.id}</span>
                  <span className="bg-gold/10 text-gold text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-gold/20">{inq.status}</span>
                </div>
                <p><span className="text-gray">Company Profile:</span> {inq.company}</p>
                <p><span className="text-gray">Contact Email:</span> {inq.email}</p>
                <p><span className="text-gray">Target Sourcing Gemstones:</span> {inq.stone}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

