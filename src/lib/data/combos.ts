export interface Combo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  burger: string;
  side: string;
  drink: string;
  dessert: string;
  price: number;
  originalPrice: number;
  savings: number;
  image: string;
  accentColor: string;
  popular: boolean;
}

export const combos: Combo[] = [
  {
    id: "inferno-combo",
    name: "Inferno Feast",
    tagline: "For the Heat Seekers",
    description: "Our spiciest burger paired with cajun fries, a cooling vanilla shake, and molten lava cake.",
    burger: "Inferno Beast",
    side: "Cajun Fries",
    drink: "Vanilla Bean Shake",
    dessert: "Molten Lava Cake",
    price: 24.99,
    originalPrice: 31.96,
    savings: 6.97,
    image: "/combos/inferno-feast.jpg",
    accentColor: "#FF5A00",
    popular: true,
  },
  {
    id: "golden-combo",
    name: "Golden Hour",
    tagline: "Cheese Lover's Dream",
    description: "Triple cheddar perfection with truffle parmesan fries, craft root beer, and cheesecake bites.",
    burger: "Golden Melt",
    side: "Truffle Parmesan Fries",
    drink: "Craft Root Beer",
    dessert: "Cheesecake Bites",
    price: 22.99,
    originalPrice: 29.96,
    savings: 6.97,
    image: "/combos/golden-hour.jpg",
    accentColor: "#FFD65A",
    popular: true,
  },
  {
    id: "truffle-combo",
    name: "Truffle Experience",
    tagline: "Ultimate Luxury",
    description: "Wagyu and black truffle with duck fat fries, vintage cola, and truffle honey gelato.",
    burger: "Black Truffle King",
    side: "Duck Fat Fries",
    drink: "Vintage Cola",
    dessert: "Truffle Honey Gelato",
    price: 42.99,
    originalPrice: 52.96,
    savings: 9.97,
    image: "/combos/truffle-experience.jpg",
    accentColor: "#1A1A1A",
    popular: false,
  },
  {
    id: "smoky-combo",
    name: "Smokehouse Platter",
    tagline: "BBQ Perfection",
    description: "Smoky Titan with bourbon baked beans, smoked old fashioned, and bourbon pecan pie.",
    burger: "Smoky Titan",
    side: "Bourbon Baked Beans",
    drink: "Smoked Old Fashioned (NA)",
    dessert: "Bourbon Pecan Pie",
    price: 26.99,
    originalPrice: 34.96,
    savings: 7.97,
    image: "/combos/smokehouse-platter.jpg",
    accentColor: "#8B4513",
    popular: false,
  },
  {
    id: "volcano-combo",
    name: "Eruption Feast",
    tagline: "Feed the Beast",
    description: "Quad-stack volcano with loaded chili fries, extra thick chocolate shake, and brownie sundae.",
    burger: "Volcano Stack",
    side: "Loaded Chili Fries",
    drink: "Extra Thick Chocolate Shake",
    dessert: "Brownie Sundae",
    price: 32.99,
    originalPrice: 41.96,
    savings: 8.97,
    image: "/combos/eruption-feast.jpg",
    accentColor: "#DC143C",
    popular: true,
  },
  {
    id: "crunch-combo",
    name: "Crunch Time",
    tagline: "Texture Symphony",
    description: "Crunch Royale with sweet potato fries, cold brew float, and churros with dulce de leche.",
    burger: "Crunch Royale",
    side: "Sweet Potato Fries",
    drink: "Cold Brew Float",
    dessert: "Churros with Dulce de Leche",
    price: 21.99,
    originalPrice: 27.96,
    savings: 5.97,
    image: "/combos/crunch-time.jpg",
    accentColor: "#F4A460",
    popular: false,
  },
  {
    id: "ultimate-combo",
    name: "The Ultimate",
    tagline: "No Compromise",
    description: "Ultimate Prime with truffle fries, champagne (NA), and gold-dusted tiramisu. The complete experience.",
    burger: "Ultimate Prime",
    side: "Truffle Fries",
    drink: "Champagne (Non-Alcoholic)",
    dessert: "Gold-Dusted Tiramisu",
    price: 52.99,
    originalPrice: 64.96,
    savings: 11.97,
    image: "/combos/the-ultimate.jpg",
    accentColor: "#FFD700",
    popular: false,
  },
];

export const popularCombos = combos.filter((c) => c.popular);