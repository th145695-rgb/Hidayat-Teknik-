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
                <td>
                    <button class="btn-edit" style="background:#f39c12; color:white; border:none; padding:0.5rem; border-radius:6px; cursor:pointer;" data-product='${JSON.stringify(p)}'><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-delete" data-id="${p.id}"><i class="fa-solid fa-trash"></i></button>
                </td>
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

        // Edit handlers
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const product = JSON.parse(e.currentTarget.getAttribute('data-product'));
                
                // Isi form dengan data produk
                document.getElementById('p-id').value = product.id;
                document.getElementById('p-title').value = product.title;
                document.getElementById('p-price').value = product.price;
                document.getElementById('p-category').value = product.category;
                
                // Preview gambar lama
                imgPreview.src = product.image_url;
                imgPreview.style.display = 'block';
                imgInput.removeAttribute('required'); // Foto opsional saat edit

                // Ubah UI Form
                document.querySelector('#add-product-form h3').textContent = 'Edit Produk';
                document.getElementById('btn-submit-product').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Simpan Perubahan';
                document.getElementById('btn-cancel-edit').style.display = 'block';
                
                // Scroll ke atas
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
