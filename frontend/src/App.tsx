import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Works from "./pages/Works";
import Academy from "./pages/Academy";
import Products from "./pages/Products";
import Studio from "./pages/Studio";
import Stories from "./pages/Stories";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import ProgramDetail from "./pages/ProgramDetail";
import ProductDetail from "./pages/ProductDetail";
import StoryDetail from "./pages/StoryDetail";
import EventDetail from "./pages/EventDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/:id" element={<ProjectDetail />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/academy/:id" element={<ProgramDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:id" element={<StoryDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
