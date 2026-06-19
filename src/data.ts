import { Book, Collection, SubscriptionTier } from "./types";

export const BOOKS: Book[] = [
  {
    id: 701,
    title: "Mastering Web Development",
    author: "Danielle Vance",
    price: 499,
    collection: "tech",
    tags: ["tech", "bestseller"],
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 702,
    title: "The Digital Marketing Playbook",
    author: "Marcus Sterling",
    price: 299,
    collection: "business",
    tags: ["business", "bestseller"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 703,
    title: "Data Analysis Fundamentals",
    author: "Dr. K. Srinivasan",
    price: 649,
    collection: "analytics",
    tags: ["analytics", "top-rated"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 704,
    title: "UI/UX Geometric Layout Systems",
    author: "Elena Rostova",
    price: 399,
    collection: "design",
    tags: ["design", "new"],
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 705,
    title: "Neural Networks Engineering",
    author: "Dr. K. Srinivasan",
    price: 1149,
    collection: "tech",
    tags: ["tech", "new", "top-rated"],
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 706,
    title: "Conversion Automation Blueprints",
    author: "Marcus Sterling",
    price: 549,
    collection: "business",
    tags: ["business", "top-rated"],
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 707,
    title: "TypeScript Compiler Deep Dive",
    author: "Danielle Vance",
    price: 799,
    collection: "tech",
    tags: ["tech", "new"],
    img: "https://images.unsplash.com/photo-1516116211223-5c359a36298a?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 708,
    title: "Designing for Spatial Computing",
    author: "Elena Rostova",
    price: 899,
    collection: "design",
    tags: ["design", "top-rated", "bestseller"],
    img: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=400&q=80",
  }
];

export const COLLECTIONS: Collection[] = [
  {
    slug: "bestseller",
    title: "Best Sellers",
    desc: "High-velocity manuals leading download charts.",
    img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    badge: "Hot",
  },
  {
    slug: "new",
    title: "New Arrivals",
    desc: "Freshly compiled frameworks on modern architecture.",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    badge: "Fresh",
  },
  {
    slug: "top-rated",
    title: "Top Rated",
    desc: "Highest peer-reviewed resource packages.",
    img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    badge: "5-Star",
  },
  {
    slug: "tech",
    title: "Coding & Tech",
    desc: "Code-heavy blueprints for engineering.",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    badge: null,
  },
  {
    slug: "business",
    title: "Growth Strategy",
    desc: "High-conversion blueprints for market scale.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    badge: null,
  },
  {
    slug: "design",
    title: "UI/UX Design",
    desc: "Creative layout assets for product designers.",
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=600&q=80",
    badge: null,
  }
];

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: "sub-weekly",
    name: "Weekly Pass",
    price: 299,
    billingCycle: "wk",
    perks: [
      "Full library access (7 days)",
      "Unlimited downloads",
      "All formats included (PDF, EPUB)",
      "Standard reading app"
    ],
    featured: false
  },
  {
    id: "sub-monthly",
    name: "Monthly Access",
    price: 699,
    billingCycle: "mo",
    perks: [
      "Full library access (30 days)",
      "Early access to new titles",
      "Offline reading mode",
      "Priority customer support",
      "Interactive practice sandboxes"
    ],
    featured: true
  },
  {
    id: "sub-annual",
    name: "Annual License",
    price: 4499,
    billingCycle: "yr",
    perks: [
      "Full library access (365 days)",
      "Team sharing (up to 3 seats)",
      "All perks included",
      "Free premium titles every quarter",
      "Dedicated account representative"
    ],
    featured: false
  }
];

export const CAT_NAMES: Record<string, string> = {
  all: "All Books",
  bestseller: "Best Sellers",
  new: "New Arrivals",
  "top-rated": "Top Rated",
  tech: "Coding & Tech",
  business: "Growth Strategy",
  analytics: "Data Analytics",
  design: "UI/UX Design"
};
