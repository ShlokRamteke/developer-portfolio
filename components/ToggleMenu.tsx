import { useState } from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

const SideTabMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleMenu}
      >
        <span className="sr-only">Toggle menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </Button>

      {/* Side Tab Menu */}
      <div
        className={`fixed inset-x-0 top-0 w-full bg-background border-b shadow-lg transform transition-all duration-300 ease-in-out z-50 theme-transition ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="p-4 bg-background theme-transition">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-foreground">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="18" x2="6" y1="6" y2="18" />
                <line x1="6" x2="18" y1="6" y2="18" />
              </svg>
            </Button>
          </div>
          <nav>
            <a
              href="#about"
              className="block px-4 py-2 text-sm text-foreground hover:bg-muted rounded transition-colors theme-transition"
              onClick={closeMenu}
            >
              About
            </a>
            <a
              href="#projects"
              className="block px-4 py-2 text-sm text-foreground hover:bg-muted rounded transition-colors theme-transition"
              onClick={closeMenu}
            >
              Projects
            </a>
            <a
              href="#skills"
              className="block px-4 py-2 text-sm text-foreground hover:bg-muted rounded transition-colors theme-transition"
              onClick={closeMenu}
            >
              Skills
            </a>
            <a
              href="#contact"
              className="block px-4 py-2 text-sm text-foreground hover:bg-muted rounded transition-colors theme-transition"
              onClick={closeMenu}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 theme-transition"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};

export default SideTabMenu;
