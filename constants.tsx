
import { MenuItem, Testimonial, BlogPost, Recipe } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    title: "Slow-Braised Lamb Shank",
    desc: "Tender lamb served with truffle mash, roasted root vegetables, and a red wine jus.",
    price: 245,
    currency: "R",
    category: "Mains",
    img: "https://images.unsplash.com/photo-1603073163308-9654c3fb70b5?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "Wild Mushroom Risotto",
    desc: "Arborio rice, porcini mushrooms, parmesan crisp, and truffle oil drizzle.",
    price: 185,
    currency: "R",
    category: "Vegetarian",
    img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "Pan-Seared Salmon",
    desc: "Norwegian salmon with lemon butter sauce, asparagus, and quinoa salad.",
    price: 260,
    currency: "R",
    category: "Keto",
    img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    title: "Duck Confit",
    desc: "Crispy skin duck leg with fondant potatoes and an orange-ginger glaze.",
    price: 230,
    currency: "R",
    category: "Mains",
    img: "https://images.unsplash.com/photo-1580959375944-abd7e991f971?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 5,
    title: "Roasted Butternut Gnocchi",
    desc: "Hand-rolled gnocchi with sage butter, roasted pumpkin seeds, and feta.",
    price: 175,
    currency: "R",
    category: "Vegetarian",
    img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 6,
    title: "Herb-Crusted Chicken",
    desc: "Free-range chicken breast with cauliflower puree and sautéed greens.",
    price: 190,
    currency: "R",
    category: "Keto",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Elena Richardson",
    role: "Food Critic",
    content: "The attention to detail in the plating instructions transformed my Tuesday night into a Michelin-star experience.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    id: 2,
    name: "David Chen",
    role: "Entrepreneur",
    content: "The braised lamb shank fell off the bone. Absolutely superb quality that stays fresh during delivery.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Busy Parent",
    content: "Finding gourmet Keto options that actually taste good is rare. SuCooked is a lifesaver for our weekly planning.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&h=400&q=80"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Sourcing: From Farm to Your Table",
    excerpt: "Discover how we select our partners and why regenerative farming is at the heart of our culinary philosophy.",
    date: "May 12, 2024",
    author: "Chef Marco",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Truffle Season: The Diamond of the Kitchen",
    excerpt: "Exploring the history and flavor profiles of the world's most coveted fungi.",
    date: "April 28, 2024",
    author: "Chef Sarah",
    category: "Ingredients",
    image: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Mastering the Perfect Sear",
    excerpt: "A step-by-step guide to achieving restaurant-quality crust on your home-prepared meats.",
    date: "April 15, 2024",
    author: "Executive Chef Marco",
    category: "Tutorial",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80"
  }
];

export const RECIPE_ITEMS: Recipe[] = [
  {
    id: 1,
    title: "Velvet Cauliflower Purée",
    time: "30 mins",
    difficulty: "Easy",
    description: "The secret to our signature keto-friendly side dish.",
    image: "https://images.unsplash.com/photo-1621841957884-1210fe19d66d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "48-Hour Red Wine Jus",
    time: "2 days",
    difficulty: "Advanced",
    description: "A masterclass in reduction and flavor concentration.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Charred Asparagus with Gremolata",
    time: "15 mins",
    difficulty: "Intermediate",
    description: "Bright, fresh, and the perfect companion for any main.",
    image: "https://images.unsplash.com/photo-1515471209610-dae1c92d8777?auto=format&fit=crop&w=800&q=80"
  }
];
