import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="py-20 bg-accent/10">
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
            <img 
              src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=800" 
              alt="About Lash Doll Nottingham" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </motion.div>
          
          {/* Content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">About Lash Doll Nottingham</h2>
            <p className="text-foreground/80 mb-6">
              Welcome to Lash Doll – Nottingham's premier destination for luxury lash extensions and beauty treatments. Our team of highly trained technicians are passionate about creating bespoke looks that enhance your natural beauty.
            </p>
            <p className="text-foreground/80 mb-6">
              Founded with a vision to provide exceptional service in a luxurious environment, we pride ourselves on using only the highest quality products and cutting-edge techniques to ensure you leave feeling beautiful and confident.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <Card className="border-0 shadow">
                <CardContent className="flex items-center p-4">
                  <div className="bg-primary rounded-full p-2 mr-4 text-white">
                    <i className="fas fa-certificate"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Certified Artists</h3>
                    <p className="text-muted-foreground text-sm">Highly trained specialists</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow">
                <CardContent className="flex items-center p-4">
                  <div className="bg-primary rounded-full p-2 mr-4 text-white">
                    <i className="fas fa-gem"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Premium Products</h3>
                    <p className="text-muted-foreground text-sm">Only the finest materials</p>
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
