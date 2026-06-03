// =================
// BESIKRAF SCRIPT.JS
// Multi-page edition — all features are null-guarded
// =================

// ---- Product Data (shared, fallback jika DB tidak tersedia) ----
const products = [
    // ── JENDELA (Window Grilles) ─────────────────────────────────────────────
    { id: 1,  title: 'Minimalist Window Grid',          category: 'jendela', price: 1250000, image: 'assets/images/minimalist_window_trellis_1779491829216.png', categoryLabel: 'Jendela' },
    { id: 10, title: 'Simple Diamond Window',           category: 'jendela', price: 950000,  image: 'assets/images/minimalist_window_trellis_1779491829216.png', categoryLabel: 'Jendela' },
    { id: 16, title: 'Slim Vertical Bar Window',        category: 'jendela', price: 880000,  image: 'assets/images/minimalist_window_trellis_1779491829216.png', categoryLabel: 'Jendela' },
    { id: 17, title: 'Double Panel Window Grille',      category: 'jendela', price: 1450000, image: 'assets/images/minimalist_window_trellis_1779491829216.png', categoryLabel: 'Jendela' },
    { id: 18, title: 'Hexagonal Pattern Window',        category: 'jendela', price: 1680000, image: 'assets/images/minimalist_window_trellis_1779491829216.png', categoryLabel: 'Jendela' },
    { id: 19, title: 'Cross Hatch Security Window',     category: 'jendela', price: 1100000, image: 'assets/images/minimalist_window_trellis_1779491829216.png', categoryLabel: 'Jendela' },
    { id: 20, title: 'Butterfly Motif Window',          category: 'jendela', price: 1950000, image: 'assets/images/minimalist_window_trellis_1779491829216.png', categoryLabel: 'Jendela' },
    { id: 21, title: 'Square Grid Standard Window',     category: 'jendela', price: 790000,  image: 'assets/images/minimalist_window_trellis_1779491829216.png', categoryLabel: 'Jendela' },
    { id: 22, title: 'Arched Top Window Grille',        category: 'jendela', price: 2100000, image: 'assets/images/minimalist_window_trellis_1779491829216.png', categoryLabel: 'Jendela' },
    { id: 23, title: 'Diagonal Slash Window',           category: 'jendela', price: 1350000, image: 'assets/images/minimalist_window_trellis_1779491829216.png', categoryLabel: 'Jendela' },
    { id: 24, title: 'Oval Accent Window Guard',        category: 'jendela', price: 1720000, image: 'assets/images/minimalist_window_trellis_1779491829216.png', categoryLabel: 'Jendela' },
    { id: 25, title: 'Wide Span Panoramic Grille',      category: 'jendela', price: 2350000, image: 'assets/images/minimalist_window_trellis_1779491829216.png', categoryLabel: 'Jendela' },
    { id: 26, title: 'Narrow Slit Ventilation Guard',   category: 'jendela', price: 680000,  image: 'assets/images/minimalist_window_trellis_1779491829216.png', categoryLabel: 'Jendela' },
    { id: 27, title: 'Bamboo Style Window Grille',      category: 'jendela', price: 1580000, image: 'assets/images/minimalist_window_trellis_1779491829216.png', categoryLabel: 'Jendela' },

    // ── PINTU UTAMA (Main Doors) ─────────────────────────────────────────────
    { id: 3,  title: 'Geometric Security Door',         category: 'pintu',   price: 3500000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Pintu Utama' },
    { id: 6,  title: 'Industrial Mesh Door',            category: 'pintu',   price: 4200000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Pintu Utama' },
    { id: 7,  title: 'Premium Laser Cut Door',          category: 'pintu',   price: 5500000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Pintu Utama' },
    { id: 14, title: 'Stainless Security Door',         category: 'pintu',   price: 6200000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Pintu Utama' },
    { id: 28, title: 'Double Wing Entrance Door',       category: 'pintu',   price: 7800000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Pintu Utama' },
    { id: 29, title: 'Single Panel Solid Door',         category: 'pintu',   price: 2950000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Pintu Utama' },
    { id: 30, title: 'Glass Insert Security Door',      category: 'pintu',   price: 4750000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Pintu Utama' },
    { id: 31, title: 'Pivot Style Iron Door',           category: 'pintu',   price: 8900000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Pintu Utama' },
    { id: 32, title: 'Folding Gate Security Door',      category: 'pintu',   price: 5100000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Pintu Utama' },
    { id: 33, title: 'Arch Top Grand Entrance Door',    category: 'pintu',   price: 9500000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Pintu Utama' },
    { id: 34, title: 'Hollow Galvanis Entry Door',      category: 'pintu',   price: 2750000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Pintu Utama' },
    { id: 35, title: 'Sliding Barn Style Iron Door',    category: 'pintu',   price: 6700000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Pintu Utama' },
    { id: 36, title: 'French Double Leaf Door',         category: 'pintu',   price: 7200000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Pintu Utama' },
    { id: 37, title: 'Compact Apartment Door',          category: 'pintu',   price: 3150000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Pintu Utama' },

    // ── KLASIK (Classic Ornamental) ──────────────────────────────────────────
    { id: 2,  title: 'Classic Floral Wrought Iron',     category: 'klasik',  price: 2800000, image: 'assets/images/classic_iron_trellis_1779491907306.png',       categoryLabel: 'Klasik' },
    { id: 5,  title: 'Victorian Arch Window',           category: 'klasik',  price: 3100000, image: 'assets/images/classic_iron_trellis_1779491907306.png',       categoryLabel: 'Klasik' },
    { id: 8,  title: 'European Style Window Grid',      category: 'klasik',  price: 1850000, image: 'assets/images/classic_iron_trellis_1779491907306.png',       categoryLabel: 'Klasik' },
    { id: 11, title: 'Ornate Wrought Iron Gate',        category: 'klasik',  price: 8500000, image: 'assets/images/classic_iron_trellis_1779491907306.png',       categoryLabel: 'Klasik' },
    { id: 13, title: 'Elegant French Window',           category: 'klasik',  price: 2400000, image: 'assets/images/classic_iron_trellis_1779491907306.png',       categoryLabel: 'Klasik' },
    { id: 38, title: 'Baroque Scroll Terali',           category: 'klasik',  price: 4500000, image: 'assets/images/classic_iron_trellis_1779491907306.png',       categoryLabel: 'Klasik' },
    { id: 39, title: 'Antique Medallion Door',          category: 'klasik',  price: 6800000, image: 'assets/images/classic_iron_trellis_1779491907306.png',       categoryLabel: 'Klasik' },
    { id: 40, title: 'Renaissance Leaf Pattern',        category: 'klasik',  price: 3750000, image: 'assets/images/classic_iron_trellis_1779491907306.png',       categoryLabel: 'Klasik' },
    { id: 41, title: 'Colonial Spear Top Fence',        category: 'klasik',  price: 5200000, image: 'assets/images/classic_iron_trellis_1779491907306.png',       categoryLabel: 'Klasik' },
    { id: 42, title: 'Lotus Bloom Window Guard',        category: 'klasik',  price: 2950000, image: 'assets/images/classic_iron_trellis_1779491907306.png',       categoryLabel: 'Klasik' },
    { id: 43, title: 'Heritage Oval Motif Grille',      category: 'klasik',  price: 3400000, image: 'assets/images/classic_iron_trellis_1779491907306.png',       categoryLabel: 'Klasik' },
    { id: 44, title: 'Majestic Crown Gate',             category: 'klasik',  price: 9800000, image: 'assets/images/classic_iron_trellis_1779491907306.png',       categoryLabel: 'Klasik' },
    { id: 45, title: 'Acanthus Leaf Balustrade',        category: 'klasik',  price: 4100000, image: 'assets/images/classic_iron_trellis_1779491907306.png',       categoryLabel: 'Klasik' },
    { id: 46, title: 'Neo-Classical Pillar Grille',     category: 'klasik',  price: 5700000, image: 'assets/images/classic_iron_trellis_1779491907306.png',       categoryLabel: 'Klasik' },
    { id: 47, title: 'Javanese Batik Iron Screen',      category: 'klasik',  price: 4300000, image: 'assets/images/classic_iron_trellis_1779491907306.png',       categoryLabel: 'Klasik' },
    { id: 48, title: 'Mediterranean Wave Door',         category: 'klasik',  price: 6100000, image: 'assets/images/classic_iron_trellis_1779491907306.png',       categoryLabel: 'Klasik' },

    // ── MODERN (Contemporary Designs) ────────────────────────────────────────
    { id: 4,  title: 'Modern Vertical Lines',           category: 'modern',  price: 1500000, image: 'assets/images/minimalist_window_trellis_1779491829216.png',  categoryLabel: 'Modern' },
    { id: 9,  title: 'Industrial Expanded Metal',       category: 'modern',  price: 4800000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Modern' },
    { id: 12, title: 'Modern Horizontal Slat',          category: 'modern',  price: 3200000, image: 'assets/images/minimalist_window_trellis_1779491829216.png',  categoryLabel: 'Modern' },
    { id: 15, title: 'Geometric Balcony Guard',         category: 'modern',  price: 1750000, image: 'assets/images/minimalist_window_trellis_1779491829216.png',  categoryLabel: 'Modern' },
    { id: 49, title: 'Matte Black Flat Bar Gate',       category: 'modern',  price: 3800000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Modern' },
    { id: 50, title: 'Steel Cable & Rod Screen',        category: 'modern',  price: 5300000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Modern' },
    { id: 51, title: 'Perforated Sheet Facade',         category: 'modern',  price: 2800000, image: 'assets/images/minimalist_window_trellis_1779491829216.png',  categoryLabel: 'Modern' },
    { id: 52, title: 'Angular Z-Bar Window Guard',      category: 'modern',  price: 1920000, image: 'assets/images/minimalist_window_trellis_1779491829216.png',  categoryLabel: 'Modern' },
    { id: 53, title: 'Louvered Iron Privacy Panel',     category: 'modern',  price: 4100000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Modern' },
    { id: 54, title: 'Floating Frame Terali',           category: 'modern',  price: 3550000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Modern' },
    { id: 55, title: 'Zigzag Pattern Grille',           category: 'modern',  price: 2150000, image: 'assets/images/minimalist_window_trellis_1779491829216.png',  categoryLabel: 'Modern' },
    { id: 56, title: 'Stacked Box Modular Gate',        category: 'modern',  price: 4600000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Modern' },
    { id: 57, title: 'Wave Motion Balcony Rail',        category: 'modern',  price: 2700000, image: 'assets/images/minimalist_window_trellis_1779491829216.png',  categoryLabel: 'Modern' },
    { id: 58, title: 'Honeycomb Steel Panel',           category: 'modern',  price: 3900000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Modern' },
    { id: 59, title: 'Retro Grid Iron Screen',          category: 'modern',  price: 2450000, image: 'assets/images/minimalist_window_trellis_1779491829216.png',  categoryLabel: 'Modern' },
    { id: 60, title: 'Avant-Garde Sculptural Gate',     category: 'modern',  price: 7500000, image: 'assets/images/modern_door_trellis_1779491945621.png',        categoryLabel: 'Modern' },

    // ── KANOPI BAJA RINGAN ──────────────────────────────────────────
    { id: 63, title: 'Kanopi Baja Ringan Atap Spandek', category: 'kanopi', price: 2500000, image: 'assets/images/canopy_baja_ringan.png', categoryLabel: 'Kanopi Baja Ringan' },
    { id: 64, title: 'Kanopi Baja Ringan Atap Alderon', category: 'kanopi', price: 4200000, image: 'assets/images/canopy_baja_ringan.png', categoryLabel: 'Kanopi Baja Ringan' },
    { id: 65, title: 'Kanopi Besi Hollow Minimalis',    category: 'kanopi', price: 3800000, image: 'assets/images/canopy_baja_ringan.png', categoryLabel: 'Kanopi Baja Ringan' },
    { id: 66, title: 'Kanopi Kaca Tempered Premium',    category: 'kanopi', price: 8500000, image: 'assets/images/canopy_baja_ringan.png', categoryLabel: 'Kanopi Baja Ringan' }
];

// ---- Shared State ----
let cart = [];

// ---- Shared Utils ----
const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);

// ===============================
// SHARED: Navbar + Cart Sidebar
// ===============================
const navbar       = document.querySelector('.navbar');
const cartBtn      = document.querySelector('.cart-btn');
const closeCartBtn = $('close-cart');
const cartSidebar  = $('cart-sidebar');
const cartOverlay  = $('cart-overlay');
const cartItemsEl  = $('cart-items');
const cartTotalEl  = $('cart-total-price');

// Navbar scroll effect
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// Cart Sidebar + Checkout
const toggleCart = () => {
    if (cartSidebar) cartSidebar.classList.toggle('active');
    if (cartOverlay) cartOverlay.classList.toggle('active');
};
if (cartBtn)      cartBtn.addEventListener('click', toggleCart);
if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
if (cartOverlay)  cartOverlay.addEventListener('click', toggleCart);

let appliedPromo = null;

// Checkout handler (mengarahkan ke WhatsApp)
const checkoutBtns = $$('.checkout-btn');
checkoutBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault(); // Mencegah reload jika memakai tag <a>
        if (cart.length === 0) {
            if (typeof showToast !== 'undefined') showToast('Keranjang kosong!', 'info');
            else alert('Keranjang kosong!');
            return;
        }
        
        const name = prompt('Nama Anda:') || 'Guest';
        let orderText = `Halo Admin Hidayat Teknik, saya ${name} ingin memesan:\n\n`;
        
        cart.forEach((item, index) => {
            orderText += `${index + 1}. ${item.title} (${item.quantity}x) - ${formatIDR(item.price * item.quantity)}\n`;
        });
        
        let total = cart.reduce((s,i)=>s+i.price*i.quantity,0);
        let promoText = '';
        if (appliedPromo) {
            if (appliedPromo.type === 'discount') {
                const discount = total * appliedPromo.value;
                total -= discount;
                promoText = `\nPromo Digunakan: ${appliedPromo.code} (Diskon ${appliedPromo.value * 100}% = -${formatIDR(discount)})`;
            } else if (appliedPromo.type === 'freebie') {
                promoText = `\nPromo Digunakan: ${appliedPromo.code} (${appliedPromo.label})`;
            }
        }

        orderText += `\nSubtotal: ${formatIDR(cart.reduce((s,i)=>s+i.price*i.quantity,0))}`;
        if (promoText) orderText += promoText;
        orderText += `\n*TOTAL BAYAR: ${formatIDR(total)}*\n\nMohon info ketersediaan dan proses pemesanannya. Terima kasih!`;
        
        // Nomor WhatsApp Admin (Ganti sesuai kebutuhan)
        const waNumber = '6281378373566'; 
        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(orderText)}`;
        
        // Coba simpan ke DB dulu jika tersedia, kemudian buka WhatsApp
        if (typeof db !== 'undefined' && db.isConfigured()) {
            await db.saveOrder(cart, { name, phone: waNumber }).catch(e => console.error("DB Error:", e));
        }
        
        window.open(waUrl, '_blank');
    });
});

// Animate cart button
const animateCartBtn = () => {
    if (!cartBtn) return;
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);
};

// Update cart UI
const updateCartUI = () => {
    if (!cartItemsEl) return;
    const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
    $$('.cart-count').forEach(el => el.textContent = totalItems);

    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<div class="empty-cart-msg">Keranjang Anda kosong.</div>';
    } else {
        cartItemsEl.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="product-category" style="font-size:0.7rem;letter-spacing:1px;color:var(--primary-color);margin-bottom:2px;text-transform:uppercase">${item.categoryLabel}</div>
                    <h4 class="cart-item-title">${item.title}</h4>
                    <div class="cart-item-price">${formatIDR(item.price)}</div>
                    <div class="cart-item-actions">
                        <div class="qty-control">
                            <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    if (cartTotalEl) {
        let rawTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
        if (appliedPromo && appliedPromo.type === 'discount') {
            const discount = rawTotal * appliedPromo.value;
            const finalTotal = rawTotal - discount;
            cartTotalEl.innerHTML = `<s style="font-size:0.8rem; color:var(--text-secondary); margin-right:5px;">${formatIDR(rawTotal)}</s> <span style="color:#4CAF50">${formatIDR(finalTotal)}</span>`;
        } else {
            cartTotalEl.textContent = formatIDR(rawTotal);
        }
    }
};

// Shopee-style Promo Modal Logic
let availablePromos = [];

const injectPromoModal = () => {
    if ($('promo-modal-overlay')) return;
    const html = `
        <div id="promo-modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:9999; backdrop-filter:blur(3px);">
            <div id="promo-modal-content" style="position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:400px; background:#1a1d24; border-top-left-radius:16px; border-top-right-radius:16px; padding:1.5rem; transition:transform 0.3s ease-out; box-shadow:0 -10px 30px rgba(0,0,0,0.5);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                    <h3 style="margin:0; font-size:1.1rem;">Pilih Voucher</h3>
                    <button id="close-promo-modal" style="background:none; border:none; color:white; font-size:1.2rem; cursor:pointer;"><i class="fa-solid fa-times"></i></button>
                </div>
                <div id="promo-list-container" style="max-height:60vh; overflow-y:auto; display:flex; flex-direction:column; gap:0.8rem; padding-bottom:1rem;">
                    <!-- List will be injected here -->
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);

    $('close-promo-modal').addEventListener('click', closePromoModal);
    $('promo-modal-overlay').addEventListener('click', (e) => {
        if(e.target.id === 'promo-modal-overlay') closePromoModal();
    });
};

const openPromoModal = async () => {
    injectPromoModal();
    const overlay = $('promo-modal-overlay');
    const container = $('promo-list-container');
    
    overlay.style.display = 'block';
    
    // Tampilkan loading state
    container.innerHTML = '<div style="text-align:center; padding:2rem; color:var(--text-secondary);"><i class="fa-solid fa-circle-notch fa-spin"></i> Memuat voucher...</div>';
    
    // Ambil data voucher (dari Supabase atau fallback)
    if (availablePromos.length === 0) {
        if (typeof db !== 'undefined' && db.fetchActivePromos) {
            availablePromos = await db.fetchActivePromos();
        }
        // Fallback jika DB kosong/error
        if (availablePromos.length === 0) {
            availablePromos = [
                { id: '1', code: 'DISKON10', title: 'Diskon 10% Semua Terali', type: 'discount', value: 0.1 },
                { id: '2', code: 'GRATISSURVEY', title: 'Gratis Biaya Survey & Ukur', type: 'freebie', value: 0 },
                { id: '3', code: 'CATPREMIUM', title: 'Upgrade Cat Anti-Karat Premium', type: 'freebie', value: 0 }
            ];
        }
    }

    renderPromoList();
};

const closePromoModal = () => {
    const overlay = $('promo-modal-overlay');
    if (overlay) overlay.style.display = 'none';
};

const applyPromoSelection = (promoStr) => {
    const promo = JSON.parse(decodeURIComponent(promoStr));
    appliedPromo = {
        code: promo.code,
        type: promo.type,
        value: promo.value,
        label: promo.title
    };
    
    // Update label di cart
    const labelEls = $$('#applied-promo-label');
    labelEls.forEach(el => {
        el.textContent = `Voucher Dipakai: ${promo.code}`;
        el.style.color = '#4CAF50';
    });
    
    updateCartUI();
    closePromoModal();
};

const renderPromoList = () => {
    const container = $('promo-list-container');
    if (availablePromos.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:2rem; color:var(--text-secondary);">Tidak ada voucher yang tersedia saat ini.</div>';
        return;
    }
    
    container.innerHTML = availablePromos.map(p => {
        const isSelected = appliedPromo && appliedPromo.code === p.code;
        const icon = p.type === 'discount' ? 'fa-percent' : 'fa-gift';
        const strData = encodeURIComponent(JSON.stringify(p));
        
        return `
            <div style="display:flex; border:1px solid ${isSelected ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)'}; background:rgba(0,0,0,0.2); border-radius:8px; overflow:hidden; cursor:pointer;" onclick="applyPromoSelection('${strData}')">
                <div style="background:${isSelected ? 'var(--primary-color)' : '#333'}; width:80px; display:flex; flex-direction:column; align-items:center; justify-content:center; color:${isSelected ? '#000' : 'white'};">
                    <i class="fa-solid ${icon}" style="font-size:1.5rem; margin-bottom:0.3rem;"></i>
                    <span style="font-size:0.7rem; text-transform:uppercase; font-weight:700;">Promo</span>
                </div>
                <div style="flex:1; padding:0.8rem; display:flex; flex-direction:column; justify-content:center;">
                    <div style="font-weight:600; font-size:0.95rem; margin-bottom:0.2rem; color:white;">${p.title}</div>
                    <div style="font-size:0.75rem; color:var(--text-secondary);">Kode: ${p.code}</div>
                </div>
                <div style="width:50px; display:flex; align-items:center; justify-content:center;">
                    <div style="width:20px; height:20px; border-radius:50%; border:2px solid ${isSelected ? 'var(--primary-color)' : 'rgba(255,255,255,0.3)'}; display:flex; align-items:center; justify-content:center;">
                        ${isSelected ? '<div style="width:10px; height:10px; border-radius:50%; background:var(--primary-color);"></div>' : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
};

// Event listener for opening modal
document.addEventListener('click', (e) => {
    const btn = e.target.closest('#open-promo-modal-btn');
    if (btn) openPromoModal();
});

// Cart actions (global scope for onclick in templates)
window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existing = cart.find(i => i.id === productId);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    updateCartUI();
    animateCartBtn();
    toggleCart();
};

window.updateQuantity = (productId, change) => {
    const item = cart.find(i => String(i.id) === String(productId));
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) window.removeFromCart(productId);
    else updateCartUI();
};

window.removeFromCart = (productId) => {
    cart = cart.filter(i => String(i.id) !== String(productId));
    updateCartUI();
};

// ===============================
// PAGE: KATALOG (katalog.html)
// ===============================
const productsContainer = $('products-container');

let favorites = JSON.parse(localStorage.getItem('ht_favorites')) || [];

window.toggleFavorite = (id, event) => {
    if (event) event.stopPropagation();
    const idx = favorites.indexOf(id);
    if (idx === -1) {
        favorites.push(id);
    } else {
        favorites.splice(idx, 1);
    }
    localStorage.setItem('ht_favorites', JSON.stringify(favorites));
    
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    const category = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
    renderProducts(category);
};

const renderProducts = (category = 'all') => {
    if (!productsContainer) return;
    
    let list = products;
    if (category === 'favorites') {
        list = products.filter(p => favorites.includes(p.id));
        if (list.length === 0) {
            productsContainer.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 4rem 1rem; color: var(--text-secondary);"><i class="fa-regular fa-heart" style="font-size:3rem; margin-bottom:1rem; opacity:0.5;"></i><br>Anda belum menyimpan desain favorit apapun.</div>`;
            return;
        }
    } else if (category !== 'all') {
        list = products.filter(p => p.category === category);
    }
    
    productsContainer.innerHTML = list.map(p => {
        const isFav = favorites.includes(p.id);
        
        // Generate deterministik rating & sold count dari ID produk
        const ratingNum = 4.5 + ((p.id * 7) % 6) / 10; // 4.5 s.d 5.0
        const soldCount = 35 + ((p.id * 13) % 215);    // 35 s.d 250
        let starsHTML = '';
        for(let i=1; i<=5; i++) {
            if(i <= Math.floor(ratingNum)) starsHTML += '<i class="fa-solid fa-star"></i>';
            else if(i === Math.ceil(ratingNum) && ratingNum % 1 !== 0) starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
            else starsHTML += '<i class="fa-regular fa-star"></i>';
        }

        return `
        <div class="product-card">
            <div class="product-img-wrapper" style="cursor:pointer;" onclick="openViewer(${p.id})">
                <img src="${p.image}" alt="${p.title}" class="product-img">
                <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(${p.id}, event)" title="Simpan ke Favorit">
                    <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                </button>
                <div class="iv-hover-hint"><i class="fa-solid fa-eye"></i> Lihat Detail</div>
            </div>
            <div class="product-details">
                <div class="product-category">${p.categoryLabel}</div>
                <h3 class="product-title">${p.title}</h3>
                <div style="color:#C59B4B; font-size:0.75rem; margin-bottom:0.7rem; display:flex; align-items:center; gap:6px;">
                    <div style="display:flex; gap:1px;">${starsHTML}</div>
                    <span style="color:var(--text-secondary); font-size:0.75rem;">${ratingNum.toFixed(1)} (${soldCount} terjual)</span>
                </div>
                <div class="product-price">${formatIDR(p.price)}</div>
                <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:0.5rem;">
                    <button class="add-to-cart-btn" style="flex:1;" onclick="addToCart(${p.id})">
                        <i class="fa-solid fa-cart-plus"></i> Keranjang
                    </button>
                    <button class="add-to-cart-btn" style="flex:1; background: rgba(197,155,75,0.15); border-color: rgba(197,155,75,0.4);" onclick="openViewer(${p.id})">
                        <i class="fa-solid fa-eye"></i> Lihat
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
};

if (productsContainer) {
    const filterBtns = $$('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            productsContainer.style.opacity = '0';
            setTimeout(() => {
                renderProducts(btn.dataset.filter);
                productsContainer.style.opacity = '1';
            }, 300);
        });
    });

    // Coba load dari Supabase, fallback ke data statis
    const initProducts = async () => {
        if (typeof db !== 'undefined' && db.isConfigured()) {
            const dbProducts = await db.fetchProducts();
            if (dbProducts && dbProducts.length > 0) {
                // Sync products array dengan data dari DB
                products.length = 0;
                dbProducts.forEach(p => products.push({
                    id:            p.id,
                    title:         p.title,
                    category:      p.category,
                    categoryLabel: p.category_label,
                    price:         p.price,
                    image:         p.image_url
                }));
                console.log('[DB] Products loaded from Supabase:', products.length);
            }
        }
        renderProducts();
    };
    initProducts();
}

// ===============================
// INTERACTIVE VIEWER (katalog.html)
// ===============================
let ivRotation = 0;
let ivZoom     = 1;
let ivProductId = null;

const ivModal    = $('iv-modal');
const ivOverlay  = $('iv-overlay');
const ivImg      = $('iv-img');
const ivTitle    = $('iv-title');
const ivCategory = $('iv-category');
const ivPrice    = $('iv-price');
const ivRotVal   = $('iv-rot-val');
const ivZoomVal  = $('iv-zoom-val');

const applyTransform = () => {
    if (!ivImg) return;
    ivImg.style.transform = `rotate(${ivRotation}deg) scale(${ivZoom})`;
    if (ivRotVal)  ivRotVal.textContent  = `${ivRotation}°`;
    if (ivZoomVal) ivZoomVal.textContent = `${Math.round(ivZoom * 100)}%`;
};

window.openViewer = (productId) => {
    const p = products.find(x => String(x.id) === String(productId));
    if (!p || !ivModal) return;

    ivProductId  = productId;
    ivRotation   = 0;
    ivZoom       = 1;

    if (ivImg)      { ivImg.src = p.image; ivImg.style.filter = 'none'; ivImg.style.transform = 'rotate(0deg) scale(1)'; }
    if (ivTitle)    ivTitle.textContent    = p.title;
    if (ivCategory) ivCategory.textContent = p.categoryLabel || p.category;
    if (ivPrice)    ivPrice.textContent    = formatIDR(p.price);
    if (ivRotVal)   ivRotVal.textContent   = '0°';
    if (ivZoomVal)  ivZoomVal.textContent  = '100%';

    // Reset colour buttons
    document.querySelectorAll('.iv-color').forEach(b => b.classList.remove('active'));
    const firstColor = document.querySelector('.iv-color');
    if (firstColor) firstColor.classList.add('active');

    ivModal.classList.add('iv-open');
    ivOverlay.classList.add('iv-open');
    document.body.style.overflow = 'hidden';
};

const closeViewer = () => {
    if (!ivModal) return;
    ivModal.classList.remove('iv-open');
    ivOverlay.classList.remove('iv-open');
    document.body.style.overflow = '';
};

if (ivModal) {
    $('iv-close')?.addEventListener('click', closeViewer);
    ivOverlay?.addEventListener('click', closeViewer);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeViewer(); });

    $('iv-rot-left')?.addEventListener('click',  () => { ivRotation -= 15; applyTransform(); });
    $('iv-rot-right')?.addEventListener('click', () => { ivRotation += 15; applyTransform(); });

    $('iv-zoom-in')?.addEventListener('click',  () => { ivZoom = Math.min(3, +(ivZoom + 0.2).toFixed(1)); applyTransform(); });
    $('iv-zoom-out')?.addEventListener('click', () => { ivZoom = Math.max(0.3, +(ivZoom - 0.2).toFixed(1)); applyTransform(); });

    $('iv-reset')?.addEventListener('click', () => {
        ivRotation = 0; ivZoom = 1;
        applyTransform();
        if (ivImg) ivImg.style.filter = 'none';
    });

    $('iv-cart-btn')?.addEventListener('click', () => {
        if (ivProductId !== null) { addToCart(ivProductId); closeViewer(); }
    });
}

// ===============================
// PAGE: CUSTOM (custom.html)
// ===============================
const calcLebar    = $('calc-lebar');
const calcTinggi   = $('calc-tinggi');
const calcJenis    = $('calc-jenis');
const calcWarna    = $('calc-warna');
const calcMotif    = $('calc-motif');
const calcPrice    = $('calc-result-price');
const calcDetails  = $('calc-result-details');
const calcCartBtn  = $('calc-add-to-cart');
const calcForm     = $('price-calculator');
const calcProjType = $('calc-project-type');

let currentCustomProduct = null;

if (calcLebar && calcTinggi) {
    const calculatePrice = () => {
        const lebar  = parseFloat(calcLebar.value);
        const tinggi = parseFloat(calcTinggi.value);

        if (isNaN(lebar) || isNaN(tinggi) || lebar < 10 || tinggi < 10) {
            calcPrice.textContent = 'Rp 0';
            calcDetails.textContent = 'Silakan masukkan ukuran (Lebar & Tinggi) untuk melihat estimasi harga.';
            calcCartBtn.disabled = true;
            currentCustomProduct = null;
            return;
        }

        const luas = (lebar / 100) * (tinggi / 100);
        const pType = calcProjType ? calcProjType.value : 'terali';
        
        let pricePerM2 = 500000; // Default (Terali)
        let typeName = 'Terali';
        
        if (pType === 'kanopi') { pricePerM2 = 450000; typeName = 'Kanopi'; }
        else if (pType === 'atap') { pricePerM2 = 250000; typeName = 'Atap / Baja Ringan'; }
        else if (pType === 'carport') { pricePerM2 = 500000; typeName = 'Carport'; }
        else if (pType === 'gazebo') { pricePerM2 = 800000; typeName = 'Gazebo'; }
        else if (pType === 'gudang') { pricePerM2 = 600000; typeName = 'Struktur Gudang'; }

        let detail = `<strong>Proyek: ${typeName}</strong><br>Luas: ${luas.toFixed(2)} m²`;

        const grpJenis = $('grp-jenis');
        const grpMotif = $('grp-motif');
        const grpWarna = $('grp-warna');

        if (pType === 'terali') {
            if (grpJenis) grpJenis.style.display = 'block';
            if (grpMotif) grpMotif.style.display = 'block';
            if (grpWarna) grpWarna.style.display = 'block';

            detail += `<br>Spesifikasi: `;

            if (calcJenis.value === 'nako_solid')   { pricePerM2 += 200000; detail += 'Nako Solid, '; }
            else if (calcJenis.value === 'tempa')   { pricePerM2 += 400000; detail += 'Besi Tempa, '; }
            else                                    { detail += 'Hollow Galvanis, '; }

            if (calcMotif.value === 'geometris')    { pricePerM2 += 150000; detail += 'Motif Geometris, '; }
            else if (calcMotif.value === 'klasik')  { pricePerM2 += 300000; detail += 'Motif Klasik, '; }
            else                                    { detail += 'Motif Minimalis, '; }

            if (calcWarna.value === 'emas')         { pricePerM2 += 50000;  detail += 'Warna Emas'; }
            else if (calcWarna.value === 'putih')   { detail += 'Warna Putih'; }
            else                                    { detail += 'Warna Hitam Matte'; }
        } else {
            if (grpJenis) grpJenis.style.display = 'none';
            if (grpMotif) grpMotif.style.display = 'none';
            if (grpWarna) grpWarna.style.display = 'none';
        }

        const total = luas * pricePerM2;
        calcPrice.textContent = formatIDR(total);
        calcDetails.innerHTML = detail;
        calcCartBtn.disabled = false;

        // ===== ESTIMASI WAKTU PENGERJAAN =====
        const timeBox        = $('time-estimate-box');
        const timeBadge      = $('time-total-badge');
        const stageSurvey    = $('stage-survey');
        const stageFabrikasi = $('stage-fabrikasi');
        const stageFinishing = $('stage-finishing');
        const stageInstalasi = $('stage-instalasi');
        const barSurvey      = $('bar-survey');
        const barFabrikasi   = $('bar-fabrikasi');
        const barFinishing   = $('bar-finishing');
        const barInstalasi   = $('bar-instalasi');

        if (timeBox) {
            // Base fabrication: 2 days/m², min 2 days
            let fabDays = Math.max(2, Math.ceil(luas * 2));
            // Material modifier
            if (calcJenis.value === 'nako_solid') fabDays += 1;
            else if (calcJenis.value === 'tempa')  fabDays += 3;
            // Design complexity modifier
            if (calcMotif.value === 'geometris')   fabDays += 1;
            else if (calcMotif.value === 'klasik') fabDays += 2;

            // Finishing days
            const finDays = calcJenis.value === 'tempa' ? 2 : 1;
            // Fixed stages
            const surveyDays  = 1;
            const instDays    = 1;
            const totalDays   = surveyDays + fabDays + finDays + instDays;
            const maxDays     = totalDays; // for bar width calculation

            const pct = (d) => `${Math.round((d / maxDays) * 100)}%`;

            stageSurvey.textContent    = `${surveyDays} hari kerja`;
            stageFabrikasi.textContent = `${fabDays} hari kerja`;
            stageFinishing.textContent = `${finDays} hari kerja`;
            stageInstalasi.textContent = `${instDays} hari kerja`;
            timeBadge.textContent      = `~${totalDays} hari kerja`;

            if (barSurvey)    { barSurvey.style.width    = '0'; setTimeout(() => barSurvey.style.width    = pct(surveyDays),  50); }
            if (barFabrikasi) { barFabrikasi.style.width = '0'; setTimeout(() => barFabrikasi.style.width = pct(fabDays),     150); }
            if (barFinishing) { barFinishing.style.width = '0'; setTimeout(() => barFinishing.style.width = pct(finDays),     250); }
            if (barInstalasi) { barInstalasi.style.width = '0'; setTimeout(() => barInstalasi.style.width = pct(instDays),    350); }

            timeBox.style.display = 'block';
        }
        // =====================================================

        // ===== SIMULASI CICILAN =====
        const instBox = $('installment-box');
        const instDp  = $('inst-dp');
        const instMo  = $('inst-month');
        if (instBox && total >= 2000000) {
            // Simulasi: DP 30% (dibulatkan ke atas 50rb), Sisa dibagi 3
            let dp = Math.ceil((total * 0.3) / 50000) * 50000;
            let sisa = total - dp;
            let perBulan = Math.ceil((sisa / 3) / 10000) * 10000; // dibulatkan ke puluhan ribu

            instDp.textContent = formatIDR(dp);
            instMo.textContent = formatIDR(perBulan) + ' /bln';
            instBox.style.display = 'block';
        } else if (instBox) {
            instBox.style.display = 'none';
        }
        // ============================

        // ===== SMART SECURITY SCORE =====
        const secBox   = $('security-score-box');
        const secArc   = $('score-arc');
        const secNum   = $('score-number');
        const secLbl   = $('score-label');
        const secBars  = $('score-bars');
        const secRecs  = $('score-recommendations');

        if (secBox) {
            if (pType !== 'terali') {
                secBox.style.display = 'none';
            } else {
                const luas = (lebar / 100) * (tinggi / 100);

            // --- Faktor Material (0-40 poin) ---
            let matScore = 20, matLabel = 'Hollow Galvanis';
            if (calcJenis.value === 'nako_solid')  { matScore = 32; matLabel = 'Nako Solid'; }
            else if (calcJenis.value === 'tempa')  { matScore = 40; matLabel = 'Besi Tempa'; }

            // --- Faktor Motif/Rapat Celah (0-30 poin) ---
            let motifScore = 20, motifLabel = 'Minimalis';
            if (calcMotif.value === 'geometris')   { motifScore = 27; motifLabel = 'Geometris'; }
            else if (calcMotif.value === 'klasik') { motifScore = 30; motifLabel = 'Klasik'; }

            // --- Faktor Ukuran Bukaan (0-30 poin: kecil = lebih aman) ---
            let sizeScore = 30;
            if (luas > 3)       sizeScore = 10;
            else if (luas > 2)  sizeScore = 15;
            else if (luas > 1)  sizeScore = 22;
            else if (luas > 0.5) sizeScore = 27;

            const totalScore = matScore + motifScore + sizeScore;
            const arcDash    = 172;
            const arcOffset  = arcDash - (arcDash * totalScore / 100);

            // Warna berdasarkan skor
            let scoreColor = '#ef5350', scoreText = 'Rendah — Perlu Upgrade';
            if (totalScore >= 85)      { scoreColor = '#66bb6a'; scoreText = 'Sangat Aman ✓'; }
            else if (totalScore >= 70) { scoreColor = '#4fc3f7'; scoreText = 'Cukup Aman'; }
            else if (totalScore >= 55) { scoreColor = '#FFA726'; scoreText = 'Sedang — Bisa Ditingkatkan'; }

            // Terapkan ke UI
            secBox.style.display = 'block';
            setTimeout(() => {
                if (secArc) { secArc.style.strokeDashoffset = arcOffset; secArc.style.stroke = scoreColor; }
                if (secNum) { secNum.textContent = totalScore; secNum.style.color = scoreColor; }
                if (secLbl) { secLbl.textContent = scoreText; secLbl.style.color = scoreColor; }
            }, 50);

            // Breakdown bar rows
            const barRow = (label, val, max, color) => `
                <div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
                        <span style="color:var(--text-secondary);">${label}</span>
                        <span style="color:${color}; font-weight:600;">${val}/${max}</span>
                    </div>
                    <div style="background:rgba(255,255,255,0.08); border-radius:4px; height:5px; overflow:hidden;">
                        <div style="height:100%; width:${Math.round(val/max*100)}%; background:${color}; border-radius:4px; transition:width 0.8s ease;"></div>
                    </div>
                </div>`;

            if (secBars) secBars.innerHTML =
                barRow('Kekuatan Material (' + matLabel + ')', matScore, 40, '#4fc3f7') +
                barRow('Kerapatan Motif ('  + motifLabel + ')', motifScore, 30, '#66bb6a') +
                barRow('Ukuran Bukaan (Kecil = Aman)', sizeScore, 30, '#FFA726');

            // Rekomendasi dinamis
            const recs = [];
            if (calcJenis.value === 'hollow_galvanis') recs.push('Gunakan <strong>Besi Hollow 4×4 cm</strong> atau upgrade ke Nako Solid untuk keamanan lebih baik.');
            if (calcJenis.value !== 'tempa')            recs.push('Pertimbangkan <strong>Besi Tempa Ø 12 mm</strong> untuk perlindungan anti-bobol maksimal.');
            if (calcMotif.value === 'minimalis')        recs.push('Pilih motif <strong>Geometris atau Klasik</strong> — celah lebih rapat, sulit ditembus.');
            if (luas > 1.5)                             recs.push('Bukaan lebar — tambahkan <strong>rel palang tengah (cross bar)</strong> untuk memperkuat struktur.');
            if (totalScore < 70)                        recs.push('Kombinasikan dengan <strong>kunci pintu deadbolt</strong> dan gembok tambahan di luar.');
            if (totalScore >= 85)                       recs.push('Spesifikasi ini sudah <strong>optimal</strong>. Pastikan proses pengelasan dilakukan oleh teknisi bersertifikat.');

            if (secRecs) secRecs.innerHTML = recs.map(r => `<li>${r}</li>`).join('') || '<li>Semua spesifikasi sudah baik.</li>';
            }
        }
        // =================================

        currentCustomProduct = {
            id: 'custom_' + Date.now(),
            title: `Custom ${typeName} (${lebar}×${tinggi}cm)`,
            category: 'custom',
            price: total,
            image: 'assets/images/classic_iron_trellis_1779491907306.png',
            categoryLabel: `Custom ${typeName}`
        };
    };

    [calcProjType, calcLebar, calcTinggi, calcJenis, calcWarna, calcMotif].forEach(el => {
        if (el) {
            el.addEventListener('input', calculatePrice);
            el.addEventListener('change', calculatePrice);
        }
    });

    calcCartBtn.addEventListener('click', () => {
        if (!currentCustomProduct) return;
        cart.push({ ...currentCustomProduct, quantity: 1 });
        updateCartUI();
        toggleCart();
        calcForm.reset();
        calculatePrice();
    });
}

// ===============================
// PAGE: UPLOAD (upload.html)
// ===============================
const dropzone        = $('dropzone');
const dropzoneDefault = $('dropzone-default');
const dropzonePreview = $('dropzone-preview');
const previewImg      = $('preview-img');
const photoUpload     = $('photo-upload');
const removePhotoBtn  = $('remove-photo');
const uploadSubmit    = $('upload-submit');
const recIdle         = $('rec-idle');
const recLoading      = $('rec-loading');
const recResult       = $('rec-result');
const recProducts     = $('rec-products');
const recAreaLabel    = $('rec-area-label');
const uploadNotes     = $('upload-notes');
const aiBeforeImg     = $('ai-before-img');
const aiAfterImg      = $('ai-after-img');
const aiAnalysis      = $('ai-analysis');
const aiPromptText    = $('ai-prompt-text');
const aiEstimatePrice = $('ai-estimate-price');
const aiEstimateDetail = $('ai-estimate-detail');
const aiDownloadBtn   = $('download-ai-preview');
const aiWhatsappLink  = $('ai-whatsapp-link');
const aiProviderLabel = $('ai-provider-label');
const aiBackendWarning = $('ai-backend-warning');
const aiBackendWarningText = $('ai-backend-warning-text');
const aiGeneratedCard = document.querySelector('.ai-preview-generated');

const recommendations = {
    jendela: { label: 'Berdasarkan foto jendela yang Anda upload',  ids: [1, 2, 4] },
    pintu:   { label: 'Berdasarkan foto pintu yang Anda upload',    ids: [3, 6] },
    balkon:  { label: 'Berdasarkan foto balkon yang Anda upload',   ids: [2, 5, 3] }
};

if (dropzone) {
    let uploadedFile = null;
    let selectedArea = null;
    let selectedStyle = document.querySelector('input[name="ai-style"]:checked')?.value || 'minimalis';
    let latestAIPreview = null;

    const areaDetails = {
        jendela: { label: 'Jendela', widthCm: 120, heightCm: 150, multiplier: 1 },
        pintu:   { label: 'Pintu',   widthCm: 90,  heightCm: 210, multiplier: 1.15 },
        balkon:  { label: 'Balkon',  widthCm: 300, heightCm: 110, multiplier: 1.25 }
    };

    const aiStyles = {
        minimalis: {
            label: 'Minimalis',
            material: 'hollow galvanis 20x40',
            finish: 'hitam matte',
            promptTone: 'modern black minimalist grille with clean vertical bars',
            pricePerM2: 680000
        },
        industrial: {
            label: 'Industrial',
            material: 'hollow galvanis dan expanded mesh',
            finish: 'hitam doff tekstur',
            promptTone: 'industrial black steel grille with geometric grid and diagonal bracing',
            pricePerM2: 820000
        },
        mewah: {
            label: 'Mewah',
            material: 'besi tempa premium',
            finish: 'hitam glossy dengan aksen gold',
            promptTone: 'luxury black wrought iron grille with elegant gold accents',
            pricePerM2: 1250000
        },
        klasik: {
            label: 'Klasik',
            material: 'besi tempa ornamental',
            finish: 'hitam satin',
            promptTone: 'classic black wrought iron grille with soft ornamental curves',
            pricePerM2: 1050000
        },
        islami: {
            label: 'Islami',
            material: 'laser cut galvanis',
            finish: 'hitam matte',
            promptTone: 'black Islamic geometric grille with star pattern and balanced symmetry',
            pricePerM2: 1120000
        }
    };

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const loadImageFromSrc = (src) => new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });

    const prepareImageForBackend = async (source, areaKey) => {
        const img = await loadImageFromSrc(source);
        const canvas = document.createElement('canvas');
        // OpenAI DALL-E 2 edits requires exactly square images
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        
        // Pad to square
        const scale = Math.min(1024 / img.width, 1024 / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        const dx = (1024 - w) / 2;
        const dy = (1024 - h) / 2;
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 1024, 1024);
        ctx.drawImage(img, dx, dy, w, h);
        
        // Create transparent cutout for DALL-E 2 edits
        try {
            const detectedRect = detectMainOpeningRect(canvas, areaKey);
            ctx.clearRect(detectedRect.x, detectedRect.y, detectedRect.w, detectedRect.h);
        } catch(e) {
            ctx.clearRect(1024*0.2, 1024*0.2, 1024*0.6, 1024*0.6);
        }
        return canvas.toDataURL('image/png');
    };

    const generateWithOpenAIBackend = async ({ source, areaKey, styleKey, notes, prompt, analysis }) => {
        const imageDataUrl = await prepareImageForBackend(source, areaKey);
        const response = await fetch('/api/generate-ai-design', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                imageDataUrl,
                areaType: areaKey,
                style: styleKey,
                notes,
                prompt,
                analysis
            })
        });

        const payload = await response.json().catch(() => ({}));
        if (!response.ok || !payload.success || !payload.imageDataUrl) {
            const err = new Error(payload.error || 'AI backend belum bisa generate gambar.');
            err.code = payload.code || 'AI_BACKEND_ERROR';
            err.requestId = payload.requestId;
            throw err;
        }

        return payload;
    };

    const validateUpload = () => {
        if (uploadSubmit) uploadSubmit.disabled = !(uploadedFile && selectedArea && selectedStyle);
    };

    $$('input[name="area-type"]').forEach(radio => {
        radio.addEventListener('change', () => { selectedArea = radio.value; validateUpload(); });
    });

    $$('input[name="ai-style"]').forEach(radio => {
        radio.addEventListener('change', () => { selectedStyle = radio.value; validateUpload(); });
    });

    const handleFile = (file) => {
        if (!file || !file.type.startsWith('image/')) { alert('Hanya file gambar (JPG, PNG, WEBP).'); return; }
        if (file.size > 5 * 1024 * 1024) { alert('Ukuran file maksimal 5MB.'); return; }
        uploadedFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target.result;
            dropzoneDefault.style.display = 'none';
            dropzonePreview.style.display = 'block';
            validateUpload();
        };
        reader.readAsDataURL(file);
    };

    if (photoUpload) photoUpload.addEventListener('change', (e) => { if (e.target.files[0]) handleFile(e.target.files[0]); });

    dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('drag-over'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
        if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });

    if (removePhotoBtn) {
        removePhotoBtn.addEventListener('click', () => {
            uploadedFile = null;
            photoUpload.value = '';
            previewImg.src = '';
            dropzoneDefault.style.display = 'flex';
            dropzonePreview.style.display = 'none';
            validateUpload();
            if (recResult)  recResult.style.display  = 'none';
            if (recLoading) recLoading.style.display = 'none';
            if (recIdle)    recIdle.style.display    = 'flex';
            if (aiBeforeImg) aiBeforeImg.src = '';
            if (aiAfterImg) aiAfterImg.src = '';
            if (aiBackendWarning) aiBackendWarning.style.display = 'none';
            if (aiGeneratedCard) aiGeneratedCard.classList.remove('ai-unavailable');
            if (aiDownloadBtn) aiDownloadBtn.disabled = false;
            latestAIPreview = null;
        });
    }

    const parseDimensions = (notes, areaKey) => {
        const fallback = areaDetails[areaKey] || areaDetails.jendela;
        const match = (notes || '').toLowerCase().replace(/,/g, '.').match(/(\d+(?:\.\d+)?)\s*(cm|m)?\s*(?:x|×)\s*(\d+(?:\.\d+)?)\s*(cm|m)?/);
        if (!match) return { widthCm: fallback.widthCm, heightCm: fallback.heightCm, source: 'standar' };

        let width = parseFloat(match[1]);
        let height = parseFloat(match[3]);
        const unit = match[2] || match[4] || '';
        const isMeter = unit === 'm' || (width <= 10 && height <= 10);
        if (isMeter) {
            width *= 100;
            height *= 100;
        }
        return {
            widthCm: Math.round(width),
            heightCm: Math.round(height),
            source: 'catatan'
        };
    };

    const calculateAIEstimate = (areaKey, styleKey, notes) => {
        const area = areaDetails[areaKey] || areaDetails.jendela;
        const style = aiStyles[styleKey] || aiStyles.minimalis;
        const dimensions = parseDimensions(notes, areaKey);
        const luas = Math.max((dimensions.widthCm / 100) * (dimensions.heightCm / 100), 0.85);
        const installFee = areaKey === 'balkon' ? 350000 : 250000;
        const total = Math.round(((luas * style.pricePerM2 * area.multiplier) + installFee) / 50000) * 50000;
        return {
            total,
            dimensions,
            detail: `${dimensions.source === 'catatan' ? 'Ukuran dari catatan' : 'Ukuran standar'} ${dimensions.widthCm}x${dimensions.heightCm}cm, ${style.material}, finishing ${style.finish}.`
        };
    };

    const analyzeImage = (img) => {
        const sample = document.createElement('canvas');
        const sampleWidth = 48;
        sample.width = sampleWidth;
        sample.height = Math.max(1, Math.round(sampleWidth * (img.height / img.width)));
        const ctx = sample.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, sample.width, sample.height);

        const pixels = ctx.getImageData(0, 0, sample.width, sample.height).data;
        let r = 0;
        let g = 0;
        let b = 0;
        let count = 0;
        for (let i = 0; i < pixels.length; i += 16) {
            r += pixels[i];
            g += pixels[i + 1];
            b += pixels[i + 2];
            count += 1;
        }
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const brightness = Math.round((r * 0.299) + (g * 0.587) + (b * 0.114));
        const saturation = max === 0 ? 0 : (max - min) / max;
        const tone = brightness > 178 ? 'terang' : brightness < 92 ? 'gelap' : 'netral';
        const colorLabel = saturation < 0.14
            ? (brightness > 165 ? 'putih / abu terang' : 'abu / gelap')
            : (r > g && r > b ? 'hangat' : b > r && b > g ? 'sejuk' : 'natural');
        const ratio = img.width / img.height;
        const shape = ratio > 1.18 ? 'melebar' : ratio < 0.82 ? 'tinggi' : 'seimbang';

        return { brightness, tone, colorLabel, shape };
    };

    const roundedRectPath = (ctx, x, y, width, height, radius) => {
        const r = Math.min(radius, width / 2, height / 2);
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + width - r, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + r);
        ctx.lineTo(x + width, y + height - r);
        ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
        ctx.lineTo(x + r, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    };

    const strokePathTwice = (ctx, drawPath, width, color = '#070809') => {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgba(0,0,0,0.42)';
        ctx.lineWidth = width + 5;
        drawPath();
        ctx.stroke();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        drawPath();
        ctx.stroke();
        ctx.restore();
    };

    const drawLine = (ctx, x1, y1, x2, y2, width, color) => {
        strokePathTwice(ctx, () => {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
        }, width, color);
    };

    const drawStar = (ctx, cx, cy, radius, width, color) => {
        strokePathTwice(ctx, () => {
            ctx.beginPath();
            for (let i = 0; i < 16; i += 1) {
                const angle = (Math.PI / 8) * i - Math.PI / 2;
                const pointRadius = i % 2 === 0 ? radius : radius * 0.42;
                const x = cx + Math.cos(angle) * pointRadius;
                const y = cy + Math.sin(angle) * pointRadius;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
        }, width, color);
    };

    const getFallbackDesignRect = (canvas, areaKey) => {
        const w = canvas.width;
        const h = canvas.height;
        if (areaKey === 'pintu') {
            return { x: w * 0.29, y: h * 0.11, w: w * 0.42, h: h * 0.78 };
        }
        if (areaKey === 'balkon') {
            return { x: w * 0.1, y: h * 0.42, w: w * 0.8, h: h * 0.38 };
        }
        return { x: w * 0.22, y: h * 0.18, w: w * 0.56, h: h * 0.58 };
    };

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const colorDistance = (a, b) => {
        const dr = a.r - b.r;
        const dg = a.g - b.g;
        const db = a.b - b.b;
        return Math.sqrt((dr * dr) + (dg * dg) + (db * db));
    };

    const getPixel = (data, width, x, y) => {
        const i = ((y * width) + x) * 4;
        return { r: data[i], g: data[i + 1], b: data[i + 2] };
    };

    const getSaturation = ({ r, g, b }) => {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        return max === 0 ? 0 : (max - min) / max;
    };

    const getBrightness = ({ r, g, b }) => (r * 0.299) + (g * 0.587) + (b * 0.114);

    const dilateMask = (mask, width, height, iterations = 1) => {
        let current = mask;
        for (let step = 0; step < iterations; step += 1) {
            const next = current.slice();
            for (let y = 1; y < height - 1; y += 1) {
                for (let x = 1; x < width - 1; x += 1) {
                    const idx = y * width + x;
                    if (current[idx]) continue;
                    if (
                        current[idx - 1] || current[idx + 1] ||
                        current[idx - width] || current[idx + width] ||
                        current[idx - width - 1] || current[idx - width + 1] ||
                        current[idx + width - 1] || current[idx + width + 1]
                    ) {
                        next[idx] = 1;
                    }
                }
            }
            current = next;
        }
        return current;
    };

    const detectMainOpeningRect = (sourceCanvas, areaKey) => {
        const fallback = getFallbackDesignRect(sourceCanvas, areaKey);
        const sample = document.createElement('canvas');
        const sampleWidth = 180;
        sample.width = sampleWidth;
        sample.height = Math.max(90, Math.round(sampleWidth * (sourceCanvas.height / sourceCanvas.width)));
        const ctx = sample.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(sourceCanvas, 0, 0, sample.width, sample.height);

        const image = ctx.getImageData(0, 0, sample.width, sample.height);
        const data = image.data;
        const sw = sample.width;
        const sh = sample.height;
        const margin = Math.max(5, Math.round(Math.min(sw, sh) * 0.07));

        let wall = { r: 0, g: 0, b: 0 };
        let wallCount = 0;
        for (let y = 0; y < sh; y += 1) {
            for (let x = 0; x < sw; x += 1) {
                if (x > margin && x < sw - margin && y > margin && y < sh - margin) continue;
                const pixel = getPixel(data, sw, x, y);
                wall.r += pixel.r;
                wall.g += pixel.g;
                wall.b += pixel.b;
                wallCount += 1;
            }
        }
        wall = {
            r: wall.r / wallCount,
            g: wall.g / wallCount,
            b: wall.b / wallCount
        };
        const wallBrightness = getBrightness(wall);
        const wallSaturation = getSaturation(wall);
        const mask = new Uint8Array(sw * sh);

        for (let y = margin; y < sh - margin; y += 1) {
            for (let x = margin; x < sw - margin; x += 1) {
                const pixel = getPixel(data, sw, x, y);
                const right = getPixel(data, sw, Math.min(sw - 1, x + 1), y);
                const down = getPixel(data, sw, x, Math.min(sh - 1, y + 1));
                const diffWall = colorDistance(pixel, wall);
                const edge = (colorDistance(pixel, right) + colorDistance(pixel, down)) / 2;
                const saturation = getSaturation(pixel);
                const brightness = getBrightness(pixel);
                const isFeature =
                    diffWall > 36 ||
                    edge > 30 ||
                    (saturation > wallSaturation + 0.08 && diffWall > 20) ||
                    brightness < wallBrightness - 42;

                if (isFeature) mask[y * sw + x] = 1;
            }
        }

        const connectedMask = dilateMask(mask, sw, sh, 2);
        const visited = new Uint8Array(sw * sh);
        const components = [];

        for (let start = 0; start < connectedMask.length; start += 1) {
            if (!connectedMask[start] || visited[start]) continue;

            const queue = [start];
            visited[start] = 1;
            let qi = 0;
            let count = 0;
            let minX = sw;
            let maxX = 0;
            let minY = sh;
            let maxY = 0;

            while (qi < queue.length) {
                const idx = queue[qi];
                qi += 1;
                const x = idx % sw;
                const y = Math.floor(idx / sw);
                count += 1;
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);

                const neighbors = [idx - 1, idx + 1, idx - sw, idx + sw];
                neighbors.forEach(next => {
                    if (next < 0 || next >= connectedMask.length || visited[next] || !connectedMask[next]) return;
                    const nx = next % sw;
                    const ny = Math.floor(next / sw);
                    if (Math.abs(nx - x) + Math.abs(ny - y) !== 1) return;
                    visited[next] = 1;
                    queue.push(next);
                });
            }

            const rectW = maxX - minX + 1;
            const rectH = maxY - minY + 1;
            const rectArea = rectW * rectH;
            const aspect = rectW / rectH;
            const relativeArea = rectArea / (sw * sh);
            const cx = (minX + maxX) / 2 / sw;
            const cy = (minY + maxY) / 2 / sh;
            const centerPenalty = Math.hypot(cx - 0.5, cy - 0.48);
            const touchesOuterEdge = minX <= margin * 0.5 || maxX >= sw - margin * 0.5 ||
                minY <= margin * 0.5 || maxY >= sh - margin * 0.5;

            if (relativeArea < 0.025 || relativeArea > 0.72 || touchesOuterEdge) continue;
            if (areaKey === 'jendela' && (aspect < 0.45 || aspect > 3.6)) continue;
            if (areaKey === 'pintu' && (aspect < 0.22 || aspect > 1.25)) continue;
            if (areaKey === 'balkon' && (aspect < 1.2 || aspect > 6)) continue;

            components.push({
                minX,
                maxX,
                minY,
                maxY,
                count,
                score: count + (rectArea * 0.28) - (centerPenalty * sw * sh * 0.18)
            });
        }

        if (!components.length) return fallback;

        const best = components.sort((a, b) => b.score - a.score)[0];
        const scaleX = sourceCanvas.width / sw;
        const scaleY = sourceCanvas.height / sh;
        const padX = Math.max(sourceCanvas.width * 0.012, (best.maxX - best.minX) * scaleX * 0.035);
        const padY = Math.max(sourceCanvas.height * 0.012, (best.maxY - best.minY) * scaleY * 0.045);

        const detected = {
            x: (best.minX * scaleX) - padX,
            y: (best.minY * scaleY) - padY,
            w: ((best.maxX - best.minX + 1) * scaleX) + (padX * 2),
            h: ((best.maxY - best.minY + 1) * scaleY) + (padY * 2)
        };

        detected.x = clamp(detected.x, sourceCanvas.width * 0.03, sourceCanvas.width * 0.94);
        detected.y = clamp(detected.y, sourceCanvas.height * 0.03, sourceCanvas.height * 0.94);
        detected.w = clamp(detected.w, sourceCanvas.width * 0.18, sourceCanvas.width * 0.86);
        detected.h = clamp(detected.h, sourceCanvas.height * 0.18, sourceCanvas.height * 0.86);
        if (detected.x + detected.w > sourceCanvas.width * 0.97) detected.w = (sourceCanvas.width * 0.97) - detected.x;
        if (detected.y + detected.h > sourceCanvas.height * 0.97) detected.h = (sourceCanvas.height * 0.97) - detected.y;

        return detected;
    };

    const drawFrame = (ctx, rect, barWidth, color) => {
        strokePathTwice(ctx, () => roundedRectPath(ctx, rect.x, rect.y, rect.w, rect.h, Math.max(10, barWidth * 1.5)), barWidth * 1.35, color);
        drawLine(ctx, rect.x + barWidth, rect.y + rect.h * 0.5, rect.x + rect.w - barWidth, rect.y + rect.h * 0.5, Math.max(2, barWidth * 0.58), color);
    };

    const drawMinimalis = (ctx, rect, barWidth, color) => {
        const bars = Math.max(4, Math.round(rect.w / 78));
        for (let i = 1; i < bars; i += 1) {
            const x = rect.x + (rect.w / bars) * i;
            drawLine(ctx, x, rect.y + barWidth, x, rect.y + rect.h - barWidth, barWidth * 0.72, color);
        }
    };

    const drawIndustrial = (ctx, rect, barWidth, color) => {
        const cols = Math.max(4, Math.round(rect.w / 92));
        const rows = Math.max(3, Math.round(rect.h / 92));
        for (let i = 1; i < cols; i += 1) {
            const x = rect.x + (rect.w / cols) * i;
            drawLine(ctx, x, rect.y + barWidth, x, rect.y + rect.h - barWidth, barWidth * 0.54, color);
        }
        for (let i = 1; i < rows; i += 1) {
            const y = rect.y + (rect.h / rows) * i;
            drawLine(ctx, rect.x + barWidth, y, rect.x + rect.w - barWidth, y, barWidth * 0.54, color);
        }
        drawLine(ctx, rect.x + barWidth * 2, rect.y + barWidth * 2, rect.x + rect.w - barWidth * 2, rect.y + rect.h - barWidth * 2, barWidth * 0.45, color);
        drawLine(ctx, rect.x + rect.w - barWidth * 2, rect.y + barWidth * 2, rect.x + barWidth * 2, rect.y + rect.h - barWidth * 2, barWidth * 0.45, color);
    };

    const drawMewah = (ctx, rect, barWidth, color) => {
        const gold = '#C59B4B';
        drawMinimalis(ctx, rect, barWidth * 0.9, color);
        const bays = 4;
        for (let i = 0; i < bays; i += 1) {
            const x1 = rect.x + (rect.w / bays) * i + barWidth;
            const x2 = rect.x + (rect.w / bays) * (i + 1) - barWidth;
            const mid = (x1 + x2) / 2;
            strokePathTwice(ctx, () => {
                ctx.beginPath();
                ctx.moveTo(x1, rect.y + rect.h * 0.35);
                ctx.quadraticCurveTo(mid, rect.y + rect.h * 0.18, x2, rect.y + rect.h * 0.35);
            }, barWidth * 0.38, color);
            drawStar(ctx, mid, rect.y + rect.h * 0.68, Math.min(rect.w, rect.h) * 0.035, barWidth * 0.28, gold);
        }
    };

    const drawKlasik = (ctx, rect, barWidth, color) => {
        drawMinimalis(ctx, rect, barWidth * 0.85, color);
        const centerY = rect.y + rect.h * 0.54;
        for (let i = 0; i < 4; i += 1) {
            const cx = rect.x + rect.w * (0.2 + i * 0.2);
            strokePathTwice(ctx, () => {
                ctx.beginPath();
                ctx.moveTo(cx, centerY);
                ctx.bezierCurveTo(cx - rect.w * 0.08, centerY - rect.h * 0.18, cx + rect.w * 0.08, centerY - rect.h * 0.18, cx, centerY);
                ctx.bezierCurveTo(cx + rect.w * 0.08, centerY + rect.h * 0.18, cx - rect.w * 0.08, centerY + rect.h * 0.18, cx, centerY);
            }, barWidth * 0.38, color);
        }
    };

    const drawIslami = (ctx, rect, barWidth, color) => {
        const cols = Math.max(3, Math.round(rect.w / 120));
        const rows = Math.max(2, Math.round(rect.h / 120));
        for (let i = 1; i < cols; i += 1) {
            const x = rect.x + (rect.w / cols) * i;
            drawLine(ctx, x, rect.y + barWidth, x, rect.y + rect.h - barWidth, barWidth * 0.48, color);
        }
        for (let i = 1; i < rows; i += 1) {
            const y = rect.y + (rect.h / rows) * i;
            drawLine(ctx, rect.x + barWidth, y, rect.x + rect.w - barWidth, y, barWidth * 0.48, color);
        }
        for (let row = 0; row < rows; row += 1) {
            for (let col = 0; col < cols; col += 1) {
                const cx = rect.x + (rect.w / cols) * (col + 0.5);
                const cy = rect.y + (rect.h / rows) * (row + 0.5);
                drawStar(ctx, cx, cy, Math.min(rect.w / cols, rect.h / rows) * 0.24, barWidth * 0.32, color);
            }
        }
    };

    const drawTeraliMockup = (ctx, canvas, areaKey, styleKey, detectedRect = null) => {
        const baseRect = detectedRect || getFallbackDesignRect(canvas, areaKey);
        const inset = Math.max(4, Math.min(baseRect.w, baseRect.h) * 0.025);
        const rect = {
            x: baseRect.x + inset,
            y: baseRect.y + inset,
            w: baseRect.w - (inset * 2),
            h: baseRect.h - (inset * 2)
        };
        const color = '#08090b';
        const barWidth = Math.max(5, Math.min(rect.w, rect.h) * 0.022);

        ctx.save();
        ctx.fillStyle = 'rgba(0,0,0,0.12)';
        roundedRectPath(ctx, rect.x - barWidth, rect.y - barWidth, rect.w + barWidth * 2, rect.h + barWidth * 2, barWidth * 2);
        ctx.fill();
        ctx.restore();

        drawFrame(ctx, rect, barWidth, color);

        if (styleKey === 'industrial') drawIndustrial(ctx, rect, barWidth, color);
        else if (styleKey === 'mewah') drawMewah(ctx, rect, barWidth, color);
        else if (styleKey === 'klasik') drawKlasik(ctx, rect, barWidth, color);
        else if (styleKey === 'islami') drawIslami(ctx, rect, barWidth, color);
        else drawMinimalis(ctx, rect, barWidth, color);
    };

    const generateAIMockup = async (source, areaKey, styleKey) => {
        const img = await loadImageFromSrc(source);
        const maxWidth = 1100;
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(320, Math.round(img.width * scale));
        canvas.height = Math.max(240, Math.round(img.height * scale));
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const detectedRect = detectMainOpeningRect(canvas, areaKey);
        ctx.fillStyle = 'rgba(5, 6, 8, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawTeraliMockup(ctx, canvas, areaKey, styleKey, detectedRect);
        return {
            dataUrl: canvas.toDataURL('image/png'),
            analysis: analyzeImage(img)
        };
    };

    const buildPrompt = (areaKey, styleKey, analysis, notes) => {
        const area = (areaDetails[areaKey] || areaDetails.jendela).label.toLowerCase();
        const style = aiStyles[styleKey] || aiStyles.minimalis;
        const notePart = notes ? ` Client note: ${notes.trim()}.` : '';
        return `Generate ${style.promptTone} for this ${area}, aligned to the existing ${analysis.shape} opening, matching the ${analysis.tone} ${analysis.colorLabel} house color, realistic before-after product mockup.${notePart}`;
    };

    const renderAnalysisChips = (areaKey, styleKey, analysis) => {
        if (!aiAnalysis) return;
        const area = areaDetails[areaKey] || areaDetails.jendela;
        const style = aiStyles[styleKey] || aiStyles.minimalis;
        const chips = [
            ['Area', area.label],
            ['Style', style.label],
            ['Warna Foto', analysis.colorLabel],
            ['Bentuk', analysis.shape]
        ];
        aiAnalysis.innerHTML = chips.map(([label, value]) => `
            <div class="ai-chip">
                <span>${label}</span>
                <strong>${value}</strong>
            </div>
        `).join('');
    };

    const showRecommendations = (areaKey, styleKey) => {
        const rec = recommendations[areaKey];
        if (!rec || !recProducts) return;
        const style = aiStyles[styleKey] || aiStyles.minimalis;
        recAreaLabel.textContent = `${rec.label} dengan style ${style.label}`;
        const matched = rec.ids.map(id => products.find(p => p.id === id)).filter(Boolean);
        recProducts.innerHTML = matched.map(p => `
            <div class="rec-product-card">
                <img src="${p.image}" alt="${p.title}">
                <div class="rec-product-info">
                    <div class="rec-product-label">${p.categoryLabel}</div>
                    <div class="rec-product-name">${p.title}</div>
                    <div class="rec-product-price">${formatIDR(p.price)}</div>
                </div>
                <button class="rec-product-action" onclick="addToCart(${p.id})">
                    <i class="fa-solid fa-cart-plus"></i> Pesan
                </button>
            </div>
        `).join('');
        recResult.style.display = 'flex';
        if (window.matchMedia('(max-width: 992px)').matches) {
            requestAnimationFrame(() => recResult.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        }
    };

    const renderAIDesign = async () => {
        const notes = uploadNotes ? uploadNotes.value : '';
        const sourceImage = await loadImageFromSrc(previewImg.src);
        const analysis = analyzeImage(sourceImage);
        let prompt = buildPrompt(selectedArea, selectedStyle, analysis, notes);
        const estimate = calculateAIEstimate(selectedArea, selectedStyle, notes);
        const area = areaDetails[selectedArea] || areaDetails.jendela;
        const style = aiStyles[selectedStyle] || aiStyles.minimalis;
        let designDataUrl = null;
        let provider = 'openai';
        let providerLabel = 'OpenAI Image API';

        try {
            const aiDesign = await generateWithOpenAIBackend({
                source: previewImg.src,
                areaKey: selectedArea,
                styleKey: selectedStyle,
                notes,
                prompt,
                analysis
            });
            designDataUrl = aiDesign.imageDataUrl;
            prompt = aiDesign.prompt || prompt;
        } catch (err) {
            console.warn('[AI Backend] OpenAI image generation unavailable:', err.message);
            designDataUrl = previewImg.src;
            provider = 'unavailable';
            providerLabel = 'OpenAI belum aktif';
            const helpText = err.code === 'OPENAI_API_KEY_MISSING'
                ? 'OPENAI_API_KEY belum terpasang di Vercel, jadi gambar OpenAI belum bisa dibuat.'
                : `OpenAI backend gagal dipanggil: ${err.message}`;
            if (aiBackendWarningText) aiBackendWarningText.textContent = helpText;
            if (typeof showToast !== 'undefined') {
                showToast('OpenAI backend belum aktif. Hasil AI belum dibuat.', 'info');
            }
        }

        const waText = [
            'Halo Hidayat Teknik, saya ingin konsultasi desain AI terali.',
            `Area: ${area.label}`,
            `Style: ${style.label}`,
            `Estimasi: ${formatIDR(estimate.total)}`,
            `Detail: ${estimate.detail}`,
            `Prompt: ${prompt}`
        ].join('\n');

        latestAIPreview = provider === 'openai' ? designDataUrl : null;
        if (aiBeforeImg) aiBeforeImg.src = previewImg.src;
        if (aiAfterImg) aiAfterImg.src = designDataUrl;
        if (aiProviderLabel) aiProviderLabel.textContent = providerLabel;
        if (aiBackendWarning) aiBackendWarning.style.display = provider === 'openai' ? 'none' : 'flex';
        if (aiGeneratedCard) aiGeneratedCard.classList.toggle('ai-unavailable', provider !== 'openai');
        if (aiDownloadBtn) aiDownloadBtn.disabled = provider !== 'openai';
        if (aiPromptText) aiPromptText.textContent = prompt;
        if (aiEstimatePrice) aiEstimatePrice.textContent = formatIDR(estimate.total);
        if (aiEstimateDetail) aiEstimateDetail.textContent = estimate.detail;
        if (aiWhatsappLink) aiWhatsappLink.href = `https://wa.me/6281378373566?text=${encodeURIComponent(waText)}`;
        renderAnalysisChips(selectedArea, selectedStyle, analysis);
        showRecommendations(selectedArea, selectedStyle);

        return { prompt, estimate, provider };
    };

    if (aiDownloadBtn) {
        aiDownloadBtn.addEventListener('click', () => {
            if (!latestAIPreview) {
                if (typeof showToast !== 'undefined') showToast('Preview OpenAI belum tersedia untuk didownload.', 'info');
                return;
            }
            const link = document.createElement('a');
            link.href = latestAIPreview;
            link.download = `hidayat-teknik-ai-${selectedArea || 'terali'}-${selectedStyle || 'style'}.png`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    }

    const btnStartAr = $('btn-start-ar');
    const btnStopAr  = $('btn-stop-ar');
    const arVideo    = $('ar-video');
    const arModels   = $('ar-models');
    const arOverlayImg = $('ar-overlay-img');
    const arOverlayCont = $('ar-overlay-container');
    const arResizeHandle = $('ar-resize-handle');
    let arStream = null;

    if (btnStartAr) {
        btnStartAr.addEventListener('click', async () => {
            recIdle.style.display    = 'none';
            recResult.style.display  = 'block';
            
            // Populate models
            if (arModels && products) {
                arModels.innerHTML = products.map(p => `
                    <div style="flex-shrink:0; width:70px; height:70px; border-radius:8px; overflow:hidden; border:2px solid #333; cursor:pointer;"
                         onclick="document.getElementById('ar-overlay-img').src='${p.image}'">
                        <img src="${p.image}" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                `).join('');
            }

            try {
                // Use ideal: 'environment' so laptops with only front cameras don't throw an error
                arStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } } });
                arVideo.srcObject = arStream;
                arVideo.play().catch(e => console.log("Auto-play prevented", e));
            } catch (err) {
                console.error("Camera error:", err);
                alert("Tidak dapat mengakses kamera. Cek izin browser atau gunakan HP.");
                recResult.style.display = 'none';
                recIdle.style.display   = 'flex';
            }
        });
    }

    if (btnStopAr) {
        btnStopAr.addEventListener('click', () => {
            if (arStream) {
                arStream.getTracks().forEach(t => t.stop());
                arStream = null;
            }
            recResult.style.display = 'none';
            recIdle.style.display   = 'flex';
        });
    }

    // AR Overlay Drag & Resize Logic
    if (arOverlayCont && arResizeHandle) {
        let isDragging = false;
        let isResizing = false;
        let startX, startY;
        let startW, startH, startLeft, startTop;

        const pointerDown = (e) => {
            if (e.target === arResizeHandle) {
                isResizing = true;
            } else {
                isDragging = true;
            }
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            startX = clientX;
            startY = clientY;
            
            const rect = arOverlayCont.getBoundingClientRect();
            startW = rect.width;
            startH = rect.height;
            
            const parentRect = arOverlayCont.parentElement.getBoundingClientRect();
            startLeft = rect.left - parentRect.left + (startW/2);
            startTop  = rect.top - parentRect.top + (startH/2);
            
            e.preventDefault(); // prevent scroll
        };

        const pointerMove = (e) => {
            if (!isDragging && !isResizing) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            const dx = clientX - startX;
            const dy = clientY - startY;

            if (isDragging) {
                arOverlayCont.style.left = `${startLeft + dx}px`;
                arOverlayCont.style.top  = `${startTop + dy}px`;
            } else if (isResizing) {
                arOverlayCont.style.width  = `${Math.max(50, startW + dx)}px`;
                arOverlayCont.style.height = `${Math.max(50, startH + (dx * (startH/startW)))}px`; // Maintain rough aspect ratio
            }
        };

        const pointerUp = () => {
            isDragging = false;
            isResizing = false;
        };

        arOverlayCont.addEventListener('mousedown', pointerDown);
        arOverlayCont.addEventListener('touchstart', pointerDown, {passive: false});
        
        window.addEventListener('mousemove', pointerMove);
        window.addEventListener('touchmove', pointerMove, {passive: false});
        
        window.addEventListener('mouseup', pointerUp);
        window.addEventListener('touchend', pointerUp);
    }
}

// ===============================
// PAGE: BOOKING (booking.html)
// ===============================
const bookingDate  = $('booking-date');

if (bookingDate) {
    const slotBtns      = $$('.slot-btn');
    const bookName      = $('book-name');
    const bookPhone     = $('book-phone');
    const bookAddress   = $('book-address');
    const bookCity      = $('book-city');
    const bookArea      = $('book-area');
    const bookNotes     = $('book-notes');
    const bookingSubmit = $('booking-submit');
    const summaryIdle   = $('summary-idle');
    const summaryCard   = $('summary-card');
    const sumDate       = $('sum-date');
    const sumTime       = $('sum-time');
    const sumName       = $('sum-name');
    const sumPhone      = $('sum-phone');
    const sumAddress    = $('sum-address');
    const sumCity       = $('sum-city');
    const sumArea       = $('sum-area');
    const sumBookingId  = $('sum-booking-id');
    const sumWaLink     = $('sum-wa-link');
    const bookingReset  = $('booking-reset');

    let selectedSlot = null;

    // Set min date to tomorrow (skip Sunday)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1);
    bookingDate.min = tomorrow.toISOString().split('T')[0];

    // Format date ID
    const formatDateID = (str) => {
        if (!str) return '—';
        const days   = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
        const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
        const d = new Date(str + 'T00:00:00');
        return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    };

    // Generate booking ID
    const genId = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        return 'BK-' + Array.from({length: 6}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    };

    // Validate form completeness
    const validateBooking = () => {
        const ok = bookingDate.value && selectedSlot &&
                   bookName.value.trim() && bookPhone.value.trim() &&
                   bookAddress.value.trim() && bookCity.value.trim();
        bookingSubmit.disabled = !ok;
    };

    // Prevent Sunday
    bookingDate.addEventListener('change', () => {
        const d = new Date(bookingDate.value + 'T00:00:00');
        if (d.getDay() === 0) {
            bookingDate.value = '';
            alert('Maaf, survei tidak tersedia pada hari Minggu. Silakan pilih hari lain.');
        }
        validateBooking();
    });

    // Time slots
    slotBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            slotBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedSlot = btn.dataset.time;
            validateBooking();
        });
    });

    // Field watchers
    [bookName, bookPhone, bookAddress, bookCity].forEach(el => {
        el.addEventListener('input', validateBooking);
    });

    // Submit booking
    bookingSubmit.addEventListener('click', async () => {
        if (bookingSubmit.disabled) return;
        const areaLabels = { jendela: 'Terali Jendela', pintu: 'Terali Pintu', balkon: 'Terali Balkon', semua: 'Semua Area' };
        const slotLabel  = document.querySelector(`.slot-btn[data-time="${selectedSlot}"]`).textContent;
        const bookingId  = genId();
        const dateFmt    = formatDateID(bookingDate.value);
        const areaLabel  = areaLabels[bookArea.value] || bookArea.value;

        sumDate.textContent      = dateFmt;
        sumTime.textContent      = slotLabel;
        sumName.textContent      = bookName.value.trim();
        sumPhone.textContent     = bookPhone.value.trim();
        sumAddress.textContent   = bookAddress.value.trim();
        sumCity.textContent      = bookCity.value.trim();
        sumArea.textContent      = areaLabel;
        sumBookingId.textContent = bookingId;

        const msg = encodeURIComponent(
            `Halo Hidayat Teknik! 👋\n\nSaya ingin konfirmasi booking survey:\n` +
            `📋 No. Booking: ${bookingId}\n📅 Tanggal: ${dateFmt}\n🕐 Jam: ${slotLabel}\n` +
            `👤 Nama: ${bookName.value.trim()}\n📞 HP: ${bookPhone.value.trim()}\n` +
            `📍 Alamat: ${bookAddress.value.trim()}, ${bookCity.value.trim()}\n🏠 Area: ${areaLabel}\n` +
            (bookNotes.value.trim() ? `📝 Catatan: ${bookNotes.value.trim()}` : '')
        );
        sumWaLink.href = `https://wa.me/6281378373566?text=${msg}`;

        summaryIdle.style.display = 'none';
        summaryCard.style.display = 'flex';
        summaryCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Simpan ke Supabase
        if (typeof db !== 'undefined' && db.isConfigured()) {
            await db.saveBooking({
                bookingCode: bookingId,
                name:        bookName.value.trim(),
                phone:       bookPhone.value.trim(),
                address:     bookAddress.value.trim(),
                city:        bookCity.value.trim(),
                area:        bookArea.value,
                date:        bookingDate.value,
                time:        selectedSlot,
                notes:       bookNotes.value.trim()
            });
        }
    });

    // Reset
    bookingReset.addEventListener('click', () => {
        bookingDate.value = '';
        bookName.value = bookPhone.value = bookAddress.value = bookCity.value = bookNotes.value = '';
        slotBtns.forEach(b => b.classList.remove('active'));
        selectedSlot = null;
        bookingSubmit.disabled = true;
        summaryCard.style.display = 'none';
        summaryIdle.style.display = 'flex';
    });
}

// ===============================
// INIT
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    
    // Load custom Before-After images from Admin Settings if exist
    const customBeforeImg = localStorage.getItem('ht_home_before_img');
    const customAfterImg = localStorage.getItem('ht_home_after_img');
    const baBefore = document.querySelector('.ba-img-before');
    const baAfter = document.querySelector('.ba-img-after');
    if (baBefore && customBeforeImg) baBefore.src = customBeforeImg;
    if (baAfter && customAfterImg) baAfter.src = customAfterImg;

    // Before/After Slider Logic
    const baContainer = document.getElementById('ba-container');
    const baInput = document.getElementById('ba-input');
    const baOverlay = document.getElementById('ba-overlay');
    const baSlider = document.getElementById('ba-slider');

    if (baContainer && baInput && baOverlay && baSlider) {
        baInput.addEventListener('input', (e) => {
            const val = e.target.value;
            baOverlay.style.width = `${val}%`;
            baSlider.style.left = `${val}%`;
        });
    }
});
