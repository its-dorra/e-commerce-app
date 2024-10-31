import {
  cozyBlack,
  deliveryIcon,
  shieldCheckIcon,
  starBadgeIcon,
  tshirt1,
  tshirt2,
  tshirt3,
  tshirt4,
  tshirt5,
  tshirt6,
} from "@/assets";

export const categories = [
  { id: 0, category: "T-Shirts" },
  { id: 1, category: "Jeans" },
  { id: 2, category: "Dresses" },
  { id: 3, category: "Coats" },

  { id: 6, category: "Hoodies" },

  { id: 8, category: "Jackets" },
  { id: 9, category: "Shoes" },
];

export const features = [
  {
    id: 1,
    featureTitle: "Free shipping",
    featureContent:
      "Upgrade your style today and get FREE shipping on all orders! Don't miss out.",
    featureIcon: deliveryIcon,
  },
  {
    id: 2,
    featureTitle: "Satisfaction Guarantee",
    featureContent:
      "Shop confidently with our Satisfaction Guarantee: Love it or get a refund.",
    featureIcon: starBadgeIcon,
  },
  {
    id: 3,
    featureTitle: "Secure payment",
    featureContent:
      "Your security is our priority. Your payments are secure with us.",
    featureIcon: shieldCheckIcon,
  },
];

export const bestSelling = [
  {
    id: 1,
    name: "Classic Monochrome Tees",
    quantity: 79,
    basePrice: 43,
    imageUrl: "tshirt1",
  },
  {
    id: 2,
    name: "Monochromatic Wardrobe",
    quantity: 20,
    basePrice: 27,
    imageUrl: "tshirt2",
  },
  {
    id: 3,
    name: "Essential Neutrals",
    quantity: 0,
    basePrice: 22,
    imageUrl: "tshirt3",
  },
  {
    id: 4,
    name: "UTRAANET Black",
    quantity: 15,
    basePrice: 43,
    imageUrl: "tshirt4",
  },
];

export type Products = typeof bestSelling;

export const latestProducts = [
  {
    id: 1,
    title: "Elegant Ebony Sweatshirts",
    inStock: true,
    price: 35,
    image: tshirt5,
  },
  {
    id: 2,
    title: "Sleek and Cozy Black",
    inStock: true,
    price: 57,
    image: cozyBlack,
  },
  {
    id: 3,
    title: "Raw Black Tees",
    inStock: true,
    price: 19,
    image: tshirt1,
  },
  {
    id: 4,
    title: "Raw Black Tees",
    inStock: true,
    price: 30,
    image: tshirt6,
  },
];
