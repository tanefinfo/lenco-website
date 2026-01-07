import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Works from "./pages/Works";
import Products from "./pages/Products";
import Studio from "./pages/Studio";
import Galleries from "./pages/Galleries";

import Events from "./pages/Events";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import ProductDetail from "./pages/ProductDetail";
import Festivals from "./pages/Festivals";
import Awards from "./pages/AwardsFrontend";
import EventDetail from "./pages/EventDetail";
import AwardsFrontend from "./pages/AwardsFrontend";
import { LanguageProvider } from "./Context/LanguageContext";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* <BrowserRouter> */}
        {/* <LanguageProvider> */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/:id" element={<ProjectDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/galleries" element={<Galleries />} />
          <Route path="/festivals" element={<Festivals />} />
          <Route path="/awards" element={<AwardsFrontend />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* </LanguageProvider> */}
      {/* </BrowserRouter> */}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
