import { Link } from "react-router-dom";
import { Instagram, Youtube, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = {
  platform: [
    { name: "Works", path: "/works" },
    { name: "Academy", path: "/academy" },
    { name: "Products", path: "/products" },
    { name: "Studio", path: "/studio" },
  ],
  resources: [
    { name: "Stories", path: "/stories" },
    { name: "Events", path: "/events" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ],
};

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/lenchofikru/",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://www.youtube.com/@AbbaaLataaActingAcademy",
  },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link
              to="/"
              className="text-3xl font-bold tracking-wider text-foreground"
            >
              LenchoFikiru
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Director, filmmaker, and creative leader crafting Oromo music
              videos and films with cultural respect and cinematic polish.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-6">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-foreground font-semibold mb-6">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe for updates on new projects, academy programs, and
              events.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-muted border-border"
              />
              <Button type="submit" variant="default" size="sm">
                Join
              </Button>
            </form>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@lenchofikiru.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Lencho Fikiru. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
