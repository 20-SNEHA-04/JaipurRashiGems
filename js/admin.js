// Live Admin Dashboard Module for JaipurRashiGems
const AdminDashboard = {
  orders: [
    { id: "JRG-9023", customer: "Aditya Vardhan", product: "Ceylon Blue Sapphire (Neelam)", total: 1850, date: "June 01, 2026", status: "Processing" },
    { id: "JRG-8991", customer: "Sarah Connor", product: "Italian Red Coral Pendant", total: 450, date: "May 28, 2026", status: "Shipped" },
    { id: "JRG-8762", customer: "Karan Johar", product: "Ceylon Yellow Sapphire (Pukhraj)", total: 2400, date: "May 22, 2026", status: "Delivered" }
  ],

  init() {
    // Read from local storage if available
    const savedOrders = localStorage.getItem("jrg_admin_orders");
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
    } else {
      this.saveOrders();
    }
  },

  saveOrders() {
    localStorage.setItem("jrg_admin_orders", JSON.stringify(this.orders));
  },

  addOrder(customer, product, total) {
    const newId = "JRG-" + Math.floor(1000 + Math.random() * 9000);
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    this.orders.unshift({ id: newId, customer, product, total, date: today, status: "Processing" });
    this.saveOrders();
  },

  render(container) {
    this.init();
    
    // Calculate dashboard statistics
    const totalRevenue = this.orders.reduce((acc, curr) => acc + curr.total, 0);
    const activeOrders = this.orders.filter(o => o.status === "Processing").length;
    const inventoryCount = window.GemstoneDB.products.length;

    let content = `
      <div class="admin-wrapper">
        <div class="admin-header">
          <h2>Luxury Vault Operations</h2>
          <p>Real-time analytics and inventory dashboard for JaipurRashiGems.</p>
        </div>

        <div class="admin-stats-grid">
          <div class="stat-card">
            <h4>Total Revenue</h4>
            <p class="stat-value">$${totalRevenue.toLocaleString()}</p>
            <span class="trend positive">&uarr; 14.2% this month</span>
          </div>
          <div class="stat-card">
            <h4>Active Orders</h4>
            <p class="stat-value">${activeOrders}</p>
            <span class="trend">Awaiting Dispatch</span>
          </div>
          <div class="stat-card">
            <h4>Vault Inventory</h4>
            <p class="stat-value">${inventoryCount} Items</p>
            <span class="trend neutral">100% GIA/GRS certified</span>
          </div>
        </div>

        <div class="admin-body-grid">
          <div class="admin-card table-card">
            <div class="card-header">
              <h3>Recent Acquisitions & Orders</h3>
            </div>
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.orders.map(order => `
                    <tr>
                      <td><strong>${order.id}</strong></td>
                      <td>${order.customer}</td>
                      <td>${order.product}</td>
                      <td>$${order.total}</td>
                      <td>${order.date}</td>
                      <td><span class="status-badge ${order.status.toLowerCase()}">${order.status}</span></td>
                      <td>
                        ${order.status === "Processing" ? `<button class="action-link" onclick="AdminDashboard.shipOrder('${order.id}')">Ship</button>` : `<span class="completed-check">&checkmark; Completed</span>`}
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>

          <div class="admin-card form-card">
            <div class="card-header">
              <h3>Secure Vault Accession</h3>
            </div>
            <form id="admin-add-product-form" onsubmit="AdminDashboard.handleProductSubmit(event)">
              <div class="form-group">
                <label for="prod-name">Gemstone/Jewelry Name</label>
                <input type="text" id="prod-name" required placeholder="e.g. Imperial Ceylon Sapphire">
              </div>
              <div class="form-row">
                <div class="form-group col">
                  <label for="prod-category">Category</label>
                  <select id="prod-category" onchange="AdminDashboard.updateSubcats()">
                    <option value="precious">Precious Gemstone</option>
                    <option value="semi-precious">Semi-Precious</option>
                    <option value="jewelry">Fine Jewelry</option>
                  </select>
                </div>
                <div class="form-group col">
                  <label for="prod-price">Price ($ USD)</label>
                  <input type="number" id="prod-price" required min="10">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col">
                  <label for="prod-origin">Origin</label>
                  <input type="text" id="prod-origin" required placeholder="e.g. Ceylon, Burma, Italy">
                </div>
                <div class="form-group col">
                  <label for="prod-carat">Carat Weight</label>
                  <input type="text" id="prod-carat" required placeholder="e.g. 4.80">
                </div>
              </div>
              <button type="submit" class="gold-btn btn-primary btn-block">Accession to Vault</button>
            </form>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = content;
  },

  shipOrder(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = "Shipped";
      this.saveOrders();
      window.location.reload(); // Refresh SPA current view
    }
  },

  handleProductSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("prod-name").value;
    const category = document.getElementById("prod-category").value;
    const price = parseFloat(document.getElementById("prod-price").value);
    const origin = document.getElementById("prod-origin").value;
    const weight = document.getElementById("prod-carat").value;

    const newProduct = {
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name,
      sku: "ACC-" + Math.floor(100 + Math.random() * 900),
      category,
      subCategory: category === "precious" ? "blue-sapphire" : "amethyst",
      color: "Blue",
      origin,
      shape: "Oval",
      weight,
      clarity: "Eye Clean",
      treatment: "Unheated",
      certificate: "GIA Certified",
      price,
      currency: "USD",
      rating: 5.0,
      reviewsCount: 1,
      image: "blue-sapphire",
      description: "A secure vault addition. Natural astrological crystalline alignment certified for JaipurRashiGems.",
      specifications: {
        "Carat Weight": `${weight} Carats`,
        "Origin": origin,
        "Certification": "GIA Certified"
      },
      astrology: { planet: "Saturn", rashi: ["Capricorn"], benefits: ["Prosperity", "Intellectual growth"] },
      faqs: [],
      reviews: []
    };

    window.GemstoneDB.products.push(newProduct);
    alert("Premium gem added to the live vault catalog!");
    window.location.hash = "#/gemstones";
  }
};

window.AdminDashboard = AdminDashboard;
