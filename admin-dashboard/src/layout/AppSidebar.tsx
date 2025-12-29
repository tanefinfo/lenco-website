import { useCallback,  } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Info,
  Briefcase,
  Award,
  Image,

} from "lucide-react";
import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const navItems: NavItem[] = [
  {
    name: "Home",
    icon: <Home size={20} />,
    path: "/",
  },
  {
    name: "About",
    icon: <Info size={20} />,
    path: "/about",
  },
  {
    name: "Works",
    icon: <Briefcase size={20} />,
    path: "/works",
  },
  {
    name: "Awards",
    icon: <Award size={20} />,
    path: "/awards",
  },
  {
    name: "Galleries",
    icon: <Image size={20} />,
    path: "/galleries",
  },
];

const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 transition-all duration-300
        ${
          isExpanded || isHovered
            ? "w-[260px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b">
        <Link to="/">
          <img
            src="/images/logo/logo.svg"
            alt="Logo"
            className="h-10"
          />
        </Link>
      </div>

      {/* Menu */}
      <nav className="mt-6 px-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
              ${
                isActive(item.path)
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
          >
            {item.icon}
            {(isExpanded || isHovered) && (
              <span className="text-sm font-medium">{item.name}</span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AppSidebar;
