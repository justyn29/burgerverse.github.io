export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  coordinates: { lat: number; lng: number };
  features: string[];
  image: string;
  flagship: boolean;
}

export const locations: Location[] = [
  {
    id: "soho-flagship",
    name: "Soho Flagship",
    address: "478 Broome Street",
    city: "New York",
    state: "NY",
    zip: "10013",
    phone: "(212) 555-0147",
    hours: {
      monday: "11:00 AM – 11:00 PM",
      tuesday: "11:00 AM – 11:00 PM",
      wednesday: "11:00 AM – 11:00 PM",
      thursday: "11:00 AM – 12:00 AM",
      friday: "11:00 AM – 12:00 AM",
      saturday: "10:00 AM – 12:00 AM",
      sunday: "10:00 AM – 10:00 PM",
    },
    coordinates: { lat: 40.7212, lng: -74.0003 },
    features: [
      "Full Bar",
      "Private Dining",
      "Rooftop Seating",
      "Open Kitchen",
      "Sovereign Lounge",
    ],
    image: "/locations/soho.jpg",
    flagship: true,
  },
  {
    id: "west-hollywood",
    name: "West Hollywood",
    address: "8500 Sunset Boulevard",
    city: "Los Angeles",
    state: "CA",
    zip: "90069",
    phone: "(323) 555-0192",
    hours: {
      monday: "11:00 AM – 10:00 PM",
      tuesday: "11:00 AM – 10:00 PM",
      wednesday: "11:00 AM – 10:00 PM",
      thursday: "11:00 AM – 11:00 PM",
      friday: "11:00 AM – 12:00 AM",
      saturday: "10:00 AM – 12:00 AM",
      sunday: "10:00 AM – 10:00 PM",
    },
    coordinates: { lat: 34.0902, lng: -118.3673 },
    features: [
      "Patio Seating",
      "Valet Parking",
      "Late Night Menu",
      "Celebrity Chef Collabs",
    ],
    image: "/locations/weho.jpg",
    flagship: false,
  },
  {
    id: "mission-district",
    name: "Mission District",
    address: "2850 Mission Street",
    city: "San Francisco",
    state: "CA",
    zip: "94110",
    phone: "(415) 555-0138",
    hours: {
      monday: "Closed",
      tuesday: "11:00 AM – 10:00 PM",
      wednesday: "11:00 AM – 10:00 PM",
      thursday: "11:00 AM – 10:00 PM",
      friday: "11:00 AM – 11:00 PM",
      saturday: "10:00 AM – 11:00 PM",
      sunday: "10:00 AM – 9:00 PM",
    },
    coordinates: { lat: 37.7528, lng: -122.4182 },
    features: [
      "Bicycle Parking",
      "Dog-Friendly Patio",
      "Local Art Rotation",
      "Community Table",
    ],
    image: "/locations/mission.jpg",
    flagship: false,
  },
  {
    id: "lincoln-park",
    name: "Lincoln Park",
    address: "2150 N Clark Street",
    city: "Chicago",
    state: "IL",
    zip: "60614",
    phone: "(312) 555-0165",
    hours: {
      monday: "11:00 AM – 10:00 PM",
      tuesday: "11:00 AM – 10:00 PM",
      wednesday: "11:00 AM – 10:00 PM",
      thursday: "11:00 AM – 10:00 PM",
      friday: "11:00 AM – 11:00 PM",
      saturday: "10:00 AM – 11:00 PM",
      sunday: "10:00 AM – 9:00 PM",
    },
    coordinates: { lat: 41.9221, lng: -87.6369 },
    features: [
      "Heated Patio",
      "Fire Pits",
      "Whiskey Library",
      "Game Day Specials",
    ],
    image: "/locations/lincoln-park.jpg",
    flagship: false,
  },
  {
    id: "south-congress",
    name: "South Congress",
    address: "1600 S Congress Avenue",
    city: "Austin",
    state: "TX",
    zip: "78704",
    phone: "(512) 555-0173",
    hours: {
      monday: "11:00 AM – 10:00 PM",
      tuesday: "11:00 AM – 10:00 PM",
      wednesday: "11:00 AM – 10:00 PM",
      thursday: "11:00 AM – 11:00 PM",
      friday: "11:00 AM – 12:00 AM",
      saturday: "10:00 AM – 12:00 AM",
      sunday: "10:00 AM – 10:00 PM",
    },
    coordinates: { lat: 30.2572, lng: -97.7528 },
    features: [
      "Live Music Stage",
      "Food Truck Fridays",
      "Spicy Challenge Wall",
      "Outdoor Bar",
    ],
    image: "/locations/south-congress.jpg",
    flagship: false,
  },
  {
    id: "capitol-hill",
    name: "Capitol Hill",
    address: "1423 E Pike Street",
    city: "Seattle",
    state: "WA",
    zip: "98122",
    phone: "(206) 555-0129",
    hours: {
      monday: "11:00 AM – 10:00 PM",
      tuesday: "11:00 AM – 10:00 PM",
      wednesday: "11:00 AM – 10:00 PM",
      thursday: "11:00 AM – 10:00 PM",
      friday: "11:00 AM – 11:00 PM",
      saturday: "10:00 AM – 11:00 PM",
      sunday: "10:00 AM – 9:00 PM",
    },
    coordinates: { lat: 47.6148, lng: -122.3182 },
    features: [
      "Covered Patio",
      "Coffee Program",
      "Vinyl Listening Booth",
      "Rainy Day Specials",
    ],
    image: "/locations/capitol-hill.jpg",
    flagship: false,
  },
];