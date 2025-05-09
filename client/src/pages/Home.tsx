import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");
      
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 80,
            behavior: "smooth",
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", handleAnchorClick as EventListener);
    });

    // Back to top button visibility
    const backToTopButton = document.querySelector(".back-to-top");
    
    const toggleBackToTopButton = () => {
      if (backToTopButton) {
        if (window.scrollY > 300) {
          backToTopButton.classList.remove("opacity-0");
          backToTopButton.classList.add("opacity-100");
        } else {
          backToTopButton.classList.remove("opacity-100");
          backToTopButton.classList.add("opacity-0");
        }
      }
    };

    window.addEventListener("scroll", toggleBackToTopButton);

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener("click", handleAnchorClick as EventListener);
      });
      window.removeEventListener("scroll", toggleBackToTopButton);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      
      {/* Back to top button */}
      <a 
        href="#" 
        className="back-to-top fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white rounded-full p-3 shadow-lg transition duration-300 opacity-0 z-50"
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up"></i>
      </a>
    </div>
  );
}
