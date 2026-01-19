
export type Category = 'All' | 'Mains' | 'Vegetarian' | 'Keto';
export type View = 'home' | 'meals' | 'recipes' | 'catering' | 'about' | 'blog';

export interface MenuItem {
  id: number;
  title: string;
  desc: string;
  price: number;
  currency: string;
  category: Category;
  img: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

export interface Recipe {
  id: number;
  title: string;
  time: string;
  difficulty: string;
  image: string;
  description: string;
}
