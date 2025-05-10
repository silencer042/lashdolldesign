import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <a href="#" className="block">
              <img 
                src="/lushdoll-logo.png" 
                alt="Lash Doll Nottingham" 
                className={`h-14 transition-all duration-300 ${isScrolled ? 'brightness-90' : 'brightness-100'}`}
              />
            </a>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-foreground hover:text-primary font-medium transition-all hover:scale-105">Home</a>
            <a href="#about" className="text-foreground hover:text-primary font-medium transition-all hover:scale-105">About</a>
            <a href="#services" className="text-foreground hover:text-primary font-medium transition-all hover:scale-105">Services</a>
            <a href="#gallery" className="text-foreground hover:text-primary font-medium transition-all hover:scale-105">Gallery</a>
            <a href="#testimonials" className="text-foreground hover:text-primary font-medium transition-all hover:scale-105">Reviews</a>
            <a href="#contact" className="text-foreground hover:text-primary font-medium transition-all hover:scale-105">Contact</a>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <a href="#book-now">
                <Button className="bg-gradient-gold hover:bg-accent text-accent-foreground font-medium rounded-full px-6 py-2 gold-glow">
                  Book Now
                </Button>
              </a>
            </motion.div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 absolute inset-x-0 top-full bg-background shadow-md z-50">
            <div className="flex flex-col space-y-4 px-6">
              <a 
                href="#" 
                className="text-foreground hover:text-primary py-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#about" 
                className="text-foreground hover:text-primary py-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#services" 
                className="text-foreground hover:text-primary py-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#gallery" 
                className="text-foreground hover:text-primary py-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gallery
              </a>
              <a 
                href="#testimonials" 
                className="text-foreground hover:text-primary py-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reviews
              </a>
              <a 
                href="#contact" 
                className="text-foreground hover:text-primary py-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
