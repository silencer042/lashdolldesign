import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    rating: 5,
    service: "Volume Lashes",
    text: "Absolutely love my lashes! The service was amazing, the salon is beautiful, and the results exceeded my expectations. Will definitely be returning!"
  },
  {
    id: 2,
    name: "Emma Thompson",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    rating: 5,
    service: "Classic Lashes",
    text: "Had my lash work in Nottingham with Lash Doll, and they're always so professional. The lashes look natural but give me the volume I wanted. Highly recommended!"
  },
  {
    id: 3,
    name: "Michelle Lee",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    rating: 5,
    service: "Hybrid Lashes",
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
    <section className="py-20 bg-accent/5 bg-soft-texture">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center font-serif-italic mb-4">Client Love</h2>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-1 bg-accent"></div>
          </div>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Read what our clients have to say about their experience with us.
          </p>
        </motion.div>

        {/* Decorative quote mark */}
        <div className="relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-10 z-0">
            <i className="fas fa-quote-left text-primary text-9xl"></i>
          </div>

          {/* Desktop Testimonials Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full border-0 soft-shadow service-card-hover bg-white">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-5">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-accent"
                      />
                      <div>
                        <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                        <span className="text-sm text-primary font-medium block mb-1">{testimonial.service}</span>
                        <div className="flex text-accent">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <i key={i} className="fas fa-star text-sm"></i>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-foreground/80 italic leading-relaxed">{testimonial.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Mobile Testimonials Carousel */}
          <div className="md:hidden relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-0 soft-shadow mx-auto max-w-md bg-white">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-5">
                      <img 
                        src={testimonials[activeTestimonial].image} 
                        alt={testimonials[activeTestimonial].name} 
                        className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-accent"
                      />
                      <div>
                        <h4 className="font-semibold text-lg">{testimonials[activeTestimonial].name}</h4>
                        <span className="text-sm text-primary font-medium block mb-1">{testimonials[activeTestimonial].service}</span>
                        <div className="flex text-accent">
                          {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                            <i key={i} className="fas fa-star text-sm"></i>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-foreground/80 italic leading-relaxed">{testimonials[activeTestimonial].text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 gap-4">
              <button 
                onClick={handlePrev}
                className="bg-accent/10 hover:bg-accent/20 text-accent rounded-full p-3 transition gold-glow"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              {/* Dots indicator */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeTestimonial ? "w-4 bg-primary" : "bg-primary/30"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button 
                onClick={handleNext}
                className="bg-accent/10 hover:bg-accent/20 text-accent rounded-full p-3 transition gold-glow"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Video testimonial prompt */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg mb-4">
            We'd love to hear about your experience with us! Share your story and tag us.
          </p>
          <p className="text-primary font-medium text-lg">
            #LashDollNottingham
          </p>
        </motion.div>
      </div>
    </section>
  );
}
