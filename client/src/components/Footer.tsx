import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      // Submit subscription
      await apiRequest("POST", "/api/newsletter", { email });
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-soft-texture"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={item}>
            <h3 className="text-3xl font-bold mb-6 font-serif-italic text-white">Lash Doll</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Creating beautiful, long-lasting lash extensions for our clients in Nottingham with premium quality and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/lashdollnottingham/" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-400 hover:text-accent transition-all duration-300 gold-glow text-xl"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-400 hover:text-accent transition-all duration-300 gold-glow text-xl"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-400 hover:text-accent transition-all duration-300 gold-glow text-xl"
                aria-label="TikTok"
              >
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={item}>
            <h4 className="font-semibold mb-6 text-lg text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-all duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2 text-accent"></i>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-accent transition-all duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2 text-accent"></i>
                  <span>Services</span>
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-300 hover:text-accent transition-all duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2 text-accent"></i>
                  <span>Gallery</span>
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-accent transition-all duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2 text-accent"></i>
                  <span>About</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-accent transition-all duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2 text-accent"></i>
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={item}>
            <h4 className="font-semibold mb-6 text-lg text-white">Opening Hours</h4>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-300">Monday - Friday</span>
                <span className="text-accent">10:00 - 19:00</span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-300">Saturday</span>
                <span className="text-accent">09:00 - 18:00</span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-300">Sunday</span>
                <span className="text-accent">10:00 - 16:00</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={item}>
            <h4 className="font-semibold mb-6 text-lg text-white">Newsletter</h4>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Subscribe to receive updates on our latest offers, promotions, and beauty tips.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-6 rounded-xl border-gray-700 bg-gray-800/50 text-white focus:ring-accent"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-gold hover:bg-accent text-accent-foreground font-medium py-6 rounded-xl gold-glow"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-circle-notch fa-spin mr-2"></i> Subscribing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-paper-plane mr-2"></i> Subscribe Now
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Lash Doll Nottingham. All rights reserved.</p>
          <div className="mt-4 text-sm text-gray-500 flex justify-center space-x-4">
            <a href="#" className="hover:text-accent transition-all duration-300">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-accent transition-all duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
