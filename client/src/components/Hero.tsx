import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="pt-24 md:pt-0 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1607006344380-b6775a0824a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')",
          filter: "brightness(0.9)"
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/80 to-primary/70" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="min-h-screen flex flex-col justify-center items-start py-20 md:w-2/3 lg:w-1/2">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Luxury Lashes, Unmatched Perfection
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Indulge in our exquisite lash services and treat yourself to flawless beauty.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button 
              asChild
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full"
            >
              <a href="#book-now">Book Your Appointment</a>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="bg-white hover:bg-gray-100 text-primary border-white rounded-full"
            >
              <a href="#services">View Our Services</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
