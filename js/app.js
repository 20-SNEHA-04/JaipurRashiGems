// Central Application Controller for JaipurRashiGems
const app = {
  state: {
    cart: [],
    wishlist: [],
    compareList: [],
    filters: {
      category: "all",
      planet: "all",
      origin: "all",
      color: "all",
      sort: "default"
    },
    searchQuery: "",
    recentlyViewed: []
  },

  init() {
    // Load local storage states
    this.state.cart = JSON.parse(localStorage.getItem("jrg_cart")) || [];
    this.state.wishlist = JSON.parse(localStorage.getItem("jrg_wishlist")) || [];
    this.updateCounters();

    // Register routes
    Router.add("#/", () => this.renderHome(), {
      title: "Jaipur Rashi Gems | House of Astrological Premium Gemstones",
      description: "Explore 100% natural, unheated Ceylon Blue Sapphires, Pukhraj, and Colombian Emeralds. Certified, Vedic recommended stones for career, wealth, and health."
    });
    
    Router.add("#/gemstones", () => this.renderGemstones(), {
      title: "Certified Astrological Gemstones Collection | Jaipur Rashi Gems",
      description: "Buy rare unheated gemstones online. Wide selection of certified Ruby (Manik), Emerald (Panna), Blue Sapphire (Neelam) and semi-precious birthstones."
    });

    Router.add("#/gemstone/:id", (params) => this.renderGemstoneDetail(params.id), {
      title: "Buy Gemstone Online | Jaipur Rashi Gems",
      description: "Exquisite details, specifications, lab reports, Vedic alignment instructions, and direct customer reviews of our elite gemstones."
    });

    Router.add("#/jewelry", () => this.renderJewelry(), {
      title: "Fine Astrological Luxury Jewelry | Rings, Pendants, Bracelets",
      description: "Handcrafted 18k and 22k gold astrological rings, pendants, and bracelets with direct contact gemstone settings."
    });

    Router.add("#/recommendation", () => this.renderRecommendation(), {
      title: "Free Astrological Gemstone Recommendation Tool | Vedic Birth Chart Analyzer",
      description: "Enter your birth details to receive a customized gemstone report based on planetary configurations, ascendants, and rashi signs."
    });

    Router.add("#/education", () => this.renderEducation(), {
      title: "Gemstone Educational Guide & Buying Encyclopedia | Jaipur Rashi Gems",
      description: "Learn about the 4 Cs of colored gemstones, Vedic wearing rituals, cleaning guides, and astronomical significance."
    });

    Router.add("#/astrology", () => this.renderAstrology(), {
      title: "Zodiac & Planetary Birthstone Guide | Astro Gems Alignment",
      description: "Complete astrological index of zodiac compatibility, planetary rulers, and recommended beneficial birthstones."
    });

    Router.add("#/cart", () => this.renderCart(), {
      title: "Your Luxury Vault Cart | Secure Checkout",
      description: "Complete your safe and secure purchase of certified luxury gemstones and custom fine jewelry."
    });

    Router.add("#/checkout", () => this.renderCheckout(), {
      title: "Secure Payment Gateway | Jaipur Rashi Gems",
      description: "Complete your gemstone order using premium encrypted credit card processors, PayPal, or UPI payment options."
    });

    Router.add("#/admin", () => this.renderAdmin(), {
      title: "Vault Operations Admin Dashboard",
      description: "Private operations panel for managing orders, catalog updates, and vault inventory logs."
    });

    Router.add("#/blog", () => this.renderBlog(), {
      title: "User Reviews & Testimony | Jaipur Rashi Gems",
      description: "Read noble customer stories, astrological successes, and unheated gemstone testimonies from our premium buyers."
    });

    Router.add("#/contact", () => this.renderContact(), {
      title: "Connect with Gemologist Experts | Contact Jaipur Rashi Gems",
      description: "Get personalized gemstone recommendations or custom design consultations with our master astrologers."
    });

    Router.add("#/about", () => this.renderAbout(), {
      title: "Our Heritage & Certified Quality Promise | Jaipur Rashi Gems",
      description: "Discover our family legacy of sourcing pure, untreated gemstones from the mineral-rich basins of Ceylon and Mogok."
    });

    Router.init();
    this.setupGlobalEvents();
  },

  setupGlobalEvents() {
    // Search event
    const searchInput = document.getElementById("nav-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.state.searchQuery = e.target.value;
        this.showSearchDropdown();
      });
      searchInput.addEventListener("focus", () => this.showSearchDropdown());
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-container")) {
          const dropdown = document.getElementById("search-dropdown");
          if (dropdown) dropdown.style.display = "none";
        }
      });
    }

    // Toggle mini drawer
    document.addEventListener("click", (e) => {
      if (e.target.closest(".cart-toggle")) {
        this.toggleCartDrawer();
      }

      // Dynamic sitemap mega menu click interceptor
      const megaLink = e.target.closest(".mega-menu a");
      if (megaLink) {
        const text = megaLink.textContent.trim().toLowerCase();
        
        // Force hide mega menu dropdown immediately on click so user sees the new page!
        const megaMenu = megaLink.closest(".mega-menu");
        if (megaMenu) {
          megaMenu.classList.add("force-hide");
          
          // Reset force-hide on mouseleave of the list item so it works on next hover
          const parentLi = megaLink.closest(".has-mega-menu");
          if (parentLi) {
            parentLi.addEventListener("mouseleave", () => {
              megaMenu.classList.remove("force-hide");
            }, { once: true });
          }
        }

        // Reset filters for a clean click-through flow
        this.state.filters = {
          category: "all",
          planet: "all",
          origin: "all",
          color: "all",
          subCategory: "all",
          sort: "default"
        };

        if (text.includes("ring")) {
          this.state.filters.subCategory = "rings";
          window.location.hash = "#/jewelry";
          this.renderJewelry();
        } else if (text.includes("pendant") || text.includes("earring") || text.includes("necklace") || text.includes("bracelet") || text.includes("brooch")) {
          this.state.filters.subCategory = "pendants";
          window.location.hash = "#/jewelry";
          this.renderJewelry();
        } else {
          // Gemstone filter mappings based on item label text
          if (text.includes("blue sapphire") || text.includes("neelam")) this.state.filters.subCategory = "blue-sapphire";
          else if (text.includes("yellow sapphire") || text.includes("pukhraj")) this.state.filters.subCategory = "yellow-sapphire";
          else if (text.includes("emerald") || text.includes("panna")) this.state.filters.subCategory = "emerald";
          else if (text.includes("ruby") || text.includes("manik")) this.state.filters.subCategory = "ruby";
          else if (text.includes("amethyst") || text.includes("jamunia")) this.state.filters.subCategory = "amethyst";
          else if (text.includes("coral") || text.includes("moonga")) this.state.filters.subCategory = "red-coral";
          else if (text.includes("opal")) this.state.filters.subCategory = "opal";
          
          window.location.hash = "#/gemstones";
          this.renderGemstones();
        }
      }
    });
  },

  updateCounters() {
    const cartCounts = document.querySelectorAll(".cart-count-badge");
    cartCounts.forEach(el => el.textContent = this.state.cart.length);

    const wishlistCounts = document.querySelectorAll(".wishlist-count-badge");
    wishlistCounts.forEach(el => el.textContent = this.state.wishlist.length);
  },

  addToCart(productId, quantity = 1) {
    const product = window.GemstoneDB.products.find(p => p.id === productId);
    if (!product) return;

    const existing = this.state.cart.find(item => item.product.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.state.cart.push({ product, quantity });
    }

    localStorage.setItem("jrg_cart", JSON.stringify(this.state.cart));
    this.updateCounters();
    this.renderCartDrawer();
    this.toggleCartDrawer(true);
  },

  removeFromCart(productId) {
    this.state.cart = this.state.cart.filter(item => item.product.id !== productId);
    localStorage.setItem("jrg_cart", JSON.stringify(this.state.cart));
    this.updateCounters();
    this.renderCartDrawer();
  },

  toggleWishlist(productId) {
    const idx = this.state.wishlist.indexOf(productId);
    if (idx > -1) {
      this.state.wishlist.splice(idx, 1);
      alert("Removed from wishlist.");
    } else {
      this.state.wishlist.push(productId);
      alert("Added to wishlist.");
    }
    localStorage.setItem("jrg_wishlist", JSON.stringify(this.state.wishlist));
    this.updateCounters();
    // Re-render current page to show active states
    const activeRoute = window.location.hash || "#/";
    if (activeRoute.startsWith("#/gemstones")) this.renderGemstones();
  },

  toggleCompare(productId) {
    const idx = this.state.compareList.indexOf(productId);
    if (idx > -1) {
      this.state.compareList.splice(idx, 1);
    } else {
      if (this.state.compareList.length >= 3) {
        alert("You can compare up to 3 gemstones at a time.");
        return;
      }
      this.state.compareList.push(productId);
    }
    this.renderCompareBar();
  },

  renderCompareBar() {
    const bar = document.getElementById("compare-drawer");
    if (!bar) return;

    if (this.state.compareList.length === 0) {
      bar.classList.remove("active");
      return;
    }

    bar.classList.add("active");
    const itemsHTML = this.state.compareList.map(id => {
      const p = window.GemstoneDB.products.find(prod => prod.id === id);
      return `
        <div class="compare-item-card">
          <span class="compare-stone-thumb ${p.image}"></span>
          <span>${p.name.substring(0, 20)}...</span>
          <button class="remove-btn" onclick="app.toggleCompare('${p.id}')">&times;</button>
        </div>
      `;
    }).join("");

    bar.innerHTML = `
      <div class="compare-inner">
        <div class="compare-items-row">${itemsHTML}</div>
        <div class="compare-actions">
          <button class="gold-btn btn-secondary" onclick="app.clearCompare()">Clear</button>
          <button class="gold-btn btn-primary" onclick="app.showCompareModal()">Compare Now</button>
        </div>
      </div>
    `;
  },

  clearCompare() {
    this.state.compareList = [];
    this.renderCompareBar();
  },

  showCompareModal() {
    const modal = document.getElementById("global-modal");
    if (!modal) return;

    const products = this.state.compareList.map(id => window.GemstoneDB.products.find(p => p.id === id));
    
    let specs = ["Carat Weight", "Origin", "Color", "Shape/Cut", "Treatment", "Certification", "Clarity", "Planet"];
    
    let modalHTML = `
      <div class="modal-dialog compare-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Secure Gemstone Comparison</h3>
            <button class="close-modal" onclick="app.closeModal()">&times;</button>
          </div>
          <div class="modal-body">
            <div class="compare-table-wrapper">
              <table class="compare-table">
                <thead>
                  <tr>
                    <th>Attributes</th>
                    ${products.map(p => `
                      <th>
                        <div class="compare-col-header">
                          <div class="gem-avatar ${p.image}"></div>
                          <p>${p.name}</p>
                          <p class="price">$${p.price}</p>
                        </div>
                      </th>
                    `).join("")}
                  </tr>
                </thead>
                <tbody>
                  ${specs.map(spec => `
                    <tr>
                      <td><strong>${spec}</strong></td>
                      ${products.map(p => `
                        <td>${p.specifications[spec] || "N/A"}</td>
                      `).join("")}
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.innerHTML = modalHTML;
    modal.classList.add("active");
  },

  closeModal() {
    const modal = document.getElementById("global-modal");
    if (modal) modal.classList.remove("active");
  },

  toggleCartDrawer(forceOpen = false) {
    const drawer = document.getElementById("cart-drawer");
    if (!drawer) return;
    if (forceOpen) {
      drawer.classList.add("active");
    } else {
      drawer.classList.toggle("active");
    }
    this.renderCartDrawer();
  },

  renderCartDrawer() {
    const drawerInner = document.getElementById("cart-drawer-inner");
    if (!drawerInner) return;

    if (this.state.cart.length === 0) {
      drawerInner.innerHTML = `
        <div class="empty-cart-state">
          <p>Your luxury vault is empty.</p>
          <a href="#/gemstones" class="gold-btn btn-primary" onclick="app.toggleCartDrawer()">Browse Gems</a>
        </div>
      `;
      return;
    }

    const cartTotal = this.state.cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);

    drawerInner.innerHTML = `
      <div class="cart-drawer-list">
        ${this.state.cart.map(item => `
          <div class="cart-drawer-item">
            <div class="stone-icon ${item.product.image}"></div>
            <div class="details">
              <h5>${item.product.name}</h5>
              <p>${item.quantity} x $${item.product.price}</p>
            </div>
            <button class="remove-cart-item" onclick="app.removeFromCart('${item.product.id}')">&times;</button>
          </div>
        `).join("")}
      </div>
      <div class="cart-drawer-footer">
        <div class="total-row">
          <span>Vault Total:</span>
          <strong>$${cartTotal.toLocaleString()}</strong>
        </div>
        <a href="#/cart" class="gold-btn btn-primary btn-block text-center" style="display:block; text-decoration:none;" onclick="app.toggleCartDrawer()">View Cart</a>
        <a href="#/checkout" class="gold-btn btn-secondary btn-block text-center" style="display:block; text-decoration:none;" onclick="app.toggleCartDrawer()">Secure Checkout</a>
      </div>
    `;
  },

  showSearchDropdown() {
    const dropdown = document.getElementById("search-dropdown");
    if (!dropdown) return;

    if (this.state.searchQuery.trim().length === 0) {
      dropdown.style.display = "none";
      return;
    }

    const filtered = window.GemstoneDB.products.filter(p => 
      p.name.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
      p.origin.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    );

    dropdown.style.display = "block";
    if (filtered.length === 0) {
      dropdown.innerHTML = `<div class="search-item">No celestial gemstones found</div>`;
      return;
    }

    dropdown.innerHTML = filtered.map(p => `
      <div class="search-item" onclick="window.location.hash='#/gemstone/${p.id}'; document.getElementById('search-dropdown').style.display='none';">
        <div class="search-item-thumb ${p.image}"></div>
        <div class="details">
          <strong>${p.name}</strong>
          <span class="sub">$${p.price} - ${p.origin}</span>
        </div>
      </div>
    `).join("");
  },

  setFilter(key, value) {
    // Reset filters for a clean click-through selection flow
    this.state.filters = {
      category: "all",
      planet: "all",
      origin: "all",
      color: "all",
      subCategory: "all",
      sort: "default"
    };

    if (key === 'jewelry-subCategory') {
      this.state.filters.subCategory = value;
      window.location.hash = "#/jewelry";
      const activePanel = document.getElementById("app-view");
      if (activePanel && window.location.hash === "#/jewelry") this.renderJewelry();
    } else {
      this.state.filters[key] = value;
      window.location.hash = "#/gemstones";
      const activePanel = document.getElementById("app-view");
      if (activePanel && window.location.hash === "#/gemstones") this.renderGemstones();
    }
  },

  selectMenuCategory(key, value) {
    this.setFilter(key, value);
  },

  // VIEWS RENDERERS
  renderHome() {
    const container = document.getElementById("app-view");
    
    // Featured gemstones list
    const featured = window.GemstoneDB.products.slice(0, 4);

    container.innerHTML = `
      <!-- Hero Banner -->
      <section class="hero-banner">
        <div class="hero-flex-container">
          <!-- Left side: Find Your Right Gemstone Card -->
          <div class="find-gem-card">
            <h2>Find Your Right Gemstone</h2>
            
            <div class="search-options-row">
              <label class="radio-label">
                <input type="radio" name="gem-find-type" checked>
                <span class="custom-radio"></span> By Gemstone
              </label>
              <label class="radio-label">
                <input type="radio" name="gem-find-type">
                <span class="custom-radio"></span> By Purpose
              </label>
            </div>

            <div class="dropdowns-stack">
              <div class="custom-select-wrapper">
                <select id="hero-select-gem">
                  <option value="">Select Gemstone</option>
                  <option value="blue-sapphire">Blue Sapphire (Neelam)</option>
                  <option value="yellow-sapphire">Yellow Sapphire (Pukhraj)</option>
                  <option value="emerald">Emerald (Panna)</option>
                  <option value="ruby">Ruby (Manik)</option>
                  <option value="amethyst">Amethyst (Jamunia)</option>
                  <option value="red-coral">Red Coral (Moonga)</option>
                  <option value="opal">Opal</option>
                </select>
                <span class="select-caret">&#9662;</span>
              </div>

              <div class="custom-select-wrapper">
                <select id="hero-select-carat">
                  <option value="">Select Carat Weight</option>
                  <option value="2-4">2 to 4 Carats</option>
                  <option value="4-6">4 to 6 Carats</option>
                  <option value="6-8">6 to 8 Carats</option>
                  <option value="8+">8+ Carats</option>
                </select>
                <span class="select-caret">&#9662;</span>
              </div>

              <div class="custom-select-wrapper">
                <select id="hero-select-price">
                  <option value="">Select Price</option>
                  <option value="0-500">Under $500</option>
                  <option value="500-1000">$500 - $1000</option>
                  <option value="1000-2000">$1000 - $2000</option>
                  <option value="2000+">$2000+</option>
                </select>
                <span class="select-caret">&#9662;</span>
              </div>
            </div>

            <button class="hero-search-gradient-btn" onclick="app.handleHeroSearch()">Search</button>

            <div class="advanced-search-link-row">
              <a href="#/gemstones">Advanced Search &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Trust Badges -->
      <section class="trust-badges-bar">
        <div class="badge-item"><i class="badge-icon icon-shield"></i> 100% GRS/GIA/IGI Certified</div>
        <div class="badge-item"><i class="badge-icon icon-gem"></i> Guaranteed Natural & Unheated</div>
        <div class="badge-item"><i class="badge-icon icon-globe"></i> Insured Global Luxury Shipping</div>
        <div class="badge-item"><i class="badge-icon icon-refresh"></i> 10-Day Money Back Guarantee</div>
      </section>

      <!-- Buy Gemstones Online -->
      <section class="section-padding buy-gems-online-section">
        <h2 class="section-title text-center" style="font-family:var(--font-heading);">Buy Gemstones Online</h2>
        <p class="section-subtitle text-center" style="text-transform:uppercase; font-size:0.75rem; letter-spacing:1px; font-weight:700; color:#e05e3a;">Products of Trusted Excellence</p>
        
        <div class="buy-gems-grid">
          <!-- Card 1 -->
          <div class="gem-buy-card" onclick="app.selectMenuCategory('subCategory', 'yellow-sapphire')">
            <div class="gem-avatar-circle yellow-sapphire"></div>
            <h3>Yellow Sapphire &nbsp;&rtrif;</h3>
            <p>Divine Luck, Prosperity, Blissful Matrimony</p>
          </div>
          <!-- Card 2 -->
          <div class="gem-buy-card" onclick="app.selectMenuCategory('subCategory', 'blue-sapphire')">
            <div class="gem-avatar-circle blue-sapphire"></div>
            <h3>Blue Sapphire &nbsp;&rtrif;</h3>
            <p>Great Fame, Discipline, Reverses Misfortunes</p>
          </div>
          <!-- Card 3 -->
          <div class="gem-buy-card" onclick="app.selectMenuCategory('subCategory', 'emerald')">
            <div class="gem-avatar-circle emerald"></div>
            <h3>Emerald &nbsp;&rtrif;</h3>
            <p>Vocal Charm, Creativity, Success in Business</p>
          </div>
          <!-- Card 4 -->
          <div class="gem-buy-card" onclick="app.selectMenuCategory('subCategory', 'ruby')">
            <div class="gem-avatar-circle ruby"></div>
            <h3>Ruby &nbsp;&rtrif;</h3>
            <p>Great Health, Will Power, Fame & Reputation</p>
          </div>
          <!-- Card 5 -->
          <div class="gem-buy-card" onclick="app.selectMenuCategory('subCategory', 'opal')">
            <div class="gem-avatar-circle opal"></div>
            <h3>Opal &nbsp;&rtrif;</h3>
            <p>Luxury, Physical Beauty, Romantic Bliss</p>
          </div>
          <!-- Card 6 -->
          <div class="gem-buy-card" onclick="app.selectMenuCategory('subCategory', 'opal')">
            <div class="gem-avatar-circle opal" style="background:#e2e8f0; border:1px solid #cbd5e0;"></div>
            <h3>Pearl &nbsp;&rtrif;</h3>
            <p>Mental Strength, Fortune, Peace & Fulfillment</p>
          </div>
          <!-- Card 7 -->
          <div class="gem-buy-card" onclick="app.selectMenuCategory('subCategory', 'red-coral')">
            <div class="gem-avatar-circle red-coral"></div>
            <h3>Red Coral &nbsp;&rtrif;</h3>
            <p>Averts Mishaps, Courage, Overall Strength</p>
          </div>
          <!-- Card 8 -->
          <div class="gem-buy-card" onclick="app.selectMenuCategory('subCategory', 'amethyst')">
            <div class="gem-avatar-circle amethyst"></div>
            <h3>Hessonite &nbsp;&rtrif;</h3>
            <p>Pacifies Rahu, Popularity, Speculative Success</p>
          </div>
        </div>
      </section>

      <!-- Gemstone Jewellery Explore Banner -->
      <section class="gemstone-jewel-banner" onclick="window.location.hash='#/jewelry'">
        <div class="jewel-banner-content">
          <h2>Gemstone Jewellery</h2>
          <button class="explore-btn" onclick="window.location.hash='#/jewelry'">Explore</button>
        </div>
      </section>

      <!-- Bestselling tab section -->
      <section class="section-padding bestselling-section">
        <h2 class="section-title text-center">Our Bestselling</h2>
        
        <div class="bestselling-tabs">
          <button class="bestsell-tab active" onclick="app.toggleBestsellingTab(event, 'rings')">Rings</button>
          <button class="bestsell-tab" onclick="app.toggleBestsellingTab(event, 'pendants')">Pendants</button>
          <button class="bestsell-tab" onclick="app.toggleBestsellingTab(event, 'bracelets')">Bracelets</button>
        </div>

        <div id="bestselling-rings" class="bestselling-content active">
          <div class="bestselling-products-row">
            <!-- Product 1 -->
            <div class="bestsell-prod-card" onclick="window.location.hash='#/jewelry'">
              <div class="prod-img-box"><div class="gem-avatar-circle emerald" style="width:70px; height:70px; border-radius:50%; border:3px double #fcd34d;"></div></div>
              <h4>Channel Set Baguette Diamond Emerald Rose Gold Engagement Ring</h4>
            </div>
            <!-- Product 2 -->
            <div class="bestsell-prod-card" onclick="window.location.hash='#/jewelry'">
              <div class="prod-img-box"><div class="gem-avatar-circle amethyst" style="width:70px; height:70px; border-radius:50%; border:3px double #fcd34d;"></div></div>
              <h4>Amethyst Panchdhatu Ring (R1-Dazzle)</h4>
            </div>
            <!-- Product 3 -->
            <div class="bestsell-prod-card" onclick="window.location.hash='#/jewelry'">
              <div class="prod-img-box"><div class="gem-avatar-circle blue-sapphire" style="width:70px; height:70px; border-radius:50%; border:3px double #fcd34d;"></div></div>
              <h4>Diamond Over Bezel Edge Tanzanite White Gold Engagement Ring</h4>
            </div>
            <!-- Product 4 -->
            <div class="bestsell-prod-card" onclick="window.location.hash='#/jewelry'">
              <div class="prod-img-box"><div class="gem-avatar-circle opal" style="width:70px; height:70px; border-radius:50%; border:3px double #fcd34d;"></div></div>
              <h4>Opal with Fire (Ethiopia) Sterling Silver Ring (AO28)</h4>
            </div>
            <!-- Product 5 -->
            <div class="bestsell-prod-card" onclick="window.location.hash='#/jewelry'">
              <div class="prod-img-box"><div class="gem-avatar-circle rubygold" style="width:70px; height:70px; border-radius:50%; border:3px double #fcd34d; background:radial-gradient(circle, #ef4444 0%, #b91c1c 70%);"></div></div>
              <h4>Navratna Yellow Gold Ring (N3)</h4>
            </div>
          </div>
        </div>

        <div id="bestselling-pendants" class="bestselling-content">
          <div class="bestselling-products-row">
            <div class="bestsell-prod-card" style="flex:1;" onclick="window.location.hash='#/jewelry'">
              <div class="prod-img-box"><div class="gem-avatar-circle yellow-sapphire" style="width:70px; height:70px; border-radius:10px;"></div></div>
              <h4>Divine Yellow Sapphire Gold Pendant</h4>
            </div>
          </div>
        </div>

        <div id="bestselling-bracelets" class="bestselling-content">
          <div class="bestselling-products-row">
            <div class="bestsell-prod-card" style="flex:1;" onclick="window.location.hash='#/jewelry'">
              <div class="prod-img-box"><div class="gem-avatar-circle amethyst" style="width:70px; height:70px; border-radius:10px;"></div></div>
              <h4>Custom Amethyst Astrological Silver Bracelet</h4>
            </div>
          </div>
        </div>

        <div class="text-center" style="margin-top:40px;">
          <button class="gold-btn btn-primary" onclick="window.location.hash='#/jewelry'">View All</button>
        </div>
      </section>

      <!-- Astrological Recommender Banner -->
      <section class="recommender-banner">
        <div class="recommender-banner-overlay"></div>
        <div class="recommender-banner-content">
          <span class="badge gold-badge">Aura alignment calculator</span>
          <h2>Not sure which Gemstone fits your birth alignment?</h2>
          <p>Utilize our advanced machine-modeled Vedic Chart Recommendation tool to pinpoint exactly which gemstone will balance your active ascendants.</p>
          <a href="#/recommendation" class="gold-btn btn-primary" style="text-decoration:none; display:inline-block;">Analyze Chart Now</a>
        </div>
      </section>

      <!-- Featured showcase -->
      <section class="section-padding">
        <h2 class="section-title text-center">Highly Rare Acquisitions</h2>
        <div class="products-grid">
          ${featured.map(p => this.createProductCardHTML(p)).join("")}
        </div>
      </section>

      <!-- Astrology & Planet Indexes -->
      <section class="section-padding bg-charcoal">
        <h2 class="section-title text-center">Planetary Rulers</h2>
        <div class="planets-nav-grid">
          ${Object.entries(window.GemstoneDB.astrologyGuides.planets).map(([name, val]) => `
            <div class="planet-pill-card" onclick="app.setFilter('planet', '${name}')">
              <div class="planet-glow"></div>
              <h4>${name}</h4>
              <p>${val.stone}</p>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- Educational Preview -->
      <section class="section-padding">
        <h2 class="section-title text-center">Celestial Chronicle Insights</h2>
        <div class="blog-grid">
          ${window.GemstoneDB.blogs.map(post => `
            <div class="blog-preview-card" onclick="window.location.hash='#/blog'">
              <div class="blog-thumb ${post.image}"></div>
              <div class="content">
                <span class="date">${post.date} | By ${post.author}</span>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <span class="read-more">Acquire Wisdom &rarr;</span>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- Customer Reviews -->
      <section class="section-padding bg-charcoal text-center">
        <h2 class="section-title">Verified Astrological Reviews</h2>
        <div class="reviews-marquee">
          <div class="review-quote-card">
            <p>"My business saw unprecedented growth within 2 months of wearing the Ceylon Yellow Sapphire. The quality of counseling from Jaipur Rashi Gems was first class."</p>
            <h5>- Manish Goel, Delhi</h5>
          </div>
          <div class="review-quote-card">
            <p>"Authentic certificates provided with instant online verification. Extremely safe global packaging for luxury products."</p>
            <h5>- Sarah Jenkins, London</h5>
          </div>
        </div>
      </section>

      <!-- Global Trust & Guarantee -->
      <section class="guarantee-badge-section text-center">
        <h2>Certified Luxury Assurance</h2>
        <p>Every celestial acquisition passes through rigid laboratory inspections from authorized international bodies.</p>
        <div class="trust-icons-row">
          <div class="trust-badge-card">GIA Certified</div>
          <div class="trust-badge-card">GRS Certified</div>
          <div class="trust-badge-card">IGI Certified</div>
        </div>
      </section>
    `;
    
    // Auto start the verified reviews animated cross-fader
    setTimeout(() => this.startReviewsCarousel(), 100);
  },

  renderGemstones() {
    const container = document.getElementById("app-view");
    
    // Build catalog filtering view
    const products = window.GemstoneDB.products;
    
    // Apply filters
    const filtered = products.filter(p => {
      if (this.state.filters.category !== "all" && p.category !== this.state.filters.category) return false;
      if (this.state.filters.planet !== "all" && p.astrology?.planet !== this.state.filters.planet) return false;
      if (this.state.filters.origin !== "all" && p.origin.toLowerCase() !== this.state.filters.origin.toLowerCase()) return false;
      if (this.state.filters.color !== "all" && p.color.toLowerCase() !== this.state.filters.color.toLowerCase()) return false;
      if (this.state.filters.subCategory !== "all" && p.subCategory !== this.state.filters.subCategory) return false;
      return true;
    });

    container.innerHTML = `
      <div class="catalog-page section-padding">
        <div class="catalog-header">
          <h2>Luxury Vault Catalog</h2>
          <p>Showing ${filtered.length} of ${products.length} cosmic gemstone acquisitions</p>
        </div>

        <div class="catalog-layout">
          <!-- Filters sidebar -->
          <aside class="catalog-filters">
            <div class="filter-group">
              <h4>Acquisition Category</h4>
              <select onchange="app.state.filters.category = this.value; app.renderGemstones();">
                <option value="all" ${this.state.filters.category === "all" ? "selected" : ""}>All Categories</option>
                <option value="precious" ${this.state.filters.category === "precious" ? "selected" : ""}>Precious Gems</option>
                <option value="semi-precious" ${this.state.filters.category === "semi-precious" ? "selected" : ""}>Semi-Precious</option>
              </select>
            </div>

            <div class="filter-group">
              <h4>Planetary Alignment</h4>
              <select onchange="app.state.filters.planet = this.value; app.renderGemstones();">
                <option value="all" ${this.state.filters.planet === "all" ? "selected" : ""}>All Planets</option>
                ${Object.keys(window.GemstoneDB.astrologyGuides.planets).map(pName => `
                  <option value="${pName}" ${this.state.filters.planet === pName ? "selected" : ""}>${pName}</option>
                `).join("")}
              </select>
            </div>

            <div class="filter-group">
              <h4>Origin Location</h4>
              <select onchange="app.state.filters.origin = this.value; app.renderGemstones();">
                <option value="all" ${this.state.filters.origin === "all" ? "selected" : ""}>All Origins</option>
                <option value="Ceylon (Sri Lanka)" ${this.state.filters.origin === "Ceylon (Sri Lanka)" ? "selected" : ""}>Ceylon (Sri Lanka)</option>
                <option value="Zambia" ${this.state.filters.origin === "Zambia" ? "selected" : ""}>Zambia</option>
                <option value="Brazil" ${this.state.filters.origin === "Brazil" ? "selected" : ""}>Brazil</option>
                <option value="Italy" ${this.state.filters.origin === "Italy" ? "selected" : ""}>Italy</option>
              </select>
            </div>

            <button class="gold-btn btn-secondary btn-block" onclick="app.resetFilters()">Reset Filters</button>
          </aside>

          <!-- Grid area -->
          <main class="catalog-grid-area">
            ${filtered.length === 0 ? `
              <div class="no-results-box text-center">
                <p>No celestial alignments match your current filtration settings.</p>
                <button class="gold-btn btn-primary" onclick="app.resetFilters()">Clear Filters</button>
              </div>
            ` : `
              <div class="products-grid">
                ${filtered.map(p => this.createProductCardHTML(p)).join("")}
              </div>
            `}
          </main>
        </div>
      </div>
    `;
  },

  resetFilters() {
    this.state.filters = { category: "all", planet: "all", origin: "all", color: "all", sort: "default" };
    this.renderGemstones();
  },

    const isWishlisted = this.state.wishlist.includes(p.id);
    const isComparing = this.state.compareList.includes(p.id);
    const visualHTML = p.driveImage 
      ? `<img src="${p.driveImage}" alt="${p.name}" class="gemstone-glimmer-avatar" style="width:110px; height:110px; object-fit:contain; border-radius:50%; box-shadow:0 0 25px rgba(255,255,255,0.15); transition:var(--transition-smooth);">`
      : `<div class="gemstone-glimmer-avatar ${p.image}"></div>`;

    return `
      <div class="luxury-product-card">
        <div class="card-header-actions">
          <button class="action-circle-btn ${isWishlisted ? 'active' : ''}" onclick="app.toggleWishlist('${p.id}')" title="Add to Wishlist">
            &hearts;
          </button>
          <button class="action-circle-btn ${isComparing ? 'active' : ''}" onclick="app.toggleCompare('${p.id}')" title="Compare Attributes">
            &harr;
          </button>
        </div>
        
        <div class="product-visual-wrapper" onclick="window.location.hash='#/gemstone/${p.id}'">
          ${visualHTML}
        </div>

        <div class="product-info">
          <span class="stone-origin">${p.origin} &bull; ${p.certificate}</span>
          <h3 onclick="window.location.hash='#/gemstone/${p.id}'">${p.name}</h3>
          
          <div class="astro-tag">
            <span>Lord: <strong>${p.astrology?.planet || "Venus"}</strong></span>
          </div>

          <div class="pricing-row">
            <span class="price">$${p.price.toLocaleString()}</span>
            <button class="gold-btn btn-card-buy" onclick="app.addToCart('${p.id}')">Secure Acquisition</button>
          </div>
        </div>
      </div>
    `;
  },

  // Bespoke 1000+ Word Astrological & Technical SEO Copy Generator
  generateSEOCopy(p) {
    const name = p.name;
    const origin = p.origin || "Unknown Origin";
    const planet = p.astrology?.planet || "Venus";
    const weight = p.specifications["Carat Weight"] || p.weight + " Carat";
    const shape = p.specifications["Shape/Cut"] || p.shape || "Natural Cut";
    const treatment = p.specifications["Treatment"] || p.treatment || "Untreated";
    const cert = p.specifications["Certification"] || p.certificate || "Lab Certified";
    const metal = p.specifications["Metal Recommendation"] || "18k White Gold / Panchdhatu";
    const luckyZodiacs = p.astrology?.rashi?.join(", ") || "All Zodiacs";
    const primaryBenefit = p.astrology?.benefits?.[0] || "Brings divine blessings, peace, and spiritual growth";

    // 1000+ words bespoke detailed sections
    return {
      overview: `
        <div class="luxury-copy-section">
          <h3>Vedic Astrological Revelations of ${name}</h3>
          <p>Sourced from the historic, highly mineralized veins of <strong>${origin}</strong>, this majestic <strong>${weight} ${shape}</strong> is not merely an ornament of extreme beauty; it is a celestial powerhouse. In the ancient, sacred scriptures of Indian Vedic Astrology (Jyotish Shastra), gemstones are regarded as physical crystal receivers of cosmic planetary radiations. This pristine, <strong>${treatment}</strong> gemstone stands as the absolute physical embodiment of the cosmic energies of <strong>Lord ${planet}</strong>.</p>
          <p>When a natural gemstone is completely untreated, its atomic crystal lattices remain fully intact, allowing it to act as an unhindered light prism. Light traveling through this immaculate crystalline structure absorbs the unique electro-magnetic wavelengths of the ruling planet, directly infusing the wearer's aura with powerful vibrational adjustments. For centuries, royal dynasties and master spiritual seekers across the Indian subcontinent have turned to unheated gemstones to balance their horoscopic charts, dispel planetary blockages, and draw divine luck, absolute career authority, and profound inner harmony.</p>
          <blockquote>"A pure, unheated cosmic gemstone possesses the capability to alter the flow of karmic destiny by realigning the planetary vibrations within the human energy body." - Astrological Secrets of the Sages</blockquote>
        </div>
      `,
      ritual: `
        <div class="luxury-copy-section">
          <h3>Sacred Vedic Chanting & Wearing Ritual (Prana Pratishtha)</h3>
          <p>To awaken the dormant cosmic energies within this highly potent <strong>${cert}</strong> gemstone, the wearer must perform the sacred Vedic consecration ritual. Astrological gemstones must not be worn directly without purification, as they absorb minor stray vibrations during transit from their mineral origins.</p>
          <div class="ritual-steps-box">
            <div class="step-card">
              <span class="step-num">01</span>
              <h5>Divine Consecration Time</h5>
              <p>Prepare for the ritual on a highly auspicious morning corresponding to the planetary ruler. Cleanse your mind, wear pure white or yellow attire, and face the East direction to welcome solar radiations.</p>
            </div>
            <div class="step-card">
              <span class="step-num">02</span>
              <h5>Panchamrit Cleansing Bath</h5>
              <p>Submerge your custom mounted ring or pendant in a sacred bowl containing <strong>Panchamrit</strong> (a holy mixture of raw cow milk, pure gangajal water, liquid honey, fresh curd, and organic ghee) for 10-15 minutes to strip away stray physical impurities.</p>
            </div>
            <div class="step-card">
              <span class="step-num">03</span>
              <h5>Prana Mantra Chanting</h5>
              <p>Remove the ring, wash it with pure gangajal, and hold it in your dominant hand. Close your eyes and chant the powerful planetary seed mantra precisely <strong>108 times</strong> to invoke the blessings of <strong>Lord ${planet}</strong>:
              <br><strong class="mantra-text">"Om Sri ${planet.toUpperCase()} Devaya Namaha"</strong> or <strong class="mantra-text">"Om Hreem Shreem..."</strong></p>
            </div>
            <div class="step-card">
              <span class="step-num">04</span>
              <h5>Sacred Placement</h5>
              <p>Gently slide the energized gemstone ring onto your designated finger (Vedic recommendation: wear on the right hand's ring or index finger for active energy transmission, or mount in a direct skin contact pendant).</p>
            </div>
          </div>
        </div>
      `,
      history: `
        <div class="luxury-copy-section">
          <h3>Geological Formation & Historic Legend</h3>
          <p>Every genuine natural gemstone holds an evolutionary memory spanning millions of years. This incredible specimen of <strong>${name}</strong> began its miraculous journey deep within the Earth's crust under temperatures exceeding 1200 degrees Celsius and intense tectonic pressures. The spectacular saturated color hues and pristine clarity are a result of rare traces of trace elements like chromium, iron, or titanium perfectly integrating into the crystal lattice during slow crystallization.</p>
          <p>Historically, gemstones of this high caliber were exclusively reserved for sovereign rulers and emperors of ancient India, Persia, and Rome. Known in Sanskrit as <em>Rashi Ratnas</em>, they were studded into royal crowns, divine scepters, and defensive talismans. Today, our master lapidaries hand-cut and polish each rough mineral crystal in Jaipur, preserving maximum weight and optical brilliance to deliver a product of unparalleled heritage value.</p>
        </div>
      `,
      buyingGuide: `
        <div class="luxury-copy-section">
          <h3>Luxury Collector's Quality Analysis & Price Factors</h3>
          <p>Determining the valuation of high-tier unheated gemstones involves analyzing the classic <strong>4 Cs</strong>: Color Saturated Hue, Crystal Clarity, Cut Precision, and Carat Weight, along with the highly critical fifth factor—provenance (Origin). Sourced from <strong>${origin}</strong>, this gemstone commands a significant market premium due to its historic mine reputation. While heated stones lose their rare trace fluids and internal silk structures, this completely unheated sample remains 100% natural, making it up to <strong>10 times rarer</strong> than standard heated commercial-grade gems.</p>
          <p>When purchasing certified gemstones online, ensure you receive a report from a highly trusted, independent international gemological authority such as <strong>GIA, GRS, or IGI</strong>. This product comes with a verifiable security hologram and individual registry number, allowing you to instantly double-check its specifications directly on the official lab registry portal.</p>
        </div>
      `,
      care: `
        <div class="luxury-copy-section">
          <h3>Celestial Gemstone Care & Longevity Guidelines</h3>
          <p>Natural unheated gemstones are incredibly durable mineral crystals, but they require periodic care to maintain their radiant cosmic luster and energetic purity:</p>
          <ul>
            <li><strong>Periodical Cleansing:</strong> Cleanse your gemstone every 3-4 months to remove built-up dust and body oils. Wash gently using lukewarm water, a drop of mild organic baby soap, and a very soft toothbrush.</li>
            <li><strong>Energetic Purifications:</strong> To restore its cosmic vibrational potency, place the gemstone ring under direct moonlight on a clear full moon night.</li>
            <li><strong>Avoid Harsh Chemicals:</strong> Never expose your premium jewelry to abrasive household chemicals, chlorine pools, perfumes, or intense ultrasonic jewelry cleaners.</li>
          </ul>
        </div>
      `
    };
  },

  // Automated JSON-LD Schema Markups to boost organic search engine rankings
  generateSchemas(p) {
    const existing = document.getElementById("dynamic-seo-schemas");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = "dynamic-seo-schemas";
    script.type = "application/ld+json";

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": p.name,
      "image": `https://jaipur-rashi-gems-2026.web.app/assets/${p.image}.png`,
      "description": p.description,
      "sku": p.sku,
      "offers": {
        "@type": "Offer",
        "url": window.location.href,
        "priceCurrency": p.currency || "USD",
        "price": p.price,
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2027-12-31"
      },
      "brand": {
        "@type": "Brand",
        "name": "Jaipur Rashi Gems"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": p.rating || "4.9",
        "reviewCount": p.reviewsCount || "10"
      }
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://jaipur-rashi-gems-2026.web.app/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Gemstones",
          "item": "https://jaipur-rashi-gems-2026.web.app/#/gemstones"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": p.name,
          "item": window.location.href
        }
      ]
    };

    script.textContent = JSON.stringify([productSchema, breadcrumbSchema]);
    document.head.appendChild(script);
  },

  renderGemstoneDetail(productId) {
    const container = document.getElementById("app-view");
    const p = window.GemstoneDB.products.find(prod => prod.id === productId);

    if (!p) {
      container.innerHTML = `<div class="text-center section-padding"><h2>Product not found in the luxury vault.</h2></div>`;
      return;
    }

    // Generate meta schemas instantly
    this.generateSchemas(p);

    // Recently viewed stack logic
    if (!this.state.recentlyViewed.includes(p.id)) {
      this.state.recentlyViewed.unshift(p.id);
      if (this.state.recentlyViewed.length > 4) this.state.recentlyViewed.pop();
    }

    // Compile dynamic 1000+ words SEO text templates
    const seoText = this.generateSEOCopy(p);

    // Related gems (filter by planetary matches or categories)
    const relatedGems = window.GemstoneDB.products
      .filter(item => item.id !== p.id && (item.astrology?.planet === p.astrology?.planet || item.category === p.category))
      .slice(0, 4);

    container.innerHTML = `
      <div class="product-detail-page section-padding">
        <div class="breadcrumb">
          <a href="#/">Home</a> / <a href="#/gemstones">${p.category.toUpperCase()}</a> / <span>${p.name}</span>
        </div>

        <div class="product-split-pane">
          <!-- Gallery -->
          <div class="product-gallery-side">
            <div class="primary-preview-box">
              ${p.driveImage 
                ? `<img src="${p.driveImage}" alt="${p.name}" class="large-gem-avatar" style="width:200px; height:200px; object-fit:contain; border-radius:50%; box-shadow:0 0 45px rgba(255,255,255,0.15);">`
                : `<div class="large-gem-avatar ${p.image}"></div>`
              }
            </div>
            <div class="trust-indicators-grid">
              <div class="trust-mini-card"><strong>Natural</strong> unheated quality</div>
              <div class="trust-mini-card"><strong>Lab Verified</strong> records</div>
              <div class="trust-mini-card"><strong>Insured</strong> logistics</div>
            </div>
          </div>

          <!-- Purchasing Details -->
          <div class="product-purchase-side">
            <span class="badge gold-badge">${p.certificate}</span>
            <span class="sku-text">SKU: ${p.sku}</span>
            <h1>${p.name}</h1>
            
            <div class="rating-stars-row">
              <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span>(${p.rating} / 5 out of ${p.reviewsCount} reviews)</span>
            </div>

            <div class="price-banner">
              <span class="amount">$${p.price.toLocaleString()}</span>
              <span class="shipping-info">Free Insured Courier | Includes GST Invoice</span>
            </div>

            <p class="description">${p.description}</p>

            <div class="buying-actions-block">
              <button class="gold-btn btn-primary btn-large btn-block" onclick="app.addToCart('${p.id}')">Secure Acquisition</button>
              <button class="gold-btn btn-secondary btn-block" onclick="app.openInquiryModal('${p.name}')">Request Expert Video Consultation</button>
            </div>

            <!-- Astrological summary -->
            <div class="astro-summary-box">
              <h4>Astrological Configuration</h4>
              <ul>
                <li>Planetary Ruler: <strong>${p.astrology?.planet || "N/A"}</strong></li>
                <li>Zodiac Affiliation: <strong>${p.astrology?.rashi?.join(", ") || "All"}</strong></li>
                <li>Cosmic Benefits: <strong>${p.astrology?.benefits?.slice(0,2).join(", ")}</strong></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Details, Specs, FAQ and Review tabs -->
        <div class="tabs-container">
          <div class="tabs-header">
            <button class="tab-btn active" onclick="app.toggleTab(event, 'specifications')">Specifications</button>
            <button class="tab-btn" onclick="app.toggleTab(event, 'benefits')">Vedic Astrology & Benefits</button>
            <button class="tab-btn" onclick="app.toggleTab(event, 'ritual')">Wearing Ritual</button>
            <button class="tab-btn" onclick="app.toggleTab(event, 'care')">Care Guidelines</button>
            <button class="tab-btn" onclick="app.toggleTab(event, 'faq')">FAQ Structure</button>
            <button class="tab-btn" onclick="app.toggleTab(event, 'reviews')">User Reviews (${p.reviewsCount || (p.reviews ? p.reviews.length : 0)})</button>
          </div>

          <div id="tab-specifications" class="tab-panel active">
            <table class="specs-table">
              <tbody>
                ${Object.entries(p.specifications).map(([key, val]) => `
                  <tr>
                    <td><strong>${key}</strong></td>
                    <td>${val}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
            
            <div style="margin-top: 30px;">
              ${seoText.history}
              ${seoText.buyingGuide}
            </div>
          </div>

          <div id="tab-benefits" class="tab-panel">
            ${seoText.overview}
            <div class="vedic-benefits-grid" style="margin-top: 25px;">
              ${p.astrology?.benefits?.map(b => `
                <div class="benefit-bullet-card">
                  <h5>Astrological Influence</h5>
                  <p>${b}</p>
                </div>
              `).join("") || `<p>Authentic astrological substitute gemstone with stellar natural crystal clarity.</p>`}
            </div>
          </div>

          <div id="tab-ritual" class="tab-panel">
            ${seoText.ritual}
          </div>

          <div id="tab-care" class="tab-panel">
            ${seoText.care}
          </div>

          <div id="tab-faq" class="tab-panel">
            <div class="faq-list">
              ${p.faqs?.length > 0 ? p.faqs.map(faq => `
                <div class="faq-accordion-item">
                  <h5>${faq.q}</h5>
                  <p>${faq.a}</p>
                </div>
              `).join("") : ""}
              
              <div class="faq-accordion-item">
                <h5>How do I verify the authenticity of this gemstone report?</h5>
                <p>Every premium gemstone in our vault is certified by recognized organizations like GIA, GRS, or IGI. Each lab certificate features a unique scanning QR code and report number that can be authenticated instantly online on their respective global registry websites.</p>
              </div>
              <div class="faq-accordion-item">
                <h5>Do you offer custom jewelry settings for astrological use?</h5>
                <p>Yes, we specialize in high-end, custom gold and silver rings, pendants, and bracelets. Our master jewelers ensure the gemstone is placed in a direct-contact setting (where the pavilion of the gemstone touches the skin) to transmit continuous cosmic vibrations.</p>
              </div>
            </div>
          </div>

          <div id="tab-reviews" class="tab-panel">
            <div class="user-reviews-layout">
              <div class="reviews-header">
                <h4>Verified Buyer Audits</h4>
                <button class="gold-btn btn-primary" style="padding:8px 16px; font-size:0.8rem;" onclick="app.toggleReviewForm()">Write A Review</button>
              </div>

              <!-- Dynamic review submission form -->
              <div id="write-review-form-box" class="write-review-form-box" style="display:none;">
                <h5>Submit Your Astrological Acquisition Review</h5>
                <form onsubmit="app.submitProductReview(event, '${p.id}')">
                  <div class="form-row">
                    <div class="form-group flex-1">
                      <label style="display:block; margin-bottom:6px; font-size:0.85rem;">Full Name</label>
                      <input type="text" id="review-author" required placeholder="Noble Seeker" style="margin-bottom:12px;">
                    </div>
                    <div class="form-group">
                      <label style="display:block; margin-bottom:6px; font-size:0.85rem;">Planetary Rating</label>
                      <select id="review-rating" required style="width:100%; height:42px; margin-bottom:12px;">
                        <option value="5">★★★★★ - Divine / Highly Potent</option>
                        <option value="4">★★★★☆ - Powerful Alignment</option>
                        <option value="3">★★★☆☆ - Balanced Influence</option>
                        <option value="2">★★☆☆☆ - Low Vibration</option>
                        <option value="1">★☆☆☆☆ - Disharmonious</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label style="display:block; margin-bottom:6px; font-size:0.85rem;">Review Summary</label>
                    <input type="text" id="review-title" required placeholder="e.g. Felt sudden career clarity!" style="margin-bottom:12px;">
                  </div>
                  <div class="form-group">
                    <label style="display:block; margin-bottom:6px; font-size:0.85rem;">Vedic Experience Details</label>
                    <textarea id="review-text" rows="3" required placeholder="Describe your experience after performing the wearing ritual..." style="margin-bottom:15px;"></textarea>
                  </div>
                  <button type="submit" class="gold-btn btn-primary" style="padding:10px 20px;">Publish Review</button>
                </form>
              </div>

              <!-- Reviews List -->
              <div id="product-reviews-list" class="product-reviews-list">
                ${p.reviews && p.reviews.length > 0 ? p.reviews.map(r => `
                  <div class="review-item-card">
                    <div class="review-meta">
                      <div class="review-author"><strong>${r.user || r.author}</strong> <span class="verified-badge">✓ Verified Buyer</span></div>
                      <div class="review-stars">${"★".repeat(r.rating || 5)}${"☆".repeat(5 - (r.rating || 5))}</div>
                    </div>
                    <h5 class="review-item-title">${r.title || "Elite Gemstone Quality"}</h5>
                    <p class="review-item-text">${r.comment || r.text || "Extremely pure and energetic gemstone. The laboratory reports match GRS/GIA perfectly."}</p>
                  </div>
                `).join("") : `
                  <div class="review-item-card">
                    <div class="review-meta">
                      <div class="review-author"><strong>Vikram Shah</strong> <span class="verified-badge">✓ Verified Buyer</span></div>
                      <div class="review-stars">★★★★★</div>
                    </div>
                    <h5 class="review-item-title">Breathtaking Luster & Astrological Shift</h5>
                    <p class="review-item-text">Absolutely breathtaking! Wore this gemstone after the custom chanting rituals, and felt immediately aligned. Truly premium certified unheated quality.</p>
                  </div>
                `}
              </div>
            </div>
          </div>
        </div>

        <!-- Related Gemstones Section -->
        ${relatedGems.length > 0 ? `
          <section class="related-gemstones-section section-padding">
            <h3>Harmonious Astrological Gemstones</h3>
            <div class="products-grid">
              ${relatedGems.map(item => this.createProductCardHTML(item)).join("")}
            </div>
          </section>
        ` : ""}

        <!-- Recently viewed / related products -->
        ${this.renderRecentlyViewed()}
      </div>
    `;
  },

  renderRecentlyViewed() {
    const list = this.state.recentlyViewed.filter(id => window.GemstoneDB.products.some(p => p.id === id));
    if (list.length <= 1) return "";

    const filteredItems = list.map(id => window.GemstoneDB.products.find(p => p.id === id));

    return `
      <section class="recently-viewed-section section-padding">
        <h3>Recently Inspected Acquisitions</h3>
        <div class="products-grid">
          ${filteredItems.map(p => this.createProductCardHTML(p)).join("")}
        </div>
      </section>
    `;
  },

  toggleTab(event, panelId) {
    const panels = document.querySelectorAll(".tab-panel");
    panels.forEach(p => p.classList.remove("active"));

    const buttons = document.querySelectorAll(".tab-btn");
    buttons.forEach(b => b.classList.remove("active"));

    event.target.classList.add("active");
    const activePanel = document.getElementById("tab-" + panelId);
    if (activePanel) activePanel.classList.add("active");
  },

  toggleReviewForm() {
    const box = document.getElementById("write-review-form-box");
    if (box) {
      box.style.display = box.style.display === "none" ? "block" : "none";
    }
  },

  submitProductReview(event, productId) {
    event.preventDefault();
    const author = document.getElementById("review-author").value;
    const rating = parseInt(document.getElementById("review-rating").value) || 5;
    const title = document.getElementById("review-title").value;
    const text = document.getElementById("review-text").value;

    const p = window.GemstoneDB.products.find(prod => prod.id === productId);
    if (p) {
      if (!p.reviews) p.reviews = [];
      p.reviews.unshift({
        user: author,
        rating: rating,
        title: title,
        comment: text,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      });
      p.reviewsCount = (p.reviewsCount || 0) + 1;
      
      alert("Divine acquisition audit secured successfully! Thank you for sharing your alignment journey.");
      this.renderGemstoneDetail(productId);
      
      // Trigger review tab show synchronously
      setTimeout(() => {
        const tabBtn = Array.from(document.querySelectorAll(".tab-btn")).find(btn => btn.textContent.includes("User Reviews"));
        if (tabBtn) tabBtn.click();
      }, 50);
    }
  },

  toggleBestsellingTab(event, panelId) {
    const panels = document.querySelectorAll(".bestselling-content");
    panels.forEach(p => p.classList.remove("active"));

    const buttons = document.querySelectorAll(".bestsell-tab");
    buttons.forEach(b => b.classList.remove("active"));

    event.target.classList.add("active");
    const activePanel = document.getElementById("bestselling-" + panelId);
    if (activePanel) activePanel.classList.add("active");
  },

  openInquiryModal(productName) {
    const modal = document.getElementById("global-modal");
    if (!modal) return;

    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Expert Astrological Consult</h3>
            <button class="close-modal" onclick="app.closeModal()">&times;</button>
          </div>
          <div class="modal-body">
            <form onsubmit="app.handleInquirySubmit(event, '${productName}')">
              <p class="subtitle">Request an HD video walkthrough or planetary alignment check for: <strong>${productName}</strong></p>
              <div class="form-group">
                <label>Your Name</label>
                <input type="text" required placeholder="Noble Seeker">
              </div>
              <div class="form-group">
                <label>WhatsApp / Phone Number</label>
                <input type="tel" required placeholder="+91 99999 88888">
              </div>
              <div class="form-group">
                <label>Your Message / Astrology Questions</label>
                <textarea rows="3" placeholder="Tell us your goals or active ascendants..."></textarea>
              </div>
              <button type="submit" class="gold-btn btn-primary btn-block">Schedule Consultation</button>
            </form>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("active");
  },

  handleInquirySubmit(event, productName) {
    event.preventDefault();
    alert(`Thank you. Our master astrologer and gemology experts will connect with you on WhatsApp shortly for: ${productName}`);
    this.closeModal();
  },

  renderJewelry() {
    const container = document.getElementById("app-view");
    const products = window.GemstoneDB.products.filter(p => p.category === "jewelry");

    const filtered = products.filter(p => {
      if (this.state.filters.subCategory !== "all" && p.subCategory !== this.state.filters.subCategory) return false;
      return true;
    });

    container.innerHTML = `
      <div class="jewelry-page section-padding">
        <div class="catalog-header text-center">
          <h2>Luxury Astrological Jewelry</h2>
          <p>Hand-crafted 18k and 22k gold setting designs featuring direct skin contact mounts for maximum astronomical power channeling.</p>
        </div>

        <div class="products-grid" style="width: 100%;">
          ${filtered.length === 0 ? `
            <div class="no-results-box text-center" style="grid-column: 1 / -1; padding: 40px;">
              <p>No customized jewelry matches your specific search attributes currently in our vault.</p>
              <button class="gold-btn btn-primary" style="margin-top:20px;" onclick="app.setFilter('jewelry-subCategory', 'all')">View All Jewelry</button>
            </div>
          ` : filtered.map(p => this.createProductCardHTML(p)).join("")}
        </div>
      </div>
    `;
  },

  renderRecommendation() {
    const container = document.getElementById("app-view");
    container.innerHTML = `
      <div class="recommendation-page section-padding">
        <div class="text-center catalog-header">
          <h2>Vedic Astrological Gemstone recommendation</h2>
          <p>Enter your birth coordinates to receive a personalized, premium report generated by simulated astrological matrices.</p>
        </div>
        <div id="recommender-mount"></div>
      </div>
    `;

    // Render step 1 instantly
    window.RecommendationWizard.render(document.getElementById("recommender-mount"));
  },

  renderEducation() {
    const container = document.getElementById("app-view");
    container.innerHTML = `
      <div class="education-page section-padding">
        <div class="catalog-header text-center">
          <h2>Celestial Gemstone Encyclopedia</h2>
          <p>Increase your gemological wisdom, learn cleansing rituals, and inspect authentic certifications.</p>
        </div>

        <div class="education-grid">
          ${window.GemstoneDB.educationalEncyclopedia.map(article => `
            <div class="luxury-card article-card">
              <h3>${article.title}</h3>
              <p class="summary">${article.summary}</p>
              <div class="article-body">
                ${article.content.replace(/\n/g, '<br>')}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  },

  renderAstrology() {
    const container = document.getElementById("app-view");
    const guides = window.GemstoneDB.astrologyGuides;

    container.innerHTML = `
      <div class="astrology-page section-padding">
        <div class="catalog-header text-center">
          <h2>Planetary rulers & Zodiac Matches</h2>
          <p>Locate your ascendant, identify beneficial gemstones, and discover powerful cosmic mantras.</p>
        </div>

        <div class="astrology-grid">
          <div class="luxury-card">
            <h3>Planetary Alignment Table</h3>
            <table class="specs-table">
              <thead>
                <tr>
                  <th>Planet</th>
                  <th>Core Astrological Gemstone</th>
                  <th>Ascendant Rulers</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(guides.planets).map(([key, val]) => `
                  <tr>
                    <td><strong>${key}</strong></td>
                    <td>${val.stone}</td>
                    <td>${val.rashi}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>

          <div class="luxury-card">
            <h3>Zodiac Core Birthstone Index</h3>
            <div class="zodiacs-flex-grid">
              ${Object.values(guides.zodiacs).map(z => `
                <div class="zodiac-card" onclick="app.setFilter('planet', '${z.lord}')">
                  <h4>${z.englishName} (${z.rashiName})</h4>
                  <p>Lord: <strong>${z.lord}</strong></p>
                  <p>Primary Stone: <strong>${z.stone}</strong></p>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderCart() {
    const container = document.getElementById("app-view");
    
    if (this.state.cart.length === 0) {
      container.innerHTML = `
        <div class="text-center section-padding empty-cart-main">
          <h2>Your Luxury Vault Cart is Empty</h2>
          <p>Align your cosmic profile or browse rare certified gemstones.</p>
          <a href="#/gemstones" class="gold-btn btn-primary" style="text-decoration:none; display:inline-block; margin-top:20px;">Browse Gems</a>
        </div>
      `;
      return;
    }

    const cartTotal = this.state.cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);

    container.innerHTML = `
      <div class="cart-page section-padding">
        <h2>Your Luxury Vault Cart</h2>
        
        <div class="cart-split-layout">
          <div class="cart-items-panel">
            ${this.state.cart.map(item => `
              <div class="cart-item-row">
                <div class="item-icon ${item.product.image}"></div>
                <div class="item-details">
                  <h4>${item.product.name}</h4>
                  <p>Origin: ${item.product.origin} | Certificate: ${item.product.certificate}</p>
                </div>
                <div class="item-qty">
                  <span>Qty: <strong>${item.quantity}</strong></span>
                </div>
                <div class="item-price">
                  <span>$${(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
                <button class="remove-btn-icon" onclick="app.removeFromCart('${item.product.id}'); app.renderCart();">&times;</button>
              </div>
            `).join("")}
          </div>

          <div class="cart-summary-panel">
            <div class="luxury-card">
              <h3>Acquisition Order Summary</h3>
              <div class="summary-row">
                <span>Certified Items (${this.state.cart.length})</span>
                <span>$${cartTotal.toLocaleString()}</span>
              </div>
              <div class="summary-row">
                <span>Insured Global Logistics</span>
                <span class="gold-text">FREE</span>
              </div>
              <hr class="gold-hr">
              <div class="summary-row total">
                <span>Grand Total:</span>
                <strong>$${cartTotal.toLocaleString()}</strong>
              </div>
              <a href="#/checkout" class="gold-btn btn-primary btn-block text-center" style="display:block; text-decoration:none; margin-top:20px;">Proceed to Secure Checkout</a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderCheckout() {
    const container = document.getElementById("app-view");
    const cartTotal = this.state.cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);

    if (this.state.cart.length === 0) {
      window.location.hash = "#/cart";
      return;
    }

    container.innerHTML = `
      <div class="checkout-page section-padding">
        <h2>Secure Gateway Checkout</h2>
        
        <div class="checkout-split-layout">
          <div class="checkout-form-panel">
            <form onsubmit="app.handlePaymentSubmit(event)">
              <div class="luxury-card">
                <h3>1. Consignee Delivery Address</h3>
                <div class="form-group">
                  <label>Consignee Name</label>
                  <input type="text" id="chk-cust" required placeholder="Enter full name...">
                </div>
                <div class="form-group">
                  <label>Delivery Address</label>
                  <input type="text" required placeholder="Luxury suite, street details...">
                </div>
                <div class="form-row">
                  <div class="form-group col">
                    <label>City</label>
                    <input type="text" required placeholder="Jaipur">
                  </div>
                  <div class="form-group col">
                    <label>Postal Code</label>
                    <input type="text" required placeholder="302001">
                  </div>
                </div>
              </div>

              <div class="luxury-card" style="margin-top:20px;">
                <h3>2. Secure Escrow Payment</h3>
                <p class="subtitle">Mock Razorpay / Stripe gateway simulated securely.</p>
                <div class="payment-modes-grid">
                  <div class="pay-option active">
                    <input type="radio" name="payment" id="p-card" checked>
                    <label for="p-card">Credit / Debit Card</label>
                  </div>
                  <div class="pay-option">
                    <input type="radio" name="payment" id="p-cod">
                    <label for="p-cod">Cash on Delivery (COD)</label>
                  </div>
                </div>
                
                <div class="form-group" style="margin-top:15px;">
                  <label>Card Number</label>
                  <input type="text" required placeholder="4111 2222 3333 4444" pattern="[0-9 ]+">
                </div>
              </div>

              <button type="submit" class="gold-btn btn-primary btn-block btn-large" style="margin-top:20px;">Authorized Order Acquisition ($${cartTotal.toLocaleString()})</button>
            </form>
          </div>

          <div class="checkout-summary-panel">
            <div class="luxury-card">
              <h3>Vault Package</h3>
              ${this.state.cart.map(item => `
                <div class="checkout-item-preview">
                  <span>${item.product.name.substring(0,25)}... (x${item.quantity})</span>
                  <strong>$${(item.product.price * item.quantity).toLocaleString()}</strong>
                </div>
              `).join("")}
              <hr class="gold-hr">
              <div class="summary-row total">
                <span>Secure Total:</span>
                <strong>$${cartTotal.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  handlePaymentSubmit(event) {
    event.preventDefault();
    const customer = document.getElementById("chk-cust").value;
    const itemsText = this.state.cart.map(i => `${i.product.name} (x${i.quantity})`).join(", ");
    const cartTotal = this.state.cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);

    // Accession order into admin system
    window.AdminDashboard.addOrder(customer, itemsText, cartTotal);

    // Empty cart
    this.state.cart = [];
    localStorage.removeItem("jrg_cart");
    this.updateCounters();

    // Show success modal
    const modal = document.getElementById("global-modal");
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content text-center">
          <div class="modal-header">
            <h3>Acquisition Complete</h3>
          </div>
          <div class="modal-body">
            <div class="success-checkmark">&checkmark;</div>
            <h4>Secure Transaction Authenticated</h4>
            <p>Your premium planetary gemstone order has been successfully queued in our vault. An insured GIA/GRS package is being custom mounted and wrapped.</p>
            <button class="gold-btn btn-primary" onclick="app.closeModal(); window.location.hash='#/admin';">Go to Live Operations Console</button>
          </div>
        </div>
      </div>
    `;
    modal.classList.add("active");
  },

  renderAdmin() {
    const container = document.getElementById("app-view");
    window.AdminDashboard.render(container);
  },

  renderBlog() {
    const container = document.getElementById("app-view");
    
    // Custom preloaded testimonies to keep UX premium
    const testimonies = [
      { author: "Acharya Vardhan", rating: 5, stone: "Burmese Manik", title: "Phenomenal Career Elevation", text: "Successfully consecrated the unheated Mogok Ruby following the exact Prana Pratishtha steps. Within days, felt a massive surge in authority, public speaking, and mental clarity during state assemblies." },
      { author: "Ramesh K. Singhal", rating: 5, stone: "Kashmir Blue Sapphire", title: "Immediate Financial Realignment", text: "The velvety Kashmir Neelam matched GRS registry perfectly. Noticed an immediate reversal of long-standing trade blockages and restoration of lost corporate opportunities." },
      { author: "Anjali Deshmukh", rating: 5, stone: "Colombian Panna", title: "Excellent Intellectual Sharpness", text: "Wore the Muzo Muzo Colombian Panna on a Wednesday. Cured my speech hesitation instantly and dramatically boosted my accounting business consulting wins." }
    ];

    container.innerHTML = `
      <div class="blog-page section-padding">
        <div class="catalog-header text-center">
          <h2>User Reviews & Celestial Testimony</h2>
          <p>Read authentic noble alignments, astrological success stories, and verified unheated quality audits from our premium patrons globally.</p>
        </div>

        <div class="admin-stats-grid" style="margin-bottom: 50px;">
          <div class="stat-card text-center" style="border: 1px solid rgba(212,175,55,0.2);">
            <h4>Global Rating</h4>
            <div class="stat-value">4.95 / 5</div>
            <p style="font-size:0.75rem; color:var(--text-muted);">Verified Buyer Baseline</p>
          </div>
          <div class="stat-card text-center" style="border: 1px solid rgba(212,175,55,0.2);">
            <h4>Consecration Success</h4>
            <div class="stat-value">98.6%</div>
            <p style="font-size:0.75rem; color:var(--text-muted);">Prana Pratishtha Alignment</p>
          </div>
          <div class="stat-card text-center" style="border: 1px solid rgba(212,175,55,0.2);">
            <h4>Insured Delivery</h4>
            <div class="stat-value">100%</div>
            <p style="font-size:0.75rem; color:var(--text-muted);">Secure Global Logistics</p>
          </div>
        </div>

        <div class="admin-body-grid">
          <!-- Left Column: Testimonies & Articles -->
          <div>
            <h3 style="color:var(--gold-champagne); margin-bottom:20px; font-family:var(--font-heading);">Noble Patron Stories</h3>
            <div id="global-testimonies-list" style="display:flex; flex-direction:column; gap:20px; margin-bottom:40px;">
              ${testimonies.map(t => `
                <div class="review-item-card">
                  <div class="review-meta">
                    <div class="review-author"><strong>${t.author}</strong> <span class="verified-badge">✓ Consecrated Wearer</span></div>
                    <div class="review-stars">${"★".repeat(t.rating)}</div>
                  </div>
                  <h5 class="review-item-title">${t.title} (${t.stone})</h5>
                  <p class="review-item-text">"${t.text}"</p>
                </div>
              `).join("")}
            </div>

            <h3 style="color:var(--gold-champagne); margin-bottom:20px; font-family:var(--font-heading);">Celestial Chronicles Blog</h3>
            <div class="blog-articles-list" style="display:flex; flex-direction:column; gap:25px;">
              ${window.GemstoneDB.blogs.map(post => `
                <article class="luxury-card blog-post-card" style="padding:25px;">
                  <div class="blog-header">
                    <h3 style="font-family:var(--font-heading); font-size:1.3rem; margin-bottom:10px;">${post.title}</h3>
                    <span class="meta" style="font-size:0.75rem; color:#e05e3a;">Published on ${post.date} | Astrologer: <strong>${post.author}</strong></span>
                  </div>
                  <div class="blog-body" style="margin-top:15px; font-size:0.88rem; line-height:1.7; color:var(--text-muted);">
                    <p>Discover the divine science, ancient astrological context, and geological rarity parameters associated with colored planetary gemstones. Sourced from deep-mantle formations and consecrated using planetary chants to align ascendant vibrations perfectly.</p>
                  </div>
                </article>
              `).join("")}
            </div>
          </div>

          <!-- Right Column: Interactive Review Submission Form -->
          <div class="luxury-card" style="height:fit-content; border: 1px solid rgba(212,175,55,0.25);">
            <h3 style="color:var(--gold-metallic); margin-bottom:15px; font-family:var(--font-body); font-size:1.2rem;">Share Your Alignment</h3>
            <p class="subtitle" style="font-size:0.78rem; color:var(--text-muted); margin-bottom:20px;">Submitted reviews undergo structural laboratory audit checks before publishing.</p>
            
            <form onsubmit="app.submitGlobalReview(event)">
              <div class="form-group">
                <label>Vedic Patron Name</label>
                <input type="text" id="g-author" required placeholder="Noble Seeker">
              </div>
              
              <div class="form-group">
                <label>Acquired Gemstone</label>
                <select id="g-stone" required style="width:100%; height:45px;">
                  <option value="Ceylon Blue Sapphire">Ceylon Blue Sapphire (Neelam)</option>
                  <option value="Burmese Ruby">Burmese Ruby (Manik)</option>
                  <option value="Colombian Emerald">Colombian Emerald (Panna)</option>
                  <option value="Yellow Sapphire">Yellow Sapphire (Pukhraj)</option>
                  <option value="Australian Opal">Australian Opal</option>
                  <option value="Italian Red Coral">Italian Red Coral (Moonga)</option>
                </select>
              </div>

              <div class="form-group">
                <label>Planetary Rating</label>
                <select id="g-rating" required style="width:100%; height:45px;">
                  <option value="5">★★★★★ - Divine Potency</option>
                  <option value="4">★★★★☆ - Strong Vibration</option>
                  <option value="3">★★★☆☆ - Moderate Harmony</option>
                </select>
              </div>

              <div class="form-group">
                <label>Testimony Title</label>
                <input type="text" id="g-title" required placeholder="e.g. Sudden business boom!">
              </div>

              <div class="form-group">
                <label>Detailed Cosmic Experience</label>
                <textarea id="g-text" rows="4" required placeholder="Detail the astrological improvements, mantra performance, and wear comfort..."></textarea>
              </div>

              <button type="submit" class="gold-btn btn-primary btn-block">Publish Secure Testimony</button>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  submitGlobalReview(event) {
    event.preventDefault();
    const name = document.getElementById("g-author").value;
    const stone = document.getElementById("g-stone").value;
    const rating = parseInt(document.getElementById("g-rating").value);
    const title = document.getElementById("g-title").value;
    const text = document.getElementById("g-text").value;

    const list = document.getElementById("global-testimonies-list");
    if (list) {
      const card = document.createElement("div");
      card.className = "review-item-card animate-box";
      card.style.borderLeft = "3px solid var(--gold-metallic)";
      card.style.background = "rgba(255,255,255,0.03)";
      card.style.padding = "20px";
      card.style.borderRadius = "6px";
      card.style.marginBottom = "15px";
      
      card.innerHTML = `
        <div class="review-meta" style="display:flex; justify-content:space-between; margin-bottom:10px;">
          <div class="review-author" style="font-size:0.9rem; color:var(--text-primary);"><strong>${name}</strong> <span class="verified-badge">✓ Consecrated Wearer</span></div>
          <div class="review-stars" style="color:var(--gold-metallic);">${"★".repeat(rating)}</div>
        </div>
        <h5 class="review-item-title" style="font-size:1rem; color:var(--gold-champagne); margin-bottom:8px;">${title} (${stone})</h5>
        <p class="review-item-text" style="font-size:0.88rem; color:var(--text-muted);">"${text}"</p>
      `;
      list.prepend(card);
      alert("Divine global testimony submitted successfully! Published instantly on our public board after passing cosmic security checks.");
      event.target.reset();
    }
  },

  renderAbout() {
    const container = document.getElementById("app-view");
    container.innerHTML = `
      <div class="about-page section-padding text-center">
        <div class="luxury-card" style="max-width: 800px; margin: 0 auto;">
          <h2>Legacy & Authenticity Promise</h2>
          <p class="subtitle">Sourcing direct unheated cosmic minerals since 1994.</p>
          <div class="about-body" style="text-align: left; margin-top:20px; line-height: 1.8;">
            <p>Welcome to <strong>Jaipur Rashi Gems</strong>, a premier celestial luxury gemological enterprise inspired by ancient Vedic scriptures and advanced modern mineralogy. Our mission is to secure 100% natural, ethical, unheated precious colored gemstones for astrological alignment, personal growth, and investment holdings.</p>
            <p>Every stone acquired from our historic mines in Sri Lanka, Burma, and Zambia is hand-assessed by certified mineralogists. We provide standard laboratory certification tags (GIA, GRS, IGI) ensuring absolute peace of mind for every luxury customer across the globe.</p>
          </div>
        </div>
      </div>
    `;
  },

  renderContact() {
    const container = document.getElementById("app-view");
    container.innerHTML = `
      <div class="contact-page section-padding" style="max-width: 600px; margin: 0 auto;">
        <div class="luxury-card">
          <h2>Connect with a Master Astrologer</h2>
          <p class="subtitle">Fill out this secure query line or get instant consultations over WhatsApp.</p>
          <form onsubmit="event.preventDefault(); alert('Consultation queue secured! Master Shailesh will call you shortly.'); this.reset();">
            <div class="form-group">
              <label>Your Name</label>
              <input type="text" required placeholder="Vedic Seeker">
            </div>
            <div class="form-group">
              <label>WhatsApp Number</label>
              <input type="tel" required placeholder="+91 XXXXX XXXXX">
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea rows="4" placeholder="Detail your astrological queries or focus gemstone choice..."></textarea>
            </div>
            <button type="submit" class="gold-btn btn-primary btn-block">Secure Consultation Queue</button>
          </form>
        </div>
      </div>
    `;
  },

  handleHeroSearch() {
    const gem = document.getElementById("hero-select-gem").value;
    const carat = document.getElementById("hero-select-carat").value;
    const price = document.getElementById("hero-select-price").value;

    if (gem) {
      this.state.filters.category = "all";
      // Determine filters based on gemstone selection
      if (gem === "blue-sapphire") this.state.filters.planet = "Saturn";
      if (gem === "yellow-sapphire") this.state.filters.planet = "Jupiter";
      if (gem === "emerald") this.state.filters.planet = "Mercury";
      if (gem === "ruby") this.state.filters.planet = "Sun";
      if (gem === "amethyst") this.state.filters.planet = "Saturn";
      if (gem === "red-coral") this.state.filters.planet = "Mars";
      if (gem === "opal") this.state.filters.planet = "Venus";
    }
    
    window.location.hash = "#/gemstones";
  },

  startReviewsCarousel() {
    let currentIndex = 0;
    const cards = document.querySelectorAll(".review-quote-card");
    if (cards.length <= 1) return;

    // Reset styles
    cards.forEach((card, idx) => {
      card.style.display = idx === 0 ? "block" : "none";
      card.style.opacity = idx === 0 ? "1" : "0";
      card.style.transition = "opacity 0.6s ease-out";
      card.style.margin = "0 auto";
    });

    if (this.reviewsInterval) clearInterval(this.reviewsInterval);

    this.reviewsInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % cards.length;
      
      // Fade out current
      cards[currentIndex].style.opacity = "0";
      setTimeout(() => {
        cards[currentIndex].style.display = "none";
        
        // Fade in next
        cards[nextIndex].style.display = "block";
        setTimeout(() => {
          cards[nextIndex].style.opacity = "1";
          currentIndex = nextIndex;
        }, 50);
      }, 600);
    }, 4000);
  }
};

window.app = app;
