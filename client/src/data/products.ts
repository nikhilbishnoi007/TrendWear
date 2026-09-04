import { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  {
    id: "drop-01",
    name: "CYBERPUNK HIGH 'VOLT'",
    brand: "TRENDWEAR LABS",
    category: "Sneakers",
    price: 240,
    originalPrice: 280,
    isNewDrop: true,
    inStock: true,
    colorway: "VOLT / OBSIDIAN BLACK / METALLIC SILVER",
    description:
      "A conceptual silhouette fusing cyber-industrial aesthetics with high-performance cushioning. Constructed with ballistic ripstop mesh, reflective 3M overlays, and an aggressive lugged outsole built for high-impact urban environments.",
    details: [
      "Ballistic nylon & synthetic suede upper",
      "Encapsulated air-cushioned midsole",
      "High-traction tactical rubber outsole",
      "3M reflective piping and dual-pull tabs",
      "Custom branded industrial zip enclosure",
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    availableSizes: [7, 7.5, 8.5, 9, 9.5, 10, 11, 12],
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    id: "drop-02",
    name: "OVERSIZED ACID WASH HOODIE",
    brand: "RAW STREET",
    category: "Apparel",
    price: 130,
    originalPrice: 150,
    isNewDrop: true,
    inStock: true,
    colorway: "ACID CHARCOAL / VINTAGE SMOKE",
    description:
      "Cut from heavy 500 GSM French terry cotton. Hand-treated with an aggressive mineral acid wash for a unique 1-of-1 distressed patina. Features raw drop-shoulder silhouette with heavy double-layered hood and ribbed contouring.",
    details: [
      "100% Heavyweight 500 GSM Organic Cotton",
      "Custom acid wash vintage garment treatment",
      "Dropped shoulders with boxy streetwear fit",
      "Hidden kangaroo pocket with storm seams",
      "Embossed tonal logo embroidery on back",
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12, 13],
    availableSizes: [6, 7, 8, 9, 10, 11, 12, 13],
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    id: "drop-03",
    name: "TACTICAL MODULAR CARGO VEST",
    brand: "SYSTEM 04",
    category: "Apparel",
    price: 175,
    originalPrice: 195,
    isNewDrop: false,
    inStock: true,
    colorway: "STEALTH ONYX / REFLECTIVE ORANGE",
    description:
      "Utility-engineered tactical vest crafted from military-grade Cordura fabric. Equipped with 6 detachable magnetic modular pouches, MOLLE webbing grid, and adjustable side cinch harnesses for customized body fit.",
    details: [
      "Military-spec Cordura 1000D abrasion resistance",
      "Fidlock magnetic quick-release buckles",
      "MOLLE matrix system for modular expansion",
      "Waterproof seam-sealed zippered utility pockets",
      "Breathable 3D spacer mesh interior lining",
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    availableSizes: [7, 8, 9, 11, 12],
    image:
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    id: "drop-04",
    name: "AIR PHANTOM PROTO-01",
    brand: "TRENDWEAR LABS",
    category: "Sneakers",
    price: 290,
    originalPrice: 320,
    isNewDrop: true,
    inStock: false,
    colorway: "TRIPLE NOIR / HYPER ORANGE INFUSION",
    description:
      "A limited release prototype runner engineered with a 3D-printed lattice midsole, carbon-fiber shank plate, and ultra-adaptive knit mesh. Currently sold out worldwide — restock lottery opening soon.",
    details: [
      "Liquid-resin 3D lattice energy return midsole",
      "Carbon composite propulsion plate",
      "Monofilament breathable engineered upper",
      "Speed-lacing lock mechanism",
      "Exclusive numbered collector box",
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    availableSizes: [],
    image:
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    id: "drop-05",
    name: "VORTEX RUNNER ZERO",
    brand: "TRENDWEAR LABS",
    category: "Sneakers",
    price: 210,
    originalPrice: 240,
    isNewDrop: true,
    inStock: true,
    colorway: "CHALK WHITE / SOLAR LIME / GLITCH GREY",
    description:
      "Streamlined aerodynamic silhouette engineered for aggressive cadence. Features reactive dual-density foam core and breathable open-cell mesh with translucent TPU skeletal framing.",
    details: [
      "Translucent micro-mesh composite body",
      "Dual-density high response midsole",
      "Anatomical heel cup counter",
      "Abrasion-resistant compound rubber pods",
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    availableSizes: [6.5, 7, 8, 8.5, 9, 10, 11, 12],
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    id: "drop-06",
    name: "BALLISTIC CARGO PANTS",
    brand: "RAW STREET",
    category: "Apparel",
    price: 160,
    isNewDrop: false,
    inStock: true,
    colorway: "MATTE BLACK / INDUSTRIAL WEBBING",
    description:
      "Heavyweight tactical pants featuring an articulated knee design, 8 utility cargo compartments with weather-proof zippers, and adjustable ankle bungee toggles.",
    details: [
      "High-density ripstop cotton blend",
      "Water-repellent DWR coating",
      "Articulated ergonomic knee darts",
      "Adjustable ankle drawcords with toggle hardware",
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12, 13],
    availableSizes: [7, 8, 9, 10, 11, 12],
    image:
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=85",
    ],
  },
];

export const getProductById = (id: string | number): Product | undefined => {
  return PRODUCTS.find((p) => String(p.id) === String(id));
};

export const getRelatedProducts = (
  currentId: string | number,
  limit: number = 4
): Product[] => {
  return PRODUCTS.filter((p) => String(p.id) !== String(currentId)).slice(0, limit);
};
