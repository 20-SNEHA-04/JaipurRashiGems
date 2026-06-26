/* ==========================================================================
   JAIPUR RASHI GEMS - CORE ECOMMERCE MOTOR (app.js)
   ========================================================================== */

// 1. COMPREHENSIVE SEEDED PRODUCT CATALOG DATABASE
const INITIAL_PRODUCTS = [
    {
        sku: "GEM-BS-001",
        name: "Premium Kashmir Blue Sapphire (Neelam)",
        category: "precious",
        gemstone: "Blue Sapphire",
        color: "Blue",
        origin: "Kashmir",
        carats: 4.85,
        treatment: "Unheated & Untreated (100% Natural)",
        shape: "Oval Cushion",
        cut: "Faceted",
        certificate: "GIA Certified",
        priceUSD: 14500,
        rashi: ["Capricorn", "Aquarius"],
        planet: "Saturn",
        month: ["September"],
        rating: 5,
        stock: 3,
        symbol: "💎",
        desc: "An exceptionally rare, velvet-blue Kashmir Sapphire possessing the classic 'cornflower' blue hue. Sourced ethically from old Kashmir mines, this high-energy stone is perfectly suited for astrological optimization.",
        faqs: [
            { q: "Who should wear a Kashmir Blue Sapphire?", a: "Vedic astrology recommends Neelam to people undergoing Shani Mahadasha or Sade Sati, particularly Capricorn (Makar) and Aquarius (Kumbh) Ascendants." },
            { q: "Is this stone treated?", a: "No, this Sapphire is entirely unheated and untreated, retaining its pure cosmic properties." }
        ],
        reviews: [
            { author: "Vikram R.", rating: 5, comment: "Magnificent glow. Shani Dev blessings felt instantly." }
        ]
    },
    {
        sku: "GEM-RY-002",
        name: "Imperial Burmese Red Ruby (Manik)",
        category: "precious",
        gemstone: "Ruby",
        color: "Red",
        origin: "Myanmar",
        carats: 3.42,
        treatment: "Unheated & Untreated",
        shape: "Round Brilliant",
        cut: "Excellent",
        certificate: "GRT Certified",
        priceUSD: 8900,
        rashi: ["Leo", "Aries"],
        planet: "Sun",
        month: ["July"],
        rating: 5,
        stock: 5,
        symbol: "🔴",
        desc: "A highly intense 'Pigeon Blood' red Burmese Ruby. Known as the King of Gemstones, Manik activates the Surya (Sun) energies, promoting authority, fame, leadership, and vitality.",
        faqs: [
            { q: "What metal should I set the Ruby in?", a: "It is best set in 18k or 22k Yellow Gold or copper, designed so the base touches the skin." }
        ],
        reviews: [
            { author: "Anjali S.", rating: 5, comment: "Stunning red fire. Exceptional packaging and customer support." }
        ]
    },
    {
        sku: "GEM-EM-003",
        name: "Vibrant Colombia Emerald (Panna)",
        category: "precious",
        gemstone: "Emerald",
        color: "Green",
        origin: "Colombia",
        carats: 5.12,
        treatment: "Minor Oil Only",
        shape: "Emerald Cut",
        cut: "Step Cut",
        certificate: "IGI Certified",
        priceUSD: 7200,
        rashi: ["Gemini", "Virgo"],
        planet: "Mercury",
        month: ["May"],
        rating: 4,
        stock: 8,
        symbol: "💚",
        desc: "A stunning bright green Colombian Emerald with high transparency and rich crystal structure. Panna represents Mercury (Budh) and is praised for enhancing intelligence, communication, and business acumen.",
        faqs: [
            { q: "Is Colombian emerald good for astrology?", a: "Yes, Colombian emeralds are highly potent due to their unique trace chromium elements that grant distinct color and high cosmic energy." }
        ],
        reviews: []
    },
    {
        sku: "GEM-YS-004",
        name: "Royal Ceylon Yellow Sapphire (Pukhraj)",
        category: "precious",
        gemstone: "Yellow Sapphire",
        color: "Yellow",
        origin: "Sri Lanka",
        carats: 6.25,
        treatment: "Unheated & Untreated",
        shape: "Oval Faceted",
        cut: "Ideal Cut",
        certificate: "GIA Certified",
        priceUSD: 5400,
        rashi: ["Sagittarius", "Pisces"],
        planet: "Jupiter",
        month: ["November"],
        rating: 5,
        stock: 4,
        symbol: "💛",
        desc: "Bright lemon-yellow Ceylon Sapphire with brilliant internal reflection. Yellow Sapphire represents Jupiter (Guru) which bestows divine grace, wisdom, sound health, and abundance.",
        faqs: [],
        reviews: []
    },
    {
        sku: "GEM-HN-005",
        name: "Golden Ceylon Hessonite (Gomed)",
        category: "semi-precious",
        gemstone: "Hessonite",
        color: "Yellow", // Amber-Yellowish brown
        origin: "Sri Lanka",
        carats: 7.4,
        treatment: "Untreated",
        shape: "Oval Cushion",
        cut: "Standard Faceted",
        certificate: "GRT Certified",
        priceUSD: 1200,
        rashi: ["Aquarius"],
        planet: "Rahu",
        month: ["January"],
        rating: 4,
        stock: 12,
        symbol: "🔸",
        desc: "Deep honey-colored Ceylon Hessonite Gomed stone. Highly effective in countering the negative shadow-planet effects of Rahu and bringing instant success in litigation and modern tech businesses.",
        faqs: [],
        reviews: []
    },
    {
        sku: "GEM-CE-006",
        name: "Chatoyant Cats Eye (Lehsuniya)",
        category: "semi-precious",
        gemstone: "Cats Eye",
        color: "Green", // Greyish green
        origin: "Sri Lanka",
        carats: 5.3,
        treatment: "Untreated",
        shape: "Oval Cabochon",
        cut: "Smooth dome",
        certificate: "IGI Certified",
        priceUSD: 1600,
        rashi: ["Aries"],
        planet: "Ketu",
        month: [],
        rating: 5,
        stock: 6,
        symbol: "👁️",
        desc: "Possessing an outstanding sharp 'milk-and-honey' chatoyant band of light across its green-grey dome. This Ketu stone stimulates spiritual alignment, shielding the wearer from secret enemies.",
        faqs: [],
        reviews: []
    },
    {
        sku: "GEM-PL-007",
        name: "Lustrous Basra Natural Pearl (Moti)",
        category: "semi-precious",
        gemstone: "Pearl",
        color: "White",
        origin: "Basra",
        carats: 4.15,
        treatment: "100% Natural Pearl",
        shape: "Round Drop",
        cut: "Natural Cabochon",
        certificate: "GIA Certified",
        priceUSD: 9500,
        rashi: ["Cancer"],
        planet: "Moon",
        month: ["June"],
        rating: 5,
        stock: 2,
        symbol: "⚪",
        desc: "Extremely rare Basra pearl with magnificent silvery-white luster. Natural Pearls calm the mind, stabilize emotional imbalances, and represent the planetary energies of Chandra (Moon).",
        faqs: [],
        reviews: []
    },
    {
        sku: "GEM-RC-008",
        name: "Italian Red Coral (Moonga)",
        category: "semi-precious",
        gemstone: "Red Coral",
        color: "Red",
        origin: "Italy",
        carats: 8.65,
        treatment: "Untreated Organic",
        shape: "Cylindrical Capsule",
        cut: "Smooth polished",
        certificate: "GRT Certified",
        priceUSD: 950,
        rashi: ["Aries", "Scorpio"],
        planet: "Mars",
        month: [],
        rating: 4,
        stock: 15,
        symbol: "🍢",
        desc: "Saturated ox-blood red coral harvested from deep Italian waters. Strengthens Mars (Mangal) placement, enhancing physical courage, leadership, and removing blood-related disorders.",
        faqs: [],
        reviews: []
    },
    {
        sku: "JEW-RNG-001",
        name: "Lordship Blue Sapphire Astrological Ring",
        category: "jewelry",
        type: "Ring",
        color: "Blue",
        origin: "Kashmir",
        carats: 3.2,
        treatment: "Unheated",
        shape: "Oval Cushion",
        cut: "Ideal",
        certificate: "GRT Certified",
        priceUSD: 6200,
        rashi: ["Capricorn", "Aquarius"],
        planet: "Saturn",
        month: ["September"],
        rating: 5,
        stock: 2,
        symbol: "💍",
        desc: "A handcrafted 22k yellow gold planetary ring set with a natural Ceylon Blue Sapphire. Formulated with an open-back setting according to ancient Rashi Shastra, allowing the stone's apex to touch the skin.",
        faqs: [],
        reviews: []
    }
];

// 2. INITIALIZE STATE ENGINE
class AppState {
    constructor() {
        this.products = JSON.parse(localStorage.getItem('jrg_products')) || INITIAL_PRODUCTS;
        this.cart = JSON.parse(localStorage.getItem('jrg_cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('jrg_wishlist')) || [];
        this.compare = JSON.parse(localStorage.getItem('jrg_compare')) || [];
        this.inquiries = JSON.parse(localStorage.getItem('jrg_inquiries')) || [];
        this.consultations = JSON.parse(localStorage.getItem('jrg_consultations')) || [];
        
        this.currency = localStorage.getItem('jrg_currency') || 'USD';
        this.language = localStorage.getItem('jrg_language') || 'en';
        this.currencyRates = { USD: 1, INR: 82.5, GBP: 0.81 };
        this.currencySymbols = { USD: '$', INR: '₹', GBP: '£' };
        
        // Sync local storage initially
        this.saveAll();
    }

    saveAll() {
        localStorage.setItem('jrg_products', JSON.stringify(this.products));
        localStorage.setItem('jrg_cart', JSON.stringify(this.cart));
        localStorage.setItem('jrg_wishlist', JSON.stringify(this.wishlist));
        localStorage.setItem('jrg_compare', JSON.stringify(this.compare));
        localStorage.setItem('jrg_inquiries', JSON.stringify(this.inquiries));
        localStorage.setItem('jrg_consultations', JSON.stringify(this.consultations));
        localStorage.setItem('jrg_currency', this.currency);
        localStorage.setItem('jrg_language', this.language);
    }

    formatPrice(amountUSD) {
        const rate = this.currencyRates[this.currency];
        const val = Math.round(amountUSD * rate);
        return `${this.currencySymbols[this.currency]} ${val.toLocaleString()}`;
    }
}

// 3. CORE ROUTING & VIEW ENGINE
class AppRouter {
    constructor() {
        this.state = new AppState();
        this.currentView = 'home';
        this.viewParams = {};
        
        this.initEventListeners();
        this.initVoiceSearch();
        this.initGeolocation();
        
        // Initial Route Trigger
        this.handleHashChange();
    }

    initEventListeners() {
        window.addEventListener('hashchange', () => this.handleHashChange());
        
        // Currency Selector Change
        document.getElementById('currency-select').value = this.state.currency;
        document.getElementById('currency-select').addEventListener('change', (e) => {
            this.state.currency = e.target.value;
            this.state.saveAll();
            this.refreshCurrentView();
            this.updateBadgeCounts();
        });

        // Language Selector Change
        document.getElementById('language-select').value = this.state.language;
        document.getElementById('language-select').addEventListener('change', (e) => {
            this.state.language = e.target.value;
            this.state.saveAll();
            alert(this.state.language === 'hi' ? 'भाषा हिन्दी में परिवर्तित की गई (Mock translation).' : 'Language changed to English.');
            this.refreshCurrentView();
        });
        
        // Autocomplete search suggestions
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (e) => this.showSearchSuggestions(e.target.value));
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                document.getElementById('search-suggestions').style.display = 'none';
            }
        });

        // Auto Boot Solar System Canvas if already on home view
        setTimeout(() => {
            if (this.currentView === 'home' && window.initCosmicSolarHero) {
                window.initCosmicSolarHero();
                if (window.cosmicSuite) {
                    window.cosmicSuite.initZodiacWheel('zodiac-webgl-canvas-container');
                    window.cosmicSuite.initPlanetaryOrbits('planets-webgl-canvas-container');
                }
            }
        }, 500);
    }

    initGeolocation() {
        const locText = document.getElementById('current-location');
        if (navigator.geolocation) {
            // Quick location check mock to deliver high prestige location targeting
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    locText.innerText = "London, UK (Premium Shipping active)";
                },
                (err) => {
                    locText.innerText = "New Delhi, IN (Express Shipping)";
                },
                { timeout: 3000 }
            );
        } else {
            locText.innerText = "Global Luxury Hub";
        }
    }

    // Dynamic SEO, schema, and page updates
    handleHashChange() {
        const hash = window.location.hash || '#home';
        const parts = hash.split('?');
        const view = parts[0].substring(1);
        
        const params = {};
        if (parts[1]) {
            const queryParams = new URLSearchParams(parts[1]);
            for (const [key, value] of queryParams) {
                params[key] = value;
            }
        }
        
        this.navigate(view, params, false);
    }

    navigate(view, params = {}, updateHash = true) {
        this.currentView = view;
        this.viewParams = params;
        
        if (updateHash) {
            let hashStr = `#${view}`;
            if (Object.keys(params).length > 0) {
                const searchParams = new URLSearchParams(params);
                hashStr += `?${searchParams.toString()}`;
            }
            window.location.hash = hashStr;
            return;
        }

        // Apply visual loader before drawing
        const container = document.getElementById('app-viewport');
        container.innerHTML = `
            <div class="luxury-loader">
                <div class="gold-spinner"></div>
                <p>Aligning celestial bodies...</p>
            </div>
        `;

        setTimeout(() => {
            this.renderView(view, params);
            this.updateBadgeCounts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Programmatically inject SEO data using seo.js helper
            if (window.seoManager) {
                window.seoManager.optimizeSEO(view, params, this.state.products);
            }
        }, 300);
    }

    refreshCurrentView() {
        this.renderView(this.currentView, this.viewParams);
    }

    updateBadgeCounts() {
        const wishlistEl = document.getElementById('wishlist-count');
        const cartEl = document.getElementById('cart-count');
        const compareEl = document.getElementById('compare-count');
        const compareTrayEl = document.getElementById('compare-tray-count');

        if (wishlistEl) wishlistEl.innerText = this.state.wishlist.length;
        if (cartEl) cartEl.innerText = this.state.cart.length;
        if (compareEl) compareEl.innerText = this.state.compare.length;
        if (compareTrayEl) compareTrayEl.innerText = this.state.compare.length;
    }

    renderView(view, params) {
        const container = document.getElementById('app-viewport');
        
        switch (view) {
            case 'home':
                container.innerHTML = this.getViewHome();
                if (window.initCosmicSolarHero) {
                    setTimeout(() => {
                        window.initCosmicSolarHero();
                        if (window.cosmicSuite) {
                            window.cosmicSuite.initZodiacWheel('zodiac-webgl-canvas-container');
                            window.cosmicSuite.initPlanetaryOrbits('planets-webgl-canvas-container');
                        }
                    }, 100);
                }
                break;
            case 'collection':
                container.innerHTML = this.getViewCollection(params);
                break;
            case 'product-detail':
                container.innerHTML = this.getViewProductDetail(params.sku);
                break;
            case 'recommendation':
                container.innerHTML = this.getViewRecommendation();
                break;
            case 'compare':
                container.innerHTML = this.getViewCompare();
                break;
            case 'cart-checkout':
            case 'checkout':
                container.innerHTML = this.getViewCheckout();
                break;
            case 'about':
                container.innerHTML = this.getViewAbout();
                break;
            case 'contact':
                container.innerHTML = this.getViewContact();
                break;
            case 'faq':
                container.innerHTML = this.getViewFAQ();
                break;
            case 'education':
                container.innerHTML = this.getViewEducation(params.article);
                break;
            case 'admin':
                if (window.adminDashboard) {
                    container.innerHTML = window.adminDashboard.renderDashboard(this);
                } else {
                    container.innerHTML = `<div class="section-wrapper"><p>Admin engine failed to initialize.</p></div>`;
                }
                break;
            default:
                container.innerHTML = this.getViewHome();
                if (window.initCosmicSolarHero) {
                    setTimeout(() => {
                        window.initCosmicSolarHero();
                        if (window.cosmicSuite) {
                            window.cosmicSuite.initZodiacWheel('zodiac-webgl-canvas-container');
                            window.cosmicSuite.initPlanetaryOrbits('planets-webgl-canvas-container');
                        }
                    }, 100);
                }
        }
    }

    // 4. MOCK AI VOICE SEARCH ENGINE
    initVoiceSearch() {
        const btn = document.getElementById('voice-search-btn');
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = "en-US";
            
            btn.addEventListener('click', () => {
                recognition.start();
                btn.style.color = '#ff3366'; // active recording hue
                alert("Celestial Voice Search activated. Speak now (e.g. 'Blue Sapphire for Saturn', 'Red Ruby').");
            });

            recognition.onresult = (e) => {
                const speech = e.results[0][0].transcript;
                document.getElementById('search-input').value = speech;
                btn.style.color = 'var(--champagne-muted)';
                this.handleSearch(speech);
            };

            recognition.onerror = () => {
                btn.style.color = 'var(--champagne-muted)';
            };
        } else {
            btn.addEventListener('click', () => {
                const mockSpeech = prompt("Voice command simulated. Type search keyword below:", "Rubies for Leo");
                if (mockSpeech) {
                    document.getElementById('search-input').value = mockSpeech;
                    this.handleSearch(mockSpeech);
                }
            });
        }
    }

    handleSearch(queryOverride = null) {
        const val = queryOverride || document.getElementById('search-input').value.trim();
        if (!val) return;
        
        // Parse search intent
        this.navigate('collection', { search: val });
    }

    showSearchSuggestions(val) {
        const suggestionsBox = document.getElementById('search-suggestions');
        if (!val.trim()) {
            suggestionsBox.style.display = 'none';
            return;
        }
        
        const key = val.toLowerCase();
        const matches = this.state.products.filter(p => 
            p.name.toLowerCase().includes(key) || 
            p.gemstone.toLowerCase().includes(key) || 
            (p.planet && p.planet.toLowerCase().includes(key)) ||
            p.rashi.some(r => r.toLowerCase().includes(key))
        );

        if (matches.length > 0) {
            suggestionsBox.innerHTML = matches.map(m => `
                <div class="suggestion-item" onclick="window.router.navigate('product-detail', {sku: '${m.sku}'});">
                    ${m.symbol} ${m.name} (${this.state.formatPrice(m.priceUSD)})
                </div>
            `).join('');
            suggestionsBox.style.display = 'block';
        } else {
            suggestionsBox.style.display = 'none';
        }
    }

    // 5. VIEW BUILDERS
    
    // View: Home
    getViewHome() {
        return `
            <!-- Hero Banner Container (WebGL Injected) -->
            <section class="hero-banner" style="position: relative; height: 95vh; overflow: hidden; background: #0A0E1A; display: flex; align-items: center; padding: 0 8%;">
                <!-- WebGL Background Canvas for Solar System / Sri Yantra Particles / Starfields -->
                <div id="hero-webgl-canvas-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;"></div>
                <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: radial-gradient(circle at 70% 50%, rgba(10, 14, 26, 0) 20%, rgba(10, 14, 26, 0.85) 70%); z-index: 1.5; pointer-events: none;"></div>

                <!-- Left Side Brand Headline (Celestial Shimmer Letter-by-Letter style) -->
                <div class="hero-content" style="max-width: 50%; z-index: 3; text-align: left; padding: 40px; background: rgba(10, 14, 26, 0.7); border-radius: 16px; border: 1.5px solid rgba(201, 168, 76, 0.35); backdrop-filter: blur(15px); box-shadow: var(--gold-glow);">
                    <span class="badge-trust" style="background: rgba(201, 168, 76, 0.08); color: var(--gold-light); border: 1px solid var(--gold-light); padding: 6px 14px; border-radius: 4px; font-size: 11px; letter-spacing: 3px; font-weight:700;">🌌 JAIPUR VEDIC HERITAGE ESTD. 1989</span>
                    <h1 class="shimmer-text-target" style="font-size: 46px; color: #F8F8FF; font-family: var(--font-heading); margin: 20px 0; line-height: 1.3; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">
                        WHERE COSMIC ENERGY MEETS EARTH'S RAREST TREASURES
                    </h1>
                    <p style="font-size: 16px; color: var(--champagne-muted); line-height: 1.7; margin-bottom: 30px; font-family: var(--font-body);">
                        For 37 years, selecting government certified, raw unheated minerals from old global mines. Energized through pure Vedic mantras to synchronize with your birth stars.
                    </p>
                    <button class="gold-btn pulsing-cta-btn" onclick="window.router.navigate('recommendation');" style="position:relative; z-index:4; font-size: 13px; font-weight:700; letter-spacing:3px; padding: 15px 35px; border-radius:30px; background: var(--gold-foil); box-shadow: var(--gold-glow); transition: var(--transition-bounce);">
                        LAUNCH ASTRO RECOMMENDATION FINDER
                    </button>
                </div>

                <!-- Search Widget Card (Right Side absolute positioning) -->
                <div class="hero-search-card" style="position: absolute; right: 8%; z-index: 3; background: rgba(10, 14, 26, 0.9); border-radius: 20px; box-shadow: var(--gold-glow-intense); width: 380px; padding: 30px; display: flex; flex-direction: column; gap: 18px; border: 1.5px solid var(--border-color); backdrop-filter: blur(20px);">
                    <h3 class="search-card-title" style="color: #F8F8FF !important; font-family: var(--font-heading); font-weight: 700; font-size: 24px; text-transform: none; letter-spacing: 0.5px;">Find Your Right Gemstone</h3>
                    
                    <div class="search-radio-group" style="display: flex; gap: 15px; font-size: 13px; font-weight: 600; color: #F8F8FF;">
                        <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; color: #F8F8FF; text-transform:none;">
                            <input type="radio" name="search-mode" value="gemstone" checked onchange="window.router.toggleHeroSearchMode(this.value);" style="accent-color: var(--gold-mid);"> By Gemstone
                        </label>
                        <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; color: #F8F8FF; text-transform:none;">
                            <input type="radio" name="search-mode" value="purpose" onchange="window.router.toggleHeroSearchMode(this.value);" style="accent-color: var(--gold-mid);"> By Purpose
                        </label>
                    </div>
                    
                    <!-- Dynamic select 1 (Gemstone or Purpose) -->
                    <div class="form-group" style="margin-bottom:0;">
                        <select id="hero-search-select-primary" style="background: rgba(26, 32, 53, 0.9); border: 1.5px solid var(--border-color); color: #F8F8FF; padding: 14px; border-radius: 8px; font-weight: 600;">
                            <option value="" disabled selected>Select Gemstone</option>
                            <option value="Blue Sapphire">Blue Sapphire (Neelam)</option>
                            <option value="Ruby">Ruby (Manik)</option>
                            <option value="Emerald">Emerald (Panna)</option>
                            <option value="Yellow Sapphire">Yellow Sapphire (Pukhraj)</option>
                            <option value="Hessonite">Hessonite (Gomed)</option>
                            <option value="Cats Eye">Cat's Eye (Lehsuniya)</option>
                            <option value="Pearl">Pearl (Moti)</option>
                            <option value="Red Coral">Red Coral (Moonga)</option>
                        </select>
                    </div>
                    
                    <!-- Select Carat Weight -->
                    <div class="form-group" style="margin-bottom:0;">
                        <select id="hero-search-carats" style="background: rgba(26, 32, 53, 0.9); border: 1.5px solid var(--border-color); color: #F8F8FF; padding: 14px; border-radius: 8px; font-weight: 600;">
                            <option value="" disabled selected>Select Carat Weight</option>
                            <option value="2-3">2 - 3 Carats</option>
                            <option value="3-4">3 - 4 Carats</option>
                            <option value="4-5">4 - 5 Carats</option>
                            <option value="5-6">5 - 6 Carats</option>
                            <option value="6-8">6 - 8 Carats</option>
                            <option value="8+">8+ Carats</option>
                        </select>
                    </div>

                    <!-- Select Price -->
                    <div class="form-group" style="margin-bottom:0;">
                        <select id="hero-search-price" style="background: rgba(26, 32, 53, 0.9); border: 1.5px solid var(--border-color); color: #F8F8FF; padding: 14px; border-radius: 8px; font-weight: 600;">
                            <option value="" disabled selected>Select Price</option>
                            <option value="under-1000">Under $1,000</option>
                            <option value="1000-3000">$1,000 - $3,000</option>
                            <option value="3000-8000">$3,000 - $8,000</option>
                            <option value="over-8000">Over $8,000</option>
                        </select>
                    </div>

                    <!-- Search Action Trigger -->
                    <button class="search-card-btn" onclick="window.router.triggerHeroSearch();" style="background: var(--gold-foil) !important; color: #0A0E1A !important; padding: 16px; font-weight: 700; border-radius: 8px; font-size: 15px; border: none; cursor: pointer; text-transform: uppercase; letter-spacing: 2px; width: 100%; box-shadow: var(--gold-glow);">Search</button>
                    
                    <a href="#" onclick="window.router.navigate('recommendation'); return false;" class="search-card-footer" style="text-align: center; display: block; font-size: 12px; color: var(--gold-mid); font-weight: 700; text-decoration: none; letter-spacing:1px;">Advanced Search →</a>
                </div>
            </section>

            <!-- Featured Showcase Section -->
            <section class="section-wrapper">
                <div class="section-header">
                    <h2>Imperial Loose Gemstone Treasures</h2>
                    <p>Highly potent unheated single-origin crystals tested for maximum energetic output.</p>
                </div>
                <div class="grid-showcase">
                    ${this.state.products.slice(0, 4).map(p => this.getProductCardHtml(p)).join('')}
                </div>
            </section>

            <!-- INTERACTIVE ZODIAC RASHI WHEEL (WebGL Injected) -->
            <section class="section-wrapper" style="background:#0A0E1A; border-top:1px solid var(--border-color); padding: 80px 8%;">
                <div class="section-header" style="text-align:center; margin-bottom: 50px;">
                    <span class="badge-trust" style="border-color:var(--gold-mid); color:var(--gold-mid);">✨ INTERACTIVE WEBGL ENGINE</span>
                    <h2 style="font-size:38px; color:var(--silver-white); margin-top:12px;">Vedic Rashis & Favorable Gemstones</h2>
                    <p style="color:var(--champagne-muted);">Hover your Zodiac Moon Sign on our 3D celestial sphere to trigger precise lucky gemstone alignments.</p>
                </div>
                <div style="display:grid; grid-template-columns: 1.2fr 1fr; gap:40px; align-items:center; background:rgba(18,24,41,0.85); padding:40px; border-radius:20px; border:1px solid var(--border-color); box-shadow:var(--gold-glow); backdrop-filter:blur(20px);">
                    <!-- 3D WebGL Zodiac Sphere Container -->
                    <div id="zodiac-webgl-canvas-container" style="height:500px; width:100%; position:relative; background:radial-gradient(circle at center, rgba(33,21,59,0.3) 0%, rgba(10,14,26,0) 70%); border-radius:12px;"></div>
                    
                    <!-- Astro recommended gemstone cards -->
                    <div style="display:flex; flex-direction:column; gap:20px;">
                        <h3 style="color:var(--gold-mid); font-size:28px;">Spiritual Rashi Matching</h3>
                        <p style="color:var(--champagne-muted); line-height:1.7;">Vedic astrology maps the 12 cosmic signs to ruling planets and energetic colors. Sychronize your inner cosmic alignment by wear-matching GIA certified crystals.</p>
                        
                        <div id="zodiac-interactive-matching-card" style="background:#0A0E1A; border:1.5px solid var(--border-color); border-radius:12px; padding:25px; transition:var(--transition-bounce);">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <h4 style="color:var(--silver-white); font-size:20px; margin-bottom:5px;">♈ Aries (Mesh)</h4>
                                <span style="font-size:28px;">🔴</span>
                            </div>
                            <p style="color:var(--gold-light); font-size:13px; font-weight:700; margin-bottom:12px;">Ruling Stone: Red Ruby / Red Coral</p>
                            <p style="color:var(--champagne-muted); font-size:12px; line-height:1.6;">Aries Ascendants are governed by Mars (Mangal) and Sun (Surya). Wearing certified Burmese Rubies promotes immense focus, will power, and removes administrative boundaries.</p>
                            <button class="gold-btn btn-sm" onclick="window.router.navigate('collection', {gemstone: 'Ruby'});" style="margin-top:15px; width:100%;">View Certified Rubies ➔</button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 9 NAVAGRAHA PLANETARY STONES ORBIT EXHIBIT -->
            <section class="section-wrapper" style="background:radial-gradient(circle at 10% 20%, rgba(33,21,59,0.45) 0%, rgba(10,14,26,1) 80%); border-top:1px solid var(--border-color); padding: 80px 8%;">
                <div class="section-header" style="text-align:center; margin-bottom: 50px;">
                    <span class="badge-trust" style="border-color:#ff9900; color:#ff9900;">🪐 3D SOLAR SYSTEMS</span>
                    <h2 style="font-size:38px; color:var(--silver-white); margin-top:12px;">Navagraha Orbiting Crystals</h2>
                    <p style="color:var(--champagne-muted);">Each planet coordinates with a distinct geological colored crystal ruled by ancient Devata energies.</p>
                </div>
                <div style="display:grid; grid-template-columns: 1fr 1.2fr; gap:40px; align-items:center; background:rgba(18,24,41,0.85); padding:40px; border-radius:20px; border:1px solid var(--border-color); box-shadow:var(--gold-glow); backdrop-filter:blur(20px);">
                    <!-- Planet details content -->
                    <div style="display:flex; flex-direction:column; gap:20px;">
                        <h3 style="color:var(--gold-mid); font-size:28px;">The Sourcing Grid</h3>
                        <p style="color:var(--champagne-muted); line-height:1.7;">A weak planetary position in your horoscope generates subtle energetic imbalances. Click the orbiting 3D cosmic bodies to unlock GIA certified matching selections.</p>
                        
                        <div id="planet-interactive-matching-card" style="background:#0A0E1A; border:1.5px solid var(--border-color); border-radius:12px; padding:25px;">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <h4 style="color:var(--silver-white); font-size:20px; margin-bottom:5px;">Saturn (Shani)</h4>
                                <span style="font-size:28px;">💎</span>
                            </div>
                            <p style="color:var(--gold-light); font-size:13px; font-weight:700; margin-bottom:12px;">Ruling Stone: Kashmir Blue Sapphire (Neelam)</p>
                            <p style="color:var(--champagne-muted); font-size:12px; line-height:1.6;">Shani demands discipline, focus, and strategic vision. Perfect Kashmir Blue Sapphires transmit highly potent cobalt rays to instantly calm minds and align careers.</p>
                            <button class="gold-btn btn-sm" onclick="window.router.navigate('collection', {gemstone: 'Blue Sapphire'});" style="margin-top:15px; width:100%;">Explore Kashmir Sapphires ➔</button>
                        </div>
                    </div>
                    
                    <!-- 3D WebGL Orbits Canvas Container -->
                    <div id="planets-webgl-canvas-container" style="height:500px; width:100%; position:relative; background:radial-gradient(circle at center, rgba(15,32,66,0.3) 0%, rgba(10,14,26,0) 70%); border-radius:12px;"></div>
                </div>
            </section>

            <!-- Buy Gemstones Online Replicated Interactive Section -->
            <section class="section-wrapper" style="background:#f7f8fa; padding: 60px 8%; text-align:center; border-top:1px solid #e3e6ec; border-bottom:1px solid #e3e6ec;">
                <div class="section-header" style="margin-bottom: 40px;">
                    <h2 style="font-family: var(--font-heading); font-size: 32px; color: #2d3036; font-weight: 600; text-transform:none; margin-bottom: 8px;">Buy Gemstones Online</h2>
                    <span style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: #8c0b1a; text-transform: uppercase;">PRODUCTS OF TRUSTED EXCELLENCE</span>
                </div>
                <div class="gemstone-categories-grid" style="display:grid; grid-template-columns: repeat(4, 1fr); gap: 20px;">
                    <!-- Yellow Sapphire Card -->
                    <div onclick="window.router.navigate('collection', {gemstone: 'Yellow Sapphire'});" style="background:#ffffff; border-radius:8px; border:1px solid #e3e6ec; padding: 30px 20px; cursor:pointer; transition: var(--transition-bounce); box-shadow: 0 4px 12px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#8c0b1a';" onmouseout="this.style.transform='none'; this.style.borderColor='#e3e6ec';">
                        <div style="font-size: 60px; margin-bottom: 15px; filter: drop-shadow(0 4px 10px rgba(255,215,0,0.3));">💛</div>
                        <h4 style="font-family: var(--font-body); font-weight: 700; font-size: 14px; text-transform: uppercase; color: #2d3036; margin-bottom: 8px; letter-spacing: 0.5px;">Yellow Sapphire ➔</h4>
                        <p style="font-size:12px; color:#62666f; line-height: 1.4;">Divine Luck, Prosperity, Blissful Matrimony</p>
                    </div>

                    <!-- Blue Sapphire Card -->
                    <div onclick="window.router.navigate('collection', {gemstone: 'Blue Sapphire'});" style="background:#ffffff; border-radius:8px; border:1px solid #e3e6ec; padding: 30px 20px; cursor:pointer; transition: var(--transition-bounce); box-shadow: 0 4px 12px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#8c0b1a';" onmouseout="this.style.transform='none'; this.style.borderColor='#e3e6ec';">
                        <div style="font-size: 60px; margin-bottom: 15px; filter: drop-shadow(0 4px 10px rgba(0,0,255,0.25));">💎</div>
                        <h4 style="font-family: var(--font-body); font-weight: 700; font-size: 14px; text-transform: uppercase; color: #2d3036; margin-bottom: 8px; letter-spacing: 0.5px;">Blue Sapphire ➔</h4>
                        <p style="font-size:12px; color:#62666f; line-height: 1.4;">Great Fame, Discipline, Reverses Misfortunes</p>
                    </div>

                    <!-- Emerald Card -->
                    <div onclick="window.router.navigate('collection', {gemstone: 'Emerald'});" style="background:#ffffff; border-radius:8px; border:1px solid #e3e6ec; padding: 30px 20px; cursor:pointer; transition: var(--transition-bounce); box-shadow: 0 4px 12px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#8c0b1a';" onmouseout="this.style.transform='none'; this.style.borderColor='#e3e6ec';">
                        <div style="font-size: 60px; margin-bottom: 15px; filter: drop-shadow(0 4px 10px rgba(0,255,0,0.25));">💚</div>
                        <h4 style="font-family: var(--font-body); font-weight: 700; font-size: 14px; text-transform: uppercase; color: #2d3036; margin-bottom: 8px; letter-spacing: 0.5px;">Emerald ➔</h4>
                        <p style="font-size:12px; color:#62666f; line-height: 1.4;">Vocal Charm, Creativity, Success in Business</p>
                    </div>

                    <!-- Ruby Card -->
                    <div onclick="window.router.navigate('collection', {gemstone: 'Ruby'});" style="background:#ffffff; border-radius:8px; border:1px solid #e3e6ec; padding: 30px 20px; cursor:pointer; transition: var(--transition-bounce); box-shadow: 0 4px 12px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#8c0b1a';" onmouseout="this.style.transform='none'; this.style.borderColor='#e3e6ec';">
                        <div style="font-size: 60px; margin-bottom: 15px; filter: drop-shadow(0 4px 10px rgba(255,0,0,0.25));">🔴</div>
                        <h4 style="font-family: var(--font-body); font-weight: 700; font-size: 14px; text-transform: uppercase; color: #2d3036; margin-bottom: 8px; letter-spacing: 0.5px;">Ruby ➔</h4>
                        <p style="font-size:12px; color:#62666f; line-height: 1.4;">Great Health, Will Power, Fame & Reputation</p>
                    </div>

                    <!-- Opal Card -->
                    <div onclick="window.router.navigate('collection', {gemstone: 'Opal'});" style="background:#ffffff; border-radius:8px; border:1px solid #e3e6ec; padding: 30px 20px; cursor:pointer; transition: var(--transition-bounce); box-shadow: 0 4px 12px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#8c0b1a';" onmouseout="this.style.transform='none'; this.style.borderColor='#e3e6ec';">
                        <div style="font-size: 60px; margin-bottom: 15px; filter: drop-shadow(0 4px 10px rgba(127,255,212,0.3));">🔮</div>
                        <h4 style="font-family: var(--font-body); font-weight: 700; font-size: 14px; text-transform: uppercase; color: #2d3036; margin-bottom: 8px; letter-spacing: 0.5px;">Opal ➔</h4>
                        <p style="font-size:12px; color:#62666f; line-height: 1.4;">Luxury, Physical Beauty, Romantic Bliss</p>
                    </div>

                    <!-- Pearl Card -->
                    <div onclick="window.router.navigate('collection', {gemstone: 'Pearl'});" style="background:#ffffff; border-radius:8px; border:1px solid #e3e6ec; padding: 30px 20px; cursor:pointer; transition: var(--transition-bounce); box-shadow: 0 4px 12px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#8c0b1a';" onmouseout="this.style.transform='none'; this.style.borderColor='#e3e6ec';">
                        <div style="font-size: 60px; margin-bottom: 15px; filter: drop-shadow(0 4px 10px rgba(255,255,255,0.4));">⚪</div>
                        <h4 style="font-family: var(--font-body); font-weight: 700; font-size: 14px; text-transform: uppercase; color: #2d3036; margin-bottom: 8px; letter-spacing: 0.5px;">Pearl ➔</h4>
                        <p style="font-size:12px; color:#62666f; line-height: 1.4;">Mental Strength, Fortune, Peace & Fulfillment</p>
                    </div>

                    <!-- Red Coral Card -->
                    <div onclick="window.router.navigate('collection', {gemstone: 'Red Coral'});" style="background:#ffffff; border-radius:8px; border:1px solid #e3e6ec; padding: 30px 20px; cursor:pointer; transition: var(--transition-bounce); box-shadow: 0 4px 12px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#8c0b1a';" onmouseout="this.style.transform='none'; this.style.borderColor='#e3e6ec';">
                        <div style="font-size: 60px; margin-bottom: 15px; filter: drop-shadow(0 4px 10px rgba(238,75,43,0.35));">🐙</div>
                        <h4 style="font-family: var(--font-body); font-weight: 700; font-size: 14px; text-transform: uppercase; color: #2d3036; margin-bottom: 8px; letter-spacing: 0.5px;">Red Coral ➔</h4>
                        <p style="font-size:12px; color:#62666f; line-height: 1.4;">Averts Mishaps, Courage, Overall Strength</p>
                    </div>

                    <!-- Hessonite Card -->
                    <div onclick="window.router.navigate('collection', {gemstone: 'Hessonite'});" style="background:#ffffff; border-radius:8px; border:1px solid #e3e6ec; padding: 30px 20px; cursor:pointer; transition: var(--transition-bounce); box-shadow: 0 4px 12px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#8c0b1a';" onmouseout="this.style.transform='none'; this.style.borderColor='#e3e6ec';">
                        <div style="font-size: 60px; margin-bottom: 15px; filter: drop-shadow(0 4px 10px rgba(139,69,19,0.35));">🔸</div>
                        <h4 style="font-family: var(--font-body); font-weight: 700; font-size: 14px; text-transform: uppercase; color: #2d3036; margin-bottom: 8px; letter-spacing: 0.5px;">Hessonite ➔</h4>
                        <p style="font-size:12px; color:#62666f; line-height: 1.4;">Pacifies Rahu, Popularity, Speculative Success</p>
                    </div>
                </div>
            </section>

            <!-- Astrology Banner -->
            <section class="section-wrapper" style="background: var(--bg-obsidian); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
                <div class="recommender-container" style="max-width:100%; border:none; background:transparent; display:flex; gap:40px; align-items:center;">
                    <div style="flex:1;">
                        <span class="badge-trust" style="border-color:#ff9900; color:#ff9900;">🌌 Cosmic Science</span>
                        <h2 style="font-size:38px; margin-bottom:15px;">Does Your Ruling Planet Need Alignment?</h2>
                        <p style="color:var(--champagne-muted); margin-bottom:25px;">Ancient Vedic shastras suggest that weak planetary grids block professional growth, cause continuous health issues, and invite personal friction. Wearing the correct gemstone boosts precise color vibrations into your aura.</p>
                        <button class="gold-btn" onclick="window.router.navigate('recommendation');">Launch Astro Gemstone Recommender</button>
                    </div>
                    <div style="font-size:120px; flex:1; text-align:center; filter: drop-shadow(0 0 20px rgba(255, 153, 0, 0.2));">🌌</div>
                </div>
            </section>

            <!-- Educational guides -->
            <section class="section-wrapper">
                <div class="section-header">
                    <h2>Celestial Encyclopedia & buying Guides</h2>
                    <p>Gain comprehensive geolocial knowledge before committing to your cosmic guardian stone.</p>
                </div>
                <div class="grid-showcase" style="grid-template-columns: repeat(3, 1fr);">
                    <div class="product-card" onclick="window.router.navigate('education', {article: 'wearing-rituals'});" style="cursor:pointer; padding:30px;">
                        <span style="font-size:32px;">🧘</span>
                        <h3 style="margin:15px 0 10px 0;">Vedic Wear Rituals</h3>
                        <p style="font-size:12px; color:var(--champagne-muted);">Learn the exact days, hours, constellations, and mantras required to energize and activate your gemstone.</p>
                    </div>
                    <div class="product-card" onclick="window.router.navigate('education', {article: 'certifications'});" style="cursor:pointer; padding:30px;">
                        <span style="font-size:32px;">🔬</span>
                        <h3 style="margin:15px 0 10px 0;">Lab Report Secrets</h3>
                        <p style="font-size:12px; color:var(--champagne-muted);">How to identify simulated or glass-filled treatments. Ensure your hard-earned money buys genuine value.</p>
                    </div>
                    <div class="product-card" onclick="window.router.navigate('education', {article: 'gemological-quality'});" style="cursor:pointer; padding:30px;">
                        <span style="font-size:32px;">🏔️</span>
                        <h3 style="margin:15px 0 10px 0;">Origin Significance</h3>
                        <p style="font-size:12px; color:var(--champagne-muted);">Why Kashmir Sapphires or Burma Rubies command extreme premiums compared to other mines globally.</p>
                    </div>
                </div>
            </section>
        `;
    }

    getProductCardHtml(p) {
        const inWish = this.state.wishlist.includes(p.sku) ? '❤️' : '🤍';
        const inComp = this.state.compare.includes(p.sku);
        return `
            <div class="product-card">
                <div class="card-badges">
                    <span class="card-badge badge-certified">${p.certificate}</span>
                    ${p.planet ? `<span class="card-badge" style="background:#ff9900; color:#fff;">${p.planet}</span>` : ''}
                </div>
                <div class="card-actions-overlay">
                    <button class="card-action-btn" onclick="event.stopPropagation(); window.router.toggleWishlist('${p.sku}');" title="Wishlist">${inWish}</button>
                    <button class="card-action-btn" onclick="event.stopPropagation(); window.router.toggleCompare('${p.sku}');" title="Compare" style="background:${inComp ? 'var(--gold-mid)' : 'var(--bg-velvet)'}">📊</button>
                </div>
                <div class="card-img-container" onclick="window.router.navigate('product-detail', {sku: '${p.sku}'});" style="cursor:pointer;">
                    ${p.symbol}
                </div>
                <div class="card-info">
                    <span class="card-rashi">${p.rashi.join(' / ')} Rashi</span>
                    <h3 class="card-title" onclick="window.router.navigate('product-detail', {sku: '${p.sku}'});" style="cursor:pointer;">${p.name}</h3>
                    <div class="card-meta-line">
                        <span>Carats: ${p.carats} ct</span>
                        <span>Origin: ${p.origin}</span>
                    </div>
                    <div class="card-price-row">
                        <span class="card-price">${this.state.formatPrice(p.priceUSD)}</span>
                        <button class="gold-btn btn-sm" onclick="event.stopPropagation(); window.router.addToCart('${p.sku}');">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
    }

    // View: Collection List
    getViewCollection(params) {
        let filtered = [...this.state.products];
        let title = "Imperial Loose Gemstones & Jewelry";
        let sub = "Discover authentic natural crystals categorized for Vedic excellence.";
        
        // Dynamic Carat weight Range Filter from Hero Search
        if (params.caratRange) {
            const range = params.caratRange;
            if (range === "8+") {
                filtered = filtered.filter(p => p.carats >= 8);
            } else {
                const parts = range.split('-');
                const min = parseFloat(parts[0]);
                const max = parseFloat(parts[1]);
                filtered = filtered.filter(p => p.carats >= min && p.carats <= max);
            }
        }

        // Dynamic Price Range Filter from Hero Search
        if (params.priceRange) {
            const priceKey = params.priceRange;
            if (priceKey === "under-1000") {
                filtered = filtered.filter(p => p.priceUSD < 1000);
            } else if (priceKey === "1000-3000") {
                filtered = filtered.filter(p => p.priceUSD >= 1000 && p.priceUSD <= 3000);
            } else if (priceKey === "3000-8000") {
                filtered = filtered.filter(p => p.priceUSD >= 3000 && p.priceUSD <= 8000);
            } else if (priceKey === "over-8000") {
                filtered = filtered.filter(p => p.priceUSD > 8000);
            }
        }
        
        // Apply category filter
        if (params.category) {
            filtered = filtered.filter(p => p.category === params.category);
            title = `${params.category.toUpperCase()} Collection`;
        }
        
        // Gemstone specific dropdown category
        if (params.gemstone) {
            filtered = filtered.filter(p => p.gemstone.toLowerCase() === params.gemstone.toLowerCase());
            title = `Potent Natural ${params.gemstone}s`;
        }

        // Planent / Zodiac filters from Megamenu
        if (params.filter) {
            const filterKey = params.filter;
            const val = params.val;
            
            if (filterKey === 'planet') {
                filtered = filtered.filter(p => p.planet && p.planet.toLowerCase() === val.toLowerCase());
                title = `${val} (Planetary Alignment) Stones`;
            } else if (filterKey === 'zodiac') {
                filtered = filtered.filter(p => p.rashi.some(r => r.toLowerCase() === val.toLowerCase()));
                title = `Lucky Stones for ${val} (Rashi)`;
            } else if (filterKey === 'color') {
                filtered = filtered.filter(p => p.color.toLowerCase() === val.toLowerCase());
                title = `Rare ${val} Colored Gemstones`;
            } else if (filterKey === 'origin') {
                filtered = filtered.filter(p => p.origin.toLowerCase() === val.toLowerCase());
                title = `Certified ${val} Sourced Gemstones`;
            } else if (filterKey === 'month') {
                filtered = filtered.filter(p => p.month && p.month.some(m => m.toLowerCase() === val.toLowerCase()));
                title = `Certified Birthstones for ${val}`;
            }
        }

        // Voice/Text Search Matches
        if (params.search) {
            const query = params.search.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.gemstone.toLowerCase().includes(query) ||
                (p.planet && p.planet.toLowerCase().includes(query)) ||
                p.rashi.some(r => r.toLowerCase().includes(query))
            );
            title = `Search Results for "${params.search}"`;
            sub = `Found ${filtered.length} exceptional gems matches in our database.`;
        }

        // Sort mechanism (Simple mock)
        const sortVal = params.sort || 'default';
        if (sortVal === 'price-low') {
            filtered.sort((a,b) => a.priceUSD - b.priceUSD);
        } else if (sortVal === 'price-high') {
            filtered.sort((a,b) => b.priceUSD - a.priceUSD);
        } else if (sortVal === 'carats') {
            filtered.sort((a,b) => b.carats - a.carats);
        }

        return `
            <div class="section-wrapper">
                <div class="section-header">
                    <h2>${title}</h2>
                    <p>${sub}</p>
                </div>

                <!-- Collection Controls Bar -->
                <div style="display:flex; justify-content:space-between; margin-bottom:30px; border-bottom: 1px solid var(--border-color); padding-bottom:15px; flex-wrap:wrap; gap:15px;">
                    <div>
                        <span>Showing ${filtered.length} celestial stones</span>
                    </div>
                    <!-- Sorting control trigger -->
                    <div>
                        <label for="sort-select" style="display:inline-block; margin-right:8px;">Sort By:</label>
                        <select id="sort-select" style="width:180px; display:inline-block; padding:5px 10px;" onchange="window.router.applyCollectionSort(this.value);">
                            <option value="default" ${sortVal==='default'?'selected':''}>Vedic Relevancy</option>
                            <option value="price-low" ${sortVal==='price-low'?'selected':''}>Price: Low to High</option>
                            <option value="price-high" ${sortVal==='price-high'?'selected':''}>Price: High to Low</option>
                            <option value="carats" ${sortVal==='carats'?'selected':''}>Carat Weight</option>
                        </select>
                    </div>
                </div>

                <div class="grid-showcase">
                    ${filtered.length > 0 ? filtered.map(p => this.getProductCardHtml(p)).join('') : `
                        <div style="grid-column:1/-1; text-align:center; padding:50px;">
                            <span style="font-size:48px;">🔬</span>
                            <h3 style="margin-top:20px;">No exact cosmic matches currently in inventory.</h3>
                            <p style="color:var(--champagne-muted); margin-bottom:20px;">Our buyers source loose stones daily. Talk to our concierge for bespoke raw sourcing.</p>
                            <button class="gold-btn" onclick="window.router.openConsultationModal();">Request Sourcing Callback</button>
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    applyCollectionSort(val) {
        const nextParams = { ...this.viewParams, sort: val };
        this.navigate('collection', nextParams);
    }

    toggleHeroSearchMode(mode) {
        const select = document.getElementById('hero-search-select-primary');
        if (mode === 'gemstone') {
            select.innerHTML = `
                <option value="" disabled selected>Select Gemstone</option>
                <option value="Blue Sapphire">Blue Sapphire (Neelam)</option>
                <option value="Ruby">Ruby (Manik)</option>
                <option value="Emerald">Emerald (Panna)</option>
                <option value="Yellow Sapphire">Yellow Sapphire (Pukhraj)</option>
                <option value="Hessonite">Hessonite (Gomed)</option>
                <option value="Cats Eye">Cat's Eye (Lehsuniya)</option>
                <option value="Pearl">Pearl (Moti)</option>
                <option value="Red Coral">Red Coral (Moonga)</option>
            `;
        } else {
            select.innerHTML = `
                <option value="" disabled selected>Select Purpose</option>
                <option value="Career">💼 Career & Prosperity</option>
                <option value="Health">🧘 Sound Health & Vitality</option>
                <option value="Marriage">💑 Marriage & Harmony</option>
                <option value="Protection">🛡️ Protection from Evil</option>
                <option value="Wealth">💰 Financial Stability</option>
            `;
        }
    }

    triggerHeroSearch() {
        const mode = document.querySelector('input[name="search-mode"]:checked').value;
        const primaryVal = document.getElementById('hero-search-select-primary').value;
        const carats = document.getElementById('hero-search-carats').value;
        const price = document.getElementById('hero-search-price').value;

        if (!primaryVal) {
            alert(`Please select a ${mode} to proceed with the celestial search.`);
            return;
        }

        const params = { search: primaryVal };
        if (carats) params.caratRange = carats;
        if (price) params.priceRange = price;

        this.navigate('collection', params);
    }

    // View: Product Details Page
    getViewProductDetail(sku) {
        const p = this.state.products.find(item => item.sku === sku);
        if (!p) {
            return `<div class="section-wrapper"><p>Stone not found.</p></div>`;
        }

        const isWish = this.state.wishlist.includes(p.sku) ? '❤️ Wishlisted' : '🤍 Add to Wishlist';

        return `
            <div class="section-wrapper">
                <!-- Breadcrumbs -->
                <div style="font-size:11px; text-transform:uppercase; letter-spacing:1px; color:var(--champagne-muted); margin-bottom:30px;">
                    <a href="#" onclick="window.router.navigate('home'); return false;">Home</a> / 
                    <a href="#" onclick="window.router.navigate('collection', {category: '${p.category}'}); return false;">${p.category}</a> / 
                    <span>${p.name}</span>
                </div>

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:50px;">
                    <!-- Visual Showcase Gallery -->
                    <div>
                        <div class="product-card" style="height:400px; display:flex; align-items:center; justify-content:center; font-size:180px; overflow:hidden;">
                            ${p.symbol}
                        </div>
                        <div style="margin-top:20px; display:flex; gap:10px;">
                            <div style="flex:1; height:80px; border:1px solid var(--gold-mid); display:flex; align-items:center; justify-content:center; font-size:32px; background:var(--bg-charcoal); border-radius:4px;">${p.symbol}</div>
                            <div style="flex:1; height:80px; border:1px solid var(--border-color); display:flex; align-items:center; justify-content:center; font-size:24px; color:var(--gold-mid); background:var(--bg-charcoal); border-radius:4px; font-weight:700;">GIA</div>
                            <div style="flex:1; height:80px; border:1px solid var(--border-color); display:flex; align-items:center; justify-content:center; font-size:32px; background:var(--bg-charcoal); border-radius:4px;">🔬</div>
                        </div>
                    </div>

                    <!-- Core Info Sidebar -->
                    <div>
                        <div style="display:flex; gap:10px; margin-bottom:15px;">
                            <span class="card-badge badge-certified">${p.certificate}</span>
                            ${p.planet ? `<span class="card-badge" style="background:#ff9900; color:#fff;">${p.planet} (Planet)</span>` : ''}
                        </div>
                        <h1 style="font-size:42px; line-height:1.2; margin-bottom:15px;">${p.name}</h1>
                        
                        <div style="font-size:24px; color:var(--gold-light); font-weight:700; margin-bottom:20px;">
                            ${this.state.formatPrice(p.priceUSD)}
                        </div>

                        <p style="color:var(--champagne-muted); margin-bottom:25px; font-size:14px;">${p.desc}</p>

                        <!-- Astrological Match Matrix -->
                        <div style="background:var(--bg-charcoal); padding:20px; border:1px solid var(--border-color); border-radius:6px; margin-bottom:30px;">
                            <h4 style="color:var(--gold-mid); margin-bottom:12px; font-size:14px; text-transform:uppercase; letter-spacing:1px;">Cosmic Energetics</h4>
                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; font-size:12px;">
                                <div><strong>Planetary Overlord:</strong> ${p.planet || 'N/A'}</div>
                                <div><strong>Favorable Rashis:</strong> ${p.rashi.join(', ')}</div>
                                <div><strong>Chakra Active:</strong> Heart & Solar</div>
                                <div><strong>Mantra Vibrations:</strong> Om Som Somaya Namah</div>
                            </div>
                        </div>

                        <!-- Actions Grid -->
                        <div style="display:flex; gap:15px; margin-bottom:25px;">
                            <button class="gold-btn" style="flex:2;" onclick="window.router.addToCart('${p.sku}');">Secure Astrological Purchase</button>
                            <button class="btn-secondary" style="flex:1;" onclick="window.router.toggleWishlist('${p.sku}');">${isWish}</button>
                        </div>

                        <!-- Chat & Sourcing Links -->
                        <div style="display:flex; justify-content:space-between; font-size:12px;">
                            <a href="#" onclick="window.router.openInquiryModal('${p.sku}', '${p.name}'); return false;" style="color:var(--gold-mid);">💬 Custom Bespoke Ring Fitting Inquiry</a>
                            <a href="https://wa.me/919876543210?text=I%20am%20interested%20in%20SKU%20${p.sku}" target="_blank" style="color:#25D366; font-weight:700;">🟢 Instant WhatsApp Concierge</a>
                        </div>
                    </div>
                </div>

                <!-- Product Specifications Grid -->
                <div style="margin-top:60px;">
                    <h3 style="border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:20px;">Geological Certification Attributes</h3>
                    <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:20px; font-size:13px;">
                        <div style="background:var(--bg-charcoal); padding:15px; border-radius:4px;">
                            <div style="color:var(--champagne-muted); font-size:11px; text-transform:uppercase;">Weight</div>
                            <strong>${p.carats} Carats</strong>
                        </div>
                        <div style="background:var(--bg-charcoal); padding:15px; border-radius:4px;">
                            <div style="color:var(--champagne-muted); font-size:11px; text-transform:uppercase;">Treatment</div>
                            <strong>${p.treatment}</strong>
                        </div>
                        <div style="background:var(--bg-charcoal); padding:15px; border-radius:4px;">
                            <div style="color:var(--champagne-muted); font-size:11px; text-transform:uppercase;">Origin</div>
                            <strong>${p.origin}</strong>
                        </div>
                        <div style="background:var(--bg-charcoal); padding:15px; border-radius:4px;">
                            <div style="color:var(--champagne-muted); font-size:11px; text-transform:uppercase;">Verification</div>
                            <strong><a href="#" onclick="window.router.openCertVerifyModal(); return false;" style="color:var(--gold-mid);">${p.certificate} Report</a></strong>
                        </div>
                    </div>
                </div>

                <!-- Related/Favorable Gemstone Recommendations -->
                <div style="margin-top:80px;">
                    <h3 style="margin-bottom:25px;">Complementary Astral Stones</h3>
                    <div class="grid-showcase">
                        ${this.state.products.filter(item => item.sku !== p.sku).slice(0, 3).map(item => this.getProductCardHtml(item)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // View: Vedic Astrology Gemstone Recommendation Wizard
    getViewRecommendation() {
        return `
            <div class="section-wrapper">
                <div class="section-header">
                    <h2>Vedic Birth Chart Gemstone finder</h2>
                    <p>Calculated dynamic astrological recommendations based on deep Vedic Horoscopy.</p>
                </div>

                <div class="recommender-container" id="recommender-panel">
                    <div class="recommender-step-content" id="rec-step-1">
                        <h3 style="margin-bottom:15px;">Step 1: Enter Birth Configurations</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="rec-dob">Date of Birth</label>
                                <input type="date" id="rec-dob" required>
                            </div>
                            <div class="form-group">
                                <label for="rec-tob">Time of Birth</label>
                                <input type="time" id="rec-tob" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="rec-place">Place of Birth (City, Country)</label>
                            <input type="text" id="rec-place" placeholder="E.g., Jaipur, India" required>
                        </div>
                        <div class="recommender-buttons">
                            <div></div>
                            <button class="gold-btn" onclick="window.router.submitRecStep1();">Proceed to Spiritual Focus</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    submitRecStep1() {
        const dob = document.getElementById('rec-dob').value;
        const place = document.getElementById('rec-place').value;
        if (!dob || !place) {
            alert("Please fill all details.");
            return;
        }

        const panel = document.getElementById('recommender-panel');
        panel.innerHTML = `
            <div class="recommender-step-content">
                <h3 style="margin-bottom:15px;">Step 2: Define Prime Intent</h3>
                <p class="subtitle">Different gemstones address specific energy blockages. Select your dominant focus area:</p>
                <div class="options-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-top:20px;">
                    <label class="radio-option" style="padding:20px; background:var(--bg-onyx); border:1px solid var(--border-color); display:block; border-radius:4px; cursor:pointer;">
                        <input type="radio" name="rec-intent" value="Career" checked>
                        <strong>💼 Career & Financial Prosperity</strong>
                        <p style="font-size:11px; color:var(--champagne-muted); margin-top:5px;">Activate Sun, Mercury, or Saturn paths.</p>
                    </label>
                    <label class="radio-option" style="padding:20px; background:var(--bg-onyx); border:1px solid var(--border-color); display:block; border-radius:4px; cursor:pointer;">
                        <input type="radio" name="rec-intent" value="Health">
                        <strong>🧘 Vitality & Sound Health</strong>
                        <p style="font-size:11px; color:var(--champagne-muted); margin-top:5px;">Optimize Sun or Mars energies.</p>
                    </label>
                </div>
                <div class="recommender-buttons">
                    <button class="btn-secondary" onclick="window.router.navigate('recommendation');">Back</button>
                    <button class="gold-btn" onclick="window.router.generateAstrologicalReport();">Calculate Horoscopic Report</button>
                </div>
            </div>
        `;
    }

    generateAstrologicalReport() {
        const checkedVal = document.querySelector('input[name="rec-intent"]:checked').value;
        
        let targetGem = "Blue Sapphire";
        let targetSku = "GEM-BS-001";
        let planet = "Saturn";
        let reason = "Your Saturn grid needs energizing to overcome administrative blockages and promote longevity.";
        
        if (checkedVal === "Health") {
            targetGem = "Ruby";
            targetSku = "GEM-RY-002";
            planet = "Sun";
            reason = "Your Sun grid requires reinforcement to enhance digestive power, general immunity, and self-confidence.";
        }

        const matchedProduct = this.state.products.find(item => item.sku === targetSku);

        const panel = document.getElementById('recommender-panel');
        panel.innerHTML = `
            <div style="text-align:center;">
                <span style="font-size:64px;">🌌</span>
                <h2 style="color:var(--gold-mid); margin:15px 0;">Celestial Alignment Report Complete</h2>
                <div style="background:var(--bg-onyx); padding:30px; border:1px solid var(--border-color); border-radius:6px; margin:20px 0; text-align:left;">
                    <h3>Ideal Astrological Stone: <strong>${targetGem}</strong></h3>
                    <p style="margin:10px 0; font-size:13px;"><strong>Dominant Influence:</strong> Lord ${planet}</p>
                    <p style="font-size:13px; color:var(--champagne-muted); line-height:1.6;">${reason}</p>
                </div>

                <h3>Recommended Gemstone Match</h3>
                <div style="max-width:350px; margin: 20px auto;">
                    ${matchedProduct ? this.getProductCardHtml(matchedProduct) : ''}
                </div>
                
                <button class="btn-secondary" style="margin-top:20px;" onclick="window.router.openConsultationModal();">Schedule Astrologer Review Callback</button>
            </div>
        `;
    }

    // View: Compare Products
    getViewCompare() {
        const comps = this.state.products.filter(item => this.state.compare.includes(item.sku));
        return `
            <div class="section-wrapper">
                <div class="section-header">
                    <h2>Dynamic Gemstone comparison Matrix</h2>
                    <p>Compare raw gemological and astrological attributes side-by-side.</p>
                </div>

                ${comps.length === 0 ? `
                    <div style="text-align:center; padding:50px;">
                        <p>No products added to comparison tray. Explore our catalog and hit the 📊 icon.</p>
                        <button class="gold-btn" style="margin-top:15px;" onclick="window.router.navigate('collection');">Explore Collections</button>
                    </div>
                ` : `
                    <div style="overflow-x:auto;">
                        <table class="admin-table" style="background:var(--bg-charcoal); border-radius:8px; border:1px solid var(--border-color);">
                            <thead>
                                <tr>
                                    <th>Specification</th>
                                    ${comps.map(c => `<th>${c.name}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Visual Symbol</strong></td>
                                    ${comps.map(c => `<td style="font-size:32px;">${c.symbol}</td>`).join('')}
                                </tr>
                                <tr>
                                    <td><strong>Carat Weight</strong></td>
                                    ${comps.map(c => `<td>${c.carats} Carats</td>`).join('')}
                                </tr>
                                <tr>
                                    <td><strong>Gem Origin</strong></td>
                                    ${comps.map(c => `<td>${c.origin}</td>`).join('')}
                                </tr>
                                <tr>
                                    <td><strong>Treatment</strong></td>
                                    ${comps.map(c => `<td>${c.treatment}</td>`).join('')}
                                </tr>
                                <tr>
                                    <td><strong>Governing Planet</strong></td>
                                    ${comps.map(c => `<td>${c.planet || 'N/A'}</td>`).join('')}
                                </tr>
                                <tr>
                                    <td><strong>Price</strong></td>
                                    ${comps.map(c => `<td style="color:var(--gold-mid); font-weight:700;">${this.state.formatPrice(c.priceUSD)}</td>`).join('')}
                                </tr>
                                <tr>
                                    <td><strong>Actions</strong></td>
                                    ${comps.map(c => `<td>
                                        <button class="gold-btn btn-sm" onclick="window.router.addToCart('${c.sku}');">Add to Cart</button>
                                        <button class="btn-secondary btn-sm" onclick="window.router.toggleCompare('${c.sku}');">Remove</button>
                                    </td>`).join('')}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `}
            </div>
        `;
    }

    // View: Checkout Page
    getViewCheckout() {
        const cartItems = this.state.products.filter(item => this.state.cart.includes(item.sku));
        const subtotal = cartItems.reduce((acc, item) => acc + item.priceUSD, 0);
        
        return `
            <div class="section-wrapper">
                <div class="section-header">
                    <h2>Vedic Secure checkout</h2>
                    <p>Complete your certified planetary gemstone purchase.</p>
                </div>

                <div style="display:grid; grid-template-columns: 1.5fr 1fr; gap:40px;">
                    <!-- Billing & Shipment Form -->
                    <div class="product-card">
                        <h3>Shipment & Astrological details</h3>
                        <form id="checkout-form" onsubmit="event.preventDefault(); window.router.processPayment();" style="margin-top:20px;">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>First Name</label>
                                    <input type="text" required>
                                </div>
                                <div class="form-group">
                                    <label>Last Name</label>
                                    <input type="text" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Premium Home Address</label>
                                <input type="text" required placeholder="Street address, Suite">
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>City</label>
                                    <input type="text" required>
                                </div>
                                <div class="form-group">
                                    <label>Postal Code</label>
                                    <input type="text" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Do you wish to request a complementary Puja/Energization ritual for these stones?</label>
                                <select>
                                    <option value="yes">Yes, perform Vedic Energization (Pooja/Abhishek) before dispatch (Complementary)</option>
                                    <option value="no">No, ship raw stone directly</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Payment Method</label>
                                <select id="checkout-payment-method">
                                    <option value="Razorpay">Razorpay (Cards, UPI, NetBanking in INR)</option>
                                    <option value="Stripe">Stripe Secure (Global Cards in USD)</option>
                                    <option value="COD">Cash on Delivery (Premium domestic shipping only)</option>
                                </select>
                            </div>
                            <button type="submit" class="gold-btn" style="width:100%;">Finalize Secure Cosmic Purchase</button>
                        </form>
                    </div>

                    <!-- Order Summary column -->
                    <div>
                        <div class="product-card" style="background:var(--bg-obsidian);">
                            <h3>Cart Order Summary</h3>
                            <div style="margin-top:20px;">
                                ${cartItems.map(item => `
                                    <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size:13px; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:10px;">
                                        <span>${item.name}</span>
                                        <strong>${this.state.formatPrice(item.priceUSD)}</strong>
                                    </div>
                                `).join('')}
                            </div>
                            <div style="margin-top:20px; padding-top:15px; border-top:1px solid var(--border-color); display:flex; justify-content:space-between;">
                                <span>Cart Subtotal</span>
                                <strong style="color:var(--gold-mid); font-size:18px;">${this.state.formatPrice(subtotal)}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    processPayment() {
        const method = document.getElementById('checkout-payment-method').value;
        const invoiceNum = "INV-" + Math.floor(Math.random() * 900000 + 100000);
        
        // Build GST Invoice Simulation
        alert(`Payment via ${method} approved!\nOrder created. Invoice ${invoiceNum} generated.\nSimulating PDF GST Invoice download...`);
        
        // Clear Cart
        this.state.cart = [];
        this.state.saveAll();
        this.updateBadgeCounts();
        
        // Navigate Home
        this.navigate('home');
    }

    // Static View builders
    getViewAbout() {
        return `<div class="section-wrapper"><h2>Our Heritage & Mines</h2><p>Since 1989, sourcing planetary gems from raw deposits directly to client custom jewelry designs.</p></div>`;
    }
    
    getViewContact() {
        return `<div class="section-wrapper"><h2>Contact Luxury Concierge</h2><p>Call us worldwide or WhatsApp for direct sourcing requests.</p></div>`;
    }

    getViewFAQ() {
        return `<div class="section-wrapper"><h2>Astrological Gemstones FAQs</h2><p>Vedic alignment rules, mantras, treatments, return policies.</p></div>`;
    }

    getViewEducation(article) {
        let content = "Explore Vedic wearing rituals, cleaning rules, and geological details.";
        if (article === 'wearing-rituals') {
            content = "Detailed wearing schedule: Rubies worn on Sundays, Blue Sapphires on Saturdays, Emeralds on Wednesdays.";
        }
        return `<div class="section-wrapper"><h2>Educational Guide: ${article || 'Astrological Gemology'}</h2><p>${content}</p></div>`;
    }

    // 6. ACTION CONTROLLERS (Add to Cart, Wishlist, Compare)
    addToCart(sku) {
        if (!this.state.cart.includes(sku)) {
            this.state.cart.push(sku);
            this.state.saveAll();
            this.updateBadgeCounts();
            this.toggleCartTray(true);
        }
    }

    toggleWishlist(sku) {
        const idx = this.state.wishlist.indexOf(sku);
        if (idx > -1) {
            this.state.wishlist.splice(idx, 1);
        } else {
            this.state.wishlist.push(sku);
        }
        this.state.saveAll();
        this.updateBadgeCounts();
        this.refreshCurrentView();
    }

    toggleCompare(sku) {
        const idx = this.state.compare.indexOf(sku);
        if (idx > -1) {
            this.state.compare.splice(idx, 1);
        } else {
            if (this.state.compare.length >= 3) {
                alert("You can compare up to 3 gemstones at a time.");
                return;
            }
            this.state.compare.push(sku);
        }
        this.state.saveAll();
        this.updateBadgeCounts();
        this.toggleCompareTray(true);
        this.refreshCurrentView();
    }

    // 7. INTERACTIVE DRAWER ACTIONS
    toggleCartTray(forceOpen = false) {
        const tray = document.getElementById('cart-drawer');
        if (forceOpen) {
            tray.classList.add('active');
        } else {
            tray.classList.toggle('active');
        }
        
        if (tray.classList.contains('active')) {
            this.renderCartItems();
        }
    }

    renderCartItems() {
        const container = document.getElementById('cart-drawer-items');
        const cartItems = this.state.products.filter(item => this.state.cart.includes(item.sku));
        const subtotal = cartItems.reduce((acc, item) => acc + item.priceUSD, 0);

        document.getElementById('cart-subtotal').innerText = this.state.formatPrice(subtotal);

        if (cartItems.length === 0) {
            container.innerHTML = `<p style="text-align:center; color:var(--champagne-muted);">Cart is empty.</p>`;
            return;
        }

        container.innerHTML = cartItems.map(item => `
            <div class="cart-item-card">
                <div class="cart-item-img">${item.symbol}</div>
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <span class="cart-item-sku">${item.sku}</span>
                    <div class="cart-item-price">${this.state.formatPrice(item.priceUSD)}</div>
                </div>
                <button class="cart-remove-btn" onclick="window.router.removeCartItem('${item.sku}');">&times;</button>
            </div>
        `).join('');
    }

    removeCartItem(sku) {
        this.state.cart = this.state.cart.filter(id => id !== sku);
        this.state.saveAll();
        this.updateBadgeCounts();
        this.renderCartItems();
    }

    toggleWishlistTray() {
        const tray = document.getElementById('wishlist-drawer');
        tray.classList.toggle('active');
        if (tray.classList.contains('active')) {
            this.renderWishlistItems();
        }
    }

    renderWishlistItems() {
        const container = document.getElementById('wishlist-drawer-items');
        const items = this.state.products.filter(item => this.state.wishlist.includes(item.sku));
        
        if (items.length === 0) {
            container.innerHTML = `<p style="text-align:center; color:var(--champagne-muted);">Wishlist is empty.</p>`;
            return;
        }

        container.innerHTML = items.map(item => `
            <div class="cart-item-card">
                <div class="cart-item-img">${item.symbol}</div>
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">${this.state.formatPrice(item.priceUSD)}</div>
                </div>
                <button class="gold-btn btn-sm" onclick="window.router.addToCart('${item.sku}');">Add to Cart</button>
            </div>
        `).join('');
    }

    toggleCompareTray(forceOpen = false) {
        const tray = document.getElementById('compare-tray');
        if (forceOpen) {
            tray.classList.add('active');
        } else {
            tray.classList.toggle('active');
        }
        
        if (tray.classList.contains('active')) {
            const container = document.getElementById('compare-tray-items');
            const comps = this.state.products.filter(item => this.state.compare.includes(item.sku));
            
            container.innerHTML = comps.map(c => `
                <div class="compare-tray-card">
                    <span class="compare-tray-img">${c.symbol}</span>
                    <span class="compare-tray-name">${c.gemstone} (${c.carats}ct)</span>
                    <button class="compare-tray-remove" onclick="window.router.toggleCompare('${c.sku}');">&times;</button>
                </div>
            `).join('');
        }
    }

    // Modal Control wrappers
    openConsultationModal() {
        document.getElementById('consultation-modal').classList.add('active');
    }
    closeConsultationModal() {
        document.getElementById('consultation-modal').classList.remove('active');
    }
    submitConsultation(form) {
        const lead = {
            name: form.querySelector('#c-name').value,
            phone: form.querySelector('#c-phone').value,
            dob: form.querySelector('#c-dob').value,
            notes: form.querySelector('#c-notes').value,
            date: new Date().toLocaleDateString()
        };
        this.state.consultations.push(lead);
        this.state.saveAll();
        alert(`Namaste ${lead.name}.\nOur certified Astrologist will contact you shortly on WhatsApp for your Kundli discussion.`);
        form.reset();
        this.closeConsultationModal();
    }

    openInquiryModal(sku, name) {
        document.getElementById('inquiry-product-name').innerText = name;
        document.getElementById('inquiry-sku').value = sku;
        document.getElementById('inquiry-modal').classList.add('active');
    }
    closeInquiryModal() {
        document.getElementById('inquiry-modal').classList.remove('active');
    }
    submitInquiry(form) {
        const lead = {
            sku: form.querySelector('#inquiry-sku').value,
            name: form.querySelector('#inq-name').value,
            whatsapp: form.querySelector('#inq-whatsapp').value,
            msg: form.querySelector('#inq-msg').value,
            date: new Date().toLocaleDateString()
        };
        this.state.inquiries.push(lead);
        this.state.saveAll();
        alert(`Thank you ${lead.name}.\nCustom ring design inquiry received. Customizer representative will contact you.`);
        form.reset();
        this.closeInquiryModal();
    }

    openCertVerifyModal() {
        document.getElementById('cert-verify-modal').classList.add('active');
    }
    closeCertVerifyModal() {
        document.getElementById('cert-verify-modal').classList.remove('active');
        document.getElementById('cert-verify-result').innerHTML = '';
    }
    verifyCertificate(form) {
        const lab = form.querySelector('#cert-lab').value;
        const certId = form.querySelector('#cert-id').value.toUpperCase();
        
        const container = document.getElementById('cert-verify-result');
        container.innerHTML = `
            <div style="background:rgba(212,175,55,0.1); border:1px solid var(--gold-mid); padding:15px; border-radius:4px; margin-top:20px; font-size:12px;">
                <h4 style="color:var(--gold-mid); margin-bottom:5px;">🔬 Report Authentic & Match Found</h4>
                <p><strong>Issuing Authority:</strong> ${lab} Laboratory</p>
                <p><strong>Certificate Status:</strong> Government Registered (100% Genuine Natural Stone)</p>
                <p><strong>Record Stamp:</strong> Certified Jaipur Natural Sourced</p>
            </div>
        `;
    }

    openBespokeJewelryModal() {
        document.getElementById('bespoke-modal').classList.add('active');
        this.goToBespokeStep(1);
    }
    closeBespokeJewelryModal() {
        document.getElementById('bespoke-modal').classList.remove('active');
    }
    goToBespokeStep(step) {
        document.querySelectorAll('.step-indicator').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.bespoke-pane').forEach(el => el.classList.remove('active'));
        
        document.getElementById(`b-step-${step}`).classList.add('active');
        document.getElementById(`pane-${step}`).classList.add('active');
    }
    submitBespokeDesign(form) {
        const lead = {
            stone: form.querySelector('#bespoke-stone').value,
            carats: form.querySelector('#bespoke-carats').value,
            metal: form.querySelector('#bespoke-metal').value,
            size: form.querySelector('#bespoke-ring-size').value,
            custom: form.querySelector('#bespoke-notes').value,
            date: new Date().toLocaleDateString()
        };
        this.state.inquiries.push({ sku: "BESPOKE-STUDIO", name: "Bespoke Jewelry", whatsapp: "Via Bespoke Form", msg: JSON.stringify(lead), date: lead.date });
        this.state.saveAll();
        alert("Bespoke custom jewelry design specs successfully locked. Our designer will draft the 3D model sketch!");
        form.reset();
        this.closeBespokeJewelryModal();
    }

    // Live Chat Controller Mock
    toggleChat() {
        document.getElementById('chat-window').classList.toggle('active');
    }
    sendChatMessage() {
        const inp = document.getElementById('chat-input-field');
        const text = inp.value.trim();
        if (!text) return;
        
        const container = document.getElementById('chat-messages');
        // Add User Message
        container.innerHTML += `<div class="msg user-msg"><p>${text}</p></div>`;
        inp.value = '';
        container.scrollTop = container.scrollHeight;
        
        // AI Response Logic
        setTimeout(() => {
            let resp = "That is a beautiful inquiry. Most planetary gemstones operate best in yellow gold settings. Let me schedule an astrologer to analyze your ascendant.";
            const norm = text.toLowerCase();
            if (norm.includes("saturn") || norm.includes("blue sapphire") || norm.includes("neelam")) {
                resp = "Saturn (Shani) rules focus and authority. Sapphire should be worn on Saturday morning in a silver or panchdhatu band.";
            } else if (norm.includes("ruby") || norm.includes("manik") || norm.includes("sun")) {
                resp = "The Sun (Surya) represents life force. Best worn in gold on Sunday morning during Shukla Paksha sunrise.";
            }
            container.innerHTML += `<div class="msg bot-msg"><p>${resp}</p></div>`;
            container.scrollTop = container.scrollHeight;
        }, 1000);
    }
}

// Instantiate global app motor
window.router = new AppRouter();
