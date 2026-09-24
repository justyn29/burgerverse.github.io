export interface Ingredient {
  id: string;
  name: string;
  category: "beef" | "cheese" | "vegetable" | "sauce" | "bun";
  title: string;
  description: string;
  origin: string;
  process: string;
  image: string;
  color: string;
  particles: string;
}

export const ingredients: Ingredient[] = [
  {
    id: "wagyu-beef",
    name: "Wagyu Beef",
    category: "beef",
    title: "Australian Wagyu MS 9+",
    description: "Sourced from the pristine pastures of Tasmania, our Wagyu achieves the highest marble score. 45-day dry aging concentrates flavor to an intensity rarely found outside Michelin-starred kitchens.",
    origin: "Tasmania, Australia",
    process: "45-day dry aging • Hand-cut • Grilled over binchotan charcoal",
    image: "/ingredients/wagyu-beef.jpg",
    color: "#8B2D2D",
    particles: "steam",
  },
  {
    id: "prime-beef",
    name: "Prime Beef",
    category: "beef",
    title: "USDA Prime Angus",
    description: "Only the top 2% of Angus beef qualifies. Raised on family farms in Nebraska, grain-finished for 120 days. Every patty is hand-formed, never pressed, preserving the natural texture and juiciness.",
    origin: "Nebraska, USA",
    process: "Grain-finished 120 days • Hand-formed • Smashed on 400°F plancha",
    image: "/ingredients/prime-beef.jpg",
    color: "#A52A2A",
    particles: "smoke",
  },
  {
    id: "aged-cheddar",
    name: "Aged Cheddar",
    category: "cheese",
    title: "3-Year Aged Vermont Cheddar",
    description: "Crafted by a fourth-generation creamery in Vermont. Three years of aging creates crystalline tyrosine clusters — those delightful crunchy bits — and a flavor profile that shifts from sharp to nutty to sweet.",
    origin: "Vermont, USA",
    process: "Aged 36 months • Cloth-bound • Hand-selected wheels",
    image: "/ingredients/aged-cheddar.jpg",
    color: "#FF9D00",
    particles: "crumbs",
  },
  {
    id: "gruyere",
    name: "Gruyère",
    category: "cheese",
    title: "Cave-Aged Swiss Gruyère AOP",
    description: "From the cellars of Gruyères, Switzerland. Aged 18 months in humidity-controlled caves. Nutty, complex, with notes of brown butter and toasted hazelnuts. The gold standard for melting cheese.",
    origin: "Gruyères, Switzerland",
    process: "Aged 18 months • Cave-matured • AOP certified",
    image: "/ingredients/gruyere.jpg",
    color: "#D4A53F",
    particles: "oil",
  },
  {
    id: "truffle",
    name: "Black Truffle",
    category: "sauce",
    title: "Périgord Black Winter Truffle",
    description: "Harvested December through March in the oak forests of Périgord. Each truffle is dog-scented, hand-dug, and flown to our kitchen within 48 hours. Infused into our aioli at a ratio of 15% by weight.",
    origin: "Périgord, France",
    process: "Dog-harvested • Flash-frozen • Cold-infused 72 hours",
    image: "/ingredients/truffle.jpg",
    color: "#1A1A1A",
    particles: "sparkle",
  },
  {
    id: "ghost-pepper",
    name: "Ghost Pepper",
    category: "sauce",
    title: "Bhut Jolokia Ghost Pepper",
    description: "Once the world's hottest pepper at 1,041,427 SHU. We ferment ours for 6 months with garlic and vinegar, taming the brutal heat into a complex, fruity fire that builds and lingers beautifully.",
    origin: "Assam, India",
    process: "Fermented 6 months • Oak barrel • Cold-pressed",
    image: "/ingredients/ghost-pepper.jpg",
    color: "#FF5A00",
    particles: "fire",
  },
  {
    id: "brioche-bun",
    name: "Brioche Bun",
    category: "bun",
    title: "French Butter Brioche",
    description: "Baked fresh daily by our partner boulangerie. 28% French butter, 6-hour fermentation, egg-washed for that signature golden crown. Soft enough to compress, strong enough to hold the tallest stack.",
    origin: "Lyon, France (baked locally daily)",
    process: "6-hour fermentation • 28% butter • Hand-scored • Egg wash",
    image: "/ingredients/brioche-bun.jpg",
    color: "#F5DEB3",
    particles: "crumbs",
  },
  {
    id: "heirloom-tomato",
    name: "Heirloom Tomato",
    category: "vegetable",
    title: "Brandywine Heirloom Tomatoes",
    description: "Grown hydroponically in our rooftop greenhouse. Brandywine variety — massive, pink, with that perfect balance of sweetness and acidity. Vine-ripened and harvested at dawn for peak flavor.",
    origin: "Rooftop Greenhouse (on-site)",
    process: "Hydroponic • Vine-ripened • Dawn harvest • Never refrigerated",
    image: "/ingredients/heirloom-tomato.jpg",
    color: "#FF6B6B",
    particles: "droplets",
  },
];

export const ingredientsByCategory = {
  beef: ingredients.filter((i) => i.category === "beef"),
  cheese: ingredients.filter((i) => i.category === "cheese"),
  vegetable: ingredients.filter((i) => i.category === "vegetable"),
  sauce: ingredients.filter((i) => i.category === "sauce"),
  bun: ingredients.filter((i) => i.category === "bun"),
};