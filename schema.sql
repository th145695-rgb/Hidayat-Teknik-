-- =============================================
-- BESIKRAF MARKETPLACE — SUPABASE DATABASE SCHEMA
-- Jalankan file ini di Supabase SQL Editor
-- =============================================

-- -----------------------------------------------
-- 1. PRODUCTS (katalog produk)
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS products (
    id            SERIAL PRIMARY KEY,
    title         TEXT        NOT NULL,
    category      TEXT        NOT NULL,  -- 'jendela','pintu','klasik','modern'
    category_label TEXT       NOT NULL,
    price         INTEGER     NOT NULL,
    image_url     TEXT,
    is_active     BOOLEAN     DEFAULT true,
    created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Seed data produk awal
INSERT INTO products (title, category, category_label, price, image_url) VALUES
('Minimalist Window Grid',    'jendela', 'Jendela',     1250000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Classic Floral Wrought Iron','klasik', 'Klasik',      2800000, 'assets/images/classic_iron_trellis_1779491907306.png'),
('Geometric Security Door',   'pintu',  'Pintu Utama',  3500000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Modern Vertical Lines',     'modern', 'Modern',       1500000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Victorian Arch Window',     'klasik', 'Klasik',       3100000, 'assets/images/classic_iron_trellis_1779491907306.png'),
('Industrial Mesh Door',      'pintu',  'Pintu Utama',  4200000, 'assets/images/modern_door_trellis_1779491945621.png');

-- -----------------------------------------------
-- 2. ORDERS (pesanan / checkout keranjang)
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name   TEXT,
    customer_phone  TEXT,
    customer_email  TEXT,
    total_price     INTEGER     NOT NULL DEFAULT 0,
    status          TEXT        NOT NULL DEFAULT 'pending', -- 'pending','confirmed','processing','done','cancelled'
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------
-- 3. ORDER ITEMS (item di dalam pesanan)
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
    id             SERIAL      PRIMARY KEY,
    order_id       UUID        NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id     INTEGER     REFERENCES products(id),   -- NULL jika custom
    product_title  TEXT        NOT NULL,
    product_price  INTEGER     NOT NULL,
    quantity       INTEGER     NOT NULL DEFAULT 1,
    is_custom      BOOLEAN     DEFAULT false,
    custom_specs   JSONB,       -- { lebar, tinggi, jenis, warna, motif }
    created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------
-- 4. BOOKINGS (booking survey rumah)
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS bookings (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_code    TEXT        UNIQUE NOT NULL,            -- BK-XXXXXX
    customer_name   TEXT        NOT NULL,
    customer_phone  TEXT        NOT NULL,
    address         TEXT        NOT NULL,
    city            TEXT        NOT NULL,
    survey_area     TEXT        NOT NULL DEFAULT 'semua',   -- jendela/pintu/balkon/semua
    survey_date     DATE        NOT NULL,
    survey_time     TEXT        NOT NULL,                   -- '08:00'
    notes           TEXT,
    status          TEXT        NOT NULL DEFAULT 'pending', -- 'pending','confirmed','done','cancelled'
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------
-- 5. PHOTO REQUESTS (upload foto + rekomendasi)
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS photo_requests (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    area_type       TEXT        NOT NULL,   -- 'jendela','pintu','balkon'
    photo_url       TEXT,                   -- URL file dari Supabase Storage
    photo_filename  TEXT,
    notes           TEXT,
    recommended_ids INTEGER[]   DEFAULT '{}',
    status          TEXT        NOT NULL DEFAULT 'pending', -- 'pending','reviewed'
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------
-- 6. ROW LEVEL SECURITY (RLS)
-- -----------------------------------------------

-- Products: semua bisa baca, admin saja yang bisa insert/update/delete
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_products"  ON products FOR SELECT USING (true);
CREATE POLICY "anon_no_insert"        ON products FOR INSERT TO authenticated WITH CHECK (true);

-- Orders: anonymous bisa INSERT, hanya owner yang bisa SELECT
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert_orders"    ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "public_read_orders"    ON orders FOR SELECT USING (true);

-- Order Items: anonymous bisa INSERT
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert_items"     ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "public_read_items"     ON order_items FOR SELECT USING (true);

-- Bookings: anonymous bisa INSERT dan baca by booking_code
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert_bookings"  ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "public_read_bookings"  ON bookings FOR SELECT USING (true);

-- Photo Requests: anonymous bisa INSERT
ALTER TABLE photo_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert_photos"    ON photo_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "public_read_photos"    ON photo_requests FOR SELECT USING (true);

-- -----------------------------------------------
-- 7. SUPABASE STORAGE BUCKET (untuk foto upload)
-- -----------------------------------------------
-- Jalankan ini di Supabase Storage UI, atau via SQL:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('photo-requests', 'photo-requests', true);

-- Policy storage: anon boleh upload ke bucket photo-requests
-- CREATE POLICY "Allow anon uploads" ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id = 'photo-requests');
-- CREATE POLICY "Allow public read"  ON storage.objects FOR SELECT USING (bucket_id = 'photo-requests');

-- -----------------------------------------------
-- 8. VIEWS (ringkasan untuk admin)
-- -----------------------------------------------
CREATE OR REPLACE VIEW booking_summary AS
    SELECT 
        booking_code,
        customer_name,
        customer_phone,
        city,
        survey_area,
        survey_date,
        survey_time,
        status,
        created_at
    FROM bookings
    ORDER BY created_at DESC;

CREATE OR REPLACE VIEW order_summary AS
    SELECT
        o.id,
        o.customer_name,
        o.customer_phone,
        o.total_price,
        o.status,
        COUNT(oi.id) AS item_count,
        o.created_at
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.id
    GROUP BY o.id
    ORDER BY o.created_at DESC;
