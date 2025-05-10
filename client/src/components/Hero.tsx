import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="pt-24 md:pt-0 relative bg-soft-texture">
      {/* Background Image - Lash Model */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('/hero.png')",
          filter: "brightness(0.95)"
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/75 to-accent/65" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="min-h-screen flex flex-col justify-center items-start py-20 md:w-2/3 lg:w-1/2">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif-italic leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Luxury Lashes, Unmatched Perfection
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white mb-10 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Indulge in our premium beauty services, from flawless lashes to rejuvenating skincare treatments.
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
              className="bg-gradient-gold hover:bg-accent text-accent-foreground font-medium rounded-full px-8 py-6 btn-glow gold-glow"
            >
              <a href="#book-now">Book Your Appointment</a>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="bg-white/90 hover:bg-white text-primary border-white/80 rounded-full px-8 py-6 hover-glow"
            >
              <a href="#services">View Our Services</a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="w-20 h-20 rounded-full bg-accent/30 backdrop-blur-sm"
        />
      </div>
      <div className="absolute bottom-32 right-32 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ 
            duration: 3,
            delay: 0.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="w-12 h-12 rounded-full bg-primary/30 backdrop-blur-sm"
        />
      </div>
    </section>
  );
}
