export interface Burger {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  ingredients: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  price: number;
  image: string;
  accentColor: string;
  featured: boolean;
}

export const burgers: Burger[] = [
  {
    id: "inferno-beast",
    number: "01",
    name: "Inferno Beast",
    tagline: "Double Beef • Ghost Pepper Sauce",
    description: "Two 180g prime beef patties, seared to perfection, crowned with our signature ghost pepper sauce that builds heat with every bite. Smoked gouda, crisp lettuce, and cooling ranch provide the perfect counterbalance to this fiery masterpiece.",
    ingredients: [
      "2× 180g Prime Beef Patties",
      "Ghost Pepper Sauce",
      "Smoked Gouda Cheese",
      "Fresh Iceberg Lettuce",
      "Cooling Ranch Drizzle",
      "Brioche Bun",
      "Pickled Jalapeños",
    ],
    nutrition: { calories: 1240, protein: 68, carbs: 52, fat: 84 },
    price: 18.99,
    image: "/burgers/inferno-beast.png",
    accentColor: "#FF5A00",
    featured: true,
  },
  {
    id: "golden-melt",
    number: "02",
    name: "Golden Melt",
    tagline: "Triple Cheddar • Caramelized Onions",
    description: "Three layers of aged cheddar — sharp, medium, and mild — create an impossibly creamy melt. Slow-caramelized onions add deep sweetness, while our house-made burger sauce ties everything together in golden harmony.",
    ingredients: [
      "180g Prime Beef Patty",
      "Aged Sharp Cheddar",
      "Medium Cheddar",
      "Mild Cheddar",
      "Caramelized Onions",
      "House Burger Sauce",
      "Potato Roll",
      "Crispy Onion Strings",
    ],
    nutrition: { calories: 1180, protein: 62, carbs: 58, fat: 78 },
    price: 16.99,
    image: "/burgers/golden-melt.png",
    accentColor: "#FFD65A",
    featured: true,
  },
  {
    id: "black-truffle-king",
    number: "03",
    name: "Black Truffle King",
    tagline: "Truffle Aioli • Premium Wagyu",
    description: "The crown jewel of our menu. Australian Wagyu beef (MS 9+) meets black winter truffle aioli, aged parmesan crisp, and arugula. Every bite is an exercise in luxury — earthy, rich, and utterly unforgettable.",
    ingredients: [
      "200g Australian Wagyu (MS 9+)",
      "Black Truffle Aioli",
      "Aged Parmesan Crisp",
      "Fresh Arugula",
      "Caramelized Shallots",
      "Truffle Brioche Bun",
      "Micro Greens",
    ],
    nutrition: { calories: 1320, protein: 72, carbs: 48, fat: 92 },
    price: 34.99,
    image: "/burgers/black-truffle-king.png",
    accentColor: "#D4AF37",
    featured: true,
  },
  {
    id: "smoky-titan",
    number: "04",
    name: "Smoky Titan",
    tagline: "Smoked Bacon • BBQ Glaze",
    description: "Thick-cut applewood smoked bacon, house-made bourbon BBQ glaze, crispy onion ring, and smoked cheddar. This is barbecue elevated — smoky, sweet, savory, and deeply satisfying.",
    ingredients: [
      "180g Prime Beef Patty",
      "Applewood Smoked Bacon (3 slices)",
      "Bourbon BBQ Glaze",
      "Smoked Cheddar",
      "Crispy Beer-Battered Onion Ring",
      "Coleslaw",
      "Sesame Seed Bun",
    ],
    nutrition: { calories: 1420, protein: 70, carbs: 68, fat: 94 },
    price: 19.99,
    image: "/burgers/smoky-titan.png",
    accentColor: "#8B4513",
    featured: false,
  },
  {
    id: "volcano-stack",
    number: "05",
    name: "Volcano Stack",
    tagline: "Quad Beef Stack • Lava Cheese Sauce",
    description: "Four 150g patties stacked high with molten lava cheese sauce between each layer. Topped with crispy onions, jalapeños, and our volcano sauce. Not for the faint of heart — this is a true mountain of flavor.",
    ingredients: [
      "4× 150g Prime Beef Patties",
      "Lava Cheese Sauce",
      "Crispy Onion Straws",
      "Fresh Jalapeños",
      "Volcano Sauce",
      "American Cheese (4 slices)",
      "Extra-Large Brioche Bun",
    ],
    nutrition: { calories: 2180, protein: 112, carbs: 72, fat: 156 },
    price: 24.99,
    image: "/burgers/volcano-stack.png",
    accentColor: "#DC143C",
    featured: true,
  },
  {
    id: "crunch-royale",
    number: "06",
    name: "Crunch Royale",
    tagline: "Crispy Onion Tower • Buttermilk Ranch",
    description: "A tower of tempura-battered onion rings, crisp lettuce, tomato, and our signature buttermilk ranch. The beef patty is smashed thin for maximum crust. Texture contrast in every bite — crisp, juicy, creamy, fresh.",
    ingredients: [
      "180g Smashed Beef Patty",
      "Tempura Onion Ring Tower (5 rings)",
      "Buttermilk Ranch",
      "Vine-Ripened Tomato",
      "Iceberg Lettuce",
      "Red Onion",
      "American Cheese",
      "Potato Roll",
    ],
    nutrition: { calories: 1080, protein: 54, carbs: 78, fat: 68 },
    price: 15.99,
    image: "/burgers/crunch-royale.png",
    accentColor: "#F4A460",
    featured: false,
  },
  {
    id: "ultimate-prime",
    number: "07",
    name: "Ultimate Prime",
    tagline: "Flagship Premium • Dry-Aged Beef",
    description: "Our flagship. 200g dry-aged prime beef (45 days), cave-aged gruyère, truffle-infused demi-glace, foie gras torchon, and black garlic aioli on a hand-crafted milk bun. The burger that defines BurgerVerse.",
    ingredients: [
      "200g Dry-Aged Prime Beef (45 days)",
      "Cave-Aged Gruyère",
      "Truffle Demi-Glace",
      "Foie Gras Torchon",
      "Black Garlic Aioli",
      "Milk Bun (hand-crafted)",
      "Gold Leaf Garnish",
    ],
    nutrition: { calories: 1580, protein: 78, carbs: 52, fat: 112 },
    price: 42.99,
    image: "/burgers/ultimate-prime.png",
    accentColor: "#FFD700",
    featured: true,
  },
];

export const featuredBurgers = burgers.filter((b) => b.featured);
export const allBurgers = burgers;