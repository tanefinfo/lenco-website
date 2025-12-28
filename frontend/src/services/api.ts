import type {
  Event,
  Mentor,
  Product,
  Program,
  Project,
  Service,
  Story,
  WorkflowStep,
  VideoItem,
  Profile,
  Testimonial,
} from "@/types/content";
import projectsData from "@/data/projects.json";
import programsData from "@/data/programs.json";
import productsData from "@/data/products.json";
import storiesData from "@/data/stories.json";
import eventsData from "@/data/events.json";
import servicesData from "@/data/services.json";
import videosData from "@/data/videos.json";
import profileData from "@/data/profile.json";
import testimonialsData from "@/data/testimonials.json";

export async function getProjects(): Promise<Project[]> {
  return projectsData.projects as Project[];
}

export async function getProject(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.id === id);
}

export async function getPrograms(): Promise<Program[]> {
  return programsData.programs as Program[];
}

export async function getProgram(id: string): Promise<Program | undefined> {
  const programs = await getPrograms();
  return programs.find((program) => program.id === id);
}

export async function getMentors(): Promise<Mentor[]> {
  return (programsData.mentors ?? []) as Mentor[];
}

export async function getProducts(): Promise<Product[]> {
  return productsData.products as Product[];
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((product) => product.id === id);
}

export async function getStories(): Promise<Story[]> {
  return storiesData.stories as Story[];
}

export async function getStory(id: string): Promise<Story | undefined> {
  const stories = await getStories();
  return stories.find((story) => story.id === id);
}

export async function getEvents(): Promise<Event[]> {
  return eventsData.events as Event[];
}

export async function getEvent(id: string): Promise<Event | undefined> {
  const events = await getEvents();
  return events.find((event) => event.id === id);
}

export async function getServices(): Promise<{
  services: Service[];
  workflow: WorkflowStep[];
}> {
  return {
    services: servicesData.services as Service[],
    workflow: servicesData.workflow as WorkflowStep[],
  };
}

export async function getVideos(): Promise<{
  musicVideos: VideoItem[];
  movieTrailers: VideoItem[];
  academyVideos: VideoItem[];
}> {
  return {
    musicVideos: videosData.musicVideos as VideoItem[],
    movieTrailers: videosData.movieTrailers as VideoItem[],
    academyVideos: videosData.academyVideos as VideoItem[],
  };
}

export async function getProfile(): Promise<Profile> {
  return profileData as Profile;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonialsData as Testimonial[];
}
