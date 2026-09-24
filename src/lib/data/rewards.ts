export interface RewardTier {
  id: string;
  name: string;
  level: number;
  color: string;
  description: string;
  benefits: string[];
  requirement: string;
  icon: string;
}

export const rewardTiers: RewardTier[] = [
  {
    id: "initiate",
    name: "Initiate",
    level: 1,
    color: "#6B7280",
    description: "Welcome to the Verse. Your journey begins.",
    benefits: [
      "10% off first order",
      "Birthday burger on us",
      "Early access to new drops",
      "Digital member card",
    ],
    requirement: "Free to join",
    icon: "sparkles",
  },
  {
    id: "enthusiast",
    name: "Enthusiast",
    level: 2,
    color: "#FF9D00",
    description: "You know good burgers. Now earn from them.",
    benefits: [
      "15% off all orders",
      "Free side with every burger",
      "Double points weekends",
      "Exclusive combo access",
      "Priority support",
    ],
    requirement: "5 orders or $150 spent",
    icon: "flame",
  },
  {
    id: "connoisseur",
    name: "Connoisseur",
    level: 3,
    color: "#FF5A00",
    description: "Taste refined. Status recognized.",
    benefits: [
      "20% off all orders",
      "Free delivery always",
      "Monthly tasting invitations",
      "Reserved seating",
      "Custom burger creation (annual)",
      "Merchandise discount 25%",
    ],
    requirement: "15 orders or $500 spent",
    icon: "crown",
  },
  {
    id: "sovereign",
    name: "Sovereign",
    level: 4,
    color: "#FFD700",
    description: "The pinnacle. Burger royalty.",
    benefits: [
      "25% off all orders for life",
      "Private dining room access",
      "Chef's table experience (quarterly)",
      "Name on Sovereign Wall",
      "Lifetime free burgers (1/month)",
      "Personal concierge",
      "Gold member card",
    ],
    requirement: "50 orders or $2,500 spent",
    icon: "gem",
  },
];

export interface RewardBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const programBenefits: RewardBenefit[] = [
  {
    id: "points",
    title: "Earn Points",
    description: "10 points per $1 spent. Redeem for burgers, sides, merch, and experiences.",
    icon: "coins",
  },
  {
    id: "tiers",
    title: "Tier Progression",
    description: "Four tiers with escalating perks. Your status never expires — once earned, always yours.",
    icon: "trending-up",
  },
  {
    id: "exclusives",
    title: "Exclusive Access",
    description: "Limited-time burgers, secret combos, and collaboration drops — members only.",
    icon: "lock-open",
  },
  {
    id: "events",
    title: "VIP Events",
    description: "Tasting dinners, kitchen tours, chef meet-and-greets, and product launches.",
    icon: "calendar",
  },
  {
    id: "gifting",
    title: "Gift Points",
    description: "Share the love. Transfer points to friends or gift tier upgrades.",
    icon: "gift",
  },
  {
    id: "concierge",
    title: "Concierge",
    description: "Sovereign members get a dedicated concierge for reservations, custom orders, and more.",
    icon: "user-cog",
  },
];

export interface Milestone {
  id: string;
  name: string;
  description: string;
  reward: string;
  icon: string;
}

export const milestones: Milestone[] = [
  {
    id: "first-order",
    name: "First Bite",
    description: "Place your first order",
    reward: "Free fries & drink",
    icon: "burger",
  },
  {
    id: "five-burgers",
    name: "Burger Explorer",
    description: "Try 5 different signature burgers",
    reward: "Exclusive enamel pin",
    icon: "map",
  },
  {
    id: "all-burgers",
    name: "Completionist",
    description: "Try all 7 signature burgers",
    reward: "Custom BurgerVerse knife",
    icon: "check-circle",
  },
  {
    id: "fifty-orders",
    name: "Regular",
    description: "50 lifetime orders",
    reward: "Sovereign tier fast-track",
    icon: "star",
  },
  {
    id: "year-anniversary",
    name: "Anniversary",
    description: "1 year as a member",
    reward: "Anniversary burger (free)",
    icon: "calendar-check",
  },
];