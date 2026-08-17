import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaInfoCircle, FaImages, FaEnvelope, FaMoon, FaSun, FaBars, FaGraduationCap, FaArrowRight } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "../ui/sheet";
import { cn } from "../../lib/utils";
import Logo from "../Logo/Logo";
import school from "../../lib/school";

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

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-background/85 backdrop-blur-lg border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-[64px] md:h-[72px] gap-3">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-border bg-card/80 p-1 shadow-soft">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive(item.path) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-bold min-h-[40px] flex items-center transition-colors",
                isActive(item.path)
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.text}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <FaMoon className="h-4 w-4" /> : <FaSun className="h-4 w-4" />}
          </Button>
          <Button asChild size="sm">
            <Link to="/contact">
              Enquire <FaArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <FaMoon className="h-4 w-4" /> : <FaSun className="h-4 w-4" />}
          </Button>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu" className="shadow-none">
                <FaBars className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] max-w-[90vw] p-0 flex flex-col">
              <div className="p-6 border-b-2 border-border flex items-center justify-between">
                <Logo onClick={() => setSheetOpen(false)} />
              </div>
              <nav className="flex flex-col gap-2 p-6 flex-1">
                {menuItems.map((item, i) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setSheetOpen(false)}
                        aria-current={isActive(item.path) ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl border-2 px-4 py-4 font-bold min-h-[56px]",
                          isActive(item.path)
                            ? "border-border bg-foreground text-background"
                            : "border-border/50 bg-card text-foreground"
                        )}
                      >
                        <IconComponent className="h-5 w-5" aria-hidden />
                        {item.text}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <div className="p-6 border-t-2 border-border space-y-3">
                <Button asChild size="lg" className="w-full">
                  <Link to="/contact" onClick={() => setSheetOpen(false)}>
                    Enquire about admission <FaArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  {school.contact.phone} · {school.contact.email}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
