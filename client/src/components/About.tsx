import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-pink/10 bg-soft-texture">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=800" 
                alt="About Lash Doll Nottingham" 
                className="rounded-xl shadow-lg w-full h-auto object-cover z-10 relative"
              />
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 h-full w-full border-2 border-accent rounded-xl z-0"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full"></div>
            </div>
          </motion.div>
          
          {/* Content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif-italic mb-2">About Lash Doll Nottingham</h2>
            <div className="w-24 h-1 bg-accent mb-6"></div>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              Welcome to Lash Doll – Nottingham's premier destination for luxury lash extensions and beauty treatments. Our team of highly trained technicians are passionate about creating bespoke looks that enhance your natural beauty.
            </p>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              Founded with a vision to provide exceptional service in a luxurious environment, we pride ourselves on using only the highest quality products and cutting-edge techniques to ensure you leave feeling beautiful and confident.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <Card className="border-0 soft-shadow service-card-hover bg-white">
                <CardContent className="flex items-center p-6">
                  <div className="bg-gradient-gold rounded-full p-3 mr-5 text-accent-foreground shimmer">
                    <i className="fas fa-certificate text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold font-serif text-lg">Certified Artists</h3>
                    <p className="text-muted-foreground">Highly trained specialists</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 soft-shadow service-card-hover bg-white">
                <CardContent className="flex items-center p-6">
                  <div className="bg-gradient-gold rounded-full p-3 mr-5 text-accent-foreground shimmer">
                    <i className="fas fa-gem text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold font-serif text-lg">Premium Products</h3>
                    <p className="text-muted-foreground">Only the finest materials</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 soft-shadow service-card-hover bg-white">
                <CardContent className="flex items-center p-6">
                  <div className="bg-gradient-gold rounded-full p-3 mr-5 text-accent-foreground shimmer">
                    <i className="fas fa-star text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold font-serif text-lg">Luxurious Experience</h3>
                    <p className="text-muted-foreground">Relaxing salon environment</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 soft-shadow service-card-hover bg-white">
                <CardContent className="flex items-center p-6">
                  <div className="bg-gradient-gold rounded-full p-3 mr-5 text-accent-foreground shimmer">
                    <i className="fas fa-heart text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold font-serif text-lg">Personalized Service</h3>
                    <p className="text-muted-foreground">Tailored to your needs</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
