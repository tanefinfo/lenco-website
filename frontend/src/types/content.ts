export type ProjectCategory = "Films" | "Music Videos" | "Commercials";
export type ProductCategory =
  | "Apparel"
  | "Accessories"
  | "Equipment"
  | "Lighting"
  | "Audio"
  | "Prints";
export type StoryCategory =
  | "Behind the Scenes"
  | "Academy Success"
  | "Industry Insights";
export type EventType = "upcoming" | "past";

export interface ProjectCredit {
  role: string;
  name: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  credits: ProjectCredit[];
  year: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  duration: string;
  level: string;
  image: string;
  curriculum: string[];
  outcomes: string[];
  price: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  price: string;
  image: string;
  gallery: string[];
  category: ProductCategory;
  story: string;
}

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: StoryCategory;
  readTime: string;
  date: string;
  author: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  type: EventType;
  gallery?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  embedUrl?: string;
}

export interface Profile {
  portraitUrl: string;
  portraitLocal?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
}
