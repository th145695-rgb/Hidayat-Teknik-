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
        });
    });

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

    // === DATA PRODUK STATIS ===
    const STATIC_PRODUCTS = [
        { id: 1,  title: 'Minimalist Window Grid',     category: 'jendela', category_label: 'Jendela',     price: 1250000, stock: 50, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 2,  title: 'Classic Floral Wrought Iron',category: 'klasik',  category_label: 'Klasik',      price: 2800000, stock: 20, image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 3,  title: 'Geometric Security Door',    category: 'pintu',   category_label: 'Pintu Utama', price: 3500000, stock: 15, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
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
