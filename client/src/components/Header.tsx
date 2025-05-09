import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

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
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-primary font-serif">Lash Doll</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-foreground hover:text-primary font-medium transition">Home</a>
            <a href="#services" className="text-foreground hover:text-primary font-medium transition">Services</a>
            <a href="#gallery" className="text-foreground hover:text-primary font-medium transition">Gallery</a>
            <a href="#about" className="text-foreground hover:text-primary font-medium transition">About</a>
            <a href="#contact" className="text-foreground hover:text-primary font-medium transition">Contact</a>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#book-now">
              <Button className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full">
                Book Now
              </Button>
            </a>
            
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
                href="#about" 
                className="text-foreground hover:text-primary py-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
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
