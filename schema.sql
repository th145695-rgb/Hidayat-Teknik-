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

-- Seed data produk lengkap (60 produk unik)
-- ── JENDELA (14 produk)
INSERT INTO products (title, category, category_label, price, image_url) VALUES
('Minimalist Window Grid',         'jendela', 'Jendela',      1250000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Simple Diamond Window',          'jendela', 'Jendela',      950000,  'assets/images/minimalist_window_trellis_1779491829216.png'),
('Slim Vertical Bar Window',       'jendela', 'Jendela',      880000,  'assets/images/minimalist_window_trellis_1779491829216.png'),
('Double Panel Window Grille',     'jendela', 'Jendela',      1450000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Hexagonal Pattern Window',       'jendela', 'Jendela',      1680000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Cross Hatch Security Window',    'jendela', 'Jendela',      1100000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Butterfly Motif Window',         'jendela', 'Jendela',      1950000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Square Grid Standard Window',    'jendela', 'Jendela',      790000,  'assets/images/minimalist_window_trellis_1779491829216.png'),
('Arched Top Window Grille',       'jendela', 'Jendela',      2100000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Diagonal Slash Window',          'jendela', 'Jendela',      1350000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Oval Accent Window Guard',       'jendela', 'Jendela',      1720000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Wide Span Panoramic Grille',     'jendela', 'Jendela',      2350000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Narrow Slit Ventilation Guard',  'jendela', 'Jendela',      680000,  'assets/images/minimalist_window_trellis_1779491829216.png'),
('Bamboo Style Window Grille',     'jendela', 'Jendela',      1580000, 'assets/images/minimalist_window_trellis_1779491829216.png');

-- ── PINTU UTAMA (13 produk)
INSERT INTO products (title, category, category_label, price, image_url) VALUES
('Geometric Security Door',        'pintu',   'Pintu Utama',  3500000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Industrial Mesh Door',           'pintu',   'Pintu Utama',  4200000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Premium Laser Cut Door',         'pintu',   'Pintu Utama',  5500000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Stainless Security Door',        'pintu',   'Pintu Utama',  6200000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Double Wing Entrance Door',      'pintu',   'Pintu Utama',  7800000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Single Panel Solid Door',        'pintu',   'Pintu Utama',  2950000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Glass Insert Security Door',     'pintu',   'Pintu Utama',  4750000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Pivot Style Iron Door',          'pintu',   'Pintu Utama',  8900000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Folding Gate Security Door',     'pintu',   'Pintu Utama',  5100000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Arch Top Grand Entrance Door',   'pintu',   'Pintu Utama',  9500000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Hollow Galvanis Entry Door',     'pintu',   'Pintu Utama',  2750000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Sliding Barn Style Iron Door',   'pintu',   'Pintu Utama',  6700000, 'assets/images/modern_door_trellis_1779491945621.png'),
('French Double Leaf Door',        'pintu',   'Pintu Utama',  7200000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Compact Apartment Door',         'pintu',   'Pintu Utama',  3150000, 'assets/images/modern_door_trellis_1779491945621.png');

-- ── KLASIK (17 produk)
INSERT INTO products (title, category, category_label, price, image_url) VALUES
('Classic Floral Wrought Iron',    'klasik',  'Klasik',       2800000, 'assets/images/classic_iron_trellis_1779491907306.png'),
('Victorian Arch Window',          'klasik',  'Klasik',       3100000, 'assets/images/classic_iron_trellis_1779491907306.png'),
('European Style Window Grid',     'klasik',  'Klasik',       1850000, 'assets/images/classic_iron_trellis_1779491907306.png'),
('Ornate Wrought Iron Gate',       'klasik',  'Klasik',       8500000, 'assets/images/classic_iron_trellis_1779491907306.png'),
('Elegant French Window',          'klasik',  'Klasik',       2400000, 'assets/images/classic_iron_trellis_1779491907306.png'),
('Baroque Scroll Terali',          'klasik',  'Klasik',       4500000, 'assets/images/classic_iron_trellis_1779491907306.png'),
('Antique Medallion Door',         'klasik',  'Klasik',       6800000, 'assets/images/classic_iron_trellis_1779491907306.png'),
('Renaissance Leaf Pattern',       'klasik',  'Klasik',       3750000, 'assets/images/classic_iron_trellis_1779491907306.png'),
('Colonial Spear Top Fence',       'klasik',  'Klasik',       5200000, 'assets/images/classic_iron_trellis_1779491907306.png'),
('Lotus Bloom Window Guard',       'klasik',  'Klasik',       2950000, 'assets/images/classic_iron_trellis_1779491907306.png'),
('Heritage Oval Motif Grille',     'klasik',  'Klasik',       3400000, 'assets/images/classic_iron_trellis_1779491907306.png'),
('Majestic Crown Gate',            'klasik',  'Klasik',       9800000, 'assets/images/classic_iron_trellis_1779491907306.png'),
('Acanthus Leaf Balustrade',       'klasik',  'Klasik',       4100000, 'assets/images/classic_iron_trellis_1779491907306.png'),
('Neo-Classical Pillar Grille',    'klasik',  'Klasik',       5700000, 'assets/images/classic_iron_trellis_1779491907306.png'),
('Javanese Batik Iron Screen',     'klasik',  'Klasik',       4300000, 'assets/images/classic_iron_trellis_1779491907306.png'),
('Mediterranean Wave Door',        'klasik',  'Klasik',       6100000, 'assets/images/classic_iron_trellis_1779491907306.png');

-- ── MODERN (17 produk)
INSERT INTO products (title, category, category_label, price, image_url) VALUES
('Modern Vertical Lines',          'modern',  'Modern',       1500000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Industrial Expanded Metal',      'modern',  'Modern',       4800000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Modern Horizontal Slat',         'modern',  'Modern',       3200000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Geometric Balcony Guard',        'modern',  'Modern',       1750000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Matte Black Flat Bar Gate',      'modern',  'Modern',       3800000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Steel Cable & Rod Screen',       'modern',  'Modern',       5300000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Perforated Sheet Facade',        'modern',  'Modern',       2800000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Angular Z-Bar Window Guard',     'modern',  'Modern',       1920000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Louvered Iron Privacy Panel',    'modern',  'Modern',       4100000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Floating Frame Terali',          'modern',  'Modern',       3550000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Zigzag Pattern Grille',          'modern',  'Modern',       2150000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Stacked Box Modular Gate',       'modern',  'Modern',       4600000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Wave Motion Balcony Rail',       'modern',  'Modern',       2700000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Honeycomb Steel Panel',          'modern',  'Modern',       3900000, 'assets/images/modern_door_trellis_1779491945621.png'),
('Retro Grid Iron Screen',         'modern',  'Modern',       2450000, 'assets/images/minimalist_window_trellis_1779491829216.png'),
('Avant-Garde Sculptural Gate',    'modern',  'Modern',       7500000, 'assets/images/modern_door_trellis_1779491945621.png');

-- -----------------------------------------------
-- 2. ORDERS (pesanan / checkout keranjang)
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number  TEXT        UNIQUE,                               -- INV-HT-XXXX
    customer_name   TEXT,
    customer_phone  TEXT,
    customer_email  TEXT,
    total_price     INTEGER     NOT NULL DEFAULT 0,
    status          TEXT        NOT NULL DEFAULT 'confirmed',
    -- Status values: 'confirmed' | 'fabrication' | 'finishing' | 'installation' | 'done' | 'cancelled'
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Tambahkan kolom jika tabel sudah ada (jalankan jika upgrade dari versi lama):
-- ALTER TABLE orders ADD COLUMN IF NOT EXISTS invoice_number TEXT UNIQUE;

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
CREATE POLICY "anon_update_orders"    ON orders FOR UPDATE USING (true) WITH CHECK (true);

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
        o.invoice_number,
        o.customer_name,
        o.customer_phone,
        o.total_price,
        o.status,
        o.notes,
        COUNT(oi.id) AS item_count,
        o.created_at
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.id
    GROUP BY o.id
    ORDER BY o.created_at DESC;

-- -----------------------------------------------
-- 9. PROMOS (Vouchers for Shopee-like checkout)
-- -----------------------------------------------
CREATE TABLE promos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'discount', 'freebie'
    value NUMERIC(10, 2) DEFAULT 0, -- e.g., 0.1 for 10%
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Default Promos
INSERT INTO promos (code, title, type, value, is_active) VALUES
('DISKON10', 'Diskon 10% Semua Terali', 'discount', 0.10, true),
('GRATISSURVEY', 'Gratis Biaya Survey & Ukur', 'freebie', 0, true),
('CATPREMIUM', 'Upgrade Cat Anti-Karat Premium', 'freebie', 0, true);

ALTER TABLE promos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_promos" ON promos FOR SELECT USING (true);
CREATE POLICY "anon_update_promos" ON promos FOR UPDATE USING (true) WITH CHECK (true);
