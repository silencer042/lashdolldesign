import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const services = [
  {
    id: 1,
    title: "Classic Lashes",
    description: "Enhance your natural beauty with our individually applied classic lashes, customized for your unique eye shape.",
    price: "From £65",
    image: "https://pixabay.com/get/gf4c9bc70a2e49534dab0e0c191c5fd0796deaba3a3c746c2b6dcab5f219b16b2a196347cc9b7cb6f51c6908a19a2d7355465172699d8ccb2d23c123402ea6e2f_1280.jpg"
  },
  {
    id: 2,
    title: "Volume Lashes",
    description: "Create a dramatic, full look with our volume lashes that give a fluffy, textured effect to your lash line.",
    price: "From £85",
    image: "https://images.unsplash.com/photo-1551803091-e20673f15770?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: 3,
    title: "Hybrid Lashes",
    description: "The perfect balance between classic and volume, our hybrid lashes offer a textured, dimensional look.",
    price: "From £75",
    image: "https://pixabay.com/get/g9d16a5c0307dc7d70ea503eafcba57dc51a05ef9b2d131729683ee44932f971497c9a305e365f9babbb70ef0a1b5c05d143f0855bae842f19ccaf345629146ea_1280.jpg"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center font-serif mb-4">Our Luxury Services</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Experience the ultimate pampering with our premium beauty services tailored just for you.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="hover-scale transition-transform bg-secondary border-none overflow-hidden h-full">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-56 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-xl font-serif">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <p className="font-semibold text-primary mb-4">{service.price}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium rounded-full"
                  >
                    <a href="#book-now">Book Now</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
