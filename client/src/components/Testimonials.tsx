import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    rating: 5,
    text: "Absolutely love my lashes! The service was amazing, the salon is beautiful, and the results exceeded my expectations. Will definitely be returning!"
  },
  {
    id: 2,
    name: "Emma Thompson",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    rating: 5,
    text: "Had my lash work in Nottingham with Lash Doll, and they're always so professional. The lashes look natural but give me the volume I wanted. Highly recommended!"
  },
  {
    id: 3,
    name: "Michelle Lee",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    rating: 5,
    text: "Thank you so much! The attention to detail and the patience in creating exactly what I wanted for my lashes is amazing. Will be returning regularly!"
  }
];

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-accent/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center font-serif mb-4">Client Love</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Read what our clients have to say about their experience with us.
          </p>
        </motion.div>

        {/* Desktop Testimonials Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex text-primary">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground/80 italic">{testimonial.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile Testimonials Carousel */}
        <div className="md:hidden relative">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-md mx-auto max-w-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonials[activeTestimonial].image} 
                    alt={testimonials[activeTestimonial].name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonials[activeTestimonial].name}</h4>
                    <div className="flex text-primary">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-foreground/80 italic">{testimonials[activeTestimonial].text}</p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex justify-center mt-6 gap-4">
            <button 
              onClick={handlePrev}
              className="bg-primary/10 hover:bg-primary/20 text-primary rounded-full p-2 transition"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNext}
              className="bg-primary/10 hover:bg-primary/20 text-primary rounded-full p-2 transition"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
