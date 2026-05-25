document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-product-form');
    const imgInput = document.getElementById('p-image');
    const imgPreview = document.getElementById('image-preview');

    const loginSection = document.getElementById('login-section');
    const adminContent = document.getElementById('admin-content');
    const pinInput = document.getElementById('admin-pin');
    const btnLogin = document.getElementById('btn-login');
    const tableBody = document.getElementById('product-table-body');

    // --- LOGIN LOGIC ---
    const checkLogin = () => {
        if (localStorage.getItem('admin_logged_in') === 'true') {
            loginSection.style.display = 'none';
            adminContent.style.display = 'block';
            loadProducts();
        }
    };

    btnLogin.addEventListener('click', () => {
        const pin = pinInput.value;
        if (pin === '123456') { // PIN Rahasia Admin
            localStorage.setItem('admin_logged_in', 'true');
            checkLogin();
        } else {
            alert('PIN Salah!');
            pinInput.value = '';
        }
    });

    pinInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') btnLogin.click();
    });

    // --- PRODUCT MANAGEMENT ---
    const loadProducts = async () => {
        if (typeof db === 'undefined' || !db.isConfigured()) {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Supabase belum dikonfigurasi.</td></tr>';
            return;
        }

        const products = await db.fetchProducts();
        if (!products || products.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Belum ada produk.</td></tr>';
            return;
        }

        tableBody.innerHTML = '';
        products.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${p.image_url}" alt="${p.title}"></td>
                <td><strong>${p.title}</strong></td>
                <td><span class="badge">${p.category_label}</span></td>
                <td>Rp ${p.price.toLocaleString('id-ID')}</td>
                <td><button class="btn-delete" data-id="${p.id}"><i class="fa-solid fa-trash"></i> Hapus</button></td>
            `;
            tableBody.appendChild(tr);
        });

        // Delete handlers
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                if (confirm('Yakin ingin menghapus produk ini?')) {
                    const res = await db.deleteProduct(id);
                    if (res.success) loadProducts(); // Refresh tabel
                }
            });
        });
    };

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

        const title = document.getElementById('p-title').value;
        const price = parseInt(document.getElementById('p-price').value);
        const category = document.getElementById('p-category').value;
        const file = imgInput.files[0];

        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengupload...';
        btn.disabled = true;

        const res = await db.addProduct({ title, category, price, file });

        if (res.success) {
            form.reset();
            imgPreview.style.display = 'none';
            loadProducts(); // Refresh tabel
        }

        btn.innerHTML = originalText;
        btn.disabled = false;
    });

    // Initialize
    checkLogin();
});
