document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-product-form');
    const imgInput = document.getElementById('p-image');
    const imgPreview = document.getElementById('image-preview');

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
        }

        btn.innerHTML = originalText;
        btn.disabled = false;
    });
});
