document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-product-form');
    const imgInput = document.getElementById('p-image');
    const imgPreview = document.getElementById('image-preview');

    const loginSection = document.getElementById('login-section');
    const adminContent = document.getElementById('admin-content');
    const btnLogin = document.getElementById('btn-login');
    const tableBody = document.getElementById('product-table-body');

    // === KREDENSIAL ADMIN ===
    const ADMIN_EMAIL    = 'th145695@gmail.com';
    const ADMIN_PASSWORD = 'taufik123';

    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    // --- LOGIN LOGIC ---
    const unlockDashboard = () => {
        loginSection.style.display = 'none';
        adminContent.style.display = 'block';
        sessionStorage.setItem('ht_admin', '1');
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
        adminContent.style.display = 'none';
        loginSection.style.display = 'flex';
        document.getElementById('admin-email').value = '';
        document.getElementById('admin-password').value = '';
        loginError.style.display = 'none';
    });

    // === DATA PRODUK STATIS (dari katalog) ===
    const STATIC_PRODUCTS = [
        { id: 1,  title: 'Minimalist Window Grid',     category: 'jendela', category_label: 'Jendela',     price: 1250000, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 2,  title: 'Classic Floral Wrought Iron',category: 'klasik',  category_label: 'Klasik',      price: 2800000, image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 3,  title: 'Geometric Security Door',    category: 'pintu',   category_label: 'Pintu Utama', price: 3500000, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 4,  title: 'Modern Vertical Lines',      category: 'modern',  category_label: 'Modern',      price: 1500000, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 5,  title: 'Victorian Arch Window',      category: 'klasik',  category_label: 'Klasik',      price: 3100000, image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 6,  title: 'Industrial Mesh Door',       category: 'pintu',   category_label: 'Pintu Utama', price: 4200000, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 7,  title: 'Premium Laser Cut Door',     category: 'pintu',   category_label: 'Pintu Utama', price: 5500000, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 8,  title: 'European Style Window Grid', category: 'klasik',  category_label: 'Klasik',      price: 1850000, image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 9,  title: 'Industrial Expanded Metal',  category: 'modern',  category_label: 'Modern',      price: 4800000, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 10, title: 'Simple Diamond Window',      category: 'jendela', category_label: 'Jendela',     price: 950000,  image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 11, title: 'Ornate Wrought Iron Gate',   category: 'klasik',  category_label: 'Klasik',      price: 8500000, image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 12, title: 'Modern Horizontal Slat',     category: 'modern',  category_label: 'Modern',      price: 3200000, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
        { id: 13, title: 'Elegant French Window',      category: 'klasik',  category_label: 'Klasik',      price: 2400000, image_url: 'assets/images/classic_iron_trellis_1779491907306.png' },
        { id: 14, title: 'Stainless Security Door',    category: 'pintu',   category_label: 'Pintu Utama', price: 6200000, image_url: 'assets/images/modern_door_trellis_1779491945621.png' },
        { id: 15, title: 'Geometric Balcony Guard',    category: 'modern',  category_label: 'Modern',      price: 1750000, image_url: 'assets/images/minimalist_window_trellis_1779491829216.png' },
    ];

    // Mutable working copy of the product list
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
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#f39c12; padding:0.5rem;">
                <i class="fa-solid fa-circle-info"></i> Data katalog statis — perubahan hapus/edit hanya berlaku sementara di layar ini.
            </td></tr>`;
        } else {
            tableBody.innerHTML = '';
        }

        products.forEach(p => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-row-id', p.id);
            tr.innerHTML = `
                <td><img src="${p.image_url}" alt="${p.title}" onerror="this.src='assets/images/minimalist_window_trellis_1779491829216.png'"></td>
                <td><strong>${p.title}</strong></td>
                <td><span class="badge">${p.category_label}</span></td>
                <td>Rp ${p.price.toLocaleString('id-ID')}</td>
                <td style="display:flex; gap:6px; align-items:center;">
                    <button class="btn-edit" style="background:#f39c12;color:white;border:none;padding:0.5rem 0.7rem;border-radius:6px;cursor:pointer;" data-product='${JSON.stringify(p).replace(/'/g,"&#39;")}'>
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-delete" style="background:#e74c3c;color:white;border:none;padding:0.5rem 0.7rem;border-radius:6px;cursor:pointer;" data-id="${p.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // ---- DELETE ----
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = String(e.currentTarget.getAttribute('data-id'));
                if (!confirm('Yakin ingin menghapus produk ini?')) return;

                if (activeIsStatic) {
                    // Hapus dari array lokal & render ulang tanpa reload
                    activeProducts = activeProducts.filter(p => String(p.id) !== id);
                    renderTable(activeProducts, true);
                } else {
                    const res = await db.deleteProduct(id);
                    if (res.success) loadProducts();
                }
            });
        });

        // ---- EDIT ----
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const product = JSON.parse(e.currentTarget.getAttribute('data-product').replace(/&#39;/g,"'"));

                document.getElementById('p-id').value       = product.id;
                document.getElementById('p-title').value    = product.title;
                document.getElementById('p-price').value    = product.price;
                document.getElementById('p-category').value = product.category;

                imgPreview.src = product.image_url;
                imgPreview.style.display = 'block';
                imgInput.removeAttribute('required');

                document.querySelector('#add-product-form h3').textContent          = 'Edit Produk';
                document.getElementById('btn-submit-product').innerHTML             = '<i class="fa-solid fa-floppy-disk"></i> Simpan Perubahan';
                document.getElementById('btn-cancel-edit').style.display            = 'block';

                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    };

    // Tombol Batal Edit
    document.getElementById('btn-cancel-edit').addEventListener('click', () => {
        form.reset();
        document.getElementById('p-id').value = '';
        imgPreview.style.display = 'none';
        imgInput.setAttribute('required', 'required');
        document.querySelector('#add-product-form h3').textContent = 'Tambah Produk Baru';
        document.getElementById('btn-submit-product').innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Upload Produk';
        document.getElementById('btn-cancel-edit').style.display = 'none';
    });

    // Menampilkan preview gambar yang dipilih
    imgInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imgPreview.src = e.target.result;
                imgPreview.style.display = 'block';
            }
            reader.readAsDataURL(file);
        } else {
            imgPreview.style.display = 'none';
        }
    });

    // Menangani form submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (typeof db === 'undefined' || !db.isConfigured()) {
            alert('Supabase belum terkonfigurasi. Tidak bisa menambah produk.');
            return;
        }

        const id = document.getElementById('p-id').value;
        const title = document.getElementById('p-title').value;
        const price = parseInt(document.getElementById('p-price').value);
        const category = document.getElementById('p-category').value;
        const file = imgInput.files[0];
        const oldImageUrl = imgPreview.src;

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
        btn.disabled = true;

        const res = await db.upsertProduct({ id, title, category, price, file, oldImageUrl });

        if (res.success) {
            document.getElementById('btn-cancel-edit').click(); // Reset form
            loadProducts(); // Refresh tabel
        }

        btn.innerHTML = originalText;
        btn.disabled = false;
    });

    // Initialize
    checkSession();
});
