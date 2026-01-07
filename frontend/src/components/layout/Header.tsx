import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "../../Context/LanguageContext"; // ✅ FIXED PATH


const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Works", path: "/works" },
  { name: "Awards", path: "/awards" },
  { name: "Galleries", path: "/galleries" },
  { name: "Events", path: "/events" },
  { name: "Festivals", path: "/festivals" },
  { name: "Studio", path: "/studio" },
  { name: "Contact", path: "/contact" },
];

const productsLink = { name: "Products", path: "/products" };

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // ✅ FIXED
  const location = useLocation();

  const { language, setLanguage, languages } = useLanguage();

  useEffect(() => {
    const handler = (e: MouseEvent) => { // ✅ FIXED
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary via-white/30 to-primary/70 shadow-lg">
              <span className="text-sm font-bold text-background">LF</span>
            </span>
            <div>
              <div className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                Lencho Fikiru
              </div>
              <div className="text-[11px] md:text-xs text-muted-foreground whitespace-nowrap leading-tight">
                Director · Filmmaker · Creative Leader
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 ml-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors hover-underline",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}

            <Button
              asChild
              size="sm"
              className="ml-3 shadow-md"
              variant={
                location.pathname === productsLink.path
                  ? "secondary"
                  : "default"
              }
            >
              <Link to={productsLink.path}>{productsLink.name}</Link>
            </Button>

            {/* Language Dropdown */}
            <div
              ref={dropdownRef}
              className="relative ml-4 pl-4 border-l border-border/60"
            >
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/15 via-background to-muted/60 px-3 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-border/70 hover:ring-primary/50 transition"
              >
                <img
                  src={language.flagSrc}
                  alt={language.label}
                  className="h-4 w-6 rounded-sm ring-1 ring-border object-cover"
                />
                <span>{language.short}</span>
                <span className="text-xs opacity-70">▾</span>
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-xl border border-border bg-background shadow-lg overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => {
                        setLanguage(lang);
                        setLangOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-2 text-sm",
                        language.value === lang.value
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <img
                          src={lang.flagSrc}
                          alt={lang.label}
                          className="h-4 w-6 rounded-sm ring-1 ring-border object-cover"
                        />
                        {lang.label}
                      </span>
                      {language.value === lang.value && (
                        <Check className="h-4 w-4" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2 px-4">
              {/* Mobile Language */}
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      "flex-1 rounded-lg px-4 py-3 text-sm font-semibold",
                      language.value === lang.value
                        ? "bg-primary/15 text-primary"
                        : "bg-muted"
                    )}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <img
                        src={lang.flagSrc}
                        alt={lang.label}
                        className="h-4 w-6 rounded-sm"
                      />
                      {lang.short}
                    </span>
                  </button>
                ))}
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-base font-medium",
                    location.pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {link.name}
                </Link>
              ))}

              <Button
                asChild
                size="lg"
                className="mt-2"
                variant={
                  location.pathname === productsLink.path
                    ? "secondary"
                    : "default"
                }
              >
                <Link to={productsLink.path}>Products</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
