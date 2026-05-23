// =================
// BESIKRAF SCRIPT.JS
// Multi-page edition — all features are null-guarded
// =================

// ---- Product Data (shared, fallback jika DB tidak tersedia) ----
const products = [
    { id: 1, title: "Minimalist Window Grid",     category: "jendela", price: 1250000, image: "assets/images/minimalist_window_trellis_1779491829216.png", categoryLabel: "Jendela" },
    { id: 2, title: "Classic Floral Wrought Iron",category: "klasik",  price: 2800000, image: "assets/images/classic_iron_trellis_1779491907306.png",       categoryLabel: "Klasik" },
    { id: 3, title: "Geometric Security Door",    category: "pintu",   price: 3500000, image: "assets/images/modern_door_trellis_1779491945621.png",         categoryLabel: "Pintu Utama" },
    { id: 4, title: "Modern Vertical Lines",      category: "modern",  price: 1500000, image: "assets/images/minimalist_window_trellis_1779491829216.png",   categoryLabel: "Modern" },
    { id: 5, title: "Victorian Arch Window",      category: "klasik",  price: 3100000, image: "assets/images/classic_iron_trellis_1779491907306.png",        categoryLabel: "Klasik" },
    { id: 6, title: "Industrial Mesh Door",       category: "pintu",   price: 4200000, image: "assets/images/modern_door_trellis_1779491945621.png",         categoryLabel: "Pintu Utama" }
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

// Checkout handler (simpan ke DB)
const checkoutBtns = $$('.checkout-btn');
checkoutBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        if (cart.length === 0) {
            if (typeof showToast !== 'undefined') showToast('Keranjang kosong!', 'info');
            return;
        }
        const name  = prompt('Nama Anda (untuk catatan pesanan):') || 'Guest';
        const phone = prompt('No. WhatsApp (opsional):') || '';
        if (typeof db !== 'undefined' && db.isConfigured()) {
            await db.saveOrder(cart, { name, phone });
        } else {
            alert(`Pesanan diterima!\nTotal: ${formatIDR(cart.reduce((s,i)=>s+i.price*i.quantity,0))}`);
        }
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
        cartTotalEl.textContent = formatIDR(cart.reduce((s, i) => s + i.price * i.quantity, 0));
    }
};

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

const renderProducts = (category = 'all') => {
    if (!productsContainer) return;
    const list = category === 'all' ? products : products.filter(p => p.category === category);
    productsContainer.innerHTML = list.map(p => `
        <div class="product-card">
            <div class="product-img-wrapper">
                <img src="${p.image}" alt="${p.title}" class="product-img">
            </div>
            <div class="product-details">
                <div class="product-category">${p.categoryLabel}</div>
                <h3 class="product-title">${p.title}</h3>
                <div class="product-price">${formatIDR(p.price)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${p.id})">
                    <i class="fa-solid fa-cart-plus"></i> Tambah ke Keranjang
                </button>
            </div>
        </div>
    `).join('');
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
        let pricePerM2 = 500000;
        let detail = `Luas: ${luas.toFixed(2)} m²<br>Spesifikasi: `;

        if (calcJenis.value === 'nako_solid')   { pricePerM2 += 200000; detail += 'Nako Solid, '; }
        else if (calcJenis.value === 'tempa')   { pricePerM2 += 400000; detail += 'Besi Tempa, '; }
        else                                    { detail += 'Hollow Galvanis, '; }

        if (calcMotif.value === 'geometris')    { pricePerM2 += 150000; detail += 'Motif Geometris, '; }
        else if (calcMotif.value === 'klasik')  { pricePerM2 += 300000; detail += 'Motif Klasik, '; }
        else                                    { detail += 'Motif Minimalis, '; }

        if (calcWarna.value === 'emas')         { pricePerM2 += 50000;  detail += 'Warna Emas'; }
        else if (calcWarna.value === 'putih')   { detail += 'Warna Putih'; }
        else                                    { detail += 'Warna Hitam Matte'; }

        const total = luas * pricePerM2;
        calcPrice.textContent = formatIDR(total);
        calcDetails.innerHTML = detail;
        calcCartBtn.disabled = false;

        currentCustomProduct = {
            id: 'custom_' + Date.now(),
            title: `Custom Terali (${lebar}×${tinggi}cm)`,
            category: 'custom',
            price: total,
            image: 'assets/images/classic_iron_trellis_1779491907306.png',
            categoryLabel: 'Custom Order'
        };
    };

    [calcLebar, calcTinggi, calcJenis, calcWarna, calcMotif].forEach(el => {
        el.addEventListener('input', calculatePrice);
        el.addEventListener('change', calculatePrice);
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

const recommendations = {
    jendela: { label: 'Berdasarkan foto jendela yang Anda upload',  ids: [1, 2, 4] },
    pintu:   { label: 'Berdasarkan foto pintu yang Anda upload',    ids: [3, 6] },
    balkon:  { label: 'Berdasarkan foto balkon yang Anda upload',   ids: [2, 5, 3] }
};

if (dropzone) {
    let uploadedFile = null;
    let selectedArea = null;

    const validateUpload = () => {
        if (uploadSubmit) uploadSubmit.disabled = !(uploadedFile && selectedArea);
    };

    $$('input[name="area-type"]').forEach(radio => {
        radio.addEventListener('change', () => { selectedArea = radio.value; validateUpload(); });
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
        });
    }

    const showRecommendations = (areaKey) => {
        const rec = recommendations[areaKey];
        if (!rec || !recProducts) return;
        recAreaLabel.textContent = rec.label;
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
        requestAnimationFrame(() => recResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
    };

    if (uploadSubmit) {
        uploadSubmit.addEventListener('click', async () => {
            if (!uploadedFile || !selectedArea) return;
            recIdle.style.display    = 'none';
            recResult.style.display  = 'none';
            recLoading.style.display = 'flex';

            // Simulasi analisis 1.8 detik
            setTimeout(() => {
                recLoading.style.display = 'none';
                showRecommendations(selectedArea);
            }, 1800);

            // Simpan ke Supabase (non-blocking)
            const recIds = (recommendations[selectedArea]?.ids) || [];
            const notesEl = $('upload-notes');
            if (typeof db !== 'undefined' && db.isConfigured()) {
                db.savePhotoRequest({
                    areaType:       selectedArea,
                    file:           uploadedFile,
                    notes:          notesEl ? notesEl.value : '',
                    recommendedIds: recIds
                });
            }
        });
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
            `Halo BesiKraf! 👋\n\nSaya ingin konfirmasi booking survey:\n` +
            `📋 No. Booking: ${bookingId}\n📅 Tanggal: ${dateFmt}\n🕐 Jam: ${slotLabel}\n` +
            `👤 Nama: ${bookName.value.trim()}\n📞 HP: ${bookPhone.value.trim()}\n` +
            `📍 Alamat: ${bookAddress.value.trim()}, ${bookCity.value.trim()}\n🏠 Area: ${areaLabel}\n` +
            (bookNotes.value.trim() ? `📝 Catatan: ${bookNotes.value.trim()}` : '')
        );
        sumWaLink.href = `https://wa.me/6281234567890?text=${msg}`;

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
});
