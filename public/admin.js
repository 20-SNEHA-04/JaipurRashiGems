/* ==========================================================================
   JAIPUR RASHI GEMS - INTERACTIVE ADMIN DASHBOARD MOTOR (admin.js)
   ========================================================================== */

class AdminDashboard {
    constructor() {}

    renderDashboard(router) {
        const state = router.state;
        const products = state.products;
        const inquiries = state.inquiries;
        const consultations = state.consultations;

        // Build Admin Panel layout
        return `
            <div class="section-wrapper">
                <div class="section-header" style="border-bottom:2px solid var(--gold-mid); padding-bottom:15px; text-align:left;">
                    <h2 style="font-size:38px;">🛡️ Celestial Admin Console</h2>
                    <p>Internal inventory control, jewelry sourcing leads, and client horoscopic consultations.</p>
                </div>

                <!-- Admin Quick Stats Grid -->
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:20px; margin-bottom:40px;">
                    <div class="product-card" style="padding:20px;">
                        <span style="font-size:24px;">💎</span>
                        <h4>Total Gemstones</h4>
                        <strong style="font-size:24px; color:var(--gold-mid);">${products.length}</strong>
                    </div>
                    <div class="product-card" style="padding:20px;">
                        <span style="font-size:24px;">⚖️</span>
                        <h4>Jewelry Inquiries</h4>
                        <strong style="font-size:24px; color:var(--gold-mid);">${inquiries.length}</strong>
                    </div>
                    <div class="product-card" style="padding:20px;">
                        <span style="font-size:24px;">🌌</span>
                        <h4>Astro Consultations</h4>
                        <strong style="font-size:24px; color:var(--gold-mid);">${consultations.length}</strong>
                    </div>
                    <div class="product-card" style="padding:20px;">
                        <span style="font-size:24px;">⚠️</span>
                        <h4>Low Stock Alerts</h4>
                        <strong style="font-size:24px; color:#ff3366;">${products.filter(p => p.stock <= 3).length}</strong>
                    </div>
                </div>

                <div style="display:grid; grid-template-columns: 1.5fr 1fr; gap:4%; margin-bottom:50px;">
                    
                    <!-- Product Inventory Controller -->
                    <div>
                        <h3 style="margin-bottom:15px; border-bottom:1px solid var(--border-color); padding-bottom:8px;">Physical & Astrological Inventory</h3>
                        <div style="overflow-x:auto;">
                            <table class="admin-table" style="background:var(--bg-charcoal); border-radius:6px;">
                                <thead>
                                    <tr>
                                        <th>Gemstone Sku</th>
                                        <th>Name</th>
                                        <th>Weight</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${products.map(p => `
                                        <tr>
                                            <td><code>${p.sku}</code></td>
                                            <td><strong>${p.name}</strong></td>
                                            <td>${p.carats}ct (${p.origin})</td>
                                            <td style="color:var(--gold-light); font-weight:700;">${state.formatPrice(p.priceUSD)}</td>
                                            <td style="color:${p.stock <= 3 ? '#ff3366' : 'var(--silver-white)'}; font-weight:600;">
                                                ${p.stock} units ${p.stock <= 3 ? '⚠️' : ''}
                                            </td>
                                            <td>
                                                <button class="cart-remove-btn" onclick="window.adminDashboard.deleteProduct('${p.sku}')">Delete</button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Create Premium Gemstone Form -->
                    <div class="product-card" style="border-color:var(--gold-mid);">
                        <h3 style="color:var(--gold-mid); margin-bottom:15px;">Create Premium Gemstone</h3>
                        <form id="admin-create-form" onsubmit="event.preventDefault(); window.adminDashboard.createProduct(this);">
                            <div class="form-group">
                                <label>Product Sku</label>
                                <input type="text" id="p-sku" required placeholder="E.g., GEM-BS-099">
                            </div>
                            <div class="form-group">
                                <label>Gemstone Name</label>
                                <input type="text" id="p-name" required placeholder="Imperial Kashmir Blue Sapphire">
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Category</label>
                                    <select id="p-cat">
                                        <option value="precious">Precious Gemstone</option>
                                        <option value="semi-precious">Semi-Precious Gemstone</option>
                                        <option value="jewelry">Jewelry Piece</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Gemstone Type</label>
                                    <input type="text" id="p-type" required placeholder="Blue Sapphire">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Color</label>
                                    <input type="text" id="p-color" required placeholder="Blue">
                                </div>
                                <div class="form-group">
                                    <label>Origin</label>
                                    <input type="text" id="p-origin" required placeholder="Kashmir">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Carats</label>
                                    <input type="number" step="0.01" id="p-carat" required value="4.5">
                                </div>
                                <div class="form-group">
                                    <label>Price (USD)</label>
                                    <input type="number" id="p-price" required value="9500">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Governing Planet</label>
                                    <input type="text" id="p-planet" placeholder="Saturn">
                                </div>
                                <div class="form-group">
                                    <label>Favorable Zodiac (Rashi)</label>
                                    <input type="text" id="p-rashi" placeholder="Capricorn, Aquarius">
                                </div>
                            </div>
                            <button type="submit" class="gold-btn" style="width:100%;">Insert Certified Crystal</button>
                        </form>
                    </div>

                </div>

                <!-- Astrology Sourcing & Concierge Leads Section -->
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:40px;">
                    
                    <!-- Astro Consultation Logs -->
                    <div class="product-card">
                        <h3>Natal Chart Consultations Log (${consultations.length} leads)</h3>
                        <div style="margin-top:20px; max-height:300px; overflow-y:auto; font-size:12px;">
                            ${consultations.length === 0 ? '<p style="color:var(--champagne-muted);">No astrological inquiries submitted.</p>' : consultations.map(c => `
                                <div style="background:var(--bg-onyx); padding:12px; border:1px solid var(--border-color); border-radius:4px; margin-bottom:12px;">
                                    <div style="display:flex; justify-content:space-between;">
                                        <strong>${c.name}</strong>
                                        <span style="color:var(--gold-mid);">${c.date}</span>
                                    </div>
                                    <p>WhatsApp: ${c.phone}</p>
                                    <p>Birth Details: ${c.dob}</p>
                                    <p style="color:var(--champagne-muted); font-style:italic;">Notes: ${c.notes || 'None'}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Bespoke / Specific Sourcing Inquiries -->
                    <div class="product-card">
                        <h3>Jewelry & Sourcing Leads (${inquiries.length} leads)</h3>
                        <div style="margin-top:20px; max-height:300px; overflow-y:auto; font-size:12px;">
                            ${inquiries.length === 0 ? '<p style="color:var(--champagne-muted);">No custom design leads submitted.</p>' : inquiries.map(i => `
                                <div style="background:var(--bg-onyx); padding:12px; border:1px solid var(--border-color); border-radius:4px; margin-bottom:12px;">
                                    <div style="display:flex; justify-content:space-between;">
                                        <strong>SKU: ${i.sku}</strong>
                                        <span style="color:var(--gold-mid);">${i.date}</span>
                                    </div>
                                    <p>Client: ${i.name}</p>
                                    <p>WhatsApp: ${i.whatsapp}</p>
                                    <p style="color:var(--champagne-muted); word-break:break-all;">Details: ${i.msg}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                </div>
            </div>
        `;
    }

    createProduct(form) {
        const router = window.router;
        const nextProd = {
            sku: form.querySelector('#p-sku').value,
            name: form.querySelector('#p-name').value,
            category: form.querySelector('#p-cat').value,
            gemstone: form.querySelector('#p-type').value,
            color: form.querySelector('#p-color').value,
            origin: form.querySelector('#p-origin').value,
            carats: parseFloat(form.querySelector('#p-carat').value),
            treatment: "Unheated & Untreated (Natural)",
            shape: "Oval Faceted",
            cut: "Excellent",
            certificate: "Govt. Lab Certified",
            priceUSD: parseInt(form.querySelector('#p-price').value),
            rashi: form.querySelector('#p-rashi').value.split(',').map(item => item.trim()),
            planet: form.querySelector('#p-planet').value,
            rating: 5,
            stock: 5,
            symbol: "💎",
            desc: "Bespoke direct source gemstone curated via internal administrative logistics."
        };

        router.state.products.push(nextProd);
        router.state.saveAll();
        alert(`Gemstone ${nextProd.sku} inserted successfully into client database!`);
        form.reset();
        router.refreshCurrentView();
    }

    deleteProduct(sku) {
        const router = window.router;
        router.state.products = router.state.products.filter(p => p.sku !== sku);
        router.state.saveAll();
        alert(`Gemstone ${sku} removed.`);
        router.refreshCurrentView();
    }
}

// Instantiate global Admin hooks
window.adminDashboard = new AdminDashboard();
