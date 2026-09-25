import db from "./index";
import * as schema from "./schema";

// Categories for Men's Clothing
const categoriesData = [
  { name: "T-Shirts" },
  { name: "Shirts" },
  { name: "Hoodies" },
  { name: "Jackets" },
  { name: "Coats" },
  { name: "Jeans" },
  { name: "Pants" },
  { name: "Sweaters" },
  { name: "Suits & Blazers" },
  { name: "Shorts" },
];

// Color palette
const colorsData = [
  { name: "Black", hexCode: "#111827" },
  { name: "White", hexCode: "#F9FAFB" },
  { name: "Navy", hexCode: "#1E293B" },
  { name: "Heather Grey", hexCode: "#9CA3AF" },
  { name: "Olive Green", hexCode: "#4D5D43" },
  { name: "Charcoal", hexCode: "#374151" },
  { name: "Camel", hexCode: "#C19A6B" },
  { name: "Beige", hexCode: "#E5DCC5" },
  { name: "Denim Blue", hexCode: "#2563EB" },
  { name: "Khaki", hexCode: "#C3B091" },
  { name: "Burgundy", hexCode: "#6B1D2F" },
  { name: "Forest Green", hexCode: "#1B4332" },
  { name: "Brown", hexCode: "#5C4033" },
  { name: "Terracotta", hexCode: "#C86D51" },
];

interface ProductSeedItem {
  name: string;
  categoryName: string;
  description: string;
  basePrice: number;
  variants: {
    colorName: string;
    images: string[];
    sizes: {
      size: "XS" | "S" | "M" | "L" | "XL" | "2XL" | "3XL";
      quantity: number;
      priceAdjustment?: number;
      dimensions?: string;
    }[];
  }[];
}

const menProductsData: ProductSeedItem[] = [
  // 1. T-Shirts
  {
    name: "Heavyweight Cotton Crewneck T-Shirt",
    categoryName: "T-Shirts",
    description:
      "Crafted from 280 GSM premium combed organic cotton, this heavyweight crewneck tee features a relaxed boxy silhouette, reinforced ribbed collar, and durable double-needle stitching designed to retain its structure wash after wash.",
    basePrice: 38,
    variants: [
      {
        colorName: "Black",
        images: [
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 25, priceAdjustment: 0 },
          { size: "M", quantity: 40, priceAdjustment: 0 },
          { size: "L", quantity: 35, priceAdjustment: 0 },
          { size: "XL", quantity: 20, priceAdjustment: 0 },
          { size: "2XL", quantity: 10, priceAdjustment: 2 },
        ],
      },
      {
        colorName: "White",
        images: [
          "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "XS", quantity: 15, priceAdjustment: 0 },
          { size: "S", quantity: 30, priceAdjustment: 0 },
          { size: "M", quantity: 50, priceAdjustment: 0 },
          { size: "L", quantity: 45, priceAdjustment: 0 },
          { size: "XL", quantity: 25, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Heather Grey",
        images: [
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 20, priceAdjustment: 0 },
          { size: "M", quantity: 30, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Olive Green",
        images: [
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "M", quantity: 25, priceAdjustment: 0 },
          { size: "L", quantity: 20, priceAdjustment: 0 },
          { size: "XL", quantity: 10, priceAdjustment: 0 },
        ],
      },
    ],
  },
  {
    name: "Relaxed Vintage Streetwear Graphic Tee",
    categoryName: "T-Shirts",
    description:
      "Garment-dyed for a soft, worn-in vintage look and feel. Features drop shoulders, an oversized relaxed cut, and subtle custom typography on the back.",
    basePrice: 45,
    variants: [
      {
        colorName: "Charcoal",
        images: [
          "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 15, priceAdjustment: 0 },
          { size: "M", quantity: 30, priceAdjustment: 0 },
          { size: "L", quantity: 35, priceAdjustment: 0 },
          { size: "XL", quantity: 20, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Beige",
        images: [
          "https://images.unsplash.com/photo-1622445262464-84b1456045b6?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 10, priceAdjustment: 0 },
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 0 },
        ],
      },
    ],
  },

  // 2. Shirts
  {
    name: "Classic Oxford Cotton Button-Down Shirt",
    categoryName: "Shirts",
    description:
      "A quintessential wardrobe staple made from 100% durable pin-point Oxford weave cotton. Tailored with a traditional button-down collar, chest pocket, and curved hem suitable for tucking or wearing untucked.",
    basePrice: 68,
    variants: [
      {
        colorName: "White",
        images: [
          "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 20, priceAdjustment: 0 },
          { size: "M", quantity: 35, priceAdjustment: 0 },
          { size: "L", quantity: 30, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Navy",
        images: [
          "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 15, priceAdjustment: 0 },
          { size: "M", quantity: 25, priceAdjustment: 0 },
          { size: "L", quantity: 20, priceAdjustment: 0 },
          { size: "XL", quantity: 10, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Denim Blue",
        images: [
          "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 0 },
        ],
      },
    ],
  },
  {
    name: "Relaxed Linen Camp-Collar Resort Shirt",
    categoryName: "Shirts",
    description:
      "Breathable pure European flax linen cut in an airy camp-collar silhouette. Perfect for warm-weather layering with short sleeves and natural shell buttons.",
    basePrice: 58,
    variants: [
      {
        colorName: "Beige",
        images: [
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 15, priceAdjustment: 0 },
          { size: "M", quantity: 30, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Khaki",
        images: [
          "https://images.unsplash.com/photo-1604695573706-53170668f6a6?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 20, priceAdjustment: 0 },
          { size: "XL", quantity: 10, priceAdjustment: 0 },
        ],
      },
    ],
  },

  // 3. Hoodies & Sweatshirts
  {
    name: "Heavy French Terry Oversized Hoodie",
    categoryName: "Hoodies",
    description:
      "Engineered from ultra-dense 450 GSM French Terry loopback cotton. Features a double-layered structured hood with no drawstrings for a sleek minimalist aesthetic, deep kangaroo pocket, and ribbed cuffs.",
    basePrice: 85,
    variants: [
      {
        colorName: "Heather Grey",
        images: [
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 20, priceAdjustment: 0 },
          { size: "M", quantity: 35, priceAdjustment: 0 },
          { size: "L", quantity: 40, priceAdjustment: 0 },
          { size: "XL", quantity: 25, priceAdjustment: 0 },
          { size: "2XL", quantity: 15, priceAdjustment: 5 },
        ],
      },
      {
        colorName: "Black",
        images: [
          "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 25, priceAdjustment: 0 },
          { size: "M", quantity: 45, priceAdjustment: 0 },
          { size: "L", quantity: 45, priceAdjustment: 0 },
          { size: "XL", quantity: 30, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Forest Green",
        images: [
          "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Terracotta",
        images: [
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 10, priceAdjustment: 0 },
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 20, priceAdjustment: 0 },
        ],
      },
    ],
  },
  {
    name: "Minimalist Full-Zip Fleece Hoodie",
    categoryName: "Hoodies",
    description:
      "A versatile regular-fit zip hoodie built from brushed organic cotton fleece. Features a sturdy dual-direction metal zipper, ergonomic raglan sleeves, and hidden media pocket.",
    basePrice: 78,
    variants: [
      {
        colorName: "Charcoal",
        images: [
          "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 15, priceAdjustment: 0 },
          { size: "M", quantity: 30, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Navy",
        images: [
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 10, priceAdjustment: 0 },
        ],
      },
    ],
  },

  // 4. Jackets
  {
    name: "Genuine Leather Biker Jacket",
    categoryName: "Jackets",
    description:
      "Crafted from supple, full-grain calfskin leather that develops a unique patina over time. Finished with heavy-duty silver hardware, asymmetrical zip closure, snap-down lapels, and quilted satin interior lining.",
    basePrice: 280,
    variants: [
      {
        colorName: "Black",
        images: [
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 10, priceAdjustment: 0 },
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 10 },
          { size: "2XL", quantity: 5, priceAdjustment: 15 },
        ],
      },
      {
        colorName: "Brown",
        images: [
          "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "M", quantity: 15, priceAdjustment: 0 },
          { size: "L", quantity: 15, priceAdjustment: 0 },
          { size: "XL", quantity: 10, priceAdjustment: 10 },
        ],
      },
    ],
  },
  {
    name: "Technical Water-Resistant MA-1 Bomber Jacket",
    categoryName: "Jackets",
    description:
      "Modern military-inspired bomber cut from durable high-density nylon with a water-repellent DWR coating. Features lightweight thermal insulation, ribbed trims, and utility sleeve pocket.",
    basePrice: 120,
    variants: [
      {
        colorName: "Olive Green",
        images: [
          "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 15, priceAdjustment: 0 },
          { size: "M", quantity: 30, priceAdjustment: 0 },
          { size: "L", quantity: 35, priceAdjustment: 0 },
          { size: "XL", quantity: 20, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Black",
        images: [
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 20, priceAdjustment: 0 },
          { size: "M", quantity: 30, priceAdjustment: 0 },
          { size: "L", quantity: 30, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Navy",
        images: [
          "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 10, priceAdjustment: 0 },
        ],
      },
    ],
  },
  {
    name: "Classic Trucker Denim Jacket",
    categoryName: "Jackets",
    description:
      "Traditional 14oz non-stretch rigid denim jacket with dual chest flap pockets, adjustable waist tabs, and branded copper shank buttons. An all-season layering essential.",
    basePrice: 95,
    variants: [
      {
        colorName: "Denim Blue",
        images: [
          "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1550995694-3f5f4a7e1ed2?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 15, priceAdjustment: 0 },
          { size: "M", quantity: 25, priceAdjustment: 0 },
          { size: "L", quantity: 30, priceAdjustment: 0 },
          { size: "XL", quantity: 20, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Black",
        images: [
          "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 10, priceAdjustment: 0 },
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 20, priceAdjustment: 0 },
          { size: "XL", quantity: 10, priceAdjustment: 0 },
        ],
      },
    ],
  },

  // 5. Coats
  {
    name: "Tailored Single-Breasted Wool Overcoat",
    categoryName: "Coats",
    description:
      "Crafted from a luxurious 80% recycled wool and cashmere blend. Designed with a clean notched collar, horn buttons, back vent, and full interior viscose lining for graceful layering over suits or knitwear.",
    basePrice: 220,
    variants: [
      {
        colorName: "Camel",
        images: [
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 10, priceAdjustment: 0 },
          { size: "M", quantity: 25, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 10 },
        ],
      },
      {
        colorName: "Charcoal",
        images: [
          "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 20, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 10 },
        ],
      },
      {
        colorName: "Black",
        images: [
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 10, priceAdjustment: 0 },
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 10, priceAdjustment: 10 },
        ],
      },
    ],
  },
  {
    name: "Nautical Double-Breasted Wool Peacoat",
    categoryName: "Coats",
    description:
      "A maritime-inspired double-breasted coat made from heavy melton wool. Features broad convertible lapels, anchor-embossed buttons, and deep hand-warmer pockets.",
    basePrice: 195,
    variants: [
      {
        colorName: "Navy",
        images: [
          "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 10, priceAdjustment: 0 },
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Black",
        images: [
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "M", quantity: 15, priceAdjustment: 0 },
          { size: "L", quantity: 20, priceAdjustment: 0 },
          { size: "XL", quantity: 10, priceAdjustment: 0 },
        ],
      },
    ],
  },

  // 6. Jeans
  {
    name: "Selvedge Straight-Fit Raw Denim Jeans",
    categoryName: "Jeans",
    description:
      "Woven on vintage shuttle looms using 13.5oz Japanese selvedge denim. Features a mid-rise waist, straight leg cut, button fly, and signature red-line selvedge ID on the outseam.",
    basePrice: 135,
    variants: [
      {
        colorName: "Denim Blue",
        images: [
          "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 20, priceAdjustment: 0 },
          { size: "M", quantity: 35, priceAdjustment: 0 },
          { size: "L", quantity: 40, priceAdjustment: 0 },
          { size: "XL", quantity: 25, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Black",
        images: [
          "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 15, priceAdjustment: 0 },
          { size: "M", quantity: 30, priceAdjustment: 0 },
          { size: "L", quantity: 30, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 0 },
        ],
      },
    ],
  },
  {
    name: "Relaxed Tapered 90s Wash Jeans",
    categoryName: "Jeans",
    description:
      "Roomy in the seat and thigh with a gradual taper down to the ankle. Stone-washed for an authentic 90s vintage drape and soft broken-in feel.",
    basePrice: 89,
    variants: [
      {
        colorName: "Denim Blue",
        images: [
          "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 15, priceAdjustment: 0 },
          { size: "M", quantity: 30, priceAdjustment: 0 },
          { size: "L", quantity: 35, priceAdjustment: 0 },
          { size: "XL", quantity: 20, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Heather Grey",
        images: [
          "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 0 },
        ],
      },
    ],
  },

  // 7. Pants
  {
    name: "Pleated Relaxed-Fit Chino Trousers",
    categoryName: "Pants",
    description:
      "Tailored with front double pleats, a wide-leg profile, and a comfortable mid-rise waist. Crafted from washed cotton twill with a touch of stretch for day-long comfort.",
    basePrice: 75,
    variants: [
      {
        colorName: "Khaki",
        images: [
          "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 15, priceAdjustment: 0 },
          { size: "M", quantity: 30, priceAdjustment: 0 },
          { size: "L", quantity: 35, priceAdjustment: 0 },
          { size: "XL", quantity: 20, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Olive Green",
        images: [
          "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "M", quantity: 25, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Navy",
        images: [
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 10, priceAdjustment: 0 },
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
        ],
      },
    ],
  },
  {
    name: "Tactical Cargo Utility Pants",
    categoryName: "Pants",
    description:
      "Durable ripstop construction featuring articulated knees, gusseted crotch, adjustable drawstring hems, and multiple functional bellowed utility pockets.",
    basePrice: 85,
    variants: [
      {
        colorName: "Black",
        images: [
          "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 20, priceAdjustment: 0 },
          { size: "M", quantity: 35, priceAdjustment: 0 },
          { size: "L", quantity: 35, priceAdjustment: 0 },
          { size: "XL", quantity: 20, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Olive Green",
        images: [
          "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 0 },
        ],
      },
    ],
  },

  // 8. Sweaters
  {
    name: "Chunky Cable-Knit Wool Crewneck Sweater",
    categoryName: "Sweaters",
    description:
      "Spun from 100% pure lambswool featuring traditional Aran cable-knit patterns. Provides exceptional natural warmth, breathable insulation, and chunky ribbed collar, hem, and cuffs.",
    basePrice: 110,
    variants: [
      {
        colorName: "Beige",
        images: [
          "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 15, priceAdjustment: 0 },
          { size: "M", quantity: 25, priceAdjustment: 0 },
          { size: "L", quantity: 30, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Forest Green",
        images: [
          "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 10, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Burgundy",
        images: [
          "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 10, priceAdjustment: 0 },
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 20, priceAdjustment: 0 },
        ],
      },
    ],
  },
  {
    name: "Fine Merino Wool Quarter-Zip Pullover",
    categoryName: "Sweaters",
    description:
      "Spun from ultra-fine 19.5 micron Australian Merino wool. Delivers lightweight thermoregulation, a smooth hand-feel against skin, and an antiqued metal quarter-zip neckline.",
    basePrice: 95,
    variants: [
      {
        colorName: "Charcoal",
        images: [
          "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 15, priceAdjustment: 0 },
          { size: "M", quantity: 30, priceAdjustment: 0 },
          { size: "L", quantity: 30, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Navy",
        images: [
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "M", quantity: 25, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 0 },
        ],
      },
    ],
  },

  // 9. Suits & Blazers
  {
    name: "Modern Slim-Fit Wool Blend Blazer",
    categoryName: "Suits & Blazers",
    description:
      "Sharply tailored unstructured blazer with notch lapels, kissing four-button cuffs, patch pockets, and twin rear vents. Suitable for smart-casual pairing with chinos or jeans.",
    basePrice: 190,
    variants: [
      {
        colorName: "Navy",
        images: [
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 10, priceAdjustment: 0 },
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 10 },
        ],
      },
      {
        colorName: "Charcoal",
        images: [
          "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "M", quantity: 15, priceAdjustment: 0 },
          { size: "L", quantity: 20, priceAdjustment: 0 },
          { size: "XL", quantity: 10, priceAdjustment: 10 },
        ],
      },
      {
        colorName: "Black",
        images: [
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 10, priceAdjustment: 0 },
          { size: "M", quantity: 20, priceAdjustment: 0 },
          { size: "L", quantity: 20, priceAdjustment: 0 },
        ],
      },
    ],
  },

  // 10. Shorts
  {
    name: "Everyday Stretch Cotton Chino Shorts",
    categoryName: "Shorts",
    description:
      "A classic 7-inch inseam chino short made with comfortable stretch twill. Features slash front pockets, buttoned rear welt pockets, and a clean flat front.",
    basePrice: 48,
    variants: [
      {
        colorName: "Khaki",
        images: [
          "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 20, priceAdjustment: 0 },
          { size: "M", quantity: 35, priceAdjustment: 0 },
          { size: "L", quantity: 35, priceAdjustment: 0 },
          { size: "XL", quantity: 20, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Navy",
        images: [
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 15, priceAdjustment: 0 },
          { size: "M", quantity: 25, priceAdjustment: 0 },
          { size: "L", quantity: 30, priceAdjustment: 0 },
          { size: "XL", quantity: 15, priceAdjustment: 0 },
        ],
      },
      {
        colorName: "Black",
        images: [
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
        ],
        sizes: [
          { size: "S", quantity: 15, priceAdjustment: 0 },
          { size: "M", quantity: 25, priceAdjustment: 0 },
          { size: "L", quantity: 25, priceAdjustment: 0 },
        ],
      },
    ],
  },
];

async function seed() {
  console.log("🌱 Starting men's clothing database seeding...");

  try {
    // 1. Seed Categories
    console.log("📁 Seeding categories...");
    for (const category of categoriesData) {
      await db
        .insert(schema.categoryTable)
        .values(category)
        .onConflictDoNothing();
    }
    console.log(`✅ ${categoriesData.length} categories ensured.`);

    // 2. Seed Colors
    console.log("🎨 Seeding colors...");
    for (const color of colorsData) {
      await db.insert(schema.colorTable).values(color).onConflictDoNothing();
    }
    console.log(`✅ ${colorsData.length} colors ensured.`);

    // 3. Clear existing product variants and products to avoid duplicates / stale items
    console.log("🧹 Cleaning up existing products and variants...");
    await db.delete(schema.imageTable);
    await db.delete(schema.sizeTable);
    await db.delete(schema.productVariantTable);
    await db.delete(schema.productTable);

    // 4. Seed Products, Variants, Sizes, and Images
    console.log("👕 Seeding men's clothing products...");

    let totalVariants = 0;
    let totalSizes = 0;
    let totalImages = 0;

    for (const productData of menProductsData) {
      // Insert Product
      const [insertedProduct] = await db
        .insert(schema.productTable)
        .values({
          name: productData.name,
          categoryName: productData.categoryName,
          description: productData.description,
          basePrice: productData.basePrice,
        })
        .returning();

      // Insert Variants
      for (const variantData of productData.variants) {
        const [insertedVariant] = await db
          .insert(schema.productVariantTable)
          .values({
            productId: insertedProduct.id,
            colorName: variantData.colorName,
          })
          .returning();

        totalVariants++;

        // Insert Sizes for this variant
        for (const sizeData of variantData.sizes) {
          await db.insert(schema.sizeTable).values({
            productVariantId: insertedVariant.id,
            size: sizeData.size,
            quantity: sizeData.quantity,
            priceAdjustment: sizeData.priceAdjustment ?? 0,
            dimensions: sizeData.dimensions ?? null,
          });
          totalSizes++;
        }

        // Insert Images for this variant
        for (let i = 0; i < variantData.images.length; i++) {
          await db.insert(schema.imageTable).values({
            productVariantId: insertedVariant.id,
            imagePath: variantData.images[i],
            displayOrder: i + 1,
          });
          totalImages++;
        }
      }
    }

    console.log("\n🎉 Seeding completed successfully!");
    console.log(`📦 Summary:`);
    console.log(`   - Categories: ${categoriesData.length}`);
    console.log(`   - Colors: ${colorsData.length}`);
    console.log(`   - Products: ${menProductsData.length}`);
    console.log(`   - Product Variants: ${totalVariants}`);
    console.log(`   - Size Inventory Records: ${totalSizes}`);
    console.log(`   - Product Images: ${totalImages}`);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
