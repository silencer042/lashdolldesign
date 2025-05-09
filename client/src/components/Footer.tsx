import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulating API call
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

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 font-serif">Lash Doll</h3>
            <p className="text-gray-400 mb-4">
              Creating beautiful, long-lasting lash extensions for our clients in Nottingham.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-400 hover:text-primary transition duration-300"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-400 hover:text-primary transition duration-300"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-400 hover:text-primary transition duration-300"
                aria-label="TikTok"
              >
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition duration-300">Home</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition duration-300">Services</a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-400 hover:text-primary transition duration-300">Gallery</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-primary transition duration-300">About</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-primary transition duration-300">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Opening Hours</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-400">Monday - Friday</span>
                <span className="text-gray-400">10:00 - 19:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Saturday</span>
                <span className="text-gray-400">09:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Sunday</span>
                <span className="text-gray-400">10:00 - 16:00</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to receive updates on our latest offers and promotions.
            </p>
            <form className="flex" onSubmit={handleSubmit}>
              <div className="flex-grow">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-lg border-gray-700 bg-gray-800 text-white focus:ring-primary"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-r-lg"
                disabled={isSubmitting}
              >
                <i className="fas fa-paper-plane"></i>
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} Lash Doll Nottingham. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
