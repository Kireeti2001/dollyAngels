import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaInfoCircle, FaImages, FaEnvelope, FaMoon, FaSun, FaBars, FaGraduationCap } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { cn } from "../../lib/utils";
import Logo from "../Logo/Logo";

const menuItems = [
  { path: "/home", icon: FaHome, text: "Home" },
  { path: "/about", icon: FaInfoCircle, text: "About" },
  { path: "/programs", icon: FaGraduationCap, text: "Programs" },
  { path: "/gallery", icon: FaImages, text: "Gallery" },
  { path: "/contact", icon: FaEnvelope, text: "Contact" },
];

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const NavLink = ({ item, onClick }) => {
    const IconComponent = item.icon;
    const isActive = location.pathname === item.path;
    return (
      <Link
        to={item.path}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold min-h-[44px] transition-all border-2",
          isActive
            ? "bg-foreground text-background border-border shadow-hard-sm"
            : "text-foreground border-transparent hover:border-border hover:bg-card"
        )}
      >
        <IconComponent className="h-4 w-4" aria-hidden />
        <span>{item.text}</span>
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-background/90 backdrop-blur-md border-b-2 border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between min-h-[64px] md:min-h-[72px]">
        <Logo />

        {isMobile ? (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="shadow-none">
              {theme === "light" ? <FaMoon className="h-4 w-4" /> : <FaSun className="h-4 w-4" />}
            </Button>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu" className="shadow-none">
                  <FaBars className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] border-l-2">
                <SheetTitle className="font-heading text-foreground">Menu</SheetTitle>
                <nav className="flex flex-col gap-2 pt-6">
                  {menuItems.map((item, i) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <NavLink item={item} onClick={() => setSheetOpen(false)} />
                    </motion.div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            {menuItems.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
            <Button
              variant="default"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="ml-2"
            >
              {theme === "light" ? <FaMoon className="h-4 w-4" /> : <FaSun className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
