document.addEventListener('DOMContentLoaded', () => {
    // === ELEMENTS ===
    const loginSection = document.getElementById('login-section');
    const adminWrapper = document.getElementById('admin-wrapper');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    
    // Tab Elements
    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-target]');
    const viewSections = document.querySelectorAll('.view-section');

    // Product Form
    const form = document.getElementById('add-product-form');
    const imgInput = document.getElementById('p-image');
    
    // Table
    const tableBody = document.getElementById('product-table-body');

    // === KREDENSIAL ADMIN ===
    const ADMIN_EMAIL    = 'th145695@gmail.com';
    const ADMIN_PASSWORD = 'taufik123';

    // --- LOGIN LOGIC ---
    const unlockDashboard = () => {
        loginSection.style.display = 'none';
        adminWrapper.style.display = 'flex';
        sessionStorage.setItem('ht_admin', '1');
        initDashboard();
        loadProducts();
    };

    const checkSession = () => {
        if (sessionStorage.getItem('ht_admin') === '1') unlockDashboard();
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email    = document.getElementById('admin-email').value.trim().toLowerCase();
        const password = document.getElementById('admin-password').value;

        if (email === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
            unlockDashboard();
        } else {
            loginError.textContent = '⚠️ Email atau password salah!';
            loginError.style.display = 'block';
            document.getElementById('admin-password').value = '';
        }
    });

    // --- LOGOUT ---
    document.getElementById('btn-logout').addEventListener('click', () => {
        sessionStorage.removeItem('ht_admin');
        adminWrapper.style.display = 'none';
        loginSection.style.display = 'flex';
        document.getElementById('admin-email').value = '';
        document.getElementById('admin-password').value = '';
        loginError.style.display = 'none';
    });

    // --- SIDEBAR TABS ---
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const target = link.getAttribute('data-target');
            viewSections.forEach(sec => {
                if(sec.id === target) sec.classList.add('active');
                else sec.classList.remove('active');
            });
            // Auto-load pesanan saat tab dibuka
            if (target === 'view-orders') loadOrders();
        });
    });

    // --- KELOLA PESANAN ---
    const STATUS_LABELS = {
        confirmed:    '✅ Dikonfirmasi',
        fabrication:  '🔨 Fabrikasi',
        finishing:    '🎨 Finishing',
        installation: '🚚 Instalasi',
        done:         '✅ Selesai',
        cancelled:    '❌ Dibatalkan'
    };

    window.loadOrders = async () => {
        const tbody = document.getElementById('orders-table-body');
        if (!tbody) return;
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:#888;"><i class="fa-solid fa-spinner fa-spin"></i> Memuat pesanan...</td></tr>`;

        if (typeof db === 'undefined') {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:#e74c3c;">Database tidak tersedia.</td></tr>`;
            return;
        }

        const result = await db.fetchAllOrders();
        if (!result.success || !result.data || result.data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:#888;">Belum ada pesanan masuk.</td></tr>`;
            return;
        }

        tbody.innerHTML = '';
        result.data.forEach(order => {
            const items = (order.order_items || []).map(i => `${i.product_title} (x${i.quantity})`).join('<br>') || '<em style="color:#888">-</em>';
            const dateStr = new Date(order.created_at).toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' });
            const totalRp = 'Rp ' + Number(order.total_price).toLocaleString('id-ID');
            const status  = order.status || 'confirmed';

            const statusOptions = Object.entries(STATUS_LABELS).map(([val, lbl]) =>
                `<option value="${val}" ${val === status ? 'selected' : ''}>${lbl}</option>`
            ).join('');

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <strong style="color:var(--primary-color);">${order.invoice_number || order.id.slice(0,8).toUpperCase()}</strong><br>
                    <span style="font-size:0.75rem; color:#888;">${order.customer_phone || '-'}</span>
                </td>
                <td><strong>${order.customer_name || 'Guest'}</strong></td>
                <td style="font-size:0.82rem; max-width:180px;">${items}</td>
                <td style="font-weight:600; color:var(--primary-color);">${totalRp}</td>
                <td>
                    <select class="status-select" data-order-id="${order.id}" onchange="updateStatus(this)">
                        ${statusOptions}
                    </select>
                </td>
                <td>
                    <textarea class="notes-input" rows="2" placeholder="Tambah catatan..." data-order-id="${order.id}">${order.notes || ''}</textarea>
                    <button class="save-notes-btn" onclick="saveNotes('${order.id}', this)">💾 Simpan</button>
                </td>
                <td style="min-width:180px;">
                    <select id="stage-${order.id}" style="width:100%; padding:0.35rem; font-size:0.78rem; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:6px; margin-bottom:0.3rem;">
                        <option value="Rangka Selesai">📐 Rangka Selesai</option>
                        <option value="Proses Las">🔥 Proses Las</option>
                        <option value="Proses Finishing">🛠️ Proses Finishing</option>
                        <option value="Proses Cat">🎨 Proses Cat</option>
                        <option value="Siap Kirim">📦 Siap Kirim</option>
                    </select>
                    <input type="text" id="caption-${order.id}" placeholder="Keterangan foto..." style="width:100%; padding:0.35rem 0.5rem; font-size:0.78rem; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.08); color:#ccc; border-radius:6px; margin-bottom:0.3rem;">
                    <input type="file" id="photo-${order.id}" accept="image/*" style="width:100%; font-size:0.72rem; color:#888; margin-bottom:0.3rem;">
                    <button class="save-notes-btn" onclick="uploadProgressPhoto('${order.id}', this)" style="width:100%;">📸 Upload Foto</button>
                </td>
                <td style="color:#888; font-size:0.82rem;">${dateStr}</td>
            `;
            tbody.appendChild(tr);
        });
    };

    window.uploadProgressPhoto = async (orderId, btn) => {
        const stageEl   = document.getElementById(`stage-${orderId}`);
        const captionEl = document.getElementById(`caption-${orderId}`);
        const photoEl   = document.getElementById(`photo-${orderId}`);
        const photoFile = photoEl?.files[0] || null;
        const stage     = stageEl?.value || 'Update';
        const caption   = captionEl?.value || '';

        btn.disabled = true;
        btn.textContent = '⏳ Mengupload...';

        const res = await db.addProductionUpdate(orderId, stage, caption, photoFile);
        if (res.success) {
            btn.textContent = '✅ Berhasil!';
            captionEl.value = '';
            if (photoEl) photoEl.value = '';
        } else {
            btn.textContent = '❌ Gagal';
            console.error('Upload error:', res.error);
        }
        btn.disabled = false;
        setTimeout(() => btn.textContent = '📸 Upload Foto', 2500);
    };

    window.updateStatus = async (selectEl) => {
        const orderId   = selectEl.getAttribute('data-order-id');
        const newStatus = selectEl.value;
        selectEl.disabled = true;
        await db.updateOrderStatus(orderId, newStatus);
        selectEl.disabled = false;
    };

    window.saveNotes = async (orderId, btn) => {
        const textarea = document.querySelector(`textarea[data-order-id="${orderId}"]`);
        if (!textarea) return;
        btn.disabled = true;
        btn.textContent = '⏳';
        const res = await db.updateOrderStatus(orderId, null, textarea.value);
        btn.disabled  = false;
        btn.textContent = res.success ? '✅ Tersimpan' : '❌ Gagal';
        setTimeout(() => btn.textContent = '💾 Simpan', 2000);
    };

    // --- CHART JS ---
    const initDashboard = () => {
        const ctx = document.getElementById('salesChart');
        if (!ctx) return;
        // Avoid re-initialization if already created
        if (window.salesChartInstance) return;

        window.salesChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
                datasets: [{
                    label: 'Pendapatan (Juta Rp)',
                    data: [15, 22, 18, 30, 45, 55.5],
                    borderColor: '#c59b4b',
                    backgroundColor: 'rgba(197,155,75,0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#888' } },
                    x: { grid: { display: false }, ticks: { color: '#888' } }
                }
            }
        });
    };

    // === DATA PRODUK STATIS (60 produk lengkap) ===
    const STATIC_PRODUCTS = [
        // ── JENDELA
        { id: 1,  title: 'Minimalist Window Grid',        category: 'jendela', category_label: 'Jendela',     price: 1250000, stock: 50, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 10, title: 'Simple Diamond Window',          category: 'jendela', category_label: 'Jendela',     price: 950000,  stock: 45, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 16, title: 'Slim Vertical Bar Window',       category: 'jendela', category_label: 'Jendela',     price: 880000,  stock: 60, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 17, title: 'Double Panel Window Grille',     category: 'jendela', category_label: 'Jendela',     price: 1450000, stock: 35, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 18, title: 'Hexagonal Pattern Window',       category: 'jendela', category_label: 'Jendela',     price: 1680000, stock: 30, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 19, title: 'Cross Hatch Security Window',    category: 'jendela', category_label: 'Jendela',     price: 1100000, stock: 40, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 20, title: 'Butterfly Motif Window',         category: 'jendela', category_label: 'Jendela',     price: 1950000, stock: 25, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 21, title: 'Square Grid Standard Window',    category: 'jendela', category_label: 'Jendela',     price: 790000,  stock: 70, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 22, title: 'Arched Top Window Grille',       category: 'jendela', category_label: 'Jendela',     price: 2100000, stock: 20, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 23, title: 'Diagonal Slash Window',          category: 'jendela', category_label: 'Jendela',     price: 1350000, stock: 38, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 24, title: 'Oval Accent Window Guard',       category: 'jendela', category_label: 'Jendela',     price: 1720000, stock: 28, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 25, title: 'Wide Span Panoramic Grille',     category: 'jendela', category_label: 'Jendela',     price: 2350000, stock: 18, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 26, title: 'Narrow Slit Ventilation Guard',  category: 'jendela', category_label: 'Jendela',     price: 680000,  stock: 80, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 27, title: 'Bamboo Style Window Grille',     category: 'jendela', category_label: 'Jendela',     price: 1580000, stock: 32, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        // ── PINTU UTAMA
        { id: 3,  title: 'Geometric Security Door',        category: 'pintu',   category_label: 'Pintu Utama', price: 3500000, stock: 15, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 6,  title: 'Industrial Mesh Door',           category: 'pintu',   category_label: 'Pintu Utama', price: 4200000, stock: 12, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 7,  title: 'Premium Laser Cut Door',         category: 'pintu',   category_label: 'Pintu Utama', price: 5500000, stock: 8,  image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 14, title: 'Stainless Security Door',        category: 'pintu',   category_label: 'Pintu Utama', price: 6200000, stock: 6,  image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 28, title: 'Double Wing Entrance Door',      category: 'pintu',   category_label: 'Pintu Utama', price: 7800000, stock: 5,  image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 29, title: 'Single Panel Solid Door',        category: 'pintu',   category_label: 'Pintu Utama', price: 2950000, stock: 20, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 30, title: 'Glass Insert Security Door',     category: 'pintu',   category_label: 'Pintu Utama', price: 4750000, stock: 10, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 31, title: 'Pivot Style Iron Door',          category: 'pintu',   category_label: 'Pintu Utama', price: 8900000, stock: 4,  image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 32, title: 'Folding Gate Security Door',     category: 'pintu',   category_label: 'Pintu Utama', price: 5100000, stock: 9,  image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 33, title: 'Arch Top Grand Entrance Door',   category: 'pintu',   category_label: 'Pintu Utama', price: 9500000, stock: 3,  image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 34, title: 'Hollow Galvanis Entry Door',     category: 'pintu',   category_label: 'Pintu Utama', price: 2750000, stock: 22, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 35, title: 'Sliding Barn Style Iron Door',   category: 'pintu',   category_label: 'Pintu Utama', price: 6700000, stock: 7,  image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 36, title: 'French Double Leaf Door',        category: 'pintu',   category_label: 'Pintu Utama', price: 7200000, stock: 5,  image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 37, title: 'Compact Apartment Door',         category: 'pintu',   category_label: 'Pintu Utama', price: 3150000, stock: 18, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        // ── KLASIK
        { id: 2,  title: 'Classic Floral Wrought Iron',    category: 'klasik',  category_label: 'Klasik',      price: 2800000, stock: 20, image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 5,  title: 'Victorian Arch Window',          category: 'klasik',  category_label: 'Klasik',      price: 3100000, stock: 16, image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 8,  title: 'European Style Window Grid',     category: 'klasik',  category_label: 'Klasik',      price: 1850000, stock: 25, image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 11, title: 'Ornate Wrought Iron Gate',       category: 'klasik',  category_label: 'Klasik',      price: 8500000, stock: 4,  image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 13, title: 'Elegant French Window',          category: 'klasik',  category_label: 'Klasik',      price: 2400000, stock: 22, image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 38, title: 'Baroque Scroll Terali',          category: 'klasik',  category_label: 'Klasik',      price: 4500000, stock: 10, image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 39, title: 'Antique Medallion Door',         category: 'klasik',  category_label: 'Klasik',      price: 6800000, stock: 6,  image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 40, title: 'Renaissance Leaf Pattern',       category: 'klasik',  category_label: 'Klasik',      price: 3750000, stock: 12, image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 41, title: 'Colonial Spear Top Fence',       category: 'klasik',  category_label: 'Klasik',      price: 5200000, stock: 8,  image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 42, title: 'Lotus Bloom Window Guard',       category: 'klasik',  category_label: 'Klasik',      price: 2950000, stock: 18, image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 43, title: 'Heritage Oval Motif Grille',     category: 'klasik',  category_label: 'Klasik',      price: 3400000, stock: 14, image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 44, title: 'Majestic Crown Gate',            category: 'klasik',  category_label: 'Klasik',      price: 9800000, stock: 2,  image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 45, title: 'Acanthus Leaf Balustrade',       category: 'klasik',  category_label: 'Klasik',      price: 4100000, stock: 11, image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 46, title: 'Neo-Classical Pillar Grille',    category: 'klasik',  category_label: 'Klasik',      price: 5700000, stock: 7,  image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 47, title: 'Javanese Batik Iron Screen',     category: 'klasik',  category_label: 'Klasik',      price: 4300000, stock: 9,  image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 48, title: 'Mediterranean Wave Door',        category: 'klasik',  category_label: 'Klasik',      price: 6100000, stock: 6,  image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        // ── MODERN
        { id: 4,  title: 'Modern Vertical Lines',          category: 'modern',  category_label: 'Modern',      price: 1500000, stock: 40, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 9,  title: 'Industrial Expanded Metal',      category: 'modern',  category_label: 'Modern',      price: 4800000, stock: 10, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 12, title: 'Modern Horizontal Slat',         category: 'modern',  category_label: 'Modern',      price: 3200000, stock: 18, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 15, title: 'Geometric Balcony Guard',        category: 'modern',  category_label: 'Modern',      price: 1750000, stock: 35, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 49, title: 'Matte Black Flat Bar Gate',      category: 'modern',  category_label: 'Modern',      price: 3800000, stock: 14, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 50, title: 'Steel Cable & Rod Screen',       category: 'modern',  category_label: 'Modern',      price: 5300000, stock: 8,  image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 51, title: 'Perforated Sheet Facade',        category: 'modern',  category_label: 'Modern',      price: 2800000, stock: 20, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 52, title: 'Angular Z-Bar Window Guard',     category: 'modern',  category_label: 'Modern',      price: 1920000, stock: 28, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 53, title: 'Louvered Iron Privacy Panel',    category: 'modern',  category_label: 'Modern',      price: 4100000, stock: 12, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 54, title: 'Floating Frame Terali',          category: 'modern',  category_label: 'Modern',      price: 3550000, stock: 15, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 55, title: 'Zigzag Pattern Grille',          category: 'modern',  category_label: 'Modern',      price: 2150000, stock: 24, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 56, title: 'Stacked Box Modular Gate',       category: 'modern',  category_label: 'Modern',      price: 4600000, stock: 10, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 57, title: 'Wave Motion Balcony Rail',       category: 'modern',  category_label: 'Modern',      price: 2700000, stock: 22, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 58, title: 'Honeycomb Steel Panel',          category: 'modern',  category_label: 'Modern',      price: 3900000, stock: 13, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 59, title: 'Retro Grid Iron Screen',         category: 'modern',  category_label: 'Modern',      price: 2450000, stock: 20, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 60, title: 'Avant-Garde Sculptural Gate',    category: 'modern',  category_label: 'Modern',      price: 7500000, stock: 4,  image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
    ];

    let activeProducts = [];
    let activeIsStatic = false;

    const loadProducts = async () => {
        if (typeof db === 'undefined' || !db.isConfigured()) {
            activeProducts  = [...STATIC_PRODUCTS];
            activeIsStatic  = true;
            renderTable(activeProducts, true);
            return;
        }

        const dbProducts = await db.fetchProducts();
        if (dbProducts && dbProducts.length > 0) {
            activeProducts = dbProducts;
            activeIsStatic = false;
        } else {
            activeProducts = [...STATIC_PRODUCTS];
            activeIsStatic = true;
        }
        renderTable(activeProducts, activeIsStatic);
    };

    const renderTable = (products, isStatic = false) => {
        if (isStatic) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#f39c12; padding:1.5rem;">
                <i class="fa-solid fa-circle-info"></i> Data katalog statis — perubahan hapus/edit hanya berlaku sementara di layar ini.
            </td></tr>`;
        } else {
            tableBody.innerHTML = '';
        }

        products.forEach(p => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-row-id', p.id);
            const stock = p.stock || 50;
            tr.innerHTML = `
                <td><img src="${p.image_url}" alt="${p.title}" style="width:50px;height:50px;object-fit:cover;border-radius:6px;" onerror="this.src='assets/images/minimalist_window_trellis_1779491829216.png'"></td>
                <td><strong>${p.title}</strong><br><span style="font-size:0.8rem;color:var(--text-secondary);">${p.category_label}</span></td>
                <td>Rp ${p.price.toLocaleString('id-ID')}</td>
                <td><span style="background:rgba(255,255,255,0.05); padding:0.2rem 0.6rem; border-radius:4px;">${stock} m/pcs</span></td>
                <td style="display:flex; gap:6px; align-items:center;">
                    <button class="btn-edit" style="background:#f39c12;color:white;border:none;padding:0.4rem 0.6rem;border-radius:6px;cursor:pointer;" data-product='${JSON.stringify(p).replace(/'/g,"&#39;")}'>
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-delete" style="background:#e74c3c;color:white;border:none;padding:0.4rem 0.6rem;border-radius:6px;cursor:pointer;" data-id="${p.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Delete Logic
        tableBody.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = String(e.currentTarget.getAttribute('data-id'));
                if (!confirm('Yakin ingin menghapus produk ini?')) return;
                if (activeIsStatic) {
                    activeProducts = activeProducts.filter(p => String(p.id) !== id);
                    renderTable(activeProducts, true);
                } else {
                    const res = await db.deleteProduct(id);
                    if (res.success) loadProducts();
                }
            });
        });

        // Edit Logic
        tableBody.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const product = JSON.parse(e.currentTarget.getAttribute('data-product').replace(/&#39;/g,"'"));
                document.getElementById('p-id').value       = product.id;
                document.getElementById('p-title').value    = product.title;
                document.getElementById('p-price').value    = product.price;
                document.getElementById('p-category').value = product.category;
                document.getElementById('p-stock').value    = product.stock || 50;
                imgInput.removeAttribute('required');
                
                const submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Simpan Perubahan';
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    };

    // Form Submit (Add/Edit Product)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (typeof db === 'undefined' || !db.isConfigured()) {
            alert('Supabase belum terkonfigurasi. Penambahan produk hanya berhasil di sistem nyata.');
            form.reset();
            return;
        }

        const id = document.getElementById('p-id').value;
        const title = document.getElementById('p-title').value;
        const price = parseInt(document.getElementById('p-price').value.replace(/\./g, ''));
        const stock = parseInt(document.getElementById('p-stock').value);
        const category = document.getElementById('p-category').value;
        const file = imgInput.files[0];
        
        // This is simplified since we don't handle local dummy addition
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
        btn.disabled = true;

        const res = await db.upsertProduct({ id, title, category, price, stock, file, oldImageUrl: '' });

        if (res.success) {
            form.reset();
            document.getElementById('p-id').value = '';
            imgInput.setAttribute('required', 'required');
            btn.innerHTML = 'Simpan Data';
            loadProducts();
        }

        btn.innerHTML = originalText;
        btn.disabled = false;
    });

    // Initialize
    checkSession();
});
