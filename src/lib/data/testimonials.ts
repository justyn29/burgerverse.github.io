export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  burger: string;
  rating: number;
  videoUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "Food Critic, The Daily Plate",
    avatar: "/testimonials/sarah-chen.jpg",
    quote: "The Black Truffle King isn't just a burger — it's a culinary statement. The Wagyu melts like butter, the truffle aioli is transcendent, and the parmesan crisp adds texture that elevates every bite. This is what happens when a burger becomes art.",
    burger: "Black Truffle King",
    rating: 5,
  },
  {
    id: "marcus-johnson",
    name: "Marcus Johnson",
    role: "Chef & Owner, Ember & Oak",
    avatar: "/testimonials/marcus-johnson.jpg",
    quote: "I've cooked burgers for 20 years. The Ultimate Prime made me reconsider everything. Dry-aged beef, foie gras, gold leaf — it's indulgent without being gimmicky. Every component serves the whole. Respect.",
    burger: "Ultimate Prime",
    rating: 5,
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    role: "Food Content Creator @elenaxeats",
    avatar: "/testimonials/elena-rodriguez.jpg",
    quote: "The Inferno Beast is DANGEROUS. In the best way. That ghost pepper sauce doesn't just burn — it SINGS. Complex, fruity, floral heat that makes you crave the next bite before you've swallowed. My new benchmark for spicy burgers.",
    burger: "Inferno Beast",
    rating: 5,
  },
  {
    id: "david-park",
    name: "David Park",
    role: "Software Engineer & Burger Enthusiast",
    avatar: "/testimonials/david-park.jpg",
    quote: "Golden Melt is comfort food perfected. Three cheddars sounds excessive but the ratio is calculated — sharp for bite, medium for melt, mild for creaminess. Caramelized onions add jammy sweetness. I order this weekly.",
    burger: "Golden Melt",
    rating: 5,
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "Nutritionist & Food Writer",
    avatar: "/testimonials/priya-sharma.jpg",
    quote: "Crunch Royale proves texture is everything. The tempura onion tower stays crisp for 20 minutes. Smashed patty gives you that lacey edge. Buttermilk ranch cuts through it all. It's a masterclass in contrast.",
    burger: "Crunch Royale",
    rating: 5,
  },
  {
    id: "james-wilson",
    name: "James Wilson",
    role: "BBQ Pitmaster, Smoke & Salt",
    avatar: "/testimonials/james-wilson.jpg",
    quote: "Smoky Titan respects the craft. Applewood bacon, bourbon glaze, beer-battered onion ring — every element earns its place. The coleslaw isn't an afterthought; it's the acid bridge. This is how you do BBQ burger.",
    burger: "Smoky Titan",
    rating: 5,
  },
];

export interface Review {
  id: string;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  text: string;
  burger: string;
  verified: boolean;
}

export const reviews: Review[] = [
  {
    id: "rev-1",
    author: "Alex M.",
    avatar: "/reviews/alex.jpg",
    date: "2024-12-15",
    rating: 5,
    text: "Best burger I've had in years. The Volcano Stack is insane — 4 patties and somehow still balanced. Lava cheese sauce is addictive.",
    burger: "Volcano Stack",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Jordan K.",
    avatar: "/reviews/jordan.jpg",
    date: "2024-12-12",
    rating: 5,
    text: "Truffle King worth every penny. The Wagyu quality is unreal. Truffle aioli isn't overpowering — it's perfectly integrated. Arugula adds fresh peppery bite.",
    burger: "Black Truffle King",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Taylor R.",
    avatar: "/reviews/taylor.jpg",
    date: "2024-12-10",
    rating: 4,
    text: "Golden Melt is my go-to. Three cheeses sounds like overkill but it works. Caramelized onions are perfectly jammy. Fries are crisp every time.",
    burger: "Golden Melt",
    verified: true,
  },
  {
    id: "rev-4",
    author: "Casey L.",
    avatar: "/reviews/casey.jpg",
    date: "2024-12-08",
    rating: 5,
    text: "Inferno Beast — the heat builds beautifully. Not just pain, actual flavor. Ghost pepper sauce has depth. Ranch drizzle is essential. Get the cajun fries.",
    burger: "Inferno Beast",
    verified: true,
  },
  {
    id: "rev-5",
    author: "Morgan T.",
    avatar: "/reviews/morgan.jpg",
    date: "2024-12-05",
    rating: 5,
    text: "Ultimate Prime is a once-in-a-lifetime burger. Foie gras torchon on a burger sounds crazy but the texture contrast with the dry-aged beef is incredible.",
    burger: "Ultimate Prime",
    verified: true,
  },
  {
    id: "rev-6",
    author: "Riley S.",
    avatar: "/reviews/riley.jpg",
    date: "2024-12-03",
    rating: 4,
    text: "Crunch Royale delivers on texture. Onion ring tower is impressive. Smashed patty has great crust. Ranch is house-made and tangy. Solid 9/10.",
    burger: "Crunch Royale",
    verified: true,
  },
];