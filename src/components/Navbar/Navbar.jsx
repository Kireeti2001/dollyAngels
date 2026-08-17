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
          "flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold min-h-[44px] relative transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-foreground hover:bg-secondary hover:text-secondary-foreground dark:hover:bg-accent dark:hover:text-accent-foreground"
        )}
      >
        <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="flex items-center">
          <IconComponent className="h-5 w-5" aria-hidden />
        </motion.span>
        <span>{item.text}</span>
        {isActive && (
          <motion.span
            layoutId="nav-pill"
            className="absolute bottom-1 left-2 right-2 h-0.5 rounded-full bg-white/90"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between min-h-[56px] md:min-h-[64px]">
        <Logo />

        {isMobile ? (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "light" ? <FaMoon className="h-5 w-5" /> : <FaSun className="h-5 w-5" />}
            </Button>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <FaBars className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <SheetTitle className="font-heading text-primary">Menu</SheetTitle>
                <nav className="flex flex-col gap-1 pt-6">
                  {menuItems.map((item, i) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
                    >
                      <NavLink item={item} onClick={() => setSheetOpen(false)} />
                    </motion.div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            {menuItems.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
            <Button
              variant="default"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="ml-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {theme === "light" ? <FaMoon className="h-5 w-5" /> : <FaSun className="h-5 w-5" />}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
