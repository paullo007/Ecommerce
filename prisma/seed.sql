-- =============================================================================
-- Maison Avant-Garde — Database Seed
-- Generated from prisma/seed.ts
-- PostgreSQL compatible (uses gen_random_uuid()::text for cuid-style IDs)
-- =============================================================================

-- ─── CLEAR EXISTING DATA ────────────────────────────────────────────────────
DELETE FROM "ProductImage";
DELETE FROM "ProductVariant";
DELETE FROM "CartItem";
DELETE FROM "OrderItem";
DELETE FROM "Review";
DELETE FROM "WishlistItem";
DELETE FROM "ServiceBooking";
DELETE FROM "Product";
DELETE FROM "Subcategory";
DELETE FROM "Category";
DELETE FROM "Service";

-- ─── CATEGORIES (14) ────────────────────────────────────────────────────────

INSERT INTO "Category" ("id", "name", "slug", "description", "icon", "featured", "sortOrder", "createdAt")
VALUES
  (gen_random_uuid()::text, 'Furniture', 'furniture', 'Sofas, chairs, tables, beds and storage.', '🛋️', true, 1, NOW()),
  (gen_random_uuid()::text, 'Lighting', 'lighting', 'Pendants, floor lamps, sconces and chandeliers.', '💡', true, 2, NOW()),
  (gen_random_uuid()::text, 'Wall Art & Decor', 'wall-art-decor', 'Prints, mirrors, panels and wall sculptures.', '🖼️', true, 3, NOW()),
  (gen_random_uuid()::text, 'Textiles & Soft Furnishings', 'textiles', 'Rugs, curtains, cushions, throws and bedding.', '🧶', true, 4, NOW()),
  (gen_random_uuid()::text, 'Kitchen & Dining', 'kitchen-dining', 'Tableware, cookware and kitchen decor.', '🍽️', false, 5, NOW()),
  (gen_random_uuid()::text, 'Bathroom', 'bathroom', 'Fixtures, accessories and bath textiles.', '🚿', false, 6, NOW()),
  (gen_random_uuid()::text, 'Outdoor Living', 'outdoor-living', 'Patio furniture, planters and garden decor.', '🌿', true, 7, NOW()),
  (gen_random_uuid()::text, 'Storage & Organisation', 'storage-organisation', 'Shelving, baskets and organisers.', '📦', false, 8, NOW()),
  (gen_random_uuid()::text, 'Plants & Botanicals', 'plants-botanicals', 'Planters, terrariums and botanical decor.', '🌱', false, 9, NOW()),
  (gen_random_uuid()::text, 'Art & Sculptures', 'art-sculptures', 'Sculptures, ceramics and art objects.', '🗿', false, 10, NOW()),
  (gen_random_uuid()::text, 'Flooring & Tiles', 'flooring-tiles', 'Hardwood, tiles, luxury vinyl and carpet.', '🏠', false, 11, NOW()),
  (gen_random_uuid()::text, 'Smart Home', 'smart-home', 'Smart lighting, thermostats and automation.', '📱', false, 12, NOW()),
  (gen_random_uuid()::text, 'Paint & Wallcoverings', 'paint-wallcoverings', 'Premium paints, wallpapers and specialty finishes.', '🎨', false, 13, NOW()),
  (gen_random_uuid()::text, 'Architectural Elements', 'architectural-elements', 'Doors, trim, fireplace surrounds and moulding.', '🏛️', false, 14, NOW());

-- ─── PRODUCTS (27) ──────────────────────────────────────────────────────────

-- FURNITURE (5)

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Arc Modular Sofa — Terracotta', 'arc-modular-sofa-terracotta',
  'The Arc Modular Sofa redefines living room comfort through bold geometry and artisan craft. Its sweeping curved form is upholstered in premium Italian bouclé with solid walnut legs that ground the design. Fully modular — build the configuration your space demands.',
  'A sculptural modular sofa in warm bouclé. Configure it your way.',
  3200, 3900, 8, true, true, false, true,
  'Bouclé fabric, solid walnut legs', 'W280 × D95 × H75 cm', 'Italy',
  ARRAY['sofa', 'modular', 'living room', 'minimal'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'furniture'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', 'Arc Modular Sofa — Terracotta', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'arc-modular-sofa-terracotta')),
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80', 'Arc Modular Sofa — Terracotta', false, 1, (SELECT "id" FROM "Product" WHERE "slug" = 'arc-modular-sofa-terracotta'));

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Slab Dining Table — White Marble', 'slab-dining-table-marble',
  'The Slab Dining Table is a statement of restraint and luxury. Each top is cut from a single slab of Carrara marble, showcasing natural veining unique to each piece. The blackened steel hairpin base provides structural contrast.',
  'A single slab of Carrara marble on a minimal blackened steel frame.',
  4800, NULL, 5, true, false, true, true,
  'Carrara marble, blackened steel base', 'W220 × D95 × H75 cm', 'Portugal',
  ARRAY['dining table', 'marble', 'dining room'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'furniture'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1617104678098-de229db51175?w=800&q=80', 'Slab Dining Table — White Marble', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'slab-dining-table-marble')),
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=800&q=80', 'Slab Dining Table — White Marble', false, 1, (SELECT "id" FROM "Product" WHERE "slug" = 'slab-dining-table-marble'));

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Void Lounge Chair — Charcoal', 'void-lounge-chair-charcoal',
  'The Void Lounge Chair draws from Scandinavian design tradition while pushing into contemporary avant-garde territory. Its curved shell is upholstered in a dense wool blend, supported by a precision powder-coated steel frame.',
  'A sculptural lounge chair inspired by the geometry of negative space.',
  1450, 1750, 12, true, false, true, true,
  'Wool blend, powder-coated steel', 'W70 × D80 × H85 cm', 'Denmark',
  ARRAY['chair', 'lounge', 'living room', 'scandinavian'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'furniture'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=800&q=80', 'Void Lounge Chair — Charcoal', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'void-lounge-chair-charcoal'));

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Form Bed Frame — Smoked Oak', 'form-bed-frame-smoked-oak',
  'The Form Bed Frame embodies the Japanese principle of ma — the beauty of empty space. Its low profile and clean slab construction in smoked solid oak creates a serene foundation for sleep.',
  'A low-profile bed frame in smoked solid oak. Simple. Permanent.',
  2200, NULL, 6, false, true, false, true,
  'Smoked solid oak', 'W180 × D210 × H90 cm (King)', 'Japan',
  ARRAY['bed', 'bedroom', 'oak', 'japanese', 'minimal'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'furniture'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&q=80', 'Form Bed Frame — Smoked Oak', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'form-bed-frame-smoked-oak'));

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Column Bookshelf — Brass & Black', 'column-bookshelf-brass-black',
  'The Column Bookshelf bridges industrial rigour with refined materiality. Matte-black powder-coated steel uprights connect through polished brass fittings to create a display piece as beautiful as what it holds.',
  'Architectural shelving with brass accent joints.',
  980, NULL, 15, false, false, true, true,
  'Powder-coated steel, brass accents', 'W80 × D35 × H200 cm', 'Germany',
  ARRAY['bookshelf', 'storage', 'living room', 'study'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'furniture'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&q=80', 'Column Bookshelf — Brass & Black', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'column-bookshelf-brass-black'));

-- LIGHTING (4)

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Orbit Pendant — Brushed Brass', 'orbit-pendant-brushed-brass',
  'The Orbit Pendant is designed around the tension between transparency and mass. Each globe is individually hand-blown, creating subtle variations in glass texture that catch and diffuse light beautifully.',
  'A hand-blown glass globe suspended in brushed brass armature.',
  680, NULL, 20, true, true, false, true,
  'Brushed brass, hand-blown glass', 'Ø40 cm, drop adjustable to 150 cm', 'Sweden',
  ARRAY['pendant', 'lighting', 'dining', 'brass', 'glass'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'lighting'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800&q=80', 'Orbit Pendant — Brushed Brass', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'orbit-pendant-brushed-brass'));

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Mono Floor Lamp — Matte Black', 'mono-floor-lamp-matte-black',
  'The Mono Floor Lamp strips lighting down to its essential geometry. A single matte-black stem rises to a pivoting linen shade, allowing precise directional light. The weighted concrete base ensures stability.',
  'An architectural floor lamp with a pivoting linen shade.',
  420, 520, 18, true, false, true, true,
  'Powder-coated steel, linen shade', 'Base Ø30 cm, height 155 cm', 'Netherlands',
  ARRAY['floor lamp', 'lighting', 'living room', 'minimal'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'lighting'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80', 'Mono Floor Lamp — Matte Black', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'mono-floor-lamp-matte-black'));

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Grid Wall Sconce — Antique Brass', 'grid-wall-sconce-antique-brass',
  'The Grid Wall Sconce projects intricate geometric light patterns across walls and ceilings, transforming any surface into living texture. The frosted glass diffuses the light source while the antique brass cage creates the pattern.',
  'A geometric wall sconce that casts dramatic shadow patterns.',
  310, NULL, 25, false, true, false, true,
  'Antique brass, frosted glass', 'W15 × D20 × H25 cm', 'France',
  ARRAY['sconce', 'wall light', 'bedroom', 'brass'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'lighting'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=80', 'Grid Wall Sconce — Antique Brass', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'grid-wall-sconce-antique-brass'));

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Cascade Chandelier — Smoked Glass', 'cascade-chandelier-smoked-glass',
  'The Cascade Chandelier arranges twelve individually hand-blown smoked glass spheres on satin nickel stems at varying heights, creating a dramatic focal point for dining rooms and entryways.',
  'A cascading arrangement of smoked glass spheres.',
  1850, 2200, 4, true, false, false, true,
  'Smoked hand-blown glass, satin nickel', 'Ø65 cm, drop 80–180 cm', 'Czech Republic',
  ARRAY['chandelier', 'dining', 'statement', 'glass'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'lighting'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Cascade Chandelier — Smoked Glass', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'cascade-chandelier-smoked-glass'));

-- WALL ART & DECOR (3)

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Abstract Composition No. 7', 'abstract-composition-no-7',
  'Abstract Composition No. 7 is an original painting by Barcelona-based artist Clara Montserrat. Layered earth pigments and raw linen create a surface that shifts with the light throughout the day. Each piece is unique.',
  'Original oil painting — warm earth tones on linen.',
  1200, NULL, 3, true, true, false, true,
  'Oil on linen, natural wood frame', '100 × 140 cm', 'Spain',
  ARRAY['art', 'painting', 'original', 'abstract'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'wall-art-decor'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80', 'Abstract Composition No. 7', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'abstract-composition-no-7'));

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Arch Mirror — Antiqued Bronze', 'arch-mirror-antiqued-bronze',
  'Modelled on classical European arch forms, this mirror combines antiqued bronze casting with hand-bevelled glass. It stands as both functional dressing mirror and wall sculpture.',
  'A full-length arch mirror with an antiqued bronze frame.',
  890, 1050, 10, true, false, true, true,
  'Antiqued bronze frame, bevelled glass', 'W60 × H140 cm', 'Italy',
  ARRAY['mirror', 'entryway', 'bedroom', 'arch'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'wall-art-decor'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', 'Arch Mirror — Antiqued Bronze', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'arch-mirror-antiqued-bronze'));

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Woven Wall Panel — Natural Jute', 'woven-wall-panel-natural-jute',
  'Hand-woven by artisans in Marrakech using traditional techniques, this jute wall panel brings warmth and organic texture to any room. No two pieces are identical.',
  'A handwoven jute wall panel with organic texture.',
  340, NULL, 14, false, true, false, true,
  'Natural jute, cotton warp', 'W80 × H120 cm', 'Morocco',
  ARRAY['wall art', 'textile', 'woven', 'natural'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'wall-art-decor'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', 'Woven Wall Panel — Natural Jute', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'woven-wall-panel-natural-jute'));

-- TEXTILES (3)

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Stone Linen Duvet Cover — King', 'stone-linen-duvet-cover-king',
  'Grown and woven in Normandy, France, this linen becomes softer with each wash. The stonewash process gives it a relaxed, lived-in texture that improves over time. OEKO-TEX certified.',
  'Stonewashed French linen. Pre-washed for softness from day one.',
  280, NULL, 30, false, false, true, true,
  '100% stonewashed French linen', 'W230 × H220 cm', 'France',
  ARRAY['bedding', 'linen', 'bedroom', 'sleep'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'textiles'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80', 'Stone Linen Duvet Cover — King', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'stone-linen-duvet-cover-king'));

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Geometric Wool Rug — 200×300 cm', 'geometric-wool-rug-200x300',
  'Each rug is hand-knotted by master weavers in Kathmandu using New Zealand wool yarn dyed with low-impact dyes. The bold geometric pattern draws from Berber and Bauhaus traditions.',
  'Hand-knotted geometric rug in a muted avant-garde palette.',
  960, 1150, 7, true, true, false, true,
  'Hand-knotted New Zealand wool', '200 × 300 cm', 'Nepal',
  ARRAY['rug', 'living room', 'bedroom', 'geometric', 'wool'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'textiles'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', 'Geometric Wool Rug — 200×300 cm', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'geometric-wool-rug-200x300'));

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Chunky Knit Throw — Ivory', 'chunky-knit-throw-ivory',
  'Knitted on heritage looms in the Scottish Borders, this throw wraps you in substantial warmth without weight. The open-weave pattern allows it to drape naturally across sofas and beds.',
  'A generously oversized chunky-knit throw in ivory merino.',
  195, NULL, 40, false, false, true, true,
  'Merino wool blend', 'W130 × H170 cm', 'Scotland',
  ARRAY['throw', 'bedroom', 'sofa', 'cosy', 'wool'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'textiles'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1540638349517-3abd5afc5847?w=800&q=80', 'Chunky Knit Throw — Ivory', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'chunky-knit-throw-ivory'));

-- KITCHEN & DINING (2)

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Matte Black Dinnerware Set — 12pc', 'matte-black-dinnerware-set-12pc',
  'Each piece in this 12-piece set is individually kiln-fired using a reactive glaze technique, producing unique surface variations of deep matte black. Includes 4 dinner plates, 4 bowls, 4 side plates.',
  'Reactive-glaze stoneware with a subtle matte-black finish.',
  340, NULL, 20, false, true, false, true,
  'Stoneware with matte black reactive glaze', 'Dinner plate Ø27 cm', 'Japan',
  ARRAY['dinnerware', 'kitchen', 'dining', 'stoneware', 'black'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'kitchen-dining'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', 'Matte Black Dinnerware Set — 12pc', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'matte-black-dinnerware-set-12pc'));

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Hammered Brass Candle Holders — Set of 3', 'hammered-brass-candle-holders-set-3',
  'Crafted by artisans using traditional hammering techniques, these three brass candle holders create a dynamic table centrepiece. The hammered surface catches candlelight and creates a warm ambient glow.',
  'Hand-hammered solid brass candle holders in three heights.',
  145, 175, 35, false, false, true, true,
  'Hand-hammered solid brass', 'Heights: 8, 14, 20 cm', 'India',
  ARRAY['candle holders', 'dining', 'brass', 'decor'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'kitchen-dining'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80', 'Hammered Brass Candle Holders — Set of 3', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'hammered-brass-candle-holders-set-3'));

-- OUTDOOR LIVING (2)

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Teak Lounge Chair — Outdoor', 'teak-lounge-chair-outdoor',
  'Crafted from sustainably sourced FSC-certified teak, this lounger develops a beautiful silver-grey patina over time or can be oiled to maintain its golden warmth. The cushion uses Sunbrella fabric for UV and mildew resistance.',
  'FSC-certified teak lounger with Sunbrella cushions.',
  1100, NULL, 9, true, false, false, true,
  'FSC-certified teak, Sunbrella cushion', 'W70 × D150 × H85 cm', 'Indonesia',
  ARRAY['outdoor', 'lounge chair', 'teak', 'garden', 'patio'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'outdoor-living'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Teak Lounge Chair — Outdoor', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'teak-lounge-chair-outdoor'));

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Terrazzo Plant Pot — Large', 'terrazzo-plant-pot-large',
  'Each pot is individually hand-cast in Lisbon using a blend of marble aggregate and white Portland cement. Drainage hole included. Suitable for indoor and outdoor use.',
  'Hand-cast terrazzo pot with visible stone aggregate.',
  185, NULL, 22, false, true, false, true,
  'Hand-cast terrazzo', 'Ø45 × H50 cm', 'Portugal',
  ARRAY['planter', 'outdoor', 'terrazzo', 'plants'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'outdoor-living'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80', 'Terrazzo Plant Pot — Large', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'terrazzo-plant-pot-large'));

-- ART & SCULPTURES (1)

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Void Ceramic Sculpture', 'void-ceramic-sculpture',
  'Thrown and finished by London ceramicist James Alderton, each Void sculpture is a unique exploration of form and negative space. The tenmoku glaze creates an iridescent dark surface.',
  'A hand-thrown stoneware vessel with tenmoku glaze.',
  640, NULL, 6, true, true, false, true,
  'Hand-thrown stoneware, tenmoku glaze', 'W25 × H35 cm', 'United Kingdom',
  ARRAY['sculpture', 'ceramic', 'art', 'decorative'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'art-sculptures'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80', 'Void Ceramic Sculpture', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'void-ceramic-sculpture'));

-- BATHROOM (1)

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Concrete Basin — Oval', 'concrete-basin-oval',
  E'Cast from glass-fibre reinforced concrete (GFRC) to achieve a thin-wall profile that belies the material\'s strength. Each basin is sealed with a penetrating sealer for water resistance and easy cleaning.',
  'A cast concrete countertop basin with sealed matte finish.',
  780, NULL, 10, false, false, false, true,
  'GFRC concrete, sealed finish', 'W60 × D40 × H15 cm', 'Australia',
  ARRAY['bathroom', 'basin', 'concrete', 'renovation'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'bathroom'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', 'Concrete Basin — Oval', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'concrete-basin-oval'));

-- SMART HOME (1)

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Smart Dimmer Switch — Brushed Nickel', 'smart-dimmer-switch-brushed-nickel',
  'Replace your standard switch with this smart dimmer to gain app control, scheduling, scenes, and voice control through Alexa, Google Assistant, and Apple HomeKit. The brushed nickel face plate is designed to complement premium interiors.',
  'WiFi-enabled smart dimmer. Works with Alexa, Google & HomeKit.',
  89, NULL, 50, false, true, false, true,
  'Brushed nickel face plate, WiFi module', 'Standard single gang', 'USA',
  ARRAY['smart home', 'lighting', 'dimmer', 'wifi'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'smart-home'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80', 'Smart Dimmer Switch — Brushed Nickel', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'smart-dimmer-switch-brushed-nickel'));

-- PLANTS & BOTANICALS (1)

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Hanging Terrarium — Geometric', 'hanging-terrarium-geometric',
  'This twelve-faceted geometric terrarium is powder-coated in matte black steel with open sides for air circulation. Perfect for air plants, preserved moss, or small succulents.',
  'A geometric hanging terrarium for air plants and moss.',
  95, 115, 30, false, false, true, true,
  'Powder-coated steel, tempered glass', 'Ø20 cm, rope drop 60 cm', 'Germany',
  ARRAY['plants', 'terrarium', 'hanging', 'geometric', 'botanical'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'plants-botanicals'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800&q=80', 'Hanging Terrarium — Geometric', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'hanging-terrarium-geometric'));

-- FLOORING & TILES (1)

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Zellige Terracotta Tiles — m²', 'zellige-terracotta-tiles-sqm',
  'Cut and glazed by hand in Fez, Morocco, these terracotta zellige tiles display the intentional imperfection that defines the craft. No two tiles are identical. Suitable for floors, walls, and splashbacks.',
  'Handmade zellige tiles with characteristic surface variation.',
  95, NULL, 200, false, true, false, true,
  'Hand-cut zellige ceramic', '10×10 cm tiles, sold per m²', 'Morocco',
  ARRAY['tiles', 'flooring', 'kitchen', 'bathroom', 'moroccan'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'flooring-tiles'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80', 'Zellige Terracotta Tiles — m²', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'zellige-terracotta-tiles-sqm'));

-- PAINT & WALLCOVERINGS (1)

INSERT INTO "Product" ("id", "name", "slug", "description", "shortDesc", "price", "comparePrice", "stock", "featured", "newArrival", "bestSeller", "isAvailable", "material", "dimensions", "origin", "tags", "categoryId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text, 'Chalk Paint — Warm Stone (2.5L)', 'chalk-paint-warm-stone-2-5l',
  E'Warm Stone is Maison Avant-Garde\'s signature neutral — a nuanced stone that shifts from warm grey to pale sand depending on the light. Zero-VOC formula. Water-based, low-odour, and wipeable when sealed.',
  'A zero-VOC chalk paint in the signature Warm Stone tone.',
  68, NULL, 80, false, false, true, true,
  'Zero-VOC chalk-based paint', '2.5L (covers approx. 20 m²)', 'UK',
  ARRAY['paint', 'wall', 'renovation', 'neutral'],
  (SELECT "id" FROM "Category" WHERE "slug" = 'paint-wallcoverings'), NOW(), NOW()
);

INSERT INTO "ProductImage" ("id", "url", "alt", "primary", "sortOrder", "productId")
VALUES
  (gen_random_uuid()::text, 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80', 'Chalk Paint — Warm Stone (2.5L)', true, 0, (SELECT "id" FROM "Product" WHERE "slug" = 'chalk-paint-warm-stone-2-5l'));

-- ─── SERVICES (8) ───────────────────────────────────────────────────────────

INSERT INTO "Service" ("id", "name", "slug", "description", "shortDesc", "price", "priceType", "duration", "featured", "isAvailable", "sortOrder", "createdAt")
VALUES
  (gen_random_uuid()::text, 'Interior Design Consultation', 'interior-design-consultation',
   'Work directly with one of our lead interior designers to develop a clear vision for your space. We review your existing layout, discuss your aesthetic goals, explore material and colour options, and create a prioritised action plan. Available in-person or via video call.',
   'One-on-one session with our lead designers to define your vision.',
   150, 'HOURLY', '1–3 hours', true, true, 1, NOW()),

  (gen_random_uuid()::text, 'Full Room Makeover', 'full-room-makeover',
   'A comprehensive room transformation handled from first concept to final styling. Includes design planning, product sourcing, delivery coordination, installation, and professional styling. We handle every detail so you walk in to a finished room.',
   'Complete transformation — furniture, art, lighting and styling.',
   2500, 'FIXED', '2–3 weeks', true, true, 2, NOW()),

  (gen_random_uuid()::text, 'Kitchen Renovation', 'kitchen-renovation',
   'From cabinetry design and material selection to appliance specification and tiling — our kitchen renovation service covers every detail. We work with certified tradespeople and premium suppliers to deliver kitchens that are as functional as they are beautiful.',
   'Premium kitchen redesigns balancing function and avant-garde aesthetics.',
   5000, 'FIXED', '3–6 weeks', true, true, 3, NOW()),

  (gen_random_uuid()::text, 'Bathroom Renovation', 'bathroom-renovation',
   'Transform your bathroom into a spa-like retreat. Our team manages tiling, fixtures, vanities, lighting, and accessories — all selected to create a cohesive, avant-garde aesthetic. Includes full project management.',
   'Luxurious bathroom transformations with premium fixtures.',
   3500, 'FIXED', '2–4 weeks', false, true, 4, NOW()),

  (gen_random_uuid()::text, 'Outdoor & Garden Design', 'outdoor-garden-design',
   'We extend your interior design language to your outdoor spaces — terraces, gardens, rooftop decks, and balconies. Includes furniture selection, planting plans, lighting design, and styling.',
   'Transform your outdoor spaces into curated extensions of your interior.',
   1200, 'FIXED', '1–2 weeks', false, true, 5, NOW()),

  (gen_random_uuid()::text, 'Smart Home Installation', 'smart-home-installation',
   'Our certified smart home specialists install and configure lighting, climate control, security cameras, motorised blinds, audio/visual systems, and whole-home automation. We work with Apple HomeKit, Google Home, and Amazon Alexa ecosystems.',
   'Intelligent lighting, climate, security and entertainment integration.',
   800, 'FIXED', '1–3 days', false, true, 6, NOW()),

  (gen_random_uuid()::text, 'Color & Material Consultation', 'color-material-consultation',
   'A focused session on colour and material decision-making. We bring physical samples, paint swatches, tile boards, and fabric samples to your home to help you visualise combinations in your specific light conditions.',
   'Expert guidance on colour palettes, materials and finishes.',
   90, 'HOURLY', '1–2 hours', false, true, 7, NOW()),

  (gen_random_uuid()::text, 'Furniture Curation Service', 'furniture-curation-service',
   'Tell us your vision, budget, and space dimensions. Our design team creates a curated furniture proposal with sourcing from our collection and trusted suppliers worldwide, presented in a detailed mood board and specification document.',
   'We select and source furniture to match your vision and budget.',
   200, 'FIXED', '3–5 days', false, true, 8, NOW());

-- ─── DONE ───────────────────────────────────────────────────────────────────
-- Seeded: 14 categories, 27 products (with images), 8 services
