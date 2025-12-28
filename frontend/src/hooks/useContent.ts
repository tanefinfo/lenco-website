import { useQuery } from "@tanstack/react-query";
import {
  getEvent,
  getEvents,
  getMentors,
  getProduct,
  getProducts,
  getProgram,
  getPrograms,
  getProject,
  getProjects,
  getServices,
  getVideos,
  getProfile,
  getStories,
  getStory,
  getTestimonials,
} from "@/services/api";
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

const defaultOptions = { staleTime: 5 * 60 * 1000 } as const;

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: getProjects,
    ...defaultOptions,
  });
}

export function useProject(id?: string) {
  return useQuery<Project | undefined>({
    queryKey: ["project", id],
    queryFn: () => getProject(id as string),
    enabled: Boolean(id),
    ...defaultOptions,
  });
}

export function useProfile() {
  return useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: getProfile,
    ...defaultOptions,
  });
}

export function usePrograms() {
  return useQuery<Program[]>({
    queryKey: ["programs"],
    queryFn: getPrograms,
    ...defaultOptions,
  });
}

export function useProgram(id?: string) {
  return useQuery<Program | undefined>({
    queryKey: ["program", id],
    queryFn: () => getProgram(id as string),
    enabled: Boolean(id),
    ...defaultOptions,
  });
}

export function useMentors() {
  return useQuery<Mentor[]>({
    queryKey: ["mentors"],
    queryFn: getMentors,
    ...defaultOptions,
  });
}

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
    ...defaultOptions,
  });
}

export function useProduct(id?: string) {
  return useQuery<Product | undefined>({
    queryKey: ["product", id],
    queryFn: () => getProduct(id as string),
    enabled: Boolean(id),
    ...defaultOptions,
  });
}

export function useStories() {
  return useQuery<Story[]>({
    queryKey: ["stories"],
    queryFn: getStories,
    ...defaultOptions,
  });
}

export function useStory(id?: string) {
  return useQuery<Story | undefined>({
    queryKey: ["story", id],
    queryFn: () => getStory(id as string),
    enabled: Boolean(id),
    ...defaultOptions,
  });
}

export function useEvents() {
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: getEvents,
    ...defaultOptions,
  });
}

export function useEvent(id?: string) {
  return useQuery<Event | undefined>({
    queryKey: ["event", id],
    queryFn: () => getEvent(id as string),
    enabled: Boolean(id),
    ...defaultOptions,
  });
}

export function useServices() {
  return useQuery<{ services: Service[]; workflow: WorkflowStep[] }>({
    queryKey: ["services"],
    queryFn: getServices,
    ...defaultOptions,
  });
}

export function useVideos() {
  return useQuery<{
    musicVideos: VideoItem[];
    movieTrailers: VideoItem[];
    academyVideos: VideoItem[];
  }>({
    queryKey: ["videos"],
    queryFn: getVideos,
    ...defaultOptions,
  });
}

export function useTestimonials() {
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
    ...defaultOptions,
  });
}
