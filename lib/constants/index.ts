import { deliveryIcon, shieldCheckIcon, starBadgeIcon } from "@/assets";

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
