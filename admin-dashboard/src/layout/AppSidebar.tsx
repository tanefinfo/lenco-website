import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
    LayoutDashboard,
    ShoppingCart,
    Users,
    Calendar,
    FileText,
    Table,
    ChevronDown,
    MoreHorizontal,
    BarChart3,
    Boxes,
    Plug,
} from "lucide-react";

import { useSidebar } from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";

type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
    {
        name: "Dashboard",
        icon: <LayoutDashboard />,
        subItems: [{ name: "Ecommerce", path: "/" }],
    },
    {
        name: "Orders",
        icon: <ShoppingCart />,
        path: "/orders",
    },
    {
        name: "Customers",
        icon: <Users />,
        path: "/customers",
    },
    {
        name: "Calendar",
        icon: <Calendar />,
        path: "/calendar",
    },
];

const othersItems: NavItem[] = [
    {
        name: "Reports",
        icon: <BarChart3 />,
        subItems: [
            { name: "Sales", path: "/reports/sales" },
            { name: "Revenue", path: "/reports/revenue", new: true },
        ],
    },
    {
        name: "Tables",
        icon: <Table />,
        path: "/tables",
    },
    {
        name: "UI Elements",
        icon: <Boxes />,
        path: "/ui-elements",
    },
    {
        name: "Auth",
        icon: <Plug />,
        subItems: [
            { name: "Sign In", path: "/signin" },
            { name: "Sign Up", path: "/signup" },
        ],
    },
];

const AppSidebar: React.FC = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const location = useLocation();

    const [openSubmenu, setOpenSubmenu] = useState<{
        type: "main" | "others";
        index: number;
    } | null>(null);

    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
        {}
    );

    const isActive = useCallback(
        (path: string) => location.pathname === path,
        [location.pathname]
    );

    useEffect(() => {
        ["main", "others"].forEach((type) => {
            const items = type === "main" ? navItems : othersItems;
            items.forEach((nav, index) => {
                nav.subItems?.forEach((sub) => {
                    if (isActive(sub.path)) {
                        setOpenSubmenu({ type: type as any, index });
                    }
                });
            });
        });
    }, [isActive]);

    useEffect(() => {
        if (openSubmenu) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;
            const el = subMenuRefs.current[key];
            if (el) {
                setSubMenuHeight((p) => ({ ...p, [key]: el.scrollHeight }));
            }
        }
    }, [openSubmenu]);

    const renderMenuItems = (items: NavItem[], type: "main" | "others") => (
        <ul className="flex flex-col gap-2">
            {items.map((nav, index) => {
                const isOpen =
                    openSubmenu?.type === type && openSubmenu?.index === index;

                return (
                    <li key={nav.name}>
                        {nav.subItems ? (
                            <button
                                onClick={() =>
                                    setOpenSubmenu(
                                        isOpen ? null : { type, index }
                                    )
                                }
                                className={`menu-item ${
                                    isOpen
                                        ? "menu-item-active"
                                        : "menu-item-inactive"
                                }`}
                            >
                                <span className="menu-item-icon-size">
                                    {nav.icon}
                                </span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <>
                                        <span className="menu-item-text">
                                            {nav.name}
                                        </span>
                                        <ChevronDown
                                            className={`ml-auto transition ${
                                                isOpen
                                                    ? "rotate-180 text-brand-500"
                                                    : ""
                                            }`}
                                        />
                                    </>
                                )}
                            </button>
                        ) : (
                            nav.path && (
                                <Link
                                    to={nav.path}
                                    className={`menu-item ${
                                        isActive(nav.path)
                                            ? "menu-item-active"
                                            : "menu-item-inactive"
                                    }`}
                                >
                                    <span className="menu-item-icon-size">
                                        {nav.icon}
                                    </span>
                                    {(isExpanded ||
                                        isHovered ||
                                        isMobileOpen) && (
                                        <span className="menu-item-text">
                                            {nav.name}
                                        </span>
                                    )}
                                </Link>
                            )
                        )}

                        {nav.subItems &&
                            (isExpanded || isHovered || isMobileOpen) && (
                                <div
                                    ref={(el) =>
                                        (subMenuRefs.current[
                                            `${type}-${index}`
                                        ] = el)
                                    }
                                    style={{
                                        height: isOpen
                                            ? subMenuHeight[`${type}-${index}`]
                                            : 0,
                                    }}
                                    className="overflow-hidden transition-all duration-300"
                                >
                                    <ul className="ml-9 mt-2 space-y-1">
                                        {nav.subItems.map((sub) => (
                                            <li key={sub.name}>
                                                <Link
                                                    to={sub.path}
                                                    className={`menu-dropdown-item ${
                                                        isActive(sub.path)
                                                            ? "menu-dropdown-item-active"
                                                            : "menu-dropdown-item-inactive"
                                                    }`}
                                                >
                                                    {sub.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                    </li>
                );
            })}
        </ul>
    );

    return (
        <aside
            className={`fixed top-0 left-0 h-screen border-r bg-white dark:bg-gray-900 transition-all
        ${isExpanded || isHovered ? "w-[290px]" : "w-[90px]"}`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <nav className="px-5 mt-16 space-y-6">
                <div>
                    <h2 className="sidebar-title">
                        {isExpanded ? "Menu" : <MoreHorizontal />}
                    </h2>
                    {renderMenuItems(navItems, "main")}
                </div>

                <div>
                    <h2 className="sidebar-title">
                        {isExpanded ? "Others" : <MoreHorizontal />}
                    </h2>
                    {renderMenuItems(othersItems, "others")}
                </div>
            </nav>

            {(isExpanded || isHovered) && <SidebarWidget />}
        </aside>
    );
};

export default AppSidebar;
