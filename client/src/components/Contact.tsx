import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll be in touch soon.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-pink/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center font-serif-italic mb-4">Get In Touch</h2>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-1 bg-accent"></div>
          </div>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            We'd love to hear from you! Book your appointment or send us a message.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Information */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full bg-accent/5 border-0 soft-shadow rounded-2xl overflow-hidden">
              <div className="h-40 relative">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522337094846-8a818192de1f?auto=format&fit=crop&w=800&q=80')" }}></div>
                <div className="absolute inset-0 bg-gradient-gold opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl font-bold font-serif-italic text-white">Contact Details</h3>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-start mb-8">
                  <div className="bg-gradient-gold rounded-full p-3 mr-5 text-accent-foreground">
                    <i className="fas fa-map-marker-alt text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Visit Us</h4>
                    <p className="text-foreground/80">15 Beauty Street, Nottingham, NG1 1AB</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-8">
                  <div className="bg-gradient-gold rounded-full p-3 mr-5 text-accent-foreground">
                    <i className="fas fa-phone text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Call Us</h4>
                    <p className="text-foreground/80">+44 7123 456789</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-8">
                  <div className="bg-gradient-gold rounded-full p-3 mr-5 text-accent-foreground">
                    <i className="fas fa-envelope text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Email Us</h4>
                    <p className="text-foreground/80">info@lashdollnottingham.com</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold font-serif-italic mt-8 mb-6">Opening Hours</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center border-b border-accent/10 pb-3">
                    <p className="font-semibold">Monday - Friday</p>
                    <p className="text-foreground/80">10:00 AM - 7:00 PM</p>
                  </div>
                  <div className="flex justify-between items-center border-b border-accent/10 pb-3">
                    <p className="font-semibold">Saturday</p>
                    <p className="text-foreground/80">9:00 AM - 6:00 PM</p>
                  </div>
                  <div className="flex justify-between items-center border-b border-accent/10 pb-3">
                    <p className="font-semibold">Sunday</p>
                    <p className="text-foreground/80">10:00 AM - 4:00 PM</p>
                  </div>
                </div>
                
                <div className="flex mt-10 space-x-4 justify-center">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-gradient-gold hover:bg-accent text-accent-foreground rounded-full p-3 transition-all duration-300 gold-glow"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-gradient-gold hover:bg-accent text-accent-foreground rounded-full p-3 transition-all duration-300 gold-glow"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a 
                    href="https://tiktok.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-gradient-gold hover:bg-accent text-accent-foreground rounded-full p-3 transition-all duration-300 gold-glow"
                    aria-label="TikTok"
                  >
                    <i className="fab fa-tiktok"></i>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="lg:w-1/2" 
            id="book-now"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full border-0 soft-shadow rounded-2xl overflow-hidden">
              <div className="h-40 relative">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80')" }}></div>
                <div className="absolute inset-0 bg-gradient-pink opacity-60"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-3xl font-bold font-serif-italic text-white">Book Your Appointment</h3>
                  <p className="text-white text-center mt-2 max-w-xs px-4">Schedule your appointment now!</p>
                </div>
              </div>
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/90 font-medium">Your Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your full name" 
                              {...field} 
                              className="w-full px-4 py-6 rounded-xl focus:ring-accent border-input/50 hover-glow"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/90 font-medium">Your Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="Enter your email address" 
                                {...field} 
                                className="w-full px-4 py-6 rounded-xl focus:ring-accent border-input/50 hover-glow"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/90 font-medium">Your Phone</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                placeholder="Enter your phone number" 
                                {...field} 
                                className="w-full px-4 py-6 rounded-xl focus:ring-accent border-input/50 hover-glow"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/90 font-medium">Service Interest</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full px-4 py-6 rounded-xl focus:ring-accent border-input/50 hover-glow">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {/* Lash Services */}
                              <SelectItem value="classic-lashes">Classic Lashes</SelectItem>
                              <SelectItem value="volume-lashes">Volume Lashes</SelectItem>
                              <SelectItem value="hybrid-lashes">Hybrid Lashes</SelectItem>
                              <SelectItem value="lash-infills">Lash Infills</SelectItem>
                              <SelectItem value="lash-lift-tint">Lash Lift & Tint</SelectItem>
                              
                              {/* Brow Services */}
                              <SelectItem value="microblading">Microblading</SelectItem>
                              <SelectItem value="microblading-touchup">Microblading Touch-up</SelectItem>
                              <SelectItem value="brow-lamination">Brow Lamination</SelectItem>
                              
                              {/* Skin Treatments */}
                              <SelectItem value="dermaplaning">Dermaplaning</SelectItem>
                              <SelectItem value="microneedling">Microneedling</SelectItem>
                              <SelectItem value="glass-skin-facial">Glass Skin Facial</SelectItem>
                              
                              {/* Fillers & Anti-Wrinkle */}
                              <SelectItem value="anti-wrinkle">Anti-Wrinkle Treatment</SelectItem>
                              <SelectItem value="lip-fillers">Lip Fillers</SelectItem>
                              <SelectItem value="dermal-fillers">Dermal Fillers</SelectItem>
                              
                              {/* Bundle Packages */}
                              <SelectItem value="lash-brow-bundle">Lash & Brow Bundle</SelectItem>
                              <SelectItem value="rejuvenation-package">Rejuvenation Package</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/90 font-medium">Your Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us what you're looking for..." 
                              rows={4} 
                              {...field} 
                              className="w-full px-4 py-3 rounded-xl focus:ring-accent border-input/50 hover-glow resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-gold hover:bg-accent text-accent-foreground font-medium py-6 px-8 rounded-full gold-glow"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <i className="fas fa-circle-notch fa-spin mr-2"></i> Sending...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <i className="fas fa-paper-plane mr-2"></i> Book Appointment
                          </span>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
