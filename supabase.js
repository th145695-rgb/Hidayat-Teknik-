// =============================================
// BESIKRAF — SUPABASE CLIENT & DATABASE LOGIC
// =============================================
// LANGKAH SETUP:
// 1. Buat akun di https://supabase.com
// 2. Buat project baru
// 3. Pergi ke Project Settings → API
// 4. Copy "Project URL" dan "anon public" key
// 5. Ganti nilai SUPABASE_URL dan SUPABASE_ANON_KEY di bawah
// 6. Jalankan file schema.sql di Supabase SQL Editor
// 7. Buat Storage bucket bernama "photo-requests" (public)
// =============================================

const SUPABASE_URL      = 'https://vfixakgedbjnceedshzd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmaXhha2dlZGJqbmNlZWRzaHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0NzY3NzgsImV4cCI6MjA5NTA1Mjc3OH0.qHkRXvpt7DGcNy6aeKaN5IUHVeUcRKav1ZFAdK3BGvQ';

// Inisialisasi client (menggunakan Supabase CDN)
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =============================================
// Toast Notification (shared UI helper)
// =============================================
const showToast = (message, type = 'success') => {
    const existing = document.getElementById('bk-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'bk-toast';
    const colors = { success: '#2ecc71', error: '#e74c3c', info: '#3498db', loading: '#d4af37' };
    const icons  = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info', loading: 'fa-spinner fa-spin' };
    toast.innerHTML = `<i class="fa-solid ${icons[type]}"></i> ${message}`;
    Object.assign(toast.style, {
        position: 'fixed', bottom: '2rem', right: '2rem', zIndex: '9999',
        background: 'rgba(15,16,20,0.95)', border: `1px solid ${colors[type]}`,
        color: colors[type], padding: '1rem 1.5rem', borderRadius: '12px',
        fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: '500',
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        boxShadow: `0 8px 24px rgba(0,0,0,0.4)`,
        animation: 'slideInToast 0.3s ease', maxWidth: '380px'
    });
    // Add animation keyframe
    if (!document.getElementById('toast-style')) {
        const style = document.createElement('style');
        style.id = 'toast-style';
        style.textContent = `@keyframes slideInToast { from { transform: translateY(20px); opacity:0; } to { transform: translateY(0); opacity:1; } }`;
        document.head.appendChild(style);
    }
    document.body.appendChild(toast);
    if (type !== 'loading') setTimeout(() => toast.remove(), 4000);
    return toast;
};

// =============================================
// DATABASE OPERATIONS
// =============================================
const db = {

    // ------------------------------------------
    // BOOKING: Simpan booking survey
    // ------------------------------------------
    saveBooking: async ({ bookingCode, name, phone, address, city, area, date, time, notes }) => {
        const toast = showToast('Menyimpan booking...', 'loading');
        try {
            const { data, error } = await supabaseClient
                .from('bookings')
                .insert([{
                    booking_code:   bookingCode,
                    customer_name:  name,
                    customer_phone: phone,
                    address:        address,
                    city:           city,
                    survey_area:    area,
                    survey_date:    date,
                    survey_time:    time,
                    notes:          notes || null,
                    status:         'pending'
                }])
                .select()
                .single();

            toast.remove();
            if (error) throw error;

            showToast(`Booking ${bookingCode} berhasil disimpan!`, 'success');
            console.log('[DB] Booking saved:', data);
            return { success: true, data };
        } catch (err) {
            toast.remove();
            showToast('Gagal menyimpan booking. Coba lagi.', 'error');
            console.error('[DB] Booking error:', err.message);
            return { success: false, error: err.message };
        }
    },

    // ------------------------------------------
    // PHOTO REQUEST: Simpan permintaan rekomendasi
    // ------------------------------------------
    savePhotoRequest: async ({ areaType, file, notes, recommendedIds, silent = false }) => {
        const toast = silent ? null : showToast('Mengunggah foto...', 'loading');
        try {
            let photoUrl = null;

            // Upload foto ke Supabase Storage jika ada file
            if (file) {
                const ext      = file.name.split('.').pop();
                const filename = `${Date.now()}_${areaType}.${ext}`;
                const { data: storageData, error: storageError } = await supabaseClient
                    .storage
                    .from('photo-requests')
                    .upload(filename, file, { cacheControl: '3600', upsert: false });

                if (storageError) {
                    console.warn('[DB] Storage upload failed, saving without photo URL:', storageError.message);
                } else {
                    const { data: urlData } = supabaseClient.storage
                        .from('photo-requests')
                        .getPublicUrl(storageData.path);
                    photoUrl = urlData.publicUrl;
                }
            }

            // Simpan metadata ke tabel photo_requests
            const { data, error } = await supabaseClient
                .from('photo_requests')
                .insert([{
                    area_type:        areaType,
                    photo_url:        photoUrl,
                    photo_filename:   file ? file.name : null,
                    notes:            notes || null,
                    recommended_ids:  recommendedIds || [],
                    status:           'pending'
                }])
                .select()
                .single();

            if (toast) toast.remove();
            if (error) throw error;

            if (!silent) showToast('Permintaan rekomendasi berhasil dikirim!', 'success');
            console.log('[DB] Photo request saved:', data);
            return { success: true, data };
        } catch (err) {
            if (toast) toast.remove();
            if (!silent) showToast('Gagal mengirim permintaan. Coba lagi.', 'error');
            console.error('[DB] Photo request error:', err.message);
            return { success: false, error: err.message };
        }
    },

    // ------------------------------------------
    // ORDER: Simpan pesanan ke keranjang / checkout
    // ------------------------------------------
    saveOrder: async (cartItems, customerInfo = {}) => {
        const toast = showToast('Memproses pesanan...', 'loading');
        try {
            const totalPrice = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
            // Generate nomor invoice unik: INV-HT-XXXX
            const invoiceNumber = 'INV-HT-' + Math.floor(1000 + Math.random() * 9000);

            // 1. Buat record order
            const { data: order, error: orderError } = await supabaseClient
                .from('orders')
                .insert([{
                    invoice_number: invoiceNumber,
                    customer_name:  customerInfo.name  || 'Guest',
                    customer_phone: customerInfo.phone || null,
                    customer_email: customerInfo.email || null,
                    total_price:    totalPrice,
                    status:         'confirmed'
                }])
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Buat order_items
            const items = cartItems.map(item => ({
                order_id:       order.id,
                product_id:     typeof item.id === 'number' ? item.id : null,
                product_title:  item.title,
                product_price:  item.price,
                quantity:       item.quantity,
                is_custom:      item.category === 'custom',
                custom_specs:   item.category === 'custom' ? {
                    title: item.title,
                    price: item.price
                } : null
            }));

            const { error: itemsError } = await supabaseClient
                .from('order_items')
                .insert(items);

            if (itemsError) throw itemsError;

            toast.remove();
            showToast(`Pesanan ${invoiceNumber} berhasil dibuat!`, 'success');
            console.log('[DB] Order saved:', order.id, invoiceNumber);
            return { success: true, orderId: order.id, invoiceNumber };
        } catch (err) {
            toast.remove();
            showToast('Gagal menyimpan pesanan. Coba lagi.', 'error');
            console.error('[DB] Order error:', err.message);
            return { success: false, error: err.message };
        }
    },

    // ------------------------------------------
    // ORDER: Cari pesanan by invoice atau no. HP
    // ------------------------------------------
    fetchOrder: async (query) => {
        try {
            const isPhone = /^08|^628/.test(query) || /^\d{9,13}$/.test(query);
            let orderQuery = supabaseClient
                .from('orders')
                .select(`
                    id, invoice_number, customer_name, customer_phone,
                    total_price, status, notes, created_at,
                    order_items ( product_title, product_price, quantity )
                `);

            if (isPhone) {
                orderQuery = orderQuery.ilike('customer_phone', `%${query}%`);
            } else {
                orderQuery = orderQuery.ilike('invoice_number', `%${query.toUpperCase()}%`);
            }

            const { data, error } = await orderQuery.order('created_at', { ascending: false }).limit(1).single();
            if (error) throw error;
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    },

    // ------------------------------------------
    // ORDER: Update status pesanan (Admin)
    // ------------------------------------------
    updateOrderStatus: async (orderId, newStatus, notes = null) => {
        const toast = showToast('Memperbarui status...', 'loading');
        try {
            const payload = {};
            if (newStatus !== null) payload.status = newStatus;
            if (notes !== null) payload.notes = notes;

            const { error } = await supabaseClient
                .from('orders')
                .update(payload)
                .eq('id', orderId);

            toast.remove();
            if (error) throw error;
            showToast('Status pesanan berhasil diperbarui!', 'success');
            return { success: true };
        } catch (err) {
            toast.remove();
            showToast('Gagal update status: ' + err.message, 'error');
            console.error('[DB] Update order status error:', err.message);
            return { success: false, error: err.message };
        }
    },

    // ------------------------------------------
    // ORDER: Ambil semua pesanan (Admin)
    // ------------------------------------------
    fetchAllOrders: async () => {
        try {
            const { data, error } = await supabaseClient
                .from('orders')
                .select(`
                    id, invoice_number, customer_name, customer_phone,
                    total_price, status, notes, created_at,
                    order_items ( product_title, quantity )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return { success: true, data };
        } catch (err) {
            console.error('[DB] Fetch all orders error:', err.message);
            return { success: false, data: [] };
        }
    },

    // ------------------------------------------
    // AUTHENTICATION
    // ------------------------------------------
    login: async (email, password) => {
        const toast = showToast('Proses login...', 'loading');
        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
            toast.remove();
            if (error) throw error;
            showToast('Login berhasil!', 'success');
            return { success: true, user: data.user };
        } catch (err) {
            toast.remove();
            console.error('[Auth] Login error:', err.message);
            return { success: false, error: err.message };
        }
    },

    getSession: async () => {
        const { data: { session } } = await supabaseClient.auth.getSession();
        return session;
    },

    // ------------------------------------------
    // PRODUCTS: Tambah / Edit Produk (Admin)
    // ------------------------------------------
    upsertProduct: async ({ id, title, category, price, file, oldImageUrl }) => {
        const toast = showToast('Menyimpan produk...', 'loading');
        try {
            let imageUrl = oldImageUrl;
            if (file) {
                const ext = file.name.split('.').pop();
                const filename = `product_${Date.now()}.${ext}`;
                const { data: storageData, error: storageError } = await supabaseClient
                    .storage
                    .from('product-images')
                    .upload(filename, file, { cacheControl: '3600', upsert: false });

                if (storageError) throw storageError;
                
                const { data: urlData } = supabaseClient.storage.from('product-images').getPublicUrl(storageData.path);
                imageUrl = urlData.publicUrl;
            }

            const categoryLabels = {
                'jendela': 'Jendela',
                'pintu': 'Pintu Utama',
                'klasik': 'Klasik',
                'modern': 'Modern'
            };

            const payload = {
                title: title,
                category: category,
                category_label: categoryLabels[category] || 'Lainnya',
                price: price,
                image_url: imageUrl || 'assets/images/minimalist_window_trellis_1779491829216.png',
                is_active: true
            };

            let res;
            if (id) {
                res = await supabaseClient.from('products').update(payload).eq('id', id);
            } else {
                res = await supabaseClient.from('products').insert([payload]);
            }

            toast.remove();
            if (res.error) throw res.error;
            showToast(id ? 'Produk berhasil diupdate!' : 'Produk berhasil ditambahkan!', 'success');
            return { success: true };
        } catch (err) {
            toast.remove();
            showToast('Gagal menyimpan produk: ' + err.message, 'error');
            console.error('[DB] Upsert product error:', err.message);
            return { success: false, error: err.message };
        }
    },

    // ------------------------------------------
    // PRODUCTS: Ambil produk dari database
    // ------------------------------------------
    fetchProducts: async () => {
        try {
            const { data, error } = await supabaseClient
                .from('products')
                .select('*')
                .eq('is_active', true)
                .order('id', { ascending: true });

            if (error) throw error;
            return data;
        } catch (err) {
            console.error('[DB] Fetch products error:', err.message);
            return null; // fallback ke data statis di script.js
        }
    },

    // ------------------------------------------
    // PRODUCTS: Hapus Produk (Admin)
    // ------------------------------------------
    deleteProduct: async (id) => {
        const toast = showToast('Menghapus produk...', 'loading');
        try {
            const { error } = await supabaseClient
                .from('products')
                .delete()
                .eq('id', id);

            toast.remove();
            if (error) throw error;
            showToast('Produk berhasil dihapus!', 'success');
            return { success: true };
        } catch (err) {
            toast.remove();
            showToast('Gagal menghapus produk.', 'error');
            console.error('[DB] Delete product error:', err.message);
            return { success: false, error: err.message };
        }
    },

    // ------------------------------------------
    // BOOKING: Cek status booking by kode
    // ------------------------------------------
    checkBooking: async (bookingCode) => {
        try {
            const { data, error } = await supabaseClient
                .from('bookings')
                .select('*')
                .eq('booking_code', bookingCode)
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    },

    // ------------------------------------------
    // Cek apakah Supabase sudah dikonfigurasi
    // ------------------------------------------
    isConfigured: () => {
        return !SUPABASE_URL.includes('YOUR_PROJECT_ID') && !SUPABASE_ANON_KEY.includes('YOUR_ANON');
    },

    // ------------------------------------------
    // PROMOS: Ambil voucher aktif
    // ------------------------------------------
    fetchActivePromos: async () => {
        try {
            const { data, error } = await supabaseClient
                .from('promos')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data || [];
        } catch (err) {
            console.error('[DB] fetchActivePromos error:', err.message);
            return [];
        }
    },

    // ------------------------------------------
    // PRODUCTION UPDATES: Progres foto bengkel
    // ------------------------------------------
    fetchProductionUpdates: async (orderId) => {
        try {
            const { data, error } = await supabaseClient
                .from('production_updates')
                .select('*')
                .eq('order_id', orderId)
                .order('created_at', { ascending: true });
            if (error) throw error;
            return { success: true, data: data || [] };
        } catch (err) {
            return { success: false, data: [], error: err.message };
        }
    },

    addProductionUpdate: async (orderId, stage, caption, photoFile) => {
        try {
            let photoUrl = '';
            if (photoFile) {
                const ext = photoFile.name.split('.').pop();
                const filename = `progress_${orderId}_${Date.now()}.${ext}`;
                const { data: storageData, error: storageError } = await supabaseClient
                    .storage.from('production-photos')
                    .upload(filename, photoFile, { cacheControl: '3600', upsert: false });
                if (storageError) throw storageError;
                const { data: urlData } = supabaseClient.storage
                    .from('production-photos').getPublicUrl(storageData.path);
                photoUrl = urlData.publicUrl;
            }
            const { data, error } = await supabaseClient
                .from('production_updates')
                .insert([{ order_id: orderId, stage, caption, photo_url: photoUrl }])
                .select().single();
            if (error) throw error;
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    },

    deleteProductionUpdate: async (updateId) => {
        try {
            const { error } = await supabaseClient
                .from('production_updates').delete().eq('id', updateId);
            if (error) throw error;
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }
};

// Warn di console jika belum dikonfigurasi
if (!db.isConfigured()) {
    console.warn('[BesiKraf] ⚠️ Supabase belum dikonfigurasi! Edit SUPABASE_URL dan SUPABASE_ANON_KEY di supabase.js');
}
